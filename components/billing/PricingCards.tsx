'use client'
export default function PricingCards({ planoAtual }: { planoAtual: string }) {
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
      {['Free','Pro','Enterprise'].map((nome,i) => (
        <div key={nome} style={{background:'white',border:`${i===1?'2px solid #6c63ff':'1px solid #e5e7eb'}`,borderRadius:'12px',padding:'1.5rem'}}>
          <div style={{fontWeight:'700',marginBottom:'0.5rem'}}>{nome}</div>
          <div style={{fontSize:'1.5rem',fontWeight:'700',marginBottom:'1rem'}}>{i===0?'€0':i===1?'€29/mês':'€99/mês'}</div>
          <button style={{width:'100%',padding:'0.5rem',background:i===1?'#6c63ff':'white',color:i===1?'white':'#374151',border:'1px solid #d1d5db',borderRadius:'8px',cursor:'pointer'}}>
            {planoAtual === nome.toLowerCase() ? 'Plano atual' : 'Assinar'}
          </button>
        </div>
      ))}
    </div>
  )
}
