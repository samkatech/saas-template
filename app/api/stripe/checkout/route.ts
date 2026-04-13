import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { criarCheckoutSession, criarStripeCustomer } from '@/lib/stripe'
import { siteConfig } from '@/config'
import { z } from 'zod'

const schema = z.object({
  priceId: z.string().min(1),
  modo: z.enum(['subscription', 'payment']),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const body = schema.parse(await req.json())

    const { data: userData } = await supabase
      .from('users')
      .select('stripe_customer_id, email, name')
      .eq('id', user.id)
      .single()

    // Cria customer Stripe se não existe
    let customerId = userData?.stripe_customer_id
    if (!customerId) {
      const customer = await criarStripeCustomer(
        userData?.email || user.email!,
        userData?.name || undefined
      )
      customerId = customer.id
      await supabase.from('users').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    const session = await criarCheckoutSession({
      customerId,
      priceId: body.priceId,
      modo: body.modo,
      successUrl: `${siteConfig.url}/billing?success=true`,
      cancelUrl: `${siteConfig.url}/billing?canceled=true`,
      metadata: { user_id: user.id },
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error('[STRIPE CHECKOUT]', e)
    return NextResponse.json({ error: 'Erro ao criar sessão' }, { status: 500 })
  }
}
