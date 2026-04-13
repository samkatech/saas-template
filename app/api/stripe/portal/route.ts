import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { criarPortalSession } from '@/lib/stripe'
import { siteConfig } from '@/config'

export async function POST() {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const { data: userData } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (!userData?.stripe_customer_id) {
      return NextResponse.json({ error: 'Sem customer Stripe' }, { status: 400 })
    }

    const session = await criarPortalSession(
      userData.stripe_customer_id,
      `${siteConfig.url}/billing`
    )

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error('[STRIPE PORTAL]', e)
    return NextResponse.json({ error: 'Erro ao abrir portal' }, { status: 500 })
  }
}
