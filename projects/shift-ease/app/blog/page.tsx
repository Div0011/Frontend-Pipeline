import { Metadata } from 'next';
import BlogList from '@/components/sections/BlogList';

export const metadata: Metadata = {
  title: 'Blog — ShiftEase by Sheetal',
  description: 'Read our latest guides on moving tips, packing advice, and relocation insights across India.',
};

export default function BlogPage() {
  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h1 className="heading-xl font-display text-navy mb-4">Moving Insights</h1>
        <p className="text-body text-slate max-w-2xl mx-auto">
          Expert tips, guides, and advice to make your next move smoother and stress-free.
        </p>
      </div>
      <BlogList />
    </div>
  );
}
