"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  PackageCheck,
  Shovel,
  ThermometerSnowflake,
} from "lucide-react"

type AccentKey = "brand-green" | "brand-teal" | "brand-orange"

const chapters = [
  {
    kicker: "Chapter 01",
    title: "Harvest",
    pull: "Picked at peak ripeness, not peak convenience.",
    desc: "We source from trusted local farms and move ingredients quickly so flavor, color, and nutrition arrive intact. The story begins where the fruit is still alive.",
    icon: Shovel,
    accent: "brand-green" as AccentKey,
    stats: [
      { label: "Freshness", value: "Peak" },
      { label: "Heat", value: "0%" },
      { label: "Chain", value: "4°C" },
    ],
    bullets: [
      "Local farm partnerships",
      "Peak-ripeness selection",
      "Cold-chain handoff",
    ],
    videoSrc: undefined,
  },
  {
    kicker: "Chapter 02",
    title: "Press",
    pull: "Pressure, not heat, gives the juice its voice.",
    desc: "Hydraulic pressing keeps the profile vivid and bright. We avoid thermal damage so the taste stays close to the source instead of drifting into something generic.",
    icon: ThermometerSnowflake,
    accent: "brand-teal" as AccentKey,
    stats: [
      { label: "Freshness", value: "100%" },
      { label: "Heat", value: "0%" },
      { label: "Texture", value: "Clean" },
    ],
    bullets: [
      "Cold extraction",
      "No thermal stress",
      "Bright flavor finish",
    ],
    videoSrc: undefined,
  },
  {
    kicker: "Chapter 03",
    title: "Protect",
    pull: "Safety that does not flatten the taste.",
    desc: "High Pressure Processing helps preserve the juice while keeping the experience clean, safe, and stable. It is our way of protecting quality without sanding off the character.",
    icon: FlaskConical,
    accent: "brand-orange" as AccentKey,
    stats: [
      { label: "Safety", value: "HPP" },
      { label: "Preservatives", value: "None" },
      { label: "Color", value: "Natural" },
    ],
    bullets: [
      "Freshness first",
      "No preservatives",
      "Controlled protection",
    ],
    videoSrc: undefined,
  },
  {
    kicker: "Chapter 04",
    title: "Deliver",
    pull: "The cold chain stays unbroken until it reaches you.",
    desc: "From bottling to doorstep, every bottle stays in a tightly managed cold chain. The final act is about preserving the same clarity and vibrance the fruit had at the start.",
    icon: PackageCheck,
    accent: "brand-green" as AccentKey,
    stats: [
      { label: "Chain", value: "Cold" },
      { label: "Transit", value: "Fast" },
      { label: "Result", value: "Fresh" },
    ],
    bullets: [
      "Protected logistics",
      "Doorstep delivery",
      "Final quality check",
    ],
    videoSrc: undefined,
  },
] as const

const themeMap = {
  "brand-green": {
    text: "text-brand-green",
    border: "border-brand-green/20",
    bg: "bg-brand-green-light",
    soft: "bg-brand-green/10",
    tint: "bg-brand-green/5",
    glow: "bg-brand-green/15",
    line: "from-brand-green via-brand-green/40 to-transparent",
  },
  "brand-teal": {
    text: "text-brand-teal",
    border: "border-brand-teal/20",
    bg: "bg-brand-teal-light",
    soft: "bg-brand-teal/10",
    tint: "bg-brand-teal/5",
    glow: "bg-brand-teal/15",
    line: "from-brand-teal via-brand-teal/40 to-transparent",
  },
  "brand-orange": {
    text: "text-brand-orange",
    border: "border-brand-orange/20",
    bg: "bg-brand-orange-light",
    soft: "bg-brand-orange/10",
    tint: "bg-brand-orange/5",
    glow: "bg-brand-orange/15",
    line: "from-brand-orange via-brand-orange/40 to-transparent",
  },
} as const

function StatTile({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: AccentKey
}) {
  const theme = themeMap[tone]
  return (
    <div className={`rounded-2xl border px-4 py-4 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.25)] ${theme.border} ${theme.tint} bg-white/88`}>
      <div className="text-[9px] font-black uppercase tracking-[0.32em] text-slate-400">
        {label}
      </div>
      <div className={`mt-1 font-display text-2xl font-black ${theme.text}`}>
        {value}
      </div>
    </div>
  )
}

