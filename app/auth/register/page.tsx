'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f9fafb',fontFamily:'sans-serif'}}>
      <div style={{width:'100%',maxWidth:'360px',background:'white',borderRadius:'12px',padding:'2rem',boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
        <h1 style={{fontSize:'1.5rem',fontWeight:'700',marginBottom:'0.25rem'}}>Criar conta</h1>
        <p style={{color:'#6b7280',fontSize:'0.875rem',marginBottom:'1.5rem'}}>Começa gratuitamente</p>
        <form onSubmit={handleRegister}>
          <div style={{marginBottom:'1rem'}}>
            <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',marginBottom:'0.25rem'}}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'8px',fontSize:'0.875rem',boxSizing:'border-box'}}
              placeholder="tu@exemplo.com"
            />
          </div>
          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block',fontSize:'0.875rem',fontWeight:'500',marginBottom:'0.25rem'}}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{width:'100%',padding:'0.5rem 0.75rem',border:'1px solid #d1d5db',borderRadius:'8px',fontSize:'0.875rem',boxSizing:'border-box'}}
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{width:'100%',padding:'0.625rem',background:'#6c63ff',color:'white',border:'none',borderRadius:'8px',fontSize:'0.875rem',fontWeight:'600',cursor:'pointer'}}
          >
            {loading ? 'A criar conta...' : 'Criar conta grátis'}
          </button>
        </form>
        <p style={{textAlign:'center',fontSize:'0.875rem',color:'#6b7280',marginTop:'1rem'}}>
          Já tens conta? <a href="/auth/login" style={{color:'#6c63ff'}}>Entrar</a>
        </p>
      </div>
    </div>
  )
}
