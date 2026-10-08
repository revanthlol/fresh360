'use client'

import { ArrowDown } from 'lucide-react'
import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import { brandScenes } from '@/lib/brand-scenes'

// All poses derive from scroll, so reversing or jumping restores the same frame.
export function BrandRevealSlide({ progress }: { progress?: MotionValue<number> }) {
  const staticProgress = useMotionValue(0.5)
  const position = progress || staticProgress
  const first = useTransform(position, [0, 0.025, 0.05], ['translate3d(0, 35%, 0)', 'translate3d(0, 12%, 0)', 'translate3d(0, 0, 0)'])
  const second = useTransform(position, [0.025, 0.05, 0.075], ['translate3d(0, 100%, 0)', 'translate3d(0, 35%, 0)', 'translate3d(0, 0, 0)'])
  const opacity = useTransform(position, [0.05, 0.095], [0, 1])
  return (
    <div className="brand-reveal-slide">
      <div className="brand-reveal-content">
        <p className="scene-eyebrow">The Fresh 360 collection</p>
        <h2 id="brand-sequence-title" className="brand-reveal-title"><span className="reveal-line"><motion.span style={{ transform: first }}>Three ways</motion.span></span><span className="reveal-line"><motion.span style={{ transform: second }}>to refresh.</motion.span></span></h2>
        <motion.div style={{ opacity }}>
          <p className="brand-reveal-description">Cold-pressed juice. Sparkling fruit. Bold fizzy flavours.</p>
          <nav className="brand-reveal-links" aria-label="Jump to a brand">{brandScenes.map((scene, index) => <a key={scene.id} href={`#brand-${scene.id}`} style={{ color: scene.accent }} onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !document.getElementById('brand-gallery')) return
            event.preventDefault()
            window.dispatchEvent(new CustomEvent('fresh360:brand-jump', { detail: { index, keyboard: event.detail === 0 } }))
          }}>{scene.name}<ArrowDown size={18} aria-hidden="true" /></a>)}</nav>
        </motion.div>
      </div>
    </div>
  )
}
