'use client';

import { useState } from 'react';
import { playCookieCrack } from '@/lib/soundFx';

export interface CookieConfig {
  id: string;
  name: string;
  categoryTitle: string;
  cookieFlavor: string;
  baseColor: string;
  accentColor: string;
  chipColor: string;
  tagline: string;
  sectionTarget?: string;
}

interface CookieDiscProps {
  cookie: CookieConfig;
  isEaten: boolean;
  isSelected: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function CookieDisc({
  cookie,
  isEaten,
  isSelected,
  onClick,
  size = 'md',
}: CookieDiscProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [crumbs, setCrumbs] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);

  const dimensions = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
  }[size];

  const handleClick = (e: React.MouseEvent) => {
    // Generate flying crumbs on click
    const newCrumbs = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60 - 20,
      size: Math.random() * 5 + 3,
      color: Math.random() > 0.4 ? cookie.baseColor : cookie.chipColor,
    }));
    setCrumbs(newCrumbs);
    setTimeout(() => setCrumbs([]), 650);

    // Play crisp procedural cookie crack audio
    playCookieCrack();

    onClick();
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none group">
      {/* Crumb Particles Explosion */}
      {crumbs.map((crumb) => (
        <span
          key={crumb.id}
          className="absolute z-30 pointer-events-none rounded-full animate-ping"
          style={{
            width: `${crumb.size}px`,
            height: `${crumb.size}px`,
            backgroundColor: crumb.color,
            border: '1px solid #2A1A12',
            transform: `translate(${crumb.x}px, ${crumb.y}px)`,
          }}
        />
      ))}

      {/* Interactive Cookie SVG Button */}
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative ${dimensions} rounded-full transition-transform duration-300 focus:outline-none cursor-pointer ${
          isHovered ? 'scale-110 rotate-3' : ''
        } ${isSelected ? 'scale-105 drop-shadow-[0_8px_16px_rgba(42,26,18,0.3)]' : ''}`}
        aria-label={cookie.name}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[3px_4px_0px_#2A1A12] transition-all duration-300"
        >
          <defs>
            {/* Bite Mask for Half-Cookie State */}
            <clipPath id={`bite-mask-${cookie.id}`}>
              {isEaten ? (
                // Jagged bite cut-out creating half cookie
                <path d="M 0 0 L 60 0 C 62 15, 75 15, 74 30 C 72 45, 90 48, 85 65 C 80 80, 95 90, 85 105 C 75 115, 60 120, 0 120 Z" />
              ) : (
                <rect x="0" y="0" width="120" height="120" />
              )}
            </clipPath>

            {/* Radial Gradient for Baked Cookie Look */}
            <radialGradient id={`cookie-grad-${cookie.id}`} cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor={cookie.accentColor} />
              <stop offset="70%" stopColor={cookie.baseColor} />
              <stop offset="100%" stopColor="#8C532B" />
            </radialGradient>
          </defs>

          {/* Cookie Body with Clip Path */}
          <g clipPath={`url(#bite-mask-${cookie.id})`}>
            {/* Outer Crust */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill={`url(#cookie-grad-${cookie.id})`}
              stroke="#2A1A12"
              strokeWidth="3.5"
            />

            {/* Texture Cracks & Baked Rings */}
            <path
              d="M 28 42 Q 40 38 48 46"
              stroke="#6B3A19"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 72 75 Q 60 85 45 80"
              stroke="#6B3A19"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 78 36 Q 68 45 62 40"
              stroke="#6B3A19"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Chocolate Chips / Morsels */}
            <ellipse cx="40" cy="35" rx="6" ry="5" fill={cookie.chipColor} stroke="#2A1A12" strokeWidth="1.5" />
            <ellipse cx="68" cy="30" rx="7" ry="5.5" fill={cookie.chipColor} stroke="#2A1A12" strokeWidth="1.5" />
            <ellipse cx="32" cy="70" rx="7" ry="6" fill={cookie.chipColor} stroke="#2A1A12" strokeWidth="1.5" />
            <ellipse cx="58" cy="62" rx="6.5" ry="5" fill={cookie.chipColor} stroke="#2A1A12" strokeWidth="1.5" />
            <ellipse cx="80" cy="55" rx="6" ry="5.5" fill={cookie.chipColor} stroke="#2A1A12" strokeWidth="1.5" />
            <ellipse cx="54" cy="90" rx="7" ry="5" fill={cookie.chipColor} stroke="#2A1A12" strokeWidth="1.5" />

            {/* Sugar Crystals / Sparkles */}
            <circle cx="50" cy="48" r="1.5" fill="#FFF8E7" opacity="0.8" />
            <circle cx="45" cy="78" r="1.5" fill="#FFF8E7" opacity="0.8" />
            <circle cx="70" cy="72" r="1.5" fill="#FFF8E7" opacity="0.8" />
            <circle cx="28" cy="55" r="1.5" fill="#FFF8E7" opacity="0.8" />
          </g>

          {/* Half-Cookie Jagged Edge */}
          {isEaten && (
            <path
              d="M 60 0 C 62 15, 75 15, 74 30 C 72 45, 90 48, 85 65 C 80 80, 95 90, 85 105 C 75 115, 60 120, 60 120"
              stroke="#2A1A12"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {/* Clean Label Under Cookie */}
      <div className="text-center mt-2 space-y-0.5 max-w-[130px]">
        <span className="text-xs font-display font-bold text-cafe-text block leading-tight group-hover:text-cafe-secondary transition-colors">
          {cookie.name}
        </span>
        <span className="text-[0.65rem] font-mono text-cafe-text-muted block">
          {cookie.categoryTitle}
        </span>
      </div>
    </div>
  );
}
