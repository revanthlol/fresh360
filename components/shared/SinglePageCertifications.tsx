"use client"

import React from 'react'
import { motion } from 'motion/react'
import { ShieldCheck, Award, Leaf, Binary, CheckCircle2 } from 'lucide-react'

export function SinglePageCertifications({ id = 'certifications' }: { id?: string }) {
  const certifications = [
    {
      title: "FSSAI Licensed",
      tag: "Govt of India",
      desc: "Licensed under strict food safety and hygiene protocols for beverage manufacturing.",
      icon: <ShieldCheck className="w-7 h-7 text-brand-green" />
    },
    {
      title: "ISO Standard",
      tag: "QMS Audited",
      desc: "International standard quality management systems applied across bottling and dispatch.",
      icon: <Award className="w-7 h-7 text-brand-teal" />
    },
    {
      title: "Organic Standard",
      tag: "Direct Farm Sourced",
      desc: "Compliant with national standards for organic agricultural produce handling.",
      icon: <Leaf className="w-7 h-7 text-emerald-600" />
    },
    {
      title: "HACCP Safety",
      tag: "Hazard Controlled",
      desc: "Rigorous Hazard Analysis Critical Control Point system ensuring zero contaminants.",
      icon: <Binary className="w-7 h-7 text-brand-orange" />
    }
  ]

  return (
    <section id={id} className="py-24 relative overflow-hidden bg-slate-50/60">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-brand-green text-xs font-bold uppercase tracking-widest">
            <CheckCircle2 size={14} /> Quality & Compliance
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
            Certified Food Safety Standards
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            We operate under stringent statutory and international food safety benchmarks to ensure every sip is uncompromised.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="home-card p-8 rounded-3xl border border-emerald-100/70 hover:shadow-xl transition-all flex flex-col justify-between bg-white"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,248,238,0.9))] flex items-center justify-center mb-6 shadow-sm border border-emerald-100/80">
                  {cert.icon}
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {cert.tag}
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                  {cert.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {cert.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-brand-green">
                <CheckCircle2 size={15} /> Verified & Compliant
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
