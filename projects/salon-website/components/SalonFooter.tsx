'use client';

import React from 'react';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

interface SalonFooterProps {
  onOpenBookingForm: () => void;
}

export function SalonFooter({ onOpenBookingForm }: SalonFooterProps) {
  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        background: 'transparent', // 100% TRANSPARENT BACKGROUND (No background)
        color: '#f5f3ef',
        padding: '3rem 2rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        pointerEvents: 'all',
      }}
    >
      {/* Brand Title */}
      <h2
        style={{
          fontFamily: serif,
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          margin: '0 0 1.25rem',
          color: '#ffffff',
          textShadow: '0 4px 30px rgba(0,0,0,0.6)',
        }}
      >
        LUMIÈRE
      </h2>

      {/* Stylish CTA with Arrow leading to magazine form page */}
      <button
        type="button"
        onClick={onOpenBookingForm}
        className="glass-cta"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.8rem',
          fontFamily: sans,
          fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#e6c687',
          borderRadius: '100px',
          padding: '1.1rem 2.8rem',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#e6c687';
          (e.currentTarget as HTMLButtonElement).style.color = '#0b0b0c';
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.03)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.color = '#e6c687';
          (e.currentTarget as HTMLButtonElement).style.transform = 'none';
        }}
      >
        <span>BOOK NOW</span>
        <span style={{ fontSize: '1.2rem', transition: 'transform 0.25s ease' }}>→</span>
      </button>

      {/* Sub-caption */}
      <p
        style={{
          fontFamily: sans,
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(245, 243, 239, 0.5)',
          marginTop: '2rem',
          margin: '2rem 0 0',
        }}
      >
        © {new Date().getFullYear()} LUMIÈRE HAUTE COIFFURE · 12 RUE DU FAUBOURG, PARIS 8e
      </p>
    </footer>
  );
}
