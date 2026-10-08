"use client"

import React from 'react'
import { ScrollReveal } from './ScrollReveal'
import { ShieldCheck, Heart, Leaf, Award } from 'lucide-react'

export function SinglePageStory({ id = 'about' }: { id?: string }) {
  const pillars = [
    {
      icon: <Leaf className="w-6 h-6 text-brand-green" />,
      title: "Three distinct brands",
      desc: "Juicera, Fruizy and Fizzo bring different drink styles together under Fresh 360."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-teal" />,
      title: "Different drink styles",
      desc: "The range spans cold-pressed juice, sparkling fruit drinks and fizzy flavours."
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Rooted in Hyderabad",
      desc: "Fresh 360 Degrees Foods is based in Hyderabad, India."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-orange" />,
      title: "Made for choice",
      desc: "Explore the collection and find the brand and flavour that suits you."
    }
  ]

  return (
    <section id={id} className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h2 data-presentation-step className="text-3xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
              A drink range built around <span className="text-brand-green italic font-accent">choice.</span>
            </h2>

            <p data-presentation-step className="text-lg text-slate-600 leading-relaxed font-sans">
              Fresh 360 Degrees Foods brings three beverage brands together under one parent company.
            </p>

            <p data-presentation-step className="text-slate-600 leading-relaxed">
              Fresh 360 is the parent brand for Juicera, Fruizy and Fizzo. Together, the range includes cold-pressed juice, sparkling fruit drinks and artificially flavoured fizzy beverages.
            </p>

          </div>

          {/* 4 Pillars Grid */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-5" data-presentation-step>
            {pillars.map((pillar, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.05}
                className="home-card p-6 rounded-3xl border border-emerald-100/70 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm border border-emerald-100/80">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
