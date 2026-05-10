"use client"

import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

export function NewsletterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const panelY = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [56, 0, -28])
  const panelScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.98, 1, 0.985])
  const panelRotate = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [-1.5, 0, 1.25])
  const panelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.96])
  const orbX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-28, 28])
  const orbY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [18, -18])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          style={{ y: panelY, scale: panelScale, rotate: panelRotate, opacity: panelOpacity }}
          className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_38%),linear-gradient(135deg,#1E5E31_0%,#2D7440_45%,#164024_100%)] px-6 py-12 sm:px-10 sm:py-14 md:px-16 md:py-20 lg:px-20 text-center text-white shadow-[0_30px_90px_-35px_rgba(30,94,49,0.65)]"
        >
          <motion.div
            style={{ x: orbX, y: orbY }}
            className="absolute -top-28 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl md:h-[28rem] md:w-[28rem] pointer-events-none"
          />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl md:h-[24rem] md:w-[24rem] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(0,0,0,0.18),_transparent_36%)] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-5 md:space-y-7">
            <span className="block text-[10px] font-black uppercase tracking-[0.38em] text-white/55">
              Never Miss a Sip
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[0.92] tracking-tight">
              Stay <span className="font-accent italic">Fresh.</span>
            </h2>

            <p className="text-base md:text-xl text-white/72 font-medium max-w-2xl mx-auto leading-relaxed">
              Early access to new flavors, wellness tips, and exclusive seasonal offers.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-4 rounded-full bg-white/12 border border-white/20 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/30 transition-[border-color,box-shadow,background-color] text-sm backdrop-blur-md"
                required
              />
              <button
                type="submit"
                className="bg-white text-brand-green px-7 py-4 rounded-full font-bold hover:bg-white/92 transition-transform transition-colors active:scale-[0.97] shadow-xl text-sm cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
