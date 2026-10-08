'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Cherry, ThermometerSnowflake, FlaskConical, Truck, Package } from 'lucide-react'

const steps = [
  { icon: Cherry, title: 'Source', desc: 'Hand-picked organic fruits from trusted local farms across Karnataka.' },
  { icon: ThermometerSnowflake, title: 'Press', desc: 'Cold-pressed at 4°C to preserve every vitamin, mineral, and enzyme.' },
  { icon: FlaskConical, title: 'Test', desc: 'Lab-tested in our ISO-certified facility for purity and safety.' },
  { icon: Package, title: 'Bottle', desc: 'From bottling to doorstep, every bottle stays in a tightly managed cold chain.' },
  { icon: Truck, title: 'Deliver', desc: 'Cold-chain delivery to your doorstep within 24 hours of pressing.' },
]
const query = '(min-height: 38rem) and (prefers-reduced-motion: no-preference)'
const subscribe = (change: () => void) => {
  const media = window.matchMedia(query)
  media.addEventListener('change', change)
  return () => media.removeEventListener('change', change)
}
const snapshot = () => window.matchMedia(query).matches

export function ProcessTeaser({ id = 'process' }: { id?: string } = {}) {
  const ref = useRef<HTMLElement>(null)
  const enhanced = useSyncExternalStore(subscribe, snapshot, () => false)
  const [active, setActive] = useState(0)
  const [keyboard, setKeyboard] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 112px', 'end end'] })
  // Completion precedes release, leaving the final step visible with a full bar.
  const completion = useTransform(scrollYProgress, (value) => Math.max(0, Math.min(1, value / 0.9)))
  const transform = useTransform(completion, (value) => `scaleX(${value})`)
  useMotionValueEvent(completion, 'change', (value) => setActive(Math.min(steps.length - 1, Math.floor(value * steps.length))))
  const select = (index: number, instant: boolean) => {
    const root = ref.current
    if (!root || !enhanced) return
    setKeyboard(instant)
    const top = root.getBoundingClientRect().top + window.scrollY - 112
    const range = root.offsetHeight - window.innerHeight + 112
    window.scrollTo({ top: top + range * ((index + 0.4) / steps.length * 0.9), behavior: instant ? 'instant' : 'smooth' })
  }
  const current = steps[active]
  return (
    <section id={id} ref={ref} className={`process-presentation home-surface ${enhanced ? 'is-pinned' : ''}`}>
      <div className="process-stage">
        <div className="process-content">
          <div className="process-heading"><p className="scene-eyebrow">Our process</p><h2>From farm to bottle, <span className="text-brand-green">the healthy way.</span></h2></div>
          {enhanced ? <>
            <div className="process-progress-track" aria-hidden="true"><motion.div style={{ transform }} /></div>
            <nav className="process-step-nav" aria-label="Process steps">{steps.map((step, index) => <button key={step.title} type="button" onClick={(event) => select(index, event.detail === 0)} aria-current={active === index ? 'step' : undefined} aria-label={`Step ${index + 1}: ${step.title}`}><span>{String(index + 1).padStart(2, '0')}</span><span>{step.title}</span></button>)}</nav>
            <div className="process-current-step" aria-live={keyboard ? 'polite' : 'off'}>
              <motion.div key={active} initial={keyboard ? false : { opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: keyboard ? 0 : 0.16 }}>
                <current.icon size={40} aria-hidden="true" /><p className="scene-eyebrow">Step {active + 1} of {steps.length}</p><h3>{current.title}</h3><p>{current.desc}</p>
              </motion.div>
            </div>
          </> : <ol className="process-static-steps">{steps.map((step, index) => <li key={step.title}><step.icon size={28} aria-hidden="true" /><div><p className="scene-eyebrow">Step {index + 1} of {steps.length}</p><h3>{step.title}</h3><p>{step.desc}</p></div></li>)}</ol>}
          <Link href="/process" className="scene-action press-feedback">See full process<ArrowRight size={20} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
