"use client"

import React, { useRef, useState, useActionState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { subscribeNewsletterAction } from '@/app/actions'

export function NewsletterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const [state, formAction, isPending] = useActionState(subscribeNewsletterAction, null)
  const [emailValue, setEmailValue] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')

  const panelY = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [56, 0, -28])
  const panelScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.98, 1, 0.985])
  const panelRotate = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [-1.5, 0, 1.25])
  const panelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.96])
  const orbX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-28, 28])
  const orbY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [18, -18])

  return (
    <section ref={sectionRef} className="pt-10 pb-16 md:pt-14 md:pb-24 home-surface overflow-hidden">
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

            {state?.success ? (
              <div className="bg-white/15 border border-white/30 rounded-2xl sm:rounded-3xl p-6 sm:p-7 max-w-xl mx-auto backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 space-y-2">
                <div className="flex items-center justify-center gap-2 text-white font-bold text-lg sm:text-xl">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
                  <span>You're on the list!</span>
                </div>
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  We've sent a welcome confirmation email to <strong className="text-white underline">{submittedEmail || 'your email'}</strong>. Check your inbox!
                </p>
              </div>
            ) : (
              <form
                action={async (formData) => {
                  setSubmittedEmail(emailValue)
                  await formAction(formData)
                }}
                className="flex flex-col gap-2.5 max-w-xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    name="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-5 py-4 rounded-full bg-white/12 border border-white/20 text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/30 transition-[border-color,box-shadow,background-color] text-sm backdrop-blur-md"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-white text-brand-green px-7 py-4 rounded-full font-bold hover:bg-white/92 transition-all active:scale-[0.97] shadow-xl text-sm cursor-pointer whitespace-nowrap disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-brand-green" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </button>
                </div>
                {state?.error && (
                  <p className="text-red-200 text-xs font-semibold animate-in fade-in text-center sm:text-left pl-3">
                    {state.error}
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
