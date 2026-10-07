'use client'

import { Fragment, useState } from 'react'
import type { Brand } from '@/lib/types'
import { brandScenes } from '@/lib/brand-scenes'
import { BrandScene } from './BrandScene'

export function BrandStrip({ id = 'brands', content = [] }: { id?: string; content?: Brand[] } = {}) {
  const [instant, setInstant] = useState(false)

  return (
    <section id={id} className="brand-sequence" aria-labelledby="brand-sequence-title" onPointerDown={() => setInstant(false)}>
      <div className="brand-sequence-heading">
        <p id="brand-sequence-title">Three ways to refresh.</p>
        <nav aria-label="Jump to a brand" className="brand-sequence-nav">
          {brandScenes.map((scene) => (
            <a key={scene.id} href={`#brand-${scene.id}`} onClick={(event) => {
              const anchor = document.getElementById(`brand-${scene.id}`)
              const panel = document.getElementById(`brand-panel-${scene.id}`)
              if (!anchor || !panel || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
              event.preventDefault()
              const keyboard = event.detail === 0
              setInstant(keyboard)
              anchor.scrollIntoView({ behavior: keyboard || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
              if (keyboard) panel.focus({ preventScroll: true })
              window.history.replaceState(null, '', `#brand-${scene.id}`)
            }}>{scene.name}</a>
          ))}
        </nav>
      </div>
      {brandScenes.map((scene, index) => <Fragment key={scene.id}>
        <div id={`brand-${scene.id}`} className="brand-scroll-anchor" />
        <BrandScene scene={scene} index={index} instant={instant} content={content.find((brand) => brand.id.current === scene.id)} />
      </Fragment>)}
    </section>
  )
}
