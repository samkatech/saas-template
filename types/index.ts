export type User = {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  plano: 'free' | 'pro' | 'enterprise'
  stripe_customer_id: string | null
  created_at: string
}

export type Organization = {
  id: string
  nome: string
  slug: string
  plano: 'free' | 'pro' | 'enterprise'
  stripe_customer_id: string | null
  owner_id: string
  created_at: string
}

export type OrgMember = {
  id: string
  org_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  created_at: string
}

export type Subscription = {
  id: string
  user_id: string | null
  org_id: string | null
  stripe_subscription_id: string
  stripe_price_id: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  plano: 'free' | 'pro' | 'enterprise'
  periodo: 'mensal' | 'anual'
  current_period_end: string
  created_at: string
}

export type ApiResponse<T> = {
  data?: T
  error?: string
}
