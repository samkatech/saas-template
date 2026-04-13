import { NextRequest, NextResponse } from 'next/server'
import { construirEvento } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = construirEvento(payload, sig)
  } catch (e) {
    console.error('[WEBHOOK] Assinatura inválida:', e)
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 400 })
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.user_id
        if (!userId) break

        if (session.mode === 'subscription') {
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_subscription_id: session.subscription as string,
            stripe_price_id: session.line_items?.data[0]?.price?.id || '',
            status: 'active',
            plano: 'pro', // será atualizado pelo subscription.updated
            periodo: 'mensal',
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          })
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = sub.customer as string

        const { data: userData } = await supabase
          .from('users')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!userData) break

        const priceId = sub.items.data[0]?.price.id
        const plano = mapearPlano(priceId)

        await supabase.from('subscriptions').upsert({
          user_id: userData.id,
          stripe_subscription_id: sub.id,
          stripe_price_id: priceId,
          status: sub.status as any,
          plano,
          periodo: sub.items.data[0]?.price.recurring?.interval === 'year' ? 'anual' : 'mensal',
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        })

        await supabase.from('users').update({ plano }).eq('id', userData.id)
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = sub.customer as string

        const { data: userData } = await supabase
          .from('users')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!userData) break

        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', sub.id)

        await supabase.from('users').update({ plano: 'free' }).eq('id', userData.id)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await supabase
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', invoice.subscription as string)
        break
      }
    }
  } catch (e) {
    console.error('[WEBHOOK] Erro ao processar:', event.type, e)
  }

  return NextResponse.json({ received: true })
}

function mapearPlano(priceId: string): 'free' | 'pro' | 'enterprise' {
  const { STRIPE_PRICE_PRO_MENSAL, STRIPE_PRICE_PRO_ANUAL, STRIPE_PRICE_ENTERPRISE_MENSAL, STRIPE_PRICE_ENTERPRISE_ANUAL } = process.env
  if ([STRIPE_PRICE_PRO_MENSAL, STRIPE_PRICE_PRO_ANUAL].includes(priceId)) return 'pro'
  if ([STRIPE_PRICE_ENTERPRISE_MENSAL, STRIPE_PRICE_ENTERPRISE_ANUAL].includes(priceId)) return 'enterprise'
  return 'free'
}
