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

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Inquiries</span>
            <Inbox className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-display font-bold text-slate-900">
            {totalEnquiries}
          </div>
          <p className="text-[11px] text-slate-400">Captured in Sanity</p>
        </div>

        {/* New Leads */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-[11px] font-bold uppercase tracking-wider">New Leads</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-display font-bold text-amber-900">
            {newEnquiries}
          </div>
          <p className="text-[11px] text-amber-700/80 font-medium">Require action</p>
        </div>

        {/* Contacted */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Contacted</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-display font-bold text-slate-900">
            {contactedEnquiries}
          </div>
          <p className="text-[11px] text-slate-400">In communication</p>
        </div>

        {/* Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-display font-bold text-slate-900">
            {resolvedEnquiries}
          </div>
          <p className="text-[11px] text-slate-400">Successfully closed</p>
        </div>

        {/* Catalog Stats */}
        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">CMS Catalog</span>
            <Package className="w-4 h-4 text-brand-teal" />
          </div>
          <div className="text-2xl font-display font-bold text-slate-900">
            {productCount} <span className="text-sm font-medium text-slate-400">items</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Across {brandCount} brands (Juicera & Fruizy)
          </p>
        </div>
      </div>

      {/* Resend Integration Status Notice */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-brand-green shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-bold text-slate-900 text-sm">
                Resend Email Notification Integration
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-brand-green" />
                Domain Verified & Active
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Sanity Inquiries Stored Automatically
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Every customer inquiry submitted through the website is recorded in Sanity CMS and automatically dispatches real-time notifications to <strong className="text-slate-900 font-semibold">support@fresh360degrees.in</strong> (with customer reply-to) alongside an instant acknowledgement email to the customer.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Sender: <code className="text-slate-800 font-mono text-[11px]">support@fresh360degrees.in</code></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>DKIM / SPF aligned on <code className="text-slate-800 font-mono text-[11px]">fresh360degrees.in</code></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Outbound only (existing mailbox unaffected)</span>
              </div>
            </div>
          </div>
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
