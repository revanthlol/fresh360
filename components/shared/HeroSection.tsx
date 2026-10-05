"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const isSinglePage = process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE === 'true'
  const productsTarget = isSinglePage ? '#products' : '/products'
  const contactTarget = isSinglePage ? '#contact' : '/contact'

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isSinglePage) return
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-[#f8faf4] lg:min-h-[min(54rem,94svh)]">
      <Image
        src="/hero.png"
        alt="Juicera, Fruizy and Fizzo drink bottles"
        fill
        priority
        sizes="100vw"
        className="-z-20 hidden object-cover object-center lg:block"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[48%] sm:h-[60%] lg:hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 26%)' }}>
        <Image
          src="/hero.png"
          alt="Juicera, Fruizy and Fizzo drink bottles"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[92%_bottom] sm:object-[68%_bottom]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8faf4_0%,rgba(248,250,244,0.98)_27%,rgba(248,250,244,0.48)_53%,rgba(248,250,244,0.02)_78%)] lg:bg-[linear-gradient(90deg,#f8faf4_0%,rgba(248,250,244,0.98)_22%,rgba(248,250,244,0.88)_34%,rgba(248,250,244,0.12)_58%,rgba(248,250,244,0)_73%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-[#f8faf4] to-transparent" />

      <div className="container mx-auto w-full px-5 pb-[42vh] pt-36 sm:px-6 lg:py-32">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[42rem]"
        >
          <h1 className="max-w-[11ch] font-display text-[clamp(3.35rem,6.8vw,6.3rem)] font-extrabold leading-[0.99] tracking-[-0.055em] text-slate-900">
            From cold press to <span className="text-brand-green">bold fizz.</span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-base leading-relaxed text-slate-700 sm:text-lg">
            Juicera cold-pressed drinks. Fruizy sparkling fruit. Fizzo artificially flavoured fizz. Find your drink in the Fresh 360 collection.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href={productsTarget} onClick={(event) => scrollTo(event, 'products')} className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2">
              Explore the drinks <ArrowRight size={19} aria-hidden="true" />
            </Link>
            <Link href={contactTarget} onClick={(event) => scrollTo(event, 'contact')} className="inline-flex min-h-12 items-center border-b-2 border-brand-green px-1 font-bold text-slate-900 transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2">
              Get in touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
