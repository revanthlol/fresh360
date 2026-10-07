"use client"

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { Brand } from '@/lib/types'
import { cn } from '@/lib/utils'

const brands = [
  { id: 'juicera', name: 'Juicera', tagline: 'Cold-pressed juice', desc: 'A fruit and nut range made for fresh, everyday drinking.', tone: 'green' },
  { id: 'fruizy', name: 'Fruizy', tagline: 'Sparkling fruit', desc: 'Fruit-led drinks with a lively sparkling finish.', tone: 'teal' },
  { id: 'fizzo', name: 'Fizzo', tagline: 'Bold fizzy flavours', desc: 'An artificially flavoured fizzy beverage line.', tone: 'orange' },
] as const

type BrandItem = (typeof brands)[number]

function BrandCard({ brand, index, progress, content }: { brand: BrandItem; index: number; progress: MotionValue<number>; content?: Brand }) {
  const reduceMotion = useReducedMotion()
  const cardY = useTransform(progress, [0, 0.35, 1], reduceMotion ? [0, 0, 0] : [24, 0, -10])
  const tone = {
    green: { text: 'text-brand-green', action: 'bg-brand-green', wash: 'group-hover:bg-brand-green/5' },
    teal: { text: 'text-brand-teal', action: 'bg-brand-teal', wash: 'group-hover:bg-brand-teal/5' },
    orange: { text: 'text-brand-orange', action: 'bg-brand-orange', wash: 'group-hover:bg-brand-orange/5' },
  }[brand.tone]

  const router = useRouter()
  const activateBrand = () => {
    if (process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE !== 'true') {
      router.push(`/brands/${brand.id}`)
      return
    }
    const section = document.getElementById('products')
    if (!section) return
    window.dispatchEvent(new CustomEvent('fresh360:select-brand', { detail: brand.id }))
    window.history.replaceState(null, '', `#products?brand=${brand.id}`)
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <motion.article style={{ y: cardY }} className="group relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-emerald-900/10 bg-white/75 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8">
      <div className={cn('absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100', tone.wash)} />
      <div className="relative">
        <h3 className={cn('font-display text-3xl font-extrabold tracking-tight sm:text-4xl', tone.text)}>{brand.name}</h3>
        <p className="mt-3 text-lg font-semibold leading-snug text-slate-800">{content?.tagline || brand.tagline}</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">{content?.description || brand.desc}</p>
        {content?.labelNote && <p className="mt-3 text-xs leading-relaxed text-slate-600">{content.labelNote}</p>}
      </div>
      <button type="button" onClick={activateBrand} className={cn('relative mt-7 inline-flex min-h-11 w-fit items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-white press-feedback focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', tone.action)} aria-label={`Explore ${brand.name} products`}>
        Explore {brand.name}<ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <span className="sr-only">Brand {index + 1} of 3</span>
    </motion.article>
  )
}

export function BrandStrip({ id = 'brands', content = [] }: { id?: string; content?: Brand[] } = {}) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headingY = useTransform(scrollYProgress, [0, 0.3, 1], reduceMotion ? [0, 0, 0] : [30, 0, -12])

  return (
    <section id={id} ref={sectionRef} className="relative overflow-hidden home-surface py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none overflow-hidden text-brand-green/[0.035]">
        <span className="absolute -right-10 top-3 -rotate-6 font-display text-[19vw] font-black leading-none tracking-[-0.08em]">FRESH</span>
        <span className="absolute -bottom-16 -left-6 rotate-6 font-display text-[23vw] font-black leading-none tracking-[-0.09em]">360</span>
      </div>
      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <motion.div style={{ y: headingY }} className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2 className="text-balance font-display text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">Three ways to refresh.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">Cold-pressed juice, sparkling fruit and bold fizzy flavours from Fresh 360.</p>
        </motion.div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {brands.map((brand, index) => <ScrollReveal key={brand.id} delay={index * 0.06} distance={20} duration={0.35}><BrandCard brand={brand} index={index} progress={scrollYProgress} content={content.find((item) => item.id.current === brand.id)} /></ScrollReveal>)}
        </div>
      </div>
    </section>
  )
}
