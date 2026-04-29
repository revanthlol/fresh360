import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ProductCard } from './ProductCard'
import { getFeaturedProducts } from '@/lib/sanity'

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeader 
            label="Curated Selection"
            title="Fan Favorites"
            subtitle="The most loved bottles from our cold-pressed and sparkling collections."
            centered={false}
          />
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-brand-green font-bold hover:underline mb-8"
          >
            View All Products
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
