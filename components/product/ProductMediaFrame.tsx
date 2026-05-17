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
}

export function ProductMediaFrame({
  image,
  alt,
  className,
  imageClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  videoSrc,
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
          className={cn('object-cover transition-transform duration-500 group-hover:scale-[1.03]', imageClassName)}
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center text-5xl opacity-20">
          🥤
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_60%,rgba(45,106,45,0.05)_100%)]" />
    </div>
  )
}
