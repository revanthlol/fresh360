"use client"

import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function WhatsAppFloat() {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio') || pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <a
      href="https://wa.me/919705522020"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl press-feedback flex items-center justify-center group"
      title="Chat with us on WhatsApp"
      aria-label="Chat with Fresh 360 on WhatsApp"
    >
      <Image src="/whatsapp.svg" alt="" width={31} height={31} aria-hidden="true" />
      <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        How can we help?
      </span>
    </a>
  )
}
