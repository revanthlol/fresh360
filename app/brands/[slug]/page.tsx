import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBrandBySlug, getProductsByBrand, getAllBrands } from '@/lib/sanity'
import urlFor from '@/sanity/lib/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface BrandPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const brands = await getAllBrands()
  return brands.map((brand) => ({
    slug: brand.id.current,
  }))
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)

  if (!brand) return { title: 'Brand Not Found' }

  return {
    title: `${brand.name} | Fresh 360 Degrees Foods`,
    description: brand.tagline,
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)
  const products = await getProductsByBrand(slug)

  if (!brand) notFound()

  const brandStyles = {
    juicera: {
      bg: 'bg-[var(--color-juicera)]',
      text: 'text-[var(--color-juicera)]',
      border: 'border-[var(--color-juicera)]',
      mutedBg: 'bg-[#F0F7F0]',
      hoverBg: 'hover:bg-[#255525]',
    },
    fuzzy: {
      bg: 'bg-[var(--color-fuzzy)]',
      text: 'text-[var(--color-fuzzy)]',
      border: 'border-[var(--color-fuzzy)]',
      mutedBg: 'bg-[#F0F9F9]',
      hoverBg: 'hover:bg-[#0D655E]',
    },
    refrizz: {
      bg: 'bg-[var(--color-refrizz)]',
      text: 'text-[var(--color-refrizz)]',
      border: 'border-[var(--color-refrizz)]',
      mutedBg: 'bg-[#FFF7ED]',
      hoverBg: 'hover:bg-[#A8380A]',
    },
  }[slug as 'juicera' | 'fuzzy' | 'refrizz'] || {
    bg: 'bg-slate-900',
    text: 'text-slate-900',
    border: 'border-slate-900',
    mutedBg: 'bg-slate-50',
    hoverBg: 'hover:bg-slate-800',
  }

  return (
    <div className="pt-20">
      {/* Brand Hero */}
      <section className={`relative overflow-hidden ${brandStyles.bg} py-24 md:py-32 text-white`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32 blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span>Premium Sub-Brand</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-heading)] leading-tight">
                {brand.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-lg leading-relaxed">
                {brand.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#products" 
                  className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold flex items-center group transition-all hover:shadow-xl active:scale-95"
                >
                  View Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
              {brand.heroImage?.asset?._ref ? (
                <Image
                  src={urlFor(brand.heroImage).url()}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-[40px] flex items-center justify-center p-12 border border-white/20">
                  <div className="text-center">
                    <span className="text-8xl mb-4 block">🥤</span>
                    <p className="text-white/60 font-medium">{brand.name} Showcase</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-heading)] text-slate-900">
            About {brand.name}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            {brand.description}
          </p>
        </div>
      </section>

      {/* Brand USPs */}
      <section className={`py-24 ${brandStyles.mutedBg}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brand.usps.map((usp, index) => (
              <div key={index} className="bg-white p-8 rounded-[24px] shadow-sm border border-[var(--color-border)] group hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-full ${brandStyles.bg} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{usp}</h3>
                <p className="text-slate-600">
                  We maintain the highest standards of quality and purity in every bottle of {brand.name}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)] text-slate-900">
                Explore Our Collection
              </h2>
              <p className="text-lg text-slate-600">
                Handcrafted {brand.name} beverages for every mood and moment.
              </p>
            </div>
            <div className={`px-6 py-2 rounded-full border ${brandStyles.border} ${brandStyles.text} font-semibold text-sm`}>
              {products.length} Products
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {products.map((product) => (
              <Link 
                key={product._id}
                href={`/products/${product.slug.current}`}
                className="group flex flex-col h-full bg-white rounded-[32px] overflow-hidden border border-[var(--color-border)] hover:border-transparent hover:shadow-2xl transition-all duration-500 product-card-hover"
              >
                {/* Product Image */}
                <div className={`relative aspect-[4/5] ${brandStyles.mutedBg} flex items-center justify-center p-8 overflow-hidden`}>
                  {product.image?.asset?._ref ? (
                    <Image
                      src={urlFor(product.image).width(600).url()}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-700 p-8"
                    />
                  ) : (
                    <div className="text-6xl group-hover:scale-125 transition-transform duration-700">🧊</div>
                  )}
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      Best Seller
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className={`text-xs font-bold uppercase tracking-[0.1em] ${brandStyles.text} block mb-2`}>
                      {product.category.split('-').join(' ')}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[var(--color-juicera)] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                    {product.tagline}
                  </p>
                  <div className="mt-auto pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Learn More</span>
                    <div className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:${brandStyles.bg} group-hover:text-white transition-all duration-300`}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Experience Footer */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${brandStyles.bg} rounded-full -mr-400 -mt-400 blur-[160px]`} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-heading)]">
            Ready to experience {brand.name}?
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Get your premium {brand.name} delivered fresh to your doorstep. Order via WhatsApp or visit our store.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://wa.me/919110328633"
              className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Order Now via WhatsApp
            </Link>
            <Link 
              href="/contact"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Bulk Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
