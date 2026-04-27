'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address'),
  brandInterest: z.enum(['juicera', 'fuzzy', 'refrizz', 'general', 'bulk']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long')
})

type FormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    brandInterest: 'general',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(null)

    // Client-side validation
    const result = contactSchema.safeParse(formData)
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'Invalid input')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        brandInterest: 'general',
        message: ''
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
      <h3 className="text-2xl font-bold mb-8 text-slate-900">Send us a message</h3>
      
      {success && (
        <div className="mb-8 p-6 bg-green-50 border border-green-100 text-green-700 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
          <p className="font-bold flex items-center">
            <span className="mr-2">✨</span> Message Sent Successfully!
          </p>
          <p className="text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
        </div>
      )}

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-700 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
          <p className="font-bold flex items-center">
            <span className="mr-2">⚠️</span> Error
          </p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-slate-700">Full Name</label>
            <input 
              type="text" 
              id="name" 
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-juicera)]/20 focus:border-[var(--color-juicera)] transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold text-slate-700">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-juicera)]/20 focus:border-[var(--color-juicera)] transition-all"
              placeholder="9876543210"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</label>
          <input 
            type="email" 
            id="email" 
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-juicera)]/20 focus:border-[var(--color-juicera)] transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="brandInterest" className="text-sm font-bold text-slate-700">Interested in</label>
          <select 
            id="brandInterest" 
            value={formData.brandInterest}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-juicera)]/20 focus:border-[var(--color-juicera)] transition-all appearance-none"
          >
            <option value="general">General Inquiry</option>
            <option value="juicera">Juicera (Cold Pressed)</option>
            <option value="fuzzy">Fuzzy (Carbonated)</option>
            <option value="refrizz">Refrizz (Goli Soda)</option>
            <option value="bulk">Bulk / Corporate Order</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-slate-700">Your Message</label>
          <textarea 
            id="message" 
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-juicera)]/20 focus:border-[var(--color-juicera)] transition-all resize-none"
            placeholder="Tell us how we can help..."
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-slate-800 transition-colors group shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
