import { Metadata } from 'next';
import VendorOnboarding from '@/components/sections/VendorOnboarding';

export const metadata: Metadata = {
  title: 'List Your Business — ShiftEase by Sheetal',
  description: 'Join our verified directory of packers and movers. Submit your business details and get approved to reach thousands of customers.',
};

export default function ListYourBusinessPage() {
  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h1 className="heading-xl font-display text-navy mb-4">List Your Business</h1>
        <p className="text-body text-slate max-w-2xl mx-auto">
          Join ShiftEase and reach customers looking for professional packers and movers. Submit your application and get verified today.
        </p>
      </div>
      <VendorOnboarding />
    </div>
  );
}
