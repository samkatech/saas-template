'use client'
import { useState } from 'react'
// Hook de organização B2B — configurar com Supabase no desenvolvimento manual
export function useOrganization() {
  const [org] = useState<any>(null)
  const [role] = useState<string | null>(null)
  const [loading] = useState(false)
  return { org, role, loading, isB2B: false, isOwner: false, isAdmin: false }
}
