'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../../lib/data';

const AUTO_ADVANCE_MS = 6000;

export const Testimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    setActiveIdx((idx + REVIEWS.length) % REVIEWS.length);
  }, []);

  const handlePrev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);
  const handleNext = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);

  // Auto-advance with pause on hover
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setTimeout(() => goTo(activeIdx + 1), AUTO_ADVANCE_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIdx, isHovered, goTo]);

  const review = REVIEWS[activeIdx];
  const prevReview = REVIEWS[(activeIdx - 1 + REVIEWS.length) % REVIEWS.length];

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ backgroundColor: '#020c1b', color: '#ffffff', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,82,204,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Stats Marquee Strip ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            marginBottom: '4rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(0,200,248,0.1)',
          }}
        >
          {[
            { value: '150,000+', label: 'Homes Upgraded' },
            { value: '4.8 / 5', label: 'Star Rating' },
            { value: '94%', label: 'Recommend' },
            { value: '₹820 Cr', label: 'Bills Saved' },
          ].map((stat, i) => (
            <div
              key={stat.value}
              style={{
                textAlign: 'center',
                padding: '1.75rem 1rem',
                background: 'rgba(255,255,255,0.025)',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 300,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(125deg, #ffffff 0%, #00c8f8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.3rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
          <span className="label-ui">CHAPTER V — VERIFIED TESTIMONY</span>
          <h2
            className="heading-xl"
            style={{ marginTop: '0.75rem' }}
          >
            Trusted Across India
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', marginTop: '1rem', lineHeight: 1.65 }}>
            Real voices from homeowners, architects, and engineers who chose Superfan.
          </p>
        </div>

        {/* ── Stacked Card Carousel ── */}
        <div
          style={{ position: 'relative', maxWidth: '780px', margin: '0 auto' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background peek card (previous review) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-1.5deg) scale(0.97)',
              width: '100%',
              background: 'rgba(255,255,255,0.018)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '24px',
              height: '100%',
              pointerEvents: 'none',
            }}
          />

          {/* Active card */}
          <div
            key={activeIdx}
            style={{
              position: 'relative',
              borderRadius: '24px',
              padding: 'clamp(2rem,5vw,3rem)',
              background: 'linear-gradient(145deg, rgba(0, 52, 120, 0.22) 0%, rgba(6,14,30,0.98) 100%)',
              border: '1px solid rgba(0,200,248,0.22)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 40px rgba(0,82,204,0.08)',
              transition: 'all 0.5s var(--ease-expo-out)',
            }}
          >
            {/* Quote icon */}
            <Quote
              size={36}
              color="#00c8f8"
              style={{ opacity: 0.35, marginBottom: '1.5rem', display: 'block' }}
            />

            {/* Stars */}
            <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.25rem' }}>
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#00c8f8" color="#00c8f8" />
              ))}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                color: '#ffffff',
                marginBottom: '1rem',
                fontStyle: 'italic',
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              "{review.title}"
            </h3>

            {/* Review text */}
            <p style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {review.comment}
            </p>

            {/* Author row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Avatar initial */}
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(0,82,204,0.5), rgba(0,200,248,0.3))',
                    border: '1px solid rgba(0,200,248,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: '#ffffff',
                    fontWeight: 300,
                    flexShrink: 0,
                  }}
                >
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.88rem', color: '#ffffff' }}>
                    {review.author}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.15rem', fontFamily: 'var(--font-body)' }}>
                    📍 {review.location}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.62rem',
                  color: '#00c8f8',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  border: '1px solid rgba(0,200,248,0.3)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'rgba(0,200,248,0.06)',
                  letterSpacing: '0.1em',
                }}
              >
                <ShieldCheck size={12} /> VERIFIED OWNER
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              style={{
                width: '46px', height: '46px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,200,248,0.1)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,200,248,0.35)';
                (e.currentTarget as HTMLButtonElement).style.color = '#00c8f8';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  style={{
                    width: idx === activeIdx ? '24px' : '7px',
                    height: '7px',
                    borderRadius: '9999px',
                    background: idx === activeIdx ? '#00c8f8' : 'rgba(255,255,255,0.18)',
                    border: 'none',
                    transition: 'width 0.35s var(--ease-expo-out), background 0.25s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              style={{
                width: '46px', height: '46px',
                borderRadius: '50%',
                background: 'rgba(0,82,204,0.2)',
                border: '1px solid rgba(0,200,248,0.25)',
                color: '#00c8f8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,200,248,0.15)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,200,248,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,82,204,0.2)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,200,248,0.25)';
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Auto-progress bar */}
          {!isHovered && (
            <div style={{ marginTop: '1.25rem', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px', overflow: 'hidden', maxWidth: '200px', margin: '1.25rem auto 0' }}>
              <div
                key={activeIdx}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #0052cc, #00c8f8)',
                  borderRadius: '1px',
                  animation: `progressFill ${AUTO_ADVANCE_MS}ms linear forwards`,
                }}
              />
              <style>{`
                @keyframes progressFill {
                  from { width: 0%; }
                  to   { width: 100%; }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
