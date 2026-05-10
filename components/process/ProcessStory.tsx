"use client"

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowRight, FlaskConical, PackageCheck, Shovel, ThermometerSnowflake } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type AccentKey = 'brand-green' | 'brand-teal' | 'brand-orange'

// ─── Data ────────────────────────────────────────────────────────────────────

const chapters = [
  {
    kicker: 'Chapter 01',
    title: 'Sourcing',
    pull: 'Harvested at the exact moment nature says so.',
    desc: 'We work with local organic farms and pick at peak ripeness so the raw ingredients arrive with maximum flavor, color, and nutritional density.',
    icon: Shovel,
    accent: 'brand-green' as AccentKey,
    blobPosition: 'top-right' as const,
    stats: [
      { label: 'Freshness', value: '100%' },
      { label: 'Heat', value: '0%' },
      { label: 'Cold Chain', value: '4°C' },
    ],
  },
  {
    kicker: 'Chapter 02',
    title: 'Pressing',
    pull: 'Pressure does what heat never could.',
    desc: 'Hydraulic pressing releases the juice without thermal damage, preserving the texture and clarity that make every sip feel vivid and alive.',
    icon: ThermometerSnowflake,
    accent: 'brand-teal' as AccentKey,
    blobPosition: 'bottom-left' as const,
    stats: [
      { label: 'Freshness', value: '100%' },
      { label: 'Heat', value: '0%' },
      { label: 'Cold Chain', value: '4°C' },
    ],
  },
  {
    kicker: 'Chapter 03',
    title: 'Safety',
    pull: 'Safety without the compromise.',
    desc: 'High Pressure Processing keeps the juice safe while keeping the flavor profile bright, clean, and close to the source.',
    icon: FlaskConical,
    accent: 'brand-orange' as AccentKey,
    blobPosition: 'top-left' as const,
    stats: [
      { label: 'Freshness', value: '100%' },
      { label: 'Heat', value: '0%' },
      { label: 'Cold Chain', value: '4°C' },
    ],
  },
  {
    kicker: 'Chapter 04',
    title: 'Delivery',
    pull: 'The cold never breaks.',
    desc: 'A strict cold chain keeps the final bottle in its best state from bottling room to doorstep, so the story ends exactly as intended.',
    icon: PackageCheck,
    accent: 'brand-green' as AccentKey,
    blobPosition: 'bottom-right' as const,
    stats: [
      { label: 'Freshness', value: '100%' },
      { label: 'Heat', value: '0%' },
      { label: 'Cold Chain', value: '4°C' },
    ],
  },
] as const

// ─── Accent classes ───────────────────────────────────────────────────────────

const accentClasses = {
  'brand-green': {
    text: 'text-brand-green',
    bg: 'bg-brand-green-light',
    border: 'border-brand-green/25',
    ring: 'ring-brand-green/20',
    dot: 'bg-brand-green',
    blob: 'bg-brand-green/10',
    line: 'from-brand-green via-brand-green/40 to-transparent',
    activePill: 'border-brand-green/30 bg-brand-green-light text-brand-green',
  },
  'brand-teal': {
    text: 'text-brand-teal',
    bg: 'bg-brand-teal-light',
    border: 'border-brand-teal/25',
    ring: 'ring-brand-teal/20',
    dot: 'bg-brand-teal',
    blob: 'bg-brand-teal/10',
    line: 'from-brand-teal via-brand-teal/40 to-transparent',
    activePill: 'border-brand-teal/30 bg-brand-teal-light text-brand-teal',
  },
  'brand-orange': {
    text: 'text-brand-orange',
    bg: 'bg-brand-orange-light',
    border: 'border-brand-orange/25',
    ring: 'ring-brand-orange/20',
    dot: 'bg-brand-orange',
    blob: 'bg-brand-orange/10',
    line: 'from-brand-orange via-brand-orange/40 to-transparent',
    activePill: 'border-brand-orange/30 bg-brand-orange-light text-brand-orange',
  },
} as const

