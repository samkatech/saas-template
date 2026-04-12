'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { planos } from '@/config'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function PricingCards({ planoAtual }: { planoAtual: string }) {
  const [periodo, setPeriodo] = useState<'mensal' | 'anual'>('mensal')
  const [loading, setLoading] = useState<string | null>(null)

  async function assinar(planoId: string, priceId: string, modo: 'subscription' | 'payment') {
    if (planoId === planoAtual) return
    setLoading(planoId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, modo }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Toggle período */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPeriodo('mensal')}
          className={cn('text-sm font-medium transition-colors', periodo === 'mensal' ? 'text-foreground' : 'text-muted-foreground')}
        >Mensal</button>
        <div
          onClick={() => setPeriodo(p => p === 'mensal' ? 'anual' : 'mensal')}
          className="w-10 h-5 rounded-full bg-muted relative cursor-pointer"
        >
          <div className={cn('w-4 h-4 rounded-full bg-primary absolute top-0.5 transition-all', periodo === 'anual' ? 'left-5' : 'left-0.5')} />
        </div>
        <button
          onClick={() => setPeriodo('anual')}
          className={cn('text-sm font-medium transition-colors', periodo === 'anual' ? 'text-foreground' : 'text-muted-foreground')}
        >
          Anual <span className="text-xs text-green-600 font-semibold">-17%</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {planos.map(plano => {
          const preco = periodo === 'mensal' ? plano.preco_mensal : Math.round(plano.preco_anual / 12)
          const priceId = periodo === 'mensal' ? plano.stripe_price_id_mensal : plano.stripe_price_id_anual
          const isAtual = plano.id === planoAtual

          return (
            <div key={plano.id} className={cn(
              'rounded-xl border p-6 flex flex-col gap-4 relative',
              plano.destaque ? 'border-primary shadow-md' : 'border-border'
            )}>
              {plano.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {plano.badge}
                </div>
              )}
              <div>
                <div className="font-semibold text-base">{plano.nome}</div>
                <div className="text-muted-foreground text-sm">{plano.descricao}</div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">€{preco}</span>
                <span className="text-muted-foreground text-sm">/mês</span>
              </div>
              <ul className="space-y-2 flex-1">
                {plano.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => priceId && assinar(plano.id, priceId, 'subscription')}
                disabled={isAtual || loading === plano.id || !priceId}
                variant={plano.destaque ? 'default' : 'outline'}
                className="w-full"
              >
                {loading === plano.id ? 'A processar...' : isAtual ? 'Plano atual' : plano.preco_mensal === 0 ? 'Começar grátis' : 'Assinar'}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
