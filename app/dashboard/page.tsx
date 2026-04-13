import { createClient } from '@/lib/supabase/server'
import { siteConfig } from '@/config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user!.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Olá, {userData?.name || 'utilizador'} 👋
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Bem-vindo ao {siteConfig.name}
        </p>
      </div>

      {/* Stats — substitui com os dados reais do teu produto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Começa a criar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Este mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Nenhuma atividade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Plano atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{userData?.plano || 'Free'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <a href="/billing" className="text-primary hover:underline">Fazer upgrade</a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Área principal — substitui com o conteúdo do teu produto */}
      <Card>
        <CardHeader>
          <CardTitle>Os teus items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium mb-2">Nenhum item ainda</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Cria o teu primeiro item para começar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
