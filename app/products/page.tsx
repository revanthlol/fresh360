import React from 'react'
import Link from 'next/link'
import { getProducts, getBrands } from '@/lib/sanity'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ProductCard } from '@/components/product/ProductCard'
import { cn } from '@/lib/utils'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>
}) {
  const { brand: brandFilter } = await searchParams
  const [allProducts, brands] = await Promise.all([
    getProducts(),
    getBrands()
  ])

  const products = brandFilter 
    ? allProducts.filter(p => p.brand?.id?.current === brandFilter)
    : allProducts

  return (
    <div className="home-page min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeader 
          label="Our Collection"
          title="Explore Pure Refreshment"
          subtitle="From 100% cold-pressed juices to sparkling fruit blends and nostalgic goli sodas."
        />

        {/* Brand Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/products"
            className={cn(
                "px-6 py-2 rounded-full font-bold text-sm transition-all",
                !brandFilter
                ? "bg-brand-green text-white shadow-lg scale-105" 
                : "home-card text-slate-600 hover:shadow-md"
              )}
          >
            All Products
          </Link>
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/products?brand=${brand.id.current}`}
              className={cn(
                "px-6 py-2 rounded-full font-bold text-sm transition-all",
                brandFilter === brand.id.current
                  ? "bg-brand-green text-white shadow-lg scale-105"
                  : "home-card text-slate-600 hover:shadow-md"
              )}
            >
              {brand.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl font-medium">No products found in this category. Stay tuned for updates!</p>
          </div>
        )}
      </div>
    </div>
  )
}
