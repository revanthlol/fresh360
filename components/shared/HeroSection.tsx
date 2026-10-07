'use client'

import { useRef, type MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useDesktopMotion } from '@/lib/use-desktop-motion'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const desktopMotion = useDesktopMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const artTransform = useTransform(scrollYProgress, [0, 1], ['translate3d(0, 0, 0) scale(1)', 'translate3d(0, 2%, 0) scale(1.025)'])
  const singlePage = process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE === 'true'

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!singlePage || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: reducedMotion || event.detail === 0 ? 'instant' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <section ref={ref} className="fresh-hero">
      <motion.div className="fresh-hero-art" style={{ transform: desktopMotion ? artTransform : 'none' }}>
        <Image src="/images/hero.png" alt="Juicera Citrovit, Fruizy Purify Fizz and Fizzo Blue Mojito bottles" fill priority sizes="100vw" className="object-contain object-right" />
      </motion.div>
      <div className="fresh-hero-scrim" aria-hidden="true" />
      <div className="fresh-hero-copy">
        <p className="scene-eyebrow hero-enter">Fresh 360 Degrees Foods</p>
        <h1 className="fresh-hero-title">
          <span className="hero-enter">From cold press</span>{' '}
          <span className="hero-enter text-brand-green">to bold fizz.</span>
        </h1>
        <p className="fresh-hero-description hero-enter">Juicera cold-pressed drinks. Fruizy sparkling fruit. Fizzo artificially flavoured fizz. Find your drink in the Fresh 360 collection.</p>
        <div className="fresh-hero-actions hero-enter">
          <Link href={singlePage ? '#products' : '/products'} onClick={(event) => navigate(event, 'products')} className="scene-primary-action press-feedback">Explore the drinks<ArrowRight size={20} aria-hidden="true" /></Link>
          <Link href={singlePage ? '#contact' : '/contact'} onClick={(event) => navigate(event, 'contact')} className="scene-action press-feedback">Get in touch<ArrowRight size={20} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="fresh-hero-mobile-art">
        <Image src="/images/hero.png" alt="Juicera, Fruizy and Fizzo drink bottles" fill priority sizes="(max-width: 1023px) 100vw, 1px" className="object-cover object-right" />
      </div>
    </section>
  )
}
