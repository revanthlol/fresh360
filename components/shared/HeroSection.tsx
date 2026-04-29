"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Droplets } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.12])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#FAFAFA]"
    >
      {/* Ambient blobs */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/3 -left-32 w-[60vw] h-[60vw] max-w-[36rem] max-h-[36rem] bg-brand-green/[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[50vw] h-[50vw] max-w-[28rem] max-h-[28rem] bg-brand-teal/[0.04] rounded-full blur-[80px]" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6 pt-24 pb-24 lg:pt-28 lg:pb-16">
        {/*
          Mobile:  single column — text first (naturally), then image below
          Desktop: 2-col grid — text left, image right
        */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── TEXT BLOCK ── */}
          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="text-center lg:text-left space-y-6 order-1"
          >
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse shrink-0" />
              <span className="text-slate-500 uppercase text-[10px] font-bold tracking-wider leading-none">
                Cold-Pressed · Zero Sugar · Pure
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-display text-[2.6rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-slate-900"
            >
              Nature&apos;s{' '}
              <span className="text-brand-green relative inline-block">
                Purest
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  className="absolute -bottom-1 left-0 w-full h-3 text-brand-green/20"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path d="M2 10C50 3 150 3 298 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </motion.svg>
              </span>
              <br />
              Essence.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg md:text-xl text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              100% cold-pressed vibrancy. No preservatives, no added sugar—just the raw, unfiltered power of nature in every bottle.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1"
            >
              <Link
                href="/products"
                className="w-full sm:w-auto group bg-slate-900 text-white px-7 py-4 rounded-full font-bold text-base flex items-center justify-center gap-3 transition-all hover:bg-brand-green hover:scale-[1.02] active:scale-[0.97] shadow-xl shadow-slate-900/15"
              >
                Explore Collection
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto group bg-white text-slate-900 border border-slate-200 px-7 py-4 rounded-full font-bold text-base hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-[0.97] shadow-sm"
              >
                Wholesale
                <Droplets size={18} className="text-brand-green" />
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-5 pt-2"
            >
              <div className="flex -space-x-2">
                {[11, 12, 13, 14].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <Image src={`https://i.pravatar.cc/80?img=${i}`} alt="Customer" width={32} height={32} className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 text-xs">{'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}</div>
                <p className="text-slate-400 text-xs font-medium">Loved by 2,000+ juice enthusiasts</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── IMAGE BLOCK ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ y: imageY, scale: imageScale }}
            /* Mobile: fixed height so it doesn't eat the screen; Desktop: taller */
            className="relative order-2 w-full max-w-[280px] sm:max-w-xs mx-auto lg:max-w-none lg:aspect-square h-[280px] sm:h-[320px] lg:h-auto"
          >
            {/* Glow blobs behind card */}
            <div className="absolute inset-6 bg-brand-green/[0.08] rounded-[2.5rem] rotate-2 blur-2xl" />
            <div className="absolute inset-6 bg-brand-teal/[0.06] rounded-[2.5rem] -rotate-2 blur-2xl" />

            {/* Card */}
            <div className="relative w-full h-full glass rounded-[2.5rem] flex items-center justify-center overflow-hidden border-white/40 shadow-2xl">
              <Image
                src="/images/hero-bottle.png"
                alt="Fresh 360 Premium Cold-Pressed Juice"
                fill
                className="object-contain p-5 drop-shadow-[0_16px_40px_rgba(45,106,45,0.22)]"
                priority
              />
            </div>

            {/* Floating badge — hidden on very small screens, shows sm+ */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="hidden sm:block absolute -right-3 top-[15%] z-30 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-slate-100 max-w-[130px]"
            >
              <p className="text-[8px] font-bold text-brand-green uppercase tracking-widest mb-0.5">Naturally Sourced</p>
              <p className="text-[10px] font-medium text-slate-500 leading-snug">Hand-picked from local organic farms.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-slate-300 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-slate-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
