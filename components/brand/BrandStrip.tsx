'use client'

import type { Brand } from '@/lib/types'
import { BrandRevealSlide } from './BrandRevealSlide'
import { BrandScrollGallery } from './BrandScrollGallery'

export function BrandStrip({ id = 'brands', content = [] }: { id?: string; content?: Brand[] } = {}) {
  return <section id={id} className="brand-sequence" aria-labelledby="brand-sequence-title"><BrandRevealSlide /><BrandScrollGallery content={content} /></section>
}
