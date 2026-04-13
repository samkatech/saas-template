'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { siteConfig } from '@/config'
import type { Organization, OrgMember } from '@/types'

export function useOrganization() {
  const [org, setOrg] = useState<Organization | null>(null)
  const [role, setRole] = useState<OrgMember['role'] | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Apenas relevante em modo B2B
  const isB2B = siteConfig.mode === 'B2B'

  useEffect(() => {
    if (!isB2B) { setLoading(false); return }

    async function getOrg() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data: member } = await supabase
        .from('org_members')
        .select('*, organizations(*)')
        .eq('user_id', user.id)
        .single()

      if (member) {
        setOrg(member.organizations as Organization)
        setRole(member.role)
      }
      setLoading(false)
    }

    getOrg()
  }, [isB2B])

  return { org, role, loading, isB2B, isOwner: role === 'owner', isAdmin: role === 'admin' || role === 'owner' }
}
