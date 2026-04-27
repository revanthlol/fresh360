import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts, getAllBrands } from '@/lib/sanity'
import urlFor from '@/sanity/lib/image'
import { ArrowRight, Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'All Products | Fresh 360 Degrees Foods',
  description: 'Explore our full range of premium cold-pressed juices, carbonated beverages, and nostalgic sodas.',
}

export default async function ProductsPage() {
  const products = await getAllProducts()
  const brands = await getAllBrands()

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-50 py-24 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)] text-slate-900">
              Our Beverage <span className="text-[var(--color-juicera)]">Portfolio</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              From pure cold-pressed juices to innovative carbonated blends, every Fresh 360 product is crafted with zero compromises on quality.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Filters / Tabs */}
      <section className="sticky top-[72px] bg-white/80 backdrop-blur-md z-40 py-6 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Link 
              href="/products" 
              className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold transition-all shadow-md shrink-0"
            >
              All Products
            </Link>
            {brands.map((brand) => (
              <Link 
                key={brand._id}
                href={`/brands/${brand.id.current}`}
                className="px-6 py-2 bg-white text-slate-600 border border-[var(--color-border)] rounded-full text-sm font-medium hover:bg-slate-50 transition-all shrink-0"
              >
                {brand.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center text-slate-400 text-sm font-medium">
            <Filter className="w-4 h-4 mr-2" />
            <span>{products.length} Products Available</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => {
              const brandColor = product.brand.id.current === 'juicera' 
                ? 'var(--color-juicera)' 
                : product.brand.id.current === 'fuzzy' 
                  ? 'var(--color-fuzzy)' 
                  : 'var(--color-refrizz)';
              
              const mutedBg = product.brand.id.current === 'juicera' 
                ? '#F0F7F0' 
                : product.brand.id.current === 'fuzzy' 
                  ? '#F0F9F9' 
                  : '#FFF7ED';

              return (
                <Link 
                  key={product._id}
                  href={`/products/${product.slug.current}`}
                  className="group flex flex-col product-card-hover"
                >
                  {/* Image Container */}
                  <div 
                    className="relative aspect-square rounded-[32px] overflow-hidden mb-6 flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl"
                    style={{ backgroundColor: mutedBg }}
                  >
                    {product.image?.asset?._ref ? (
                      <Image
                        src={urlFor(product.image).width(800).url()}
                        alt={product.name}
                        fill
                        className="object-contain p-12 transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-7xl">🧪</div>
                    )}
                    
                    {/* Brand Badge */}
                    <div className="absolute top-6 left-6">
                      <span 
                        className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                        style={{ backgroundColor: brandColor }}
                      >
                        {product.brand.name}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[var(--color-juicera)] transition-colors">
                        {product.name}
                      </h3>
                      <div className="bg-slate-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                        <ArrowRight className="w-5 h-5 text-slate-900" />
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid (Sub-brands) */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)]">Shop by Brand</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Each of our brands represents a different philosophy of refreshment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Link 
                key={brand._id}
                href={`/brands/${brand.id.current}`}
                className="relative group h-96 rounded-[32px] overflow-hidden bg-slate-800 border border-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ backgroundColor: brand.primaryColor || 'var(--color-juicera)' }}
                />
                
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-bold mb-2 font-[family-name:var(--font-heading)]">{brand.name}</h3>
                  <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {brand.tagline}
                  </p>
                  <div className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-white border-b-2 border-white pb-1 group-hover:translate-x-2 transition-transform">
                    Explore Brand
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
