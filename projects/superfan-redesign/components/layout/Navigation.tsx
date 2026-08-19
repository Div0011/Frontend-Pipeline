'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../../lib/cart-context';
import {
  ShoppingBag,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import { ViewTransitionLink } from '../shared/ViewTransitionLink';
import SuperfanLogo from '../shared/SuperfanLogo';

const SECTIONS = [
  { id: 'showcase',    label: 'Explore',   sub: 'SuperQ Lux',              idx: '01' },
  { id: 'technology',  label: 'Tech',      sub: '3D CAD Motor',            idx: '02' },
  { id: 'calculator',  label: 'Impact',    sub: 'Savings Calculator',      idx: '03' },
  { id: 'testimonials',label: 'Proof',     sub: 'Awards & Testimonials',   idx: '04' },
  { id: 'collection',  label: 'Customize', sub: 'All 12 Models',           idx: '05' },
  { id: 'faq',         label: 'Help',      sub: 'FAQ & Warranty',          idx: '06' },
];

export const Navigation: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsComparisonOpen, isSoundPlaying, setIsSoundPlaying } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<number>(-1);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, sIdx) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sIdx);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMenu = () => {
    setIsClosing(false);
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = useCallback(() => {
    setIsClosing(true);
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const idx = parseInt(e.key, 10);
      if (idx >= 1 && idx <= SECTIONS.length) {
        const section = SECTIONS[idx - 1];
        if (section) {
          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
          closeMenu();
        }
      }
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* Fixed Header */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 9000,
          padding: scrolled ? '0.7rem 0' : '1.15rem 0',
          backgroundColor: scrolled ? 'rgba(2, 12, 27, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 200, 248, 0.1)' : '1px solid transparent',
          transition: 'all 0.45s var(--ease-expo-out)',
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <ViewTransitionLink
            href="/"
            className="view-transition-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
            aria-label="Superfan Home"
          >
            <SuperfanLogo />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'var(--color-arctic-cyan)',
                textTransform: 'uppercase',
                borderLeft: '1px solid rgba(0, 200, 248, 0.22)',
                paddingLeft: '0.75rem',
                lineHeight: 1.3,
                opacity: 0.8,
              }}
              className="hidden sm:inline"
            >
              35W BLDC<br />INDIA
            </span>
          </ViewTransitionLink>

          {/* Section Dot Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              padding: '0.5rem 0.85rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(12px)',
            }}
            className="hidden md:flex"
          >
            {SECTIONS.map((section, sIdx) => {
              const isActive = activeSection === sIdx;
              return (
                <button
                  key={section.id}
                  onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                  title={section.label}
                  aria-label={`Scroll to ${section.label}`}
                  style={{
                    width: isActive ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '9999px',
                    background: isActive
                      ? 'linear-gradient(90deg, #0052cc, #00c8f8)'
                      : 'rgba(255,255,255,0.2)',
                    transition: 'width 0.4s var(--ease-expo-out), background 0.3s ease',
                    border: 'none',
                    padding: 0,
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </div>

          {/* Action Cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Configure CTA */}
            <ViewTransitionLink
              href="/products/superq-lux"
              className="btn-8state btn-primary view-transition-nav"
              style={{ padding: '0.4rem 1rem', fontSize: '0.65rem', textDecoration: 'none' }}
            >
              <SlidersHorizontal size={12} /> Configure
            </ViewTransitionLink>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              style={{
                position: 'relative',
                width: '38px', height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0052cc 0%, #0088ff 100%)',
                color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 18px rgba(0, 82, 204, 0.4)',
                border: 'none',
                flexShrink: 0,
              }}
            >
              <ShoppingBag size={15} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute', top: '-3px', right: '-3px',
                    width: '16px', height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#0052cc',
                    fontSize: '0.58rem', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Animated Hamburger Menu Button */}
            <button
              id="menu-trigger"
              onClick={openMenu}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: '5px',
                width: '38px',
                height: '38px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '0.55rem',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,200,248,0.4)';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,200,248,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              <span style={{ display: 'block', height: '1.5px', width: '18px', background: '#ffffff', borderRadius: '1px', transition: 'transform 0.3s ease' }} />
              <span style={{ display: 'block', height: '1.5px', width: '11px', background: 'rgba(255,255,255,0.55)', borderRadius: '1px', transition: 'width 0.3s ease' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      {(isMenuOpen || isClosing) && (
        <div
          className={isClosing ? 'menu-overlay-exit' : 'menu-overlay-enter'}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#020c1b',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Ambient gradient overlay in menu background */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '10%',
              left: '-20%',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(0,82,204,0.12) 0%, transparent 65%)',
              pointerEvents: 'none',
              filter: 'blur(60px)',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '-10%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(0,200,248,0.06) 0%, transparent 65%)',
              pointerEvents: 'none',
              filter: 'blur(80px)',
            }}
          />

          {/* Header Row */}
          <div
            className="container-custom"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', flexShrink: 0, position: 'relative', zIndex: 2 }}
          >
            <ViewTransitionLink href="/" className="view-transition-nav" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <SuperfanLogo />
            </ViewTransitionLink>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => setIsSoundPlaying(!isSoundPlaying)}
                aria-label="Toggle atmospheric sound"
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: isSoundPlaying ? 'rgba(0, 200, 248, 0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isSoundPlaying ? 'rgba(0,200,248,0.35)' : 'rgba(255,255,255,0.1)'}`,
                  color: isSoundPlaying ? '#00c8f8' : 'rgba(255,255,255,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
              >
                {isSoundPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>

              <button
                onClick={closeMenu}
                aria-label="Close menu"
                style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(0,200,248,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,200,248,0.35)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#00c8f8';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', flexShrink: 0 }} />

          {/* Journey Nav Links */}
          <div
            className="container-custom"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem', overflowY: 'auto', position: 'relative', zIndex: 2 }}
          >
            <nav aria-label="Main navigation">
              {SECTIONS.map((section, sIdx) => (
                <ViewTransitionLink
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={closeMenu}
                  onMouseEnter={() => setHoveredIdx(section.idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="view-transition-nav"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    textDecoration: 'none',
                    color: hoveredIdx === section.idx ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    transition: 'color 0.25s ease, padding-left 0.3s var(--ease-expo-out)',
                    paddingLeft: hoveredIdx === section.idx ? '0.5rem' : '0',
                    position: 'relative',
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: `translateY(-50%) scaleY(${hoveredIdx === section.idx ? 1 : 0})`,
                      width: '2px',
                      height: '60%',
                      background: 'linear-gradient(to bottom, #00c8f8, #0052cc)',
                      borderRadius: '1px',
                      transition: 'transform 0.3s var(--ease-expo-out)',
                      transformOrigin: 'center',
                    }}
                  />

                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', color: 'var(--color-arctic-cyan)', minWidth: '24px', opacity: 0.7 }}>
                    {section.idx}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, flex: 1, letterSpacing: '-0.01em' }}>
                    {section.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }} className="hidden md:flex">
                    {section.sub}
                  </span>
                  <ArrowUpRight
                    size={16}
                    style={{
                      color: hoveredIdx === section.idx ? 'var(--color-arctic-cyan)' : 'transparent',
                      transition: 'color 0.25s ease',
                    }}
                  />
                </ViewTransitionLink>
              ))}
            </nav>

            {/* Footer area in menu */}
            <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
                Engineered Silence.™ Coimbatore, India.
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
                Press 1–6 to jump · ESC to close
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
