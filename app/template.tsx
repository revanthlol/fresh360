"use client"

import React from 'react'
import { motion } from 'motion/react'

// Next.js App Router template — wraps each page in a subtle fade-in.
// The global PageTransition bar (in layout.tsx) handles route-change indication.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
