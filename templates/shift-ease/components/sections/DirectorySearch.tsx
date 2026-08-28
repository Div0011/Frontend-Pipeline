'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, MapPin, SlidersHorizontal, RotateCcw, Building2 } from 'lucide-react';
import { companies } from '@/lib/data';
import BusinessCard from '@/components/shared/BusinessCard';

export default function DirectorySearch() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city')?.toLowerCase() || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedService, setSelectedService] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'experience'>('rating');

  useEffect(() => {
    if (searchParams.get('city')) {
      setSelectedCity(searchParams.get('city')!.toLowerCase());
    }
  }, [searchParams]);

  const cities = ['all', 'delhi', 'mumbai', 'bangalore'];
  const services = ['all', 'House Shifting', 'Office Relocation', 'Car Transportation', 'Packing & Unpacking', 'Storage Solutions', 'Pet Relocation'];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedService('all');
    setSelectedRating(0);
    setSortBy('rating');
  };

  const filtered = companies
    .filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCity = selectedCity === 'all' || company.cityName.toLowerCase() === selectedCity.toLowerCase();
      const matchesService = selectedService === 'all' || company.services.includes(selectedService);
      const matchesRating = selectedRating === 0 || company.rating >= selectedRating;
      return matchesSearch && matchesCity && matchesService && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'experience') return b.yearsInBusiness - a.yearsInBusiness;
      return 0;
    });

  return (
    <div className="space-y-8">
      {/* Search & Filter Control Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Text Input Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate w-5 h-5" />
            <input
              type="text"
              placeholder="Search movers by name, city, or service (e.g. Car Transport)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-lightGray/60 border border-gray-200 rounded-xl text-navy placeholder-slate focus:outline-none focus:ring-2 focus:ring-teal/50 focus:bg-white text-sm"
              aria-label="Search businesses"
            />
          </div>

          {/* Select Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3.5 bg-lightGray/60 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50 cursor-pointer"
              aria-label="Filter by city"
            >
              <option value="all">All Cities</option>
              <option value="delhi">Delhi NCR</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
            </select>

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-4 py-3.5 bg-lightGray/60 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50 cursor-pointer"
              aria-label="Filter by service"
            >
              {services.map((s) => (
                <option key={s} value={s}>{s === 'all' ? 'All Services' : s}</option>
              ))}
            </select>

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className="px-4 py-3.5 bg-lightGray/60 border border-gray-200 rounded-xl text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal/50 cursor-pointer"
              aria-label="Filter by rating"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5★ & above</option>
              <option value={4.8}>4.8★ & above</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3.5 bg-navy text-white text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 cursor-pointer"
              aria-label="Sort by"
            >
              <option value="rating">Sort: Highest Rating</option>
              <option value="reviews">Sort: Most Reviews</option>
              <option value="experience">Sort: Years Experience</option>
            </select>
          </div>
        </div>

        {/* Active status & Reset */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-slate">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-teal" />
            <span>Showing <strong className="text-navy font-semibold">{filtered.length}</strong> verified vendor{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          {(searchQuery || selectedCity !== 'all' || selectedService !== 'all' || selectedRating !== 0) && (
            <button
              onClick={resetFilters}
              className="text-teal hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <Building2 className="mx-auto text-slate/40 mb-4 w-12 h-12" />
          <h3 className="heading-md font-display text-navy mb-2">No Matching Vendors Found</h3>
          <p className="text-body text-slate max-w-md mx-auto mb-6">
            We couldn&apos;t find any verified packers matching your current search filters. Try widening your criteria or clearing filters.
          </p>
          <button onClick={resetFilters} className="btn-primary text-sm">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((company) => (
            <BusinessCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}