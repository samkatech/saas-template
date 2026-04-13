export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{display:'flex',minHeight:'100vh',fontFamily:'sans-serif'}}>
      <aside style={{width:'220px',background:'white',borderRight:'1px solid #e5e7eb',padding:'1rem',flexShrink:0}}>
        <div style={{fontWeight:'700',fontSize:'0.875rem',marginBottom:'1.5rem',padding:'0.5rem'}}>SaaS Template</div>
        {['Dashboard','Faturação','Definições'].map((item,i) => (
          <a key={i} href={i===0?'/dashboard':i===1?'/billing':'/settings'}
            style={{display:'flex',alignItems:'center',padding:'0.5rem 0.75rem',borderRadius:'8px',fontSize:'0.875rem',color:'#4b5563',textDecoration:'none',marginBottom:'0.25rem'}}>
            {item}
          </a>
        ))}
      </aside>
      <main style={{flex:1,overflow:'auto'}}>{children}</main>
    </div>
  )
}
