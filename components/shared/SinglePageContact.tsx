"use client"

import React from 'react'
import { ContactForm } from './ContactForm'
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'

export function SinglePageContact({ id = 'contact' }: { id?: string }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9705522020'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Fresh 360, I'd like to get in touch!")}`

  return (
    <section id={id} className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-brand-green text-xs font-bold uppercase tracking-widest">
            <Send size={13} /> Direct Connect
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
            Let’s Talk Pure Refreshment
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Have questions about distribution, wholesale supply, or our cold-pressed process? Drop us a line or message us directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Quick Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="home-card p-8 sm:p-10 rounded-[2.5rem] border border-emerald-100/70 shadow-sm space-y-8 bg-white">
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Contact Details
              </h3>

              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand-green shadow-sm border border-emerald-100 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                    <a href="tel:+919705522020" className="text-slate-900 font-semibold hover:text-brand-green transition-colors">
                      +91 97055 22020
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand-green shadow-sm border border-emerald-100 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                    <a href="mailto:support@fresh360degrees.in" className="text-slate-900 font-semibold hover:text-brand-green transition-colors">
                      support@fresh360degrees.in
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand-green shadow-sm border border-emerald-100 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Headquarters</p>
                    <p className="text-slate-700 font-medium text-sm leading-relaxed">
                      #1-21-223, West Venkata Puram, Road No. 9, Tirumalagiri, Secunderabad, Telangana - 500015
                    </p>
                  </div>
                </li>
              </ul>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-95 text-sm"
                >
                  <MessageCircle size={20} />
                  Chat Instantly on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="home-card p-8 sm:p-10 rounded-[2.5rem] border border-emerald-100/70 shadow-sm bg-white">
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
                Send an Inquiry
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                Fill out the quick form below and our team will get back to you promptly.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
