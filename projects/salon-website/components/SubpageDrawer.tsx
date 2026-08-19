'use client';

import React from 'react';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

export type SubpageType = 'menu' | 'payment' | 'atelier' | null;

interface SubpageDrawerProps {
  activeSubpage: SubpageType;
  onClose: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

export function SubpageDrawer({ activeSubpage, onClose, onOpenBooking }: SubpageDrawerProps) {
  if (!activeSubpage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(11, 11, 12, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          width: 'min(720px, 100%)',
          height: '100vh',
          borderLeft: '1px solid rgba(230, 198, 135, 0.25)',
          padding: '3rem 2.5rem',
          color: '#f5f3ef',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            background: 'transparent',
            border: '1px solid rgba(230, 198, 135, 0.3)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#e6c687',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* ── SUBPAGE 1: DEEP TREATMENT MENU ── */}
        {activeSubpage === 'menu' && (
          <div>
            <p
              style={{
                fontFamily: sans,
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#e6c687',
                marginBottom: '0.5rem',
              }}
            >
              DEEP PAGE · HAUTE MENU
            </p>
            <h2
              style={{
                fontFamily: serif,
                fontSize: '2.5rem',
                fontWeight: 400,
                margin: '0 0 1.5rem',
              }}
            >
              The Full Menu of Crafts
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              {[
                {
                  category: 'HAUTE CUT & SCULPTURE',
                  items: [
                    { name: 'The Parisian Architectural Cut', price: '€180', time: '75 min', desc: 'Bespoke dry-cut tailored to natural bone structure & hair weight.' },
                    { name: 'Curtain Fringe & Face Framing', price: '€95', time: '45 min', desc: 'Iconic French curtain fringe & soft facial layer contouring.' },
                  ],
                },
                {
                  category: 'BALAYAGE & COLOR ARTISTRY',
                  items: [
                    { name: 'Balayage Sur-Mesure & Glossing', price: '€290', time: '150 min', desc: 'Freehand painted dimension with silk acidic glossing toner.' },
                    { name: 'Melted Silk Tone Refresh', price: '€140', time: '60 min', desc: 'High-shine glaze infused with cold-pressed camellia oil.' },
                  ],
                },
                {
                  category: 'BOTANICAL KERATIN & SPA',
                  items: [
                    { name: 'Grand Botanical Keratin Elixir', price: '€220', time: '90 min', desc: 'Formaldehyde-free plant keratin smooth elixir.' },
                    { name: 'Tokyo Scalp Head Spa & Detox', price: '€165', time: '60 min', desc: 'Carbonated scalp clarify ritual & shiatsu massage.' },
                  ],
                },
              ].map((cat) => (
                <div key={cat.category} style={{ borderBottom: '1px solid rgba(230,198,135,0.15)', paddingBottom: '1.5rem' }}>
                  <h4 style={{ fontFamily: sans, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.25em', color: '#e6c687', marginBottom: '1rem' }}>
                    {cat.category}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cat.items.map((it) => (
                      <div key={it.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div>
                          <p style={{ fontFamily: serif, fontSize: '1.2rem', margin: '0 0 0.2rem' }}>{it.name}</p>
                          <p style={{ fontFamily: sans, fontSize: '0.78rem', color: 'rgba(245,243,239,0.5)', margin: 0 }}>{it.desc}</p>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: '90px' }}>
                          <span style={{ fontFamily: serif, fontSize: '1.2rem', color: '#e6c687' }}>{it.price}</span>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenBooking();
                            }}
                            style={{
                              display: 'block',
                              marginTop: '0.3rem',
                              fontFamily: sans,
                              fontSize: '0.62rem',
                              color: '#e6c687',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            }}
                          >
                            Book →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SUBPAGE 2: PAYMENT & PRICING TARIFFS ── */}
        {activeSubpage === 'payment' && (
          <div>
            <p
              style={{
                fontFamily: sans,
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#e6c687',
                marginBottom: '0.5rem',
              }}
            >
              DEEP PAGE · PAYMENT & TARIFFS
            </p>
            <h2
              style={{
                fontFamily: serif,
                fontSize: '2.5rem',
                fontWeight: 400,
                margin: '0 0 1.5rem',
              }}
            >
              Concierge Payment &amp; Policies
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ background: 'rgba(230, 198, 135, 0.06)', border: '1px solid rgba(230, 198, 135, 0.2)', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ fontFamily: serif, fontSize: '1.3rem', color: '#e6c687', margin: '0 0 0.5rem' }}>Accepted Payment Options</h4>
                <p style={{ fontFamily: sans, fontSize: '0.85rem', color: 'rgba(245, 243, 239, 0.7)', lineHeight: 1.6 }}>
                  We accept contactless Apple Pay, Visa, Mastercard, American Express, Contactless Chip & Pin, and Privé Atelier Gift Cards.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {[' Apple Pay', '💳 Visa & Mastercard', '🏛️ Amex Platinum', '🎁 Privé Gift Pass'].map((pay) => (
                    <span key={pay} style={{ fontSize: '0.75rem', fontFamily: sans, background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {pay}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: serif, fontSize: '1.3rem', margin: '0 0 0.5rem' }}>Reservation Deposit &amp; Cancellation</h4>
                <p style={{ fontFamily: sans, fontSize: '0.85rem', color: 'rgba(245, 243, 239, 0.7)', lineHeight: 1.6 }}>
                  A 30% deposit is held upon booking to guarantee your appointment. Cancellations or reschedules made 24 hours prior receive full refund or credit roll.
                </p>
              </div>

              <div>
                <h4 style={{ fontFamily: serif, fontSize: '1.3rem', margin: '0 0 0.5rem' }}>Privé Membership Tier</h4>
                <p style={{ fontFamily: sans, fontSize: '0.85rem', color: 'rgba(245, 243, 239, 0.7)', lineHeight: 1.6 }}>
                  Annual Privé Members receive complimentary blowout sessions, priority fashion week scheduling, and bespoke botanical home-care kits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── SUBPAGE 3: ATELIER MASTERS ── */}
        {activeSubpage === 'atelier' && (
          <div>
            <p
              style={{
                fontFamily: sans,
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#e6c687',
                marginBottom: '0.5rem',
              }}
            >
              DEEP PAGE · L&apos;ÉQUIPE DE PARIS
            </p>
            <h2
              style={{
                fontFamily: serif,
                fontSize: '2.5rem',
                fontWeight: 400,
                margin: '0 0 1.5rem',
              }}
            >
              The Paris Master Artists
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              {[
                { name: 'Élodie Laurent', role: 'Creative Director', exp: '14 Years in Paris & NYC Fashion Weeks', bio: 'Specializes in dry-sculpture cuts that flow with natural movement.' },
                { name: 'Antoine Moreau', role: 'Master Colorist', exp: 'L’Oréal Professional Global Ambassador', bio: 'Pioneer of the French Balayage technique and melted silk glazes.' },
                { name: 'Sophie Chen', role: 'Texture Specialist', exp: 'Tokyo & Paris Scalp Ritual Specialist', bio: 'Expert in botanical keratin smooth elixirs and shiatsu head spa treatments.' },
              ].map((art) => (
                <div key={art.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(230,198,135,0.15)', borderRadius: '16px', padding: '1.5rem' }}>
                  <h4 style={{ fontFamily: serif, fontSize: '1.5rem', margin: '0 0 0.2rem', color: '#e6c687' }}>{art.name}</h4>
                  <p style={{ fontFamily: sans, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.5)', margin: '0 0 0.75rem' }}>
                    {art.role} · {art.exp}
                  </p>
                  <p style={{ fontFamily: sans, fontSize: '0.85rem', color: 'rgba(245,243,239,0.7)', lineHeight: 1.6, margin: 0 }}>{art.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
