"use client"

import React from 'react'
import Link from 'next/link'
import { Play, ArrowRight, ShieldCheck, Microscope, ThermometerSnowflake } from 'lucide-react'
import { motion } from 'motion/react'

export function ProcessTeaser() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video bg-slate-100 rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-2xl">
               <div className="absolute inset-0 bg-brand-green/20 group-hover:bg-brand-green/10 transition-colors z-10" />
               <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-brand-green shadow-xl transition-transform group-hover:scale-110">
                    <Play size={32} fill="currentColor" />
                  </div>
               </div>
               <div className="absolute bottom-6 left-6 z-20 text-white font-bold text-lg">
                  Watch Our Process
               </div>
            </div>
            
            {/* Decorative blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-green/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-teal/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-brand-green font-bold uppercase tracking-widest text-xs">Quality First</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
                From Farm to Bottle, <br /> 
                The Healthy Way.
              </h2>
              <p className="text-slate-500 text-lg">
                We take our process seriously. From sourcing the finest organic produce to high-pressure processing that keeps nutrients intact.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: 'Safe & Clean', desc: 'ISO certified facility' },
                { icon: ThermometerSnowflake, title: 'Cold Chain', desc: 'Maintained at 4°C' },
                { icon: Microscope, title: 'Lab Tested', desc: 'Zero contamination' },
                { icon: ArrowRight, title: 'Pure Yield', desc: 'Maximized nutrition' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-brand-green-light rounded-xl flex items-center justify-center text-brand-green shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/process"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all group"
            >
              Learn More About Our Process
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
