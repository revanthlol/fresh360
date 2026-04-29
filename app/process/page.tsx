"use client"

import React from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Shovel, ThermometerSnowflake, FlaskConical, PackageCheck } from 'lucide-react'
import { motion } from 'motion/react'

const steps = [
  {
    title: "Ethical Sourcing",
    desc: "We partner with local organic farms to source only the freshest, chemical-free fruits and vegetables at the peak of their ripeness.",
    icon: Shovel
  },
  {
    title: "Cold Pressed Extraction",
    desc: "Unlike traditional juicing that uses heat-generating blades, our hydraulic press applies tons of pressure to extract juice while keeping vitamins, minerals, and enzymes alive.",
    icon: ThermometerSnowflake
  },
  {
    title: "HPP Safety",
    desc: "We use High Pressure Processing (HPP) to ensure safety without heat. This keeps the juice fresh for longer while preserving the natural taste and nutrition.",
    icon: FlaskConical
  },
  {
    title: "Chilled Delivery",
    desc: "Our products are bottled in a sterile environment and maintained in a strict cold chain at 4°C from our facility to your doorstep.",
    icon: PackageCheck
  }
]

export default function ProcessPage() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="Our Pure Process"
        subtitle="How we maintain the integrity of nature's best ingredients."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                   <motion.div 
                     whileHover={{ scale: 1.02 }}
                     className="aspect-video bg-slate-100 rounded-[2.5rem] flex items-center justify-center relative shadow-lg overflow-hidden"
                   >
                      <step.icon size={80} className="text-brand-green/20" />
                      <div className="absolute top-8 left-8 w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl shadow-xl">
                        0{i + 1}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/40 pointer-events-none" />
                   </motion.div>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900">{step.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-green text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 text-center max-w-3xl relative z-10"
        >
          <h2 className="text-4xl font-display font-bold mb-8">Ready to taste the difference?</h2>
          <p className="text-xl text-white/80 mb-12">
            Experience the freshness that only a cold-pressed process can deliver.
          </p>
          <div className="flex justify-center gap-6">
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white/10 px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm"
             >
                <span className="block text-3xl font-bold">100%</span>
                <span className="text-sm opacity-60">Natural</span>
             </motion.div>
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white/10 px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm"
             >
                <span className="block text-3xl font-bold">0%</span>
                <span className="text-sm opacity-60">Additives</span>
             </motion.div>
          </div>
        </motion.div>

        {/* Abstract animated background elements */}
        <div className="absolute inset-0 z-0 opacity-10">
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, 90, 0]
             }}
             transition={{ duration: 20, repeat: Infinity }}
             className="absolute -top-1/2 -left-1/4 w-full h-full bg-white rounded-full blur-3xl"
           />
        </div>
      </section>
    </div>
  )
}
