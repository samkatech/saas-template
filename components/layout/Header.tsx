'use client'

import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/useUser'
import { Badge } from '@/components/ui/badge'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/billing': 'Faturação',
  '/settings': 'Definições',
  '/team': 'Equipa',
}

export default function Header() {
  const pathname = usePathname()
  const { user } = useUser()
  const title = pageTitles[pathname] || 'Dashboard'

  return (
    <header className="h-14 border-b flex items-center justify-between px-6 shrink-0">
      <h1 className="text-sm font-semibold">{title}</h1>
      <div className="flex items-center gap-2">
        {user?.plano === 'free' && (
          <Badge variant="outline" className="text-xs">
            Plano Free
          </Badge>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell size={16} />
        </Button>
      </div>
    </header>
  )
}
