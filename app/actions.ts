'use server'

import { Resend } from 'resend'
import { sanityWriteClient } from '@/lib/sanity'
import { z } from 'zod'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s-]/g, ''))
    .refine((val) => !val || /^(?:\+?91|0)?[6-9]\d{9}$/.test(val), {
      message: 'Please enter a valid mobile number',
    })
    .optional()
    .or(z.literal('')),
  brandInterest: z.string().optional().default('General'),
  inquiryType: z.string().optional().default('General Inquiry'),
  message: z.string().trim().min(5, 'Message must be at least 5 characters'),
})

// Helper to sanitize HTML characters to prevent email injection
const escapeHtml = (str: string) => {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m] || m))
}

export async function submitInquiry(formData: FormData) {
  // Extract and normalize form data (supporting both fullName/name and inquiryType/subject)
  const rawData = {
    fullName: formData.get('fullName') || formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    brandInterest: formData.get('brandInterest'),
    inquiryType: formData.get('inquiryType') || formData.get('subject'),
    message: formData.get('message'),
  }

  // Validate server-side with Zod
  const validatedFields = inquirySchema.safeParse(rawData)

  if (!validatedFields.success) {
    return { 
      success: false, 
      error: 'Please correct the highlighted fields.',
      fieldErrors: validatedFields.error.flatten().fieldErrors 
    }
  }

  const { fullName, email, phone, brandInterest, inquiryType, message } = validatedFields.data

  const safeFullName = escapeHtml(fullName)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone || 'Not provided')
  const safeBrand = escapeHtml(brandInterest || 'General')
  const safeInquiryType = escapeHtml(inquiryType || 'General Inquiry')
  const safeMessage = escapeHtml(message)

  let sanityDocId: string | null = null

  // 1. PRIMARY PERSISTENCE: Store inquiry document in Sanity CMS
  if (process.env.SANITY_API_TOKEN && sanityWriteClient) {
    try {
      const doc = await sanityWriteClient.create({
        _type: 'inquiry',
        fullName,
        email,
        phone: phone || '',
        brandInterest: brandInterest || 'General',
        inquiryType: inquiryType || 'General Inquiry',
        message,
        status: 'new',
        submittedAt: new Date().toISOString(),
      })
      sanityDocId = doc._id
      console.log(`[Sanity] Successfully persisted customer inquiry ID: ${sanityDocId}`)
    } catch (sanityError: any) {
      console.error('[Sanity] Error persisting customer inquiry:', sanityError?.message || sanityError)
      return {
        success: false,
        error: 'Unable to save inquiry at this moment. Please try again or reach out directly via WhatsApp.'
      }
    }
  } else {
    console.error('[Sanity] SANITY_API_TOKEN is missing or sanityWriteClient is unavailable.')
    return {
      success: false,
      error: 'Service configuration incomplete. Please contact support directly.'
    }
  }

  // 2. OUTBOUND EMAIL: Notification & Customer Acknowledgement via Resend
  // (Fail gracefully if domain is pending verification or key is unset)
  if (resend) {
    const sender = process.env.RESEND_FROM_EMAIL || 'Fresh360 Degrees Foods <support@fresh360degrees.in>'
    const supportEmail = 'support@fresh360degrees.in'

    // Task 2a: Send notification email to support@fresh360degrees.in
    try {
      const { error: notifError } = await resend.emails.send({
        from: sender,
        to: supportEmail,
        replyTo: email, // Direct reply goes to customer
        subject: `New Customer Inquiry: ${safeFullName} (${safeInquiryType})`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
              .container { max-width: 600px; margin: 24px auto; padding: 36px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; }
              .header { border-bottom: 2px solid #eff7ef; padding-bottom: 20px; margin-bottom: 24px; }
              .tag { display: inline-block; padding: 4px 12px; background-color: #eff7ef; color: #2D6A2D; font-weight: 700; font-size: 11px; text-transform: uppercase; border-radius: 8px; letter-spacing: 0.05em; }
              .title { font-size: 20px; font-weight: 800; color: #092236; margin: 12px 0 4px; }
              .info-grid { background-color: #f8faf8; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 24px; }
              .field { margin-bottom: 14px; }
              .field:last-child { margin-bottom: 0; }
              .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700; margin-bottom: 2px; }
              .value { font-size: 15px; font-weight: 600; color: #092236; }
              .message-box { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 24px; }
              .footer { text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <span class="tag">New Customer Inquiry</span>
                <h1 class="title">${safeFullName}</h1>
                <p style="margin: 0; color: #64748b; font-size: 13px;">Submitted via fresh360degrees.in</p>
              </div>

              <div class="info-grid">
                <div class="field">
                  <div class="label">Customer Email</div>
                  <div class="value"><a href="mailto:${email}" style="color: #2D6A2D; text-decoration: none;">${safeEmail}</a></div>
                </div>
                <div class="field">
                  <div class="label">Phone Number</div>
                  <div class="value">${safePhone}</div>
                </div>
                <div class="field">
                  <div class="label">Brand Interest</div>
                  <div class="value">${safeBrand}</div>
                </div>
                <div class="field">
                  <div class="label">Inquiry Type</div>
                  <div class="value">${safeInquiryType}</div>
                </div>
              </div>

              <div class="message-box">
                <div class="label">Message Content</div>
                <p style="margin: 10px 0 0; color: #334155; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${safeMessage}</p>
              </div>

              <div class="footer">
                <p style="margin: 0;">Fresh 360 Degrees Foods LLP · Sanity Document ID: <code>${sanityDocId}</code></p>
                <p style="margin: 4px 0 0; font-size: 11px;">Click 'Reply' in your email client to respond directly to the customer.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      })

      if (notifError) {
        console.warn('[Resend] Support notification failed or pending verification:', notifError.message)
      } else {
        console.log(`[Resend] Successfully dispatched notification to ${supportEmail}`)
      }
    } catch (sendErr: any) {
      console.warn('[Resend] Exception dispatching support notification:', sendErr?.message || sendErr)
    }

    // Task 2b: Send acknowledgement email to the customer
    try {
      const { error: ackError } = await resend.emails.send({
        from: sender,
        to: email,
        replyTo: supportEmail,
        subject: 'We have received your inquiry — Fresh360 Degrees Foods',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
              .container { max-width: 580px; margin: 24px auto; padding: 36px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; }
              .logo { display: inline-block; font-size: 18px; font-weight: 900; color: #2D6A2D; letter-spacing: -0.02em; margin-bottom: 24px; }
              .greeting { font-size: 20px; font-weight: 700; color: #092236; margin-bottom: 16px; }
              .summary-box { background-color: #f8faf8; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; }
              .summary-label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; }
              .summary-value { font-size: 14px; font-weight: 600; color: #092236; margin-bottom: 12px; }
              .footer { border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">FRESH 360° DEGREES FOODS</div>
              <h2 class="greeting">Thank You for Contacting Fresh360</h2>
              
              <p>Dear ${safeFullName},</p>
              
              <p>
                We have received your inquiry regarding <strong>${safeBrand}</strong> (${safeInquiryType}). 
                Our team is reviewing the information you provided and will be in touch with you shortly.
              </p>

              <div class="summary-box">
                <div class="summary-label">Inquiry Summary</div>
                <div class="summary-value">${safeInquiryType} · ${safeBrand}</div>
                <div class="summary-label">Submitted Message</div>
                <p style="margin: 0; color: #334155; font-size: 13px; white-space: pre-wrap;">${safeMessage}</p>
              </div>

              <p>
                If you have any additional information or urgent questions, you can reply directly to this email or reach us at <a href="mailto:${supportEmail}" style="color: #2D6A2D;">${supportEmail}</a>.
              </p>

              <p style="margin-top: 24px;">
                Warm regards,<br />
                <strong>The Fresh360 Degrees Foods Team</strong><br />
                <span style="font-size: 13px; color: #64748b;">Secunderabad, Telangana</span>
              </p>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Fresh 360 Degrees Foods LLP. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      })

      if (ackError) {
        console.warn('[Resend] Customer acknowledgement email failed or pending domain verification:', ackError.message)
      } else {
        console.log(`[Resend] Successfully dispatched customer acknowledgement to ${email}`)
      }
    } catch (ackErr: any) {
      console.warn('[Resend] Exception dispatching customer acknowledgement:', ackErr?.message || ackErr)
    }
  } else {
    console.info('[Resend] RESEND_API_KEY is not configured. Outbound emails skipped; inquiry safely persisted in Sanity.')
  }

  return {
    success: true,
    inquiryId: sanityDocId,
  }
}

// Backwards-compatible alias for existing code
export const submitEnquiry = submitInquiry
