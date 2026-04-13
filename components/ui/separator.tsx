import React from 'react'
export function Separator({ className = '', orientation = 'horizontal', ...props }: any) {
  return <div className={`${orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px'} bg-gray-200 ${className}`} {...props} />
}
