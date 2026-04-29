"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'

export function PageTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevPathname = useRef(pathname)

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const complete = useCallback(() => {
    clear()
    setProgress(100)
    timerRef.current = setTimeout(() => {
      setIsTransitioning(false)
      setProgress(0)
      progressRef.current = 0
    }, 400)
  }, [clear])

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname
      setIsTransitioning(true)
      progressRef.current = 10
      setProgress(10)

      intervalRef.current = setInterval(() => {
        if (progressRef.current < 85) {
          const increment = Math.random() * 8 + 2
          progressRef.current = Math.min(progressRef.current + increment, 85)
          setProgress(progressRef.current)
        }
      }, 200)

      timerRef.current = setTimeout(complete, 700)
    }
  }, [pathname, complete])

  useEffect(() => () => clear(), [clear])

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* Top progress bar */}
          <motion.div
            key="progress-bar"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[9998] h-[3px] bg-transparent pointer-events-none"
          >
            <motion.div
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-brand-green via-brand-teal to-brand-orange rounded-full shadow-[0_0_10px_rgba(45,106,45,0.6)]"
            />
          </motion.div>

          {/* Subtle page overlay */}
          <motion.div
            key="page-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9990] bg-white/40 backdrop-blur-[2px] pointer-events-none"
          />
        </>
      )}
    </AnimatePresence>
  )
}
