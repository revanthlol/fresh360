import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Fresh 360',
  description: 'Privacy Policy for Fresh 360 Degrees Foods LLP — how we collect, use, and protect your personal information.',
  robots: { index: true, follow: true },
}

const EFFECTIVE_DATE = '29 April 2025'
const COMPANY_NAME = 'Fresh 360 Degrees Foods LLP'
const COMPANY_ADDRESS = '#1- 21-223, West Venkata Puram, Tirumalagiri, Hyderabad, 500015'
const CONTACT_EMAIL = 'support@fresh360degrees.in'
const WHATSAPP = '+91 97055 22020'

export default function PrivacyPolicyPage() {
  return (
    <main className="home-page min-h-screen">
      {/* Header */}
      <div className="home-surface border-b border-emerald-100/70 pt-28 pb-14">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Legal</span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 mt-3 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500">
            Effective date: <strong>{EFFECTIVE_DATE}</strong> &nbsp;·&nbsp;
            Governing jurisdiction: Karnataka, India
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 max-w-3xl py-16 space-y-12">

        {/* 1. Who We Are */}
        <Section id="who-we-are" title="1. Who We Are">
          <p>
            This Privacy Policy applies to <strong>{COMPANY_NAME}</strong> (&ldquo;Fresh 360&rdquo;, &ldquo;we&rdquo;,
            &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a Limited Liability Partnership registered under the
            Limited Liability Partnership Act, 2008, with its principal place of business in{' '}
            {COMPANY_ADDRESS}.
          </p>
          <p>
            We operate the website <strong>fresh360.com</strong> (the &ldquo;Site&rdquo;) as a brand and product
            showcase. The Site is not an e-commerce platform and does not process any financial
            transactions online.
          </p>
        </Section>

        {/* 2. Information We Collect */}
        <Section id="information-collected" title="2. Information We Collect">
          <p>We collect only the information you voluntarily provide to us:</p>
          <ul>
            <li><strong>Contact form submissions:</strong> Your full name, email address, Indian mobile number, optional subject line, and message body.</li>
            <li><strong>WhatsApp communications:</strong> If you contact us via the WhatsApp button, any information you share in that conversation is governed by WhatsApp&apos;s own Privacy Policy (Meta Platforms, Inc.).</li>
          </ul>
          <p>
            We do <strong>not</strong> collect: payment information, account credentials, cookies for
            tracking, or any data through automated tracking technologies such as pixels or fingerprinting.
          </p>
          <p>
            Our Site may load avatar images from <strong>Pravatar.cc</strong> (a third-party image
            service) for illustrative purposes. We do not share your data with this service.
          </p>
        </Section>

        {/* 3. How We Use Your Information */}
        <Section id="how-we-use" title="3. How We Use Your Information">
          <p>We use the information you submit through the contact form solely to:</p>
          <ul>
            <li>Respond to your product enquiry, wholesale inquiry, or general question.</li>
            <li>Route your message to the appropriate team member by email.</li>
            <li>Maintain an internal log of received enquiries for operational purposes.</li>
          </ul>
          <p>
            We will <strong>not</strong> use your information for unsolicited marketing, sell it to
            third parties, or share it with any party not directly involved in responding to your enquiry.
          </p>
        </Section>

        {/* 4. Legal Basis for Processing */}
        <Section id="legal-basis" title="4. Legal Basis for Processing (DPDP Act 2023)">
          <p>
            Under India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the
            Information Technology Act, 2000, our legal basis for processing the personal data you submit is:
          </p>
          <ul>
            <li><strong>Consent:</strong> By submitting the contact form, you give informed consent to us processing your data for the stated purpose.</li>
            <li><strong>Legitimate interests:</strong> Operating a business enquiry channel to respond to inbound communications.</li>
          </ul>
        </Section>

        {/* 5. Data Storage & Third-Party Processors */}
        <Section id="data-storage" title="5. Data Storage & Third-Party Processors">
          <p>
            Your form submission data is processed by the following sub-processors:
          </p>
          <table>
            <thead>
              <tr>
                <th>Processor</th>
                <th>Purpose</th>
                <th>Data Shared</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Sanity.io</strong></td>
                <td>Headless CMS — stores enquiry records</td>
                <td>Name, email, phone, subject, message</td>
                <td>USA (SOC 2 certified)</td>
              </tr>
              <tr>
                <td><strong>Resend</strong></td>
                <td>Transactional email delivery</td>
                <td>Name, email, phone, subject, message</td>
                <td>USA / EU</td>
              </tr>
            </tbody>
          </table>
          <p>
            Both processors are bound by their own data processing agreements and privacy policies.
            Cross-border data transfers to these processors are carried out under standard contractual
            clauses or equivalent safeguards recognised under applicable Indian law.
          </p>
        </Section>

        {/* 6. Data Retention */}
        <Section id="data-retention" title="6. Data Retention">
          <p>
            Enquiry records stored in our CMS are retained for a maximum of <strong>12 months</strong> from
            the date of submission, after which they are permanently deleted. Email records are subject
            to the retention policies of our email provider (Resend).
          </p>
          <p>
            If you request deletion of your data before the 12-month period, we will honour that request
            within 30 days of receiving a written request.
          </p>
        </Section>

        {/* 7. Your Rights */}
        <Section id="your-rights" title="7. Your Rights">
          <p>Under the DPDP Act 2023, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> — Request a copy of the personal data we hold about you.</li>
            <li><strong>Correction</strong> — Request correction of inaccurate or incomplete data.</li>
            <li><strong>Erasure</strong> — Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
            <li><strong>Grievance redressal</strong> — Lodge a complaint with us regarding data handling.</li>
            <li><strong>Withdraw consent</strong> — Withdraw your consent at any time; this does not affect the lawfulness of processing done prior to withdrawal.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at <strong>{CONTACT_EMAIL}</strong> or on WhatsApp
            at <strong>{WHATSAPP}</strong>.
          </p>
        </Section>

        {/* 8. Data Security */}
        <Section id="data-security" title="8. Data Security">
          <p>
            We take reasonable technical and organisational measures to protect your personal data,
            including:
          </p>
          <ul>
            <li>HTTPS encryption for all data in transit.</li>
            <li>Restricted access to enquiry data (only authorised team members).</li>
            <li>Use of SOC 2 and ISO-certified third-party processors.</li>
            <li>Input validation and HTML-escaping on all form submissions to prevent injection attacks.</li>
          </ul>
          <p>
            No method of transmission over the Internet is 100% secure. While we strive to use
            commercially acceptable means to protect your data, we cannot guarantee absolute security.
          </p>
        </Section>

        {/* 9. Children's Privacy */}
        <Section id="childrens-privacy" title="9. Children's Privacy">
          <p>
            Our Site is not directed to individuals under the age of 18. We do not knowingly collect
            personal data from minors. If you believe a minor has submitted data to us, please contact
            us immediately and we will delete it promptly.
          </p>
        </Section>

        {/* 10. Links to Third-Party Sites */}
        <Section id="third-party-links" title="10. Links to Third-Party Sites">
          <p>
            Our Site may contain links to third-party websites (e.g., WhatsApp, social media profiles).
            This Privacy Policy applies solely to Fresh360.com. We are not responsible for the privacy
            practices of third-party sites and encourage you to review their policies independently.
          </p>
        </Section>

        {/* 11. Changes to This Policy */}
        <Section id="changes" title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or applicable law. Material changes will be indicated by updating the &ldquo;Effective date&rdquo; at
            the top of this page. Continued use of the Site after such changes constitutes acceptance
            of the updated policy.
          </p>
        </Section>

        {/* 12. Contact / Grievance Officer */}
        <Section id="contact" title="12. Contact & Grievance Officer">
          <p>
            For privacy-related queries, data rights requests, or to raise a grievance, please contact
            our designated data protection point of contact:
          </p>
          <ContactBlock />
        </Section>

        {/* Navigation */}
        <div className="pt-8 border-t border-emerald-100/70 flex flex-col sm:flex-row gap-4 justify-between items-start">
          <Link href="/legal/terms" className="text-brand-green font-bold hover:underline text-sm">
            → Read our Terms of Service
          </Link>
          <Link href="/" className="text-slate-400 hover:text-slate-700 text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-5 pb-3 border-b border-emerald-100/70">
        {title}
      </h2>
      <div className="prose-legal">
        {children}
      </div>
    </section>
  )
}

function ContactBlock() {
  return (
    <div className="mt-4 home-card rounded-2xl p-6 space-y-2 text-sm text-slate-600">
      <p><strong className="text-slate-900">{COMPANY_NAME}</strong></p>
      <p>{COMPANY_ADDRESS}</p>
      <p>
        Email:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-green font-medium hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>
        WhatsApp:{' '}
        <a href="https://wa.me/919705522020" className="text-brand-green font-medium hover:underline" target="_blank" rel="noopener noreferrer">
          {WHATSAPP}
        </a>
      </p>
    </div>
  )
}
