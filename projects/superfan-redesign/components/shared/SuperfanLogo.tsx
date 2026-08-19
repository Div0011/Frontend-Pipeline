'use client';

import React from 'react';

interface SuperfanLogoProps {
  width?: number;
  height?: number;
  className?: string;
  /** If true, renders in gradient white→blue for dark backgrounds (default) */
  variant?: 'default' | 'mono-white' | 'gradient';
  /** Override font size; defaults auto from height */
  fontSize?: string;
}

export const SuperfanLogo: React.FC<SuperfanLogoProps> = ({
  height = 32,
  className,
  variant = 'default',
  fontSize,
}) => {
  const fs = fontSize || `${Math.round(height * 0.72)}px`;

  const wordmarkStyle: React.CSSProperties =
    variant === 'gradient'
      ? {
          background: 'linear-gradient(120deg, #ffffff 0%, rgba(0,212,255,0.9) 55%, rgba(0,82,204,1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }
      : { color: '#ffffff' };

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        fontFamily: 'var(--font-display)',
        fontSize: fs,
        fontWeight: 400,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        userSelect: 'none',
        ...wordmarkStyle,
      }}
    >
      <span style={{ fontStyle: 'italic' }}>superfan</span>
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: `${Math.round(height * 0.28)}px`,
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: variant === 'gradient' ? undefined : '#00d4ff',
          WebkitTextFillColor: variant === 'gradient' ? '#00d4ff' : undefined,
          border: '1px solid rgba(0, 212, 255, 0.45)',
          padding: '0.18rem 0.5rem',
          borderRadius: '3px',
          background: 'rgba(0, 212, 255, 0.08)',
          flexShrink: 0,
          fontStyle: 'normal',
          lineHeight: 1.4,
        }}
      >
        BLDC
      </span>
    </div>
  );
};

export default SuperfanLogo;
