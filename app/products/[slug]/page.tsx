"use client"

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import { motion } from 'motion/react'
import { getProductBySlug, getProductsByBrand } from '@/lib/sanity'
import urlFor from '@/sanity/lib/image'
import Link from 'next/link'
import { 
  Droplets, 
  Zap, 
  Sparkles,
  Leaf,
  MessageCircle,
  ArrowLeft,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/lib/types'

export default function ProductDetailsPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await getProductBySlug(slug)
        if (!productData) {
          setLoading(false)
          return
        }
        const relatedData = await getProductsByBrand(productData.brand.id.current)
        setProduct(productData)
        setRelatedProducts(relatedData.filter(p => p._id !== productData._id).slice(0, 3))
      } catch (error) {
        console.error("Error fetching product:", error)
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
          className="text-amber-600 font-black text-2xl md:text-4xl uppercase tracking-[0.5em] select-none"
        >
          Discovering
        </motion.div>
        <div className="w-32 h-[1px] bg-stone-800 relative overflow-hidden">
          <motion.div 
            animate={{ x: [-128, 128] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-amber-600"
          />
        </div>
      </div>
    )
  }

  if (!product) notFound()

  const brandColors: Record<string, string> = {
    juicera: '#2D6A2D',
    fuzzy: '#0F766E',
    refrizz: '#C2410C'
  }

  const brandColor = brandColors[product.brand.id.current] || '#D97706'
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ${product.name} from your ${product.brand.name} collection.`)

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const}
    }
  }

  return (
    <main ref={containerRef} className="relative min-h-screen bg-stone-950 text-stone-200 selection:bg-amber-600 selection:text-white overflow-x-hidden w-full">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px]"
          style={{ backgroundColor: brandColor }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        {/* Navigation & Hero */}
        <section className="pt-32 md:pt-48 pb-12 md:pb-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 md:mb-12"
            >
              <Link 
                href="/products" 
                className="inline-flex items-center space-x-4 group/back text-stone-500 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-800 flex items-center justify-center group-hover/back:border-amber-600 transition-colors">
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover/back:-translate-x-1 transition-transform" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Back to Catalog</span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-32 items-center">
              {/* Product Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square group"
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[40px] md:rounded-[80px] border border-white/10 transform -rotate-2" />
                <div className="relative h-full w-full rounded-[40px] md:rounded-[80px] overflow-hidden border border-white/10 flex items-center justify-center p-8 md:p-20 lg:p-24 bg-stone-900/50">
                  {product.image?.asset?._ref && (
                    <motion.div 
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={urlFor(product.image).width(1200).url()}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                        priority
                      />
                    </motion.div>
                  )}
                </div>
                
                {/* Brand Badge */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10">
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-[18px] md:rounded-[24px] flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-xl"
                    style={{ backgroundColor: brandColor }}
                  >
                    <Zap className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Product Content */}
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
                className="space-y-8 md:space-y-12"
              >
                <div className="space-y-4 md:space-y-6">
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="inline-flex items-center space-x-3 text-amber-600"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">{product.brand.name} • {product.category.replace('-', ' ')}</span>
                  </motion.div>
                  
                  <motion.h1 
                    variants={itemVariants}
                    className="text-5xl sm:text-7xl md:text-7xl lg:text-8xl font-black text-white leading-[0.8] tracking-tighter uppercase"
                  >
                    {product.name}<span className="text-amber-600">.</span>
                  </motion.h1>
                  
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="text-lg md:text-2xl lg:text-4xl text-stone-500 font-black uppercase tracking-tighter"
                  >
                    {product.tagline}
                  </motion.p>
                </div>

                <motion.p 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  className="text-base md:text-xl text-stone-400 leading-relaxed font-medium max-w-2xl"
                >
                  {product.description}
                </motion.p>

                {/* Quick Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {[
                    { icon: Droplets, title: "Purified", desc: "360 Filtration", color: "text-blue-400" },
                    { icon: Leaf, title: "Organic", desc: "Farm Sourced", color: "text-green-400" }
                  ].map((spec, i) => (
                    <motion.div 
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="p-6 md:p-8 bg-white/5 rounded-[32px] md:rounded-[40px] border border-white/10 flex items-center space-x-6"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-stone-900 flex items-center justify-center">
                        <spec.icon className={cn("w-5 h-5 md:w-6 md:h-6", spec.color)} />
                      </div>
                      <div>
                        <p className="text-white text-sm md:text-base font-black uppercase tracking-tighter leading-none">{spec.title}</p>
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-stone-500 mt-1">{spec.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4"
                >
                  <Link 
                    href={`https://wa.me/919110328633?text=${whatsappMessage}`}
                    target="_blank"
                    className="flex-[1.5] px-8 md:px-10 py-5 md:py-7 bg-amber-600 text-stone-950 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] flex items-center justify-center shadow-2xl hover:bg-white hover:-translate-y-2 transition-all duration-500 active:scale-95 group text-center"
                  >
                    Order on WhatsApp <MessageCircle className="ml-4 w-5 h-5 transition-transform group-hover:scale-110" />
                  </Link>
                  <Link 
                    href="/contact"
                    className="flex-1 px-8 md:px-10 py-5 md:py-7 border border-stone-800 text-white rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] flex items-center justify-center hover:bg-white hover:text-stone-950 transition-all duration-500 active:scale-95 text-center"
                  >
                    Bulk Inquiry
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ingredients/Benefits Section */}
        <section className="py-24 md:py-40 px-6 md:px-12 bg-white rounded-t-[40px] md:rounded-t-[120px] text-stone-900 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-12 md:space-y-16">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-amber-600">The Blueprint</h2>
                <h3 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
                  PURELY <br /> COMPOSED<span className="text-amber-600">.</span>
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3 md:gap-4">
                {product.ingredients?.map((item: string, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 md:px-8 py-3 md:py-4 bg-stone-50 rounded-xl md:rounded-2xl border border-stone-100 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-sm"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-8 md:space-y-12">
              <div className="space-y-6 md:space-y-8">
                {product.benefits?.map((benefit: string, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-6 p-6 md:p-8 bg-stone-50 rounded-[32px] md:rounded-[40px] border border-stone-100 hover:border-amber-600/20 transition-all group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 transition-colors duration-500">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-amber-600 group-hover:text-white" />
                    </div>
                    <p className="text-lg md:text-xl font-black uppercase tracking-tight pt-1 md:pt-2 leading-snug">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-24 md:py-40 bg-stone-900 px-6 md:px-12 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
              <div className="text-center space-y-4 md:space-y-6">
                <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-amber-600">The Archive</h2>
                <h3 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                  SIMILAR <br /> ESSENCES<span className="text-amber-600">.</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {relatedProducts.map((p, i) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={`/products/${p.slug.current}`}
                      className="group space-y-6 md:space-y-8 block"
                    >
                      <div className="relative aspect-[3/4] rounded-[40px] md:rounded-[60px] bg-white/5 border border-white/5 flex items-center justify-center p-8 md:p-12 transition-all duration-700 group-hover:bg-white/10 group-hover:-translate-y-4">
                        {p.image?.asset?._ref && (
                          <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                            <Image
                              src={urlFor(p.image).width(800).url()}
                              alt={p.name}
                              fill
                              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                            />
                          </div>
                        )}
                      </div>
                      <div className="px-4 space-y-2 text-center md:text-left">
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">{p.brand.name}</p>
                        <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter group-hover:text-amber-600 transition-colors">
                          {p.name}
                        </h4>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
