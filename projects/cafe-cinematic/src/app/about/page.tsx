'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { InnerNav } from '@/components/ui/InnerNav';
import { Leaf, Flame, Heart, Sun, ArrowUpRight } from 'lucide-react';

function TiltCard({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 9;
    const y = ((e.clientY - top) / height - 0.5) * 9;
    el.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-3px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    el.style.transform = '';
    setTimeout(() => { if (el) el.style.transition = ''; }, 600);
  };
  return (
    <div
      ref={ref}
      className={`card-2d ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

const PILLARS = [
  {
    icon: <Leaf className="w-5 h-5" />,
    title: 'Regenerative Sourcing',
    body: 'We partner directly with farms practising shade-grown, biodiversity-first agriculture. Every bag traces back to a person, a plot, and a season.',
  },
  {
    icon: <Flame className="w-5 h-5" />,
    title: 'Dawn Craft',
    body: 'Our bakers start at 4AM. No shortcuts, no industrial proofing. Just the extra hours that make the final flavour worth the wait.',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Slow Service',
    body: "We train every barista for six months before they touch a customer's cup. Because the extraction is only as good as the human behind it.",
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: 'A Space to Stay',
    body: 'Sunlit corners, unhurried Wi-Fi, and chairs designed for long mornings. CAFE COFFEE is a destination, not a drive-through.',
  },
];

const STATS = [
  { value: '2018', label: 'Est. Soho' },
  { value: '12+', label: 'Origins' },
  { value: '4AM', label: 'Daily start' },
  { value: '240°', label: 'Hearth temp' },
  { value: '7', label: 'Cookie varieties' },
  { value: '3', label: 'Awards' },
];

const TEAM = [
  {
    name: 'Élodie Marais',
    role: 'Head Pastry Chef',
    bio: 'Trained at École Ferrandi Paris. Third-generation baker from Lyon who moved to Soho for the light.',
    color: '#8B5E3C',
  },
  {
    name: 'Kwame Asante',
    role: 'Head Roaster',
    bio: 'Certified Q Grader, formerly at Stumptown Coffee. Travels to origin twice a year for harvest selection.',
    color: '#4A7C59',
  },
  {
    name: 'Sione Ioasa',
    role: 'Bar Director',
    bio: 'Champion barista from Auckland, New Zealand. Designed every recipe on our espresso menu.',
    color: '#5C4A7C',
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen" style={{ background: '#F7F4F0' }}>
      <InnerNav />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end pb-20 sm:pb-32 overflow-hidden"
        style={{ minHeight: '90vh', background: '#1A0F0A' }}
      >
        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px',
          }}
        />
        {/* Accent radial */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 25% 80%, rgba(196,167,125,0.08) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-12 w-full">
          <div className="chapter-tag mb-8" style={{ color: 'rgba(196,167,125,0.65)' }}>Our Philosophy</div>
          <h1
            className="font-display font-normal text-white"
            style={{
              fontSize: 'clamp(3rem, 9vw, 10rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.95',
              maxWidth: '16ch',
            }}
          >
            We believe in the art of{' '}
            <em className="italic" style={{ color: '#C4A77D' }}>slow.</em>
          </h1>
          <p
            className="font-body font-light mt-10 max-w-xl leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem' }}
          >
            CAFE COFFEE began in a tiny Soho storefront in 2018 with one vintage Probat roaster and
            a belief that the best flavours emerge only when you stop rushing them.
          </p>
        </div>

        {/* Bottom fade to cream */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #F7F4F0)' }}
        />
      </section>

      {/* ── Stats ── */}
      <section className="max-w-content mx-auto px-6 md:px-12 -mt-2 mb-24 sm:mb-32">
        <div
          className="grid grid-cols-3 sm:grid-cols-6 border divide-x"
          style={{
            border: '1px solid rgba(44,24,16,0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#F7F4F0',
            borderColor: 'rgba(44,24,16,0.1)',
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 px-4 text-center group hover:bg-cafe-warm transition-colors duration-300"
              style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(44,24,16,0.08)' : 'none' }}
            >
              <span
                className="font-display font-bold text-cafe-dark block mb-1.5 leading-none"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.8rem)', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </span>
              <span className="font-body font-semibold uppercase tracking-[0.16em] text-cafe-muted" style={{ fontSize: '0.6rem' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Origin story ── */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-28 sm:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
          <div className="md:col-span-7">
            <div className="chapter-tag text-cafe-accent-dark mb-6">The Beginning</div>
            <h2
              className="font-display font-normal text-cafe-dark leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.025em' }}
            >
              A roastery on{' '}
              <em className="italic text-cafe-secondary">Mulberry Street</em>
            </h2>
            <div className="space-y-5 font-body font-light leading-relaxed text-cafe-muted" style={{ fontSize: '1.05rem' }}>
              <p>
                What started as a weekend pop-up in a borrowed warehouse quickly became a neighbourhood
                staple. We roasted small batches in a 5kg Probat, served pour-overs to anyone who
                believed coffee deserved patience.
              </p>
              <p>
                The line wrapped around the block that first Saturday morning. Not because we were
                famous — because the coffee smelled like something that took time, and people can
                always tell the difference.
              </p>
              <p>
                 By 2020 we&rsquo;d installed a stone hearth oven and brought in Élodie Marais, a
                third-generation French pastry chef, to bake croissants at 4AM. The neighbourhood
                started waking up to the scent before the sun rose.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <TiltCard className="p-8 sm:p-10" style={{ background: '#F0EBE3' }}>
              <blockquote
                className="font-display font-normal text-cafe-dark leading-tight mb-5"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', letterSpacing: '-0.02em' }}
              >
                &ldquo;Good coffee fuels the morning;{' '}
                <em className="italic text-cafe-secondary">a warm slice of cake feeds the soul.&rdquo;</em>
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px" style={{ background: 'rgba(44,24,16,0.2)' }} />
                <span className="font-body text-sm text-cafe-muted">The founding principle, 2018</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="max-w-content mx-auto px-6 md:px-12 mb-28 sm:mb-36">
        <div className="text-center mb-14 sm:mb-18">
          <div className="chapter-tag text-cafe-accent-dark justify-center mb-4">What Drives Us</div>
          <h2
            className="font-display font-normal text-cafe-dark leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Four pillars,{' '}
            <em className="italic text-cafe-secondary">infinite patience</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => (
            <TiltCard key={i} className="p-8">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(196,167,125,0.1)',
                  border: '1px solid rgba(196,167,125,0.2)',
                  color: '#8B5E3C',
                }}
              >
                {p.icon}
              </div>
              <h3
                className="font-display font-semibold text-cafe-dark mb-3"
                style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', letterSpacing: '-0.01em' }}
              >
                {p.title}
              </h3>
              <p className="font-body text-sm text-cafe-muted leading-relaxed">{p.body}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section
        className="mb-0 py-24 sm:py-32"
        style={{ background: '#1A0F0A' }}
      >
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="chapter-tag mb-4" style={{ color: 'rgba(196,167,125,0.65)' }}>The People</div>
              <h2
                className="font-display font-normal text-white leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)', letterSpacing: '-0.025em' }}
              >
                Behind every cup,{' '}
                <em className="italic" style={{ color: '#C4A77D' }}>a craftsperson</em>
              </h2>
            </div>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 font-body font-medium flex-shrink-0"
              style={{ color: 'rgba(196,167,125,0.7)', fontSize: '0.78rem', letterSpacing: '0.06em' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#C4A77D')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(196,167,125,0.7)')}
            >
              Full history
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <TiltCard key={i} className="p-8">
                {/* Avatar illustration */}
                <div
                  className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 40% 35%, ${member.color}40, ${member.color}18)`,
                    border: `1.5px solid ${member.color}30`,
                    fontSize: '1.5rem',
                    fontFamily: 'serif',
                  }}
                >
                  <span style={{ color: member.color, filter: 'brightness(1.4)' }}>
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3
                  className="font-display font-semibold text-white mb-1"
                  style={{ fontSize: '1.15rem', letterSpacing: '-0.01em' }}
                >
                  {member.name}
                </h3>
                <span
                  className="font-body font-bold tracking-[0.16em] uppercase block mb-4"
                  style={{ fontSize: '0.6rem', color: 'rgba(196,167,125,0.7)' }}
                >
                  {member.role}
                </span>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {member.bio}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28" style={{ background: '#F7F4F0' }}>
        <div className="max-w-content mx-auto px-6 md:px-12 text-center">
          <h2
            className="font-display font-normal text-cafe-dark leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Ready for a{' '}
            <em className="italic text-cafe-secondary">slow morning?</em>
          </h2>
          <p className="font-body font-light text-cafe-muted mb-10 max-w-md mx-auto">
            Reserve a table, explore the menu, or read more about our seven-year journey.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="/#reserve"
              className="btn-2d-primary inline-flex items-center gap-2"
              style={{ padding: '0.9rem 2.2rem', fontSize: '0.7rem' }}
            >
              Reserve a Table
            </a>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 rounded-full font-body font-semibold uppercase tracking-[0.14em]"
              style={{
                padding: '0.9rem 2.2rem',
                fontSize: '0.7rem',
                background: 'rgba(44,24,16,0.06)',
                color: '#2C1810',
                border: '1px solid rgba(44,24,16,0.12)',
                transition: 'all 0.35s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                Object.assign((e.currentTarget as HTMLAnchorElement).style, {
                  background: 'rgba(44,24,16,0.1)',
                  borderColor: 'rgba(44,24,16,0.22)',
                });
              }}
              onMouseLeave={(e) => {
                Object.assign((e.currentTarget as HTMLAnchorElement).style, {
                  background: 'rgba(44,24,16,0.06)',
                  borderColor: 'rgba(44,24,16,0.12)',
                });
              }}
            >
              Our History
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
