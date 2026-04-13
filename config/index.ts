export const siteConfig = {
  name: 'SaaS Template',
  description: 'O teu micro SaaS',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  mode: (process.env.NEXT_PUBLIC_SAAS_MODE || 'B2C') as 'B2B' | 'B2C',
}

export const planos = [
  { id: 'free', nome: 'Free', preco_mensal: 0, preco_anual: 0, stripe_price_id_mensal: null, stripe_price_id_anual: null, features: ['10 items','1 utilizador'], destaque: false },
  { id: 'pro', nome: 'Pro', preco_mensal: 29, preco_anual: 290, stripe_price_id_mensal: process.env.STRIPE_PRICE_PRO_MENSAL||'', stripe_price_id_anual: process.env.STRIPE_PRICE_PRO_ANUAL||'', features: ['500 items','5 utilizadores','API access'], destaque: true, badge: 'Mais popular' },
  { id: 'enterprise', nome: 'Enterprise', preco_mensal: 99, preco_anual: 990, stripe_price_id_mensal: process.env.STRIPE_PRICE_ENTERPRISE_MENSAL||'', stripe_price_id_anual: process.env.STRIPE_PRICE_ENTERPRISE_ANUAL||'', features: ['Ilimitado','Suporte dedicado'], destaque: false },
]

export type PlanoId = 'free' | 'pro' | 'enterprise'
export function getPlano(id: PlanoId) { return planos.find(p => p.id === id) || planos[0] }
