'use client';

import React from 'react';

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      data-cursor="hover"
      style={{
        position: 'fixed',
        top: '-100%',
        left: 'var(--space-8)',
        zIndex: 1000000,
        padding: '0.75rem 1.25rem',
        background: 'var(--color-primary-blue)',
        color: '#ffffff',
        fontFamily: 'var(--font-ui)',
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        borderRadius: '0 0 8px 8px',
        textDecoration: 'none',
        transition: 'top 0.2s ease',
      }}
      onFocus={(e) => { e.currentTarget.style.top = '0'; }}
      onBlur={(e) => { e.currentTarget.style.top = '-100%'; }}
    >
      Skip to main content
    </a>
  );
};
