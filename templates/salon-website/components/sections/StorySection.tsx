'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

export const StorySection = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
          justifyContent: 'flex-start',
          padding: 'clamp(2rem, 8vh, 6rem) clamp(2rem, 8vw, 10rem)',
          pointerEvents: 'none',
          zIndex: 30,
          opacity: 0,
        }}
      >
        <div
          style={{
            maxWidth: '560px',
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
            In Praise of Pure Form
          </h2>

          <p
            style={{
              fontFamily: sans,
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0 0 2rem 0',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            Haute coiffure as living architecture. Hair sculpted to facial geometry and natural organic movement.
          </p>

          <Link
            href="/story"
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
            <span>The Story</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }
);

StorySection.displayName = 'StorySection';
