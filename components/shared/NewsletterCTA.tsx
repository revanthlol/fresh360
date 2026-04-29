"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export function NewsletterCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [60, 32])

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          style={{ scale, borderRadius }}
          className="bg-brand-green p-10 md:p-16 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-green/20"
        >
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl text-display"
            >
              Stay Fresh.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/80 font-medium"
            >
              Subscribe for early access to new flavors, wellness tips, and exclusive seasonal offers.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-sm text-sm"
                required
              />
              <button
                type="submit"
                className="bg-white text-brand-green px-8 py-4 rounded-full font-bold hover:bg-brand-green-light transition-all active:scale-[0.97] shadow-xl text-sm cursor-pointer"
              >
                Subscribe
              </button>
            </motion.form>
          </div>

          {/* Ambient blobs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  )
}
