"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark' | 'auto'
  iconOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({
  className,
  variant = 'auto',
  iconOnly = false,
  size = 'md',
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  }

  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 48,
  }

  const currentIconSize = iconSizes[size]

  return (
    <div className={cn("inline-flex items-center gap-3 select-none", className)}>
      {/* 360° Circular Emblem / Icon */}
      <svg
        width={currentIconSize}
        height={currentIconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:rotate-12"
      >
        <defs>
          <linearGradient id="fresh360-grad-green" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="fresh360-grad-leaf" x1="16" y1="12" x2="32" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 360 Circular Orbit Arc */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="url(#fresh360-grad-green)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray="100 25"
          className="transition-all duration-700"
        />

        {/* Outer orbital pulse dots */}
        <circle cx="24" cy="4" r="2.4" fill="#10B981" />
        <circle cx="44" cy="24" r="2.4" fill="#34D399" />
        <circle cx="24" cy="44" r="2" fill="#059669" />

        {/* Pure Droplet / Leaf Motif in Center */}
        <path
          d="M24 10C24 10 15 21 15 27.5C15 32.47 19.03 36.5 24 36.5C28.97 36.5 33 32.47 33 27.5C33 21 24 10 24 10Z"
          fill="url(#fresh360-grad-leaf)"
          opacity="0.95"
        />

        {/* Inner Leaf Vein Line */}
        <path
          d="M24 16V33M24 23L28 20M24 27L20 24"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>

      {/* Typography Block */}
      {!iconOnly && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center tracking-tight">
            <span
              className={cn(
                "font-display font-black text-2xl sm:text-3xl tracking-tight transition-colors",
                variant === 'dark'
                  ? "text-white"
                  : variant === 'light'
                  ? "text-slate-900"
                  : "text-slate-900 dark:text-white"
              )}
            >
              FRESH<span className="text-brand-green font-extrabold">360°</span>
            </span>
          </div>
          <span
            className={cn(
              "text-[9px] sm:text-[10px] font-black tracking-[0.28em] uppercase transition-colors mt-0.5",
              variant === 'dark'
                ? "text-emerald-400/80"
                : "text-slate-500"
            )}
          >
            Degrees Foods
          </span>
        </div>
      )}
    </div>
  )
}
