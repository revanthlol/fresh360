'use client'

import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'motion/react'

export function SiteProgress() {
  const pathname = usePathname()
  const { scrollYProgress } = useScroll()
  const transform = useTransform(scrollYProgress, (value) => `scaleX(${value})`)
  if (pathname.startsWith('/admin') || pathname.startsWith('/studio')) return null
  return <div className="site-progress" aria-hidden="true"><motion.div style={{ transform }} /></div>
}
