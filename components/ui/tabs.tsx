'use client'
import React, { useState } from 'react'

export function Tabs({ defaultValue, children, className = '' }: any) {
  const [active, setActive] = useState(defaultValue)
  return <div className={className} data-active={active}>{React.Children.map(children, c => React.cloneElement(c, { active, setActive }))}</div>
}
export function TabsList({ children, active, setActive, className = '' }: any) {
  return <div className={`flex gap-1 border-b ${className}`}>{React.Children.map(children, c => React.cloneElement(c, { active, setActive }))}</div>
}
export function TabsTrigger({ value, children, active, setActive, className = '' }: any) {
  return <button onClick={() => setActive(value)} className={`px-3 py-1.5 text-sm font-medium transition-colors ${active === value ? 'border-b-2 border-[#6c63ff] text-[#6c63ff]' : 'text-gray-500 hover:text-gray-700'} ${className}`}>{children}</button>
}
export function TabsContent({ value, children, active, className = '' }: any) {
  return active === value ? <div className={`mt-4 ${className}`}>{children}</div> : null
}
