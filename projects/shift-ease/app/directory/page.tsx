import { Suspense } from 'react';
import { Metadata } from 'next';
import DirectorySearch from '@/components/sections/DirectorySearch';

export const metadata: Metadata = {
  title: 'Business Directory — ShiftEase by Sheetal',
  description: 'Search our verified directory of packers and movers. Filter by city, service type, rating, and price range.',
};

export default function DirectoryPage() {
  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h1 className="heading-xl font-display text-navy mb-4">Find Your Moving Partner</h1>
        <p className="text-body text-slate max-w-2xl mx-auto">
          Browse our verified directory of professional packers and movers. Compare services, read reviews, and choose the best fit for your move.
        </p>
      </div>
      <Suspense fallback={
        <div className="text-center py-12 text-slate font-medium">
          Loading directory listings...
        </div>
      }>
        <DirectorySearch />
      </Suspense>
    </div>
  );
}
