import React from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ContactForm } from '@/components/shared/ContactForm'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="Get in Touch"
        subtitle="Have questions? We'd love to hear from you. Reach out to the Fresh 360 team."
      />

      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Details */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-slate-50 p-10 rounded-[2.5rem] space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-slate-900">Contact Details</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                        <p className="text-slate-900 font-medium">+91 91103 28633</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                        <p className="text-slate-900 font-medium">info@fresh360.com</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address</p>
                        <p className="text-slate-900 font-medium leading-relaxed">
                          Fresh 360 Degrees Foods LLP, <br />
                          Bangalore, KA 560001
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="space-y-6 pt-10 border-t border-slate-200">
                  <h3 className="text-2xl font-display font-bold text-slate-900">Business Hours</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Monday - Friday</span>
                      <span className="text-slate-900 font-bold">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Saturday</span>
                      <span className="text-slate-900 font-bold">10:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">Sunday</span>
                      <span className="text-red-500 font-bold">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link 
                href="https://wa.me/919110328633"
                target="_blank"
                className="block bg-[#25D366] text-white p-8 rounded-[2.5rem] text-center space-y-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                   <MessageCircle size={28} />
                </div>
                <h4 className="text-xl font-bold">Chat with Support</h4>
                <p className="text-white/80 text-sm">Instant help via WhatsApp</p>
              </Link>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-12 border border-slate-100 rounded-[2.5rem] shadow-sm">
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
      
      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-slate-100 relative overflow-hidden grayscale opacity-50">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
               <MapPin size={48} className="text-slate-400 mx-auto" />
               <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">Map Loading...</p>
            </div>
         </div>
      </section>
    </div>
  )
}
