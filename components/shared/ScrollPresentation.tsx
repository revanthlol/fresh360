'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useDesktopMotion } from '@/lib/use-desktop-motion'

// Content-sized sticky holds. Oversized sections and interactive forms remain in normal flow.
export function ScrollPresentation({ children, hold = true }: { children: ReactNode; hold?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const enhanced = useDesktopMotion()
  const [height, setHeight] = useState(0)
  const [fits, setFits] = useState(false)
  const [focused, setFocused] = useState(false)
  const pinned = enhanced && hold && fits
  const { scrollYProgress } = useScroll({ target: ref, offset: pinned ? ['start 112px', `end ${height + 112}px`] : ['start end', 'end start'] })
  const transform = useTransform(scrollYProgress, [0, 0.72, 1], ['translate3d(0, 0, 0) scale(1)', 'translate3d(0, 0, 0) scale(1)', 'translate3d(0, -1rem, 0) scale(0.96)'])

  useEffect(() => {
    const node = stage.current
    if (!node) return
    const measure = () => { setHeight(node.offsetHeight); setFits(node.offsetHeight <= window.innerHeight - 144) }
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    window.addEventListener('resize', measure)
    measure()
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => {
    const root = stage.current
    if (!root || !enhanced || focused) return
    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-presentation-step]'))
    const animations = elements.map((element) => {
      const animation = element.animate([{ opacity: 0.45, transform: 'translate3d(0, 0.75rem, 0)' }, { opacity: 1, transform: 'translate3d(0, 0, 0)' }], { duration: 1000, fill: 'both', easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })
      animation.pause()
      return animation
    })
    const update = (progress: number) => animations.forEach((animation, index) => {
      // The final reading state occupies most of the hold. Nothing waits for a timer.
      const start = pinned ? index * 0.07 : 0.12 + index * 0.035
      animation.currentTime = Math.max(0, Math.min(1, (progress - start) / (pinned ? 0.12 : 0.09))) * 1000
    })
    update(scrollYProgress.get())
    const unsubscribe = scrollYProgress.on('change', update)
    return () => { unsubscribe(); animations.forEach((animation) => animation.cancel()) }
  }, [enhanced, focused, pinned, scrollYProgress])

  return <div ref={ref} className={`scroll-presentation ${pinned ? 'has-hold' : ''}`}>
    <motion.div ref={stage} className="presentation-stage" style={{ transform: pinned && !focused ? transform : 'none' }} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>{children}</motion.div>
  </div>
}
