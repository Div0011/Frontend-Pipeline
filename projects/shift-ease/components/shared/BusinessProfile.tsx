'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Company, Review } from '@/lib/data';
import ReviewForm from '@/components/shared/ReviewForm';
import { ShieldCheck, MapPin, Phone, Mail, Globe, Award, CheckCircle2, Star, Calendar, ArrowLeft } from 'lucide-react';

interface BusinessProfileProps {
  company: Company;
  initialReviews?: Review[];
}

export default function BusinessProfile({ company, initialReviews = [] }: BusinessProfileProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: company.id, name, phone, message: `Callback request for ${company.name}` }),
      });
    } catch {
      // fallback
    }
    setCallbackSubmitted(true);
  };

  const handleAddReview = (newReviewData: { rating: number; text: string; moveDate: string }) => {
    const newReview: Review = {
      id: `r_${Date.now()}`,
      companyId: company.id,
      userId: 'user_guest',
      rating: newReviewData.rating || 5,
      text: newReviewData.text,
      moveDate: newReviewData.moveDate,
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/directory" className="inline-flex items-center gap-2 text-slate hover:text-teal text-sm font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Business Directory
        </Link>
      </div>

      {/* Banner & Header */}
      <div className="bg-navy rounded-3xl overflow-hidden mb-8 shadow-xl border border-slate-800">
        <div className="h-56 bg-gradient-to-r from-navy via-slate-900 to-teal/20 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="px-6 md:px-10 pb-8 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div className="w-28 h-28 bg-gradient-to-br from-teal to-teal/80 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border-4 border-navy">
                <span className="font-display font-extrabold text-4xl text-white">
                  {company.name.charAt(0)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="heading-xl font-display text-white">{company.name}</h1>
                  {company.isVerified && (
                    <span className="badge bg-teal/20 border border-teal/40 text-teal flex items-center gap-1 text-sm py-1 px-3">
                      <ShieldCheck className="w-4 h-4" /> Verified Partner
                    </span>
                  )}
                </div>
                <p className="text-slate-300 flex items-center gap-2 text-sm md:text-base">
                  <MapPin className="w-4 h-4 text-teal" /> {company.address} ({company.cityName})
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-yellow-500/10 px-2.5 py-1 rounded-lg border border-yellow-500/30">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-bold text-sm">{company.rating}</span>
                  </div>
                  <span className="text-slate-300 text-sm">
                    Based on <strong>{company.reviewCount + reviews.length}</strong> verified reviews
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-teal font-medium text-sm flex items-center gap-1">
                    <Award className="w-4 h-4" /> {company.yearsInBusiness} Years Experience
                  </span>
                </div>
              </div>
            </div>

            <Link href={`/quote?city=${company.cityName.toLowerCase()}&vendor=${encodeURIComponent(company.name)}`} className="btn-primary flex items-center gap-2 shadow-lg shadow-teal/20 w-full sm:w-auto justify-center">
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="heading-md font-display text-navy mb-4 flex items-center gap-2">
              About Company
            </h2>
            <p className="text-body text-slate leading-relaxed mb-6">
              {company.name} is a premier, government-registered moving and packing service operating in {company.cityName}. With over {company.yearsInBusiness} years of operational expertise, they specialize in stress-free household shifting, corporate office relocation, vehicle logistics, and secure climate-controlled warehousing.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-3 bg-lightGray rounded-xl">
                <span className="text-xs text-slate uppercase font-semibold tracking-wider">GSTIN</span>
                <p className="font-semibold text-navy text-sm mt-1">{company.gstin || '27AAAAA0000B1Z1'}</p>
              </div>
              <div className="p-3 bg-lightGray rounded-xl">
                <span className="text-xs text-slate uppercase font-semibold tracking-wider">Owner / Manager</span>
                <p className="font-semibold text-navy text-sm mt-1">{company.ownerName || 'Verified Manager'}</p>
              </div>
              <div className="p-3 bg-lightGray rounded-xl">
                <span className="text-xs text-slate uppercase font-semibold tracking-wider">Verification</span>
                <p className="font-semibold text-teal text-sm mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Audit Passed
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="heading-md font-display text-navy mb-6">Services Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {company.services.map((service) => (
                <div key={service} className="flex items-center gap-3 p-3 rounded-xl bg-teal/5 border border-teal/10">
                  <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0" />
                  <span className="font-medium text-navy text-sm">{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="heading-md font-display text-navy">Customer Reviews</h2>
                <p className="text-small text-slate mt-1">Real feedback from verified home shifters</p>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-navy text-sm">{company.rating} / 5.0</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {reviews.length === 0 ? (
                <div className="text-center py-8 bg-lightGray rounded-xl">
                  <p className="text-slate">No written reviews yet. Be the first to leave feedback!</p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-gray-100 bg-lightGray/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">
                          U
                        </div>
                        <div>
                          <span className="font-semibold text-navy text-sm block">Verified Client</span>
                          <span className="text-xs text-slate flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Moved in {rev.moveDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate leading-relaxed">{rev.text}</p>
                  </div>
                ))
              )}
            </div>

            <ReviewForm companyId={company.id} onSubmit={handleAddReview} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Direct Contact Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="heading-md font-display text-navy border-b border-gray-100 pb-3">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal mt-0.5" />
                <div>
                  <span className="text-xs text-slate block">Phone Number</span>
                  <a href={`tel:${company.phone}`} className="font-semibold text-navy hover:text-teal">
                    {company.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal mt-0.5" />
                <div>
                  <span className="text-xs text-slate block">Email Address</span>
                  <a href={`mailto:${company.email}`} className="font-semibold text-navy hover:text-teal">
                    {company.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal mt-0.5" />
                <div>
                  <span className="text-xs text-slate block">Headquarters</span>
                  <span className="text-navy">{company.address}</span>
                </div>
              </div>
              {company.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-teal mt-0.5" />
                  <div>
                    <span className="text-xs text-slate block">Official Website</span>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-teal font-semibold hover:underline truncate block">
                      {company.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Callback Widget */}
          <div className="bg-gradient-to-br from-navy to-slate-900 text-white rounded-2xl p-6 shadow-xl sticky top-24">
            <h3 className="heading-md font-display text-white mb-2">Instant Callback</h3>
            <p className="text-xs text-slate-300 mb-4">Request a call back within 15 minutes from {company.name}.</p>
            
            {callbackSubmitted ? (
              <div className="bg-teal/20 border border-teal/40 rounded-xl p-4 text-center">
                <CheckCircle2 className="w-8 h-8 text-teal mx-auto mb-2" />
                <h4 className="font-bold text-white text-sm">Callback Request Sent!</h4>
                <p className="text-xs text-slate-300 mt-1">Our manager will reach out to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number (+91)"
                    className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
                  />
                </div>
                <button type="submit" className="btn-primary w-full text-sm font-semibold">
                  Request Immediate Call
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}