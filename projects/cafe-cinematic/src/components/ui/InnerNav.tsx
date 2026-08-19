'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const LINKS = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/history', label: 'History' },
  { href: '/gallery', label: 'Gallery' },
];

export function InnerNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 60);
      setProgress(maxScroll > 0 ? scrollY / maxScroll : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = pathname === '/menu' || pathname === '/gallery';

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[10020] pointer-events-none origin-left"
        style={{ width: '100%', background: '#C4A77D', transform: `scaleX(${progress})`, transition: 'transform 0.1s linear' }}
      />

      <nav
        className="fixed top-0 left-0 right-0 z-[10005]"
        style={{
          height: '68px',
          background: scrolled
            ? isDark
              ? 'rgba(13, 7, 5, 0.88)'
              : 'rgba(247, 244, 240, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.6)' : 'none',
          borderBottom: scrolled
            ? `1px solid ${isDark ? 'rgba(196,167,125,0.1)' : 'rgba(44,24,16,0.08)'}`
            : 'none',
          transition: 'background 0.5s cubic-bezier(0.16,1,0.3,1), border-bottom 0.4s ease',
        }}
      >
        <div className="max-w-content mx-auto px-6 sm:px-10 h-full flex items-center justify-between">

          {/* Left — back + brand */}
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              style={{
                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(44,24,16,0.45)',
                transition: 'color 0.3s ease',
                fontSize: '0.78rem',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#C4A77D')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(44,24,16,0.45)')}
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-body font-semibold tracking-[0.2em] uppercase" style={{ fontSize: '0.6rem' }}>Home</span>
            </Link>
            <div className="w-px h-4" style={{ background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(44,24,16,0.12)' }} />
            <span
              className="font-body font-bold tracking-[0.22em] uppercase select-none"
              style={{ fontSize: '0.6rem', color: isDark ? 'rgba(255,255,255,0.7)' : '#2C1810' }}
            >
              CAFE COFFEE
            </span>
          </div>

          {/* Center — page links */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-1.5 rounded-full font-body font-medium transition-all duration-300"
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: isActive
                      ? '#C4A77D'
                      : isDark
                      ? 'rgba(255,255,255,0.5)'
                      : 'rgba(44,24,16,0.55)',
                    background: isActive ? 'rgba(196,167,125,0.12)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#C4A77D';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLAnchorElement).style.color = isDark
                        ? 'rgba(255,255,255,0.5)'
                        : 'rgba(44,24,16,0.55)';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#C4A77D' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right — Reserve */}
          <Link
            href="/#reserve"
            className="btn-2d-primary hidden sm:inline-flex"
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.62rem' }}
          >
            Reserve
          </Link>
        </div>
      </nav>
    </>
  );
}
