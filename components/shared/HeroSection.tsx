"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Sparkles, Droplets, Leaf } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const imageY = useTransform(scrollY, [0, 500], [0, 50])
  const scale = useTransform(scrollY, [0, 500], [1, 1.1])
  const rotate = useTransform(scrollY, [0, 500], [0, 15])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#FAFAFA]">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-brand-green/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-brand-teal/5 rounded-full blur-[100px]" 
        />
        
        {/* Decorative elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-1/3 right-1/4 opacity-[0.03] pointer-events-none"
        >
          <Leaf size={300} />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm text-slate-600 text-sm font-medium">
            <Sparkles size={16} className="text-brand-green" />
            <span className="tracking-wide uppercase text-[10px] font-bold">The Gold Standard of Freshness</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl text-slate-900 font-display font-bold leading-[0.85] tracking-tighter">
              Nature&apos;s <br />
              <span className="text-brand-green relative inline-block">
                Purest
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 w-full h-3 text-brand-green/20" 
                  viewBox="0 0 300 12" 
                  fill="none"
                >
                  <path d="M2 10C50 3 150 3 298 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </motion.svg>
              </span>
              <br />
              Essence.
            </h1>
          </div>

          <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Experience 100% cold-pressed vibrancy. No preservatives, no added sugar—just the raw, unfiltered power of nature in every bottle.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
            <Link 
              href="/products"
              className="group bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 transition-all hover:bg-brand-green hover:scale-105 active:scale-95 shadow-2xl shadow-slate-900/20"
            >
              Shop Collection
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="group bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-95 shadow-sm"
            >
              Wholesale
              <Droplets size={20} className="text-brand-green group-hover:animate-bounce" />
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <Image 
                    src={`https://i.pravatar.cc/100?img=${i+10}`} 
                    alt="User" 
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-amber-400">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-slate-500 font-medium">Loved by 2,000+ juice enthusiasts</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative aspect-[4/5] lg:aspect-square flex items-center justify-center"
        >
          <motion.div 
            style={{ y: imageY, scale, rotate }}
            className="relative w-full aspect-[4/5] max-w-lg mx-auto"
          >
            <div className="absolute inset-0 bg-brand-green/10 rounded-[3rem] rotate-3 blur-2xl" />
            <div className="absolute inset-0 bg-brand-teal/10 rounded-[3rem] -rotate-3 blur-2xl" />
            
            <div className="relative w-full h-full glass rounded-[3rem] p-8 flex items-center justify-center overflow-hidden border-white/40 shadow-2xl">
              <Image
                src="/images/hero-bottle.png"
                alt="Fresh 360 Premium Cold-Pressed Juice"
                fill
                className="object-contain p-4 drop-shadow-[0_20px_50px_rgba(45,106,45,0.3)]"
                priority
              />
            </div>
          </motion.div>

          {/* Floating Ingredients / Decor */}
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl z-10" 
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl z-10" 
          />
          
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute top-1/4 right-0 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[150px]"
          >
            <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest mb-1">Naturally Sourced</p>
            <p className="text-xs font-medium text-slate-600 leading-tight">Hand-picked fruits from local organic farms.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Discover More</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-200 to-transparent" />
      </motion.div>
    </section>
  )
}
