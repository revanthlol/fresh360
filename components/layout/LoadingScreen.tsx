"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import { Logo } from '@/components/shared/Logo'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [phase, setPhase] = useState<'loading' | 'exit'>('loading')

  useEffect(() => {
    // After 1.6s start the exit animation
    const exitTimer = setTimeout(() => setPhase('exit'), 1600)
    // After exit animation completes, unmount
    const hideTimer = setTimeout(() => setIsVisible(false), 2200)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAFAFA] pointer-events-none"
        >
          {/* Background animated blob */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-brand-green rounded-full blur-[120px] pointer-events-none"
          />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Wordmark Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo size="lg" variant="light" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400"
            >
              Nature&apos;s Purest Essence
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: phase === 'loading' ? "80%" : "100%" }}
                transition={
                  phase === 'loading'
                    ? { duration: 1.4, ease: "easeOut" }
                    : { duration: 0.3, ease: "easeOut" }
                }
                className="h-full bg-gradient-to-r from-brand-green via-brand-teal to-brand-orange rounded-full"
              />
            </div>
          </div>

          {/* Wipe exit — green curtain sweeps up */}
          <AnimatePresence>
            {phase === 'exit' && (
              <motion.div
                key="curtain"
                initial={{ y: "100%" }}
                animate={{ y: "-100%" }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-brand-green"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
