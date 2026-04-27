'use client'

import { useState } from 'react'
import { Send, Loader2, User, Phone, Mail, MessageSquare, ChevronRight, Sparkles } from 'lucide-react'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'

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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="relative p-6 sm:p-10 md:p-14 rounded-[40px] md:rounded-[60px] border border-white/10 bg-stone-900/40 backdrop-blur-3xl shadow-3xl overflow-hidden group selection:bg-amber-600 selection:text-stone-900">
      {/* Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-600/10 blur-[100px] pointer-events-none rounded-full group-hover:bg-amber-600/20 transition-colors duration-1000" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-600/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10 md:mb-12">
           <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Inquiry Form</h3>
           <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-amber-600" />
           </div>
        </div>
        
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 md:mb-10 p-6 md:p-8 bg-amber-600/10 border border-amber-600/20 text-amber-600 rounded-[30px] md:rounded-[32px] overflow-hidden"
            >
              <p className="font-black flex items-center text-lg md:text-xl uppercase tracking-tighter">
                <span className="mr-3 text-xl md:text-2xl">✨</span> Submission Received
              </p>
              <p className="text-[10px] md:text-xs mt-2 font-black opacity-80 uppercase tracking-[0.2em] leading-tight">Our concierge will reach out within 24 hours.</p>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 md:mb-10 p-6 md:p-8 bg-red-900/10 border border-red-900/20 text-red-500 rounded-[30px] md:rounded-[32px] overflow-hidden"
            >
              <p className="font-black flex items-center text-lg md:text-xl uppercase tracking-tighter">
                <span className="mr-3 text-xl md:text-2xl">⚠️</span> Issue Detected
              </p>
              <p className="text-[10px] md:text-xs mt-2 font-black opacity-80 uppercase tracking-[0.2em] leading-tight">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2 md:space-y-3">
              <label htmlFor="name" className="text-[9px] md:text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] ml-4">Identity</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-stone-600" />
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-6 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[32px] focus:outline-none focus:ring-4 focus:ring-amber-600/10 focus:border-amber-600 focus:bg-white/10 transition-all font-black text-white placeholder:text-stone-700 uppercase tracking-tight text-sm md:text-base"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <label htmlFor="phone" className="text-[9px] md:text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] ml-4">Mobile</label>
              <div className="relative">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-stone-600" />
                <input 
                  type="tel" 
                  id="phone" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-6 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[32px] focus:outline-none focus:ring-4 focus:ring-amber-600/10 focus:border-amber-600 focus:bg-white/10 transition-all font-black text-white placeholder:text-stone-700 uppercase tracking-tight text-sm md:text-base"
                  placeholder="10-Digit Phone"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 md:space-y-3">
            <label htmlFor="email" className="text-[9px] md:text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] ml-4">Email</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-stone-600" />
              <input 
                type="email" 
                id="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-6 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[32px] focus:outline-none focus:ring-4 focus:ring-amber-600/10 focus:border-amber-600 focus:bg-white/10 transition-all font-black text-white placeholder:text-stone-700 uppercase tracking-tight text-sm md:text-base"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2 md:space-y-3">
            <label htmlFor="brandInterest" className="text-[9px] md:text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] ml-4">Interest</label>
            <div className="relative">
              <MessageSquare className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-stone-600 pointer-events-none" />
              <select 
                id="brandInterest" 
                value={formData.brandInterest}
                onChange={handleChange}
                className="w-full pl-14 md:pl-16 pr-10 md:pr-12 py-4 md:py-6 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[32px] focus:outline-none focus:ring-4 focus:ring-amber-600/10 focus:border-amber-600 focus:bg-white/10 transition-all font-black text-white appearance-none cursor-pointer uppercase tracking-tight text-sm md:text-base"
              >
                <option value="general" className="bg-stone-900 text-white">General Inquiry</option>
                <option value="juicera" className="bg-stone-900 text-white">Juicera Series</option>
                <option value="fuzzy" className="bg-stone-900 text-white">Fuzzy Series</option>
                <option value="refrizz" className="bg-stone-900 text-white">Refrizz Series</option>
                <option value="bulk" className="bg-stone-900 text-white">Bulk / Distribution</option>
              </select>
              <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-stone-600 pointer-events-none rotate-90" />
            </div>
          </div>

          <div className="space-y-2 md:space-y-3">
            <label htmlFor="message" className="text-[9px] md:text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] ml-4">Brief</label>
            <textarea 
              id="message" 
              rows={3}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-6 md:px-8 py-5 md:py-6 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[32px] focus:outline-none focus:ring-4 focus:ring-amber-600/10 focus:border-amber-600 focus:bg-white/10 transition-all font-black text-white placeholder:text-stone-700 uppercase tracking-tight text-sm md:text-base resize-none"
              placeholder="How can we help?"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full relative group h-20 md:h-24 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-3xl transition-all duration-700 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-amber-600 group-hover:bg-white transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex items-center justify-center text-stone-950 font-black text-lg md:text-xl uppercase tracking-[0.3em]">
              {loading ? (
                <>
                  <Loader2 className="mr-3 md:mr-4 w-6 h-6 md:w-7 md:h-7 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Submit Inquiry
                  <Send className="ml-3 md:ml-4 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}
