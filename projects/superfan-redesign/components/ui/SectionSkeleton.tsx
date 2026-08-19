'use client';

import React from 'react';

export const SectionSkeleton: React.FC<{ height?: string }> = ({ height = '60vh' }) => (
  <div
    style={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, rgba(10,25,47,0) 0%, rgba(0,82,204,0.03) 100%)',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '2px solid rgba(0, 200, 248, 0.15)',
        borderTopColor: 'var(--color-arctic-cyan)',
        borderRadius: '50%',
        animation: 'spinSlow 1s linear infinite',
      }}
      aria-hidden="true"
    />
  </div>
);
