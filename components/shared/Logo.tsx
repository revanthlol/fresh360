"use client"

import React, { useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { FRESH360_PATHS } from './logoPaths'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark' | 'auto'
  iconOnly?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  asLink?: boolean
  href?: string
}

export function Logo({
  className,
  variant = 'auto',
  iconOnly = false,
  size = 'md',
  asLink = false,
  href = '/',
}: LogoProps) {
  const gradientId = useId()

  const dimensions = iconOnly
    ? {
        sm: { width: 32, height: 32 },
        md: { width: 40, height: 40 },
        lg: { width: 52, height: 52 },
        xl: { width: 64, height: 64 },
      }[size]
    : {
        sm: { width: 92, height: 34 },
        md: { width: 122, height: 45 },
        lg: { width: 160, height: 58 },
        xl: { width: 210, height: 76 },
      }[size]

  // Color mapping based on variant
  const isDark = variant === 'dark'
  const primaryNavy = isDark ? '#FFFFFF' : '#092236'
  const greenBrand = isDark ? '#34D399' : '#387222'
  const cutoutBg = isDark ? '#122412' : '#FFFFFF'

  // Icon only paths: indices 0 (leaf), 7 (bottom arc), 8 (top arc)
  const pathsToRender = iconOnly
    ? [FRESH360_PATHS[0], FRESH360_PATHS[7], FRESH360_PATHS[8]]
    : FRESH360_PATHS

  const viewBox = iconOnly ? "281 297 512 512" : "280 290 1480 540"

  const content = (
    <div
      className={cn(
        "inline-flex items-center select-none transition-transform duration-200 group-hover:scale-[1.02]",
        className
      )}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="shrink-0 transition-opacity duration-200"
        aria-label="Fresh 360 Degrees Foods"
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="353.765"
            y1="550.588"
            x2="735.02"
            y2="539.437"
          >
            <stop offset="0%" stopColor={isDark ? "#10B981" : "#346E24"} />
            <stop offset="100%" stopColor={isDark ? "#34D399" : "#599625"} />
          </linearGradient>
        </defs>

        {pathsToRender.map((path, idx) => {
          let fill = path.fill
          if (fill === 'url(#Gradient1)') {
            fill = `url(#${gradientId})`
          } else if (fill === 'rgb(9,34,54)') {
            fill = primaryNavy
          } else if (fill === 'rgb(56,114,34)') {
            fill = greenBrand
          } else if (fill === 'rgb(255,255,254)') {
            fill = cutoutBg
          }

          return (
            <path
              key={idx}
              d={path.d}
              fill={fill}
              className="transition-colors duration-300"
            />
          )
        })}
      </svg>
    </div>
  )

  if (asLink) {
    return (
      <Link href={href} className="inline-flex cursor-pointer" aria-label="Fresh 360 Degrees Foods">
        {content}
      </Link>
    )
  }

  return content
}
