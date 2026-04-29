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
                        <p className="text-slate-900 font-medium">+91 93913 11652</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                        <p className="text-slate-900 font-medium">support@fresh360degrees.in</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address</p>
                        <p className="text-slate-900 font-medium text-sm leading-relaxed">
                          #1- 21-223, West Venkata Puram,<br />
                          Near Hanuman Temple,<br />
                          Venkateshwara Nagar, Road No. 9,<br />
                          Tirumalagiri, Hyderabad,<br />
                          TELANGANA-500015
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <Link 
                href="https://wa.me/919391311652"
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
      
      {/* Map Section */}
      <section className="h-[450px] w-full relative overflow-hidden border-t border-slate-100">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d444.2907879279642!2d78.49975443457429!3d17.495327649069804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDI5JzQyLjYiTiA3OMKwMzAnMDAuOSJF!5e0!3m2!1sen!2sin!4v1777458243548!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider pointer-events-none">
          FGW2+339 Secunderabad, Telangana
        </div>
      </section>
    </div>
  )
}
