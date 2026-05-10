"use client"

import React from 'react'
import { motion } from 'motion/react'

export function NewsletterCTA() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, borderRadius: '60px' }}
          whileInView={{ opacity: 1, y: 0, borderRadius: '32px' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-green p-10 md:p-16 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-green/30"
        >
          <div className="relative z-10 space-y-6 md:space-y-8 max-w-2xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[10px] font-black uppercase tracking-[0.35em] text-white/50 block"
            >
              Never Miss a Sip
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[0.9]"
            >
              Stay <span className="font-accent italic">Fresh.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-base md:text-xl text-white/70 font-medium max-w-md mx-auto leading-relaxed"
            >
              Early access to new flavors, wellness tips, and exclusive seasonal offers.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-sm"
                required
              />
              <button
                type="submit"
                className="bg-white text-brand-green px-7 py-4 rounded-full font-bold hover:bg-white/90 transition-all active:scale-[0.97] shadow-xl text-sm cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </motion.form>
          </div>

          {/* Static decorative elements — CSS only, no JS animation = zero jank on mobile */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/[0.06] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}
