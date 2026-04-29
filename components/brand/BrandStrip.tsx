"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const brands = [
  {
    name: 'Juicera',
    desc: '100% cold-pressed fruit juices & nut milks. Zero additives.',
    color: 'bg-brand-green',
    lightColor: 'bg-brand-green-light',
    textColor: 'text-brand-green',
    href: '/brands/juicera',
    icon: '🥤'
  },
  {
    name: 'Fuzzy',
    desc: 'Cold-pressed juice mixed with carbonated water for a healthy fizz.',
    color: 'bg-brand-teal',
    lightColor: 'bg-brand-teal-light',
    textColor: 'text-brand-teal',
    href: '/brands/fuzzy',
    icon: '🫧'
  },
  {
    name: 'Refrizz',
    desc: 'Fun, affordable flavoured goli soda for the mass market.',
    color: 'bg-brand-orange',
    lightColor: 'bg-brand-orange-light',
    textColor: 'text-brand-orange',
    href: '/brands/refrizz',
    icon: '🍊'
  }
]

export function BrandStrip() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Our Signature Brands</h2>
          <p className="text-slate-500 text-lg">Three unique lines of beverages crafted for every mood and occasion.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={cn(
                "group relative p-8 rounded-[2.5rem] overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 border border-slate-100",
                brand.lightColor
              )}
            >
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                  {brand.icon}
                </div>
                <div className="space-y-2">
                  <h3 className={cn("text-3xl font-display font-bold", brand.textColor)}>{brand.name}</h3>
                  <p className="text-slate-600 leading-relaxed">{brand.desc}</p>
                </div>
                <Link 
                  href={brand.href}
                  className={cn(
                    "inline-flex items-center gap-2 font-bold group/link",
                    brand.textColor
                  )}
                >
                  Explore Brand
                  <div className={cn(
                    "p-1 rounded-full transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1",
                    brand.color,
                    "text-white"
                  )}>
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </div>

              {/* Decorative Circle */}
              <div className={cn(
                "absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700",
                brand.color
              )} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
