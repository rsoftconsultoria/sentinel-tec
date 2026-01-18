# 🤖 SISTEMA DE AUTOMAÇÃO 24/7 - SENTINEL Tecnologia
## Captação e Qualificação Automática de Leads

---

## 📊 VISÃO GERAL DA ARQUITETURA

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FONTES DE TRÁFEGO (24/7)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Google Ads  │  LinkedIn Ads  │  SEO Orgânico  │  Redes Sociais  │  Email  │
└──────┬───────┴───────┬────────┴───────┬────────┴────────┬────────┴────┬────┘
       │               │                │                 │             │
       ▼               ▼                ▼                 ▼             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LANDING PAGES OTIMIZADAS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  /licenciamento-microsoft-365.html  │  /fatura-alta-azure.html  │  /       │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CAPTURA DE LEADS (Formulários)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Formspree  │  Chatbot (Tawk.to)  │  WhatsApp Button  │  Calendly          │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      AUTOMAÇÃO (n8n / Make / Zapier)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Webhook  →  Lead Scoring  →  CRM  →  Email Sequence  →  Notificação       │
└──────────────────────────┬──────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         QUALIFICAÇÃO & FOLLOW-UP                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Lead Frio → Nurturing  │  Lead Morno → SDR  │  Lead Quente → Vendas       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 FASE 1: TRÁFEGO PAGO (Google Ads + LinkedIn)

### 1.1 Google Ads - Campanhas Recomendadas

#### Campanha 1: Licenciamento Microsoft
```
Nome: SENTINEL - Licenciamento M365
Tipo: Search
Orçamento: R$ 50-100/dia
Objetivo: Conversão (formulário)

Palavras-chave:
- "licenciamento microsoft 365" (Exata)
- "quanto custa microsoft 365 empresas" (Frase)
- "migrar email para office 365" (Frase)
- "consultoria microsoft 365" (Ampla Modificada)
- "comprar licença microsoft" (Frase)

Palavras negativas:
- grátis, gratuito, free
- crack, pirata
- pessoal, casa
- estudante

Anúncios:
[Anúncio 1]
Título: Licenciamento Microsoft 365 | Até 30% Economia
Descrição: Consultoria especializada em M365 para empresas.
           Análise gratuita. Fale com especialista agora.
URL: sentinel-tec.pages.dev/licenciamento-microsoft-365.html

[Anúncio 2]
Título: Microsoft 365 Empresarial | Preço Justo
Descrição: Escolha o plano certo e economize. Suporte 
           em português. Consultoria sem compromisso.
URL: sentinel-tec.pages.dev/licenciamento-microsoft-365.html
```

#### Campanha 2: Otimização Azure
```
Nome: SENTINEL - Fatura Alta Azure
Tipo: Search
Orçamento: R$ 30-50/dia

Palavras-chave:
- "fatura alta azure" (Exata)
- "reduzir custos azure" (Frase)
- "otimizar azure" (Ampla Modificada)
- "economizar cloud azure" (Frase)
- "consultoria finops azure" (Frase)

Anúncios:
[Anúncio 1]
Título: Fatura Azure Alta? | Reduzimos até 40%
Descrição: Análise gratuita do seu ambiente. Identificamos
           desperdícios e otimizamos custos. Sem downtime.
URL: sentinel-tec.pages.dev/fatura-alta-azure.html
```

### 1.2 LinkedIn Ads - Campanhas B2B

```
Campanha: SENTINEL - Decisores TI
Objetivo: Lead Generation
Orçamento: R$ 30-50/dia

Segmentação:
- Cargos: CTO, CIO, Diretor de TI, Gerente de TI, IT Manager
- Empresas: 50-500 funcionários
- Indústrias: Tecnologia, Financeiro, Varejo, Indústria
- Localização: Brasil (foco em SP, RJ, MG, PR, SC)

Formato: Single Image Ad
Texto:
"Sua fatura de Cloud está alta demais?

🔍 Fazemos análise GRATUITA do seu ambiente Azure/AWS
📉 Média de economia: 35% sem perder performance
⏱️ Resultados em 15 dias

Comente 'ANÁLISE' ou clique para agendar."

CTA: Solicitar Demonstração
URL: sentinel-tec.pages.dev/fatura-alta-azure.html
```

