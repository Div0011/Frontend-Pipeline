'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ViewTransitionLink } from './ViewTransitionLink';
import { Product } from '../../lib/data';
import { useCart } from '../../lib/cart-context';
import { Eye, ShoppingBag, Star, Zap, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from './useReducedMotion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct } = useCart();
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const selectedFinish = product.finishes[selectedFinishIndex] || product.finishes[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -8, y: x * 8 });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  const savingPct = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const placeholderVideo = product.hoverVideo || product.image || '/media/blades_rotating.mp4';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
      onMouseMove={handleMouseMove}
      data-cursor="default"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden',
        background: isHovered
          ? 'linear-gradient(145deg, rgba(0,30,80,0.98) 0%, rgba(2,10,28,0.99) 100%)'
          : 'linear-gradient(145deg, rgba(5,18,42,0.96) 0%, rgba(3,10,24,0.98) 100%)',
        border: isHovered
          ? '1px solid rgba(0, 212, 255, 0.4)'
          : '1px solid rgba(0, 82, 204, 0.18)',
        boxShadow: isHovered
          ? '0 30px 70px rgba(0,0,0,0.7), 0 0 40px rgba(0,82,204,0.2), inset 0 0 60px rgba(0,212,255,0.02)'
          : '0 8px 30px rgba(0,0,0,0.4)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: prefersReduced ? (isHovered ? 'translateY(-8px)' : 'translateY(0)') : `translateY(${isHovered ? -8 : 0}px) perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        cursor: 'none',
      }}
    >
      {/* Interactive spotlight glow that follows cursor */}
      {!prefersReduced && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,212,255,0.12) 0%, transparent 60%)`,
            opacity: isHovered ? 0.6 : 0,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
            zIndex: 0,
          }}
        />
      )}
      {/* ── Video Container (always video, no static images) ── */}
      <ViewTransitionLink
        href={`/products/${product.id}`}
        className="view-transition-hero"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          background: '#020b1c',
          cursor: 'none',
        }}
      >
        {/* Video element — plays on hover */}
        <video
          ref={videoRef}
          src={placeholderVideo}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isHovered ? 1 : 0.45,
            transition: 'opacity 0.5s ease, filter 0.5s ease',
            filter: `brightness(${isHovered ? 0.9 : 0.7}) saturate(1.2) contrast(${isHovered ? 1.1 : 1})`,
          }}
        />

        {/* Overlay gradient for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(3,14,30,0.85) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge: Bestseller / Save */}
        <div
          style={{
            position: 'absolute',
            top: '0.9rem',
            left: '0.9rem',
            right: '0.9rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {product.isBestseller && (
              <span
                style={{
                  fontSize: '0.55rem',
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: 'rgba(0,212,255,0.12)',
                  color: '#00d4ff',
                  border: '1px solid rgba(0,212,255,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Bestseller
              </span>
            )}
            {savingPct > 0 && (
              <span
                style={{
                  fontSize: '0.55rem',
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: '0.1em',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: 'rgba(0,82,204,0.2)',
                  color: 'rgba(160,210,255,0.9)',
                  border: '1px solid rgba(0,82,204,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Save {savingPct}%
              </span>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.6rem',
              borderRadius: '9999px',
              background: 'rgba(3,14,30,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Star size={10} fill="#00d4ff" color="#00d4ff" />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: '#ffffff', fontWeight: 500 }}>
              {product.rating}
            </span>
          </div>
        </div>

        {/* Live indicator when hovering */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '0.8rem',
              right: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.7rem',
              borderRadius: '9999px',
              background: 'rgba(0, 212, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              backdropFilter: 'blur(8px)',
              zIndex: 10,
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00d4ff', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.52rem', letterSpacing: '0.12em', color: 'rgba(0,212,255,0.9)', textTransform: 'uppercase' }}>
              Playing
            </span>
          </div>
        )}
      </div>
      </ViewTransitionLink>

      {/* ── Details Panel ── */}
      <div
        style={{
          padding: '1.4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flex: 1,
        }}
      >
        {/* Category + wattage */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(0,212,255,0.6)',
            }}
          >
            {product.category}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}
          >
            <Zap size={9} color="rgba(0,212,255,0.5)" />
            {product.wattage}W BLDC
          </span>
        </div>

        {/* Name */}
        <div>
          <h3
            onClick={() => setQuickViewProduct(product)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem,2vw,1.5rem)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: '0.3rem',
              cursor: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(0,212,255,0.9)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.subtitle}
          </p>
        </div>

        {/* Finish selector */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.52rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              marginBottom: '0.45rem',
            }}
          >
            Finish: {selectedFinish.name}
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {product.finishes.map((finish, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFinishIndex(idx)}
                title={finish.name}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: finish.hex,
                  border: selectedFinishIndex === idx
                    ? '2px solid rgba(0,212,255,0.8)'
                    : '1px solid rgba(255,255,255,0.15)',
                  transform: selectedFinishIndex === idx ? 'scale(1.3)' : 'scale(1)',
                  boxShadow: selectedFinishIndex === idx ? '0 0 8px rgba(0,212,255,0.5)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Pricing + CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.9rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginTop: 'auto',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.3rem',
                  fontWeight: 500,
                  background: 'linear-gradient(120deg, #ffffff, rgba(0,212,255,0.9))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.52rem',
                letterSpacing: '0.1em',
                color: 'rgba(0,212,255,0.5)',
                marginTop: '0.15rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <ShieldCheck size={9} color="rgba(0,212,255,0.5)" />
              5-Yr Warranty
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewProduct(product); }}
                title="Quick View"
                aria-label="Quick View"
                style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'; e.currentTarget.style.color = '#00d4ff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              <Eye size={15} />
            </button>

            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, selectedFinish.name); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.1rem',
                borderRadius: '9999px',
                background: isHovered
                  ? 'linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(0,82,204,0.3) 100%)'
                  : 'rgba(0,82,204,0.15)',
                border: '1px solid rgba(0,82,204,0.4)',
                color: 'rgba(0,212,255,0.95)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,82,204,0.6), rgba(0,212,255,0.3))';
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.6)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isHovered ? 'linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(0,82,204,0.3) 100%)' : 'rgba(0,82,204,0.15)';
                e.currentTarget.style.borderColor = 'rgba(0,82,204,0.4)';
                e.currentTarget.style.color = 'rgba(0,212,255,0.95)';
              }}
            >
              <ShoppingBag size={13} /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
