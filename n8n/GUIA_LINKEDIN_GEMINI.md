# 🚀 AUTOMAÇÃO LINKEDIN + GEMINI AI - SENTINEL Tecnologia
## Guia Completo de Configuração

---

## 📋 VISÃO GERAL DO WORKFLOW

```
┌─────────────────────────────────────────────────────────────────────────┐
│                 WORKFLOW: LinkedIn Auto Post com Gemini                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  AGENDAMENTO  │    │   SELECIONAR  │    │    GEMINI     │
│  8h Seg-Sex   │───▶│  TEMA DO DIA  │───▶│  GERAR TEXTO  │
└───────────────┘    └───────────────┘    └───────────────┘
                                                  │
                                                  ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   LOG NO      │◀───│   POSTAR NO   │◀───│    GEMINI     │
│ GOOGLE SHEETS │    │   LINKEDIN    │    │  GERAR IMAGEM │
└───────────────┘    └───────────────┘    └───────────────┘
```

---

## ⚙️ CREDENCIAIS NECESSÁRIAS

### 1. API Key do Gemini (Google AI)

1. Acesse: https://aistudio.google.com/apikey
2. Clique em **Create API Key**
3. Selecione um projeto ou crie um novo
4. Copie a API Key gerada

**No N8N:**
1. Vá em **Credentials** → **Add Credential**
2. Procure por **HTTP Query Auth**
3. Configure:
   - Name: `Gemini API Key`
   - Key Name: `key`
   - Key Value: `SUA_API_KEY_AQUI`

### 2. OAuth do LinkedIn

1. Acesse: https://www.linkedin.com/developers/apps
2. Clique em **Create app**
3. Preencha:
   - App name: `SENTINEL Automação`
   - LinkedIn Page: Selecione a página SENTINEL Tecnologia
   - Logo: Upload do logo
4. Após criar, vá em **Auth**:
   - Copie o **Client ID**
   - Copie o **Client Secret**
5. Em **OAuth 2.0 scopes**, adicione:
   - `w_member_social` (para postar)
   - `r_liteprofile` (para ler perfil)

**No N8N:**
1. Vá em **Credentials** → **Add Credential**
2. Procure por **LinkedIn OAuth2 API**
3. Configure:
   - Client ID: `SEU_CLIENT_ID`
   - Client Secret: `SEU_CLIENT_SECRET`
4. Clique em **Sign in with LinkedIn** para autorizar

### 3. Google Sheets (Opcional - para logs)

1. No N8N, vá em **Credentials** → **Add Credential**
2. Procure por **Google Sheets OAuth2 API**
3. Clique em **Sign in with Google**
4. Autorize o acesso

---

## 📥 IMPORTAR O WORKFLOW

### Método 1: Importar arquivo JSON
1. No N8N, clique no menu ☰
2. Selecione **Import from File**
3. Escolha o arquivo: `workflow_linkedin_gemini.json`

### Método 2: Copiar e Colar
1. No N8N, clique no menu ☰
2. Selecione **Import from URL/JSON**
3. Cole o conteúdo do arquivo JSON

---

## 📅 CALENDÁRIO DE TEMAS

| Dia | Tema | Foco | CTA URL |
|-----|------|------|---------|
| Segunda | Microsoft 365 | Licenciamento | /licenciamento-microsoft-365.html |
| Terça | Azure FinOps | Custos Cloud | /fatura-alta-azure.html |
| Quarta | Dica Técnica | Educação | / |
| Quinta | Backup/Segurança | Proteção | / |
| Sexta | Case/IA | Tendências | / |

---

## 🎯 CTAs DE ALTA CONVERSÃO

Todos os posts terminam com um CTA para **consultoria gratuita**:

```
🎁 Análise GRATUITA do seu ambiente
👉 [LINK PARA LANDING PAGE]

#Hashtags #Relevantes
```

---

## 🧪 TESTE MANUAL

Para testar sem esperar o agendamento:

1. Abra o workflow no N8N
2. Clique no nó **Agendamento 8h (Seg-Sex)**
3. Clique em **Execute node** (botão de play)
4. Veja o resultado em cada nó

---

## 🔧 CUSTOMIZAÇÃO

### Alterar Horário de Postagem
No nó `Agendamento 8h (Seg-Sex)`:
- Expressão atual: `0 8 * * 1-5` (8h, Seg-Sex)
- Para 9h: `0 9 * * 1-5`
- Para 12h: `0 12 * * 1-5`
- Para incluir sábado: `0 8 * * 1-6`

### Alterar Temas
No nó `Selecionar Tema do Dia`, edite o objeto `temas`:

```javascript
const temas = {
  1: { // Segunda
    tema: 'SEU TEMA AQUI',
    dor: 'DOR DO CLIENTE',
    cta_url: 'https://seu-link.com',
    cta_texto: '🎁 Seu CTA aqui',
    hashtags: '#Suas #Hashtags'
  },
  // ... outros dias
};
```

### Alterar Prompt do Gemini
No nó `Gemini - Gerar Texto do Post`, edite o `jsonBody` para customizar:
- Tom do texto
- Tamanho máximo
- Regras de formatação

---

## 📊 MONITORAMENTO

### Ver Execuções
1. No N8N, clique em **Executions** no menu
2. Veja o histórico de todas as execuções
3. Clique em uma para ver detalhes

### Logs no Google Sheets
Se configurado, cada post será registrado com:
- Data
- Tema
- Prévia do texto
- URL do CTA
- Status

---

## ⚠️ TROUBLESHOOTING

### Erro: "Missing credentials"
- Verifique se todas as credenciais foram criadas
- Clique no nó com erro e selecione a credencial correta

### Erro: "LinkedIn API error"
- Verifique se o OAuth do LinkedIn está autorizado
- Reautorize clicando em "Sign in with LinkedIn"

### Erro: "Gemini API error"
- Verifique se a API Key está correta
- Verifique os limites de uso da API

### Post não publicou
- Verifique o log de execução no N8N
- Verifique se a página do LinkedIn está ativa

---

## 🔐 SEGURANÇA

- **Nunca** compartilhe suas credenciais
- Use variáveis de ambiente para API Keys em produção
- Revogue e recrie credenciais se comprometidas

---

## 📈 RESULTADOS ESPERADOS

| Métrica | Meta Semanal |
|---------|--------------|
| Posts publicados | 5 (1/dia útil) |
| Impressões | 2.000+ |
| Engajamento | 3% (60+ interações) |
| Cliques no link | 50+ |
| Leads gerados | 2-5 |

---

## ✅ CHECKLIST DE CONFIGURAÇÃO

- [ ] Criar API Key do Gemini
- [ ] Adicionar credencial Gemini no N8N
- [ ] Criar app no LinkedIn Developers
- [ ] Adicionar credencial LinkedIn no N8N
- [ ] (Opcional) Configurar Google Sheets
- [ ] Importar workflow
- [ ] Testar manualmente
- [ ] Ativar workflow (toggle para "Active")

---

## 🎉 PRONTO!

Após seguir todos os passos, o workflow irá:
1. ⏰ Executar automaticamente às 8h (Seg-Sex)
2. 📝 Gerar texto de post com Gemini baseado no tema do dia
3. 🖼️ Gerar imagem profissional com Gemini
4. 📱 Publicar no LinkedIn da SENTINEL
5. 📊 Registrar no Google Sheets (se configurado)

**Seu piloto automático de posts está ativo!** 🚀

---

*SENTINEL Tecnologia - Automação de Marketing*
*Documento atualizado em: 18/01/2026*
