'use client';

import React, { useState, useRef, useCallback } from 'react';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPos(percentage);
  }, []);

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section
      id="transformations"
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#0b0b0c',
        padding: '7rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p
            style={{
              fontFamily: sans,
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#e6c687',
              marginBottom: '1rem',
            }}
          >
            HAUTE TRANSFORMATION · BEFORE &amp; AFTER
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '0 0 1rem',
            }}
          >
            The Art of Metamorphosis
          </h2>
          <p
            style={{
              fontFamily: serif,
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(245, 243, 239, 0.7)',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Slide to reveal the bespoke Balayage Sur-Mesure &amp; Sculpted Cut transformation.
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          style={{
            position: 'relative',
            width: '100%',
            height: 'min(580px, 70vh)',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(230, 198, 135, 0.25)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(230, 198, 135, 0.08)',
            cursor: 'ew-resize',
            userSelect: 'none',
          }}
        >
          {/* AFTER Image (Full background) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, #1f1b24 0%, #0b0b0c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/frames/Camera_tracking_hair_salon_interior_202608100125_frames/frame_000120.jpeg"
              alt="After Transformation"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(1.05) contrast(1.08)',
              }}
            />
            {/* After Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '2rem',
                right: '2rem',
                background: 'rgba(11, 11, 12, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #e6c687',
                borderRadius: '50px',
                padding: '0.6rem 1.4rem',
                fontFamily: sans,
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: '#e6c687',
                pointerEvents: 'none',
              }}
            >
              LUMIÈRE METAMORPHOSIS ✨
            </div>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: `${sliderPos}%`,
              overflow: 'hidden',
              borderRight: '2px solid #e6c687',
            }}
          >
            <img
              src="/frames/Entering_hair_salon_reception_space_202608100125_frames/frame_000040.jpeg"
              alt="Before Transformation"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(0.3) contrast(0.95)',
              }}
            />
            {/* Before Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                background: 'rgba(11, 11, 12, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(245, 243, 239, 0.2)',
                borderRadius: '50px',
                padding: '0.6rem 1.4rem',
                fontFamily: sans,
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: 'rgba(245, 243, 239, 0.7)',
                pointerEvents: 'none',
              }}
            >
              RAW CANVAS (BEFORE)
            </div>
          </div>

          {/* Center Handle Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              transform: 'translateX(-50%)',
              width: '4px',
              background: '#e6c687',
              boxShadow: '0 0 15px rgba(230, 198, 135, 0.8)',
              pointerEvents: 'none',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Handle Circle Button */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#0b0b0c',
                border: '2px solid #e6c687',
                color: '#e6c687',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
              }}
            >
              ↔
            </div>
          </div>
        </div>

        {/* Caption */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              color: 'rgba(245, 243, 239, 0.5)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            DRAG OR TOUCH SLIDER TO COMPARE RITUAL RESULTS
          </p>
        </div>
      </div>
    </section>
  );
}
