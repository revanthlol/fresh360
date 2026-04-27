import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address'),
  brandInterest: z.enum(['juicera', 'fuzzy', 'refrizz', 'general', 'bulk']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long')
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const result = contactSchema.safeParse(body)
    
    if (!result.success) {
      const errorMsg = result.error.errors[0]?.message || 'Invalid input'
      return NextResponse.json({ error: errorMsg }, { status: 400 })
    }

    const { name, phone, email, brandInterest, message } = result.data

    const { data, error } = await resend.emails.send({
      from: 'Fresh 360 <onboarding@resend.dev>', // Should use verified domain in production
      to: process.env.CONTACT_EMAIL || 'support@fresh360.com',
      subject: `New Enquiry from ${name} — Fresh 360`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2D6A2D;">New Website Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Brand Interest:</strong> ${brandInterest.toUpperCase()}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <strong>Message:</strong><br/>
            ${message.replace(/\n/g, '<br/>')}
          </div>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">This email was sent from the Fresh 360 website contact form.</p>
        </div>
      `
    })

    if (error) {
      console.error('Resend Error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
