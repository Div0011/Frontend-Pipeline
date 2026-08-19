'use client';

import React from 'react';

export const BrandStatement: React.FC = () => {
  return (
    <section
      id="brand-statement"
      style={{
        padding: '2.5rem 0 3rem',
        backgroundColor: 'transparent',
        color: '#ffffff',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: '820px',           margin: '0 auto 2rem' }}>
          <span
            style={{
              fontSize: '0.65rem',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#00d4ff',
              marginBottom: '1rem',
              fontWeight: 600,
              display: 'block',
            }}
          >
            CHAPTER II — THE PARADIGM SHIFT
          </span>

          <h2
            className="heading-xl"
            style={{
              marginBottom: '1rem',
              color: '#ffffff',
              fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
              fontStyle: 'italic',
            }}
          >
            Why waste 75 Watts <br />
            <span
              style={{
                background: 'linear-gradient(120deg, #ffffff 0%, rgba(0,212,255,0.9) 60%, rgba(0,82,204,1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'normal',
              }}
            >
              to move peaceful air?
            </span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
            For a century, conventional ceiling fans relied on friction-heavy AC induction motors
            that wasted over half their energy as heat and electrical hum. Superfan replaced old copper windings
            with permanent neodymium magnet sensorless BLDC architecture — slashing power consumption to 35W
            while delivering pure, whisper-quiet airflow.
          </p>
        </div>

        {/* Video Cards Grid — all video, no static images */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              background: '#020b1c',
              height: '360px',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.85) contrast(1.1) saturate(1.1)',
              }}
            >
              <source src="/media/futuristic_fan_spinning.mp4" type="video/mp4" />
            </video>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(3,14,30,0.95) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.5rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.62rem',
                    color: '#00d4ff',
                    fontFamily: 'var(--font-ui)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '0.3rem',
                    fontWeight: 700,
                  }}
                >
                  ARCHITECTURAL SCULPTURE
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: '#ffffff',
                    fontWeight: 300,
                  }}
                >
                  Zero-Turbulence Airflow Geometry
                </h4>
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              background: '#020b1c',
              height: '360px',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.85) contrast(1.1) saturate(1.1)',
              }}
            >
              <source src="/media/fan_smooth_spinning.mp4" type="video/mp4" />
            </video>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(3,14,30,0.95) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.5rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.62rem',
                    color: '#00d4ff',
                    fontFamily: 'var(--font-ui)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '0.3rem',
                    fontWeight: 700,
                  }}
                >
                  OFFLINE SPEECH RECOGNITION
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: '#ffffff',
                    fontWeight: 300,
                  }}
                >
                  myQ Direct Voice Control
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
