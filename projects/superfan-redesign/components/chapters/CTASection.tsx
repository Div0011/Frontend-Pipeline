'use client';

import React, { useRef, useEffect } from 'react';
import { useCart } from '../../lib/cart-context';
import { PRODUCTS } from '../../lib/data';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const CTASection: React.FC = () => {
  const { addToCart } = useCart();
  const defaultProduct = PRODUCTS[0];
  const sectionRef = useRef<HTMLElement>(null);

  // Particle field using CSS pseudo-elements via style injection
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #020c1b 0%, #030e20 50%, #020c1b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Particle field */}
      {particles.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.id % 3 === 0 ? '#00c8f8' : p.id % 3 === 1 ? '#0052cc' : '#d4af75',
            opacity: p.opacity,
            animation: `particlePulse ${p.duration}s ${p.delay}s ease-in-out infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes particlePulse {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.8); }
        }
      `}</style>

      {/* Large ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,82,204,0.2) 0%, rgba(0,200,248,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>

        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.62rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#00c8f8',
            fontWeight: 700,
            marginBottom: '1.5rem',
            border: '1px solid rgba(0,200,248,0.25)',
            padding: '0.35rem 1.1rem',
            borderRadius: '9999px',
            background: 'rgba(0,200,248,0.06)',
          }}
        >
          Ready to Refine Your Air?
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '1.5rem',
            background: 'linear-gradient(125deg, #ffffff 0%, rgba(255,255,255,0.85) 40%, #00c8f8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Elevate Your<br />Ceiling Atmosphere
        </h2>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.68,
          }}
        >
          Every Superfan ships with complimentary insured pan-India delivery, a 5-Year On-Site Replacement Warranty, and 69% guaranteed power savings.
        </p>

        {/* Trust badges as icon tiles */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {[
            { icon: <Truck size={18} color="#00c8f8" />, label: 'Free Insured Delivery', sub: 'Pan-India Express' },
            { icon: <ShieldCheck size={18} color="#00c8f8" />, label: '5-Year Warranty', sub: 'Doorstep Motor Service' },
            { icon: <RefreshCw size={18} color="#d4af75" />, label: '30-Day Returns', sub: 'No Questions Asked' },
          ].map((badge) => (
            <div
              key={badge.label}
              style={{
                padding: '1rem 1.4rem',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,200,248,0.25)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,200,248,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              {badge.icon}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>{badge.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.1rem' }}>{badge.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button with shimmer */}
        <button
          onClick={() => addToCart(defaultProduct)}
          className="btn-8state btn-primary btn-shimmer"
          style={{
            padding: '1.2rem 3.5rem',
            fontSize: '0.9rem',
            letterSpacing: '0.12em',
            fontWeight: 700,
            boxShadow: '0 10px 45px rgba(0,82,204,0.6), 0 0 60px rgba(0,200,248,0.15)',
          }}
        >
          Order Flagship SuperQ Lux <ArrowRight size={18} style={{ marginLeft: '0.35rem' }} />
        </button>

        <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          In Stock · Ships within 3–5 business days
        </div>
      </div>
    </section>
  );
};
