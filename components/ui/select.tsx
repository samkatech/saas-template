import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className = '', children, ...props }: SelectProps) {
  return (
    <select className={`flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff] ${className}`} {...props}>
      {children}
    </select>
  )
}

export function SelectTrigger({ children, ...props }: any) { return <>{children}</> }
export function SelectContent({ children, ...props }: any) { return <>{children}</> }
export function SelectItem({ value, children, ...props }: any) { return <option value={value}>{children}</option> }
export function SelectValue({ placeholder }: any) { return <option value="">{placeholder}</option> }
