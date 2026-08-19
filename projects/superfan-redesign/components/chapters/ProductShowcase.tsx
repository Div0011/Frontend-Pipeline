'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '../../lib/data';
import { useCart } from '../../lib/cart-context';
import { ShoppingBag, Eye, Zap, VolumeX, ShieldCheck, Award, Wind } from 'lucide-react';

const SPEC_STRIP = [
  { icon: <Zap size={13} color="#00c8f8" />, value: '35W', label: 'Peak Power' },
  { icon: <VolumeX size={13} color="#00c8f8" />, value: '<32dB', label: 'Noise Level' },
  { icon: <Wind size={13} color="#00c8f8" />, value: '230 CMM', label: 'Airflow' },
  { icon: <ShieldCheck size={13} color="#00c8f8" />, value: '5 Year', label: 'Warranty' },
  { icon: <Award size={13} color="#d4af75" />, value: 'BEE 5★', label: 'Rating' },
];

export const ProductShowcase: React.FC = () => {
  const { addToCart, setQuickViewProduct } = useCart();
  const heroProduct = PRODUCTS.find((p) => p.id === 'superq-lux') || PRODUCTS[0];

  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const selectedFinish = heroProduct.finishes[selectedFinishIndex] || heroProduct.finishes[0];

  return (
    <section
      id="showcase"
      aria-label="SuperQ Lux Product Showcase"
      style={{
        padding: '6rem 0 5rem',
        backgroundColor: 'transparent',
        color: '#ffffff',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container-custom">

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 4rem' }}>
          <span className="label-ui" style={{ display: 'block', marginBottom: '0.75rem' }}>
            CHAPTER II — ARCHITECTURAL CROWN
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              fontWeight: 300,
              letterSpacing: '-0.035em',
              lineHeight: 0.95,
              marginBottom: '1rem',
              background: 'linear-gradient(130deg, #ffffff 30%, rgba(0,200,248,0.9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            SuperQ Lux
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Aerodynamic contoured blades, cyan motor accents, and silent 35W BLDC air circulation — engineered as an architectural centerpiece.
          </p>
        </div>

        {/* Spec Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1px',
            marginBottom: '3.5rem',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1px solid rgba(0,200,248,0.1)',
          }}
        >
          {SPEC_STRIP.map((spec) => (
            <div
              key={spec.label}
              style={{
                flex: 1,
                padding: '1rem 0.5rem',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                borderRight: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {spec.icon}
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{spec.value}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.52rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{spec.label}</div>
            </div>
          ))}
        </div>

        {/* Editorial Split Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '55% 1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* LEFT — Video (55%) */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '520px',
              border: '1px solid rgba(0,200,248,0.12)',
              background: '#010810',
            }}
            data-cursor="play"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-label="3D SuperQ Lux spinning fan presentation"
              poster="/media/modern_fan_spinning-poster.webp"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.9) contrast(1.08) saturate(1.15)',
              }}
            >
              <source src="/media/modern_fan_spinning.mp4" type="video/mp4" />
              <p>Your browser does not support video. <a href="/products/superq-lux">View product details</a></p>
            </video>

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(2,12,27,0.75) 0%, transparent 50%)',
                pointerEvents: 'none',
              }}
            />

            {/* Live badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(2,12,27,0.9)',
                border: '1px solid rgba(0,200,248,0.2)',
                padding: '0.4rem 0.9rem',
                borderRadius: '9999px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00c8f8', animation: 'pulseDot 2s ease-in-out infinite' }} />
              <style>{`@keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }`}</style>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', letterSpacing: '0.15em', color: '#00c8f8', textTransform: 'uppercase' }}>
                Live 3D Motion Render
              </span>
            </div>
          </div>

          {/* RIGHT — Product Config */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Name & subtitle */}
            <div>
              <div className="label-ui" style={{ marginBottom: '0.5rem' }}>INTERACTIVE CONFIGURATOR</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#ffffff', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '0.85rem' }}>
                SuperQ Lux Architectural
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                {heroProduct.description}
              </p>
            </div>

            {/* Finish selector */}
            <div>
              <label
                id="finish-label"
                style={{
                  display: 'block',
                  fontSize: '0.6rem',
                  color: 'rgba(0,200,248,0.8)',
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.85rem',
                  fontWeight: 600,
                }}
              >
                FINISH — <strong style={{ color: '#ffffff' }}>{selectedFinish.name}</strong>
              </label>
              <div role="radiogroup" aria-labelledby="finish-label" style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                {heroProduct.finishes.map((finish, idx) => {
                  const isSelected = selectedFinishIndex === idx;
                  return (
                    <button
                      key={idx}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedFinishIndex(idx)}
                      title={finish.name}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: finish.hex,
                        border: isSelected ? '3px solid #00c8f8' : '3px solid transparent',
                        outline: isSelected ? 'none' : 'none',
                        boxShadow: isSelected
                          ? `0 0 0 2px rgba(2,12,27,0.8), 0 0 0 4px rgba(0,200,248,0.5), 0 0 16px rgba(0,200,248,0.35)`
                          : '0 0 0 2px rgba(255,255,255,0.15)',
                        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                        cursor: 'pointer',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Price display */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(0,200,248,0.12)',
              }}
            >
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
                PRICE INCL. ALL TAXES
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '2.4rem', fontWeight: 500, color: '#00c8f8', letterSpacing: '-0.02em' }}>
                  ₹{heroProduct.price.toLocaleString('en-IN')}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.28)',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{(heroProduct.price * 1.3).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-ui)',
                    background: 'rgba(0,200,248,0.1)',
                    color: '#00c8f8',
                    border: '1px solid rgba(0,200,248,0.25)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  SAVE 23%
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setQuickViewProduct(heroProduct)}
                className="btn-8state btn-secondary"
                aria-label="View technical specifications"
                style={{ flex: 1 }}
              >
                <Eye size={14} color="var(--color-arctic-cyan)" /> View Specs
              </button>
              <button
                onClick={() => addToCart(heroProduct, selectedFinish.name)}
                className="btn-8state btn-primary btn-shimmer"
                aria-label="Add SuperQ Lux to cart"
                style={{ flex: 2, boxShadow: '0 6px 25px rgba(0,82,204,0.45)' }}
              >
                <ShoppingBag size={14} /> Add to Cart
              </button>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              {['Free Pan-India Delivery', '5-Year Warranty', 'BEE 5-Star'].map((trust) => (
                <div key={trust} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00c8f8', flexShrink: 0 }} />
                  {trust}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
