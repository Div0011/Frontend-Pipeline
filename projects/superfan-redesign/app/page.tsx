'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AmbientBackground } from '../components/shared/AmbientBackground';
import { SectionSkeleton } from '../components/ui/SectionSkeleton';

const ColdOpen = dynamic(() => import('../components/chapters/ColdOpen').then(mod => ({ default: mod.ColdOpen })), { ssr: false });

const ProductShowcase = dynamic(() => import('../components/chapters/ProductShowcase').then(mod => ({ default: mod.ProductShowcase })), {
  loading: () => <SectionSkeleton height="80vh" />,
  ssr: false,
});

const TechnologySection = dynamic(() => import('../components/chapters/TechnologySection').then(mod => ({ default: mod.TechnologySection })), {
  loading: () => <SectionSkeleton height="80vh" />,
  ssr: false,
});

const EnergySavingsCalculator = dynamic(() => import('../components/chapters/EnergySavingsCalculator').then(mod => ({ default: mod.EnergySavingsCalculator })), {
  loading: () => <SectionSkeleton height="70vh" />,
  ssr: false,
});

const Testimonials = dynamic(() => import('../components/chapters/Testimonials').then(mod => ({ default: mod.Testimonials })), {
  loading: () => <SectionSkeleton height="60vh" />,
  ssr: false,
});

const AwardsSection = dynamic(() => import('../components/chapters/AwardsSection').then(mod => ({ default: mod.AwardsSection })), {
  loading: () => <SectionSkeleton height="60vh" />,
  ssr: false,
});

const ProductGrid = dynamic(() => import('../components/chapters/ProductGrid').then(mod => ({ default: mod.ProductGrid })), {
  loading: () => <SectionSkeleton height="80vh" />,
  ssr: false,
});

const SmokeDynamicsSection = dynamic(() => import('../components/chapters/SmokeDynamicsSection').then(mod => ({ default: mod.SmokeDynamicsSection })), {
  loading: () => <SectionSkeleton height="70vh" />,
  ssr: false,
});

const FAQSection = dynamic(() => import('../components/chapters/FAQSection').then(mod => ({ default: mod.FAQSection })), {
  loading: () => <SectionSkeleton height="60vh" />,
  ssr: false,
});

const CTASection = dynamic(() => import('../components/chapters/CTASection').then(mod => ({ default: mod.CTASection })), {
  loading: () => <SectionSkeleton height="50vh" />,
  ssr: false,
});

const CloseSection = dynamic(() => import('../components/chapters/CloseSection').then(mod => ({ default: mod.CloseSection })), {
  loading: () => <SectionSkeleton height="40vh" />,
  ssr: false,
});

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <main
        id="main-content"
        style={{
          minHeight: '100vh',
          backgroundColor: '#0a192f',
          position: 'relative',
          zIndex: 1,
          overflowX: 'hidden',
          isolation: 'isolate',
        }}
      >
        {/* 1. Hero Hook (0-20% Fold) */}
        <ColdOpen />

        {/* 2. Product Show (Showcase SuperQ Lux) */}
        <ProductShowcase />

        {/* 3. How It Works (Proof: 3D CAD Explosion Motor) */}
        <TechnologySection />

        {/* 4. Impact & Scale (69% Bill Reduction + CO2 Savings) */}
        <EnergySavingsCalculator />

        {/* 5. Proof & Social Trust (Testimonials + BEE 5-Star Awards) */}
        <Testimonials />
        <AwardsSection />

        {/* 6. Configurator & Collection (Personalize & Compare) */}
        <ProductGrid />

        {/* 7. Hazard & Acoustic Defense (Smoke Dynamics <32dB) */}
        <SmokeDynamicsSection />

        {/* 8. Help & Support (FAQ) */}
        <FAQSection />

        {/* 9. Final Conversion Moment (CTA) */}
        <CTASection />

        {/* 10. Heritage & Footer (Close) */}
        <CloseSection />
      </main>
    </>
  );
}
