'use client';

import { useState, useEffect, useRef } from 'react';

interface MenuDropTriggerProps {
  onOpenCookieMenu?: () => void;
}

export function Navigation({ onOpenCookieMenu }: MenuDropTriggerProps) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 80);
      setProgress(maxScroll > 0 ? scrollY / maxScroll : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[10020] pointer-events-none origin-left"
        style={{
          width: '100%',
          background: '#C4A77D',
          transform: `scaleX(${progress})`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Nav bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-[10005] flex items-center justify-between px-6 sm:px-10"
        style={{
          height: '72px',
          background: scrolled ? 'rgba(26, 15, 10, 0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(196, 167, 125, 0.1)' : 'none',
          transition: 'background 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-bottom 0.5s ease',
        }}
      >
        {/* Brand wordmark */}
        <div
          className="select-none pointer-events-none"
          style={{
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            className="font-body font-semibold tracking-[0.22em] uppercase text-white"
            style={{ fontSize: '0.6rem', letterSpacing: '0.22em' }}
          >
            CAFE COFFEE
          </span>
        </div>

        {/* Menu button */}
        <button
          onClick={onOpenCookieMenu}
          className="relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer group"
          style={{
            background: 'rgba(59, 32, 19, 0.9)',
            border: '1.5px solid rgba(196, 167, 125, 0.25)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-label="Open menu"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.06)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(196, 167, 125, 0.3)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = '';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)';
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 drop-shadow-sm">
            <defs>
              <radialGradient id="navDropGrad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#D4A359" />
                <stop offset="45%" stopColor="#7B4222" />
                <stop offset="100%" stopColor="#2A140A" />
              </radialGradient>
            </defs>
            <path
              d="M12 2.5C12 2.5 5 11.5 5 16C5 19.866 8.134 23 12 23C15.866 23 19 19.866 19 16C19 11.5 12 2.5 12 2.5Z"
              fill="url(#navDropGrad)"
              stroke="#FBF8F3"
              strokeWidth="1"
            />
            <path
              d="M9.5 13.5C9.5 11.5 11 8 12 6"
              stroke="#FFF4E0"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="10" cy="16.5" r="0.9" fill="#FFF4E0" opacity="0.9" />
          </svg>
        </button>
      </nav>
    </>
  );
}
