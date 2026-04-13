'use client'
import { usePathname } from 'next/navigation'

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/billing': 'Faturação',
  '/settings': 'Definições',
}

export default function Header() {
  const pathname = usePathname()
  return (
    <header style={{height:'56px',borderBottom:'1px solid #e5e7eb',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 1.5rem',background:'white',flexShrink:0}}>
      <span style={{fontWeight:'600',fontSize:'0.875rem'}}>{titles[pathname] || 'Dashboard'}</span>
    </header>
  )
}
