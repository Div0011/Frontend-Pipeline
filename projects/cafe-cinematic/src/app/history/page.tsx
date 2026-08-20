'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { InnerNav } from '@/components/ui/InnerNav';

export default function HistoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main
      className="relative min-h-screen selection:bg-cafe-accent selection:text-cafe-dark"
      style={{ background: '#F7F4F0', color: '#2C1810' }}
    >
      <InnerNav />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 sm:pb-32 max-w-content mx-auto px-6 md:px-12 text-center">
        <div className="chapter-tag justify-center mb-6" style={{ color: 'rgba(44,24,16,0.6)' }}>Our Story</div>
        <h1
          className="font-display font-normal leading-tight mb-8"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)', letterSpacing: '-0.03em' }}
        >
          The Journey <br />
          <em className="italic" style={{ color: '#C4A77D' }}>2018–2025</em>
        </h1>
        <p className="font-body font-light text-lg max-w-xl mx-auto" style={{ color: 'rgba(44,24,16,0.6)' }}>
          From a tiny pop-up in a borrowed warehouse to a multi-roaster atelier with an in-house stone hearth bakery.
        </p>
      </section>

      {/* ── Timeline ── */}
      <section ref={containerRef} className="relative max-w-content mx-auto px-6 md:px-12 pb-32">
        {/* Center line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-cafe-border -translate-x-1/2 z-0" />

        <div className="space-y-24 sm:space-y-36 relative z-10">

          {/* 2018 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-start">
            <div className="md:w-1/2 md:pr-16 md:text-right">
              <h2
                className="font-display font-bold leading-none mb-4"
                style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.04em', color: '#1A0F0A' }}
              >
                2018
              </h2>
              <div className="chapter-tag md:justify-end mb-6" style={{ color: '#C4A77D' }}>Mulberry St. Pop-up</div>
              <h3 className="font-display font-semibold text-2xl mb-4 leading-tight">The First Roast</h3>
              <p className="font-body font-light text-cafe-muted leading-relaxed" style={{ fontSize: '1.05rem' }}>
                We borrowed a corner of an old textile warehouse and wheeled in a 1970s 5kg Probat roaster.
                We only had three stools and a single V60 dripper. The first batch was an Ethiopian Yirgacheffe,
                and the line wrapped around the block.
              </p>
            </div>
            {/* Center dot (desktop) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 mt-12 w-4 h-4 rounded-full border-2 bg-[#F7F4F0]" style={{ borderColor: '#C4A77D' }} />
            <div className="md:w-1/2 md:pl-16 mt-4 md:mt-24">
              <div
                className="w-full aspect-[4/3] rounded-2xl border"
                style={{
                  borderColor: 'rgba(44,24,16,0.1)',
                  background: 'linear-gradient(135deg, rgba(44,24,16,0.03) 0%, rgba(44,24,16,0.08) 100%)',
                }}
              />
              <span className="block mt-4 text-xs font-body tracking-[0.15em] uppercase" style={{ color: 'rgba(44,24,16,0.4)' }}>
                Archive: The original Probat, Nov 2018
              </span>
            </div>
          </div>

          {/* 2020 */}
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-0 items-start">
            <div className="md:w-1/2 md:pl-16">
              <h2
                className="font-display font-bold leading-none mb-4"
                style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.04em', color: '#1A0F0A' }}
              >
                2020
              </h2>
              <div className="chapter-tag mb-6" style={{ color: '#C4A77D' }}>The Hearth Bakery</div>
              <h3 className="font-display font-semibold text-2xl mb-4 leading-tight">Baking at 4 AM</h3>
              <p className="font-body font-light text-cafe-muted leading-relaxed" style={{ fontSize: '1.05rem' }}>
                We took over the lease next door, knocking down the wall to install a stone hearth oven.
                 Élodie joined us from Paris, bringing her grandfather&rsquo;s croissant lamination technique.
                We started baking fresh every single morning before dawn.
              </p>
            </div>
            {/* Center dot (desktop) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 mt-12 w-4 h-4 rounded-full border-2 bg-[#F7F4F0]" style={{ borderColor: '#C4A77D' }} />
            <div className="md:w-1/2 md:pr-16 mt-4 md:mt-24 text-right">
              <div
                className="w-full aspect-[3/4] rounded-2xl border ml-auto"
                style={{
                  maxWidth: '80%',
                  borderColor: 'rgba(44,24,16,0.1)',
                  background: 'linear-gradient(135deg, rgba(44,24,16,0.03) 0%, rgba(44,24,16,0.08) 100%)',
                }}
              />
              <span className="block mt-4 text-xs font-body tracking-[0.15em] uppercase" style={{ color: 'rgba(44,24,16,0.4)' }}>
                Archive: First batch of morning buns
              </span>
            </div>
          </div>

          {/* 2023 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-start">
            <div className="md:w-1/2 md:pr-16 md:text-right">
              <h2
                className="font-display font-bold leading-none mb-4"
                style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.04em', color: '#1A0F0A' }}
              >
                2023
              </h2>
              <div className="chapter-tag md:justify-end mb-6" style={{ color: '#C4A77D' }}>The Cookie Atelier</div>
              <h3 className="font-display font-semibold text-2xl mb-4 leading-tight">A Menu of Their Own</h3>
              <p className="font-body font-light text-cafe-muted leading-relaxed" style={{ fontSize: '1.05rem' }}>
                What started as a single Double Fudge Truffle cookie recipe evolved into a full atelier.
                We dedicated a specific section of the bakery entirely to cookies, experimenting with
                stoneground ancient grains, single-origin cocoas, and savory-sweet profiles.
              </p>
            </div>
            {/* Center dot (desktop) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 mt-12 w-4 h-4 rounded-full border-2 bg-[#F7F4F0]" style={{ borderColor: '#C4A77D' }} />
            <div className="md:w-1/2 md:pl-16 mt-4 md:mt-24">
              <div
                className="w-full aspect-square rounded-2xl border"
                style={{
                  maxWidth: '90%',
                  borderColor: 'rgba(44,24,16,0.1)',
                  background: 'linear-gradient(135deg, rgba(44,24,16,0.03) 0%, rgba(44,24,16,0.08) 100%)',
                }}
              />
              <span className="block mt-4 text-xs font-body tracking-[0.15em] uppercase" style={{ color: 'rgba(44,24,16,0.4)' }}>
                Archive: The Atelier expansion
              </span>
            </div>
          </div>

          {/* 2025 */}
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-0 items-start">
            <div className="md:w-1/2 md:pl-16">
              <h2
                className="font-display font-bold leading-none mb-4"
                style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.04em', color: '#C4A77D' }}
              >
                2025
              </h2>
              <div className="chapter-tag mb-6" style={{ color: '#C4A77D' }}>The Solarium</div>
              <h3 className="font-display font-semibold text-2xl mb-4 leading-tight">A Space to Stay</h3>
              <p className="font-body font-light text-cafe-muted leading-relaxed" style={{ fontSize: '1.05rem' }}>
                We expanded the back of the cafe into a glass-roofed solarium, filling it with
                broad-leaf plants and vintage Danish furniture. We wanted to create a space that
                actively encouraged people to close their laptops and stay a while.
              </p>
            </div>
            {/* Center dot (desktop) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 mt-12 w-4 h-4 rounded-full bg-[#C4A77D]" />
            <div className="md:w-1/2 md:pr-16 mt-4 md:mt-24 text-right">
              <div
                className="w-full aspect-video rounded-2xl border ml-auto"
                style={{
                  borderColor: 'rgba(44,24,16,0.1)',
                  background: 'linear-gradient(135deg, rgba(44,24,16,0.03) 0%, rgba(44,24,16,0.08) 100%)',
                }}
              />
              <span className="block mt-4 text-xs font-body tracking-[0.15em] uppercase" style={{ color: 'rgba(44,24,16,0.4)' }}>
                Present Day: The Solarium
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer / CTA ── */}
      <section className="border-t pb-24 pt-24 text-center" style={{ borderColor: 'rgba(44,24,16,0.08)' }}>
        <h2
          className="font-display font-normal text-cafe-dark leading-tight mb-8"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.025em' }}
        >
          Be part of the{' '}
          <em className="italic text-cafe-secondary">next chapter.</em>
        </h2>
        <Link
          href="/#reserve"
          className="btn-2d-primary inline-flex items-center gap-2"
          style={{ padding: '1rem 2.5rem', fontSize: '0.75rem' }}
        >
          Reserve a Table
        </Link>
      </section>
    </main>
  );
}
