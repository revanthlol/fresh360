"use client"

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import { motion } from 'motion/react'
import { getBrandBySlug, getProductsByBrand } from '@/lib/sanity'
import urlFor from '@/sanity/lib/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles, ChevronRight, Zap } from 'lucide-react'
import { Brand, Product } from '@/lib/types'

export default function BrandPage() {
  const params = useParams()
  const slug = params.slug as string
  const [brand, setBrand] = useState<Brand | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [brandData, productsData] = await Promise.all([
          getBrandBySlug(slug),
          getProductsByBrand(slug)
        ])
        if (!brandData) {
          setLoading(false)
          return
        }
        setBrand(brandData)
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching brand data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center space-y-12">
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            letterSpacing: ["0.5em", "0.8em", "0.5em"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-amber-600 font-black text-2xl md:text-6xl uppercase tracking-[0.5em] select-none"
        >
          {slug}
        </motion.div>
        <div className="w-32 md:w-48 h-[1px] bg-stone-800 relative overflow-hidden">
          <motion.div 
            animate={{ x: [-200, 200] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-amber-600"
          />
        </div>
      </div>
    )
  }

  if (!brand) notFound()

  // Premium Curated Brand Colors (for subtle accents)
  const brandColors: Record<string, { primary: string, accent: string }> = {
    juicera: { primary: 'rgba(45, 106, 45, 0.2)', accent: '#2D6A2D' },
    fuzzy: { primary: 'rgba(15, 118, 110, 0.2)', accent: '#0F766E' },
    refrizz: { primary: 'rgba(194, 65, 12, 0.2)', accent: '#C2410C' }
  }

  const colors = brandColors[slug] || { primary: 'rgba(217, 119, 6, 0.2)', accent: '#D97706' }

  return (
    <main ref={containerRef} className="relative min-h-screen bg-stone-950 text-stone-200 selection:bg-amber-600 selection:text-white overflow-x-hidden w-full">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px]"
          style={{ backgroundColor: colors.primary }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div className="space-y-8 md:space-y-12 order-2 lg:order-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-4 px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">The Signature Series</span>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="space-y-6"
            >
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[8rem] font-black text-white leading-[0.8] tracking-tighter uppercase break-words"
              >
                {brand.name}<span className="text-amber-600">.</span>
              </motion.h1>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-lg md:text-2xl lg:text-4xl font-black text-stone-500 uppercase tracking-tighter leading-none"
              >
                {brand.tagline}
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start"
            >
              <Link 
                href="#products" 
                className="px-10 py-5 md:py-6 bg-amber-600 text-stone-950 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] flex items-center shadow-[0_20px_40px_rgba(217,119,6,0.2)] hover:bg-white hover:-translate-y-2 transition-all duration-500 active:scale-95 group text-center"
              >
                Explore Collection 
                <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
            className="relative aspect-square order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[40px] md:rounded-[80px] border border-white/10 transform -rotate-3 scale-95" />
            <div className="relative h-full w-full rounded-[40px] md:rounded-[80px] overflow-hidden border border-white/10 flex items-center justify-center p-8 md:p-12 lg:p-20 bg-stone-900/50">
              {brand.heroImage?.asset?._ref ? (
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={urlFor(brand.heroImage).url()}
                    alt={brand.name}
                    fill
                    className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
                    priority
                  />
                </motion.div>
              ) : (
                <Zap className="w-24 h-24 md:w-32 md:h-32 text-amber-600/20" />
              )}
            </div>
            
            {/* Floating Stats */}
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-2xl z-20 hidden sm:block"
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-2xl bg-stone-900 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-stone-400">Purity</p>
                  <p className="text-sm md:text-xl font-black text-stone-900 leading-none uppercase">100% ORGANIC</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white rounded-t-[40px] md:rounded-t-[120px] relative z-10 text-stone-900 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-amber-600"
            >
              The Essence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]"
            >
              {brand.description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {brand.usps?.map((usp: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 bg-stone-50 rounded-[32px] md:rounded-[40px] border border-stone-100 flex items-start space-x-6 hover:border-amber-600/20 transition-all duration-500 group"
              >
                <div className="w-10 h-10 md:w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 transition-colors duration-500">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-amber-600 group-hover:text-white" />
                </div>
                <p className="text-base md:text-lg font-black uppercase tracking-tight pt-1 md:pt-2 leading-tight">{usp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-24 md:py-40 bg-stone-900 px-6 md:px-12 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-amber-600">The Collection</h2>
              <h3 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                AVAILABLE <br /> FLAVORS<span className="text-amber-600">.</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={`/products/${product.slug.current}`}
                  className="group block space-y-6 md:space-y-8"
                >
                  <div className="relative aspect-[3/4] rounded-[40px] md:rounded-[60px] bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center p-8 md:p-12 transition-all duration-700 group-hover:bg-white/10 group-hover:border-white/20 group-hover:-translate-y-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {product.image?.asset?._ref && (
                      <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                        <Image
                          src={urlFor(product.image).width(800).url()}
                          alt={product.name}
                          fill
                          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                        />
                      </div>
                    )}
                    
                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-xl">
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:space-y-3 px-2 md:px-4">
                    <div className="flex items-center space-x-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
                      <span>{product.category?.replace('-', ' ')}</span>
                      <div className="w-1 h-1 rounded-full bg-amber-600" />
                      <span className="text-amber-600">Premium</span>
                    </div>
                    <h4 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter group-hover:text-amber-600 transition-colors duration-500">
                      {product.name}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Banner */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-amber-600 text-stone-950 text-center relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.8]"
          >
            PURE <br /> INNOVATION.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-3xl font-black uppercase tracking-tighter max-w-2xl mx-auto opacity-80 leading-tight"
          >
            Crafted with passion, bottled with precision. Experience the future of refreshment.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pt-4 md:pt-8"
          >
            <Link 
              href="/products" 
              className="px-10 md:px-16 py-6 md:py-8 bg-stone-950 text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.4em] inline-block hover:scale-105 transition-transform duration-500 shadow-2xl"
            >
              View Full Catalog
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
