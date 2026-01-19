/**
 * MCP Server para N8N - SENTINEL Tecnologia
 * Permite integração direta do Antigravity com N8N
 */

const http = require('http');
const https = require('https');

// Configurações do N8N
const N8N_CONFIG = {
    baseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678',
    apiKey: process.env.N8N_API_KEY || '',
    webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/sentinel-lead'
};

/**
 * Envia dados para o webhook do N8N
 */
async function sendToN8N(data) {
    return new Promise((resolve, reject) => {
        const url = new URL(N8N_CONFIG.webhookUrl);
        const isHttps = url.protocol === 'https:';
        const client = isHttps ? https : http;

        const options = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${N8N_CONFIG.apiKey}`
            }
        };

        const req = client.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: body
                });
            });
        });

        req.on('error', reject);
        req.write(JSON.stringify(data));
        req.end();
    });
}

/**
 * Processa lead e envia para N8N
 */
async function processLead(leadData) {
    const enrichedLead = {
        ...leadData,
        processedAt: new Date().toISOString(),
        source: 'Antigravity MCP'
    };

    try {
        const result = await sendToN8N(enrichedLead);
        return {
            success: true,
            message: 'Lead enviado para N8N com sucesso',
            n8nResponse: result
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Busca workflows do N8N
 */
async function getN8NWorkflows() {
    return new Promise((resolve, reject) => {
        const url = new URL(`${N8N_CONFIG.baseUrl}/api/v1/workflows`);
        const isHttps = url.protocol === 'https:';
        const client = isHttps ? https : http;

        const options = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname,
            method: 'GET',
            headers: {
                'X-N8N-API-KEY': N8N_CONFIG.apiKey
            }
        };

        const req = client.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve({ raw: body });
                }
            });
        });

        req.on('error', reject);
        req.end();
    });
}

/**
 * Executa um workflow específico
 */
async function executeWorkflow(workflowId, data) {
    return new Promise((resolve, reject) => {
        const url = new URL(`${N8N_CONFIG.baseUrl}/api/v1/workflows/${workflowId}/execute`);
        const isHttps = url.protocol === 'https:';
        const client = isHttps ? https : http;

        const options = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-N8N-API-KEY': N8N_CONFIG.apiKey
            }
        };

        const req = client.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve({ raw: body });
                }
            });
        });

        req.on('error', reject);
        req.write(JSON.stringify({ data }));
        req.end();
    });
}

// MCP Server Interface
const MCPServer = {
    name: 'n8n-sentinel',
    version: '1.0.0',

    tools: {
        'send_lead': {
            description: 'Envia um lead para o workflow do N8N para processamento',
            parameters: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Nome do lead' },
                    email: { type: 'string', description: 'Email do lead' },
                    phone: { type: 'string', description: 'Telefone do lead' },
                    company: { type: 'string', description: 'Empresa do lead' },
                    service: { type: 'string', description: 'Serviço de interesse' },
                    message: { type: 'string', description: 'Mensagem do lead' }
                },
                required: ['name', 'email']
            },
            handler: processLead
        },

        'list_workflows': {
            description: 'Lista todos os workflows disponíveis no N8N',
            parameters: { type: 'object', properties: {} },
            handler: getN8NWorkflows
        },

        'execute_workflow': {
            description: 'Executa um workflow específico do N8N',
            parameters: {
                type: 'object',
                properties: {
                    workflowId: { type: 'string', description: 'ID do workflow' },
                    data: { type: 'object', description: 'Dados para o workflow' }
                },
                required: ['workflowId']
            },
            handler: executeWorkflow
        }
    }
};

module.exports = { MCPServer, processLead, getN8NWorkflows, executeWorkflow };

// Se executado diretamente, inicia o servidor de teste
if (require.main === module) {
    console.log('🚀 MCP Server N8N inicializado');
    console.log('Configuração:', N8N_CONFIG);
    console.log('Ferramentas disponíveis:', Object.keys(MCPServer.tools));
}
