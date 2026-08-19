'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ViewTransitionLink } from '@/components/shared/ViewTransitionLink';
import { PRODUCTS } from '@/lib/data';
import { ArrowLeft, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p: { id: string }) => p.id === id);

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '2rem',
        background: '#0a192f',
        color: '#ffffff',
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300 }}>
          Product Not Found
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-ui)', fontSize: '0.85rem' }}>
          The fan you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <ViewTransitionLink
          href="/"
          className="btn-8state btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          Back to Collection
        </ViewTransitionLink>
      </div>
    );
  }

  const savings = ((1 - product.wattage / product.traditionalWattage) * 100).toFixed(0);

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '6rem',
      background: '#0a192f',
      color: '#ffffff',
    }}>
      <div className="container-custom" style={{ padding: '2rem 0' }}>
        <ViewTransitionLink
          href="/"
          className="btn-8state btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            marginBottom: '2rem',
            textDecoration: 'none',
            fontSize: '0.75rem',
          }}
        >
          <ArrowLeft size={14} />
          Back to Collection
        </ViewTransitionLink>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          <div
            className="view-transition-hero"
            style={{
              aspectRatio: '4/3',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(0,212,255,0.15)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <video
              src={product.image}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#00d4ff',
              }}>
                {product.category}
              </span>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                marginTop: '0.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(0,212,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {product.name}
              </h1>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '0.75rem',
                lineHeight: 1.6,
              }}>
                {product.description}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: '16px',
              background: 'rgba(0,82,204,0.08)',
              border: '1px solid rgba(0,82,204,0.2)',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
                color: '#ffffff',
              }}>
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'line-through',
                }}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
            }}>
              {[
                { label: 'Power', value: `${product.wattage}W` },
                { label: 'Airflow', value: `${product.airflowCFM} CFM` },
                { label: 'Noise', value: `${product.noiseDb} dB` },
                { label: 'Savings', value: `${savings}%` },
                { label: 'Sweep', value: `${product.sweepMm}mm` },
                { label: 'Warranty', value: `${product.warrantyYears} Yrs` },
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                    fontWeight: 400,
                    color: '#00d4ff',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: '0.25rem',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn-8state btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                fontSize: '0.8rem',
                marginTop: '0.5rem',
              }}
            >
              <ShoppingBag size={18} />
              Add to Bag
            </button>

            {product.features.length > 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                {product.features.slice(0, 4).map((feature: string) => (
                  <div key={feature} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    <Zap size={12} color="#00d4ff" />
                    {feature}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
