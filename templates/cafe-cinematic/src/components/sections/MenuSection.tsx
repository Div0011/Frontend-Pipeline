'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const MENU_ITEMS = {
  coffee: [
    {
      name: 'Single-Origin Pour Over',
      price: '$6.50',
      origin: 'Ethiopia · Yirgacheffe',
      desc: 'Rotating seasonal micro-lots, brewed with precision on V60.',
    },
    {
      name: 'Signature Cortado',
      price: '$4.75',
      origin: 'Colombia · Huila',
      desc: 'Double ristretto cut with silky, perfectly textured micro-foam.',
    },
    {
      name: '18-Hour Cold Drip',
      price: '$5.50',
      origin: 'Guatemala · Antigua',
      desc: 'Slow-steeped gravity extraction yielding a smooth, chocolatey profile.',
    },
    {
      name: 'Ceremonial Matcha Latte',
      price: '$5.75',
      origin: 'Japan · Uji',
      desc: 'Stone-ground ceremonial grade whisked into warm oat milk.',
    },
  ],
  pastry: [
    {
      name: 'Classic Butter Croissant',
      price: '$4.50',
      tag: 'Signature',
      desc: 'Laminated with imported French butter, baked fresh every morning.',
    },
    {
      name: 'Double Fudge Truffle Cookie',
      price: '$4.00',
      tag: 'Fan Favourite',
      desc: '70% Valrhona cocoa, crisp edges, and a molten centre.',
    },
    {
      name: 'Cardamom Morning Bun',
      price: '$5.00',
      tag: 'Seasonal',
      desc: 'Flaky dough dusted with spiced sugar and roasted citrus zest.',
    },
    {
      name: 'Basque Cheesecake Slice',
      price: '$7.50',
      tag: 'House Special',
      desc: 'Deeply caramelised, custardy, and served barely cooled from the oven.',
    },
  ],
};

interface MenuItemProps {
  name: string;
  price: string;
  desc: string;
  tag?: string;
  origin?: string;
  delay?: number;
}

function MenuItem({ name, price, desc, tag, origin, delay = 0 }: MenuItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = '';
    setTimeout(() => { if (el) el.style.transition = ''; }, 500);
  };

  return (
    <div
      ref={ref}
      className="group menu-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '1.25rem 0',
        cursor: 'default',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3 flex-1">
          <h4
            className="font-display font-medium text-white group-hover:text-cafe-accent transition-colors duration-300"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', letterSpacing: '-0.01em' }}
          >
            {name}
          </h4>
          {(tag || origin) && (
            <span
              className="text-[0.58rem] font-body font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: 'rgba(196, 167, 125, 0.1)',
                color: 'rgba(196, 167, 125, 0.7)',
                border: '1px solid rgba(196, 167, 125, 0.15)',
              }}
            >
              {tag ?? origin}
            </span>
          )}
        </div>
        <span
          className="font-body font-semibold tabular-nums flex-shrink-0"
          style={{ color: '#C4A77D', fontSize: '0.95rem' }}
        >
          {price}
        </span>
      </div>
      <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {desc}
      </p>
      {/* Hover underline */}
      <div
        className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: 'rgba(196, 167, 125, 0.25)', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
    </div>
  );
}

export function MenuSection() {
  return (
    <section
      id="menu"
      className="relative min-h-screen py-28 sm:py-36"
      style={{ background: '#0D0705' }}
    >
      {/* Subtle vignette gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(196,167,125,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-20 sm:mb-28 reveal">
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{
              fontSize: '0.62rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(196, 167, 125, 0.7)',
            }}
          >
            <span style={{ display: 'block', width: '20px', height: '1px', background: 'currentColor' }} />
            The Menu
            <span style={{ display: 'block', width: '20px', height: '1px', background: 'currentColor' }} />
          </div>
          <h2
            className="font-display font-normal text-white leading-tight"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 5.5rem)',
              letterSpacing: '-0.025em',
            }}
          >
            Curated{' '}
            <em className="italic" style={{ color: '#C4A77D' }}>Offerings</em>
          </h2>
          <p
            className="font-body max-w-lg mx-auto mt-6 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}
          >
            Single-origin extractions and dawn-baked viennoiserie, crafted with
            the same unhurried attention to detail.
          </p>
        </div>

        {/* ── Two-column menu ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 sm:mb-28">

          {/* Coffee */}
          <div className="reveal reveal-delay-1">
            <div
              className="flex items-center gap-4 mb-8 pb-5"
              style={{ borderBottom: '1px solid rgba(196, 167, 125, 0.12)' }}
            >
              <h3
                className="font-display font-normal"
                style={{ color: '#C4A77D', fontSize: 'clamp(1.35rem, 2vw, 1.75rem)', letterSpacing: '-0.01em' }}
              >
                Coffee &amp; Espresso
              </h3>
              <div className="flex-1 h-px" style={{ background: 'rgba(196,167,125,0.1)' }} />
            </div>
            <div>
              {MENU_ITEMS.coffee.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <MenuItem {...item} delay={i * 60} />
                </div>
              ))}
            </div>
          </div>

          {/* Pastries */}
          <div className="reveal reveal-delay-2">
            <div
              className="flex items-center gap-4 mb-8 pb-5"
              style={{ borderBottom: '1px solid rgba(196, 167, 125, 0.12)' }}
            >
              <h3
                className="font-display font-normal"
                style={{ color: '#C4A77D', fontSize: 'clamp(1.35rem, 2vw, 1.75rem)', letterSpacing: '-0.01em' }}
              >
                Dawn Viennoiserie
              </h3>
              <div className="flex-1 h-px" style={{ background: 'rgba(196,167,125,0.1)' }} />
            </div>
            <div>
              {MENU_ITEMS.pastry.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <MenuItem {...item} delay={i * 60} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center reveal reveal-delay-3">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 rounded-full font-body font-semibold uppercase tracking-[0.14em]"
            style={{
              padding: '0.9rem 2.5rem',
              fontSize: '0.7rem',
              background: 'rgba(196, 167, 125, 0.1)',
              color: '#C4A77D',
              border: '1px solid rgba(196, 167, 125, 0.25)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              Object.assign((e.currentTarget as HTMLAnchorElement).style, {
                background: 'rgba(196, 167, 125, 0.2)',
                borderColor: 'rgba(196, 167, 125, 0.5)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(196, 167, 125, 0.15)',
              });
            }}
            onMouseLeave={(e) => {
              Object.assign((e.currentTarget as HTMLAnchorElement).style, {
                background: 'rgba(196, 167, 125, 0.1)',
                borderColor: 'rgba(196, 167, 125, 0.25)',
                transform: '',
                boxShadow: '',
              });
            }}
          >
            <span>Explore Full Menu</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
