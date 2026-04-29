"use client"

import React, { useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const brands = [
  {
    name: 'Juicera',
    tagline: 'Pure. Pressed. Potent.',
    desc: '100% cold-pressed fruit juices & nut milks with zero additives. Designed for the health-conscious.',
    color: 'brand-green',
    bgGradient: 'from-brand-green/10 to-brand-green/5',
    borderColor: 'border-brand-green/20',
    href: '/brands/juicera',
  },
  {
    name: 'Fuzzy',
    tagline: 'Fizz meets freshness.',
    desc: 'Cold-pressed juice blended with sparkling water—a guilt-free fizzy experience that tastes alive.',
    color: 'brand-teal',
    bgGradient: 'from-brand-teal/10 to-brand-teal/5',
    borderColor: 'border-brand-teal/20',
    href: '/brands/fuzzy',
  },
  {
    name: 'Refrizz',
    tagline: 'Nostalgia, reimagined.',
    desc: 'Fun, affordable flavoured goli soda for the masses—bringing back childhood in every pop.',
    color: 'brand-orange',
    bgGradient: 'from-brand-orange/10 to-brand-orange/5',
    borderColor: 'border-brand-orange/20',
    href: '/brands/refrizz',
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
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center max-w-2xl mx-auto mb-20 space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Our Brands</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-display text-slate-900">
            Three lines.{' '}
            <span className="font-accent text-slate-500">One philosophy.</span>
          </h2>
        </motion.div>

        {/* Brand Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: idx * 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative p-8 md:p-10 rounded-[2rem] overflow-hidden cursor-pointer",
                "bg-gradient-to-br", brand.bgGradient,
                "border", brand.borderColor,
                "hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              )}
              onClick={() => handleNav(brand.href)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNav(brand.href)}
            >
              <div className="relative z-10 space-y-5">
                {/* Brand name */}
                <h3 className={cn("text-3xl md:text-4xl font-display font-extrabold", `text-${brand.color}`)}>
                  {brand.name}
                </h3>

                {/* Tagline in accent font */}
                <p className="font-accent text-lg text-slate-600">{brand.tagline}</p>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed">{brand.desc}</p>

                {/* CTA */}
                <div className={cn("inline-flex items-center gap-2 font-bold text-sm", `text-${brand.color}`)}>
                  Explore Brand
                  <div className={cn(
                    "p-1 rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-1",
                    `bg-${brand.color}`, "text-white"
                  )}>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

              {/* Decorative circle */}
              <div className={cn(
                "absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-[0.07] group-hover:scale-[2] transition-transform duration-700",
                `bg-${brand.color}`
              )} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
