/**
 * SENTINEL Particle Wave Animation
 * 3D Grid Wave Effect using Three.js
 * Inspired by 3structure.com.br
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        particleCount: 15000,
        gridWidth: 180,
        gridHeight: 100,
        waveSpeed: 0.0008,
        waveAmplitude: 3,
        waveFrequency: 0.15,
        rotationX: 1.2,  // Tilt angle
        cameraZ: 50,
        particleSize: 1.5,
        mouseInfluence: 0.00008,
        colorStart: { r: 0.1, g: 0.4, b: 0.9 },  // Blue
        colorEnd: { r: 0.6, g: 0.2, b: 0.9 }     // Purple
    };

    let container, camera, scene, renderer, particles;
    let mouseX = 0, mouseY = 0;
    let windowHalfX, windowHalfY;
    let animationId;
    let clock;

    // Check if Three.js is loaded
    function waitForThree(callback) {
        if (typeof THREE !== 'undefined') {
            callback();
        } else {
            setTimeout(() => waitForThree(callback), 100);
        }
    }

    function init() {
        container = document.getElementById('particle-wave-canvas');
        if (!container) {
            console.warn('Particle wave container not found');
            return;
        }

        // Get container dimensions
        const rect = container.getBoundingClientRect();
        windowHalfX = rect.width / 2;
        windowHalfY = rect.height / 2;

        // Clock for animation timing
        clock = new THREE.Clock();

        // Camera setup
        camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 1, 1000);
        camera.position.z = CONFIG.cameraZ;

        // Scene setup
        scene = new THREE.Scene();

        // Create particle geometry
        const positions = [];
        const colors = [];
        const originalPositions = [];

        const gridWidth = CONFIG.gridWidth;
        const gridHeight = CONFIG.gridHeight;
        const spacing = 1.2;

        for (let i = 0; i < gridWidth; i++) {
            for (let j = 0; j < gridHeight; j++) {
                const x = (i - gridWidth / 2) * spacing;
                const y = (j - gridHeight / 2) * spacing;
                const z = 0;

                positions.push(x, y, z);
                originalPositions.push(x, y, z);

                // Color gradient based on position
                const t = (i / gridWidth + j / gridHeight) / 2;
                const r = CONFIG.colorStart.r + (CONFIG.colorEnd.r - CONFIG.colorStart.r) * t;
                const g = CONFIG.colorStart.g + (CONFIG.colorEnd.g - CONFIG.colorStart.g) * t;
                const b = CONFIG.colorStart.b + (CONFIG.colorEnd.b - CONFIG.colorStart.b) * t;

                colors.push(r, g, b);
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('originalPosition', new THREE.Float32BufferAttribute(originalPositions, 3));

        // Shader material for better performance and visual
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                size: { value: CONFIG.particleSize * window.devicePixelRatio },
                waveAmplitude: { value: CONFIG.waveAmplitude },
                waveFrequency: { value: CONFIG.waveFrequency }
            },
            vertexShader: `
                uniform float time;
                uniform float size;
                uniform float waveAmplitude;
                uniform float waveFrequency;
                
                attribute vec3 originalPosition;
                attribute vec3 color;
                
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    vColor = color;
                    
                    vec3 pos = originalPosition;
                    
                    // Multiple wave layers for organic movement
                    float wave1 = sin(pos.x * waveFrequency + time * 2.0) * waveAmplitude;
                    float wave2 = cos(pos.y * waveFrequency * 0.8 + time * 1.5) * waveAmplitude * 0.7;
                    float wave3 = sin((pos.x + pos.y) * waveFrequency * 0.5 + time) * waveAmplitude * 0.5;
                    
                    pos.z = wave1 + wave2 + wave3;
                    
                    // Fade based on distance from center
                    float dist = length(pos.xy) / 60.0;
                    vAlpha = smoothstep(1.0, 0.3, dist);
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Size attenuation
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    // Create soft circular point
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    
                    if (dist > 0.5) discard;
                    
                    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.8;
                    
                    // Glow effect
                    vec3 glow = vColor * 1.5;
                    
                    gl_FragColor = vec4(glow, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        particles = new THREE.Points(geometry, material);
        particles.rotation.x = CONFIG.rotationX;
        scene.add(particles);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(rect.width, rect.height);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Event listeners
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);

        // Start animation
        animate();
    }

    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * CONFIG.mouseInfluence;
        mouseY = (event.clientY - windowHalfY) * CONFIG.mouseInfluence;
    }

    function onWindowResize() {
        if (!container || !camera || !renderer) return;

        const rect = container.getBoundingClientRect();
        windowHalfX = rect.width / 2;
        windowHalfY = rect.height / 2;

        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();

        renderer.setSize(rect.width, rect.height);
    }

    function animate() {
        animationId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        // Update shader time uniform
        if (particles && particles.material.uniforms) {
            particles.material.uniforms.time.value = time;
        }

        // Smooth camera movement based on mouse
        if (particles) {
            particles.rotation.y += (mouseX - particles.rotation.y) * 0.05;
            particles.rotation.x += (-mouseY + CONFIG.rotationX - particles.rotation.x) * 0.05;
        }

        renderer.render(scene, camera);
    }

    function destroy() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onWindowResize);

        if (renderer) {
            renderer.dispose();
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
        }

        if (particles) {
            particles.geometry.dispose();
            particles.material.dispose();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => waitForThree(init));
    } else {
        waitForThree(init);
    }

    // Export for potential external use
    window.ParticleWave = {
        init: init,
        destroy: destroy
    };
})();
