"use client"

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { getAllProducts, getAllBrands } from '@/lib/sanity'
import urlFor from '@/sanity/lib/image'
import { Sparkles, Search, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product, Brand } from '@/lib/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [activeBrand, setActiveBrand] = useState<string>('all')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, brandsData] = await Promise.all([
          getAllProducts(),
          getAllBrands()
        ])
        setProducts(productsData)
        setBrands(brandsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredProducts = activeBrand === 'all' 
    ? products 
    : products.filter(p => p.brand.id.current === activeBrand)

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
          Curating
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
          className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] bg-amber-600/10"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 md:pt-48 pb-12 md:pb-20 px-6 md:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-4 px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-stone-400">The 360 Catalog</span>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.8] tracking-tighter uppercase"
              >
                REFRESHMENT <br />
                <span className="text-amber-600">ARCHIVE.</span>
              </motion.h1 >
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-lg md:text-2xl lg:text-3xl font-black text-stone-500 uppercase tracking-tighter max-w-3xl"
              >
                Discover the full spectrum of craft. From pure cold-pressed essences to elegant effervescence.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-20 md:top-24 z-40 px-6 md:px-12 mb-16 md:mb-32">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-stone-900/80 backdrop-blur-3xl border border-white/10 p-2 md:p-3 rounded-[32px] md:rounded-[40px] flex flex-col md:flex-row items-center justify-between shadow-2xl"
            >
              <div className="flex items-center space-x-2 overflow-x-auto px-2 py-2 w-full md:w-auto scrollbar-hide">
                <button 
                  onClick={() => setActiveBrand('all')}
                  className={cn(
                    "px-6 md:px-8 py-3 md:py-4 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all shrink-0",
                    activeBrand === 'all' ? "bg-amber-600 text-stone-950 shadow-xl shadow-amber-600/20" : "text-stone-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  All Series
                </button>
                {brands.map((brand) => (
                  <button 
                    key={brand._id}
                    onClick={() => setActiveBrand(brand.id.current)}
                    className={cn(
                      "px-6 md:px-8 py-3 md:py-4 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all shrink-0",
                      activeBrand === brand.id.current ? "bg-amber-600 text-stone-950 shadow-xl shadow-amber-600/20" : "text-stone-500 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
              <div className="hidden lg:flex items-center px-8 text-stone-500 text-[10px] font-black uppercase tracking-[0.4em] border-l border-white/10 h-10 ml-6">
                <Search className="w-4 h-4 mr-4" />
                <span>{filteredProducts.length} ESSENCES</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-6 md:px-12 pb-32 md:pb-56">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-20 md:gap-y-32">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      delay: i * 0.05, 
                      duration: 0.8, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    <Link 
                      href={`/products/${product.slug.current}`}
                      className="group block space-y-8 md:space-y-10"
                    >
                      <div className="relative aspect-[3/4] rounded-[60px] md:rounded-[80px] bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center p-12 md:p-16 transition-all duration-700 group-hover:bg-white/10 group-hover:-translate-y-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        {product.image?.asset?._ref && (
                          <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                            <Image
                              src={urlFor(product.image).width(800).url()}
                              alt={product.name}
                              fill
                              className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                            />
                          </div>
                        )}
                        
                        <div className="absolute top-8 right-8 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 shadow-xl">
                          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </div>

                        {/* Brand Badge */}
                        <div className="absolute top-8 left-8 md:top-10 md:left-10">
                          <div className="px-4 md:px-5 py-1.5 md:py-2 bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-full text-[8px] font-black uppercase tracking-[0.3em] text-amber-600">
                            {product.brand.name}
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-4 md:px-6 space-y-3 md:space-y-4">
                        <div className="flex items-center space-x-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">
                          <span>{product.category.replace('-', ' ')}</span>
                          <div className="w-1 h-1 rounded-full bg-amber-600" />
                          <span className="text-amber-600">Collection</span>
                        </div>
                        <h4 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-sm md:text-base text-stone-500 font-medium leading-snug">
                          {product.tagline}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
