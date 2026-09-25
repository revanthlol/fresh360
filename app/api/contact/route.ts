import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { sanityWriteClient } from '@/lib/sanity'
import { z } from 'zod'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().trim().optional().or(z.literal('')),
  email: z.string().trim().email('Please enter a valid email address'),
  brandInterest: z.string().optional().default('General'),
  inquiryType: z.string().optional().default('General Inquiry'),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(2000, 'Message is too long')
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Support name/fullName and subject/inquiryType
    const payload = {
      fullName: body.fullName || body.name,
      email: body.email,
      phone: body.phone,
      brandInterest: body.brandInterest,
      inquiryType: body.inquiryType || body.subject,
      message: body.message,
    }

    const result = contactSchema.safeParse(payload)
    
    if (!result.success) {
      const errorMsg = result.error.errors[0]?.message || 'Invalid input'
      return NextResponse.json({ error: errorMsg }, { status: 400 })
    }

    const { fullName, phone, email, brandInterest, inquiryType, message } = result.data

    // 1. Primary persistence in Sanity
    let sanityDocId: string | null = null
    if (process.env.SANITY_API_TOKEN && sanityWriteClient) {
      try {
        const doc = await sanityWriteClient.create({
          _type: 'inquiry',
          fullName,
          email,
          phone: phone || '',
          brandInterest,
          inquiryType,
          message,
          status: 'new',
          submittedAt: new Date().toISOString(),
        })
        sanityDocId = doc._id
      } catch (err: any) {
        console.error('[Contact API] Sanity store error:', err?.message || err)
        return NextResponse.json({ error: 'Failed to record inquiry' }, { status: 500 })
      }
    }

    // 2. Outbound emails via Resend (Fail gracefully if unverified)
    if (resend) {
      const sender = process.env.RESEND_FROM_EMAIL || 'Fresh360 Degrees Foods <support@fresh360degrees.in>'
      const supportEmail = 'support@fresh360degrees.in'

      try {
        await resend.emails.send({
          from: sender,
          to: supportEmail,
          replyTo: email,
          subject: `New Customer Inquiry: ${fullName} (${inquiryType})`,
          html: `<p>New inquiry from ${fullName} (${email}, ${phone || 'N/A'}).</p><p><strong>Brand:</strong> ${brandInterest}<br/><strong>Type:</strong> ${inquiryType}</p><p>${message}</p>`,
        })
      } catch (err: any) {
        console.warn('[Contact API] Resend support notification error:', err?.message || err)
      }

      try {
        await resend.emails.send({
          from: sender,
          to: email,
          replyTo: supportEmail,
          subject: 'We have received your inquiry — Fresh360 Degrees Foods',
          html: `<p>Dear ${fullName},</p><p>Thank you for reaching out to Fresh360 Degrees Foods. We have received your inquiry regarding ${brandInterest} (${inquiryType}) and our team will be in touch with you shortly.</p>`,
        })
      } catch (err: any) {
        console.warn('[Contact API] Resend customer acknowledgement error:', err?.message || err)
      }
    }

    return NextResponse.json({ 
      success: true, 
      inquiryId: sanityDocId 
    })
  } catch (err) {
    console.error('Contact API Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
