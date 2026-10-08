"use client"

import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { CustomSelect } from './CustomSelect'
import { submitEnquiry } from '@/app/actions'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    const result = await submitEnquiry(formData)

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-brand-green-light p-12 rounded-[2.5rem] text-center space-y-4 border border-brand-green/20">
        <div className="w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-display font-bold text-slate-900">Inquiry Received!</h3>
        <p className="text-slate-600">
          Thank you for reaching out. We have received your inquiry and our team will get back to you shortly.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-brand-green font-bold underline mt-4"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form min-w-0 space-y-6">
      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100">
          <AlertCircle size={20} />
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="min-w-0 space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider" htmlFor="contact-name">Full Name</label>
          <input 
            required
            id="contact-name"
            name="name"
            type="text" 
            placeholder="John Doe"
            className="w-full min-w-0 px-4 sm:px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
          />
        </div>
        <div className="min-w-0 space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider" htmlFor="contact-email">Email Address</label>
          <input 
            required
            id="contact-email"
            name="email"
            type="email" 
            placeholder="john@example.com"
            className="w-full min-w-0 px-4 sm:px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="min-w-0 space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider" htmlFor="contact-phone">Phone Number</label>
          <input 
            id="contact-phone"
            name="phone"
            type="tel" 
            placeholder="+91 00000 00000"
            className="w-full min-w-0 px-4 sm:px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
          />
        </div>
        <div className="min-w-0 space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Brand Interest</label>
          <CustomSelect 
            name="brandInterest"
            label="Brand interest"
            defaultValue="Juicera"
            options={[
              { value: "Juicera", label: "Juicera (100% Pure Cold-Pressed)" },
              { value: "Fruizy", label: "Fruizy (Cold-Pressed + Sparkle)" },
              { value: "Fizzo", label: "Fizzo" },
              { value: "All Brands", label: "Interested in all brands" },
              { value: "General", label: "General Inquiry / Other" }
            ]}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-2">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">How can we help?</label>
        <CustomSelect 
          name="subject"
          label="How can we help?"
          defaultValue="Partnership Inquiry"
          options={[
            { value: "Partnership Inquiry", label: "Partnership Inquiry" },
            { value: "Bulk/Business Order", label: "Bulk/Business Order" },
            { value: "Franchise Opportunity", label: "Franchise Opportunity" },
            { value: "Feedback", label: "General Feedback" },
            { value: "Other", label: "Something Else" }
          ]}
        />
      </div>

      <div className="min-w-0 space-y-2">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider" htmlFor="contact-message">Message</label>
        <textarea 
          required
          id="contact-message"
          name="message"
          rows={5}
          placeholder="How can we help you?"
          className="w-full min-w-0 px-4 sm:px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all resize-none"
        />
      </div>

      <button 
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
        <Send size={20} />
      </button>
    </form>
  )
}
