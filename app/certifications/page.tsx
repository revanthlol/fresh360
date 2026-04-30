import React from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { FileText, Download, ShieldCheck, Award, Leaf, Binary } from 'lucide-react'
import Link from 'next/link'

export default function CertificationsPage() {
  const certifications = [
    {
      title: "ISO Certification",
      description: "International standard for quality management systems (QMS).",
      icon: <Award className="w-8 h-8 text-brand-teal" />
    },
    {
      title: "Organic Standard",
      description: "Compliant with national standards for organic production.",
      icon: <Leaf className="w-8 h-8 text-brand-green" />
    },
    {
      title: "HACCP Certified",
      description: "Hazard Analysis Critical Control Point system for food safety.",
      icon: <Binary className="w-8 h-8 text-brand-orange" />
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="Certifications & Food Safety"
        subtitle="We adhere to strict safety and quality standards to ensure every product you receive is fresh, clean, and compliant."
      />

      <div className="container mx-auto px-6 max-w-7xl pb-24">
        {/* Primary FSSAI Card */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-brand-green shadow-sm shrink-0">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-6 flex-grow">
                <div>
                  <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">FSSAI License</h2>
                  <p className="text-slate-500 leading-relaxed text-lg">
                    Licensed under FSSAI regulations for safe food manufacturing and distribution. This certification guarantees that our facilities and processes meet the highest Indian food safety standards.
                  </p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-2xl p-6">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">License Number</span>
                  <p className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                    {process.env.NEXT_PUBLIC_FSSAI_LICENSE_NUMBER || "Registration in Progress"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link 
                    href="#"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
                  >
                    <FileText size={18} />
                    View Certificate
                  </Link>
                  <Link 
                    href="#"
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-50 hover:shadow-sm active:scale-95"
                  >
                    <Download size={18} />
                    Download PDF
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Certifications */}
        <section className="mb-24">
          <SectionHeader 
            label="Commitment to Excellence"
            title="Additional Certifications"
            subtitle="Our processes are periodically audited and verified by various international and national governing bodies."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-3">{cert.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {cert.description}
                </p>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-sm font-bold text-brand-green flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <FileText size={16} />
                    View Certificate
                  </Link>
                  <Link href="#" className="text-sm font-bold text-slate-400 flex items-center gap-2 hover:text-slate-600 transition-colors">
                    <Download size={16} />
                    Download PDF
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance Statement */}
        <section className="max-w-3xl mx-auto text-center border-t border-slate-100 pt-16">
          <p className="text-slate-500 italic leading-relaxed text-lg mb-8">
            "Fresh 360 follows all applicable food safety regulations and maintains hygiene and quality standards throughout sourcing, preparation, and delivery."
          </p>
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Inquiries</p>
            <p className="text-slate-900 font-medium">
              For verification or compliance-related queries, contact us at:
              <br />
              <Link href="mailto:support@fresh360degrees.in" className="text-brand-green hover:underline">support@fresh360degrees.in</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
