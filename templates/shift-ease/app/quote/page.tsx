import { Metadata } from 'next';
import QuoteStepper from '@/components/sections/QuoteStepper';

export const metadata: Metadata = {
  title: 'Get an Instant Quote — ShiftEase by Sheetal',
  description: 'Calculate your moving cost instantly. Fill in your move details and get estimated price ranges from verified vendors.',
};

export default function QuotePage() {
  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h1 className="heading-xl font-display text-navy mb-4">Instant Moving Quote</h1>
        <p className="text-body text-slate max-w-2xl mx-auto">
          Get an estimated price range for your move in minutes. Answer a few questions and we will match you with the best vendors.
        </p>
      </div>
      <QuoteStepper />
    </div>
  );
}