---

## 🔄 FASE 2: AUTOMAÇÃO COM N8N (Self-Hosted)

### 2.1 Workflow: Lead Capture & Qualification

```json
{
  "name": "SENTINEL - Lead Capture Automation",
  "nodes": [
    {
      "name": "Webhook (Formspree)",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "sentinel-lead",
        "method": "POST"
      }
    },
    {
      "name": "Lead Scoring",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Lead Scoring Logic\nconst lead = items[0].json;\nlet score = 0;\n\n// Cargo (peso alto)\nconst highRoles = ['cto', 'cio', 'diretor', 'gerente', 'head'];\nconst role = (lead.cargo || '').toLowerCase();\nif (highRoles.some(r => role.includes(r))) score += 30;\n\n// Tamanho da empresa\nconst employees = parseInt(lead.funcionarios) || 0;\nif (employees > 500) score += 25;\nelse if (employees > 100) score += 20;\nelse if (employees > 50) score += 15;\nelse if (employees > 10) score += 10;\n\n// Serviço de interesse\nconst interest = (lead.interesse || '').toLowerCase();\nif (interest.includes('azure') || interest.includes('finops')) score += 20;\nif (interest.includes('microsoft') || interest.includes('365')) score += 15;\n\n// Urgência\nif (lead.urgencia === 'imediata') score += 25;\nelse if (lead.urgencia === '30dias') score += 15;\n\n// Qualificação\nlet qualification = 'frio';\nif (score >= 70) qualification = 'quente';\nelse if (score >= 40) qualification = 'morno';\n\nlead.score = score;\nlead.qualification = qualification;\n\nreturn [{ json: lead }];"
      }
    },
    {
      "name": "Route by Score",
      "type": "n8n-nodes-base.switch",
      "parameters": {
        "conditions": {
          "number": [
            { "value1": "={{$json.score}}", "operation": ">=", "value2": 70 },
            { "value1": "={{$json.score}}", "operation": ">=", "value2": 40 }
          ]
        }
      }
    },
    {
      "name": "Hot Lead - WhatsApp Alert",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://api.whatsapp.com/send",
        "body": "🔥 LEAD QUENTE! Score: {{$json.score}}\n\nNome: {{$json.nome}}\nEmpresa: {{$json.empresa}}\nCargo: {{$json.cargo}}\nInteresse: {{$json.interesse}}\n\nLIGAR AGORA!"
      }
    },
    {
      "name": "Save to Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": "YOUR_SHEET_ID",
        "sheetName": "Leads",
        "columns": ["Data", "Nome", "Email", "Empresa", "Cargo", "Interesse", "Score", "Qualification"]
      }
    },
    {
      "name": "Send Welcome Email",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "subject": "Recebemos seu contato - SENTINEL Tecnologia",
        "body": "Olá {{$json.nome}},\n\nObrigado pelo interesse nos serviços da SENTINEL Tecnologia!\n\nRecebemos sua solicitação sobre {{$json.interesse}} e em breve um especialista entrará em contato.\n\nEnquanto isso, baixe nosso guia gratuito: [LINK]\n\nAtenciosamente,\nEquipe SENTINEL"
      }
    }
  ]
}
```

### 2.2 Workflow: LinkedIn Post Automation

```json
{
  "name": "SENTINEL - Daily LinkedIn Post",
  "nodes": [
    {
      "name": "Schedule (Daily 8am)",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": { "interval": [{ "field": "hours", "hoursInterval": 24 }] }
      }
    },
    {
      "name": "Get Today's Post",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Posts do calendário\nconst posts = [\n  { day: 1, content: '🔐 5 ERROS DE LICENCIAMENTO MICROSOFT 365...' },\n  { day: 2, content: '📊 ENQUETE: Qual seu maior desafio com Microsoft 365?' },\n  // ... outros posts\n];\n\nconst dayOfYear = Math.floor((Date.now() - new Date(Date.now()).setMonth(0,0)) / 86400000);\nconst postIndex = dayOfYear % posts.length;\n\nreturn [{ json: posts[postIndex] }];"
      }
    },
    {
      "name": "Post to LinkedIn",
      "type": "n8n-nodes-base.linkedIn",
      "parameters": {
        "operation": "post",
        "text": "={{$json.content}}"
      }
    }
  ]
}
```

