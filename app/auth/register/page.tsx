'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { siteConfig } from '@/config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('A password deve ter pelo menos 8 caracteres'); return }
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: nome },
        emailRedirectTo: `${siteConfig.url}/api/auth/callback`,
      },
    })

    if (error) { setError(error.message); setLoading(false); return }

    // Cria registo na tabela users
    if (data.user) {
      await supabase.from('users').upsert({
        id: data.user.id,
        email,
        name: nome,
        plano: 'free',
      })
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="text-4xl">📧</div>
          <h2 className="text-xl font-semibold">Confirma o teu email</h2>
          <p className="text-muted-foreground text-sm">
            Enviámos um link de confirmação para <strong>{email}</strong>. Clica no link para ativar a tua conta.
          </p>
          <Link href="/auth/login" className="text-sm text-primary hover:underline">Voltar ao login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">Cria a tua conta grátis</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
          <div className="space-y-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} required placeholder="O teu nome" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="tu@exemplo.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Mínimo 8 caracteres" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'A criar conta...' : 'Criar conta grátis'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Ao registares-te, aceitas os nossos{' '}
            <Link href="/termos" className="underline">Termos de Serviço</Link>{' '}
            e{' '}
            <Link href="/privacidade" className="underline">Política de Privacidade</Link>.
          </p>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tens conta?{' '}
          <Link href="/auth/login" className="text-foreground font-medium hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
