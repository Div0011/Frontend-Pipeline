'use client';

import React, { useEffect, useState } from 'react';
import SuperfanLogo from '../shared/SuperfanLogo';

const useClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        timeZone: 'Asia/Kolkata',
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const TickerSegment: React.FC = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem', padding: '0 1.5rem' }}>
    <span style={{ color: 'rgba(0,200,248,0.45)', fontSize: '0.45rem' }}>◆</span>
    <span>India's First BLDC Ceiling Fan</span>
    <span style={{ color: 'rgba(0,200,248,0.45)', fontSize: '0.45rem' }}>◆</span>
    <span>Patented Sensorless Motor Technology</span>
    <span style={{ color: 'rgba(0,200,248,0.45)', fontSize: '0.45rem' }}>◆</span>
    <span>35W · 230 CMM Airflow · &lt;32dB</span>
    <span style={{ color: 'rgba(0,200,248,0.45)', fontSize: '0.45rem' }}>◆</span>
    <span>500,000+ Tons CO₂ Prevented</span>
    <span style={{ color: 'rgba(0,200,248,0.45)', fontSize: '0.45rem' }}>◆</span>
    <span>BEE 5-Star Certified</span>
    <span style={{ color: 'rgba(0,200,248,0.45)', fontSize: '0.45rem' }}>◆</span>
    <span>myQ Offline Voice Control</span>
    <span style={{ color: 'rgba(0,200,248,0.45)', fontSize: '0.45rem' }}>◆</span>
    <span>Coimbatore, Tamil Nadu · Est. 2012</span>
    <span style={{ color: 'rgba(0,200,248,0.45)', fontSize: '0.45rem' }}>◆</span>
    <span>5-Year On-Site Motor Warranty</span>
  </span>
);

const FOOTER_COLS = [
  {
    heading: 'Brand',
    links: [
      { label: 'About Superfan', href: '#' },
      { label: 'Our Technology', href: '#technology' },
      { label: 'Sustainability', href: '#' },
      { label: 'Press & Media', href: '#' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'SuperQ Lux', href: '#showcase' },
      { label: 'SuperQ Pro', href: '#collection' },
      { label: 'All Collections', href: '#collection' },
      { label: '3D Configurator', href: '#showcase' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'FAQ & Help', href: '#faq' },
      { label: 'Warranty Claims', href: '#' },
      { label: 'Installation Guide', href: '#' },
      { label: 'Contact Us', href: 'tel:18004257873' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Instagram ↗', href: 'https://instagram.com' },
      { label: 'info@superfan.in ↗', href: 'mailto:info@superfan.in' },
      { label: '1800 425 7873', href: 'tel:18004257873' },
      { label: 'Superfan.in ↗', href: '#' },
    ],
  },
];

export const Footer: React.FC = () => {
  const time = useClock();

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#010810',
        overflow: 'hidden',
        color: '#ffffff',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Top gradient hairline */}
      <div
        aria-hidden="true"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,82,204,0.6) 20%, rgba(0,200,248,0.85) 50%, rgba(0,82,204,0.6) 80%, transparent 100%)',
        }}
      />

      {/* 4-Column Grid */}
      <div
        className="container-custom"
        style={{
          padding: 'clamp(3rem, 5vw, 4.5rem) 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '3rem',
        }}
      >
        {FOOTER_COLS.map((col) => (
          <div key={col.heading}>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(0,200,248,0.6)',
                marginBottom: '1.25rem',
              }}
            >
              {col.heading}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {col.links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      fontFamily: 'var(--font-body)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

      {/* Bottom info bar: Logo + Tagline + Clock */}
      <div
        className="container-custom"
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <SuperfanLogo />
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 300,
              background: 'linear-gradient(130deg, #ffffff 0%, rgba(160,210,255,0.9) 40%, rgba(0,200,248,0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2,
              marginTop: '0.3rem',
            }}
          >
            Engineered Silence.™
          </p>
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-ui)' }}>
            © {new Date().getFullYear()} Versa Drives Private Limited
          </span>
        </div>

        {/* City clocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {['COIMBATORE / HQ', 'NEW DELHI'].map((city) => (
            <div key={city} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', minWidth: '90px', fontFamily: 'var(--font-ui)' }}>
                {city}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '4px',
                  padding: '0.2rem 0.65rem',
                  minWidth: '78px',
                  textAlign: 'center',
                }}
              >
                {time || '──:──:──'}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.5rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,200,248,0.6)',
                  background: 'rgba(0,200,248,0.05)',
                  border: '1px solid rgba(0,200,248,0.14)',
                  borderRadius: '4px',
                  padding: '0.2rem 0.5rem',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(0,200,248,0.7)', display: 'inline-block' }} />
                OPEN
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Giant Wordmark */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          overflow: 'hidden',
          lineHeight: 0.82,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '55%',
            background: 'linear-gradient(to bottom, #010810 0%, transparent 100%)',
            zIndex: 2,
          }}
        />
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(7rem, 23vw, 22rem)',
            fontWeight: 700,
            letterSpacing: '-0.055em',
            whiteSpace: 'nowrap',
            lineHeight: 0.85,
            paddingLeft: '0.3vw',
            paddingBottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(120,190,255,0.22) 30%, rgba(0,130,255,0.18) 55%, rgba(0,50,180,0.14) 80%, rgba(0,200,248,0.1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            zIndex: 1,
          }}
        >
          SUPERFAN
        </span>
      </div>

      {/* Marquee Ticker */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
          padding: '0.65rem 0',
          background: 'rgba(0,15,50,0.35)',
        }}
      >
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .sf-ticker {
            display: inline-flex;
            white-space: nowrap;
            animation: marquee-scroll 30s linear infinite;
          }
          .sf-ticker:hover { animation-play-state: paused; }
        `}</style>

        <div className="sf-ticker">
          {[0, 1].map((k) => (
            <span
              key={k}
              aria-hidden={k === 1 ? true : undefined}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.52rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.18)',
              }}
            >
              <TickerSegment />
              <TickerSegment />
              <TickerSegment />
              <TickerSegment />
            </span>
          ))}
        </div>
      </div>

      {/* Colophon */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: 'clamp(1.5rem,3vw,2rem)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.48rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.14)',
          fontFamily: 'var(--font-ui)',
        }}
      >
        <span>Cinematic experience crafted with Next.js, GSAP, Lenis, and custom WebGL shaders</span>
        <span>Typography: Cormorant Garamond · DM Mono · Outfit</span>
      </div>
    </footer>
  );
};
