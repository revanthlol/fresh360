import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Fresh 360',
  description: 'Terms of Service for Fresh 360 Degrees Foods LLP — the rules governing use of the Fresh360 website.',
  robots: { index: true, follow: true },
}

const EFFECTIVE_DATE = '29 April 2025'
const COMPANY_NAME = 'Fresh 360 Degrees Foods LLP'
const COMPANY_ADDRESS = '#1- 21-223, West Venkata Puram, Tirumalagiri, Hyderabad, 500015'
const CONTACT_EMAIL = 'support@fresh360degrees.in'
const WHATSAPP = '+91 97055 22020'

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 pt-28 pb-14">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Legal</span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 mt-3 mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500">
            Effective date: <strong>{EFFECTIVE_DATE}</strong> &nbsp;·&nbsp;
            Governing law: Laws of India (Telangana jurisdiction)
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 max-w-3xl py-16 space-y-12">

        {/* 1. Acceptance */}
        <Section id="acceptance" title="1. Acceptance of Terms">
          <p>
            By accessing or using the website <strong>fresh360.com</strong> (the &ldquo;Site&rdquo;), you agree
            to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms,
            please do not use the Site.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and{' '}
            <strong>{COMPANY_NAME}</strong> (&ldquo;Fresh 360&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a
            Limited Liability Partnership registered under the Limited Liability Partnership Act,
            2008, with its principal office in {COMPANY_ADDRESS}.
          </p>
        </Section>

        {/* 2. Nature of the Site */}
        <Section id="nature" title="2. Nature of the Site">
          <p>
            The Site is a <strong>brand and product showcase</strong> operated by Fresh 360. It is
            intended to:
          </p>
          <ul>
            <li>Present information about our beverage brands (Juicera and Fuzzy).</li>
            <li>Enable visitors to make product or wholesale enquiries via the contact form or WhatsApp.</li>
            <li>Serve as a digital marketing and brand identity platform.</li>
          </ul>
          <p>
            <strong>The Site is NOT an e-commerce platform.</strong> No products can be purchased
            through the Site. No financial transactions are processed online. All purchases must be
            arranged through our official sales and distribution channels.
          </p>
        </Section>

        {/* 3. Eligibility */}
        <Section id="eligibility" title="3. Eligibility">
          <p>
            By using this Site, you represent that you are at least <strong>18 years of age</strong>,
            or that you are accessing the Site under the supervision of a parent or legal guardian who
            agrees to these Terms on your behalf.
          </p>
        </Section>

        {/* 4. Intellectual Property */}
        <Section id="ip" title="4. Intellectual Property">
          <p>
            All content on the Site — including but not limited to text, photographs, product images,
            logos, brand names (Juicera, Fuzzy), graphics, and the overall layout — is the
            exclusive property of <strong>{COMPANY_NAME}</strong> or its licensors and is protected
            under applicable Indian and international intellectual property laws.
          </p>
          <p>You may not:</p>
          <ul>
            <li>Reproduce, redistribute, publish, or create derivative works from any Site content without our prior written consent.</li>
            <li>Use our brand names, logos, or trademarks in any manner likely to cause confusion or imply association with Fresh 360 without authorisation.</li>
            <li>Scrape, mine, or extract data from the Site through automated means.</li>
          </ul>
          <p>
            Limited use is permitted for personal, non-commercial reference. Any other use requires
            explicit written permission.
          </p>
        </Section>

        {/* 5. Use of the Site */}
        <Section id="acceptable-use" title="5. Acceptable Use">
          <p>When using the Site or submitting an enquiry form, you agree not to:</p>
          <ul>
            <li>Submit false, misleading, or fraudulent information.</li>
            <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity.</li>
            <li>Transmit any unsolicited commercial communications (spam) through our contact forms.</li>
            <li>Attempt to gain unauthorised access to any part of the Site or its underlying systems.</li>
            <li>Introduce viruses, malware, or any other harmful code.</li>
            <li>Use the Site in any manner that violates applicable Indian law, including the Information Technology Act, 2000, or the Digital Personal Data Protection Act, 2023.</li>
            <li>Engage in any activity that disrupts or interferes with the proper working of the Site.</li>
          </ul>
        </Section>

        {/* 6. Contact Form & Enquiries */}
        <Section id="contact-form" title="6. Contact Form & Enquiries">
          <p>
            When you submit an enquiry through our contact form, you acknowledge:
          </p>
          <ul>
            <li>The information you provide is accurate and complete to the best of your knowledge.</li>
            <li>You are submitting the form on your own behalf or with the authority of the organisation you represent.</li>
            <li>Submission of a form does not constitute a binding order, contract, or agreement for the supply of any goods or services.</li>
            <li>We will endeavour to respond to enquiries within 2–5 business days, but we make no guarantee of response time.</li>
          </ul>
          <p>
            Wholesale and trade enquiries are subject to separate commercial terms that will be
            communicated to you directly.
          </p>
        </Section>

        {/* 7. Disclaimers */}
        <Section id="disclaimers" title="7. Disclaimers">
          <p>
            The Site and all its content are provided on an <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>{' '}
            basis without any warranties of any kind, either express or implied, including but not
            limited to:
          </p>
          <ul>
            <li>Warranties of merchantability or fitness for a particular purpose.</li>
            <li>Warranties that the Site will be uninterrupted, error-free, or free from viruses.</li>
            <li>Warranties regarding the accuracy, completeness, or timeliness of any information on the Site.</li>
          </ul>
          <p>
            Product descriptions, ingredient information, and health claims on the Site are provided
            for general informational purposes. Always check product labels for the most current and
            accurate information. Nothing on this Site constitutes medical or nutritional advice.
          </p>
        </Section>

        {/* 8. Limitation of Liability */}
        <Section id="liability" title="8. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, <strong>{COMPANY_NAME}</strong> and its
            partners, directors, employees, and agents shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of or relating to your use of (or
            inability to use) the Site.
          </p>
          <p>
            Our total liability to you for any claim arising from your use of the Site shall not
            exceed <strong>₹1,000 (Indian Rupees One Thousand)</strong>.
          </p>
          <p>
            This limitation applies regardless of the form of action, whether based on contract, tort,
            negligence, strict liability, or otherwise, even if we have been advised of the possibility
            of such damages.
          </p>
        </Section>

        {/* 9. Third-Party Links */}
        <Section id="third-party" title="9. Third-Party Links & Services">
          <p>
            The Site may contain links to external websites (including WhatsApp and social media
            platforms). These links are provided for convenience only. We do not endorse, control,
            or assume any responsibility for the content or practices of any third-party websites.
            Accessing third-party links is entirely at your own risk.
          </p>
        </Section>

        {/* 10. Privacy */}
        <Section id="privacy" title="10. Privacy">
          <p>
            Your use of the Site is also governed by our{' '}
            <Link href="/legal/privacy" className="text-brand-green font-medium hover:underline">
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference. By using the Site, you consent to
            the data practices described in our Privacy Policy.
          </p>
        </Section>

        {/* 11. Indemnification */}
        <Section id="indemnification" title="11. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless <strong>{COMPANY_NAME}</strong> and its
            officers, directors, employees, and agents from and against any claims, damages, losses,
            liabilities, costs, and expenses (including reasonable legal fees) arising from:
          </p>
          <ul>
            <li>Your use of or access to the Site.</li>
            <li>Your violation of these Terms.</li>
            <li>Your violation of any applicable law or the rights of any third party.</li>
          </ul>
        </Section>

        {/* 12. Modifications */}
        <Section id="modifications" title="12. Modifications to the Site & Terms">
          <p>
            We reserve the right to modify, suspend, or discontinue the Site (or any part of it) at
            any time without prior notice or liability. We may also update these Terms periodically.
            Material updates will be reflected by revising the &ldquo;Effective date&rdquo; above.
          </p>
          <p>
            Your continued use of the Site after any modification constitutes acceptance of the
            revised Terms. If you do not agree to the revised Terms, you must stop using the Site.
          </p>
        </Section>

        {/* 13. Governing Law */}
        <Section id="governing-law" title="13. Governing Law & Dispute Resolution">
          <p>
            These Terms are governed by and construed in accordance with the <strong>laws of India</strong>.
            Any dispute arising out of or in connection with these Terms shall be subject to the
            exclusive jurisdiction of the courts located in <strong>Hyderabad, Telangana, India</strong>.
          </p>
          <p>
            Before initiating formal legal proceedings, both parties agree to attempt to resolve
            any dispute in good faith through direct communication for a period of <strong>30 days</strong>.
          </p>
        </Section>

        {/* 14. Contact */}
        <Section id="contact" title="14. Contact Us">
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <ContactBlock />
        </Section>

        {/* Navigation */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-start">
          <Link href="/legal/privacy" className="text-brand-green font-bold hover:underline text-sm">
            → Read our Privacy Policy
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
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100">
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
    <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-6 space-y-2 text-sm text-slate-600 shadow-sm">
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
