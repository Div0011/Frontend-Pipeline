'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLenis } from './LenisProvider';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

export type MagazinePageType = 'hero' | 'establishment' | 'staff' | 'pricing' | 'testimonials' | 'booking' | 'equipment' | 'sitting' | null;

interface MagazineDrawerProps {
  activePage: MagazinePageType;
  onClose: () => void;
  onOpenBookingForm: () => void;
}

export function MagazineDrawer({ activePage, onClose, onOpenBookingForm }: MagazineDrawerProps) {
  const [currentTab, setCurrentTab] = useState<MagazinePageType>(activePage);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Bespoke Dry Cut & Blowdry', date: '' });
  const sheetRef = useRef<HTMLDivElement>(null);

  // Interactive Tariff Calculator State
  const [calcLength, setCalcLength] = useState<'medium' | 'short' | 'long'>('medium');
  const [calcService, setCalcService] = useState<'cut' | 'balayage' | 'gloss' | 'spa'>('balayage');

  // Interactive Staff Filter State
  const [staffFilter, setStaffFilter] = useState<'all' | 'color' | 'cut'>('all');

  const lenisRef = useLenis();

  useEffect(() => {
    if (activePage) {
      setCurrentTab(activePage);
      if (sheetRef.current) {
        sheetRef.current.scrollTop = 0;
      }
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    } else {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    }
  }, [activePage, lenisRef]);

  useEffect(() => {
    // Cleanup to ensure Lenis restarts when unmounting
    return () => {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    };
  }, [lenisRef]);

  if (!activePage) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Tariff calculation matrix
  const tariffMatrix = {
    cut: { short: 160, medium: 180, long: 210, time: '75 MIN' },
    balayage: { short: 250, medium: 290, long: 340, time: '180 MIN' },
    gloss: { short: 110, medium: 130, long: 150, time: '60 MIN' },
    spa: { short: 140, medium: 160, long: 190, time: '90 MIN' },
  };

  const currentPrice = tariffMatrix[calcService][calcLength];
  const currentTime = tariffMatrix[calcService].time;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(10, 9, 11, 0.9)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn 0.35s ease-out',
      }}
      onClick={onClose}
    >
      {/* ── FULLSCREEN EDITORIAL MAGAZINE HEADER BAR (Section Tabs Removed) ── */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 5vw',
          borderBottom: '1px solid #e5dfd0',
          background: '#ffffff',
          zIndex: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Identification */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span
            style={{
              fontFamily: serif,
              fontSize: '1.8rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: '#b8860b',
            }}
          >
            LUMIÈRE
          </span>
          <span
            style={{
              fontFamily: sans,
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#333333',
              paddingLeft: '1.5rem',
              borderLeft: '1px solid #dcd4c0',
            }}
          >
            REVUE DE COIFFURE · ISSUE N° 08 · PARIS 8e
          </span>
        </div>

        {/* Back / Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            fontFamily: sans,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#ffffff',
            background: '#b8860b',
            border: 'none',
            borderRadius: '100px',
            padding: '0.7rem 1.8rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(184, 134, 11, 0.3)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#111111';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#b8860b';
          }}
        >
          Back to the Salon
        </button>
      </header>

      {/* ── HIGH-CONTRAST WHITE / GOLD / BLACK EDITORIAL MAGAZINE SPREAD ── */}
      <main
        ref={sheetRef}
        data-lenis-prevent="true"
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#ffffff',
          color: '#111111',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ════════════════════════════════════════════════════════════════
            1. ISSUE N° 01: L'HISTOIRE DU SALON (ESTABLISHMENT)
        ════════════════════════════════════════════════════════════════ */}
        {(currentTab === 'establishment' || currentTab === 'hero') && (
          <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100%' }}>
            {/* 📸 LEFT PANE: HUGE EDITORIAL IMAGE */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                minHeight: '60vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* 📝 RIGHT PANE: EDITORIAL TEXT */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                padding: '10vw 8vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#b8860b',
                  marginBottom: '1.5rem',
                  display: 'block',
                }}
              >
                 ISSUE N° 01 · L&apos;HISTOIRE DU SALON
              </span>
              
              <h1
                style={{
                  fontFamily: serif,
                  fontSize: 'clamp(3rem, 5.5vw, 6rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  color: '#111111',
                  margin: '0 0 3rem 0',
                }}
              >
                A Sanctuary Built to Slow You Down.
              </h1>

              <p
                style={{
                  fontFamily: sans,
                  fontSize: '1.05rem',
                  fontWeight: 400,
                  lineHeight: 1.9,
                  color: '#333333',
                  margin: '0 0 2rem 0',
                }}
              >
                <span
                  style={{
                    fontSize: '5rem',
                    float: 'left',
                    lineHeight: 0.8,
                    paddingRight: '1rem',
                    fontFamily: serif,
                    color: '#b8860b',
                  }}
                >
                  F
                </span>
                ounded in 2019 along Rue du Faubourg Saint-Honoré, Lumière was conceived not as a hair salon, but as a silent sanctuary away from the rapid tempo of modern Paris. Every acoustic surface, alabaster light fixture, and leather styling chair was hand-curated to ensure your personal visit feels like an unhurried luxury ritual.
              </p>

              <blockquote
                style={{
                  padding: '2rem 0 2rem 2rem',
                  borderLeft: '4px solid #b8860b',
                  margin: '2rem 0 4rem 0',
                }}
              >
                <p
                  style={{
                    fontFamily: serif,
                    fontSize: '1.8rem',
                    fontStyle: 'italic',
                    color: '#111111',
                    margin: '0 0 1rem 0',
                    lineHeight: 1.4,
                  }}
                >
                  “True luxury is quiet. It lives in natural light, unhurried time, and the weight of a scissor crafted in Japan.”
                </p>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#b8860b',
                  }}
                >
                  — Élodie Laurent
                </span>
              </blockquote>

              <div>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    fontFamily: sans,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    background: '#111111',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '1.25rem 3.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  RETURN TO ATELIER
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            2. ISSUE N° 02: L'ÉQUIPE CRÉATIVE (PARIS MASTERS / STAFF)
        ════════════════════════════════════════════════════════════════ */}
        {currentTab === 'staff' && (
          <div style={{ display: 'flex', flexWrap: 'wrap-reverse', minHeight: '100%' }}>
            {/* 📝 LEFT PANE: TEXT & STAFF DIRECTORY (Reversed flex wrap to maintain Image Right layout visually on desktop) */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                padding: '10vw 8vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#b8860b',
                  marginBottom: '1.5rem',
                  display: 'block',
                }}
              >
                 ISSUE N° 02 · L&apos;ÉQUIPE CRÉATIVE
              </span>
              
              <h1
                style={{
                  fontFamily: serif,
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  color: '#111111',
                  margin: '0 0 2rem 0',
                }}
              >
                Masters of the Parisian Cut.
              </h1>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'ALL ARTISTS' },
                  { id: 'color', label: 'COLORISTS' },
                  { id: 'cut', label: 'HAUTE CISEAU' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setStaffFilter(f.id as 'all' | 'color' | 'cut')}
                    style={{
                      fontFamily: sans,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '100px',
                      border: `1px solid ${staffFilter === f.id ? '#111111' : '#dcd4c0'}`,
                      background: staffFilter === f.id ? '#111111' : 'transparent',
                      color: staffFilter === f.id ? '#ffffff' : '#333333',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem' }}>
                {(staffFilter === 'all' || staffFilter === 'cut') && (
                  <div>
                    <span style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8860b' }}>FOUNDING ARTISTIC DIRECTOR</span>
                    <h3 style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 400, color: '#111111', margin: '0.25rem 0' }}>Élodie Laurent</h3>
                    <p style={{ fontFamily: sans, fontSize: '0.95rem', color: '#555555', margin: 0, lineHeight: 1.6 }}>16 years leading Chanel &amp; Dior backstage teams. Specializes in precision dry cutting.</p>
                  </div>
                )}
                
                {(staffFilter === 'all' || staffFilter === 'color') && (
                  <div>
                    <span style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8860b' }}>MASTER COLORIST &amp; BALAYAGE</span>
                    <h3 style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 400, color: '#111111', margin: '0.25rem 0' }}>Antoine Moreau</h3>
                    <p style={{ fontFamily: sans, fontSize: '0.95rem', color: '#555555', margin: 0, lineHeight: 1.6 }}>Pioneer of the Sun-Kissed Parisian Balayage. Renowned for seamless dimensional blondes.</p>
                  </div>
                )}

                {(staffFilter === 'all' || staffFilter === 'cut' || staffFilter === 'color') && (
                  <div>
                    <span style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8860b' }}>TEXTURE &amp; SCALP RITUALIST</span>
                    <h3 style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 400, color: '#111111', margin: '0.25rem 0' }}>Sophie Chen</h3>
                    <p style={{ fontFamily: sans, fontSize: '0.95rem', color: '#555555', margin: 0, lineHeight: 1.6 }}>Certified scalp health specialist utilizing Tokyo Head Spa massage rituals.</p>
                  </div>
                )}
              </div>
            </div>

            {/* 📸 RIGHT PANE: HUGE EDITORIAL IMAGE */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                minHeight: '60vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1887&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            3. ISSUE N° 03: TARIFS SUR-MESURE (PRICING & CALCULATOR)
        ════════════════════════════════════════════════════════════════ */}
        {currentTab === 'pricing' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100%' }}>
            {/* 📸 LEFT PANE: IMAGE */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                minHeight: '60vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* 📝 RIGHT PANE: TEXT & TARIFF CALCULATOR */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                padding: '10vw 8vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#b8860b',
                  marginBottom: '1.5rem',
                  display: 'block',
                }}
              >
                ISSUE N° 03 · GRILLE TARIFAIRE
              </span>
              
              <h1
                style={{
                  fontFamily: serif,
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  color: '#111111',
                  margin: '0 0 3rem 0',
                }}
              >
                Tarifs Sur-Mesure.
              </h1>
              
              {/* HIGH-CONTRAST TARIFF CALCULATOR WIDGET */}
              <div
                style={{
                  padding: '3rem',
                  background: '#faf8f2',
                  border: '1px solid #e0d8c0',
                  borderRadius: '20px',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: sans, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8860b' }}>
                    ✦ INTERACTIVE TARIFF &amp; DURATION CALCULATOR
                  </span>
                  <span style={{ fontFamily: sans, fontSize: '0.85rem', fontWeight: 700, color: '#b8860b', letterSpacing: '0.15em' }}>
                    ESTIMATED TIME: {currentTime}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                  {/* Service selector */}
                  <div>
                    <label style={{ display: 'block', fontFamily: sans, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555555', marginBottom: '1rem' }}>
                      SELECT SERVICE RITUAL
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {[
                        { id: 'cut', label: 'Couture Cut' },
                        { id: 'balayage', label: 'Balayage' },
                        { id: 'gloss', label: 'French Gloss' },
                        { id: 'spa', label: 'Head Spa' },
                      ].map((svc) => (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => setCalcService(svc.id as 'cut' | 'balayage' | 'gloss' | 'spa')}
                          style={{
                            padding: '1rem',
                            background: calcService === svc.id ? '#111111' : '#ffffff',
                            border: `1px solid ${calcService === svc.id ? '#111111' : '#dcd4c0'}`,
                            borderRadius: '10px',
                            color: calcService === svc.id ? '#ffffff' : '#111111',
                            fontFamily: sans,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {svc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Length selector */}
                  <div>
                    <label style={{ display: 'block', fontFamily: sans, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555555', marginBottom: '1rem' }}>
                      HAIR LENGTH
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                      {[
                        { id: 'short', label: 'Short' },
                        { id: 'medium', label: 'Medium' },
                        { id: 'long', label: 'Long' },
                      ].map((len) => (
                        <button
                          key={len.id}
                          type="button"
                          onClick={() => setCalcLength(len.id as 'short' | 'medium' | 'long')}
                          style={{
                            padding: '1rem',
                            background: calcLength === len.id ? '#111111' : '#ffffff',
                            border: `1px solid ${calcLength === len.id ? '#111111' : '#dcd4c0'}`,
                            borderRadius: '10px',
                            color: calcLength === len.id ? '#ffffff' : '#111111',
                            fontFamily: sans,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {len.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid #e0d8c0' }}>
                  <div>
                    <span style={{ fontFamily: sans, fontSize: '0.75rem', fontWeight: 700, color: '#777777', display: 'block', letterSpacing: '0.15em' }}>
                      ESTIMATED VALUE
                    </span>
                    <span style={{ fontFamily: serif, fontSize: '3.5rem', fontWeight: 400, color: '#111111' }}>
                      €{currentPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            4. ISSUE N° 04: ÉLOGES & TESTIMONIALS
        ════════════════════════════════════════════════════════════════ */}
        {currentTab === 'testimonials' && (
          <div style={{ display: 'flex', flexWrap: 'wrap-reverse', minHeight: '100%' }}>
            {/* 📝 LEFT PANE: TEXT & TESTIMONIALS */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                padding: '10vw 8vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#b8860b',
                  marginBottom: '1.5rem',
                  display: 'block',
                }}
              >
                ISSUE N° 04 · ÉLOGES &amp; PRESSE
              </span>
              
              <h1
                style={{
                  fontFamily: serif,
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  color: '#111111',
                  margin: '0 0 3rem 0',
                }}
              >
                Client Praise.
              </h1>

              <div
                style={{
                  padding: '3rem 2rem',
                  background: '#faf8f2',
                  borderLeft: '4px solid #111111',
                  marginBottom: '3rem',
                }}
              >
                <span style={{ fontSize: '3.5rem', color: '#111111', fontFamily: serif, display: 'block', marginBottom: '1rem', lineHeight: 0.5 }}>“</span>
                <p style={{ fontFamily: serif, fontSize: '1.8rem', fontWeight: 400, color: '#111111', lineHeight: 1.35, margin: 0 }}>
                  Lumière is the quietest luxury in Paris. They restored the living health of my hair without sacrificing a single drop of chic Parisian movement.
                </p>
                <span style={{ fontFamily: sans, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8860b', marginTop: '2rem', display: 'block' }}>
                  VOGUE PARIS · MARCH ISSUE
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <span style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8860b' }}>HARPER&apos;S BAZAAR</span>
                  <p style={{ fontFamily: sans, fontSize: '1.05rem', fontWeight: 400, color: '#444444', margin: '0.5rem 0 0', lineHeight: 1.7 }}>
                    “Antoine&apos;s balayage technique looks as though your hair was kissed by two weeks of Mediterranean sun in Cap Ferret.”
                  </p>
                </div>

                <div>
                  <span style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8860b' }}>ELLE FRANCE</span>
                  <p style={{ fontFamily: sans, fontSize: '1.05rem', fontWeight: 400, color: '#444444', margin: '0.5rem 0 0', lineHeight: 1.7 }}>
                    “The Tokyo Head Spa ritual at Lumière erases the noise of Paris in 60 transcendent minutes.”
                  </p>
                </div>
              </div>
            </div>

            {/* 📸 RIGHT PANE: IMAGE */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                minHeight: '60vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1512413914594-541539281a17?q=80&w=2070&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
             5. ISSUE N° 05: RÉSERVATION (BOOKING FORM PAGE)
        ════════════════════════════════════════════════════════════════ */}
        {currentTab === 'booking' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100%' }}>
            {/* 📸 LEFT PANE: IMAGE */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                minHeight: '60vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* 📝 RIGHT PANE: FORM */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                padding: '8vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: sans, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8860b', marginBottom: '1.5rem', display: 'block' }}>
                ISSUE N° 05 · PRIS DE RENDEZ-VOUS
              </span>
              
              <h1 style={{ fontFamily: serif, fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 400, lineHeight: 1.05, color: '#111111', margin: '0 0 3rem 0' }}>
                Réservation.
              </h1>

              {formSubmitted ? (
                <div style={{ padding: '3rem 0' }}>
                  <span style={{ fontSize: '3rem', color: '#b8860b', display: 'block', marginBottom: '1rem' }}>✦</span>
                  <h2 style={{ fontFamily: serif, fontSize: '2.5rem', color: '#111111', marginBottom: '1rem', fontWeight: 400 }}>
                    VOTRE RENDEZ-VOUS EST CONFIRMÉ
                  </h2>
                  <p style={{ fontFamily: sans, fontSize: '1.05rem', color: '#444444', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                    Thank you, {formData.name || 'Cher Client'}. Our atelier concierge will send your calendar invitation and private access details via email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      padding: '1.25rem 3.5rem',
                      background: '#111111',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '100px',
                      fontFamily: sans,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      cursor: 'pointer',
                    }}
                  >
                    RETURN TO EXPERIENCE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: sans, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#444444', marginBottom: '0.75rem' }}>
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Camille Laurent"
                        style={{
                          width: '100%',
                          padding: '1.25rem',
                          background: '#faf9f5',
                          border: '1px solid #dcd4c0',
                          borderRadius: '10px',
                          fontFamily: sans,
                          fontSize: '0.95rem',
                          color: '#111111',
                          outline: 'none',
                        }}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontFamily: sans, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#444444', marginBottom: '0.75rem' }}>
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="camille@vogue.fr"
                        style={{
                          width: '100%',
                          padding: '1.25rem',
                          background: '#faf9f5',
                          border: '1px solid #dcd4c0',
                          borderRadius: '10px',
                          fontFamily: sans,
                          fontSize: '0.95rem',
                          color: '#111111',
                          outline: 'none',
                        }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontFamily: sans, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#444444', marginBottom: '0.75rem' }}>
                      SELECT SERVICE RITUAL
                    </label>
                    <select
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        background: '#faf9f5',
                        border: '1px solid #dcd4c0',
                        borderRadius: '10px',
                        fontFamily: sans,
                        fontSize: '0.95rem',
                        color: '#111111',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Bespoke Dry Cut & Blowdry">Bespoke Dry Cut &amp; Blowdry (€180)</option>
                      <option value="Balayage Sur-Mesure & Gloss">Balayage Sur-Mesure &amp; Gloss (€290)</option>
                      <option value="French Gloss & Shine Refresh">French Gloss &amp; Shine Refresh (€130)</option>
                      <option value="Tokyo Scalp Head Spa Ritual">Tokyo Scalp Head Spa Ritual (€160)</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      style={{
                        padding: '1.35rem 3rem',
                        background: '#111111',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '100px',
                        fontFamily: sans,
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      CONFIRM RESERVATION
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
             6. ISSUE N° 06: ÉQUIPEMENT (EQUIPMENT SHOWCASE)
        ════════════════════════════════════════════════════════════════ */}
        {currentTab === 'equipment' && (
          <div style={{ display: 'flex', flexWrap: 'wrap-reverse', minHeight: '100%' }}>
            {/* 📝 LEFT PANE: TEXT */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                padding: '10vw 8vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: sans, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8860b', marginBottom: '1.5rem', display: 'block' }}>
                ISSUE N° 06 · ÉQUIPEMENT
              </span>
              
              <h1 style={{ fontFamily: serif, fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 400, lineHeight: 1.05, color: '#111111', margin: '0 0 3rem 0' }}>
                Instruments of Precision.
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                {[
                  { title: 'Kashō Scissors', desc: 'Hand-forged in Sakai, Japan. 440C stainless steel with ivory resin handles.' },
                  { title: 'Moser System', desc: 'German-engineered precision with ceramic blades for seamless texturizing.' },
                  { title: 'Takara Belmont', desc: 'Iconic Parisian chair — full grain leather, hand-tufted in Le Marais.' },
                  { title: 'Olaplex No.3', desc: 'Bond multiplier treatment ritual for structural hair integrity.' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#faf9f5', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e5dfd0' }}>
                    <span style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#111111', display: 'block', marginBottom: '0.75rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontFamily: serif, fontSize: '1.4rem', fontWeight: 400, color: '#111111', margin: '0 0 0.5rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: sans, fontSize: '0.85rem', lineHeight: 1.6, color: '#444444', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 📸 RIGHT PANE: IMAGE */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                minHeight: '60vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
             7. ISSUE N° 07: L'ART DE LA COIFFURE (SITTING / EXPERIENCE)
        ════════════════════════════════════════════════════════════════ */}
        {currentTab === 'sitting' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100%' }}>
            {/* 📸 LEFT PANE: IMAGE */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                minHeight: '60vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1600622841107-16017ecb30ac?q=80&w=2070&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* 📝 RIGHT PANE: TEXT */}
            <div
              style={{
                flex: '1 1 50%',
                minWidth: '400px',
                padding: '10vw 8vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: sans, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8860b', marginBottom: '1.5rem', display: 'block' }}>
                 ISSUE N° 07 · L&apos;ART DE LA COIFFURE
              </span>
              
              <h1 style={{ fontFamily: serif, fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 400, lineHeight: 1.05, color: '#111111', margin: '0 0 3rem 0' }}>
                The Art of the Sitting.
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
                {['Consultation', ' Ritual', 'Finishing'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem', background: '#faf9f5', borderLeft: '4px solid #111111' }}>
                    <span style={{ fontFamily: serif, fontSize: '3rem', color: '#b8860b' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: '1.2rem', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111111' }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: sans, fontSize: '1.05rem', lineHeight: 1.9, color: '#333333', margin: '0 0 2.5rem' }}>
                Every sitting begins with silence. We assess, we listen, then we cut. No rush. No compromise.
                Your 90-minute session includes a scalp massage, precision cutting, and a final styling ritual with our signature products.
              </p>
              <div>
                <button
                  type="button"
                  onClick={onOpenBookingForm}
                  style={{
                    padding: '1.25rem 3.5rem',
                    background: '#b8860b',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '100px',
                    fontFamily: sans,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(184, 134, 11, 0.3)',
                  }}
                >
                  BOOK THIS RITUAL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MINIMALISTIC GOLDEN "BACK TO THE SALON" RETURN BUTTON ── */}
        <div style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '2rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              fontFamily: sans,
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#0b0b0c',
              background: 'linear-gradient(135deg, #e6c687 0%, #b8860b 100%)',
              border: 'none',
              borderRadius: '100px',
              padding: '1.1rem 2.8rem',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(184, 134, 11, 0.35)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.04)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 30px rgba(184, 134, 11, 0.55)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(184, 134, 11, 0.35)';
            }}
          >
            <span>← Back to the Salon</span>
          </button>
        </div>
      </main>
    </div>
  );
}

