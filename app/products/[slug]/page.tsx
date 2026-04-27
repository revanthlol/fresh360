import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/sanity'
import urlFor from '@/sanity/lib/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Droplets, Leaf, ShieldCheck } from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    slug: product.slug.current,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} | ${product.brand.name} | Fresh 360`,
    description: product.tagline,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product.slug.current, product.brand.id.current)

  const brandStyles = {
    juicera: {
      text: 'text-[var(--color-juicera)]',
      bg: 'bg-[var(--color-juicera)]',
      lightBg: 'bg-[#F0F7F0]',
      border: 'border-[var(--color-juicera)]/20',
    },
    fuzzy: {
      text: 'text-[var(--color-fuzzy)]',
      bg: 'bg-[var(--color-fuzzy)]',
      lightBg: 'bg-[#F0F9F9]',
      border: 'border-[var(--color-fuzzy)]/20',
    },
    refrizz: {
      text: 'text-[var(--color-refrizz)]',
      bg: 'bg-[var(--color-refrizz)]',
      lightBg: 'bg-[#FFF7ED]',
      border: 'border-[var(--color-refrizz)]/20',
    },
  }[product.brand.id.current as 'juicera' | 'fuzzy' | 'refrizz'] || {
    text: 'text-slate-900',
    bg: 'bg-slate-900',
    lightBg: 'bg-slate-50',
    border: 'border-slate-200',
  }

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ordering ${product.name} from your ${product.brand.name} brand.`);

  return (
    <div className="pt-20">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex items-center space-x-2 text-sm">
        <Link href="/products" className="text-slate-400 hover:text-slate-900 transition-colors">Products</Link>
        <span className="text-slate-300">/</span>
        <Link href={`/brands/${product.brand.id.current}`} className="text-slate-400 hover:text-slate-900 transition-colors">
          {product.brand.name}
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Product Image */}
            <div className={`relative aspect-square rounded-[48px] ${brandStyles.lightBg} flex items-center justify-center p-12 lg:sticky lg:top-32`}>
              {product.image?.asset?._ref ? (
                <Image
                  src={urlFor(product.image).width(1200).url()}
                  alt={product.name}
                  fill
                  className="object-contain p-12 drop-shadow-2xl"
                  priority
                />
              ) : (
                <div className="text-9xl">🧪</div>
              )}
              
              <Link 
                href="/products" 
                className="absolute top-8 left-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <ArrowLeft className="w-6 h-6 text-slate-900" />
              </Link>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${brandStyles.lightBg} ${brandStyles.text} text-xs font-bold uppercase tracking-wider mb-4`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{product.category.replace('-', ' ')}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 font-[family-name:var(--font-heading)]">
                  {product.name}
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 font-medium italic">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              </div>

              <div className="prose prose-slate max-w-none mb-12">
                <p className="text-lg text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href={`https://wa.me/919110328633?text=${whatsappMessage}`}
                  target="_blank"
                  className={`flex-1 ${brandStyles.bg} text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all`}
                >
                  Order on WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/contact"
                  className="flex-1 bg-white text-slate-900 border border-slate-200 px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-slate-50 transition-all"
                >
                  Bulk Inquiry
                </Link>
              </div>

              {/* Ingredients & Benefits Tabs/Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-100 pt-12">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-[var(--color-juicera)]" />
                    Key Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((item, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {product.benefits && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                      <ShieldCheck className="w-5 h-5 mr-2 text-blue-500" />
                      Health Benefits
                    </h3>
                    <ul className="space-y-3">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                          <Check className={`w-4 h-4 mr-3 mt-0.5 ${brandStyles.text}`} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* USP Icons */}
              <div className="mt-12 flex items-center justify-between p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Zero Added Sugar</span>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">No Preservatives</span>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2">
                    <Leaf className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">100% Natural</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 border-t border-slate-100 bg-slate-50/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2 font-[family-name:var(--font-heading)]">More from {product.brand.name}</h2>
                <p className="text-slate-500">Discover other refreshing beverages from this brand.</p>
              </div>
              <Link href={`/brands/${product.brand.id.current}`} className={`font-bold ${brandStyles.text} flex items-center hover:underline`}>
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <Link 
                  key={p._id}
                  href={`/products/${p.slug.current}`}
                  className="group bg-white p-6 rounded-[32px] border border-slate-200 hover:shadow-xl transition-all product-card-hover"
                >
                  <div className={`relative aspect-square rounded-[24px] ${brandStyles.lightBg} mb-6 flex items-center justify-center p-8`}>
                    {p.image?.asset?._ref ? (
                      <Image
                        src={urlFor(p.image).width(400).url()}
                        alt={p.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-5xl">🥤</div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{p.name}</h3>
                  <p className="text-slate-500 text-sm line-clamp-1">{p.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand CTA */}
      <section className={`py-20 ${brandStyles.bg} text-white`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-heading)]">About the Brand</h2>
            <p className="text-white/80 max-w-xl">
              {product.brand.name}: {product.brand.tagline}
            </p>
          </div>
          <Link 
            href={`/brands/${product.brand.id.current}`}
            className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold whitespace-nowrap hover:bg-slate-50 transition-colors"
          >
            Learn about {product.brand.name}
          </Link>
        </div>
      </section>
    </div>
  )
}
