'use client';

import React, { forwardRef } from 'react';

const serif = 'var(--font-display)';

export const MinimalHero = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 30,
        }}
      >
        <h1
          style={{
            fontFamily: serif,
            fontSize: 'clamp(4.5rem, 15vw, 12rem)',
            fontWeight: 300,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: '#ffffff',
            textShadow: '0 20px 80px rgba(0, 0, 0, 0.9)',
            margin: 0,
          }}
        >
          LUMIÈRE
        </h1>
      </div>
    );
  }
);

MinimalHero.displayName = 'MinimalHero';
