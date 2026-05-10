"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
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

function TimelineStep({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number]
  index: number
  progress: MotionValue<number>
}) {
  const reduceMotion = useReducedMotion()
  const slideY = useTransform(progress, [0, 0.35, 1], reduceMotion ? [0, 0, 0] : [28, 0, -14])
  const slideOpacity = useTransform(progress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.82])
  const artScale = useTransform(progress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.96, 1, 0.98])

  return (
    <motion.div
      style={{ y: slideY, opacity: slideOpacity }}
      className="relative flex items-start gap-6"
    >
      <div className="relative flex w-12 shrink-0 flex-col items-center">
        <div className={`relative z-10 mt-[14px] h-4 w-4 rounded-full ${step.dot} ring-4 ring-white`} />
        <div className="absolute left-[15px] top-[21px] h-[1.5px] w-[calc(100%-15px)] bg-slate-200" />
      </div>

      <motion.div
        style={{ scale: artScale }}
        className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm ${step.bg} ${step.color}`}
      >
        <step.icon size={22} />
      </motion.div>

      <div className="flex-1 pt-1 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
          Step {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-0.5 mb-1.5 text-2xl font-display font-bold text-slate-900 md:text-3xl">{step.title}</h3>
        <p className="text-sm leading-relaxed text-slate-500 md:text-base">{step.desc}</p>
      </div>
    </motion.div>
  )
}

export function ProcessTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const headingY = useTransform(scrollYProgress, [0, 0.35, 1], reduceMotion ? [0, 0, 0] : [42, 0, -20])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.88])
  const lineScale = useTransform(scrollYProgress, [0.12, 0.85], [0, 1])
  const ambientX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 18])
  const ambientY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [14, -14])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FAFAFA] py-28 md:py-36">
      <motion.div
        style={{ x: ambientX, y: ambientY, opacity: headingOpacity }}
        className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-brand-green/10 blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ x: ambientX, y: ambientY, opacity: headingOpacity }}
        className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none"
      />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mx-auto mb-20 max-w-3xl space-y-4 text-center"
        >
          <span className="inline-block rounded-full bg-brand-green/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            Our Process
          </span>
          <h2 className="text-4xl font-display leading-[1.05] text-slate-900 md:text-5xl lg:text-6xl">
            From farm to bottle, <span className="font-accent text-slate-500">the healthy way.</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px] rounded-full bg-slate-100" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[23px] top-6 h-[calc(100%-3rem)] w-[2px] origin-top rounded-full bg-gradient-to-b from-brand-green via-brand-teal to-brand-orange"
          />

          <div className="space-y-10 md:space-y-14">
            {steps.map((step, idx) => (
              <TimelineStep key={step.title} step={step} index={idx} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mt-16 text-center"
        >
          <Link
            href="/process"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-bold text-white transition-all active:scale-[0.97] hover:bg-brand-green"
          >
            See Full Process
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
