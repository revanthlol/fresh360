'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Ordinary flow and early entry feedback. No pinning, spacer heights, or focus gates.
export function ScrollPresentation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations: Animation[] = []
    const cancel = () => animations.forEach((animation) => animation.cancel())
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        if (reduced.matches || root.contains(document.activeElement)) return
        animations.push(entry.target.animate([
          { opacity: 0.85, transform: 'translate3d(0, 0.25rem, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ], { duration: 160, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }))
      })
    }, { threshold: 0.05, rootMargin: '0px 0px 12% 0px' })
    root.querySelectorAll('[data-presentation-step]').forEach((element) => observer.observe(element))
    root.addEventListener('focusin', cancel)
    reduced.addEventListener('change', cancel)
    return () => { observer.disconnect(); cancel(); root.removeEventListener('focusin', cancel); reduced.removeEventListener('change', cancel) }
  }, [])
  return <div ref={ref} className="scroll-presentation">{children}</div>
}
