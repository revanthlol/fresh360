import React from 'react'
import { notFound } from 'next/navigation'
import { getBrand, getProductsByBrand, urlFor, type Brand, type Product } from '@/lib/sanity'
import { PageHeader } from '@/components/shared/PageHeader'
import { ProductCard } from '@/components/product/ProductCard'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { cn } from '@/lib/utils'
import * as motion from 'motion/react-client'
import Image from 'next/image'

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const brand = await getBrand(slug)
  if (!brand) {
    notFound()
  }

  const products = await getProductsByBrand(slug)

  const brandThemes = {
    juicera: 'text-brand-green bg-brand-green-light',
    fuzzy: 'text-brand-teal bg-brand-teal-light',
    refrizz: 'text-brand-orange bg-brand-orange-light',
  }

  const themeClass = brandThemes[brand.id.current as keyof typeof brandThemes] || brandThemes.juicera

  return (
    <div className="bg-white">
      <PageHeader 
        title={brand.name}
        subtitle={brand.tagline}
        className={cn("transition-colors", themeClass)}
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <SectionHeader 
                label="About the Brand"
                title={`What makes ${brand.name} special?`}
                centered={false}
              />
              <p className="text-lg text-slate-600 leading-relaxed">
                {brand.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {brand.usps?.map((usp, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 border border-slate-100"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-green" />
                    {usp}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
            >
              {brand.heroImage ? (
                <Image 
                  src={urlFor(brand.heroImage).url()} 
                  alt={brand.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-slate-50 flex items-center justify-center text-6xl opacity-20">
                  🥤
                </div>
              )}
            </motion.div>
          </div>

          <SectionHeader 
            label="Product Lineup"
            title={`Our ${brand.name} Collection`}
            subtitle={`Explore all the varieties we offer under the ${brand.name} brand.`}
          />

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>

          {products.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="text-xl font-medium">No products found for this brand yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
