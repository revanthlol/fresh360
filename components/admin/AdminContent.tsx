'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function AdminContent({ children, header }: { children: ReactNode; header: ReactNode }) {
  const isStudio = usePathname()?.startsWith('/admin/studio')

  return (
    <div className={isStudio
      ? 'h-dvh max-h-dvh bg-[#F8FAF8] text-slate-900 flex flex-col font-sans overflow-hidden'
      : 'min-h-dvh lg:h-dvh lg:max-h-dvh bg-[#F8FAF8] text-slate-900 flex flex-col font-sans lg:overflow-hidden'
    }>
      {header}
      <main className={isStudio
      ? 'flex-1 w-full flex flex-col min-h-0 overflow-hidden'
      : 'flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col min-h-0 lg:overflow-hidden'
    }>
        {children}
      </main>
    </div>
  )
}