function StoryVideoFrame({
  title,
  label,
  theme,
  videoSrc,
}: {
  title: string
  label: string
  theme: (typeof themeMap)[AccentKey]
  videoSrc?: string
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-emerald-100/80 bg-[linear-gradient(180deg,rgba(255,255,252,0.98),rgba(239,247,239,0.98))] shadow-[0_40px_100px_-36px_rgba(15,23,42,0.22)]">
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} />
        </video>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.95),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(45,106,45,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(239,247,239,0.75)_100%)] pointer-events-none" />
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${theme.soft} opacity-55`} />
        <div className="absolute inset-x-6 top-6 flex items-center justify-between">
          <div className="rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[10px] font-black uppercase tracking-[0.32em] text-slate-400 shadow-sm">
            {label}
          </div>
          <div className="rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[10px] font-black uppercase tracking-[0.32em] text-slate-400 shadow-sm">
            Scroll video
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-8">
            <div className={`rounded-[2rem] border px-6 py-5 text-center backdrop-blur-md ${theme.border} ${theme.bg} shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)]`}>
              <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${theme.soft} ${theme.text}`}>
                <FlaskConical size={24} />
              </div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">
              Video slot ready
            </p>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-600">
              {title} will play here once the chapter video asset is added.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StoryScene({
  chapter,
  index,
  progress,
}: {
  chapter: (typeof chapters)[number]
  index: number
  progress: MotionValue<number>
}) {
  const reduceMotion = useReducedMotion()
  const total = chapters.length
  const start = index / total
  const end = (index + 1) / total
  const theme = themeMap[chapter.accent]

  const opacity = useTransform(
    progress,
    [start, start + 0.025, end - 0.16, end],
    [0, 1, 1, 0]
  )

  const y = useTransform(
    progress,
    [start, start + 0.045, end - 0.16, end],
    reduceMotion ? [0, 0, 0, 0] : [38, 0, 0, -24]
  )

  const cardScale = useTransform(
    progress,
    [start, start + 0.045, end - 0.16, end],
    reduceMotion ? [1, 1, 1, 1] : [0.94, 1, 1, 0.98]
  )

  const accentShift = useTransform(
    progress,
    [start, end],
    reduceMotion ? [0, 0] : [-20, 20]
  )

  return (
    <motion.article
      style={{ opacity, y }}
      className="absolute inset-0 hidden lg:flex items-center"
      aria-label={`${chapter.kicker}: ${chapter.title}`}
    >
      <motion.div
        style={{ x: accentShift, opacity }}
        className={`absolute left-10 top-12 h-[26rem] w-[26rem] rounded-full blur-[110px] ${theme.glow} pointer-events-none`}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-10 xl:grid-cols-[1.05fr_0.9fr]">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
              <span className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] shadow-sm ${theme.border} ${theme.soft} ${theme.text}`}>
                {chapter.kicker}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-400">
                04 ACTS
              </span>
            </div>

            <h2 className={`text-6xl xl:text-8xl font-display font-black leading-[0.88] tracking-[-0.05em] ${theme.text}`}>
              {chapter.title}
            </h2>

            <p className="max-w-xl font-accent text-[clamp(1.25rem,1.8vw,1.55rem)] italic leading-snug text-slate-600">
              {chapter.pull}
            </p>

            <p className="max-w-xl text-base leading-relaxed text-slate-500 xl:text-[17px]">
              {chapter.desc}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {chapter.bullets.map((bullet) => (
                <span
                  key={bullet}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${theme.border} ${theme.bg} ${theme.text}`}
                >
                  <CheckCircle2 size={14} />
                  {bullet}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 max-w-2xl">
              {chapter.stats.map((stat) => (
                <StatTile key={stat.label} {...stat} tone={chapter.accent} />
              ))}
            </div>
          </div>

          <motion.div
            style={{ scale: cardScale }}
            className="relative"
          >
            <div className="absolute inset-0 translate-y-5 rounded-[2.5rem] bg-black/5 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100/80 bg-[linear-gradient(180deg,rgba(255,255,252,0.98),rgba(239,247,239,0.98))] shadow-[0_40px_100px_-36px_rgba(15,23,42,0.22)]">
              <StoryVideoFrame title={chapter.title} label={chapter.kicker} theme={theme} videoSrc={chapter.videoSrc} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

