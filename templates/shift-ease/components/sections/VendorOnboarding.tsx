'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ShieldCheck, Building2, CheckCircle2, FileCheck, Eye, Sparkles } from 'lucide-react';

const vendorSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  ownerName: z.string().min(2, 'Owner name is required'),
  gstin: z.string().min(15, 'Valid 15-digit GSTIN is required'),
  city: z.string().min(1, 'Please select a city'),
  address: z.string().min(5, 'Address is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  email: z.string().email('Invalid email address'),
  website: z.string().optional().or(z.literal('')),
  yearsInBusiness: z.number().min(1, 'Must be at least 1 year'),
  services: z.array(z.string()).min(1, 'Select at least one service'),
});

type VendorFormData = z.infer<typeof vendorSchema>;

const availableServices = [
  'House Shifting', 'Office Relocation', 'Car Transportation',
  'Bicycle Moving', 'Pet Relocation', 'Storage Solutions',
  'Packing & Unpacking', 'Furniture Assembly',
];

export default function VendorOnboarding() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      companyName: '',
      ownerName: '',
      gstin: '07AAAAA0000A1Z1',
      city: 'delhi',
      address: '',
      phone: '',
      email: '',
      website: '',
      yearsInBusiness: 5,
      services: ['House Shifting', 'Packing & Unpacking'],
    },
  });

  const previewCompany = watch();

  const onSubmit = async (data: VendorFormData) => {
    setLoading(true);
    try {
      await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-teal/10 text-teal rounded-3xl flex items-center justify-center mx-auto mb-6 border border-teal/20 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="badge bg-teal/20 text-teal text-xs uppercase font-bold py-1 px-3 mb-3">Audit Queue Pending</span>
        <h2 className="heading-lg font-display text-navy mb-3">Partner Application Submitted!</h2>
        <p className="text-body text-slate mb-6 leading-relaxed">
          Thank you for registering <strong className="text-navy">{previewCompany.companyName || 'your company'}</strong> with ShiftEase. Our verification team will audit your GSTIN and physical office within 24-48 hours.
        </p>

        <div className="bg-lightGray rounded-2xl p-4 text-left border border-gray-200 mb-8 space-y-2 text-sm text-slate">
          <p><strong className="text-navy">Application ID:</strong> #VND-{Math.floor(100000 + Math.random() * 900000)}</p>
          <p><strong className="text-navy">GSTIN Submitted:</strong> {previewCompany.gstin}</p>
          <p><strong className="text-navy">Selected City:</strong> {previewCompany.city?.toUpperCase()}</p>
        </div>

        <button onClick={() => setSubmitted(false)} className="btn-primary text-sm">
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="heading-md font-display text-navy mb-1 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal" /> Vendor Registration Form
            </h2>
            <p className="text-small text-slate">Enter your verified business details to list on ShiftEase.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Company Name *</label>
              <input
                {...register('companyName')}
                type="text"
                placeholder="e.g. Apex Relocations Delhi"
                className="w-full px-4 py-3 bg-lightGray/80 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Owner / Manager Name *</label>
              <input
                {...register('ownerName')}
                type="text"
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-4 py-3 bg-lightGray/80 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
              {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-1">GSTIN Number (Mandatory for Verification) *</label>
            <div className="relative">
              <FileCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-teal w-5 h-5" />
              <input
                {...register('gstin')}
                type="text"
                placeholder="07AAAAA0000A1Z1"
                className="w-full pl-12 pr-4 py-3.5 bg-lightGray/80 border border-gray-200 rounded-xl text-navy font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>
            {errors.gstin && <p className="text-red-500 text-xs mt-1">{errors.gstin.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Primary Operating City *</label>
              <select
                {...register('city')}
                className="w-full px-4 py-3 bg-lightGray/80 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
              >
                <option value="delhi">Delhi NCR</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
              </select>
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Years in Operation *</label>
              <input
                {...register('yearsInBusiness', { valueAsNumber: true })}
                type="number"
                min="1"
                className="w-full px-4 py-3 bg-lightGray/80 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
              {errors.yearsInBusiness && <p className="text-red-500 text-xs mt-1">{errors.yearsInBusiness.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Headquarters Office Address *</label>
            <textarea
              {...register('address')}
              rows={2}
              placeholder="Full physical office address..."
              className="w-full px-4 py-3 bg-lightGray/80 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Contact Phone *</label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-lightGray/80 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Official Business Email *</label>
              <input
                {...register('email')}
                type="email"
                placeholder="contact@company.com"
                className="w-full px-4 py-3 bg-lightGray/80 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Services Provided *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableServices.map((service) => (
                <label key={service} className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-lightGray/50 cursor-pointer hover:border-teal/50">
                  <input
                    type="checkbox"
                    value={service}
                    {...register('services')}
                    className="w-4 h-4 rounded text-teal focus:ring-teal/50"
                  />
                  <span className="text-xs text-navy font-medium">{service}</span>
                </label>
              ))}
            </div>
            {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal/20"
          >
            {loading ? 'Submitting Application...' : 'Submit Vendor Application'}
          </button>
        </div>
      </form>

      {/* Live Preview Card Sidebar */}
      <div className="space-y-6">
        <div className="bg-navy text-white rounded-3xl p-6 shadow-xl sticky top-24 border border-slate-800">
          <div className="flex items-center gap-2 text-teal text-xs uppercase tracking-wider font-bold mb-4">
            <Eye className="w-4 h-4" /> Live Directory Card Preview
          </div>

          <div className="bg-white rounded-2xl p-5 text-navy shadow-lg">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-12 h-12 bg-navy text-teal rounded-xl flex items-center justify-center font-display font-bold text-xl">
                {(previewCompany.companyName || 'S').charAt(0)}
              </div>
              <span className="badge bg-teal/10 text-teal text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Pending Audit
              </span>
            </div>

            <h4 className="font-display font-bold text-navy text-base truncate">
              {previewCompany.companyName || 'Your Company Name'}
            </h4>
            <p className="text-xs text-slate mt-0.5">
              {previewCompany.city?.toUpperCase() || 'DELHI'} · {previewCompany.yearsInBusiness || 5} yrs in business
            </p>

            <div className="mt-3 flex items-center gap-1 text-xs text-yellow-500 font-bold">
              ★ 5.0 <span className="text-slate font-normal">(New Partner)</span>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {(previewCompany.services || ['House Shifting']).slice(0, 2).map((s) => (
                <span key={s} className="badge bg-lightGray text-slate text-[10px]">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal" /> Instant listing upon GST validation
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal" /> Direct customer callbacks sent via SMS/API
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}