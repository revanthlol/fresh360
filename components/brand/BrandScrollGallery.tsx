'use client'

import { Fragment, useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { VideoBackdrop } from '@/components/shared/VideoBackdrop'
import { brandScenes, type BrandSceneData } from '@/lib/brand-scenes'
import { useDesktopMotion } from '@/lib/use-desktop-motion'
import type { Brand } from '@/lib/types'
import { BrandScene } from './BrandScene'

function GalleryPanel({ scene, content, index, progress, active, instant }: { scene: BrandSceneData; content?: Brand; index: number; progress: MotionValue<number>; active: boolean; instant: boolean }) {
  const start = index / brandScenes.length
  const end = (index + 1) / brandScenes.length
  const enter = Math.max(0, start - 0.075)
  const transform = useTransform(progress, index === 0 ? [0, 1] : [enter, start], index === 0 ? ['translate3d(0, 0, 0)', 'translate3d(0, 0, 0)'] : ['translate3d(0, 100%, 0)', 'translate3d(0, 0, 0)'])
  // RadiusOnScroll's rounded frame opens into an edge-to-edge panel.
  const radius = useTransform(progress, index === 0 ? [0, 0.08] : [enter, start], ['2rem', '0rem'])
  const textTransform = useTransform(progress, [start, start + (end - start) * 0.25, end], ['translate3d(0, 1.25rem, 0)', 'translate3d(0, 0, 0)', 'translate3d(0, 0, 0)'])
  const [detail, setDetail] = useState(false)
  useMotionValueEvent(progress, 'change', (value) => setDetail(value > start + (end - start) * 0.48))
  const singlePage = process.env.NEXT_PUBLIC_SINGLE_PAGE_MODE === 'true'
  const href = singlePage ? `#products?brand=${scene.id}` : `/brands/${scene.id}`
  const explore = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!singlePage || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const products = document.getElementById('products')
    if (!products) return
    event.preventDefault()
    window.dispatchEvent(new CustomEvent('fresh360:select-brand', { detail: scene.id }))
    window.history.replaceState(null, '', href)
    products.scrollIntoView({ behavior: event.detail === 0 ? 'instant' : 'smooth', block: 'start' })
  }
  return (
    <motion.article className="gallery-panel" aria-hidden={!active} inert={!active} style={{ transform: instant ? active ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)' : transform, borderRadius: instant ? 0 : radius }}>
      <VideoBackdrop src={`/videos/${scene.id}.mp4`} poster={scene.image} alt={scene.alt} active={active} />
      <div className="gallery-scrim" aria-hidden="true" />
      <motion.div className="brand-scene-copy" style={{ transform: instant ? 'none' : textTransform }}>
        <p className="scene-eyebrow" style={{ color: scene.accent }}><span className="tabular-nums">0{index + 1} / 03</span><span>Fresh 360 collection</span></p>
        <h2 className="scene-brand-name" style={{ color: scene.accent }}>{content?.name || scene.name}</h2>
        <div className="sticky-story-text" aria-live="off">
          <p className={`scene-tagline story-text ${!detail ? 'is-active' : ''}`} aria-hidden={detail} style={{ transitionDuration: instant ? '0ms' : undefined }}>{content?.tagline || scene.tagline}</p>
          <p className={`scene-description story-text ${detail ? 'is-active' : ''}`} aria-hidden={!detail} style={{ transitionDuration: instant ? '0ms' : undefined }}>{content?.description || scene.description}</p>
        </div>
        {content?.labelNote && <p className="scene-label-note">{content.labelNote}</p>}
        <Link href={href} onClick={explore} className="scene-action press-feedback" style={{ color: scene.accent }}>Explore {scene.name}<ArrowUpRight size={22} aria-hidden="true" /></Link>
      </motion.div>
    </motion.article>
  )
}

// ImageScroller's sticky stage + thumbnail dock, with vertically stacking video panels.
export function BrandScrollGallery({ content }: { content: Brand[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const desktopMotion = useDesktopMotion()
  const [active, setActive] = useState(0)
  const [instant, setInstant] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (value) => setActive(Math.min(brandScenes.length - 1, Math.floor(value * brandScenes.length))))
  const select = useCallback((index: number, keyboard: boolean) => {
    const root = ref.current
    if (!root) return
    setInstant(keyboard)
    setActive(index)
    if (desktopMotion) {
      const top = root.getBoundingClientRect().top + window.scrollY
      const range = Math.max(0, root.offsetHeight - window.innerHeight)
      window.scrollTo({ top: top + range * ((index + 0.06) / brandScenes.length), behavior: keyboard ? 'instant' : 'smooth' })
    } else document.getElementById(`brand-${brandScenes[index].id}`)?.scrollIntoView({ behavior: keyboard || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#brand-${brandScenes[index].id}`)
  }, [desktopMotion])
  useEffect(() => {
    const jump = (event: Event) => {
      const detail = (event as CustomEvent<{ index: number; keyboard: boolean }>).detail
      if (detail && Number.isInteger(detail.index) && detail.index >= 0 && detail.index < brandScenes.length) select(detail.index, detail.keyboard)
    }
    window.addEventListener('fresh360:brand-jump', jump)
    return () => window.removeEventListener('fresh360:brand-jump', jump)
  }, [select])
  return (
    <div id="brand-gallery" ref={ref} className={`brand-scroll-gallery ${desktopMotion ? 'is-enhanced' : ''}`} onPointerDown={() => setInstant(false)}>
      {desktopMotion && <div className="gallery-anchors">{brandScenes.map((scene, index) => <div key={scene.id} id={`brand-${scene.id}`} style={{ position: 'absolute', top: `${index / 4 * 100}%` }} />)}</div>}
      {desktopMotion ? <div className="gallery-stage">
        {brandScenes.map((scene, index) => <GalleryPanel key={scene.id} scene={scene} index={index} progress={scrollYProgress} active={active === index} instant={instant} content={content.find((brand) => brand.id.current === scene.id)} />)}
        <nav className="gallery-dock" aria-label="Brand video gallery">{brandScenes.map((scene, index) => <button key={scene.id} type="button" aria-current={active === index ? 'true' : undefined} aria-label={`Show ${scene.name}`} onClick={(event) => select(index, event.detail === 0)}>
          <span className="gallery-thumbnail"><Image src={scene.image} alt="" fill sizes="80px" className="object-cover object-right" /></span><span>{scene.name}</span>
        </button>)}</nav>
      </div> : brandScenes.map((scene, index) => <Fragment key={scene.id}><div id={`brand-${scene.id}`} className="brand-scroll-anchor" /><BrandScene scene={scene} index={index} content={content.find((brand) => brand.id.current === scene.id)} /></Fragment>)}
    </div>
  )
}
