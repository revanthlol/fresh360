"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Leaf, Droplets, Zap, Heart } from 'lucide-react'

const values = [
  { icon: Leaf, label: '100% Organic' },
  { icon: Droplets, label: 'Cold Pressed' },
  { icon: Zap, label: 'No Added Sugar' },
  { icon: Heart, label: 'Preservative Free' },
]

export function PhilosophyStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [60, 0, 0, -40])
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.5], ["0%", "100%"])

  return (
    <section ref={ref} className="relative py-32 md:py-44 bg-white overflow-hidden">
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      
      <div className="container mx-auto px-6">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="font-accent text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight">
            We believe every sip should{' '}
            <span className="text-brand-green">nourish your body</span>{' '}
            and{' '}
            <span className="text-brand-teal">respect the earth</span>.
          </h2>
          
          {/* Animated line */}
          <motion.div
            style={{ width: lineWidth }}
            className="h-[2px] bg-gradient-to-r from-brand-green via-brand-teal to-brand-orange mx-auto rounded-full"
          />

          {/* USP pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {values.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-full border border-slate-100 text-sm font-medium text-slate-600 hover:bg-brand-green-light hover:text-brand-green hover:border-brand-green/20 transition-colors cursor-default"
              >
                <Icon size={16} className="text-brand-green" />
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
