"use client"

import React from 'react'
import Image from 'next/image'
import { PageHeader } from '@/components/shared/PageHeader'
import { ShieldCheck, Heart, Leaf, Users, Quote } from 'lucide-react'
import { motion, type Variants } from 'motion/react'

export default function AboutPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    }
  }

  return (
    <div className="bg-[#FCFCFC] overflow-hidden">
      <PageHeader 
        title="Our Story"
        subtitle="Freshness. From every angle."
      />

      {/* The Hook Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block py-1 px-4 bg-brand-green/10 text-brand-green rounded-full text-sm font-bold tracking-wider uppercase">
                The Origin
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 leading-[1.1]">
                Fresh 360 Degrees Foods LLP didn’t begin as a business idea — <span className="text-brand-green italic font-accent">it began as a question.</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid gap-6 md:grid-cols-2 text-left"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <Quote className="text-brand-green/20 mb-4" size={40} />
                <p className="text-xl md:text-2xl font-medium text-slate-700 leading-snug">
                  Why has something as simple as a drink become so complicated?
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <Quote className="text-brand-green/20 mb-4" size={40} />
                <p className="text-xl md:text-2xl font-medium text-slate-700 leading-snug">
                  Why does &ldquo;refreshment&rdquo; today come loaded with artificial ingredients and compromises?
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story & Image Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-8"
          >
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-sans">
              <motion.p variants={itemVariants}>
                We grew up with the taste of real — fresh juices, simple flavours, and drinks that felt honest. Somewhere along the way, that authenticity was replaced by convenience and mass production.
              </motion.p>
              <motion.p variants={itemVariants} className="font-semibold text-slate-900 text-xl">
                We wanted to bring that back.
              </motion.p>
              <motion.p variants={itemVariants}>
                Our journey started in Hyderabad, not with scale, but with intent — to understand how to preserve the natural taste of fruits, how to keep freshness intact, and how to create beverages that people can trust without second-guessing what goes inside.
              </motion.p>
              
              <div className="pt-8 space-y-4">
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="mt-1 bg-brand-green/10 p-1 rounded-full"><ShieldCheck className="text-brand-green" size={20} /></div>
                  <p><span className="font-bold text-slate-900">Freshness should not be engineered</span> — it should be preserved.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="mt-1 bg-brand-green/10 p-1 rounded-full"><Leaf className="text-brand-green" size={20} /></div>
                  <p><span className="font-bold text-slate-900">Taste should come from ingredients</span> — not additives.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="mt-1 bg-brand-green/10 p-1 rounded-full"><Heart className="text-brand-green" size={20} /></div>
                  <p><span className="font-bold text-slate-900">A beverage should feel as good</span> as it tastes.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image 
                src="/fresh360-about.png"
                alt="Fresh 360 - Authenticity and Purity"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-accent text-2xl italic">Authenticity in every sip.</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-teal/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* The Standard Section */}
      <section className="py-32 bg-[#0A1F0A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(45,106,45,0.6),transparent_70%)]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                Today, Fresh 360 Degrees Foods is <span className="text-brand-teal-light">more than just a range of products.</span>
              </h2>
              <p className="text-xl text-white/80 font-sans leading-relaxed">
                It is our effort to build a new standard for everyday beverages — one that is transparent, thoughtful, and genuinely refreshing.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-12 rounded-[3rem] text-center space-y-8 shadow-2xl shadow-black/20"
            >
              <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                From cold-pressed juices to natural soda blends and fruit-based innovations, we are reimagining what modern beverages can be — <span className="font-accent italic text-brand-teal-light">without losing the simplicity they started with.</span>
              </p>
              <div className="h-px w-24 bg-brand-teal-light/50 mx-auto" />
              <p className="text-lg text-white/60">
                Because for us, it&apos;s not just about what you drink. It&apos;s about how it&apos;s made, why it&apos;s made, and how it makes you feel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Re-using Values but with fresh styling */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-display font-bold text-slate-900">The Pillars of Fresh 360</h2>
            <p className="text-slate-500">Grounded in values that prioritize your well-being and the planet.</p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: ShieldCheck, title: "Quality Control", desc: "Every batch is tested in our certified labs to ensure the highest safety standards." },
              { icon: Heart, title: "Healthy First", desc: "No harmful additives, ever. We believe nature provides everything we need." },
              { icon: Leaf, title: "Sustainability", desc: "Sourcing responsibly from local organic farms to support our communities." },
              { icon: Users, title: "Transparency", desc: "Honest labels and clear processes. You deserve to know what you consume." }
            ].map((v, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-[#F8FAF8] p-8 rounded-[2rem] space-y-4 border border-slate-50 hover:border-brand-green/20 hover:shadow-xl hover:shadow-brand-green/5 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm">
                  <v.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Final Tagline */}
      <section className="py-24 border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tighter"
          >
            Freshness. <span className="text-brand-green">From every angle.</span>
          </motion.h2>
        </div>
      </section>
    </div>
  )
}
