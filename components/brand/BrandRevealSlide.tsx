'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { brandScenes } from '@/lib/brand-scenes'

// Adapted from the supplied Reveal Preloader: an in-flow reveal, never a loading gate.
export function BrandRevealSlide() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations: Animation[] = []
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (!reduced.matches) {
        root.querySelectorAll<HTMLElement>('[data-reveal-word]').forEach((word, index) => animations.push(word.animate([
          { opacity: 0.5, transform: 'translate3d(0, 60%, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ], { duration: 650, delay: index * 60, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })))
        const curtain = root.querySelector('[data-reveal-curtain]')
        if (curtain) animations.push(curtain.animate([{ transform: 'translate3d(0, 0, 0)' }, { transform: 'translate3d(0, -100%, 0)' }], { duration: 850, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' }))
      }
      observer.disconnect()
    }, { threshold: 0.25 })
    const stop = () => { if (reduced.matches) animations.forEach((animation) => animation.cancel()) }
    observer.observe(root)
    reduced.addEventListener('change', stop)
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); reduced.removeEventListener('change', stop) }
  }, [])
  return (
    <div ref={ref} className="brand-reveal-slide">
      <div className="brand-reveal-curtain" data-reveal-curtain aria-hidden="true" />
      <div className="brand-reveal-content">
        <p className="scene-eyebrow">The Fresh 360 collection</p>
        <h2 id="brand-sequence-title" className="brand-reveal-title">{['Three ways', 'to refresh.'].map((line) => <span key={line} className="reveal-line"><span data-reveal-word>{line}</span></span>)}</h2>
        <p className="brand-reveal-description">Cold-pressed juice. Sparkling fruit. Bold fizzy flavours.</p>
        <nav className="brand-reveal-links" aria-label="Jump to a brand">{brandScenes.map((scene, index) => <a key={scene.id} href={`#brand-${scene.id}`} style={{ color: scene.accent }} onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !document.getElementById('brand-gallery')) return
          event.preventDefault()
          window.dispatchEvent(new CustomEvent('fresh360:brand-jump', { detail: { index, keyboard: event.detail === 0 } }))
        }}>{scene.name}<ArrowDown size={18} aria-hidden="true" /></a>)}</nav>
      </div>
    </div>
  )
}
