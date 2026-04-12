import { createClient } from '@/lib/supabase/server'
import { planos } from '@/config'
import PricingCards from '@/components/billing/PricingCards'
import CurrentPlan from '@/components/billing/CurrentPlan'

export default async function BillingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: userData } = await supabase
    .from('users')
    .select('plano, stripe_customer_id')
    .eq('id', user!.id)
    .single()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user!.id)
    .eq('status', 'active')
    .single()

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Faturação</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Gere o teu plano e métodos de pagamento
        </p>
      </div>

      <CurrentPlan
        planoAtual={userData?.plano || 'free'}
        subscription={subscription}
        stripeCustomerId={userData?.stripe_customer_id}
      />

      <div>
        <h3 className="text-lg font-medium mb-4">Escolhe o teu plano</h3>
        <PricingCards planoAtual={userData?.plano || 'free'} />
      </div>
    </div>
  )
}
