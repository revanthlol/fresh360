"use client"

import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const chapters = [
  {
    brand: 'Juicera',
    lead: 'Pressed',
    title: 'The cold-pressed side.',
    detail: 'Juicera brings juice and nut drinks to the Fresh 360 collection.',
    accent: '#2D6A2D',
    wash: 'from-[#e0efdc] to-[#f6faf2]',
  },
  {
    brand: 'Fruizy',
    lead: 'Sparkling',
    title: 'A little more sparkle.',
    detail: 'Fruizy is the fruit drink line with a lively sparkling finish.',
    accent: '#0F766E',
    wash: 'from-[#d7f2ed] to-[#f4fbf8]',
  },
  {
    brand: 'Fizzo',
    lead: 'Fizzy',
    title: 'Turn up the fizz.',
    detail: 'Fizzo takes a bolder route with eight artificially flavoured fizzy drinks.',
    accent: '#C2410C',
    wash: 'from-[#fce7d4] to-[#fff9ef]',
  },
]

function StoryChapter({ chapter, index }: { chapter: typeof chapters[number]; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 0.38, 1], reduceMotion ? [0, 0, 0] : [48, 0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], reduceMotion ? [1, 1, 1, 1] : [0.48, 1, 1, 0.7])

  return (
    <article ref={ref} className="relative flex min-h-[25rem] items-center border-t border-emerald-900/10 py-12 md:min-h-[65vh] md:py-20">
      <motion.div style={{ y, opacity }} className="relative w-full">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-sm font-extrabold tabular-nums" style={{ color: chapter.accent }}>0{index + 1}</span>
          <span className="h-px w-12" style={{ backgroundColor: chapter.accent }} aria-hidden="true" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.16em]" style={{ color: chapter.accent }}>{chapter.brand}</span>
        </div>
        <div className={`relative isolate overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${chapter.wash} px-7 py-12 sm:px-10 md:min-h-[22rem] md:px-12 md:py-16`}>
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 right-[-0.04em] -z-10 select-none font-display text-[clamp(5rem,11vw,10rem)] font-black uppercase leading-none tracking-[-0.08em] opacity-[0.085]" style={{ color: chapter.accent }}>{chapter.lead}</span>
          <div className="relative max-w-md">
            <h3 className="font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-slate-900 sm:text-5xl">{chapter.title}</h3>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-700">{chapter.detail}</p>
          </div>
        </div>
      </motion.div>
    </article>
  )
}

export function PhilosophyStrip() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="relative overflow-clip bg-[#f7faf5] py-16 md:py-20">
      <div className="container mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 md:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.2fr)] md:gap-14 lg:gap-24">
        <div className="md:relative">
          <div className="md:sticky md:top-32">
            <h2 className="max-w-[10ch] font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">Pressed. Sparkling. Fizzy.</h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-600">Follow the Fresh 360 collection from Juicera&apos;s cold-pressed drinks through Fruizy&apos;s sparkling fruit to Fizzo&apos;s bold fizz.</p>
            <div className="mt-10 hidden h-28 w-px origin-top bg-emerald-900/10 md:block" aria-hidden="true">
              <motion.div style={{ scaleY: reduceMotion ? 1 : scaleY }} className="h-full w-full origin-top bg-brand-green" />
            </div>
          </div>
        </div>
        <div>
          {chapters.map((chapter, index) => <StoryChapter key={chapter.brand} chapter={chapter} index={index} />)}
        </div>
      </div>
    </section>
  )
}
