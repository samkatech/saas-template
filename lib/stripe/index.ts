// Stripe será configurado no desenvolvimento manual
// Adiciona as dependências: npm install stripe @stripe/stripe-js
export const stripe = null as any
export async function criarCheckoutSession(params: any) { return null }
export async function criarPortalSession(customerId: string, returnUrl: string) { return null }
export function construirEvento(payload: string, sig: string) { return null as any }
export async function criarStripeCustomer(email: string, nome?: string) { return { id: '' } }
