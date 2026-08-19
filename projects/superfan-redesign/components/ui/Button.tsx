'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  style = {},
  ...props
}: ButtonProps) => {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-ui)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    transition: 'all 0.25s ease',
    ...style,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #0052cc 0%, #0088ff 100%)',
      color: '#ffffff',
      borderRadius: '9999px',
      boxShadow: '0 4px 18px rgba(0, 82, 204, 0.4)',
      padding: '0.5rem 1.25rem',
      fontSize: '0.65rem',
      fontWeight: 600,
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.04)',
      color: '#ffffff',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.5rem 1rem',
      fontSize: '0.65rem',
    },
    ghost: {
      background: 'transparent',
      color: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '10px',
      border: '1px solid transparent',
      padding: '0.5rem',
    },
    icon: {
      background: 'transparent',
      color: '#ffffff',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.5rem',
    },
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { width: '32px', height: '32px' },
    md: { width: '38px', height: '38px' },
    lg: { width: '44px', height: '44px' },
  };

  const merged = { ...base, ...variants[variant], ...(variant === 'icon' ? sizes[size] : {}) };

  return (
    <button className={className} style={merged} {...props}>
      {children}
    </button>
  );
};
