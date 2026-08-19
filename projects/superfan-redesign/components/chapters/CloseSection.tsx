'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

const TIMELINE = [
  { year: '2012', event: 'Founded in Coimbatore' },
  { year: '2016', event: 'India\'s First BLDC Fan' },
  { year: '2019', event: 'myQ Offline Voice Control' },
  { year: '2022', event: 'National Energy Award' },
  { year: '2024', event: 'SuperQ Lux Launch' },
];

export const CloseSection: React.FC = () => {
  return (
    <section
      style={{
        padding: '8rem 0 6rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #020c1b 0%, #030e22 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top separator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,200,248,0.3), transparent)',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,82,204,0.14) 0%, transparent 65%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>

        {/* Badge */}
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.62rem',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#00c8f8',
            fontWeight: 700,
            marginBottom: '2rem',
            border: '1px solid rgba(0,200,248,0.2)',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(0,200,248,0.06)',
          }}
        >
          Versa Drives Private Limited — Coimbatore, India — Est. 2012
        </span>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.92)',
            maxWidth: '860px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          "True engineering luxury is quiet,{' '}
          <span style={{ color: '#00c8f8', fontStyle: 'normal' }}>efficient</span>,
          and built to outlast generations."
        </blockquote>

        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', maxWidth: '520px', margin: '0 auto 4rem', lineHeight: 1.7 }}>
          A decade of BLDC innovation. 150,000+ homes upgraded. 500,000+ metric tons of CO₂ prevented.
        </p>

        {/* Timeline strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            marginBottom: '4rem',
            overflowX: 'auto',
            padding: '0 1rem',
          }}
        >
          {TIMELINE.map((item, i) => (
            <React.Fragment key={item.year}>
              <div style={{ textAlign: 'center', padding: '0 1.5rem', flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: i === TIMELINE.length - 1 ? '#00c8f8' : '#ffffff',
                    marginBottom: '0.35rem',
                  }}
                >
                  {item.year}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', maxWidth: '90px' }}>
                  {item.event}
                </div>
              </div>
              {i < TIMELINE.length - 1 && (
                <div
                  style={{
                    height: '1px',
                    width: '40px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(0,200,248,0.3), rgba(255,255,255,0.15))',
                    flexShrink: 0,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="#showcase"
            className="btn-8state btn-primary btn-shimmer"
            style={{ padding: '1.1rem 2.8rem', fontSize: '0.88rem', boxShadow: '0 8px 35px rgba(0,82,204,0.5)' }}
          >
            Order Superfan Today <ArrowRight size={16} />
          </a>
          <a
            href="#technology"
            className="btn-8state btn-secondary"
            style={{ padding: '1.1rem 2.2rem', fontSize: '0.88rem' }}
          >
            Explore 3D Motor
          </a>
        </div>

        <div style={{ marginTop: '5rem', fontSize: '0.65rem', color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-ui)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          © {new Date().getFullYear()} Superfan (Versa Drives Pvt. Ltd.) · BEE 5-Star Certified · 5-Year Warranty
        </div>
      </div>
    </section>
  );
};
