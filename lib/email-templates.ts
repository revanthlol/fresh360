export interface EmailData {
  fullName: string
  email: string
  phone?: string
  brandInterest?: string
  inquiryType?: string
  message: string
  sanityDocId?: string | null
  submittedAt?: string
}

const escapeHtml = (str: string = '') => {
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&': return '&amp;'
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '"': return '&quot;'
      case "'": return '&#39;'
      default: return m
    }
  })
}

/**
 * Generates responsive, bulletproof HTML email template for customer acknowledgement
 */
export function getCustomerAcknowledgementHtml(data: EmailData): string {
  const safeName = escapeHtml(data.fullName)
  const safeBrand = escapeHtml(data.brandInterest || "General")
  const safeInquiryType = escapeHtml(data.inquiryType || "General Inquiry")
  const safeMessage = escapeHtml(data.message)
  const year = new Date().getFullYear()

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Inquiry Confirmation — Fresh 360 Degrees Foods</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse:collapse;border-spacing:0;margin:0;}
    div, td {padding:0;}
    div {margin:0 !important;}
  </style>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F4F7F4; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    @media only screen and (max-width: 620px) {
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F7F4;">
  <div style="display: none; font-size: 1px; color: #F4F7F4; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Thank you for reaching out to Fresh 360 Degrees Foods. We have received your inquiry regarding ${safeBrand}.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="background-color: #F4F7F4; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 40, 0, 0.06); border: 1px solid #E5ECE5;" role="presentation">
          
          <!-- Top Accent Bar -->
          <tr>
            <td height="6" style="background-color: #2D6A2D;"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 44px 24px 44px; text-align: left;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                <tr>
                  <td>
                    <!-- Brand Badge -->
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="background-color: #EBF5EB; border-radius: 8px; padding: 6px 14px; font-size: 11px; font-weight: 800; color: #2D6A2D; letter-spacing: 0.12em; text-transform: uppercase;">
                          FRESH 360° DEGREES FOODS
                        </td>
                      </tr>
                    </table>
                    <h1 style="margin: 20px 0 0 0; font-size: 24px; font-weight: 800; color: #0C1E0C; line-height: 1.25; letter-spacing: -0.02em;">
                      We have received your inquiry
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #526652; line-height: 1.5;">
                      Nature’s Purest Cold-Pressed Experience · Juicera &amp; Fruizy
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 44px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                <tr>
                  <td height="1" style="background-color: #EFF4EF;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="mobile-padding" style="padding: 28px 44px 32px 44px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #1E293B; line-height: 1.6;">
                Dear <strong>${safeName}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; color: #334155; line-height: 1.65;">
                Thank you for contacting <strong>Fresh 360 Degrees Foods</strong>. We are pleased to confirm that your inquiry regarding <strong>${safeBrand}</strong> has reached our executive team. We are currently reviewing your request and will follow up with you directly.
              </p>

              <!-- Inquiry Summary Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAF8; border-radius: 14px; border: 1px solid #E5EBE5; margin-bottom: 24px;" role="presentation">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Inquiry Type</span>
                          <span style="font-size: 14px; font-weight: 700; color: #0C1E0C;">${safeInquiryType}</span>
                        </td>
                        <td style="padding-bottom: 12px;">
                          <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Brand Interest</span>
                          <span style="font-size: 14px; font-weight: 700; color: #2D6A2D;">${safeBrand}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top: 1px solid #E8EFE8; padding-top: 14px;">
                          <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 6px;">Submitted Message</span>
                          <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${safeMessage}"</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Assistance Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAFCFA; border-left: 3px solid #2D6A2D; padding: 14px 18px; margin-bottom: 24px; border-radius: 0 10px 10px 0;" role="presentation">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">
                      <strong>Have an urgent requirement or wholesale query?</strong><br />
                      You can reply directly to this email or reach our support desk at <a href="mailto:support@fresh360degrees.in" style="color: #2D6A2D; font-weight: 600; text-decoration: none;">support@fresh360degrees.in</a>.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Warm regards,<br />
                <strong style="color: #0C1E0C;">The Fresh 360 Degrees Foods Team</strong><br />
                <span style="font-size: 12px; color: #64748B;">Secunderabad, Telangana · India</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0A1A0A; padding: 32px 44px; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.05em;">
                      FRESH 360 DEGREES FOODS LLP
                    </p>
                    <p style="margin: 0 0 16px 0; font-size: 12px; color: #8CA08C; line-height: 1.5;">
                      Manufacturers of Premium Cold-Pressed Juices &amp; Sparkling Beverages<br />
                      Macherla Enclave, Mudfort, Secunderabad, Telangana 500009
                    </p>
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="https://fresh360degrees.in" style="color: #48A148; font-size: 12px; text-decoration: none; font-weight: 600;">Website</a>
                        </td>
                        <td style="color: #445544; font-size: 12px;">•</td>
                        <td style="padding: 0 8px;">
                          <a href="https://www.instagram.com/fresh360degreesfoods" style="color: #48A148; font-size: 12px; text-decoration: none; font-weight: 600;">Instagram</a>
                        </td>
                        <td style="color: #445544; font-size: 12px;">•</td>
                        <td style="padding: 0 8px;">
                          <a href="mailto:support@fresh360degrees.in" style="color: #48A148; font-size: 12px; text-decoration: none; font-weight: 600;">Support Desk</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 18px 0 0 0; font-size: 11px; color: #556655;">
                      © ${year} Fresh 360 Degrees Foods LLP. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Generates responsive, bulletproof HTML email template for staff notification (support@fresh360degrees.in)
 */
export function getSupportNotificationHtml(data: EmailData): string {
  const safeName = escapeHtml(data.fullName)
  const safeEmail = escapeHtml(data.email)
  const safePhone = escapeHtml(data.phone || "Not provided")
  const safeBrand = escapeHtml(data.brandInterest || "General")
  const safeInquiryType = escapeHtml(data.inquiryType || "General Inquiry")
  const safeMessage = escapeHtml(data.message)
  const safeDocId = escapeHtml(data.sanityDocId || "Stored in Sanity")
  const formattedDate = data.submittedAt 
    ? new Date(data.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST"
    : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST"

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>New Website Inquiry: ${safeName}</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse:collapse;border-spacing:0;margin:0;}
    div, td {padding:0;}
  </style>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    table { border-collapse: collapse !important; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    @media only screen and (max-width: 620px) {
      .mobile-padding { padding-left: 18px !important; padding-right: 18px !important; }
      .mobile-col { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="background-color: #F1F5F9; padding: 28px 14px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08); border: 1px solid #E2E8F0;" role="presentation">
          
          <!-- Alert Header Banner -->
          <tr>
            <td style="background-color: #0F172A; padding: 28px 36px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #22C55E; color: #022C22; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 6px;">
                      ● NEW INQUIRY CAPTURED
                    </span>
                    <h1 style="margin: 12px 0 0 0; font-size: 22px; font-weight: 800; color: #FFFFFF; line-height: 1.3;">
                      ${safeName}
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #94A3B8;">
                      ${safeInquiryType} · Interested in <strong style="color: #E2E8F0;">${safeBrand}</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Contact Snapshot -->
          <tr>
            <td class="mobile-padding" style="padding: 28px 36px 12px 36px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px;" role="presentation">
                <tr>
                  <td style="padding: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                      <tr>
                        <td width="50%" class="mobile-col" style="vertical-align: top; padding-bottom: 12px;">
                          <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 2px;">Customer Email</span>
                          <a href="mailto:${safeEmail}" style="font-size: 14px; font-weight: 700; color: #16A34A; text-decoration: none;">${safeEmail}</a>
                        </td>
                        <td width="50%" class="mobile-col" style="vertical-align: top; padding-bottom: 12px;">
                          <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 2px;">Phone Number</span>
                          <span style="font-size: 14px; font-weight: 700; color: #0F172A;">${safePhone}</span>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" class="mobile-col" style="vertical-align: top;">
                          <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 2px;">Submission Time</span>
                          <span style="font-size: 12px; font-weight: 600; color: #334155;">${formattedDate}</span>
                        </td>
                        <td width="50%" class="mobile-col" style="vertical-align: top;">
                          <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 2px;">Sanity Record ID</span>
                          <code style="font-size: 11px; background-color: #E2E8F0; padding: 2px 6px; border-radius: 4px; color: #0F172A; font-family: monospace;">${safeDocId}</code>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Message Content Box -->
          <tr>
            <td class="mobile-padding" style="padding: 12px 36px 24px 36px;">
              <span style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 8px;">
                Customer Message
              </span>
              <div style="background-color: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 12px; padding: 18px 20px; font-size: 14px; color: #1E293B; line-height: 1.65; white-space: pre-wrap;">${safeMessage}</div>
            </td>
          </tr>

          <!-- Quick Action Bar -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 32px 36px;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                <tr>
                  <td>
                    <!-- Outlook/Bulletproof Button Table -->
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td align="center" style="border-radius: 10px; background-color: #16A34A;">
                          <a href="mailto:${safeEmail}?subject=Re:%20Fresh%20360%20Inquiry%20-%20${encodeURIComponent(safeInquiryType)}" target="_blank" style="font-size: 13px; font-weight: 700; color: #FFFFFF; text-decoration: none; padding: 12px 22px; border-radius: 10px; display: inline-block; border: 1px solid #16A34A;">
                            Reply to Customer Directly
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" class="mobile-col" style="padding-top: 8px;">
                    <span style="font-size: 12px; color: #64748B;">
                      Tip: Clicking "Reply" in your email client sends to <strong style="color: #0F172A;">${safeEmail}</strong>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Operational Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 36px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94A3B8;">
                Fresh 360 Operational Automation · Secunderabad, Telangana<br />
                Logged automatically to Sanity CMS dataset <code>production</code>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
