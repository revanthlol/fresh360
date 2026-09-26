'use server'

import { Resend } from 'resend'
import { sanityWriteClient } from '@/lib/sanity'
import { z } from 'zod'
import { 
  getSupportNotificationHtml, 
  getCustomerAcknowledgementHtml,
  getNewsletterConfirmationHtml 
} from '@/lib/email-templates'

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
  if (resend) {
    const sender = process.env.RESEND_FROM_EMAIL || 'Fresh360 Degrees Foods <support@fresh360degrees.in>'
    const supportEmail = 'support@fresh360degrees.in'

    const emailData = {
      fullName,
      email,
      phone: phone || '',
      brandInterest: brandInterest || 'General',
      inquiryType: inquiryType || 'General Inquiry',
      message,
      sanityDocId,
      submittedAt: new Date().toISOString(),
    }

    // Task 2a: Send notification email to support@fresh360degrees.in
    try {
      const { error: notifError } = await resend.emails.send({
        from: sender,
        to: supportEmail,
        replyTo: email, // Direct reply goes to customer
        subject: `New Customer Inquiry: ${safeFullName} (${safeInquiryType})`,
        html: getSupportNotificationHtml(emailData),
      })

      if (notifError) {
        console.warn('[Resend] Support notification failed:', notifError.message)
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
        subject: 'We have received your inquiry — Fresh 360 Degrees Foods',
        html: getCustomerAcknowledgementHtml(emailData),
      })

      if (ackError) {
        console.warn('[Resend] Customer acknowledgement email failed:', ackError.message)
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

/**
 * Server Action: Subscribe to Newsletter
 * 1. Persists subscriber email in Sanity CMS under `_type: "subscriber"`
 * 2. Sends confirmation email via Resend to the subscriber
 */
export async function subscribeNewsletterAction(
  prevState: { success: boolean; message?: string; error?: string } | null,
  formData: FormData
) {
  const emailRaw = formData.get('email')
  const emailValidation = z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .safeParse(emailRaw)

  if (!emailValidation.success) {
    return {
      success: false,
      error: emailValidation.error.errors[0]?.message || 'Please enter a valid email address.',
    }
  }

  const email = emailValidation.data.toLowerCase()
  let subscriberDocId: string | null = null

  // 1. PRIMARY PERSISTENCE: Store subscriber document in Sanity CMS
  if (process.env.SANITY_API_TOKEN && sanityWriteClient) {
    try {
      // Check if subscriber already exists
      const existing = await sanityWriteClient.fetch<{ _id: string; status: string } | null>(
        `*[_type == "subscriber" && lower(email) == $email][0]{ _id, status }`,
        { email }
      )

      if (existing) {
        subscriberDocId = existing._id
        if (existing.status !== 'subscribed') {
          await sanityWriteClient.patch(existing._id).set({ status: 'subscribed' }).commit()
        }
        console.log(`[Sanity] Existing newsletter subscriber recognized ID: ${subscriberDocId}`)
      } else {
        const doc = await sanityWriteClient.create({
          _type: 'subscriber',
          email,
          status: 'subscribed',
          subscribedAt: new Date().toISOString(),
          source: 'website_newsletter',
        })
        subscriberDocId = doc._id
        console.log(`[Sanity] Successfully persisted new newsletter subscriber ID: ${subscriberDocId}`)
      }
    } catch (sanityErr: any) {
      console.error('[Sanity] Error persisting newsletter subscriber:', sanityErr?.message || sanityErr)
      return {
        success: false,
        error: 'Unable to save subscription at this moment. Please try again later.',
      }
    }
  } else {
    console.error('[Sanity] SANITY_API_TOKEN is missing or sanityWriteClient is unavailable.')
    return {
      success: false,
      error: 'Service configuration incomplete. Please try again later.',
    }
  }

  // 2. OUTBOUND CONFIRMATION EMAIL via Resend
  if (resend) {
    const sender = process.env.RESEND_FROM_EMAIL || 'Fresh360 Degrees Foods <support@fresh360degrees.in>'
    const supportEmail = 'support@fresh360degrees.in'

    try {
      const { error: sendError } = await resend.emails.send({
        from: sender,
        to: email,
        replyTo: supportEmail,
        subject: "Welcome to Fresh 360 Degrees — You're on the list!",
        html: getNewsletterConfirmationHtml(email),
      })

      if (sendError) {
        console.warn('[Resend] Newsletter confirmation email dispatch failed:', sendError.message)
      } else {
        console.log(`[Resend] Successfully dispatched newsletter confirmation to ${email}`)
      }
    } catch (sendErr: any) {
      console.warn('[Resend] Exception dispatching newsletter confirmation:', sendErr?.message || sendErr)
    }
  } else {
    console.info('[Resend] RESEND_API_KEY is not configured. Confirmation email skipped; subscriber safely persisted in Sanity.')
  }

  return {
    success: true,
    message: "Welcome to the family! A confirmation has been sent to your email.",
  }
}
