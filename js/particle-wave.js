/**
 * SENTINEL Particle Wave Animation
 * Exact replication of 3structure.com.br effect
 * Using their exact parameters
 */

(function () {
    'use strict';

    // Configuration - Exact 3structure parameters
    const CONFIG = {
        particleAmount: 10000,
        gridGap: 30,
        speed: 0.3,
        amplitude: 0.2,
        complexity: 0.4,
        tiltDeg: 15,
        scaleY: 10,
        scaleZ: -20,
        // Colors from 3structure: cyan-blue gradient
        colorStops: [
            { pos: 0.05, r: 0, g: 92, b: 145 },      // Cyan-blue at 5%
            { pos: 0.24, r: 3, g: 74, b: 125 },      // Darker blue at 24%
            { pos: 1.00, r: 15, g: 0, b: 43 }        // Deep purple/black at 100%
        ]
    };

    let container, camera, scene, renderer, gridMesh;
    let mouseX = 0, mouseY = 0;
    let animationId;
    let clock;

    function waitForThree(callback) {
        if (typeof THREE !== 'undefined') {
            callback();
        } else {
            setTimeout(() => waitForThree(callback), 100);
        }
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function getColorAtPosition(t) {
        const stops = CONFIG.colorStops;

        // Find the two stops to interpolate between
        for (let i = 0; i < stops.length - 1; i++) {
            if (t >= stops[i].pos && t <= stops[i + 1].pos) {
                const localT = (t - stops[i].pos) / (stops[i + 1].pos - stops[i].pos);
                return {
                    r: lerp(stops[i].r, stops[i + 1].r, localT) / 255,
                    g: lerp(stops[i].g, stops[i + 1].g, localT) / 255,
                    b: lerp(stops[i].b, stops[i + 1].b, localT) / 255
                };
            }
        }
        // Default to last color
        const last = stops[stops.length - 1];
        return { r: last.r / 255, g: last.g / 255, b: last.b / 255 };
    }

    function init() {
        container = document.getElementById('particle-wave-canvas');
        if (!container) {
            console.warn('Particle wave container not found');
            return;
        }

        const rect = container.getBoundingClientRect();
        clock = new THREE.Clock();

        // Camera setup - perspective matching 3structure
        camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 1, 2000);
        camera.position.set(0, 80, 120);
        camera.lookAt(0, 0, 0);

        scene = new THREE.Scene();

        // Create grid geometry - boxes style like 3structure
        const gridWidth = 200;
        const gridHeight = 100;
        const spacing = 2;

        const positions = [];
        const colors = [];

        for (let i = 0; i < gridWidth; i++) {
            for (let j = 0; j < gridHeight; j++) {
                const x = (i - gridWidth / 2) * spacing;
                const z = (j - gridHeight / 2) * spacing;
                const y = 0;

                positions.push(x, y, z);

                // Color based on radial distance from center (like radial-gradient)
                const dist = Math.sqrt(x * x + z * z) / (gridWidth * spacing * 0.5);
                const color = getColorAtPosition(Math.min(dist, 1));
                colors.push(color.r, color.g, color.b);
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // Store original positions for animation
        const originalPositions = new Float32Array(positions);
        geometry.setAttribute('originalPosition', new THREE.Float32BufferAttribute(originalPositions, 3));

        // Shader material for the grid - box/square points
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                amplitude: { value: CONFIG.amplitude * 40 },
                speed: { value: CONFIG.speed },
                complexity: { value: CONFIG.complexity }
            },
            vertexShader: `
                uniform float time;
                uniform float amplitude;
                uniform float speed;
                uniform float complexity;
                
                attribute vec3 color;
                attribute vec3 originalPosition;
                
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    vColor = color;
                    
                    vec3 pos = originalPosition;
                    
                    // Wave animation - multiple sine waves for complexity
                    float wave1 = sin(pos.x * 0.05 * complexity + time * speed * 2.0) * amplitude;
                    float wave2 = sin(pos.z * 0.08 * complexity + time * speed * 1.5) * amplitude * 0.6;
                    float wave3 = cos((pos.x + pos.z) * 0.03 * complexity + time * speed) * amplitude * 0.4;
                    
                    pos.y = wave1 + wave2 + wave3;
                    
                    // Alpha based on radial distance
                    float dist = length(pos.xz) / 150.0;
                    vAlpha = smoothstep(1.2, 0.2, dist);
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Square point size - boxes style
                    gl_PointSize = 3.0 * (200.0 / -mvPosition.z);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    // Square points (boxes) - no circular masking
                    vec2 uv = gl_PointCoord * 2.0 - 1.0;
                    
                    // Slight softness at edges for glow
                    float edge = max(abs(uv.x), abs(uv.y));
                    float alpha = smoothstep(1.0, 0.7, edge) * vAlpha;
                    
                    // Brighter center glow
                    vec3 glowColor = vColor * 1.5;
                    
                    gl_FragColor = vec4(glowColor, alpha * 0.9);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        gridMesh = new THREE.Points(geometry, material);

        // Apply tilt - 15 degrees like 3structure
        gridMesh.rotation.x = THREE.MathUtils.degToRad(CONFIG.tiltDeg + 60);

        scene.add(gridMesh);

        // Renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(rect.width, rect.height);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Events
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);

        animate();
    }

    function onMouseMove(event) {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.1;
        mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.1;
    }

    function onWindowResize() {
        if (!container || !camera || !renderer) return;

        const rect = container.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
    }

    function animate() {
        animationId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        if (gridMesh && gridMesh.material.uniforms) {
            gridMesh.material.uniforms.time.value = time;
        }

        // Subtle mouse interaction
        if (gridMesh) {
            gridMesh.rotation.y += (mouseX * 0.5 - gridMesh.rotation.y) * 0.02;
        }

        renderer.render(scene, camera);
    }

    function destroy() {
        if (animationId) cancelAnimationFrame(animationId);
        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onWindowResize);

        if (renderer) {
            renderer.dispose();
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
        }

        if (gridMesh) {
            gridMesh.geometry.dispose();
            gridMesh.material.dispose();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => waitForThree(init));
    } else {
        waitForThree(init);
    }

    window.ParticleWave = { init, destroy };
})();
