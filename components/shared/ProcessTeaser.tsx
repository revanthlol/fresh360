"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Cherry, ThermometerSnowflake, FlaskConical, Truck } from 'lucide-react'

const steps = [
  {
    icon: Cherry,
    title: 'Source',
    desc: 'Hand-picked organic fruits from trusted local farms across Karnataka.',
    color: 'text-brand-green',
    bg: 'bg-brand-green/10',
    dot: 'bg-brand-green',
  },
  {
    icon: ThermometerSnowflake,
    title: 'Press',
    desc: 'Cold-pressed at 4°C to preserve every vitamin, mineral, and enzyme.',
    color: 'text-brand-teal',
    bg: 'bg-brand-teal/10',
    dot: 'bg-brand-teal',
  },
  {
    icon: FlaskConical,
    title: 'Test',
    desc: 'Lab-tested in our ISO-certified facility for purity and safety.',
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
    dot: 'bg-brand-orange',
  },
  {
    icon: Truck,
    title: 'Deliver',
    desc: 'Cold-chain delivery to your doorstep within 24 hours of pressing.',
    color: 'text-brand-green',
    bg: 'bg-brand-green/10',
    dot: 'bg-brand-green',
  },
]

export function ProcessTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Progress line fills as you scroll through the section
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"])

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-20 space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Our Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-display text-slate-900">
            From farm to bottle,{' '}
            <span className="font-accent text-slate-500">the healthy way.</span>
          </h2>
        </motion.div>

        {/* Timeline — tree layout */}
        <div className="relative max-w-2xl mx-auto">
          {/*
            Layout:
            [vertical line + dot node] ←─ left column (w-12)
            [icon card + text]         ←─ right column (flex-1)
          */}

          {/* Track line — sits in the left column, vertically centered on icons */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-slate-100 rounded-full" />
          {/* Animated fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[23px] top-6 w-[2px] bg-gradient-to-b from-brand-green via-brand-teal to-brand-orange rounded-full origin-top"
          />

          <div className="space-y-10 md:space-y-14">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex items-start gap-6"
              >
                {/* Left column: dot node on the line */}
                <div className="relative flex flex-col items-center shrink-0 w-12">
                  {/* The dot that sits on the line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: idx * 0.1 + 0.2, duration: 0.4, type: "spring", stiffness: 300 }}
                    className={`relative z-10 w-4 h-4 rounded-full ${step.dot} ring-4 ring-white mt-[14px]`}
                  />
                  {/* Horizontal connector arm from dot to icon */}
                  <div className="absolute left-[15px] top-[21px] w-[calc(100%-15px)] h-[1.5px] bg-slate-200" />
                </div>

                {/* Icon */}
                <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${step.bg} ${step.color}`}>
                  <step.icon size={22} />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 pb-2">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Step {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-1.5 mt-0.5">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/process"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-green transition-all group active:scale-[0.97]"
          >
            See Full Process
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
