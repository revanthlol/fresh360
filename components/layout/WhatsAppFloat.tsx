'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 2 
      }}
      className="fixed bottom-6 right-6 z-[9999] flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            className="mr-4 px-6 py-3 bg-stone-900/90 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-3xl border border-white/10 backdrop-blur-2xl pointer-events-none"
          >
            Order on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <Link
        href="https://wa.me/919110328633?text=Hi%2C%20I%27m%20interested%20in%20Fresh%20360%20products"
        target="_blank"
        aria-label="Chat with us on WhatsApp"
        className="relative group"
      >
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(37,211,102,0.3)] relative z-10 overflow-hidden"
        >
          <motion.div 
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3 
            }}
          >
            <MessageCircle className="w-8 h-8 fill-white" />
          </motion.div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.div>

        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping" />
      </Link>
    </motion.div>
  )
}
