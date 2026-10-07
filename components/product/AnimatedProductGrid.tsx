"use client"

import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { ProductCard } from './ProductCard'
import type { Product } from '@/lib/sanity'

export function AnimatedProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ScrollReveal key={product._id} delay={Math.min(index, 3) * 0.05} distance={12} duration={0.28}>
          <ProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  )
}
