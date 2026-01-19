# 🔑 CREDENCIAIS E CONFIGURAÇÕES - EXECUÇÃO MANUAL
## SENTINEL Tecnologia - N8N Setup

**Data:** 19/01/2026
**Status:** Credenciais prontas para configuração

---

## ✅ CREDENCIAL 1: Gemini API Key (CRIADA)

**Status:** ✅ API Key criada com sucesso no Google AI Studio

```
API Key: AIzaSyA8zOfh2Iy4yLEspUzbJaoyRE3tPnfW78Y
Projeto: SENTINEL-N8N (ID: 138469020799)
```

### Configurar no N8N:
1. Acesse: http://localhost:5678
2. Vá em **Credentials** → **Add Credential**
3. Procure por: **HTTP Query Auth**
4. Configure:
   - **Name:** `Gemini API Key`
   - **Key Name:** `key`
   - **Key Value:** `AIzaSyA8zOfh2Iy4yLEspUzbJaoyRE3tPnfW78Y`
5. Salve

---

## ⏳ CREDENCIAL 2: LinkedIn OAuth2 (PENDENTE)

### Passos para criar:

1. Acesse: https://www.linkedin.com/developers/apps
2. Clique em **Create app**
3. Preencha:
   - **App name:** `SENTINEL Automação`
   - **LinkedIn Page:** SENTINEL Tecnologia
   - **Privacy policy URL:** https://sentinel-tec.pages.dev/
   - **App logo:** (opcional)
4. Aceite os termos e crie
5. Na aba **Auth**, copie:
   - **Client ID**
   - **Client Secret**
6. Em **OAuth 2.0 scopes**, adicione:
   - `w_member_social`
   - `r_liteprofile`

### Configurar no N8N:
1. Acesse: http://localhost:5678
2. Vá em **Credentials** → **Add Credential**
3. Procure por: **LinkedIn OAuth2 API**
4. Cole o Client ID e Client Secret
5. Clique em **Connect my account**
6. Autorize no LinkedIn
7. Salve

---

## ⏳ CREDENCIAL 3: HubSpot OAuth2 (PENDENTE)

### Passos para criar:

1. Acesse: https://app.hubspot.com/
2. Vá em **Settings** → **Integrations** → **Private Apps**
3. Clique em **Create a private app**
4. Nomeie: `N8N Automation`
5. Em **Scopes**, selecione:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
6. Crie e copie o **Access Token**

### Configurar no N8N:
1. Acesse: http://localhost:5678
2. Vá em **Credentials** → **Add Credential**
3. Procure por: **HubSpot API**
4. Cole o Access Token
5. Salve

---

## ⏳ CREDENCIAL 4: Google Sheets (PENDENTE)

### Configurar no N8N:
1. Acesse: http://localhost:5678
2. Vá em **Credentials** → **Add Credential**
3. Procure por: **Google Sheets OAuth2 API**
4. Clique em **Sign in with Google**
5. Autorize com: `rsoft.consultoria@gmail.com`
6. Salve

---

## ⏳ CREDENCIAL 5: Email SMTP (PENDENTE)

### Para Gmail:
1. Acesse: https://myaccount.google.com/apppasswords
2. Crie uma **Senha de App** para "Outro (nome personalizado)"
3. Digite: `N8N SENTINEL`
4. Copie a senha gerada

### Configurar no N8N:
1. Acesse: http://localhost:5678
2. Vá em **Credentials** → **Add Credential**
3. Procure por: **SMTP**
4. Configure:
   - **Host:** `smtp.gmail.com`
   - **Port:** `587`
   - **User:** `rsoft.consultoria@gmail.com`
   - **Password:** (senha de app gerada)
   - **SSL/TLS:** `STARTTLS`
5. Salve

---

## 📋 CHECKLIST DE CONFIGURAÇÃO

### Credenciais:
- [x] Gemini API Key - **CRIADA**
- [ ] LinkedIn OAuth2
- [ ] HubSpot API
- [ ] Google Sheets OAuth2
- [ ] Email SMTP

### Workflows a importar:
1. `workflow_linkedin_gemini.json` - Principal
2. `workflow_hubspot_integration.json`
3. `workflow_lead_capture.json`
4. `workflow_linkedin_autopost.json`

### Após importar:
- [ ] Associar credencial Gemini ao workflow LinkedIn
- [ ] Associar credencial LinkedIn ao workflow
- [ ] Ativar workflows (toggle Active)
- [ ] Testar execução manual

---

## 🎯 TESTE RÁPIDO DO GEMINI

Para testar se a API Key funciona, execute este comando:

```powershell
$body = @{
    contents = @(@{
        parts = @(@{
            text = "Responda apenas: Olá SENTINEL!"
        })
    })
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA8zOfh2Iy4yLEspUzbJaoyRE3tPnfW78Y" -Method POST -Body $body -ContentType "application/json"
```

---

*Documento de configuração - SENTINEL Tecnologia*
*19/01/2026*
