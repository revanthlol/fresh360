"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

// Existing partner testimonials confirmed by the user on 2026-10-07.
const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Fitness Club Lead, Hyderabad",
    text: "Juicera’s cold-pressed Elixir and Citrovit are absolute staples for our wellness community. Fresh, crisp fruit with No Added Sugar and zero synthetic aftertaste.",
    rating: 5,
    brand: "Juicera",
  },
  {
    name: "Priya Verma",
    role: "Artisan Cafe Curator, Secunderabad",
    text: "Fruizy fills an essential demand for guests wanting refreshing sparkle without artificial chemical syrups. Real fruit juice base with clean natural carbonation.",
    rating: 5,
    brand: "Fruizy",
  },
  {
    name: "Anand Kumar",
    role: "Retail Partner, Hyderabad",
    text: "Fresh 360’s commitment to genuine cold-pressing across Juicera and Fruizy makes them our top beverage recommendation. Pure quality in every bottle.",
    rating: 5,
    brand: "Fresh 360",
  },
]


const duration = 6500

export function TestimonialStrip() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)
  const cycleRef = useRef(0)
  const remaining = useRef(duration)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [manualPause, setManualPause] = useState(false)
  const [visible, setVisible] = useState(true)
  const [keyboard, setKeyboard] = useState(false)
  const paused = hovered || focused || manualPause || !visible || !inView || Boolean(reducedMotion)

  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    if (paused) return
    let fired = false
    const started = performance.now()
    const timer = window.setTimeout(() => {
      fired = true
      remaining.current = duration
      cycleRef.current += 1
      setCycle(cycleRef.current)
      setKeyboard(false)
      setActive((index) => (index + 1) % testimonials.length)
    }, remaining.current)
    return () => {
      window.clearTimeout(timer)
      if (!fired && cycleRef.current === cycle) remaining.current = Math.max(0, remaining.current - (performance.now() - started))
    }
  }, [paused, cycle])

  const select = (index: number, fromKeyboard: boolean) => {
    cycleRef.current += 1
    remaining.current = duration
    setCycle(cycleRef.current)
    setKeyboard(fromKeyboard)
    setActive((index + testimonials.length) % testimonials.length)
  }
  const item = testimonials[active]
  return (
    <section ref={ref} className="testimonial-rotation" aria-label="Partner testimonials" aria-roledescription="carousel"
      onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(true) }} onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
      <div className="rotation-heading"><p className="scene-eyebrow">Community and partner voices</p><h2>What our partners say.</h2></div>
      <div className="rotation-body">
        <div className="rotation-controls">
          <div className="rotation-progress" aria-label="Choose a testimonial">{testimonials.map((review, index) => <button type="button" key={review.name} aria-label={`Show testimonial from ${review.name}`} aria-current={active === index ? 'true' : undefined} onClick={(event) => select(index, event.detail === 0)}>
            <span className="rotation-progress-track"><span key={`${cycle}-${index}`} className={`rotation-progress-fill ${index === active ? 'is-active' : ''}`} style={{ animationPlayState: paused ? 'paused' : 'running', animationDuration: `${duration}ms`, transform: index < active ? 'scaleX(1)' : undefined }} /></span>
          </button>)}</div>
          <div className="rotation-arrows">
            <button type="button" aria-label="Previous testimonial" onClick={(event) => select(active - 1, event.detail === 0)}><ChevronLeft size={22} /></button>
            <button type="button" aria-label={manualPause ? 'Resume testimonial rotation' : 'Pause testimonial rotation'} aria-pressed={manualPause} onClick={() => setManualPause(!manualPause)}>{manualPause ? <Play size={18} /> : <Pause size={18} />}</button>
            <button type="button" aria-label="Next testimonial" onClick={(event) => select(active + 1, event.detail === 0)}><ChevronRight size={22} /></button>
          </div>
        </div>
        <div className="rotation-quote-stage" aria-live={keyboard ? 'polite' : 'off'}>
          <div className="rotation-sizers" aria-hidden="true">{testimonials.map((review) => <figure key={review.name}><blockquote>{review.text}</blockquote><figcaption><span className="rotation-initial">{review.name.charAt(0)}</span><div><strong>{review.name}</strong><span>{review.role}</span></div></figcaption></figure>)}</div>
          <motion.figure key={`${active}-${cycle}`} className="rotation-active-quote" initial={keyboard || reducedMotion ? false : { opacity: 0.5, transform: 'translate3d(0, 0.5rem, 0)' }} animate={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }} transition={{ duration: keyboard || reducedMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }} aria-label={`${active + 1} of ${testimonials.length}`}>
            <blockquote>{item.text}</blockquote><figcaption><span className="rotation-initial" aria-hidden="true">{item.name.charAt(0)}</span><div><strong>{item.name}</strong><span>{item.role}</span></div></figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
