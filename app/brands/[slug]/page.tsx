import React from 'react'
import { notFound } from 'next/navigation'
import { getBrand, getProductsByBrand } from '@/lib/sanity'
import { ProductCard } from '@/components/product/ProductCard'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { BrandHero } from '@/components/brand/BrandHero'

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const brand = await getBrand(slug)
  if (!brand) {
    notFound()
  }

  const products = await getProductsByBrand(slug)

  return (
    <div className="home-page min-h-screen">
      <BrandHero brand={brand} />

      <section id="brand-products" className="relative py-20 md:py-28 bg-transparent">
        <div className="container mx-auto px-6">
          <SectionHeader
            label="Product Lineup"
            title={`The ${brand.name} collection`}
            subtitle={`Explore every variety under the ${brand.name} brand, tuned for the same freshness-first philosophy.`}
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="py-20 text-center text-slate-400">
              <p className="text-xl font-medium">No products found for this brand yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
