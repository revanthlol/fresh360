'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'

export function VideoBackdrop({ src, poster, alt, priority = false, active = true }: { src: string; poster: string; alt: string; priority?: boolean; active?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    let visible = false
    const update = () => {
      if (visible && active && !paused && !document.hidden && !reduced.matches && !connection?.saveData) {
        if (!video.getAttribute('src')) { video.src = src; video.load() }
        video.play().catch(() => { /* Keep the poster if autoplay is unavailable. */ })
      } else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() }, { threshold: 0.05 })
    observer.observe(video)
    document.addEventListener('visibilitychange', update)
    reduced.addEventListener('change', update)
    return () => { observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', update) }
  }, [src, active, paused])

  return (
    <div className="video-backdrop">
      <Image src={poster} alt={alt} fill priority={priority} sizes="100vw" className="video-poster" />
      <video ref={ref} muted loop playsInline preload="none" aria-hidden="true" className={`video-motion ${ready ? 'is-ready' : ''}`} onLoadedData={() => setReady(true)} onError={() => setReady(false)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      {ready && <button type="button" className="video-control" onClick={() => { if (playing) setPaused(true); else { setPaused(false); ref.current?.play().catch(() => {}) } }} aria-label={playing ? 'Pause background video' : 'Play background video'} aria-pressed={paused}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>}
    </div>
  )
}