---

## 💬 FASE 3: CHATBOT 24/7 (Tawk.to)

### 3.1 Configuração do Chatbot

```javascript
// Adicionar ao index.html (antes do </body>)
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

// Triggers automáticos
Tawk_API.onLoad = function(){
    // Após 30 segundos na página
    setTimeout(function(){
        Tawk_API.popup();
    }, 30000);
};

// Mensagens automáticas baseadas na página
Tawk_API.onChatStarted = function(){
    var page = window.location.pathname;
    if (page.includes('microsoft-365')) {
        Tawk_API.addEvent('interesse', 'Microsoft 365', function(error){});
    } else if (page.includes('azure')) {
        Tawk_API.addEvent('interesse', 'Otimização Azure', function(error){});
    }
};
</script>
<!--End of Tawk.to Script-->
```

### 3.2 Fluxo do Chatbot (Mensagens Automáticas)

```
[Saudação]
👋 Olá! Sou o assistente virtual da SENTINEL Tecnologia.
Como posso ajudar você hoje?

[Opções]
1️⃣ Licenciamento Microsoft 365
2️⃣ Otimização de custos Cloud (Azure/AWS)
3️⃣ Backup em Nuvem
4️⃣ Segurança (SOC)
5️⃣ Falar com especialista

[Se escolher 1 - Microsoft 365]
Ótima escolha! O Microsoft 365 é essencial para empresas modernas.

📋 Para uma análise personalizada, preciso de algumas informações:
- Quantos usuários sua empresa tem?
- Vocês já usam algum plano Microsoft ou Google?
- Qual o principal objetivo? (Email, Teams, Armazenamento)

[Qualificação automática]
✅ Perfeito! Baseado nas suas respostas, você se qualifica para uma 
   análise gratuita do seu ambiente.

📞 Um especialista entrará em contato em até 2 horas.
   Ou se preferir, agende diretamente: [LINK CALENDLY]

[Coleta de dados]
Para agendar, preciso de:
- Seu nome:
- Email corporativo:
- Telefone:
- Melhor horário:
```

---

## 📧 FASE 4: EMAIL MARKETING AUTOMATIZADO

### 4.1 Sequência de Nurturing (Leads Frios)

```
DIA 1 - Email de Boas-vindas
Assunto: Bem-vindo à SENTINEL Tecnologia
───────────────────────────────────────
Olá [NOME],

Obrigado pelo interesse na SENTINEL Tecnologia!

Somos especialistas em transformar TI em resultados para empresas 
como a sua.

Nos próximos dias, vou compartilhar conteúdos exclusivos sobre:
✅ Como economizar até 40% em licenças Microsoft
✅ Dicas para otimizar sua fatura Cloud
✅ Cases de sucesso de empresas similares

Enquanto isso, que tal uma análise gratuita do seu ambiente?
[BOTÃO: AGENDAR ANÁLISE GRATUITA]

DIA 3 - Conteúdo de Valor
Assunto: 🔍 5 erros que custam milhares em licenciamento Microsoft
───────────────────────────────────────
[Conteúdo educativo sobre licenciamento]
CTA: Quer saber se você está cometendo esses erros?

DIA 7 - Case de Sucesso
Assunto: Como reduzimos R$ 180.000/ano na fatura Azure desta empresa
───────────────────────────────────────
[Case de sucesso detalhado]
CTA: Quer resultados similares?

DIA 14 - Oferta
Assunto: [NOME], sua análise gratuita está reservada
───────────────────────────────────────
[Oferta de diagnóstico gratuito com prazo]
CTA: Agendar nos próximos 3 dias
```

### 4.2 Ferramentas Recomendadas

| Ferramenta | Uso | Custo |
|------------|-----|-------|
| **Mailchimp** | Email marketing | Grátis até 500 contatos |
| **Brevo (Sendinblue)** | Email + Automação | Grátis até 300/dia |
| **ConvertKit** | Sequências avançadas | $29/mês |
| **HubSpot** | CRM + Email + Automação | Grátis (básico) |

