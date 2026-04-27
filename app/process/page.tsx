'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'
import { Droplets, ThermometerSnowflake, Leaf, FlaskConical, Truck, CheckCircle, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'



export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const steps = [
    {
      icon: Leaf,
      title: 'Ethical Sourcing',
      desc: 'We hand-pick only the finest, export-quality produce from our network of verified local farms in Hyderabad and beyond.',
      color: '#B45309',
      emoji: '🚜',
      tag: 'ORIGIN'
    },
    {
      icon: Droplets,
      title: 'Hygienic Cleaning',
      desc: 'Every piece of fruit and vegetable undergoes a multi-stage ozone wash to remove contaminants while preserving natural integrity.',
      color: '#D97706',
      emoji: '🧼',
      tag: 'PURITY'
    },
    {
      icon: ThermometerSnowflake,
      title: 'Hydraulic Cold-Press',
      desc: 'Using thousands of pounds of pressure, we extract every drop without generating heat, keeping enzymes and vitamins alive.',
      color: '#F59E0B',
      emoji: '⚙️',
      tag: 'EXTRACTION'
    },
    {
      icon: FlaskConical,
      title: 'Zero Additives',
      desc: 'No water, no sugar, no preservatives. The juice is immediately bottled in a climate-controlled environment.',
      color: '#B45309',
      emoji: '🧪',
      tag: 'HONESTY'
    },
    {
      icon: CheckCircle,
      title: 'Quality Seal',
      desc: 'Each batch is tested for brix levels and purity before receiving the Fresh 360 seal of excellence.',
      color: '#D97706',
      emoji: '🏷️',
      tag: 'VERIFIED'
    },
    {
      icon: Truck,
      title: 'Cold-Chain Delivery',
      desc: 'Our refrigerated vehicles ensure the juice stays at exactly 4°C from our facility to your doorstep.',
      color: '#F59E0B',
      emoji: '🚚',
      tag: 'DELIVERY'
    }
  ]

  return (
    <main ref={containerRef} className="relative min-h-screen bg-stone-950 text-stone-200 overflow-x-hidden pt-32 md:pt-56 pb-24 md:pb-40 selection:bg-amber-600 selection:text-stone-900 w-full">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.15, 0.05]) }}
          className="absolute top-0 right-0 w-[80%] h-[80%] bg-amber-600/20 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2" 
        />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-32 md:mb-56">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-white/5 text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/5 shadow-2xl backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Cold-Press Advantage</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black text-white mb-10 md:mb-14 leading-[0.8] tracking-tighter uppercase"
          >
            FARM TO <br />
            <span className="text-amber-600">BOTTLE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-xl text-stone-400 leading-tight max-w-3xl mx-auto font-black uppercase tracking-tighter"
          >
            Unlike standard juicing, our hydraulic technology preserves the cellular structure, delivering maximum nutrition in its rawest form.
          </motion.p>
        </section>

        {/* Process Steps */}
        <section className="mb-32 md:mb-56 space-y-32 md:space-y-64">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex flex-col lg:flex-row items-center gap-12 md:gap-24",
                i % 2 !== 0 && "lg:flex-row-reverse"
              )}
            >
              {/* Content Card */}
              <div className="flex-1 text-center lg:text-left space-y-8 md:space-y-12">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-[30px] md:rounded-[36px] bg-stone-900 border border-white/10 relative overflow-hidden group shadow-2xl">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: step.color }} />
                  <step.icon className="w-8 h-8 md:w-10 md:h-10 relative z-10 text-amber-600 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-end justify-center lg:justify-start space-x-4 md:space-x-6">
                    <span className="text-7xl md:text-8xl font-black text-white/5 uppercase tracking-tighter leading-none select-none">0{i + 1}</span>
                    <div className="text-left">
                      <p className="text-[10px] font-black tracking-[0.4em] text-amber-600 mb-2 uppercase">{step.tag}</p>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">{step.title}</h2>
                    </div>
                  </div>
                  
                  <p className="text-xl md:text-2xl lg:text-2xl text-stone-400 font-black uppercase tracking-tighter leading-none max-w-xl mx-auto lg:mx-0">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex-1 w-full max-w-xl group">
                <div className="relative aspect-square bg-stone-900 rounded-[60px] md:rounded-[100px] border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-700 hover:border-amber-600/30">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-700" style={{ backgroundColor: step.color }} />
                  
                  <motion.div 
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="text-8xl md:text-9xl select-none filter drop-shadow-[0_40px_80px_rgba(217,119,6,0.2)]"
                  >
                    {step.emoji}
                  </motion.div>

                  <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-amber-600/20" />
                  <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-amber-600/20" />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Tech Comparison */}
        <section className="mb-32 md:mb-56">
          <div className="bg-stone-900 rounded-[60px] md:rounded-[120px] p-8 md:p-24 lg:p-32 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] md:text-[10vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none uppercase select-none">
              Science
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
              <div className="space-y-12 md:space-y-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.8] tracking-tighter uppercase">
                  COLD-PRESS <br />
                  <span className="text-amber-600">VS</span> <br />
                  TRADITIONAL
                </h2>
                
                <div className="space-y-6 md:space-y-8">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-8 md:p-10 bg-white/5 backdrop-blur-xl rounded-[40px] md:rounded-[48px] border border-amber-600/20"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <ShieldCheck className="w-6 h-6 text-amber-600" />
                      <h4 className="font-black text-amber-600 uppercase tracking-[0.4em] text-[10px]">Premium Method</h4>
                    </div>
                    <p className="text-xl md:text-2xl text-white font-black uppercase tracking-tighter mb-4">Preserves 100% Minerals.</p>
                    <p className="text-sm md:text-base text-stone-400 font-bold uppercase tracking-tight leading-snug">No heat generated. No oxidation. Living enzymes remain active for full nutritional benefits.</p>
                  </motion.div>

                  <div className="p-8 md:p-10 bg-white/[0.02] rounded-[40px] md:rounded-[48px] border border-white/5 opacity-40">
                    <div className="flex items-center space-x-4 mb-4 text-stone-600">
                      <Zap className="w-6 h-6" />
                      <h4 className="font-black uppercase tracking-[0.4em] text-[10px]">Centrifugal Tech</h4>
                    </div>
                    <p className="text-xl md:text-2xl text-stone-500 font-black uppercase tracking-tighter mb-4">Heat Degradation.</p>
                    <p className="text-sm md:text-base text-stone-600 font-bold uppercase tracking-tight leading-snug">High-speed blades create heat that kills sensitive vitamins and minerals instantly.</p>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square bg-stone-950 rounded-[60px] md:rounded-[100px] border border-white/5 shadow-3xl flex items-center justify-center p-12 md:p-20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-amber-600/10" />
                <div className="text-center relative z-10 space-y-8">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="text-8xl md:text-9xl filter drop-shadow-[0_40px_80px_rgba(217,119,6,0.3)]"
                  >
                    🧬
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">Bio-Availability</h3>
                    <p className="text-stone-400 text-lg md:text-xl font-black uppercase tracking-tight leading-tight">
                      Your body absorbs the nutrients almost immediately due to the raw, unprocessed state.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center">
          <div className="max-w-5xl mx-auto py-24 md:py-40 rounded-[60px] md:rounded-[120px] bg-white text-stone-950 relative overflow-hidden group px-6">
            <div className="absolute inset-0 bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 space-y-12">
              <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.8]">
                TASTE THE <br />
                <span className="text-amber-600">DIFFERENCE.</span>
              </h2>
              <p className="text-lg md:text-2xl text-stone-500 max-w-2xl mx-auto font-black uppercase tracking-tight leading-tight">
                Experience the result of our obsession with extraction quality and farm-fresh purity.
              </p>
              <div className="pt-8">
                <Link 
                  href="/products"
                  className="inline-flex items-center space-x-4 md:space-x-6 px-10 md:px-16 py-6 md:py-8 bg-stone-950 text-white rounded-full text-lg md:text-xl font-black uppercase tracking-[0.4em] hover:bg-amber-600 transition-all duration-500 shadow-2xl active:scale-95 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
