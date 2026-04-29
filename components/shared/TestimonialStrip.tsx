"use client"

import React from 'react'
import { motion } from 'motion/react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Bangalore",
    text: "Juicera's Elixir is my go-to post-workout drink. The ginger and lemon kick is exactly what I need to refresh and recharge.",
    rating: 5,
    brand: "Juicera",
  },
  {
    name: "Priya V.",
    location: "Mumbai",
    text: "Fuzzy is the perfect alternative to sugary sodas. It feels light and actually tastes like real fruit because it IS real fruit!",
    rating: 5,
    brand: "Fuzzy",
  },
  {
    name: "Anand K.",
    location: "Chennai",
    text: "Refrizz brings back childhood memories of goli soda but with a premium twist. Clean, fizzy, and absolutely fun.",
    rating: 5,
    brand: "Refrizz",
  },
]

const brandColorMap: Record<string, string> = {
  Juicera: 'bg-brand-green/10 text-brand-green',
  Fuzzy: 'bg-brand-teal/10 text-brand-teal',
  Refrizz: 'bg-brand-orange/10 text-brand-orange',
}

export function TestimonialStrip() {
  return (
    <section className="py-28 md:py-36 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-20 space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Testimonials</span>
          <h2 className="text-4xl md:text-5xl text-display text-slate-900">
            What our drinkers{' '}
            <span className="font-accent text-slate-500">say.</span>
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
              className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col space-y-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-400"
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
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                  <p className="text-slate-400 text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
