import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'SaaS Template',
  description: 'Gerado pelo Samka.ai Pipeline',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={cn("font-sans", inter.variable)}>
      <body style={{margin:0,background:'#f9fafb'}}>{children}</body>
    </html>
  )
}