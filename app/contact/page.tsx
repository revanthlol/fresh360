import React from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ContactForm } from '@/components/shared/ContactForm'
import { ContactMap } from '@/components/shared/ContactMap'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="home-page min-h-screen">
      <PageHeader 
        title="Get in Touch"
        subtitle="Have questions? We'd love to hear from you. Reach out to the Fresh 360 team."
      />

      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Contact Details */}
            <div className="min-w-0 lg:col-span-1 space-y-8">
              <div className="home-card min-w-0 p-5 sm:p-10 rounded-[2.5rem] space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-slate-900">Contact Details</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="w-12 h-12 bg-[linear-gradient(180deg,rgba(255,255,252,0.98),rgba(239,247,239,0.96))] rounded-2xl flex items-center justify-center text-brand-green shadow-sm border border-emerald-100/80 shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                        <p className="text-slate-900 font-medium">+91 97055 22020</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-12 h-12 bg-[linear-gradient(180deg,rgba(255,255,252,0.98),rgba(239,247,239,0.96))] rounded-2xl flex items-center justify-center text-brand-green shadow-sm border border-emerald-100/80 shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                        <p className="break-all text-slate-900 font-medium">support@fresh360degrees.in</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-12 h-12 bg-[linear-gradient(180deg,rgba(255,255,252,0.98),rgba(239,247,239,0.96))] rounded-2xl flex items-center justify-center text-brand-green shadow-sm border border-emerald-100/80 shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address</p>
                        <p className="text-slate-900 font-medium text-sm leading-relaxed">
                          #1- 21-223, West Venkata Puram, Road No. 9, Tirumalagiri, Secunderabad, Telangana-500015
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <Link 
                href="https://wa.me/919705522020"
                target="_blank"
                className="block bg-[#25D366] text-white p-8 rounded-[2.5rem] text-center space-y-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                   <MessageCircle size={28} />
                </div>
                <h4 className="text-xl font-bold">Chat with Support</h4>
                <p className="text-white/80 text-sm">Instant help via WhatsApp</p>
              </Link>
              <ContactMap />
            </div>

            {/* Form Section */}
            <div className="min-w-0 lg:col-span-2">
              <div className="home-card p-6 md:p-12 rounded-[2.5rem]">
                <SectionHeader 
                  label="Inquiry Form"
                  title="Send us a Message"
                  subtitle="Fill out the form below and we'll get back to you shortly."
                  centered={false}
                />
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  )
}