function MobileCard({ chapter, index }: { chapter: (typeof chapters)[number]; index: number }) {
  const theme = themeMap[chapter.accent]
  const Icon = chapter.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className={`relative overflow-hidden rounded-[2rem] border p-6 pl-14 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.22)] ${theme.border} ${theme.tint}`}
    >
      <div className={`absolute left-5 top-6 h-[calc(100%-3rem)] w-[3px] rounded-full bg-gradient-to-b ${theme.line} opacity-70`} />
      <div className={`absolute left-4 top-6 flex h-6 w-6 items-center justify-center rounded-full ${theme.soft} ${theme.text} ring-4 ring-white shadow-sm`}>
        <span className="text-[9px] font-black">{String(index + 1)}</span>
      </div>

      <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[80px] ${theme.glow} opacity-70`} />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.34em] ${theme.border} ${theme.soft} ${theme.text}`}>
            {chapter.kicker}
          </span>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${theme.bg} ${theme.text}`}>
            <Icon size={20} />
          </div>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-4xl font-display font-black leading-[0.9] tracking-[-0.04em] text-slate-900">
            {chapter.title}
          </h2>
          <p className="font-accent text-[1.15rem] italic leading-snug text-slate-600">
            {chapter.pull}
          </p>
          <p className="text-[15px] leading-relaxed text-slate-500">
            {chapter.desc}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {chapter.stats.map((stat) => (
            <StatTile key={stat.label} {...stat} tone={chapter.accent} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {chapter.bullets.map((bullet) => (
            <span
              key={bullet}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${theme.border} ${theme.bg} ${theme.text}`}
            >
              <CheckCircle2 size={13} />
              {bullet}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export function ProcessStory() {
  const pageRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [activeChapter, setActiveChapter] = useState(0)

  const { scrollYProgress: pageProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  })

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(storyProgress, "change", (value) => {
    const next = Math.min(chapters.length - 1, Math.max(0, Math.floor(value * chapters.length)))
    setActiveChapter((prev) => (prev === next ? prev : next))
  })

  const heroY = useTransform(pageProgress, [0, 0.18], reduceMotion ? [0, 0] : [0, -40])
  const heroOpacity = useTransform(pageProgress, [0, 0.18, 0.3], [1, 0.82, 0.55])
  const orbA = useTransform(pageProgress, [0, 1], reduceMotion ? [0, 0] : [0, -60])
  const orbB = useTransform(pageProgress, [0, 1], reduceMotion ? [0, 0] : [0, 50])

  return (
    <div ref={pageRef} className="home-page min-h-screen text-slate-900">
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-slate-200/60 pointer-events-none">
        <motion.div
          style={{ scaleX: storyProgress, transformOrigin: "left" }}
          className="h-full w-full bg-gradient-to-r from-brand-green via-brand-teal to-brand-orange"
        />
      </div>

      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <motion.div
          style={{ x: orbA, y: orbB, opacity: heroOpacity }}
          className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-brand-green/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          style={{ x: orbB, y: orbA, opacity: heroOpacity }}
          className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto px-6">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-4xl text-center space-y-8">
            <span className="inline-flex items-center rounded-full border border-brand-green/20 bg-white/85 px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-brand-green shadow-sm">
              The Process
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-[-0.05em] text-slate-950">
              Four acts.{' '}
              <span className="block md:inline font-accent italic font-normal text-brand-green">
                One cold chain.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-slate-500">
              A cleaner, brighter process story built around precision, vibrance, and calm control from the source to the final pour.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              {chapters.map((chapter, i) => {
                const isActive = activeChapter === i
                const theme = themeMap[chapter.accent]
                return (
                  <span
                    key={chapter.title}
                    className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                      isActive
                        ? `${theme.border} ${theme.bg} ${theme.text} shadow-sm`
                        : "border-slate-200 bg-white/85 text-slate-400"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} {chapter.title}
                  </span>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={storyRef} className="relative lg:min-h-[620vh]">
        <div className="sticky top-0 hidden h-svh overflow-hidden lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,106,45,0.06),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.05),transparent_30%),linear-gradient(180deg,rgba(255,255,252,0.98),rgba(239,247,239,0.96))]" />

          <div className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
            <div className="flex flex-col gap-3 rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-md">
              {chapters.map((chapter, i) => {
                const theme = themeMap[chapter.accent]
                const isActive = activeChapter === i
                return (
                  <div key={chapter.title} className="flex items-center gap-3">
                    <div
                      className={`h-[10px] w-[10px] rounded-full transition-all ${
                        isActive ? `${theme.bg} ring-4 ${theme.border}` : "bg-slate-300"
                      }`}
                    />
                    <span
                      className={`min-w-[92px] text-[9px] font-black uppercase tracking-[0.28em] ${
                        isActive ? theme.text : "text-slate-400"
                      }`}
                    >
                      {chapter.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="absolute inset-0">
            {chapters.map((chapter, index) => (
              <StoryScene
                key={chapter.title}
                chapter={chapter}
                index={index}
                progress={storyProgress}
              />
            ))}
          </div>
        </div>

      <div className="relative space-y-4 px-4 py-6 lg:hidden">
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-brand-green via-brand-teal to-brand-orange opacity-20" />
          {chapters.map((chapter, index) => (
            <MobileCard key={chapter.title} chapter={chapter} index={index} />
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.45, once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border-y border-brand-green/15 bg-brand-green-light py-12 md:py-14"
      >
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-accent text-[clamp(1.4rem,3vw,2rem)] italic text-brand-green">
            Four acts. Zero compromise. One bottle that stays true.
          </p>
        </div>
      </motion.section>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/8 blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-emerald-100/80 home-card p-8 md:p-12 text-center">
            <span className="inline-flex rounded-full border border-brand-green/20 bg-brand-green-light px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em] text-brand-green">
              The End Result
            </span>
            <h2 className="mt-6 text-4xl md:text-6xl font-display font-black leading-[0.92] tracking-[-0.04em] text-slate-900">
              The result tastes exactly as intended.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              The process is designed to keep the fruit vivid, the finish clean, and the final bottle bright from first sip to last.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
