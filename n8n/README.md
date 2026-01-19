# SENTINEL Tecnologia - Guia de Instalação Automática N8N

## 🚀 Status da Instalação

O N8N está sendo instalado automaticamente via `npm install -g n8n`.

## 📋 Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `workflow_lead_capture.json` | Workflow completo para captura e scoring de leads |
| `mcp-n8n-server.js` | MCP Server para integração Antigravity ↔ N8N |
| `mcp-config.json` | Configuração MCP para adicionar ao Antigravity |
| `start-n8n.bat` | Script para iniciar o N8N no Windows |

## 🔧 Como Usar

### 1. Iniciar o N8N
```powershell
cd c:\Users\RConsultoria\Documents\SENTINEL-LANDINGPAGE\n8n
.\start-n8n.bat
```

### 2. Acessar o N8N
- URL: http://localhost:5678
- Usuário: sentinel
- Senha: SentinelTec2026!

### 3. Importar o Workflow
1. No N8N, clique em **Workflows** → **Import from File**
2. Selecione `workflow_lead_capture.json`
3. Configure as credenciais:
   - Google Sheets: Conectar conta Google
   - Email SMTP: Configurar servidor de email

### 4. Ativar Webhook
1. No workflow importado, clique no nó "Webhook Formspree"
2. Copie a URL do webhook (ex: `http://localhost:5678/webhook/sentinel-lead`)
3. Configure esse URL no Formspree para redirecionar leads

## 🔗 Integração com Formspree

Para conectar o Formspree ao N8N:

1. Acesse https://formspree.io/forms/xbdddowv/submissions
2. Vá em **Settings** → **Plugins**
3. Adicione um **Webhook** com a URL do N8N:
   ```
   http://localhost:5678/webhook/sentinel-lead
   ```

## 📊 Funcionalidades do Workflow

1. **Recebe Lead** → Webhook recebe dados do Formspree
2. **Lead Scoring** → Pontua o lead baseado em:
   - Serviço de interesse (Azure = +25, M365 = +20)
   - Urgência na mensagem (+30)
   - Cargo decisor (+25)
3. **Qualificação**:
   - Score ≥ 60: 🔥 Lead Quente → Alerta WhatsApp imediato
   - Score 30-59: 🟡 Lead Morno → Salva e envia email
   - Score < 30: 🔵 Lead Frio → Apenas salva
4. **Google Sheets** → Salva todos os leads em planilha
5. **Email** → Envia email de boas-vindas automático

## 🔐 Credenciais Necessárias

### Google Sheets
1. No N8N, vá em **Credentials** → **New**
2. Selecione **Google Sheets OAuth2**
3. Siga as instruções para conectar conta Google

### Email SMTP
Para envio de emails, configure:
- Host: smtp.gmail.com (ou seu servidor)
- Port: 587
- User: seu email
- Password: senha de app do Gmail

## 🌐 Expondo N8N para Internet (Opcional)

Para receber webhooks da internet, use ngrok:

```powershell
# Instalar ngrok
winget install ngrok.ngrok

# Expor N8N
ngrok http 5678
```

Copie a URL gerada (ex: `https://abc123.ngrok.io`) e use como base para webhooks.

## ⚡ Próximos Passos

1. [ ] Aguardar instalação do N8N finalizar
2. [ ] Iniciar N8N com `start-n8n.bat`
3. [ ] Importar workflow
4. [ ] Configurar credenciais
5. [ ] Testar com um lead de teste
6. [ ] Configurar webhook no Formspree

---

*Criado automaticamente para SENTINEL Tecnologia*
*Data: 18/01/2026*
