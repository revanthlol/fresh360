import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedProductGrid } from './AnimatedProductGrid'
import { getFeaturedProducts } from '@/lib/sanity'

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  if (!products || products.length === 0) return null

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl text-display text-slate-900">
              Fan Favorites
            </h2>
            <p className="text-slate-500 text-lg">
              The most loved bottles from our cold-pressed and sparkling collections.
            </p>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-brand-green font-bold hover:underline shrink-0"
          >
            View All Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <AnimatedProductGrid products={products} />
      </div>
    </section>
  )
}
