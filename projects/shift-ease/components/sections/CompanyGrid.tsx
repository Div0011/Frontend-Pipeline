import Link from 'next/link';
import type { Company } from '@/lib/data';
import BusinessCard from '@/components/shared/BusinessCard';
import { ArrowRight } from 'lucide-react';

interface CompanyGridProps {
  companies: Company[];
  cityName: string;
}

export default function CompanyGrid({ companies, cityName }: CompanyGridProps) {
  return (
    <section className="section-padding bg-lightGray/50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-teal font-semibold text-xs tracking-wider uppercase">Verified Network</span>
            <h2 className="heading-lg font-display text-navy mt-1">Top Packers & Movers in {cityName}</h2>
          </div>
          <Link
            href={`/directory?city=${cityName.toLowerCase()}`}
            className="text-teal font-bold text-sm hover:underline inline-flex items-center gap-1.5"
          >
            View All {cityName} Movers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <BusinessCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}