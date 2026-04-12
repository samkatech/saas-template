export const siteConfig = {
  name: 'SaaS Template',
  description: 'O teu micro SaaS',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'suporte@exemplo.com',

  // Toggle B2B/B2C
  // B2B: organizations, workspaces, multi-user, faturação por org
  // B2C: conta individual, faturação pessoal
  mode: (process.env.NEXT_PUBLIC_SAAS_MODE || 'B2C') as 'B2B' | 'B2C',
}

export const planos = [
  {
    id: 'free',
    nome: 'Free',
    descricao: 'Para começar',
    preco_mensal: 0,
    preco_anual: 0,
    stripe_price_id_mensal: null,
    stripe_price_id_anual: null,
    limites: {
      items: 10,
      usuarios: 1,
      storage_gb: 1,
    },
    features: [
      '10 items',
      '1 utilizador',
      'Suporte por email',
    ],
    destaque: false,
  },
  {
    id: 'pro',
    nome: 'Pro',
    descricao: 'Para profissionais',
    preco_mensal: 29,
    preco_anual: 290,
    stripe_price_id_mensal: process.env.STRIPE_PRICE_PRO_MENSAL || '',
    stripe_price_id_anual: process.env.STRIPE_PRICE_PRO_ANUAL || '',
    limites: {
      items: 500,
      usuarios: 5,
      storage_gb: 20,
    },
    features: [
      '500 items',
      '5 utilizadores',
      'Suporte prioritário',
      'Exportação de dados',
      'API access',
    ],
    destaque: true,
    badge: 'Mais popular',
  },
  {
    id: 'enterprise',
    nome: 'Enterprise',
    descricao: 'Para equipas grandes',
    preco_mensal: 99,
    preco_anual: 990,
    stripe_price_id_mensal: process.env.STRIPE_PRICE_ENTERPRISE_MENSAL || '',
    stripe_price_id_anual: process.env.STRIPE_PRICE_ENTERPRISE_ANUAL || '',
    limites: {
      items: -1, // ilimitado
      usuarios: -1,
      storage_gb: 100,
    },
    features: [
      'Items ilimitados',
      'Utilizadores ilimitados',
      'Suporte dedicado',
      'SLA garantido',
      'SSO / SAML',
      'Faturação personalizada',
    ],
    destaque: false,
  },
]

export type PlanoId = 'free' | 'pro' | 'enterprise'

export function getPlano(id: PlanoId) {
  return planos.find(p => p.id === id) || planos[0]
}
