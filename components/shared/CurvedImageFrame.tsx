"use client"

import React from 'react'
import Image from 'next/image'
import { motion, MotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

interface CurvedImageFrameProps extends MotionProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  // Default to a smaller curve than the previous 3rem
  rounded?: string 
}

/**
 * A reusable component that frames an image with curved corners.
 * Designed to fit the image "edge to edge" within the frame with premium depth effects.
 */
export function CurvedImageFrame({
  src,
  alt,
  className,
  priority = false,
  rounded = "rounded-[2.5rem]",
  ...motionProps
}: CurvedImageFrameProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] group",
        rounded,
        className
      )}
      {...motionProps}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Subtle inner ring for depth and edge definition */}
      <div className={cn("absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5", rounded)} />
      
      {/* Ambient Depth Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Glass-like shimmer effect on hover/interact (subtle) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  )
}
