'use client'
export default function CurrentPlan({ planoAtual }: { planoAtual: string; subscription?: any; stripeCustomerId?: any }) {
  return (
    <div style={{background:'white',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'1.25rem',marginBottom:'1.5rem'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight:'600',textTransform:'capitalize'}}>{planoAtual}</div>
          <div style={{fontSize:'0.875rem',color:'#6b7280',marginTop:'0.25rem'}}>Plano atual</div>
        </div>
        <span style={{background:'#f0fdf4',color:'#16a34a',padding:'0.25rem 0.75rem',borderRadius:'20px',fontSize:'0.75rem',fontWeight:'600'}}>Ativo</span>
      </div>
    </div>
  )
}
