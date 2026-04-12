# SaaS Template — Samka.ai

Boilerplate completo para micro SaaS europeu com Next.js 14, Supabase, Stripe e Resend.

## Stack

- **Next.js 14** — App Router, Server Components, TypeScript
- **Supabase** — Auth (email + Google OAuth), PostgreSQL, RLS
- **Stripe** — Subscriptions mensais/anuais + pagamentos únicos, Portal de faturação
- **Resend** — Emails transacionais
- **shadcn/ui + Tailwind** — UI components
- **Zod** — Validação de dados

## Modos

- **B2C** — conta individual, faturação pessoal (default)
- **B2B** — organizations/workspaces, multi-utilizador, faturação por org

Muda em `.env`: `NEXT_PUBLIC_SAAS_MODE=B2B`

## Setup

### 1. Instala dependências

```bash
npm install
```

### 2. Configura variáveis de ambiente

```bash
cp .env.example .env.local
# Preenche com as tuas credenciais
```

### 3. Cria as tabelas no Supabase

Cola o conteúdo de `supabase/migrations/001_schema.sql` no SQL Editor do Supabase e corre.

### 4. Configura o Stripe

No Stripe Dashboard:
- Cria os produtos e preços (Pro mensal, Pro anual, Enterprise mensal, Enterprise anual)
- Copia os IDs dos preços para o `.env.local`
- Configura o webhook para `https://teu-dominio.com/api/stripe/webhook`
  - Eventos: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_failed`

### 5. Corre em desenvolvimento

```bash
npm run dev
```

## Estrutura

```
├── app/
│   ├── auth/           ← login, registo, reset password
│   ├── dashboard/      ← área privada (substitui com o teu produto)
│   ├── billing/        ← planos e faturação
│   ├── settings/       ← definições do utilizador
│   └── api/
│       ├── auth/       ← callback OAuth
│       └── stripe/     ← checkout, portal, webhook
├── components/
│   ├── layout/         ← Sidebar, Header
│   └── billing/        ← PricingCards, CurrentPlan
├── lib/
│   ├── supabase/       ← client e server
│   ├── stripe/         ← checkout, portal, webhook
│   └── email/          ← emails com Resend
├── hooks/
│   ├── useUser.ts      ← utilizador autenticado
│   └── useOrganization.ts ← org atual (B2B)
├── config/
│   └── index.ts        ← planos, modo B2B/B2C, config global
└── types/
    └── index.ts        ← tipos TypeScript globais
```

## Personalização para o teu produto

1. Muda o nome em `config/index.ts` → `siteConfig.name`
2. Ajusta os planos em `config/index.ts` → `planos[]`
3. Substitui o conteúdo de `app/dashboard/page.tsx` com o teu produto
4. Adiciona as tuas tabelas em `supabase/migrations/`
5. Cria as tuas API routes em `app/api/`
