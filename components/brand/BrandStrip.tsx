"use client"

import React, { useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const brands = [
  {
    name: 'Juicera',
    tagline: '100% Pure. Cold-Pressed.',
    desc: 'Juicera is 100% pure cold-pressed juice. Nature in its most potent form—zero sugar, no preservatives, and absolutely no artificial colors. Just pure fruit and vegetable goodness.',
    color: 'brand-green',
    bgGradient: 'from-brand-green/10 to-brand-green/5',
    borderColor: 'border-brand-green/20',
    href: '/brands/juicera',
  },
  {
    name: 'Fuzzy',
    tagline: 'Goli Soda Meets Cold-Pressed.',
    desc: 'Fuzzy is a refreshing mix of classic goli soda and pure cold-pressed juice. A natural, fizzy experience with 0 added sugar and no preservatives. The best of both worlds.',
    color: 'brand-teal',
    bgGradient: 'from-brand-teal/10 to-brand-teal/5',
    borderColor: 'border-brand-teal/20',
    href: '/brands/fuzzy',
  },
]

export function BrandStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const headingY = useTransform(scrollYProgress, [0, 0.3], [60, 0])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const handleNav = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      router.push(href)
    }
  }

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-[#FAFAFA] overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-10 right-10 text-[20vw] font-black leading-none rotate-12">FRESH</div>
        <div className="absolute bottom-10 left-10 text-[20vw] font-black leading-none -rotate-12">360</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4 md:space-y-6"
        >
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-green bg-brand-green/10 px-4 py-2 rounded-full inline-block">
            Our Premium Lines
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.1]">
            Two distinct paths.{' '}
            <span className="text-slate-400 font-accent block md:inline">One pure obsession.</span>
          </h2>
        </motion.div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: idx * 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "group relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden cursor-pointer",
                "bg-white border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]",
                "hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] hover:-translate-y-3 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              )}
              onClick={() => handleNav(brand.href)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNav(brand.href)}
            >
              {/* Dynamic Gradient Background Overlay */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                "bg-gradient-to-br", brand.bgGradient
              )} />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-6 md:space-y-8">
                  {/* Brand name & Kicker */}
                  <div className="space-y-2">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", `text-${brand.color}`)}>
                      Signature Series
                    </span>
                    <h3 className={cn("text-4xl md:text-6xl font-display font-black tracking-tight", `text-${brand.color}`)}>
                      {brand.name}
                    </h3>
                  </div>

                  {/* Tagline & Description */}
                  <div className="space-y-4">
                    <p className="font-accent text-xl md:text-2xl text-slate-800 leading-tight">
                      {brand.tagline}
                    </p>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                      {brand.desc}
                    </p>
                  </div>
                </div>

                {/* CTA - Fixed bottom */}
                <div className="mt-10 md:mt-12">
                  <div className={cn(
                    "inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-500",
                    `bg-${brand.color} text-white shadow-lg shadow-${brand.color}/20`,
                    "group-hover:scale-105 group-hover:gap-5"
                  )}>
                    Explore {brand.name}
                    <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
                  </div>
                </div>
              </div>

              {/* Decorative Vibrant Elements */}
              <div className={cn(
                "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000",
                `bg-${brand.color}`
              )} />
              
              <div className={cn(
                "absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[0.02] group-hover:opacity-[0.08] group-hover:scale-150 transition-all duration-1000",
                `bg-${brand.color}`
              )} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
