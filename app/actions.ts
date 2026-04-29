'use server'

import { Resend } from 'resend'
import { sanityWriteClient } from '@/lib/sanity'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(?:\+91|0)?[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Helper to escape HTML to prevent injection
const escapeHtml = (str: string) => {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m] || m))
}

export async function submitEnquiry(formData: FormData) {
  // Check for API Keys early
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing')
    return { success: false, error: 'Email service is currently unavailable. Please contact us via WhatsApp.' }
  }

  // Extract data from FormData
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  }

  // Validate data
  const validatedFields = enquirySchema.safeParse(rawData)

  if (!validatedFields.success) {
    return { 
      success: false, 
      error: 'Please correct the highlighted errors.',
      fieldErrors: validatedFields.error.flatten().fieldErrors 
    }
  }

  const { name, email, phone, subject, message } = validatedFields.data

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject || 'General Inquiry')
  const safeMessage = escapeHtml(message)

  try {
    // 1. Send Email via Resend
    const contactEmail = process.env.CONTACT_EMAIL || 'info@fresh360.com'
    const { error: resendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Fresh 360 <onboarding@resend.dev>',
      to: contactEmail,
      subject: `New Enquiry from ${safeName}: ${safeSubject}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: sans-serif; line-height: 1.5; color: #334155; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 24px; background-color: #ffffff; }
            .header { text-align: center; margin-bottom: 32px; }
            .logo { display: inline-block; padding: 12px 24px; background-color: #2D6A2D; color: #ffffff; border-radius: 12px; font-weight: bold; font-size: 20px; margin-bottom: 16px; text-decoration: none; }
            .info-box { background-color: #f8fafc; padding: 32px; border-radius: 20px; margin-bottom: 24px; }
            .label { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 4px; display: block; }
            .value { margin: 0 0 20px 0; color: #1e293b; font-size: 16px; font-weight: 600; }
            .message-box { padding: 32px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; }
            .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Fresh 360°</div>
              <h2 style="color: #1e293b; margin: 0; font-size: 24px;">New Enquiry Received</h2>
              <p style="color: #64748b; margin-top: 8px;">A new visitor has reached out through the website.</p>
            </div>
            
            <div class="info-box">
              <span class="label">Visitor Name</span>
              <p class="value">${safeName}</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="50%" valign="top">
                    <span class="label">Email Address</span>
                    <p class="value"><a href="mailto:${email}" style="color: #2D6A2D; text-decoration: none;">${safeEmail}</a></p>
                  </td>
                  <td width="50%" valign="top">
                    <span class="label">Phone Number</span>
                    <p class="value">${phone}</p>
                  </td>
                </tr>
              </table>
              
              <span class="label">Inquiry Subject</span>
              <p class="value" style="margin-bottom: 0;">${safeSubject}</p>
            </div>

            <div class="message-box">
              <span class="label">Message Content</span>
              <p style="margin: 12px 0 0; color: #334155; line-height: 1.7; white-space: pre-wrap; font-size: 16px;">${safeMessage}</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Fresh 360 Degrees Foods LLP. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (resendError) {
      console.error('Resend error:', resendError)
      return { success: false, error: 'Failed to send email. Please try again later.' }
    }

    // 2. Store in Sanity (only if token is configured)
    if (process.env.SANITY_API_TOKEN && sanityWriteClient) {
      try {
        await sanityWriteClient.create({
          _type: 'enquiry',
          name,
          email,
          phone,
          subject: subject || 'General Inquiry',
          message,
          status: 'new',
          createdAt: new Date().toISOString(),
        })
      } catch (sanityError) {
        console.error('Sanity storage error:', sanityError)
        // We don't return false here because the email was already sent successfully
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Submission error:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again later.' }
  }
}