---

## 📱 FASE 5: WHATSAPP BUSINESS API

### 5.1 Integração WhatsApp Click-to-Chat

```html
<!-- Botão WhatsApp flutuante -->
<a href="https://wa.me/5521994559564?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20[SERVICO]" 
   class="whatsapp-float" 
   target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>

<style>
.whatsapp-float {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
    z-index: 9999;
    transition: transform 0.3s;
}
.whatsapp-float:hover {
    transform: scale(1.1);
}
.whatsapp-float img {
    width: 36px;
    height: 36px;
}
</style>
```

---

## 🎯 FASE 6: LEAD SCORING & QUALIFICAÇÃO

### 6.1 Critérios de Pontuação

| Critério | Pontos | Descrição |
|----------|--------|-----------|
| **Cargo Decisor** | +30 | CTO, CIO, Diretor TI, Gerente TI |
| **Cargo Influenciador** | +15 | Analista Sênior, Coordenador |
| **Empresa 500+ func** | +25 | Grande empresa |
| **Empresa 100-500** | +20 | Média empresa |
| **Empresa 50-100** | +15 | Pequena empresa |
| **Interesse Azure** | +20 | Maior ticket médio |
| **Interesse M365** | +15 | Recorrência alta |
| **Urgência imediata** | +25 | Compra iminente |
| **Urgência 30 dias** | +15 | Projeto em andamento |
| **Visitou pricing** | +10 | Intenção de compra |
| **Baixou material** | +5 | Engajamento |

### 6.2 Classificação

| Score | Classificação | Ação |
|-------|---------------|------|
| **70-100** | 🔥 QUENTE | Ligar em até 1 hora |
| **40-69** | 🟡 MORNO | Email + Ligar em 24h |
| **0-39** | 🔵 FRIO | Nurturing por email |

---

## 📊 FASE 7: DASHBOARD DE MÉTRICAS

### Google Sheets - Dashboard de Leads

```
| Data | Nome | Empresa | Cargo | Origem | Score | Status | Valor Est. |
|------|------|---------|-------|--------|-------|--------|------------|
| 18/01 | João | Acme | CTO | Google Ads | 85 | 🔥 Quente | R$ 5.000 |
| 18/01 | Maria | Beta | Analista | LinkedIn | 45 | 🟡 Morno | R$ 2.000 |
```

### KPIs a Monitorar

- **Custo por Lead (CPL)**: Meta < R$ 50
- **Taxa de Conversão**: Meta > 3%
- **Tempo de Resposta**: Meta < 1 hora
- **Taxa de Qualificação**: Meta > 30%
- **Valor do Pipeline**: Meta R$ 100k/mês

---

## ⚡ IMPLEMENTAÇÃO IMEDIATA (HOJE)

### Prioridade 1 (Fazer agora):
1. ✅ Adicionar botão WhatsApp ao site
2. ✅ Configurar Tawk.to (chatbot gratuito)
3. ✅ Criar conta no Mailchimp/Brevo

### Prioridade 2 (Esta semana):
1. ⏳ Configurar Google Ads (Campanha Search)
2. ⏳ Configurar LinkedIn Ads
3. ⏳ Criar sequência de emails

### Prioridade 3 (Próximas 2 semanas):
1. ⏳ Implementar n8n para automação
2. ⏳ Integrar CRM (HubSpot gratuito)
3. ⏳ Dashboard de métricas

---

## 💰 INVESTIMENTO ESTIMADO

| Item | Custo Mensal |
|------|--------------|
| Google Ads | R$ 1.500 - 3.000 |
| LinkedIn Ads | R$ 900 - 1.500 |
| Ferramentas | R$ 0 (versões gratuitas) |
| **Total** | **R$ 2.400 - 4.500** |

### ROI Esperado
- CPL médio: R$ 40
- Leads/mês: 60-100
- Taxa conversão: 10%
- Clientes/mês: 6-10
- Ticket médio: R$ 3.000
- **Receita potencial: R$ 18.000 - 30.000/mês**
- **ROI: 400-600%**
