'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { 
  Search, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  ExternalLink,
  ChevronDown,
  User,
  Tag,
  Calendar,
  FileText,
  Save,
  Check,
  Loader2
} from 'lucide-react'
import { 
  updateInquiryStatusAction, 
  updateInquiryNotesAction, 
  deleteInquiryAction 
} from '@/app/admin/actions'
import { cn } from '@/lib/utils'

export interface EnquiryDoc {
  _id: string
  _type?: string
  fullName?: string
  name?: string
  email?: string
  phone?: string
  brandInterest?: string
  inquiryType?: string
  subject?: string
  message?: string
  status?: 'new' | 'contacted' | 'resolved' | string
  submittedAt?: string
  createdAt?: string
  internalNotes?: string
}

interface InquiriesTableProps {
  initialEnquiries: EnquiryDoc[]
}

export function InquiriesTable({ initialEnquiries }: InquiriesTableProps) {
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all')
  const [search, setSearch] = useState('')
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryDoc | null>(null)
  const [notesDraft, setNotesDraft] = useState('')
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [notesSaveSuccess, setNotesSaveSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Keep notesDraft in sync when an inquiry is opened
  useEffect(() => {
    if (selectedEnquiry) {
      setNotesDraft(selectedEnquiry.internalNotes || '')
      setNotesSaveSuccess(false)
    }
  }, [selectedEnquiry])

  const countNew = initialEnquiries.filter((e) => (e.status || 'new') === 'new').length
  const countContacted = initialEnquiries.filter((e) => e.status === 'contacted' || e.status === 'in-progress').length
  const countResolved = initialEnquiries.filter((e) => e.status === 'resolved').length

  const filteredEnquiries = initialEnquiries.filter((item) => {
    const rawStatus = item.status || 'new'
    const normalizedStatus = rawStatus === 'in-progress' ? 'contacted' : rawStatus

    const matchesFilter = filter === 'all' ? true : normalizedStatus === filter
    if (!matchesFilter) return false

    if (!search.trim()) return true
    const q = search.toLowerCase()
    const name = (item.fullName || item.name || '').toLowerCase()
    const email = (item.email || '').toLowerCase()
    const phone = (item.phone || '').toLowerCase()
    const subject = (item.inquiryType || item.subject || '').toLowerCase()
    const brand = (item.brandInterest || '').toLowerCase()
    const message = (item.message || '').toLowerCase()
    const notes = (item.internalNotes || '').toLowerCase()

    return (
      name.includes(q) ||
      email.includes(q) ||
      phone.includes(q) ||
      subject.includes(q) ||
      brand.includes(q) ||
      message.includes(q) ||
      notes.includes(q)
    )
  })

  const handleStatusChange = (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    setUpdatingId(id)
    startTransition(async () => {
      try {
        await updateInquiryStatusAction(id, newStatus)
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
        }
      } catch (err) {
        console.error('Failed to update inquiry status:', err)
      } finally {
        setUpdatingId(null)
      }
    })
  }

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return
    setIsSavingNotes(true)
    try {
      await updateInquiryNotesAction(selectedEnquiry._id, notesDraft)
      setSelectedEnquiry((prev) => (prev ? { ...prev, internalNotes: notesDraft } : null))
      setNotesSaveSuccess(true)
      setTimeout(() => setNotesSaveSuccess(false), 2500)
    } catch (err) {
      console.error('Failed to save notes:', err)
    } finally {
      setIsSavingNotes(false)
    }
  }

  const handleDelete = (id: string, name?: string) => {
    if (!confirm(`Are you sure you want to delete the inquiry from "${name || 'Customer'}"?`)) {
      return
    }
    setUpdatingId(id)
    startTransition(async () => {
      try {
        await deleteInquiryAction(id)
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry(null)
        }
      } catch (err) {
        console.error('Failed to delete inquiry:', err)
      } finally {
        setUpdatingId(null)
      }
    })
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Recent'
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { key: 'all', label: 'All Inquiries', count: initialEnquiries.length },
              {
                key: 'new',
                label: 'New',
                count: countNew,
                color: 'text-amber-700 bg-amber-50 border-amber-200',
              },
              {
                key: 'contacted',
                label: 'Contacted',
                count: countContacted,
                color: 'text-blue-700 bg-blue-50 border-blue-200',
              },
              {
                key: 'resolved',
                label: 'Resolved',
                count: countResolved,
                color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
              },
            ] as const
          ).map((tab) => {
            const isActive = filter === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer shrink-0",
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries or notes..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        {filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <h3 className="text-sm font-bold text-slate-700">No Inquiries Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {search
                ? `No inquiries match your search "${search}".`
                : 'No inquiries have been recorded under this category yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Brand & Type</th>
                  <th className="py-3 px-4">Message Preview</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((enquiry) => {
                  const rawStatus = enquiry.status || 'new'
                  const status = rawStatus === 'in-progress' ? 'contacted' : rawStatus
                  const isUpdating = updatingId === enquiry._id && isPending
                  const customerName = enquiry.fullName || enquiry.name || 'Anonymous Customer'
                  const inquirySubject = enquiry.inquiryType || enquiry.subject || 'General Inquiry'
                  const dateStr = enquiry.submittedAt || enquiry.createdAt
                  const hasNotes = Boolean(enquiry.internalNotes && enquiry.internalNotes.trim().length > 0)

                  return (
                    <tr
                      key={enquiry._id}
                      className={cn(
                        "hover:bg-slate-50/70 transition-colors group cursor-pointer",
                        status === 'new' && "bg-amber-50/20"
                      )}
                      onClick={() => setSelectedEnquiry(enquiry)}
                    >
                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                          <span>{customerName}</span>
                          {hasNotes && (
                            <span 
                              title="Internal notes attached"
                              className="inline-flex items-center p-0.5 rounded text-brand-green bg-emerald-50"
                            >
                              <FileText className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-slate-500 text-[11px]">
                          {enquiry.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {enquiry.email}
                            </span>
                          )}
                          {enquiry.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {enquiry.phone}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Brand Interest & Inquiry Type */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                          <Tag className="w-2.5 h-2.5" />
                          <span>{enquiry.brandInterest || 'General'}</span>
                        </div>
                        <div className="text-slate-800 font-semibold line-clamp-1">
                          {inquirySubject}
                        </div>
                      </td>

                      {/* Message Preview */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-slate-600 line-clamp-2 leading-relaxed">
                          {enquiry.message || '—'}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                        {formatDate(dateStr)}
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="relative inline-block">
                          <select
                            disabled={isUpdating}
                            value={status}
                            onChange={(e) =>
                              handleStatusChange(
                                enquiry._id,
                                e.target.value as 'new' | 'contacted' | 'resolved'
                              )
                            }
                            className={cn(
                              "appearance-none pl-2.5 pr-6 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer disabled:opacity-50",
                              status === 'new' &&
                                "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100",
                              status === 'contacted' &&
                                "bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100",
                              status === 'resolved' &&
                                "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                            )}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedEnquiry(enquiry)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="View Full Inquiry & Notes"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(enquiry._id, customerName)}
                            disabled={isUpdating}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail & Operational Notes Modal Dialog */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <span>{selectedEnquiry.brandInterest || 'General Inquiry'}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  {selectedEnquiry.inquiryType || selectedEnquiry.subject || 'Website Inquiry'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {formatDate(selectedEnquiry.submittedAt || selectedEnquiry.createdAt)}
                </p>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <User className="w-4 h-4 text-brand-green" />
                <span>{selectedEnquiry.fullName || selectedEnquiry.name || 'Anonymous Customer'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                {selectedEnquiry.email && (
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="flex items-center gap-2 text-brand-green hover:underline font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedEnquiry.email}</span>
                  </a>
                )}
                {selectedEnquiry.phone && (
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex items-center gap-2 text-slate-700 hover:text-brand-green font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedEnquiry.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Full Message */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Submitted Message
              </label>
              <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedEnquiry.message || 'No message content provided.'}
              </div>
            </div>

            {/* Operational Internal Notes */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-green" />
                  <span>Internal Operational Notes (Staff Only)</span>
                </label>
                {notesSaveSuccess && (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in duration-200">
                    <Check className="w-3 h-3" />
                    Saved to Sanity
                  </span>
                )}
              </div>
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                rows={3}
                placeholder="Log phone calls, follow-up status, sample dispatch notes, or internal updates..."
                className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSavingNotes ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : notesSaveSuccess ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3 h-3" />
                      <span>Save Notes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Status Bar & Reply */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                {(['new', 'contacted', 'resolved'] as const).map((s) => {
                  const currentStatus = selectedEnquiry.status === 'in-progress' ? 'contacted' : (selectedEnquiry.status || 'new')
                  const isCurrent = currentStatus === s
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedEnquiry._id, s)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer capitalize",
                        isCurrent
                          ? s === 'new'
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : s === 'contacted'
                            ? "bg-blue-100 text-blue-900 border-blue-300"
                            : "bg-emerald-100 text-emerald-900 border-emerald-300"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>

              {selectedEnquiry.email && (
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(selectedEnquiry.inquiryType || selectedEnquiry.subject || 'Your Fresh 360 Inquiry')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-green text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