// ─── ChapterStat ─────────────────────────────────────────────────────────────

function ChapterStat({
  label,
  value,
  accent,
  large = false,
}: {
  label: string
  value: string
  accent: AccentKey
  large?: boolean
}) {
  const theme = accentClasses[accent]
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
      <div className={`border-t-2 pt-2 ${theme.border}`}>
        <div className="text-[9px] font-bold uppercase tracking-[0.28em] text-slate-400">{label}</div>
        <div className={`mt-1 font-display font-black text-slate-900 ${large ? 'text-[26px]' : 'text-[18px]'}`}>
          {value}
        </div>
      </div>
    </div>
  )
}

// ─── Desktop ChapterScene ─────────────────────────────────────────────────────
// FIX: outer motion.article IS the 2-col grid. Left col and right col are
// direct grid children — no nested grid wrapper. pl-40 on left col clears
// the fixed sidebar (which takes ~130px from the left edge).

function DesktopChapterScene({
  chapter,
  index,
  progress,
}: {
  chapter: (typeof chapters)[number]
  index: number
  progress: MotionValue<number>
}) {
  const reduceMotion = useReducedMotion()
  const theme = accentClasses[chapter.accent]
  const total = chapters.length
  const start = index / total
  const end = (index + 1) / total

  // Scene fade + slide
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0],
  )
  const translateX = useTransform(
    progress,
    [start, start + 0.09, end - 0.09, end],
    reduceMotion ? [0, 0, 0, 0] : [48, 0, 0, -32],
  )

  // Card enters with subtle scale
  const cardScale = useTransform(
    progress,
    [start, start + 0.09, end - 0.09, end],
    reduceMotion ? [1, 1, 1, 1] : [0.9, 1, 1, 0.96],
  )

  // Blob fades with the scene
  const blobOpacity = useTransform(
    progress,
    [start, start + 0.04, end - 0.04, end],
    [0, 0.75, 0.75, 0],
  )

  // Card bottom bar grows in
  const cardBar = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0],
  )

  const Icon = chapter.icon

  const blobPositionClass = {
    'top-right': 'top-12 right-12',
    'bottom-left': 'bottom-12 left-12',
    'top-left': 'top-12 left-40',
    'bottom-right': 'bottom-12 right-12',
  }[chapter.blobPosition]

  return (
    // This IS the grid — two direct children become grid columns
    <motion.article
      style={{ opacity, x: translateX }}
      className="absolute inset-0 hidden lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      aria-label={`${chapter.kicker}: ${chapter.title}`}
    >
      {/* ── Ambient blob ─────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: blobOpacity }}
        className={`absolute pointer-events-none h-[28rem] w-[28rem] rounded-full blur-[120px] ${blobPositionClass} ${theme.blob}`}
        aria-hidden="true"
      />

      {/* ── LEFT COLUMN ──────────────────────────────────────────────────── */}
      {/* pl-40 (160px) guarantees clearance from the 130px-wide fixed sidebar */}
      <div className="relative flex h-full flex-col justify-center overflow-hidden pl-40 pr-8">
        {/* Decorative chapter number — behind content, clipped by overflow-hidden */}
        <div
          className="pointer-events-none absolute -bottom-10 -left-2 select-none font-display font-black leading-none text-slate-100"
          style={{ fontSize: 'clamp(10rem, 18vw, 16rem)' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="relative z-10 space-y-6">
          {/* Kicker */}
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.34em] text-slate-400">
            <span>{chapter.kicker}</span>
            <span className="text-slate-300">/</span>
            <span>04</span>
          </div>

          {/* Title */}
          <h2
            className="font-display font-black leading-[0.88] tracking-[-0.04em] text-slate-900"
            style={{ fontSize: 'clamp(3.5rem, 6.5vw, 5.5rem)' }}
          >
            {chapter.title}
          </h2>

          {/* Pull quote — Fraunces italic */}
          <p className="font-accent text-[21px] italic leading-snug text-slate-600">
            {chapter.pull}
          </p>

          {/* Body */}
          <p className="max-w-sm text-[16px] leading-relaxed text-slate-500">
            {chapter.desc}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-xs">
            {chapter.stats.map((stat) => (
              <ChapterStat key={stat.label} {...stat} accent={chapter.accent} />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN ─────────────────────────────────────────────────── */}
      <div className="flex h-full items-center py-10 pl-2 pr-10">
        <motion.div
          style={{ scale: cardScale }}
          className="relative w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_40px_100px_-30px_rgba(15,23,42,0.16)]"
        >
          {/* Subtle radial sheen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 80% 15%, rgba(255,255,255,0.85) 0%, transparent 35%), radial-gradient(circle at 20% 85%, rgba(255,255,255,0.55) 0%, transparent 30%)',
            }}
          />

          <div className="relative aspect-[3/4] max-h-[500px] p-8">
            <div className="relative z-10 flex h-full flex-col">
              {/* Icon block */}
              <div className="flex items-center justify-center pt-4">
                <div
                  className={`relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl ${theme.bg} ${theme.text}`}
                >
                  <div className={`absolute inset-0 scale-[2] rounded-full blur-2xl ${theme.blob} opacity-60`} />
                  <Icon size={40} className="relative z-10" />
                </div>
              </div>

              {/* Chapter title */}
              <div className="flex flex-1 items-center justify-center px-4 text-center">
                <h3 className="max-w-[240px] font-display text-[2rem] font-black leading-[0.95] tracking-[-0.04em] text-slate-900">
                  {chapter.title}
                </h3>
              </div>

              {/* Stats */}
              <div className="border-t border-slate-100 pt-5">
                <div className="grid grid-cols-3 gap-2.5">
                  {chapter.stats.map((stat) => (
                    <ChapterStat key={stat.label} {...stat} accent={chapter.accent} large />
                  ))}
                </div>
              </div>
            </div>

            {/* Animated accent bar at card bottom */}
            <motion.div
              style={{ scaleX: cardBar }}
              className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r ${theme.line}`}
            />
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}

// ─── Mobile ChapterCard ───────────────────────────────────────────────────────
// Simple static card — no scroll-driven animation on mobile for perf.

function MobileChapterCard({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[number]
  index: number
}) {
  const theme = accentClasses[chapter.accent]
  const Icon = chapter.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.14)]"
    >
      {/* Blob */}
      <div
        className={`absolute -right-12 -top-12 h-56 w-56 rounded-full blur-[80px] opacity-40 pointer-events-none ${theme.blob}`}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 py-7 space-y-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">
              {chapter.kicker} / 04
            </span>
            <h2 className="text-4xl font-display font-black leading-[0.9] tracking-[-0.04em] text-slate-900">
              {chapter.title}
            </h2>
          </div>
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${theme.bg} ${theme.text}`}
          >
            <Icon size={24} />
          </div>
        </div>

        {/* Pull */}
        <p className="font-accent text-[18px] italic leading-snug text-slate-600">
          {chapter.pull}
        </p>

        {/* Desc */}
        <p className="text-[15px] leading-relaxed text-slate-500">{chapter.desc}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {chapter.stats.map((stat) => (
            <ChapterStat key={stat.label} {...stat} accent={chapter.accent} />
          ))}
        </div>

        {/* Accent line */}
        <div className={`h-[2px] w-full rounded-full bg-gradient-to-r ${theme.line}`} />
      </div>
    </motion.article>
  )
}

// ─── ProcessStory (page root) ─────────────────────────────────────────────────

export function ProcessStory() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const chapterRef = useRef<HTMLElement>(null)
  const interludeRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const [activeChapter, setActiveChapter] = useState(0)

  // Full-page scroll — used for hero parallax only
  const { scrollYProgress: pageProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  })

  // Chapter-section scroll — drives scene transitions + progress bar
  const { scrollYProgress: chapterProgress } = useScroll({
    target: chapterRef,
    offset: ['start start', 'end end'],
  })

  // Sidebar visibility
  const isChapterInView = useInView(chapterRef, { amount: 0.1 })

  // Track active chapter from scroll position
  useMotionValueEvent(chapterProgress, 'change', (v) => {
    const next = Math.min(chapters.length - 1, Math.max(0, Math.floor(v * chapters.length)))
    setActiveChapter((prev) => (prev === next ? prev : next))
  })

  // ── Hero parallax values ───────────────────────────────────────────────────
  const heroY = useTransform(pageProgress, [0, 0.2], reduceMotion ? [0, 0] : [0, -90])
  const heroOpacity = useTransform(pageProgress, [0, 0.18, 0.3], [1, 0.8, 0.5])
  const blobTopX = useTransform(pageProgress, [0, 1], reduceMotion ? [0, 0] : [0, -70])
  const blobTopY = useTransform(pageProgress, [0, 1], reduceMotion ? [0, 0] : [0, -50])
  const blobBotX = useTransform(pageProgress, [0, 1], reduceMotion ? [0, 0] : [0, 70])
  const blobBotY = useTransform(pageProgress, [0, 1], reduceMotion ? [0, 0] : [0, 50])

  // ── Progress bar (scoped to chapter section, 0→1) ─────────────────────────
  // FIX: was using pageProgress before — now correctly uses chapterProgress
  // so bar starts at 0% when chapters begin and hits 100% as last chapter ends

  return (
    <div ref={pageRef} className="bg-[#FAFAFA] text-slate-900">

      {/* ── Fixed top progress bar ─────────────────────────────────────────── */}
      <div
        className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-slate-200/60 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          style={{ scaleX: chapterProgress, transformOrigin: 'left' }}
          className="h-full w-full bg-brand-green"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#FAFAFA]">
        {/* Ambient blobs */}
        <motion.div
          style={{ x: blobTopX, y: blobTopY, opacity: heroOpacity }}
          className="absolute -left-20 top-0 h-[520px] w-[520px] rounded-full bg-brand-green/8 blur-[130px] pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: blobBotX, y: blobBotY, opacity: heroOpacity }}
          className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-orange/6 blur-[130px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-5xl items-center px-6 py-24">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-3xl space-y-7">
            {/* Overline */}
            <span className="inline-flex items-center rounded-full border border-brand-green/25 bg-brand-green-light px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-brand-green">
              The Process
            </span>

            {/* H1 */}
            <h1
              className="font-display font-black leading-[0.88] tracking-[-0.04em] text-slate-900"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 6.25rem)' }}
            >
              Four acts.{' '}
              <span className="font-accent italic font-normal" style={{ fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>
                One
              </span>{' '}
              cold chain.
            </h1>

            {/* Pull quote */}
            <p className="font-accent text-[22px] italic leading-snug text-slate-600">
              From the field to the final pour, nothing gets compromised.
            </p>

            {/* Subtitle */}
            <p className="max-w-lg text-[18px] leading-relaxed text-slate-500">
              Every stage is tuned to preserve freshness, protect flavor, and keep the
              final bottle feeling bright and premium.
            </p>

            {/* Chapter pills — reactive to activeChapter during scroll */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {chapters.map((ch, i) => {
                const theme = accentClasses[ch.accent]
                const isActive = activeChapter === i
                return (
                  <span
                    key={ch.title}
                    className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] shadow-sm transition-colors duration-300 ${
                      isActive
                        ? theme.activePill
                        : 'border-slate-200 bg-white text-slate-400'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')} {ch.title}
                  </span>
                )
              })}
            </div>
          </motion.div>

          {/* Scroll cue — FIX: motion animate loop, not overflow-hidden clip trick */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.38em] text-slate-400">
              scroll
            </span>
            <div className="relative h-12 w-px bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                animate={reduceMotion ? {} : { y: ['0%', '140%'], opacity: [1, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeIn', repeatDelay: 0.2 }}
                className="absolute top-0 left-1/2 h-4 w-[2px] -translate-x-1/2 rounded-full bg-brand-green"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CHAPTERS                                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section ref={chapterRef} className="relative lg:min-h-[500vh]">

        {/* ── Desktop sticky stage ────────────────────────────────────────── */}
        <div className="sticky top-0 hidden h-svh overflow-hidden bg-[#FAFAFA] lg:block">

          {/* Fixed sidebar — FIX: properly spaced so dots align with line,
              total sidebar width from left-6: ~130px → chapter left col uses pl-40 */}
          <div
            className="fixed left-6 top-1/2 z-30 -translate-y-1/2 transition-opacity duration-500 hidden lg:block"
            style={{ opacity: isChapterInView ? 1 : 0 }}
            aria-label="Chapter navigation"
          >
            <div className="relative flex h-44 items-stretch">
              {/* Vertical line — absolutely centered behind dots */}
              <div className="absolute left-[4px] top-0 h-full w-px bg-slate-200" aria-hidden="true" />

              {/* Dots column */}
              <div className="flex flex-col justify-between">
                {chapters.map((chapter, i) => {
                  const isActive = activeChapter === i
                  const theme = accentClasses[chapter.accent]
                  return (
                    <div key={chapter.title} className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: isActive ? 1 : 0.5 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className={`h-[9px] w-[9px] rounded-full transition-colors duration-200 ${
                          isActive ? `${theme.dot} ring-4 ${theme.ring}` : 'bg-slate-300'
                        }`}
                        aria-current={isActive ? 'step' : undefined}
                      />
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 0.45 }}
                        className={`min-w-[72px] text-[9px] font-bold uppercase tracking-[0.28em] ${
                          isActive ? theme.text : 'text-slate-400'
                        }`}
                      >
                        {chapter.title}
                      </motion.span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Scene stack — absolute, each scene fades in/out via its own opacity */}
          <div className="absolute inset-0" aria-live="polite">
            {chapters.map((chapter, i) => (
              <DesktopChapterScene
                key={chapter.title}
                chapter={chapter}
                index={i}
                progress={chapterProgress}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile cards ────────────────────────────────────────────────── */}
        <div className="space-y-4 px-4 py-6 lg:hidden">
          {chapters.map((chapter, i) => (
            <MobileChapterCard key={chapter.title} chapter={chapter} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* INTERLUDE STRIPE                                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <motion.section
        ref={interludeRef}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5, once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border-y border-brand-green/15 bg-brand-green-light py-14"
      >
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-accent text-[clamp(1.5rem,3vw,2rem)] italic text-brand-green">
            Four steps. Zero compromise. One bottle.
          </p>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CTA                                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-24 md:py-36">
        {/* Green orb center */}
        <div
          className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/8 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Overline */}
            <span className="inline-flex rounded-full border border-brand-green/25 bg-brand-green-light px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-brand-green">
              The End Result
            </span>

            {/* Heading */}
            <h2
              className="font-display font-black leading-[0.9] text-slate-900"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
            >
              The result tastes{' '}
              <span className="font-accent italic font-normal" style={{ fontVariationSettings: '"SOFT" 50, "WONK" 0' }}>
                exactly
              </span>{' '}
              as intended.
            </h2>

            {/* Subtext */}
            <p className="mx-auto max-w-lg text-[18px] leading-relaxed text-slate-500">
              The process is built to preserve the way the fruit should feel, from the
              first sip to the last.
            </p>
          </motion.div>

          {/* Buttons — staggered slightly after heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-4 font-bold text-white transition-transform hover:scale-[1.03] hover:bg-brand-green/90 active:scale-[0.97]"
            >
              Explore Products
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-4 font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
