import { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Fresh 360 Degrees Foods',
  description: 'Get in touch with Fresh 360 for bulk orders, feedback, or general inquiries.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-juicera)] opacity-10 blur-[120px] -mr-64" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 font-[family-name:var(--font-heading)]">
            Let&apos;s <span className="text-[var(--color-juicera)]">Connect</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Whether you&apos;re looking for a bulk order for your next event or just want to say hi, we&apos;re here to help. Reach out to our team today.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-8 text-slate-900 font-[family-name:var(--font-heading)]">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mr-6 border border-slate-100 shrink-0">
                      <Phone className="w-6 h-6 text-[var(--color-juicera)]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Phone</p>
                      <p className="text-xl font-bold text-slate-900">+91 91103 28633</p>
                      <p className="text-slate-500">Available 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mr-6 border border-slate-100 shrink-0">
                      <Mail className="w-6 h-6 text-[var(--color-juicera)]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Email</p>
                      <p className="text-xl font-bold text-slate-900">support@fresh360.com</p>
                      <p className="text-slate-500">We usually reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mr-6 border border-slate-100 shrink-0">
                      <MapPin className="w-6 h-6 text-[var(--color-juicera)]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Location</p>
                      <p className="text-xl font-bold text-slate-900">Hyderabad, Telangana</p>
                      <p className="text-slate-500">India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-amber-500" />
                  Quick Chat
                </h3>
                <p className="text-slate-600 mb-6">
                  Need an instant response? Chat with us on WhatsApp for orders and support.
                </p>
                <Link 
                  href="https://wa.me/919110328633"
                  className="inline-flex items-center bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Message on WhatsApp
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12 font-[family-name:var(--font-heading)] text-slate-900">Common Questions</h2>
          <div className="space-y-4 text-left">
            {[
              { q: "Do you deliver across India?", a: "Currently, we offer local delivery in Hyderabad. For bulk orders, we can arrange shipping across Telangana and Andhra Pradesh." },
              { q: "How long do the juices last?", a: "Our Juicera cold-pressed juices have a shelf life of 3-5 days when refrigerated at 4°C, as they contain no preservatives." },
              { q: "Can I customize an order for an event?", a: "Absolutely! We specialize in corporate events, weddings, and parties. Contact us via bulk inquiry for custom labels and flavors." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
