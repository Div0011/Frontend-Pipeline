'use client';

import React from 'react';
import { useCart } from '../../lib/cart-context';
import { PRODUCTS } from '../../lib/data';
import { X, Check, Minus, ShoppingBag } from 'lucide-react';

export const ComparisonModal: React.FC = () => {
  const { isComparisonOpen, setIsComparisonOpen, addToCart } = useCart();

  if (!isComparisonOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(3, 14, 30, 0.75)',
          backdropFilter: 'blur(12px)',
        }}
        onClick={() => setIsComparisonOpen(false)}
        data-cursor="default"
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '85vh',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 82, 204, 0.25)',
          borderRadius: '24px',
          boxShadow: '0 25px 80px rgba(0, 82, 204, 0.2)',
          color: '#0f172a',
          zIndex: 100001,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid rgba(0, 82, 204, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f4f7fb',
          }}
        >
          <div>
            <span style={{ fontSize: '0.7rem', color: '#0052cc', fontFamily: 'var(--font-ui)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
              TECHNICAL MATRIX
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: 0, color: '#0f172a' }}>
              Superfan Product Comparison
            </h2>
          </div>
          <button
            onClick={() => setIsComparisonOpen(false)}
            data-cursor="default"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 82, 204, 0.08)',
              color: '#0052cc',
              border: '1px solid rgba(0, 82, 204, 0.15)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem 2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0, 82, 204, 0.2)' }}>
                <th style={{ padding: '1rem', width: '220px', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: '#0052cc', fontWeight: 800 }}>
                  SPECIFICATION
                </th>
                {PRODUCTS.slice(0, 4).map((product) => (
                  <th key={product.id} style={{ padding: '1rem', textAlign: 'center', width: '200px' }}>
                    <video
                      src={product.hoverVideo || product.image || '/media/blades_rotating.mp4'}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '0 auto 0.5rem', filter: 'brightness(0.9)' }}
                    />
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#0f172a' }}>{product.name}</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.95rem', color: '#0052cc', marginTop: '0.2rem', fontWeight: 800 }}>₹{product.price.toLocaleString('en-IN')}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(0, 82, 204, 0.08)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.7)' }}>Power Consumption</td>
                {PRODUCTS.slice(0, 4).map((p) => (
                  <td key={p.id} style={{ padding: '1rem', textAlign: 'center', fontFamily: 'var(--font-ui)', fontWeight: 800, color: '#0f172a' }}>
                    {p.wattage}W (Peak)
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(0, 82, 204, 0.08)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.7)' }}>Airflow Delivery</td>
                {PRODUCTS.slice(0, 4).map((p) => (
                  <td key={p.id} style={{ padding: '1rem', textAlign: 'center', fontFamily: 'var(--font-ui)', color: '#0f172a', fontWeight: 600 }}>
                    {p.airflowCFM} CFM
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(0, 82, 204, 0.08)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.7)' }}>Noise Level</td>
                {PRODUCTS.slice(0, 4).map((p) => (
                  <td key={p.id} style={{ padding: '1rem', textAlign: 'center', fontFamily: 'var(--font-ui)', color: '#0f172a', fontWeight: 600 }}>
                    &lt;{p.noiseDb} dB (Silent)
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(0, 82, 204, 0.08)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.7)' }}>Direct Voice Control</td>
                {PRODUCTS.slice(0, 4).map((p) => (
                  <td key={p.id} style={{ padding: '1rem', textAlign: 'center' }}>
                    {p.smartTech.hasVoice ? <Check size={18} color="#0052cc" style={{ margin: '0 auto' }} /> : <Minus size={16} color="rgba(0, 0, 0, 0.2)" style={{ margin: '0 auto' }} />}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(0, 82, 204, 0.08)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.7)' }}>RF Remote Control</td>
                {PRODUCTS.slice(0, 4).map((p) => (
                  <td key={p.id} style={{ padding: '1rem', textAlign: 'center' }}>
                    {p.smartTech.hasRemote ? <Check size={18} color="#0052cc" style={{ margin: '0 auto' }} /> : <Minus size={16} color="rgba(0, 0, 0, 0.2)" style={{ margin: '0 auto' }} />}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(0, 82, 204, 0.08)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.7)' }}>On-Site Warranty</td>
                {PRODUCTS.slice(0, 4).map((p) => (
                  <td key={p.id} style={{ padding: '1rem', textAlign: 'center', fontFamily: 'var(--font-ui)', color: '#0052cc', fontWeight: 800 }}>
                    5 Years
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ padding: '1rem' }}></td>
                {PRODUCTS.slice(0, 4).map((p) => (
                  <td key={p.id} style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        addToCart(p);
                        setIsComparisonOpen(false);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, #0052cc 0%, #0066ff 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-ui)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem',
                        margin: '0 auto',
                      }}
                    >
                      <ShoppingBag size={12} /> Select
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
