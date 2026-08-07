import { Metadata } from 'next';
import AboutContent from '@/components/sections/AboutContent';

export const metadata: Metadata = {
  title: 'About Us — ShiftEase by Sheetal',
  description: 'Learn about ShiftEase by Sheetal — our mission, story, and commitment to making relocations seamless across India.',
};

export default function AboutPage() {
  return (
    <div className="container-custom py-8">
      <AboutContent />
    </div>
  );
}
