import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SaaS Template',
  description: 'Gerado pelo Samka.ai Pipeline',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body style={{margin:0,background:'#f9fafb'}}>{children}</body>
    </html>
  )
}
