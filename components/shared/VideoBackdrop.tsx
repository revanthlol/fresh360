'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import type { MotionValue } from 'motion/react'

export function VideoBackdrop({ src, poster, alt, priority = false, active = true, progress }: { src: string; poster: string; alt: string; priority?: boolean; active?: boolean; progress?: MotionValue<number> }) {
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
    let frame = 0
    const seek = () => {
      frame = 0
      if (!progress || !active || !visible || document.hidden || reduced.matches || !Number.isFinite(video.duration) || video.seeking) return
      const time = Math.max(0, Math.min(1, progress.get())) * Math.max(0, video.duration - 0.04)
      if (Math.abs(video.currentTime - time) > 0.025) video.currentTime = time
    }
    const scheduleSeek = () => { if (!frame) frame = requestAnimationFrame(seek) }
    const update = () => {
      if (visible && active && !paused && !document.hidden && !reduced.matches && !connection?.saveData) {
        if (!video.getAttribute('src')) { video.src = src; video.load() }
        if (progress) { video.pause(); scheduleSeek() }
        else video.play().catch(() => { /* Poster remains available when autoplay fails. */ })
      } else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() }, { threshold: 0.05 })
    observer.observe(video)
    document.addEventListener('visibilitychange', update)
    reduced.addEventListener('change', update)
    video.addEventListener('loadeddata', scheduleSeek)
    video.addEventListener('seeked', scheduleSeek)
    const unsubscribe = progress?.on('change', scheduleSeek)
    return () => {
      observer.disconnect(); video.pause(); cancelAnimationFrame(frame); unsubscribe?.()
      video.removeEventListener('loadeddata', scheduleSeek); video.removeEventListener('seeked', scheduleSeek)
      document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', update)
    }
  }, [src, active, paused, progress])

  return (
    <div className="video-backdrop">
      <Image src={poster} alt={alt} fill priority={priority} sizes="100vw" className="video-poster" />
      <video ref={ref} muted loop={!progress} playsInline preload="none" aria-hidden="true" className={`video-motion ${ready ? 'is-ready' : ''}`} onLoadedData={() => setReady(true)} onError={() => setReady(false)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      {ready && !progress && <button type="button" className="video-control" onClick={() => { if (playing) setPaused(true); else { setPaused(false); ref.current?.play().catch(() => {}) } }} aria-label={playing ? 'Pause background video' : 'Play background video'} aria-pressed={paused}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>}
    </div>
  )
}
