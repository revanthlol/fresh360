"use client"

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  once?: boolean
}

// Content stays visible without JavaScript; WAAPI adds a brief reveal on entry.
export function ScrollReveal({ children, className, delay = 0, direction = 'up', distance = 16, duration = 0.3, once = true }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animation: Animation | undefined
    const offsets = { up: [0, distance], down: [0, -distance], left: [distance, 0], right: [-distance, 0], none: [0, 0] }
    const [x, y] = offsets[direction]
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (!preference.matches) {
        animation?.cancel()
        animation = element.animate([
          { opacity: 0.6, transform: `translate(${x}px, ${y}px)` },
          { opacity: 1, transform: 'translate(0, 0)' },
        ], { duration: Math.min(duration, 0.4) * 1000, delay: Math.min(delay, 0.18) * 1000, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })
      }
      if (once) observer.unobserve(element)
    }, { threshold: 0.1 })
    const stopMotion = () => { if (preference.matches) animation?.cancel() }
    preference.addEventListener('change', stopMotion)
    observer.observe(element)
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener('change', stopMotion) }
  }, [delay, direction, distance, duration, once])
  return <div ref={ref} className={cn(className)}>{children}</div>
}

export function StaggerContainer({ children, className, staggerDelay = 0.05, direction = 'up' }: { children: React.ReactNode; className?: string; staggerDelay?: number; direction?: ScrollRevealProps['direction'] }) {
  return <div className={cn(className)}>{React.Children.map(children, (child, index) => <ScrollReveal delay={index * staggerDelay} direction={direction}>{child}</ScrollReveal>)}</div>
}
