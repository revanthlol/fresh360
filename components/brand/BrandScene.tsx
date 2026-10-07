'use client'

import { useRef, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Brand } from '@/lib/types'
import type { BrandSceneData } from '@/lib/brand-scenes'
import { useDesktopMotion } from '@/lib/use-desktop-motion'

export function BrandScene({ scene, content, index = 0, standalone = false, instant = false }: {
  scene: BrandSceneData
  content?: Brand
  index?: number
  standalone?: boolean
  instant?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const desktopMotion = useDesktopMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const transform = useTransform(scrollYProgress, [0, 1], ['translate3d(0, 2%, 0) scale(1.035)', 'translate3d(0, 0, 0) scale(1)'])
  const textTransform = useTransform(scrollYProgress, [0, 0.8, 1], ['translate3d(0, 1.5rem, 0)', 'translate3d(0, 0, 0)', 'translate3d(0, 0, 0)'])
  const singlePage = process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE === 'true'
  const Heading = standalone ? 'h1' : 'h2'
  const href = standalone ? '#brand-products' : singlePage ? `#products?brand=${scene.id}` : `/brands/${scene.id}`

  const explore = (event: MouseEvent<HTMLAnchorElement>) => {
    if (standalone || !singlePage || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const products = document.getElementById('products')
    if (!products) return
    event.preventDefault()
    window.dispatchEvent(new CustomEvent('fresh360:select-brand', { detail: scene.id }))
    window.history.replaceState(null, '', href)
    products.scrollIntoView({ behavior: reducedMotion || event.detail === 0 ? 'instant' : 'smooth', block: 'start' })
  }

  return (
    <article ref={ref} id={`brand-panel-${scene.id}`} tabIndex={-1} className={`brand-scene ${standalone ? 'brand-scene-standalone' : ''}`}>
      <motion.div className="brand-scene-art" style={{ transform: desktopMotion && !instant ? transform : 'none' }}>
        <Image src={scene.image} alt={scene.alt} fill sizes="100vw" className="object-contain object-right" priority={standalone} />
      </motion.div>
      <div className="brand-scene-mobile-art">
        <Image src={scene.image} alt={scene.alt} fill sizes="(max-width: 1023px) 100vw, 1px" className="object-cover object-right" priority={standalone} />
      </div>
      <div className="brand-scene-scrim" aria-hidden="true" />
      <motion.div className="brand-scene-copy" style={{ transform: desktopMotion && !instant ? textTransform : 'none' }}>
        <p className="scene-eyebrow" style={{ color: scene.accent }}>
          <span className="tabular-nums">0{index + 1}</span>
          <span>{standalone ? 'Fresh 360 collection' : 'Three ways to refresh'}</span>
        </p>
        <Heading className="scene-brand-name" style={{ color: scene.accent }}>{content?.name || scene.name}</Heading>
        <p className="scene-tagline">{content?.tagline || scene.tagline}</p>
        <p className="scene-description">{content?.description || scene.description}</p>
        {content?.labelNote && <p className="scene-label-note">{content.labelNote}</p>}
        <Link href={href} onClick={explore} className="scene-action press-feedback" style={{ color: scene.accent }}>
          Explore {scene.name}<ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </motion.div>
    </article>
  )
}
