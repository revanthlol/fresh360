"use client"

import React, { useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const brands = [
  {
    name: 'Juicera',
    tagline: '100% Pure. Cold-Pressed.',
    desc: 'Juicera is 100% pure cold-pressed juice. Nature in its most potent form, with zero sugar, no preservatives, and absolutely no artificial colors.',
    colorClass: 'text-brand-green',
    badgeClass: 'bg-brand-green/10 text-brand-green border-brand-green/20',
    hoverClass: 'group-hover:bg-brand-green/10',
    glowClass: 'bg-brand-green',
    href: '/brands/juicera',
  },
  {
    name: 'Fuzzy',
    tagline: 'Goli Soda Meets Cold-Pressed.',
    desc: 'Fuzzy blends classic goli soda energy with pure cold-pressed juice for a natural fizzy finish that still feels playful and premium.',
    colorClass: 'text-brand-teal',
    badgeClass: 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
    hoverClass: 'group-hover:bg-brand-teal/10',
    glowClass: 'bg-brand-teal',
    href: '/brands/fuzzy',
  },
]

function BrandCard({
  brand,
  index,
  progress,
  onNavigate,
}: {
  brand: (typeof brands)[number]
  index: number
  progress: MotionValue<number>
  onNavigate: (href: string) => void
}) {
  const reduceMotion = useReducedMotion()
  const cardY = useTransform(progress, [0, 0.35, 1], reduceMotion ? [0, 0, 0] : [32, 0, -18])
  const cardOpacity = useTransform(progress, [0, 0.2, 0.9, 1], [0.45, 1, 1, 0.82])
  const cardRotate = useTransform(progress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [index === 0 ? -1.2 : 1.2, 0, index === 0 ? 0.9 : -0.9])
  const orbScale = useTransform(progress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.95, 1, 1.08])

  return (
    <motion.div
      style={{ y: cardY, opacity: cardOpacity, rotate: cardRotate }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[2.5rem] home-card p-8 md:p-12 transition-shadow duration-500",
        "hover:shadow-[0_32px_64px_-16px_rgba(45,106,45,0.14)]"
      )}
      onClick={() => onNavigate(brand.href)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onNavigate(brand.href)}
    >
      <motion.div
        style={{ scale: orbScale }}
        className={cn(
          "absolute -top-20 -right-20 h-52 w-52 rounded-full blur-[90px] opacity-0 transition-opacity duration-700 group-hover:opacity-40",
          brand.glowClass
        )}
      />
      <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100", brand.hoverClass)} />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-2">
            <span className={cn("inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.35em]", brand.badgeClass)}>
              Signature Series
            </span>
            <h3 className={cn("text-4xl md:text-6xl font-display font-black tracking-tight", brand.colorClass)}>
              {brand.name}
            </h3>
          </div>

          <div className="space-y-4">
            <p className="font-accent text-xl md:text-2xl text-slate-800 leading-tight">
              {brand.tagline}
            </p>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
              {brand.desc}
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <div
            className={cn(
              "inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all duration-500",
              index === 0 ? "bg-brand-green shadow-lg shadow-brand-green/20" : "bg-brand-teal shadow-lg shadow-brand-teal/20",
              "group-hover:gap-5 group-hover:scale-105"
            )}
          >
            Explore {brand.name}
            <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function BrandStrip({ id = 'brands' }: { id?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const headingY = useTransform(scrollYProgress, [0, 0.3, 1], reduceMotion ? [0, 0, 0] : [44, 0, -20])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.88])
  const deckY = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [30, 0, -18])

  const handleNav = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
      router.push(href)
    }
  }

  return (
    <section id={id} ref={sectionRef} className="relative overflow-hidden home-surface py-24 md:py-36">
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.03]">
        <div className="absolute top-8 right-6 text-[20vw] font-black leading-none rotate-12">FRESH</div>
        <div className="absolute bottom-8 left-6 text-[20vw] font-black leading-none -rotate-12">360</div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mx-auto mb-16 max-w-3xl space-y-4 text-center md:mb-24 md:space-y-6"
        >
          <span className="inline-block rounded-full bg-brand-green/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">
            Our Premium Lines
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.08] text-slate-900">
            Two distinct paths. <span className="block font-accent text-slate-400 md:inline">One pure obsession.</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ y: deckY }}
          className="grid grid-cols-1 gap-6 md:gap-10 max-w-6xl mx-auto md:grid-cols-2"
        >
          {brands.map((brand, idx) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              index={idx}
              progress={scrollYProgress}
              onNavigate={handleNav}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
