'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Subscription } from '@/types'

export default function CurrentPlan({
  planoAtual,
  subscription,
  stripeCustomerId,
}: {
  planoAtual: string
  subscription: Subscription | null
  stripeCustomerId: string | null
}) {
  const [loading, setLoading] = useState(false)

  async function abrirPortal() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Plano atual</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold capitalize">{planoAtual}</span>
            {subscription?.status === 'active' && (
              <Badge variant="outline" className="text-green-600 border-green-600 text-xs">Ativo</Badge>
            )}
            {subscription?.status === 'trialing' && (
              <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs">Trial</Badge>
            )}
            {subscription?.status === 'past_due' && (
              <Badge variant="destructive" className="text-xs">Pagamento em atraso</Badge>
            )}
          </div>
          {subscription?.current_period_end && (
            <p className="text-sm text-muted-foreground">
              Renova em {new Date(subscription.current_period_end).toLocaleDateString('pt-PT')}
            </p>
          )}
          {!subscription && planoAtual === 'free' && (
            <p className="text-sm text-muted-foreground">Sem subscrição ativa</p>
          )}
        </div>
        {stripeCustomerId && subscription && (
          <Button variant="outline" size="sm" onClick={abrirPortal} disabled={loading}>
            {loading ? 'A abrir...' : 'Gerir subscrição'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
