"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Droplets, Leaf, Zap, ShieldOff, Palette } from 'lucide-react'

const features = [
  {
    icon: Droplets,
    kicker: 'Our Process',
    headline: 'Cold-Pressed.',
    sub: 'No heat. No shortcuts. Every bottle is cold-pressed to lock in maximum nutrients, enzymes, and flavour — exactly as nature intended.',
    color: 'text-brand-green',
    accent: 'bg-brand-green',
    light: 'bg-brand-green/5',
  },
  {
    icon: Zap,
    kicker: 'What We Leave Out',
    headline: 'Zero Sugar.',
    sub: "Not 'low sugar'. Not 'no added sugar syrup'. Zero. The only sweetness comes straight from the fruit itself.",
    color: 'text-brand-teal',
    accent: 'bg-brand-teal',
    light: 'bg-brand-teal/5',
  },
  {
    icon: ShieldOff,
    kicker: 'Shelf Life Philosophy',
    headline: 'No Preservatives.',
    sub: "We don't believe in chemicals to extend shelf life. Fresh means fresh — consumed close to when it's pressed, the way it should be.",
    color: 'text-brand-green',
    accent: 'bg-brand-green',
    light: 'bg-brand-green/5',
  },
  {
    icon: Palette,
    kicker: 'What You See',
    headline: 'No Artificial Colours.',
    sub: 'The vivid colour in every bottle is pure fruit and vegetable. Nothing dyed. Nothing doctored. Pure visual honesty.',
    color: 'text-brand-teal',
    accent: 'bg-brand-teal',
    light: 'bg-brand-teal/5',
  },
  {
    icon: Leaf,
    kicker: 'The Promise',
    headline: '100% Pure.',
    sub: 'Every ingredient is traceable. Every batch is intentional. What goes in the bottle is exactly what you think it is — nothing more, nothing less.',
    color: 'text-brand-green',
    accent: 'bg-brand-green',
    light: 'bg-brand-green/5',
  },
]

// Stagger variants — computed once, not per-scroll-frame
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const kickerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const headlineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const subVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1 },
}

function FeatureBlock({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // Once the element enters view it animates and is done — no ongoing scroll cost
      viewport={{ once: true, margin: '-80px' }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20 py-16 md:py-24`}
    >
      {/* Icon & index */}
      <motion.div
        variants={iconVariants}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="shrink-0 flex flex-col items-center gap-4"
      >
        <div className={`relative w-20 h-20 md:w-28 md:h-28 rounded-3xl ${feature.light} flex items-center justify-center`}>
          <Icon size={32} className={`md:w-10 md:h-10 ${feature.color}`} />
          <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-slate-100 shadow-sm text-[10px] font-black text-slate-400 flex items-center justify-center">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        {/* Line — triggered by parent whileInView, no own scroll listener */}
        <div className="hidden md:block w-[2px] h-24 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            variants={lineVariants}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            className={`w-full h-full ${feature.accent} origin-top`}
          />
        </div>
      </motion.div>

      {/* Text */}
      <div className={`space-y-4 max-w-xl ${isEven ? 'text-left' : 'text-left md:text-right'}`}>
        <motion.span
          variants={kickerVariants}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`block text-xs font-black uppercase tracking-[0.25em] ${feature.color}`}
        >
          {feature.kicker}
        </motion.span>
        <motion.h2
          variants={headlineVariants}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-slate-900"
        >
          {feature.headline}
        </motion.h2>
        <motion.p
          variants={subVariants}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-base md:text-lg text-slate-500 leading-relaxed max-w-md"
        >
          {feature.sub}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function PhilosophyStrip() {
  // Single scroll listener for the intro animation only
  const introRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ['start end', 'start 0.3'],
  })
  const introOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const introY = useTransform(scrollYProgress, [0, 1], [30, 0])

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Section intro */}
      <motion.div
        ref={introRef}
        style={{ opacity: introOpacity, y: introY }}
        className="container mx-auto px-6 max-w-6xl pt-24 pb-4 text-center"
      >
        <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
          Our Promise to You
        </span>
        <p className="mt-3 font-accent text-2xl md:text-3xl text-slate-600 max-w-2xl mx-auto">
          Five things we will{' '}
          <span className="text-brand-green">never compromise</span> on.
        </p>
      </motion.div>

      {/* Feature blocks — intersection-observer driven, zero scroll cost */}
      <div className="container mx-auto px-6 max-w-6xl">
        {features.map((feature, i) => (
          <FeatureBlock key={feature.headline} feature={feature} index={i} />
        ))}
      </div>

      <div className="h-16" />
    </section>
  )
}
