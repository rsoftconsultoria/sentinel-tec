# 🌐 Configuração do Domínio sentineltec.com.br

## Situação Atual
- **Domínio:** sentineltec.com.br
- **Registrador:** Registro.br
- **Hospedagem atual:** Wix
- **Nova hospedagem:** Cloudflare Pages

---

## 📋 Instruções para Migrar o Domínio

### Passo 1: Acessar o Registro.br
1. Acesse https://registro.br
2. Faça login com suas credenciais
3. Clique no domínio `sentineltec.com.br`

### Passo 2: Alterar os Servidores DNS

**OPÇÃO A - Usar DNS do Cloudflare (Recomendado)**

Altere os nameservers para os do Cloudflare:
```
NS1: adaline.ns.cloudflare.com
NS2: kent.ns.cloudflare.com
```

> **Nota:** Os nameservers exatos serão fornecidos quando adicionarmos o domínio no Cloudflare.

**OPÇÃO B - Manter DNS do Registro.br e adicionar registros**

Se preferir manter os DNS do Registro.br, adicione estes registros:

| Tipo  | Nome | Valor |
|-------|------|-------|
| CNAME | www  | sentinel-tec.pages.dev |
| CNAME | @    | sentinel-tec.pages.dev |

Ou, se CNAME não funcionar para @, use registros A:

| Tipo | Nome | Valor |
|------|------|-------|
| A    | @    | 192.0.2.1 (placeholder - Cloudflare fornecerá o IP real) |
| CNAME| www  | sentinel-tec.pages.dev |

---

## 🔧 Configuração no Cloudflare Pages

### Adicionar Domínio Personalizado

1. Acessar https://dash.cloudflare.com
2. Ir em **Pages** → **sentinel-tec**
3. Clicar em **Custom domains**
4. Adicionar:
   - `sentineltec.com.br`
   - `www.sentineltec.com.br`
5. Cloudflare fornecerá os registros DNS necessários

---

## ✅ Checklist de Migração

- [ ] URLs do site atualizadas para www.sentineltec.com.br
- [ ] Domínio adicionado no Cloudflare Pages
- [ ] DNS configurado no Registro.br
- [ ] SSL/HTTPS funcionando
- [ ] Redirecionamento de sentineltec.com.br → www.sentineltec.com.br
- [ ] Testar todas as páginas
- [ ] Atualizar links no Google Search Console
- [ ] Atualizar links no Google Analytics

---

## ⏱️ Tempo de Propagação

Após alterar os DNS no Registro.br:
- **Propagação inicial:** 15 minutos a 2 horas
- **Propagação completa:** até 48 horas (raro)

---

## 🔐 SSL/HTTPS

O Cloudflare Pages fornece SSL gratuito automaticamente. Após a propagação dos DNS:
- https://www.sentineltec.com.br ✅
- https://sentineltec.com.br ✅

---

## 📞 Suporte

Se tiver dúvidas durante a configuração:
- Cloudflare: https://developers.cloudflare.com/pages/platform/custom-domains/
- Registro.br: https://registro.br/ajuda/
