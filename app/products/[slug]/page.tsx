import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MessageCircle, CheckCircle2, FlaskConical } from 'lucide-react'
import { getProduct, urlFor } from '@/lib/sanity'
import { cn } from '@/lib/utils'

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const brandColors = {
    juicera: 'from-brand-green/20 to-brand-green/5 text-brand-green border-brand-green/20',
    fuzzy: 'from-brand-teal/20 to-brand-teal/5 text-brand-teal border-brand-teal/20',
  }

  const brandId = (product.brand?.id?.current || 'juicera') as keyof typeof brandColors
  const themeClass = brandColors[brandId] || brandColors.juicera

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12"
        >
          <ArrowLeft size={20} />
          Back to all products
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <div className={cn(
            "relative aspect-square rounded-[3rem] overflow-hidden bg-gradient-to-br border shadow-sm",
            themeClass
          )}>
            {product.image && (
              <Image
                src={urlFor(product.image)
                  .width(1200)
                  .quality(90)
                  .url()}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={urlFor(product.image).width(20).blur(50).url()}
                className="object-contain p-12 drop-shadow-2xl"
                priority
              />
            )}
            
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <span className="text-xs font-bold uppercase tracking-widest block opacity-60">Brand</span>
                <span className="font-display font-bold">{product.brand?.name}</span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-brand-green font-bold uppercase tracking-widest text-sm">
                {product.category.split('-').join(' ')}
              </span>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl text-slate-500 font-medium italic">
                &ldquo;{product.tagline}&rdquo;
              </p>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <FlaskConical size={20} className="text-brand-green" />
                  <h3>Ingredients</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients?.map((item, i) => (
                    <span key={i} className="px-4 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <CheckCircle2 size={20} className="text-brand-green" />
                  <h3>Health Benefits</h3>
                </div>
                <ul className="space-y-2">
                  {product.benefits?.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6">
              <Link 
                href={`https://wa.me/919391311652?text=Hi, I'm interested in ${product.name}`}
                target="_blank"
                className="w-full sm:w-auto bg-brand-green text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:bg-brand-green/90 hover:scale-105 active:scale-95 shadow-xl shadow-brand-green/20"
              >
                <MessageCircle size={24} />
                Order via WhatsApp
              </Link>
              <div className="text-sm text-slate-400">
                Bulk order or business inquiry? <Link href="/contact" className="text-slate-900 font-bold underline">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
