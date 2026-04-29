"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Droplets } from 'lucide-react'
import { CurvedImageFrame } from './CurvedImageFrame'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#FAFAFA]"
    >
      {/* Ambient background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-24 lg:pt-28 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* ── LEFT SIDE: TEXT BLOCK ── */}
          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-900 leading-[1.05]"
            >
              Nature&apos;s <br />
              <span className="text-brand-green">Purest</span> Essence.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Your Partner in Fresh Beverage Needs. 100% cold-pressed vibrancy with 0 added sugar and no preservatives.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/products"
                className="w-full sm:w-auto group bg-slate-900 text-white px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:bg-brand-green hover:text-slate-900 hover:scale-[1.05] active:scale-[0.97] shadow-xl shadow-slate-900/10"
              >
                Shop Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto group bg-white text-slate-900 border border-slate-200 px-8 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-[0.97]"
              >
                Wholesale
                <Droplets size={20} className="text-brand-green" />
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <div className="flex -space-x-3">
                {[11, 12, 13, 14].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                    <Image src={`https://i.pravatar.cc/80?img=${i}`} alt="Customer" width={40} height={40} className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-xs font-bold tracking-wide">Loved by 2k+ juice enthusiasts</p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT SIDE: CURVED FRAME IMAGE ── */}
          <div className="flex items-center justify-center">
            <CurvedImageFrame
              src="/fresh360-3_4.png"
              alt="Fresh 360 Premium Cold-Pressed Juice"
              priority
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ y: imageY, scale: imageScale }}
              className="w-full max-w-[480px] lg:max-w-lg aspect-[3/4] shadow-[0_48px_80px_-16px_rgba(0,0,0,0.15)]"
              rounded="rounded-[2.5rem]"
            />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-slate-200 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-brand-green rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
