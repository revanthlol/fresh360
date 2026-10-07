"use client"

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { urlFor, type SanityImageAsset } from '@/lib/sanity'

interface ProductMediaFrameProps {
  image?: SanityImageAsset | null
  alt: string
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
  videoSrc?: string
  brandName?: string
  accentColor?: string
}

export function ProductMediaFrame({
  image,
  alt,
  className,
  imageClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  videoSrc,
  brandName,
  accentColor,
}: ProductMediaFrameProps) {
  return (
    <div className={cn('relative aspect-[2/3] overflow-hidden rounded-[2rem] home-media', className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_34%),linear-gradient(180deg,rgba(45,106,45,0.03),rgba(15,118,110,0.05))]" />

      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={image ? urlFor(image).width(24).blur(30).url() : undefined}
        >
          <source src={videoSrc} />
        </video>
      ) : image ? (
        <Image
          src={urlFor(image).width(1600).quality(92).auto('format').url()}
          alt={alt}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={urlFor(image).width(24).blur(60).url()}
          className={cn('object-cover transition-transform duration-200', imageClassName)}
          priority={priority}
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col justify-between bg-[#fffaf2] p-6 sm:p-8"
          style={accentColor ? { backgroundImage: `linear-gradient(145deg, ${accentColor}1f, #fffaf2 78%)` } : undefined}
        >
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.16em]" style={accentColor ? { color: accentColor } : undefined}>{brandName || 'Fresh 360'}</span>
          <div>
            <p className="max-w-[8ch] font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl">{alt}</p>
            <p className="mt-4 border-t border-slate-900/10 pt-3 text-xs font-medium text-slate-500">Product photo coming soon</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_60%,rgba(45,106,45,0.05)_100%)]" />
    </div>
  )
}
