'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Flame, Leaf, Heart, Sun, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '2018', label: 'Est. Soho' },
  { value: '12+', label: 'Origins' },
  { value: '4AM', label: 'Daily start' },
  { value: '240°', label: 'Hearth temp' },
];

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease';
    setTimeout(() => {
      if (card) card.style.transition = '';
    }, 600);
  };

  return (
    <div
      ref={cardRef}
      className={`card-2d tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const reveals = container.querySelectorAll('.reveal-block');
      reveals.forEach((el) => {
        ScrollTrigger.create({
          trigger: el as HTMLElement,
          start: 'top 88%',
          end: 'top 45%',
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(el, { opacity: p, y: (1 - p) * 36 });
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-cafe-bg py-28 sm:py-36 overflow-hidden"
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px',
        }}
      />

      <div className="relative z-10 max-w-content mx-auto px-6 md:px-12">

        {/* ── Chapter header ── */}
        <div className="reveal-block mb-20 sm:mb-28 max-w-5xl">
          <div className="chapter-tag text-cafe-accent-dark mb-6">Our Story</div>
          <h2
            className="font-display font-normal text-cafe-dark leading-[1.04] mb-8 balance"
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)',
              letterSpacing: '-0.025em',
            }}
          >
            Born from a belief that{' '}
            <em className="italic text-cafe-secondary">slow craft</em>{' '}
            changes how you feel.
          </h2>
          <p className="text-cafe-muted text-lg sm:text-xl max-w-2xl leading-relaxed font-light">
            CAFE COFFEE began in a tiny Soho storefront with a single vintage Probat roaster
            and a philosophy: the best flavours emerge when you stop rushing them.
          </p>
        </div>

        {/* ── Stats row ── */}
        <div className="reveal-block grid grid-cols-2 sm:grid-cols-4 gap-px bg-cafe-border mb-28 sm:mb-36 rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-cafe-bg flex flex-col items-center justify-center py-10 px-6 text-center group hover:bg-cafe-warm transition-colors duration-300"
            >
              <span
                className="stat-number font-display font-bold text-cafe-dark block mb-2"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </span>
              <span
                className="font-body font-medium uppercase tracking-[0.18em] text-cafe-muted"
                style={{ fontSize: '0.62rem' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Timeline blocks ── */}
        <div className="space-y-28 sm:space-y-36">

          {/* Block 1 */}
          <div className="reveal-block grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-5 space-y-5">
              <span className="text-xs font-body font-bold tracking-[0.28em] uppercase text-cafe-accent-dark">
                2018 — The Beginning
              </span>
              <h3
                className="font-display font-normal text-cafe-dark leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)', letterSpacing: '-0.02em' }}
              >
                A roastery on{' '}
                <em className="italic text-cafe-secondary">Mulberry Street</em>
              </h3>
              <p className="text-cafe-muted text-base sm:text-lg leading-relaxed font-light">
                What started as a weekend pop-up quickly became a neighbourhood staple. We roasted
                small batches in a 5kg Probat, serving pour-overs to anyone who believed coffee
                deserves patience.
              </p>
            </div>
            <div className="md:col-span-7">
              <TiltCard className="p-8 sm:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(196, 167, 125, 0.12)',
                      border: '1px solid rgba(196, 167, 125, 0.25)',
                      color: '#8B5E3C',
                    }}
                  >
                    <Coffee className="w-5 h-5" />
                  </div>
                  <span className="font-display text-lg font-semibold text-cafe-dark">First Roast</span>
                </div>
                <p className="text-cafe-muted leading-relaxed">
                  Our first public batch was an Ethiopian Yirgacheffe, roasted to a light-medium
                  profile. The line wrapped around the block. We knew then that transparency —
                  showing every roast level, every origin — was our compass.
                </p>
              </TiltCard>
            </div>
          </div>

          {/* Block 2 */}
          <div className="reveal-block grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-7 md:order-2 space-y-5">
              <span className="text-xs font-body font-bold tracking-[0.28em] uppercase text-cafe-accent-dark">
                2020 — The Hearth
              </span>
              <h3
                className="font-display font-normal text-cafe-dark leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)', letterSpacing: '-0.02em' }}
              >
                Baking at <em className="italic text-cafe-secondary">4 AM</em>, always
              </h3>
              <p className="text-cafe-muted text-base sm:text-lg leading-relaxed font-light">
                We installed a stone hearth oven and brought in a third-generation French pastry
                chef. Now the scent of caramelised sugar and warm cinnamon drifts onto the street
                before the sun comes up.
              </p>
            </div>
            <div className="md:col-span-5 md:order-1">
              <TiltCard className="p-8 sm:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(196, 167, 125, 0.12)',
                      border: '1px solid rgba(196, 167, 125, 0.25)',
                      color: '#8B5E3C',
                    }}
                  >
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="font-display text-lg font-semibold text-cafe-dark">Dawn Bakery</span>
                </div>
                <p className="text-cafe-muted leading-relaxed">
                  Every croissant is laminated by hand. Every cake baked in small batches. We
                  don&apos;t do overnight proof boxes — we do what takes longer, because flavour
                  can&apos;t be scheduled.
                </p>
              </TiltCard>
            </div>
          </div>

          {/* Block 3 — Values */}
          <div className="reveal-block">
            <div className="text-center mb-14 sm:mb-18">
              <div className="chapter-tag text-cafe-accent-dark justify-center mb-4">What Drives Us</div>
              <h3
                className="font-display font-normal text-cafe-dark leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.025em' }}
              >
                Three pillars,{' '}
                <em className="italic text-cafe-secondary">infinite patience</em>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <Leaf className="w-5 h-5" />,
                  title: 'Regenerative sourcing',
                  body: 'We partner directly with farms practising shade-grown, biodiversity-first agriculture. Every bag traces back to a person, a plot, and a season.',
                },
                {
                  icon: <Heart className="w-5 h-5" />,
                  title: 'Slow craft over speed',
                  body: 'No shortcuts. No industrial proofing. No flavour added after the fact. We believe the extra hours are what make the final cup worth the wait.',
                },
                {
                  icon: <Sun className="w-5 h-5" />,
                  title: 'A space to stay',
                  body: 'Our Soho salon is designed for lingering — sunlit corners, slow Wi-Fi, and chairs that feel made for deep work and deeper conversations.',
                },
              ].map((v, i) => (
                <TiltCard key={i} className="p-8 sm:p-10 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: 'rgba(196, 167, 125, 0.12)',
                      border: '1px solid rgba(196, 167, 125, 0.25)',
                      color: '#8B5E3C',
                    }}
                  >
                    {v.icon}
                  </div>
                  <h4
                    className="font-display font-semibold text-cafe-dark mb-3"
                    style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)' }}
                  >
                    {v.title}
                  </h4>
                  <p className="text-cafe-muted text-sm sm:text-base leading-relaxed">{v.body}</p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Block 4 — Quote */}
          <div className="reveal-block">
            <div
              className="relative rounded-3xl overflow-hidden p-12 sm:p-20 text-center"
              style={{
                background: 'linear-gradient(135deg, #1A0F0A 0%, #2C1810 50%, #1A0F0A 100%)',
                border: '1px solid rgba(196, 167, 125, 0.12)',
              }}
            >
              {/* Decorative accent lines */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(196,167,125,0.4), transparent)' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(196,167,125,0.25), transparent)' }}
              />

              <Award className="w-7 h-7 mx-auto mb-8" style={{ color: 'rgba(196, 167, 125, 0.6)' }} />

              <blockquote
                className="font-display font-normal text-white leading-tight max-w-4xl mx-auto mb-8"
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 3.25rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                &ldquo;Good coffee fuels the morning;{' '}
                <em className="italic" style={{ color: '#C4A77D' }}>
                  a warm slice of cake feeds the soul.
                </em>
                &rdquo;
              </blockquote>
              <p className="font-body text-sm leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
                That&apos;s the philosophy that started it all — and the one we live by every single day,
                from the first roast to the last crumb.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
