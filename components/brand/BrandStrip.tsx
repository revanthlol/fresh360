'use client'

import type { Brand } from '@/lib/types'
import { BrandScrollGallery } from './BrandScrollGallery'

export function BrandStrip({ id = 'brands', content = [] }: { id?: string; content?: Brand[] } = {}) {
  return <section id={id} className="brand-sequence" aria-labelledby="brand-sequence-title"><BrandScrollGallery content={content} /></section>
}
