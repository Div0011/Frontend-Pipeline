import Link from 'next/link';
import { ShieldCheck, Award, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Banner */}
      <div className="text-center space-y-4">
        <span className="badge bg-teal/10 text-teal font-semibold text-xs py-1 px-3">Founded in 2024</span>
        <h1 className="heading-xl font-display text-navy">Revolutionizing Relocation Across India</h1>
        <p className="text-lg text-slate max-w-2xl mx-auto leading-relaxed">
          ShiftEase by Sheetal was founded with a singular mission: eliminate moving scams, opaque pricing, and broken promises by creating India&apos;s most reliable verified directory for packers and movers.
        </p>
      </div>

      {/* Founder Quote Card */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-teal/30 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 space-y-4">
          <p className="text-lg md:text-xl font-display italic text-slate-200 leading-relaxed">
            &ldquo;Having spent over a decade assisting families with home shifting, I saw firsthand how stressful moving could be due to unverified vendors. ShiftEase was born to bring absolute transparency, verified GSTIN credentials, and peace of mind to every doorstep.&rdquo;
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-12 h-12 rounded-full bg-teal text-navy font-bold text-lg flex items-center justify-center font-display">
              S
            </div>
            <div>
              <span className="font-bold text-white block">Sheetal Sharma</span>
              <span className="text-xs text-teal font-medium">Founder & CEO, ShiftEase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Mission & Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-teal/10 text-teal rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="heading-md font-display text-navy">Rigorous 5-Step Verification</h3>
          <p className="text-body text-slate text-sm leading-relaxed">
            Every vendor listed on ShiftEase undergoes strict physical office address checks, GSTIN validation, driver license verification, and background audits before receiving our verified badge.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-teal/10 text-teal rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="heading-md font-display text-navy">Zero Hidden Fees Guarantee</h3>
          <p className="text-body text-slate text-sm leading-relaxed">
            We provide pre-calculated cost estimates based on volume, distance, labor, and floor tolls, so you never experience unexpected price spikes on move day.
          </p>
        </div>
      </div>

      {/* Values List */}
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-6">
        <h3 className="heading-md font-display text-navy border-b border-gray-100 pb-4">Our Core Commitments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-navy text-base mb-1">Customer-First Service</h4>
              <p className="text-xs text-slate">24/7 helpline and dedicated relocation manager support.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-navy text-base mb-1">Transit Insurance Coverage</h4>
              <p className="text-xs text-slate">All partner vendors provide comprehensive transit insurance for fragile items.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-navy text-base mb-1">Pan-India Network</h4>
              <p className="text-xs text-slate">Seamless local and intercity transport across Delhi NCR, Mumbai, Bangalore, Pune, and Hyderabad.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-navy text-base mb-1">Eco-Friendly Packaging</h4>
              <p className="text-xs text-slate">Reusable heavy-duty crates and recyclable corrugated boxes for sustainable relocation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center py-6">
        <h3 className="heading-md font-display text-navy mb-4">Ready to Experience a Stress-Free Move?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote" className="btn-primary text-sm px-8 py-3.5 flex items-center justify-center gap-2">
            Calculate Moving Cost <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/directory" className="btn-outline text-sm px-8 py-3.5">
            Explore Verified Vendors
          </Link>
        </div>
      </div>
    </div>
  );
}