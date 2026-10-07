'use client'

import { Studio } from 'sanity'
import config from '../../../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function AdminStudioPage() {
  return (
    <div className="w-full min-h-0 flex-1 overflow-hidden bg-white">
      {/* NextStudio adds a 100vh wrapper, which clips the footer in this admin shell. */}
      <Studio config={config} />
    </div>
  )
}
