'use client'
import { useState } from 'react'
// Hook de utilizador — configurar com Supabase no desenvolvimento manual
export function useUser() {
  const [user] = useState<any>(null)
  const [loading] = useState(false)
  async function signOut() { window.location.href = '/auth/login' }
  return { user, loading, signOut }
}
