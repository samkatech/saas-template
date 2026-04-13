import { NextResponse } from 'next/server'
export async function POST() {
  return NextResponse.json({ error: 'Stripe não configurado' }, { status: 501 })
}
