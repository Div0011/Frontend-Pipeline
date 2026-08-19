'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const serif = 'var(--font-display)';

interface HeaderProps {
  activeSection?: string;
  onNavigate?: (sectionKey: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate('hero');
    } else {
      router.push('/');
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '2rem',
        left: '2.5rem',
        zIndex: 90,
        pointerEvents: 'auto',
      }}
    >
      <button
        type="button"
        onClick={handleLogoClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'block',
          outline: 'none',
        }}
      >
        <span
          style={{
            fontFamily: serif,
            fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
            fontWeight: 300,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          LUMIÈRE
        </span>
      </button>
    </header>
  );
}
