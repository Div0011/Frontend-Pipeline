'use client';

import React from 'react';
import { useCart } from '../../lib/cart-context';
import { X, Trash2, Plus, Minus, Truck, ArrowRight, Zap } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const freeShippingThreshold = 5000;
  const progressToFreeShipping = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  if (!isCartOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(3, 14, 30, 0.75)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={() => setIsCartOpen(false)}
        data-cursor="default"
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid rgba(0, 82, 204, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100001,
          boxShadow: '-10px 0 40px rgba(0, 82, 204, 0.15)',
          color: '#0f172a',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(0, 82, 204, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f4f7fb',
          }}
        >
          <div>
            <span style={{ fontSize: '0.7rem', color: '#0052cc', fontFamily: 'var(--font-ui)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
              LUXURY SHOPPING BAG
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: 0, color: '#0f172a' }}>Your Selections</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
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

        <div style={{ padding: '1rem 1.5rem', backgroundColor: 'rgba(0, 82, 204, 0.05)', borderBottom: '1px solid rgba(0, 82, 204, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#0052cc', marginBottom: '0.4rem', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>
            <Truck size={14} />
            {remainingForFreeShipping === 0 ? (
              <span>Unlocked: <strong>Complimentary Express Pan-India Shipping!</strong></span>
            ) : (
              <span>Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> for Free Insured Express Delivery</span>
            )}
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(0, 82, 204, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressToFreeShipping}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #0052cc, #0066ff)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {cart.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', color: 'rgba(15, 23, 42, 0.4)', padding: '2rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 82, 204, 0.1)', color: '#0052cc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>Your Bag is Empty</h3>
              <p style={{ fontSize: '0.85rem' }}>Explore our architectural BLDC ceiling fan collection to elevate your living space.</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedFinish}-${idx}`}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid rgba(0, 82, 204, 0.12)',
                  position: 'relative',
                }}
              >
                <video
                  src={item.product.hoverVideo || item.product.image || '/media/blades_rotating.mp4'}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '70px', height: '70px', objectFit: 'contain', background: '#020b1c', borderRadius: '8px', padding: '0.25rem' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#0f172a', margin: 0 }}>
                        {item.product.name}
                      </h4>
                      <div style={{ fontSize: '0.72rem', color: '#0052cc', fontFamily: 'var(--font-ui)', marginTop: '0.1rem', fontWeight: 600 }}>
                        Finish: {item.selectedFinish}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedFinish)}
                      data-cursor="default"
                      style={{ color: 'rgba(15, 23, 42, 0.4)', padding: '0.2rem' }}
                      title="Remove Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 82, 204, 0.08)', borderRadius: '9999px', padding: '0.15rem 0.5rem' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedFinish, -1)}
                        data-cursor="default"
                        style={{ color: '#0052cc', display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-ui)', padding: '0 0.25rem', color: '#0f172a' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedFinish, 1)}
                        data-cursor="default"
                        style={{ color: '#0052cc', display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: '1rem', color: '#0052cc' }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(0, 82, 204, 0.15)', background: '#f4f7fb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.65)', marginBottom: '0.4rem' }}>
              <span>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-ui)', color: '#0f172a', fontWeight: 600 }}>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.65)', marginBottom: '0.8rem' }}>
              <span>Pan-India Shipping</span>
              <span style={{ color: '#0052cc', fontFamily: 'var(--font-ui)', fontWeight: 700 }}>
                {remainingForFreeShipping === 0 ? 'COMPLIMENTARY' : '₹250'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, paddingTop: '0.75rem', borderTop: '1px solid rgba(0, 82, 204, 0.15)', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', color: '#0f172a' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-ui)', color: '#0052cc', fontWeight: 900 }}>
                ₹{(cartTotal + (remainingForFreeShipping === 0 ? 0 : 250)).toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => alert(`Redirecting to secure payment checkout for ₹${(cartTotal + (remainingForFreeShipping === 0 ? 0 : 250)).toLocaleString('en-IN')}!`)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #0052cc 0%, #0066ff 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                fontFamily: 'var(--font-ui)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(0, 82, 204, 0.3)',
              }}
            >
              Proceed to Secure Checkout <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
