import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import HowItWorks from '@/components/sections/HowItWorks';
import CityCards from '@/components/sections/CityCards';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import ReviewsCarousel from '@/components/sections/ReviewsCarousel';
import CTA from '@/components/sections/CTA';

export const metadata = {
  title: 'ShiftEase by Sheetal — Packers & Movers Directory',
  description: 'Find verified packers and movers in your city. Get instant quotes, compare services, and book with confidence.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <CityCards />
      <WhyChooseUs />
      <ReviewsCarousel />
      <CTA />
    </>
  );
}
