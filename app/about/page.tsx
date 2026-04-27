'use client'

import { motion, useScroll, useTransform, Variants } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'
import { Heart, ShieldCheck, Target, Zap, ArrowRight, Sparkles, Droplets, MapPin } from 'lucide-react'

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <main ref={containerRef} className="relative min-h-screen bg-stone-950 text-stone-200 overflow-x-hidden pt-32 md:pt-56 pb-24 md:pb-40 selection:bg-amber-600 selection:text-stone-900 w-full">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.1, 0.05]) }}
          className="absolute top-0 right-0 w-[80%] h-[80%] bg-amber-600/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2" 
        />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Story Hero */}
        <section className="mb-32 md:mb-56">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div 
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="space-y-10 md:space-y-14"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-white/5 text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] border border-white/5 shadow-2xl backdrop-blur-xl">
                <Sparkles className="w-4 h-4" />
                <span>The Origin Story</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black text-white leading-[0.8] tracking-tighter uppercase">
                CRAFTING <br />
                <span className="text-amber-600">PURITY.</span>
              </motion.h1>
              
              <motion.div variants={itemVariants} className="space-y-8 text-xl md:text-2xl lg:text-2xl text-stone-400 leading-tight font-black uppercase tracking-tighter">
                <p>
                  Fresh 360 Degrees Foods LLP was born out of a simple realization: the beverages we consume daily are often stripped of their natural goodness.
                </p>
                <p className="text-stone-500">
                  By bringing together traditional methods and modern cold-press technology, we created a system that preserves 100% of the nutrients exactly as nature intended.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square w-full max-w-[550px] lg:justify-self-end group"
            >
              <div className="absolute -inset-10 bg-amber-600/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative h-full w-full rounded-[60px] md:rounded-[100px] bg-stone-900 border border-white/10 shadow-3xl overflow-hidden flex items-center justify-center p-12 md:p-20 group">
                <motion.div 
                  animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="text-6xl md:text-8xl select-none filter drop-shadow-[0_40px_80px_rgba(217,119,6,0.25)]"
                >
                  🥭
                </motion.div>
                
                {/* Floating Info Tag */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-10 left-6 right-6 md:bottom-12 md:left-12 md:right-12 bg-white/5 backdrop-blur-3xl p-6 md:p-10 rounded-[40px] border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center space-x-4 mb-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <p className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">HYDERABAD FOUNDED</p>
                  </div>
                  <p className="text-amber-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] ml-8">Small Batch. Premium Sourcing.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="mb-32 md:mb-56">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 md:mb-40"
          >
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.8]">OUR <br /> <span className="text-amber-600">PILLARS</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-[10px] md:text-xs font-black uppercase tracking-[0.5em] leading-relaxed">
              PRECISION • PURITY • PERFORMANCE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Heart, title: 'Zero Additives', desc: 'No sugar, no water, no preservatives. Just 100% pure nature.' },
              { icon: ShieldCheck, title: 'Cold-Pressed', desc: 'No heat involved. We keep the enzymes and vitamins alive.' },
              { icon: Target, title: 'Precision Sourcing', desc: 'Hand-picked produce from verified sustainable local farms.' },
              { icon: Zap, title: 'Fresh Daily', desc: 'Small batch production ensuring the absolute freshest experience.' }
            ].map((value, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 md:p-12 rounded-[50px] md:rounded-[60px] border border-white/5 bg-white/[0.02] backdrop-blur-2xl transition-all duration-700 hover:bg-white/[0.05] hover:border-amber-600/20 hover:-translate-y-4"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] flex items-center justify-center mb-10 bg-stone-900 border border-white/5 shadow-xl group-hover:bg-amber-600 group-hover:text-stone-950 transition-all duration-500">
                  <value.icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 text-white uppercase tracking-tighter group-hover:text-amber-600 transition-colors">{value.title}</h3>
                <p className="text-stone-500 text-base md:text-lg font-black uppercase tracking-tight leading-snug group-hover:text-stone-300 transition-colors">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-32 md:mb-56">
          <div className="bg-stone-900 rounded-[60px] md:rounded-[120px] p-8 md:p-24 lg:p-32 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] md:text-[10vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none uppercase select-none">
               Vision
            </div>

            <div className="relative z-10">
              <div className="text-center mb-24 md:mb-32">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.8]">
                  ONE UNCOMPROMISING <br /> <span className="text-amber-600">STANDARD</span>
                </h2>
                <div className="w-20 h-1 bg-amber-600 mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:gap-8">
                {[
                  { brand: 'Juicera', desc: 'The purist choice. 100% cold-pressed fruit and vegetable juices designed for health and vitality.', tag: 'NATURE UNFILTERED', icon: Droplets },
                  { brand: 'Fuzzy', desc: 'Innovation meets tradition. Carbonated cold-pressed beverages that bring a healthy fizz to your life.', tag: 'HEALTHY EFFERVESCENCE', icon: Sparkles },
                  { brand: 'Refrizz', desc: 'A nostalgic tribute. Reimagining the classic Goli Soda with premium ingredients and natural flavors.', tag: 'CLASSIC REIMAGINED', icon: Zap }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 rounded-[50px] md:rounded-[60px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-600/30 transition-all duration-700"
                  >
                    <div className="w-full md:w-80 h-44 rounded-[40px] bg-stone-950 flex flex-col items-center justify-center text-3xl md:text-4xl font-black text-white shrink-0 shadow-3xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
                      <span className="uppercase tracking-tighter leading-none mb-3 z-10">{item.brand}</span>
                      <span className="text-[8px] md:text-[9px] tracking-[0.4em] font-black text-amber-600/80 uppercase z-10">{item.tag}</span>
                      <item.icon className="absolute right-[-10%] bottom-[-10%] w-32 h-32 text-white/[0.02] -rotate-12" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-6">
                      <p className="text-xl md:text-2xl lg:text-2xl text-stone-400 font-black uppercase tracking-tighter leading-tight group-hover:text-stone-200 transition-colors">
                        {item.desc}
                      </p>
                      <Link href={`/brands/${item.brand.toLowerCase()}`} className="inline-flex items-center space-x-3 text-amber-600 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] hover:text-white transition-colors">
                        <span>View Catalog</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="relative rounded-[60px] md:rounded-[120px] bg-amber-600 py-32 md:py-48 px-8 text-center overflow-hidden shadow-3xl">
            <div className="absolute inset-0 bg-stone-950 opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
            
            <div className="relative z-10 space-y-12">
              <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-7xl font-black text-stone-950 mb-12 tracking-tighter leading-[0.8] uppercase">
                JOIN THE <br /> REVOLUTION
              </h2>
              <p className="text-stone-900/70 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-black uppercase tracking-tighter leading-tight">
                Experience the difference that true uncompromising purity makes. Your journey to vitality starts here.
              </p>
              <div className="pt-8">
                <Link 
                  href="/products"
                  className="inline-flex items-center space-x-4 md:space-x-6 px-12 md:px-20 py-7 md:py-10 bg-stone-950 text-white rounded-full text-lg md:text-2xl font-black uppercase tracking-[0.4em] hover:scale-105 transition-all duration-500 shadow-3xl active:scale-95 group"
                >
                  <span>Explore All</span>
                  <ArrowRight className="w-6 h-6 md:w-10 md:h-10 group-hover:translate-x-3 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="absolute bottom-[-5%] left-[-5%] text-[8vw] md:text-[10vw] font-black text-stone-950/[0.05] select-none pointer-events-none whitespace-nowrap tracking-tighter uppercase">
              EST. 2025
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
