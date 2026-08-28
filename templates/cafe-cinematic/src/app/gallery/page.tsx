'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { InnerNav } from '@/components/ui/InnerNav';

const GALLERY_ITEMS = [
  {
    title: 'The Solarium',
    subtitle: 'Morning light through the glass roof',
    aspect: 'aspect-[4/3]',
    colSpan: 'col-span-1 md:col-span-8',
    color: '#D4A359',
  },
  {
    title: 'Manual Brew',
    subtitle: 'V60 extraction, 95°C',
    aspect: 'aspect-square',
    colSpan: 'col-span-1 md:col-span-4',
    color: '#E8B37A',
  },
  {
    title: 'Stone Hearth',
    subtitle: 'Baking at 240°C, 4AM',
    aspect: 'aspect-[3/4]',
    colSpan: 'col-span-1 md:col-span-4',
    color: '#C97D4E',
  },
  {
    title: 'Cookie Atelier',
    subtitle: 'Double Fudge Truffle preparation',
    aspect: 'aspect-video',
    colSpan: 'col-span-1 md:col-span-8',
    color: '#B06D44',
  },
  {
    title: 'The Counter',
    subtitle: 'Barista station during morning rush',
    aspect: 'aspect-[3/2]',
    colSpan: 'col-span-1 md:col-span-6',
    color: '#CBB282',
  },
  {
    title: 'Ceramics',
    subtitle: 'Hand-thrown mugs by local artisans',
    aspect: 'aspect-[3/2]',
    colSpan: 'col-span-1 md:col-span-6',
    color: '#8FA876',
  },
];

function GalleryCard({ item }: { item: typeof GALLERY_ITEMS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 4;
    const y = ((e.clientY - top) / height - 0.5) * 4;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    el.style.transform = '';
    setTimeout(() => { if (el) el.style.transition = ''; }, 700);
    setIsHovered(false);
  };

  return (
    <div
      className={`relative ${item.colSpan} group`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={ref}
        className={`w-full ${item.aspect} rounded-2xl overflow-hidden cursor-pointer`}
        onMouseMove={onMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onLeave}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
          border: '1px solid rgba(255,255,255,0.05)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Placeholder gradient mimicking the tone of the image */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${item.color} 0%, transparent 80%)`,
            opacity: isHovered ? 0.4 : 0.15,
          }}
        />

        {/* Text Overlay */}
        <div
          className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-[#0D0705]/90 via-[#0D0705]/20 to-transparent transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <div
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <h3 className="font-display font-medium text-white text-2xl md:text-3xl mb-2 tracking-tight">
              {item.title}
            </h3>
            <p className="font-body text-sm font-light" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {item.subtitle}
            </p>
          </div>
        </div>

        {/* Hover Border Glow */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            border: `1px solid ${item.color}`,
            opacity: isHovered ? 0.3 : 0,
          }}
        />
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <main
      className="relative min-h-screen selection:bg-cafe-accent selection:text-cafe-dark"
      style={{ background: '#0D0705', color: '#F7F4F0' }}
    >
      <InnerNav />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 sm:pb-32 max-w-content mx-auto px-6 md:px-12 text-center">
        <div className="chapter-tag justify-center mb-6" style={{ color: 'rgba(196,167,125,0.6)' }}>The Space</div>
        <h1
          className="font-display font-normal text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', letterSpacing: '-0.03em' }}
        >
          Visual <em className="italic" style={{ color: '#C4A77D' }}>Archive</em>
        </h1>
        <p className="font-body font-light text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Moments captured at our Soho roastery, hearth bakery, and solarium.
        </p>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-content mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={i} item={item} />
          ))}
        </div>
      </section>

      {/* ── Footer / CTA ── */}
      <section className="border-t pb-24 pt-24 text-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <h2
          className="font-display font-normal text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.025em' }}
        >
          Experience it in{' '}
          <em className="italic" style={{ color: '#C4A77D' }}>person.</em>
        </h2>
        <Link
          href="/#reserve"
          className="group inline-flex items-center gap-3 rounded-full font-body font-semibold uppercase tracking-[0.14em]"
          style={{
            padding: '1rem 2.5rem',
            fontSize: '0.75rem',
            background: 'rgba(196, 167, 125, 0.1)',
            color: '#C4A77D',
            border: '1px solid rgba(196, 167, 125, 0.25)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            Object.assign(e.currentTarget.style, {
              background: 'rgba(196, 167, 125, 0.2)',
              borderColor: 'rgba(196, 167, 125, 0.5)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(196, 167, 125, 0.15)',
            });
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            Object.assign(e.currentTarget.style, {
              background: 'rgba(196, 167, 125, 0.1)',
              borderColor: 'rgba(196, 167, 125, 0.25)',
              transform: '',
              boxShadow: '',
            });
          }}
        >
          Reserve a Table
        </Link>
      </section>
    </main>
  );
}
