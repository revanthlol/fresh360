import React from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { sanityWriteClient } from '@/lib/sanity'
import { InquiriesTable, EnquiryDoc } from '@/components/admin/InquiriesTable'

export const dynamic = 'force-dynamic'

async function getDashboardData() {
  if (!sanityWriteClient) {
    return {
      enquiries: [] as EnquiryDoc[],
      productCount: 0,
      brandCount: 0,
    }
  }

  try {
    const [enquiries, productCount, brandCount] = await Promise.all([
      sanityWriteClient.fetch<EnquiryDoc[]>(`*[_type in ["inquiry", "enquiry"]] | order(coalesce(submittedAt, createdAt) desc)`),
      sanityWriteClient.fetch<number>(`count(*[_type == "product"])`),
      sanityWriteClient.fetch<number>(`count(*[_type == "brand"])`),
    ])

    return {
      enquiries: enquiries || [],
      productCount: productCount || 0,
      brandCount: brandCount || 0,
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data from Sanity:', error)
    return {
      enquiries: [] as EnquiryDoc[],
      productCount: 0,
      brandCount: 0,
    }
  }
}

export default async function AdminDashboardPage() {
  const { enquiries } = await getDashboardData()

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs shrink-0">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
            Operational Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time customer inquiries stored in Sanity CMS & operational catalog overview.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/studio"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span>Open Sanity Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Inquiries Section */}
      <div className="flex-1 min-h-0 flex flex-col gap-3">
        <div className="shrink-0">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Customer Inquiries
          </h2> 
          <p className="text-xs text-slate-500">
            Manage incoming contact requests, wholesale distribution queries, and customer messages.
          </p>
        </div>

        {/* Live Filterable Table */}
        <InquiriesTable initialEnquiries={enquiries} />
      </div>
    </div>
  )
}
