'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/billing', label: 'Faturação' },
  { href: '/settings', label: 'Definições' },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside style={{width:'220px',background:'white',borderRight:'1px solid #e5e7eb',display:'flex',flexDirection:'column',flexShrink:0}}>
      <div style={{padding:'1.25rem 1rem',borderBottom:'1px solid #e5e7eb',fontWeight:'700',fontSize:'0.875rem'}}>
        SaaS Template
      </div>
      <nav style={{flex:1,padding:'0.5rem'}}>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} style={{
            display:'flex',alignItems:'center',padding:'0.5rem 0.75rem',
            borderRadius:'8px',fontSize:'0.875rem',textDecoration:'none',marginBottom:'0.25rem',
            background: pathname === item.href ? '#ede9fe' : 'transparent',
            color: pathname === item.href ? '#6c63ff' : '#4b5563',
          }}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div style={{padding:'0.75rem',borderTop:'1px solid #e5e7eb'}}>
        <a href="/auth/login" style={{display:'block',padding:'0.5rem 0.75rem',fontSize:'0.875rem',color:'#6b7280',textDecoration:'none',borderRadius:'8px'}}>
          Sair
        </a>
      </div>
    </aside>
  )
}
