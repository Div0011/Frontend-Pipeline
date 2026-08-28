'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

interface OutroFooterProps {
  onScrollTop?: () => void;
}

export const OutroFooterSection = forwardRef<HTMLDivElement, OutroFooterProps>(
  ({ onScrollTop }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(2rem, 8vh, 6rem) clamp(2rem, 8vw, 10rem)',
          pointerEvents: 'none',
          zIndex: 30,
          opacity: 0,
        }}
      >
        {/* Top Minimal Quote */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: '2rem',
          }}
        >
          <p
            style={{
              fontFamily: serif,
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.2,
              color: '#ffffff',
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
            }}
          >
            « Elegance is not about being noticed, but about being remembered forever. »
          </p>
        </div>

        {/* Bottom Unbordered Footer */}
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            pointerEvents: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: serif,
                fontSize: '1.6rem',
                fontWeight: 300,
                letterSpacing: '0.1em',
                color: '#ffffff',
                marginBottom: '0.4rem',
              }}
            >
              LUMIÈRE
            </div>
            <p
              style={{
                fontFamily: sans,
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              8 Rue de la Paix, 75008 Paris<br />
              Tuesday – Saturday • 09:30 AM – 07:30 PM
            </p>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link
              href="/story"
              style={{
                fontFamily: sans,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
              }}
            >
              The Story
            </Link>
            <Link
              href="/about"
              style={{
                fontFamily: sans,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
              }}
            >
              The Atelier
            </Link>
            <Link
              href="/catalogue"
              style={{
                fontFamily: sans,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
              }}
            >
              The Catalogue
            </Link>
            <Link
              href="/booking"
              style={{
                fontFamily: sans,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              The Booking
            </Link>
          </div>

          <button
            type="button"
            onClick={onScrollTop}
            style={{
              fontFamily: sans,
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            &uarr; Back to Top
          </button>
        </div>
      </div>
    );
  }
);

OutroFooterSection.displayName = 'OutroFooterSection';
