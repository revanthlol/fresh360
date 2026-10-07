'use client'

import type { Brand } from '@/lib/types'
import { brandScenes } from '@/lib/brand-scenes'
import { BrandScene } from './BrandScene'

export function BrandHero({ brand }: { brand: Brand }) {
  const index = brandScenes.findIndex((scene) => scene.id === brand.id.current)
  const scene = brandScenes[index]
  if (!scene) {
    return <section className="container mx-auto px-6 py-32"><h1 className="text-5xl font-display font-bold">{brand.name}</h1><p className="mt-6 max-w-prose">{brand.description}</p></section>
  }
  return <BrandScene scene={scene} content={brand} index={index} standalone />
}
