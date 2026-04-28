'use client'

import { motion, useScroll, useTransform, Variants } from 'motion/react'
import { useRef } from 'react'
import { Mail, Phone, MapPin, MessageSquare, Clock, Zap, Sparkles } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const contactInfo = [
    { 
      icon: Phone, 
      label: 'Direct Line', 
      value: '+91 91103 28633', 
      sub: 'Mon - Sat: 9:00 AM - 6:00 PM',
      color: 'amber-600'
    },
    { 
      icon: Mail, 
      label: 'Digital Mail', 
      value: 'hello@fresh360.in', 
      sub: 'We respond within 24 hours',
      color: 'amber-600'
    },
    { 
      icon: MapPin, 
      label: 'Headquarters', 
      value: 'Hyderabad, India', 
      sub: 'Banjara Hills, Telangana 500034',
      color: 'amber-600'
    }
  ]

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
        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 lg:gap-40 items-start"
        >
          {/* Left Column: Context & Info */}
          <div className="space-y-12 md:space-y-20">
            <div className="space-y-8 md:space-y-12">
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-white/5 text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] border border-white/5 shadow-2xl backdrop-blur-xl">
                <Sparkles className="w-4 h-4" />
                <span>Conscious Connection</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.85] tracking-tighter uppercase text-white break-words"
              >
                LET&apos;S <br />
                <span className="text-amber-600">CONNECT.</span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-base md:text-xl lg:text-2xl text-stone-400 font-medium leading-relaxed max-w-xl"
              >
                Whether it&apos;s a bulk order, partnership, or a simple question, we&apos;re here to refresh your perspective on quality.
              </motion.p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {contactInfo.map((info, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="group flex items-start space-x-6 md:space-x-8 p-6 md:p-8 rounded-[40px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-600/20 transition-all duration-700"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] bg-stone-900 border border-white/10 flex items-center justify-center shadow-2xl group-hover:bg-amber-600 group-hover:text-stone-950 transition-all duration-500 shrink-0">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">{info.label}</h4>
                    <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-amber-600 transition-colors">{info.value}</p>
                    <p className="text-[10px] md:text-xs font-black text-stone-500 uppercase tracking-widest pt-1">{info.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Connect */}
            <motion.div variants={itemVariants} className="pt-10 md:pt-16 border-t border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-500 mb-8">Digital Presence</h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'SPARKLES', icon: Sparkles },
                  { name: 'ZAP', icon: Zap },
                  { name: 'MESSAGE', icon: MessageSquare }
                ].map((social) => (
                  <button 
                    key={social.name}
                    className="group flex items-center space-x-3 px-6 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-stone-950 transition-all duration-500"
                  >
                    <social.icon className="w-4 h-4" />
                    <span>{social.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            variants={itemVariants}
            className="lg:sticky lg:top-40 w-full"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber-600/5 rounded-[60px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative bg-stone-900/50 backdrop-blur-3xl p-6 sm:p-8 md:p-12 lg:p-16 rounded-[40px] sm:rounded-[60px] border border-white/10 shadow-3xl">
                <div className="mb-10 flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">Inquiry Form</h3>
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 md:mt-60"
        >
          <div className="bg-stone-900 rounded-[60px] md:rounded-[120px] p-8 md:p-24 lg:p-32 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] md:text-[12vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none uppercase select-none z-0">
               Answers
            </div>

            <div className="relative z-10">
              <div className="text-center mb-24 md:mb-32">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.8]">
                  COMMON <br /> <span className="text-amber-600">QUESTIONS</span>
                </h2>
                <div className="w-20 h-1 bg-amber-600 mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { q: "SERVICE AREA?", a: "Delivering across Hyderabad and Secunderabad. Bulk shipping available for TS & AP.", icon: MapPin },
                  { q: "SHELF LIFE?", a: "3-5 days for Juicera (Cold Pressed) and 12-18 months for Fuzzy & Refrizz.", icon: Clock },
                  { q: "CUSTOMIZATION?", a: "Bespoke labeling and unique profiles for corporate events and luxury weddings.", icon: Sparkles }
                ].map((faq, i) => (
                  <div key={i} className="group p-10 md:p-12 rounded-[50px] md:rounded-[60px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-600/20 transition-all duration-700 flex flex-col justify-between min-h-[350px] md:min-h-[400px]">
                    <div className="w-16 h-16 rounded-[24px] bg-stone-950 flex items-center justify-center mb-10 border border-white/5 shadow-2xl group-hover:bg-amber-600 group-hover:text-stone-950 transition-all duration-500">
                      <faq.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tighter leading-tight group-hover:text-amber-600 transition-colors">{faq.q}</h4>
                      <p className="text-stone-400 text-base md:text-lg font-black uppercase tracking-tight leading-snug group-hover:text-stone-200 transition-colors">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
