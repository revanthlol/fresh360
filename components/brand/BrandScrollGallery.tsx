'use client'

import { Fragment, useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { VideoBackdrop } from '@/components/shared/VideoBackdrop'
import { brandScenes, type BrandSceneData } from '@/lib/brand-scenes'
import { useDesktopMotion } from '@/lib/use-desktop-motion'
import type { Brand } from '@/lib/types'
import { BrandScene } from './BrandScene'
import { BrandRevealSlide } from './BrandRevealSlide'

const panelCount = brandScenes.length + 1
const clamp = (value: number) => Math.max(0, Math.min(1, value))

function FilmFrame({ index, progress, active, children }: { index: number; progress: MotionValue<number>; active: boolean; children: ReactNode }) {
  const transform = useTransform(progress, (value) => {
    const local = value * panelCount - index
    const entry = index === 0 ? 1 : clamp((local + 0.2) / 0.2)
    const exit = index === panelCount - 1 ? 0 : clamp((local - 0.8) / 0.2)
    return `translate3d(0, ${(1 - entry) * 100 - exit * 12}%, 0) scale(${1 - exit * 0.08})`
  })
  const radius = useTransform(progress, (value) => {
    const local = value * panelCount - index
    const entry = index === 0 ? 1 : clamp((local + 0.2) / 0.2)
    const exit = index === panelCount - 1 ? 0 : clamp((local - 0.8) / 0.2)
    return `${Math.max(1 - entry, exit) * 2}rem`
  })
  return <motion.article className="gallery-panel" aria-hidden={!active} inert={!active} style={{ transform, borderRadius: radius }}>{children}</motion.article>
}

function GalleryPanel({ scene, content, index, progress, active }: { scene: BrandSceneData; content?: Brand; index: number; progress: MotionValue<number>; active: boolean }) {
  const local = useTransform(progress, (value) => clamp((value * panelCount - index) / 0.8))
  const firstOpacity = useTransform(local, [0, 0.4, 0.48, 1], [1, 1, 0, 0])
  const secondOpacity = useTransform(local, [0, 0.44, 0.54, 1], [0, 0, 1, 1])
  const firstTransform = useTransform(local, [0.4, 0.48], ['translate3d(0, 0, 0)', 'translate3d(0, -0.75rem, 0)'])
  const secondTransform = useTransform(local, [0.44, 0.54], ['translate3d(0, 0.75rem, 0)', 'translate3d(0, 0, 0)'])
  const [detail, setDetail] = useState(false)
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(progress, 'change', (value) => {
    const position = value * panelCount - index
    setDetail(position >= 0.4)
    setVisible(position >= -0.2 && position <= 1)
  })
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
    <FilmFrame index={index} progress={progress} active={active}>
      <VideoBackdrop src={`/videos/${scene.id}-scroll.mp4`} poster={scene.image} alt={scene.alt} active={visible || active} progress={local} />
      <div className="gallery-scrim" aria-hidden="true" />
      <div className="brand-scene-copy">
        <p className="scene-eyebrow" style={{ color: scene.accent }}><span className="tabular-nums">0{index} / 03</span><span>Fresh 360 collection</span></p>
        <h2 className="scene-brand-name" style={{ color: scene.accent }}>{content?.name || scene.name}</h2>
        <div className="sticky-story-text">
          <motion.p className="scene-tagline film-story-text" aria-hidden={detail} style={{ opacity: firstOpacity, transform: firstTransform }}>{content?.tagline || scene.tagline}</motion.p>
          <motion.p className="scene-description film-story-text" aria-hidden={!detail} style={{ opacity: secondOpacity, transform: secondTransform }}>{content?.description || scene.description}</motion.p>
        </div>
        {content?.labelNote && <p className="scene-label-note">{content.labelNote}</p>}
        <Link href={href} onClick={explore} className="scene-action press-feedback" style={{ color: scene.accent }}>Explore {scene.name}<ArrowUpRight size={22} aria-hidden="true" /></Link>
      </div>
    </FilmFrame>
  )
}

export function BrandScrollGallery({ content }: { content: Brand[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const desktopMotion = useDesktopMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (value) => setActive(Math.min(panelCount - 1, Math.floor(value * panelCount))))
  const select = useCallback((index: number, keyboard: boolean) => {
    const root = ref.current
    if (!root) return
    setActive(index + 1)
    if (desktopMotion) {
      const top = root.getBoundingClientRect().top + window.scrollY
      const stageHeight = root.querySelector('.gallery-stage')?.clientHeight || window.innerHeight
      const range = Math.max(0, root.offsetHeight - stageHeight)
      window.scrollTo({ top: top + range * ((index + 1.12) / panelCount), behavior: keyboard ? 'instant' : 'smooth' })
    } else document.getElementById(`brand-${brandScenes[index].id}`)?.scrollIntoView({ behavior: keyboard || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#brand-${brandScenes[index].id}`)
  }, [desktopMotion])
  useEffect(() => {
    const jump = (event: Event) => {
      const detail = (event as CustomEvent<{ index: number; keyboard: boolean }>).detail
      if (detail && Number.isInteger(detail.index) && detail.index >= 0 && detail.index < brandScenes.length) select(detail.index, detail.keyboard)
    }
    const hash = () => {
      const index = brandScenes.findIndex((scene) => window.location.hash === `#brand-${scene.id}`)
      if (index >= 0) select(index, true)
    }
    hash()
    window.addEventListener('fresh360:brand-jump', jump)
    window.addEventListener('hashchange', hash)
    return () => { window.removeEventListener('fresh360:brand-jump', jump); window.removeEventListener('hashchange', hash) }
  }, [select])
  return (
    <div id="brand-gallery" ref={ref} className={`brand-scroll-gallery ${desktopMotion ? 'is-enhanced' : ''}`}>
      {desktopMotion ? <>
        <div className="gallery-anchors">{brandScenes.map((scene, index) => <div key={scene.id} id={`brand-${scene.id}`} style={{ position: 'absolute', top: `${(index + 1) * 2 / 9 * 100}%` }} />)}</div>
        <div className="gallery-stage">
          <FilmFrame index={0} progress={scrollYProgress} active={active === 0}><BrandRevealSlide progress={scrollYProgress} /></FilmFrame>
          {brandScenes.map((scene, index) => <GalleryPanel key={scene.id} scene={scene} index={index + 1} progress={scrollYProgress} active={active === index + 1} content={content.find((brand) => brand.id.current === scene.id)} />)}
          {active > 0 && <nav className="gallery-dock" aria-label="Brand video gallery">{brandScenes.map((scene, index) => <button key={scene.id} type="button" aria-current={active === index + 1 ? 'true' : undefined} aria-label={`Show ${scene.name}`} onClick={(event) => select(index, event.detail === 0)}>
            <span className="gallery-thumbnail"><Image src={scene.image} alt="" fill sizes="80px" className="object-cover object-right" /></span><span>{scene.name}</span>
          </button>)}</nav>}
        </div>
      </> : <><BrandRevealSlide />{brandScenes.map((scene, index) => <Fragment key={scene.id}><div id={`brand-${scene.id}`} className="brand-scroll-anchor" /><BrandScene scene={scene} index={index} content={content.find((brand) => brand.id.current === scene.id)} /></Fragment>)}</>}
    </div>
  )
}
