"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { urlFor, type Brand } from '@/lib/sanity'

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '').trim()

  if (normalized.length !== 6) return '45, 106, 45'

  const value = Number.parseInt(normalized, 16)

  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`
}

interface BrandHeroProps {
  brand: Brand
}

type BrandHeroVideo = {
  asset?: {
    url?: string
  }
}

type BrandWithHeroVideo = Brand & {
  heroVideo?: BrandHeroVideo
}

type BrandImageWithMetadata = Brand['heroImage'] & {
  asset?: {
    metadata?: {
      dimensions?: {
        width: number
        height: number
      }
    }
  }
}

function BrandMedia({ brand }: { brand: BrandWithHeroVideo }) {
  // VIDEO SUPPORT
  const heroVideoUrl = brand.heroVideo?.asset?.url

  if (heroVideoUrl) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-auto w-full"
      >
        <source
          src={heroVideoUrl}
          type="video/mp4"
        />
      </video>
    )
  }

  // IMAGE SUPPORT
  if (brand.heroImage) {
    const dimensions = (brand.heroImage as BrandImageWithMetadata).asset?.metadata?.dimensions

    return (
      <Image
        src={urlFor(brand.heroImage).width(1800).quality(90).url()}
        alt={brand.name}
        width={dimensions?.width || 1600}
        height={dimensions?.height || 1200}
        sizes="(max-width: 1024px) 100vw, 55vw"
        unoptimized
        placeholder="blur"
        blurDataURL={urlFor(brand.heroImage).width(20).blur(60).url()}
        className="h-auto w-full"
        priority
      />
    )
  }

  return (
    <div className="flex aspect-[4/3] items-center justify-center text-7xl text-slate-200">
      🥤
    </div>
  )
}

export function BrandHero({ brand }: BrandHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 100]
  )

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 0.85, 0.7]
  )

  const artScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.97]
  )

  const orbX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-20, 20]
  )

  const rgb = hexToRgb(brand.primaryColor)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-slate-200/70"
      style={{
        background: `linear-gradient(
          135deg,
          rgba(${rgb}, 0.09) 0%,
          rgba(250,250,250,0.97) 35%,
          #fff 100%
        )`,
      }}
    >
      {/* Ambient orbs */}
      <motion.div
        style={{
          x: orbX,
          opacity: textOpacity,
          backgroundColor: `rgba(${rgb}, 0.13)`,
        }}
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full blur-[100px]"
        aria-hidden="true"
      />

      <motion.div
        style={{
          x: orbX,
          opacity: textOpacity,
          backgroundColor: `rgba(${rgb}, 0.10)`,
        }}
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative container mx-auto grid items-center gap-12 px-6 py-28 md:py-36 lg:grid-cols-[1.05fr_0.95fr] lg:py-40">

        {/* ── Text Column ───────────────────────────────────────── */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-2xl space-y-6"
        >
          <span
            className="inline-flex items-center rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.36em]"
            style={{
              borderColor: `rgba(${rgb}, 0.18)`,
              backgroundColor: `rgba(${rgb}, 0.09)`,
              color: brand.primaryColor,
            }}
          >
            Signature line
          </span>

          <h1
            className="font-display font-black leading-[0.9] tracking-[-0.04em] text-slate-950"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
            }}
          >
            {brand.name}
          </h1>

          <p className="text-lg font-medium leading-snug text-slate-600 sm:text-xl">
            {brand.tagline}
          </p>

          <p className="text-base leading-relaxed text-slate-500 sm:text-[17px]">
            {brand.description}
          </p>

          {brand.usps && brand.usps.length > 0 && (
            <div className="flex flex-wrap gap-2.5 pt-1">
              {brand.usps.map((usp) => (
                <span
                  key={usp}
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur"
                >
                  {usp}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Media Column ─────────────────────────────────────── */}
        <motion.div
          style={{ scale: artScale }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 translate-y-4 rounded-[2rem] blur-2xl"
            style={{
              backgroundColor: `rgba(${rgb}, 0.12)`,
            }}
            aria-hidden="true"
          />

          {/* Bigger Dynamic Card */}
          <div className="relative w-full max-w-[950px] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)]">
            <div className="relative w-full overflow-hidden bg-slate-50">
              <BrandMedia brand={brand as BrandWithHeroVideo} />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
