'use client';

import React from 'react';

interface NavArrowsProps {
  items?: { href: string; label: string }[];
}

export function NavArrows({ items = [] }: NavArrowsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: 'fixed',
        right: 'clamp(1.5rem, 3vw, 3rem)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          aria-label={item.label}
          title={item.label}
          className="glass-card"
          style={{
            width: 'clamp(36px, 4vw, 48px)',
            height: 'clamp(36px, 4vw, 48px)',
            fontSize: 'clamp(1rem, 1.5vw, 1.35rem)',
            textDecoration: 'none',
            transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(255,255,255,0.85)';
            el.style.color = '#ffffff';
            el.style.transform = 'scale(1.12)';
            el.style.background = 'rgba(0,0,0,0.35)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(255,255,255,0.25)';
            el.style.color = 'rgba(255,255,255,0.55)';
            el.style.transform = 'scale(1)';
            el.style.background = 'rgba(0,0,0,0.15)';
          }}
        >
          →
        </a>
      ))}
    </nav>
  );
}
