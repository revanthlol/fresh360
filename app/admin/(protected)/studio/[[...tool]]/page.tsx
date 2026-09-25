'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function AdminStudioPage() {
  return (
    <div className="w-full h-[calc(100vh-7.5rem)] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
      <NextStudio config={config} />
    </div>
  )
}
