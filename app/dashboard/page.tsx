export default function DashboardPage() {
  return (
    <div style={{padding:'2rem',fontFamily:'sans-serif',maxWidth:'1200px',margin:'0 auto'}}>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.5rem',fontWeight:'700',marginBottom:'0.25rem'}}>Dashboard</h1>
        <p style={{color:'#6b7280',fontSize:'0.875rem'}}>Protótipo gerado pelo Samka.ai Pipeline</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginBottom:'2rem'}}>
        {['Total de items','Este mês','Plano atual'].map((label,i) => (
          <div key={i} style={{background:'white',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'1.25rem'}}>
            <div style={{fontSize:'0.75rem',color:'#9ca3af',fontWeight:'500',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'0.5rem'}}>{label}</div>
            <div style={{fontSize:'1.75rem',fontWeight:'700'}}>0</div>
          </div>
        ))}
      </div>
      <div style={{background:'white',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'1.5rem'}}>
        <h2 style={{fontSize:'1rem',fontWeight:'600',marginBottom:'1rem'}}>Conteúdo principal</h2>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'3rem',color:'#9ca3af',fontSize:'0.875rem'}}>
          <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>📦</div>
          <p>Área de conteúdo do produto — a preencher no desenvolvimento manual</p>
        </div>
      </div>
    </div>
  )
}
