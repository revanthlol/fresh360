import { NextResponse } from 'next/server'
import { subscribeNewsletterAction } from '@/app/actions'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const formData = new FormData()
    formData.append('email', body.email || '')
    const result = await subscribeNewsletterAction(null, formData)
    return NextResponse.json(result, { status: result.success ? 200 : 400 })
  } catch (error: any) {
    console.error('Error in /api/subscribe:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
