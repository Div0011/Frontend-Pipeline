import Link from 'next/link';
import type { Company } from '@/lib/data';
import { ShieldCheck, Star, MapPin, Award, PhoneCall, ArrowRight } from 'lucide-react';

interface BusinessCardProps {
  company: Company;
}

export default function BusinessCard({ company }: BusinessCardProps) {
  return (
    <div className="card p-6 block group hover:-translate-y-1 hover:border-teal/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Header avatar & Verification */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-13 h-13 w-12 h-12 bg-gradient-to-br from-navy to-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:bg-teal transition-colors">
              <span className="font-display font-bold text-xl text-teal group-hover:text-white transition-colors">
                {company.name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-navy text-lg group-hover:text-teal transition-colors truncate">
                {company.name}
              </h3>
              <p className="text-xs text-slate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-teal" /> {company.cityName} · <Award className="w-3 h-3 text-teal" /> {company.yearsInBusiness} yrs exp
              </p>
            </div>
          </div>

          {company.isVerified && (
            <span className="badge bg-teal/10 border border-teal/20 text-teal flex-shrink-0 text-[11px] font-semibold py-1 px-2.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          )}
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-4 bg-lightGray/80 px-3 py-1.5 rounded-lg w-fit">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-navy">{company.rating}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate font-medium">({company.reviewCount} customer reviews)</span>
        </div>

        {/* Services Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {company.services.slice(0, 3).map((service) => (
            <span key={service} className="badge bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1">
              {service}
            </span>
          ))}
          {company.services.length > 3 && (
            <span className="badge bg-teal/5 text-teal text-[11px] font-semibold px-2 py-1">
              +{company.services.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-2">
        <a
          href={`tel:${company.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-semibold text-slate-600 hover:text-teal flex items-center gap-1 p-1"
          aria-label={`Call ${company.name}`}
        >
          <PhoneCall className="w-3.5 h-3.5 text-teal" /> Call Direct
        </a>

        <Link
          href={`/directory/${company.slug}`}
          className="text-xs text-teal font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}