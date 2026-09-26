import React from 'react'
import Link from 'next/link'
import { 
  Inbox, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Package, 
  Sparkles, 
  Send, 
  ExternalLink,
  ShieldCheck,
  Info
} from 'lucide-react'
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
  const { enquiries, productCount, brandCount } = await getDashboardData()

  const totalEnquiries = enquiries.length
  const newEnquiries = enquiries.filter((e) => (e.status || 'new') === 'new').length
  const contactedEnquiries = enquiries.filter((e) => e.status === 'contacted' || e.status === 'in-progress').length
  const resolvedEnquiries = enquiries.filter((e) => e.status === 'resolved').length

  const resendKeyPresent = Boolean(process.env.RESEND_API_KEY)

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Operational Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time customer inquiries stored in Sanity CMS & operational catalog overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/studio"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-green hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-brand-green/20 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span>Open Sanity Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Inquiries Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900">
              Customer Inquiries
            </h2> 
            <p className="text-xs text-slate-500">
              Manage incoming contact requests, wholesale distribution queries, and customer messages.
            </p>
          </div>
        </div>

        {/* Live Filterable Table */}
        <InquiriesTable initialEnquiries={enquiries} />
      </div>
    </div>
  )
}
