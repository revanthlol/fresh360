"use client"

import React from 'react'
import { motion } from 'motion/react'
import { Sparkles, ShieldCheck, Heart, Leaf, Award } from 'lucide-react'

export function SinglePageStory({ id = 'about' }: { id?: string }) {
  const pillars = [
    {
      icon: <Leaf className="w-6 h-6 text-brand-green" />,
      title: "100% Honest Fruit",
      desc: "No Added Sugar, zero artificial syrups, and no synthetic concentrates. Just farm-fresh fruit."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-teal" />,
      title: "Cold-Pressed Integrity",
      desc: "Hydraulic cold-pressing retains essential living enzymes, vitamins, and natural crisp flavors."
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Rooted in Hyderabad",
      desc: "Started with a question: Why should everyday drinks be loaded with chemicals? We brought real back."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-orange" />,
      title: "Clean Craftsmanship",
      desc: "Strict cleanroom processing, certified standards, and complete hygiene from farm to bottle."
    }
  ]

  return (
    <section id={id} className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-brand-green text-xs font-bold uppercase tracking-widest">
              <Sparkles size={13} /> Our Story & Mission
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
              Pure Refreshment, <span className="text-brand-green italic font-accent">Crafted Without Compromise.</span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed font-sans">
              Fresh 360 Degrees Foods LLP began not as a corporate venture, but as a simple question: 
              <span className="font-semibold text-slate-800"> Why has something as essential as a drink become so loaded with artificial shortcuts?</span>
            </p>

            <p className="text-slate-600 leading-relaxed">
              We set out from Hyderabad with a clear purpose: restore real taste. By uniting direct agricultural sourcing with state-of-the-art cold-press and sterile carbonation technologies, we craft pure cold-pressed juices, functional elixirs, and nostalgic sodas that let nature speak for itself.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <span className="block text-3xl font-display font-black text-slate-900">0%</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Chemical Preservatives</span>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <span className="block text-3xl font-display font-black text-brand-green">100%</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Whole Fruit Goodness</span>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <span className="block text-3xl font-display font-black text-slate-900">360°</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Quality Lifecycle</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="home-card p-6 rounded-3xl border border-emerald-100/70 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm border border-emerald-100/80">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
