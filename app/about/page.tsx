"use client"

import React from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ShieldCheck, Heart, Leaf, Users } from 'lucide-react'
import { motion } from 'motion/react'

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-white">
      <PageHeader 
        title="Our Story"
        subtitle="Born from a passion for health and a commitment to 100% natural refreshment."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <SectionHeader 
              label="Mission"
              title="Freshness in Every Drop"
              centered={false}
            />
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <motion.p variants={itemVariants}>
                Fresh 360 Degrees Foods LLP was founded with a single goal: to provide high-quality, nutritious beverages that don&apos;t compromise on taste. 
              </motion.p>
              <motion.p variants={itemVariants}>
                In a world full of sugary sodas and preservative-laden juices, we wanted to offer something real. Something that comes straight from nature and reaches you in its purest form.
              </motion.p>
              <motion.p variants={itemVariants}>
                Our journey started with a small facility in Bangalore, where we perfected the art of cold-pressing. Today, we offer multiple brands catering to different tastes, but our core philosophy remains the same: <strong>No Added Sugar, No Preservatives.</strong>
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-teal/20 flex items-center justify-center">
               <Leaf size={120} className="text-brand-green/20" />
               <motion.div 
                 animate={{ 
                   y: [0, -20, 0],
                   rotate: [0, 5, 0]
                 }}
                 transition={{ 
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
                 className="absolute inset-0 flex items-center justify-center pointer-events-none"
               >
                 <div className="w-64 h-64 bg-white/30 backdrop-blur-3xl rounded-full blur-3xl" />
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader 
            label="Values"
            title="The Pillars of Fresh 360"
          />
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: ShieldCheck, title: "Quality Control", desc: "Every batch is tested in our certified labs." },
              { icon: Heart, title: "Healthy First", desc: "No harmful additives, ever. We care for your health." },
              { icon: Leaf, title: "Sustainability", desc: "Sourcing responsibly from local organic farms." },
              { icon: Users, title: "Transparency", desc: "What you see on the label is exactly what you get." }
            ].map((v, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl space-y-4 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-brand-green-light rounded-2xl flex items-center justify-center text-brand-green">
                  <v.icon size={24} />
                </div>
                <h3 className="font-display font-bold text-xl">{v.title}</h3>
                <p className="text-slate-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
