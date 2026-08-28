'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

export const BookingSection = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(2rem, 8vh, 6rem) clamp(2rem, 8vw, 10rem)',
          pointerEvents: 'none',
          zIndex: 30,
          opacity: 0,
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            textAlign: 'center',
            pointerEvents: 'auto',
          }}
        >
          <h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
              margin: '0 0 1.25rem 0',
            }}
          >
            Private Appointments
          </h2>

          <p
            style={{
              fontFamily: sans,
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0 auto 2rem auto',
              maxWidth: '520px',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            Reserved exclusively for bespoke private suite ceremonies and tailored consultation.
          </p>

          <Link
            href="/booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: sans,
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              padding: '0.8rem 1.8rem',
              borderRadius: '100px',
              transition: 'background 0.3s ease',
            }}
          >
            <span>The Booking</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }
);

BookingSection.displayName = 'BookingSection';
