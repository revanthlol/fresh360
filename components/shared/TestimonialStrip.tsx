"use client"

import React from 'react'
import { motion } from 'motion/react'
import { Star, Quote } from 'lucide-react'

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
    role: "Beverage Retailer, Bangalore",
    text: "Refrizz captures the nostalgia of classic Indian goli soda with sterile, reliable bottling quality. That marble pop is timeless fun for all ages.",
    rating: 5,
    brand: "Refrizz",
  },
]

const brandColorMap: Record<string, string> = {
  Juicera: 'bg-brand-green/10 text-brand-green',
  Fruizy: 'bg-brand-teal/10 text-brand-teal',
  Fuzzy: 'bg-brand-teal/10 text-brand-teal',
  Refrizz: 'bg-brand-orange/10 text-brand-orange',
}

export function TestimonialStrip() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-24 home-surface overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-20 space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Community & Partner Voices</span>
          <h2 className="text-4xl md:text-5xl text-display text-slate-900">
            Real experiences with{' '}
            <span className="font-accent text-slate-500">pure refreshment.</span>
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotate: idx === 1 ? 0 : idx === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: idx * 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="home-card p-8 rounded-[2rem] flex flex-col space-y-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-400"
            >
              {/* Rating */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${brandColorMap[t.brand]}`}>
                  {t.brand}
                </span>
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quote className="absolute -top-3 -left-1 text-slate-200" size={40} />
                <p className="relative z-10 text-slate-600 leading-relaxed pt-4">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-emerald-100/70 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
