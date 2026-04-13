export default function BillingPage() {
  return (
    <div style={{padding:'2rem',fontFamily:'sans-serif',maxWidth:'800px',margin:'0 auto'}}>
      <h1 style={{fontSize:'1.5rem',fontWeight:'700',marginBottom:'0.5rem'}}>Faturação</h1>
      <p style={{color:'#6b7280',fontSize:'0.875rem',marginBottom:'2rem'}}>Gere o teu plano e pagamentos</p>
      <div style={{background:'white',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'1.5rem',marginBottom:'1rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:'600'}}>Plano Free</div>
            <div style={{fontSize:'0.875rem',color:'#6b7280',marginTop:'0.25rem'}}>Sem subscrição ativa</div>
          </div>
          <span style={{background:'#f0fdf4',color:'#16a34a',padding:'0.25rem 0.75rem',borderRadius:'20px',fontSize:'0.75rem',fontWeight:'600'}}>Ativo</span>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
        {[{nome:'Free',preco:'€0',badge:''},{nome:'Pro',preco:'€29/mês',badge:'Popular'},{nome:'Enterprise',preco:'€99/mês',badge:''}].map((p,i) => (
          <div key={i} style={{background:'white',border:`${i===1?'2px solid #6c63ff':'1px solid #e5e7eb'}`,borderRadius:'12px',padding:'1.5rem'}}>
            {p.badge && <div style={{background:'#6c63ff',color:'white',fontSize:'0.75rem',fontWeight:'600',padding:'0.25rem 0.75rem',borderRadius:'20px',display:'inline-block',marginBottom:'0.75rem'}}>{p.badge}</div>}
            <div style={{fontWeight:'700',fontSize:'1rem',marginBottom:'0.25rem'}}>{p.nome}</div>
            <div style={{fontSize:'1.5rem',fontWeight:'700',marginBottom:'1rem'}}>{p.preco}</div>
            <button style={{width:'100%',padding:'0.5rem',background:i===1?'#6c63ff':'white',color:i===1?'white':'#374151',border:'1px solid #d1d5db',borderRadius:'8px',fontSize:'0.875rem',cursor:'pointer'}}>
              {i===0?'Plano atual':'Assinar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
