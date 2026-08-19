'use client';

import React, { useEffect, useRef } from 'react';
import { Award, Zap, CheckCircle2, Star } from 'lucide-react';

export const AwardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tiles = sectionRef.current?.querySelectorAll('.awards-tile');
    if (!tiles) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    tiles.forEach((tile, i) => {
      const el = tile as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.65s var(--ease-expo-out) ${i * 0.1}s, transform 0.65s var(--ease-expo-out) ${i * 0.1}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="section-padding"
      style={{
        backgroundColor: '#020c1b',
        color: '#ffffff',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Ambient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212,175,117,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(80px)',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="label-gold">NATIONAL ACCOLADES & CERTIFICATIONS — CHAPTER VI</span>
          <h2
            className="heading-xl"
            style={{
              marginTop: '0.75rem',
              background: 'linear-gradient(125deg, #ffffff 0%, #d4af75 60%, #f0d49a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            India's Most Awarded<br />BLDC Brand
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto',
            gap: '1rem',
          }}
        >

          {/* Tile 1 — National Award (wide) */}
          <div
            className="awards-tile bento-tile"
            style={{
              gridColumn: 'span 8',
              padding: '2.5rem',
              background: 'linear-gradient(145deg, rgba(212,175,117,0.08) 0%, rgba(6,14,30,0.95) 100%)',
              border: '1px solid var(--color-border-gold)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '20px',
            }}
          >
            {/* Background texture */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '200px', height: '200px',
                background: 'radial-gradient(circle at 80% 20%, rgba(212,175,117,0.12) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(212,175,117,0.12)',
                  border: '1px solid rgba(212,175,117,0.35)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  marginBottom: '1.5rem',
                }}
              >
                <Award size={13} color="#d4af75" />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', letterSpacing: '0.18em', color: '#d4af75', textTransform: 'uppercase', fontWeight: 700 }}>
                  Ministry of Power, Govt of India
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 300,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  marginBottom: '1rem',
                  letterSpacing: '-0.01em',
                }}
              >
                National Energy Conservation Award
              </h3>

              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: '520px' }}>
                Recognized by the Ministry of Power for pioneering India's first sensorless BLDC motor ceiling fan — a landmark in energy engineering.
              </p>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Year', value: '2018' },
                  { label: 'Category', value: 'Appliances' },
                  { label: 'Issued By', value: 'BEE · Govt India' },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(212,175,117,0.6)', textTransform: 'uppercase' }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: '#ffffff', fontWeight: 500, marginTop: '0.2rem' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tile 2 — BEE 5-Star (narrow, tall) */}
          <div
            className="awards-tile bento-tile"
            style={{
              gridColumn: 'span 4',
              padding: '2rem',
              background: 'rgba(255,255,255,0.025)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: '20px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(0,200,248,0.7)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              BEE Certification
            </div>
            <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center', marginBottom: '0.75rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="#d4af75" color="#d4af75" />
              ))}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.5rem',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}
            >
              5-Star
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
              Highest Energy Efficiency<br />Rating in India
            </div>
            <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
              Bureau of Energy Efficiency
            </div>
          </div>

          {/* Tile 3 — Video (wide) */}
          <div
            className="awards-tile bento-tile"
            style={{
              gridColumn: 'span 5',
              height: '280px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '20px',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) saturate(0.9)' }}
            >
              <source src="/media/fan_smooth_spinning.mp4" type="video/mp4" />
            </video>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(2,12,27,0.92) 0%, transparent 55%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.75rem',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', letterSpacing: '0.18em', color: '#00c8f8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Coimbatore R&D Facility
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', fontWeight: 300 }}>
                  Pioneered in India
                </div>
              </div>
            </div>
          </div>

          {/* Tile 4 — Achievements list */}
          <div
            className="awards-tile bento-tile"
            style={{
              gridColumn: 'span 7',
              padding: '2rem',
              background: 'rgba(255,255,255,0.025)',
              borderRadius: '20px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(0,200,248,0.7)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Verified Accolades
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: <Zap size={15} color="#00c8f8" />, text: 'Patented Sensorless Vector Control Technology (Govt of India Patent)' },
                { icon: <CheckCircle2 size={15} color="#d4af75" />, text: '100% Domestic Manufacturing & R&D in Coimbatore, Tamil Nadu' },
                { icon: <Award size={15} color="#d4af75" />, text: 'National Energy Conservation Award Winner (Ministry of Power)' },
                { icon: <CheckCircle2 size={15} color="#00c8f8" />, text: 'BEE 5-Star Highest Energy Efficiency Rating Certified' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.82)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
