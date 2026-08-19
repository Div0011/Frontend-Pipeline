'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../../lib/cart-context';
import { X, ShieldCheck, Zap, Wind, Volume2, ShoppingBag } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [speedMode, setSpeedMode] = useState<'off' | 'whisper' | 'breeze' | 'turbo'>('breeze');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedFinishIndex(0);
      setSpeedMode('breeze');
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [quickViewProduct]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setQuickViewProduct(null), 320);
  }, [setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const selectedFinish = quickViewProduct.finishes[selectedFinishIndex] || quickViewProduct.finishes[0];

  const getSpinClass = () => {
    switch (speedMode) {
      case 'whisper': return 'animate-spin-whisper';
      case 'breeze': return 'animate-spin-breeze';
      case 'turbo': return 'animate-spin-turbo';
      default: return '';
    }
  };

  return (
    <div
      data-testid="quick-view-modal"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        onClick={handleClose}
        data-cursor="default"
        data-testid="quick-view-backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(3, 14, 30, 0.75)',
          backdropFilter: 'blur(12px)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 82, 204, 0.25)',
          borderRadius: '24px',
          boxShadow: '0 25px 80px rgba(0, 82, 204, 0.2)',
          color: '#0f172a',
          zIndex: 100001,
          padding: '2rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <button
          onClick={handleClose}
          data-cursor="default"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 82, 204, 0.08)',
            border: '1px solid rgba(0, 82, 204, 0.2)',
            color: '#0052cc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                height: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(0, 82, 204, 0.1) 0%, transparent 70%)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 82, 204, 0.15)',
              }}
            >
            <video
              autoPlay
              loop
              muted
              playsInline
              src={quickViewProduct.hoverVideo || quickViewProduct.image || '/media/blades_rotating.mp4'}
              className={getSpinClass()}
              style={{
                width: '100%',
                maxHeight: '260px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 15px 30px rgba(0, 82, 204, 0.2)) brightness(0.9) saturate(1.1)',
                transition: 'transform 0.3s ease',
              }}
            />
            </div>

            <div style={{ marginTop: '1.25rem', background: '#f4f7fb', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(0,82,204,0.12)' }}>
              <div style={{ fontSize: '0.7rem', color: '#0052cc', fontFamily: 'var(--font-ui)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                LIVE BLADE SPEED SIMULATOR
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {(['off', 'whisper', 'breeze', 'turbo'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSpeedMode(mode)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-ui)',
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      border: speedMode === mode ? '1px solid #0052cc' : '1px solid rgba(0,82,204,0.15)',
                      backgroundColor: speedMode === mode ? 'rgba(0, 82, 204, 0.12)' : '#ffffff',
                      color: speedMode === mode ? '#0052cc' : 'rgba(15,23,42,0.6)',
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: '#0052cc', fontFamily: 'var(--font-ui)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 700 }}>
              {quickViewProduct.category}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem', color: '#0f172a' }}>
              {quickViewProduct.name}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(15, 23, 42, 0.72)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {quickViewProduct.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f4f7fb', padding: '0.75rem', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(0,82,204,0.12)' }}>
                <Zap size={16} color="#0052cc" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{quickViewProduct.wattage}W</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(15,23,42,0.55)', fontWeight: 600 }}>BLDC Power</div>
              </div>
              <div style={{ background: '#f4f7fb', padding: '0.75rem', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(0,82,204,0.12)' }}>
                <Wind size={16} color="#0052cc" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{quickViewProduct.airflowCFM}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(15,23,42,0.55)', fontWeight: 600 }}>CFM Airflow</div>
              </div>
              <div style={{ background: '#f4f7fb', padding: '0.75rem', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(0,82,204,0.12)' }}>
                <Volume2 size={16} color="#0052cc" style={{ margin: '0 auto 0.25rem' }} />
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>&lt;{quickViewProduct.noiseDb} dB</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(15,23,42,0.55)', fontWeight: 600 }}>Ultra Quiet</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#0052cc', fontFamily: 'var(--font-ui)', marginBottom: '0.5rem', fontWeight: 700 }}>
                SELECT FINISH ARCHITECTURE: <strong>{selectedFinish.name}</strong>
              </label>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {quickViewProduct.finishes.map((finish, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedFinishIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '9999px',
                      border: selectedFinishIndex === idx ? '1.5px solid #0052cc' : '1px solid rgba(0,82,204,0.15)',
                      backgroundColor: selectedFinishIndex === idx ? 'rgba(0, 82, 204, 0.12)' : '#f4f7fb',
                      color: '#0f172a',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: finish.hex }} />
                    {finish.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(0,82,204,0.12)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.8rem', fontWeight: 900, color: '#0052cc' }}>
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                  <ShieldCheck size={12} color="#0052cc" /> Includes 5-Year On-Site Warranty
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(quickViewProduct, selectedFinish.name);
                  handleClose();
                }}
                style={{
                  padding: '0.85rem 1.8rem',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #0052cc 0%, #0066ff 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-ui)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 20px rgba(0, 82, 204, 0.3)',
                }}
              >
                <ShoppingBag size={16} /> Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
