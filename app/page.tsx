'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { 
  ArrowRight, 
  Leaf, 
  Sparkles, 
  Droplets, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Plus,
  Heart
} from 'lucide-react'
import { getFeaturedProducts } from '@/lib/sanity'
import urlFor from '@/sanity/lib/image'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const pureTextX = useTransform(scrollYProgress, [0.6, 0.9], ["20%", "-20%"])

  const brands = [
    { 
      name: 'JUICERA', 
      slug: 'juicera', 
      tagline: 'The Purest Essence', 
      desc: '100% cold-pressed purity. No additives, no compromises.',
      color: 'bg-green-600'
    },
    { 
      name: 'FUZZY', 
      slug: 'fuzzy', 
      tagline: 'The Modern Spark', 
      desc: 'Cold-pressed complexity meets elegant effervescence.',
      color: 'bg-cyan-600'
    },
    { 
      name: 'REFRIZZ', 
      slug: 'refrizz', 
      tagline: 'The Bold Classic', 
      desc: 'Intense flavors and dynamic fizz for the daring.',
      color: 'bg-orange-600'
    }
  ]

  useEffect(() => {
    getFeaturedProducts().then(products => {
      setFeaturedProducts(products)
      setLoading(false)
    })
  }, [])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-stone-950 text-stone-200 selection:bg-amber-600 selection:text-white overflow-x-hidden w-full">
      {/* Loading Overlay — keeps ref mounted so useScroll never complains */}
      {loading && (
        <div className="fixed inset-0 z-[999] bg-stone-950 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-24 h-24"
          >
            <div className="absolute inset-0 rounded-full border-t-2 border-amber-600 animate-spin" />
            <div className="absolute inset-4 rounded-full border-b-2 border-stone-800 animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">360</span>
            </div>
          </motion.div>
        </div>
      )}
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[150px] bg-amber-600/10" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.08, 0.03],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] bg-stone-500/10" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-12 z-10 overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center"
        >
          <div className="space-y-8 md:space-y-12 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-4 px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-stone-400">The Future of Freshness</span>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-7xl md:text-[5rem] lg:text-[7rem] font-black leading-[0.9] tracking-tighter uppercase text-white"
              >
                PURE <br /> 
                <span className="text-amber-600">360.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-lg md:text-xl lg:text-3xl font-black text-stone-500 uppercase tracking-tighter leading-none max-w-xl mx-auto lg:mx-0"
              >
                Experience the pinnacle of cold-pressed craft. Three legendary brands. One definitive standard.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4"
            >
              <Link 
                href="/products" 
                className="px-10 md:px-12 py-5 md:py-7 bg-amber-600 text-stone-950 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:bg-white hover:-translate-y-2 transition-all duration-500 active:scale-95 group text-center"
              >
                Shop Collection 
                <ArrowRight className="inline-block ml-5 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/contact" 
                className="px-10 md:px-12 py-5 md:py-7 border border-stone-800 text-white rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-stone-950 transition-all duration-500 active:scale-95 text-center"
              >
                Quick Connect
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
            className="relative aspect-square lg:aspect-[4/5] group"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[60px] md:rounded-[100px] border border-white/10 transform rotate-3 scale-95" />
            <div className="relative h-full w-full rounded-[60px] md:rounded-[100px] overflow-hidden border border-white/10 flex items-center justify-center p-12 md:p-20 bg-stone-900/50">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src="/logo.svg"
                  alt="Fresh 360"
                  fill
                  className="object-contain opacity-20 invert"
                />
              </motion.div>
              <div className="absolute bottom-10 md:bottom-20 left-0 right-0 text-center">
                <p className="text-[60px] md:text-[80px] font-black text-white/5 leading-none uppercase select-none">360°</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Brands Grid */}
      <section className="py-24 md:py-40 bg-white rounded-[40px] md:rounded-[120px] relative z-10 text-stone-900 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
          <div className="text-center space-y-6 md:space-y-8">
            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] text-amber-600">The Portfolio</h2>
            <p className="text-4xl sm:text-5xl md:text-[4rem] font-black uppercase tracking-tighter leading-[0.8] break-words">
              THREE BRANDS. <br />
              <span className="text-stone-200">ONE MASTERPIECE.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link 
                  href={`/brands/${brand.slug}`}
                  className="group relative block p-8 md:p-12 bg-stone-50 rounded-[48px] md:rounded-[64px] border border-stone-100 transition-all duration-700 hover:bg-stone-900 hover:border-stone-800 hover:-translate-y-4"
                >
                  <div className="space-y-8 md:space-y-12 relative z-10">
                    <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-[18px] md:rounded-[24px] flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-700", brand.color)}>
                      <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">{brand.name}</h3>
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">{brand.tagline}</p>
                    </div>
                    <p className="text-stone-500 group-hover:text-stone-400 transition-colors font-medium text-sm md:text-base">
                      {brand.desc}
                    </p>
                    <div className="flex items-center text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-stone-900 group-hover:text-white transition-colors">
                      Enter Brand <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 md:py-40 bg-stone-900 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="space-y-6 md:space-y-8 text-center md:text-left">
              <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] text-amber-600">The Archive</h2>
              <p className="text-4xl sm:text-6xl md:text-[4rem] font-black text-white uppercase tracking-tighter leading-[0.8]">
                CURATED <br />
                <span className="text-stone-700">COLLECTION.</span>
              </p>
            </div>
            <Link 
              href="/products"
              className="px-10 py-6 bg-white text-stone-950 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-amber-600 transition-colors duration-500 w-full md:w-auto text-center"
            >
              View Full Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {featuredProducts.length > 0 ? featuredProducts.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link 
                  href={`/products/${product.slug.current}`}
                  className="group block space-y-8 md:space-y-10"
                >
                  <div className="relative aspect-[3/4] rounded-[60px] md:rounded-[80px] bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center p-12 md:p-16 transition-all duration-700 group-hover:bg-white/10 group-hover:-translate-y-4">
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
                    <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="px-6 space-y-3 md:space-y-4">
                    <div className="flex items-center space-x-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">
                      <span>{product.brand.name}</span>
                      <div className="w-1 h-1 rounded-full bg-amber-600" />
                      <span className="text-amber-600">Featured</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center text-stone-500 font-black uppercase tracking-widest">
                Curating the next batch...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 md:py-64 px-6 md:px-12 bg-white text-stone-900 relative overflow-hidden">
        <motion.div 
          style={{ x: pureTextX }}
          className="absolute top-0 right-0 h-full opacity-[0.03] pointer-events-none select-none flex items-center overflow-hidden"
        >
          <p className="text-[10vw] md:text-[12vw] font-black text-stone-950 leading-none whitespace-nowrap">PURE</p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
          <div className="space-y-12 md:space-y-16">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] text-amber-600">The Obsession</h2>
              <p className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                BEYOND THE <br /> BOTTLE<span className="text-amber-600">.</span>
              </p>
            </div>
            <p className="text-lg md:text-xl font-medium text-stone-500 leading-relaxed max-w-xl">
              Our commitment to freshness isn&apos;t just a process; it&apos;s an art form. We harvest, press, and bottle within hours to ensure every drop carries the vibrant energy of nature.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-4 md:pt-8">
              {[
                { icon: Leaf, title: "Farm Direct", desc: "Handpicked at peak ripeness" },
                { icon: Droplets, title: "Cold Pressed", desc: "Preserving every enzyme" },
                { icon: ShieldCheck, title: "Zero Additives", desc: "Purely natural goodness" },
                { icon: Heart, title: "Made Fresh", desc: "Daily production cycles" }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-sm font-black uppercase tracking-widest">{item.title}</p>
                    <p className="text-[9px] md:text-xs text-stone-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[40px] md:rounded-[80px] overflow-hidden group shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1622597467822-47000d68019b?q=80&w=2000&auto=format&fit=crop" 
              alt="Freshness"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-stone-900/20 mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center"
              >
                <Plus className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-64 px-6 md:px-12 bg-stone-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full blur-[180px] bg-amber-600/5 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 md:space-y-12"
          >
            <h2 className="text-4xl sm:text-6xl md:text-[6rem] font-black text-white leading-[0.8] uppercase tracking-tighter">
              LIVE THE <br /> <span className="text-stone-700">360 LIFE.</span>
            </h2>
            <p className="text-xl md:text-2xl lg:text-4xl font-black text-stone-500 uppercase tracking-tighter leading-tight max-w-3xl mx-auto">
              Ready to elevate your standards? Discover the ultimate collection of premium refreshments.
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
            <Link 
              href="/products" 
              className="px-16 md:px-20 py-6 md:py-8 bg-amber-600 text-stone-950 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.5em] shadow-[0_24px_48px_-12px_rgba(217,119,6,0.3)] hover:bg-white hover:-translate-y-2 transition-all duration-500 active:scale-95 w-full sm:w-auto text-center"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


