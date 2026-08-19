'use client';

import React, { useState } from 'react';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

interface TreatmentMenuProps {
  onSelectService: (serviceId: string) => void;
}

const CATEGORIES = [
  { id: 'cuts', label: 'HAUTECUT & SCULPTURE' },
  { id: 'color', label: 'BALAYAGE & COLOR ART' },
  { id: 'care', label: 'BOTANICAL ELIXIRS' },
  { id: 'styling', label: 'GALA & BRIDAL' },
];

const TREATMENTS_DATA: Record<string, Array<{ name: string; subtitle: string; price: string; time: string; desc: string; detail: string; id: string }>> = {
  cuts: [
    {
      id: 'cut',
      name: 'The Parisian Architectural Cut',
      subtitle: 'Bespoke Dry Cut & Sculpting',
      price: '€180',
      time: '75 min',
      desc: 'Precision dry-cutting tailored to your natural bone structure, growth pattern, and hair weight.',
      detail: 'Includes organic scalp detox massage & bespoke blow-dry sculpting.',
    },
    {
      id: 'signature-fringe',
      name: 'Curtain Fringe & Frame',
      subtitle: 'Face Framing Architecture',
      price: '€95',
      time: '45 min',
      desc: 'Iconic French curtain fringe and soft face-framing layers to elevate your natural features.',
      detail: 'Includes botanical mist finishing.',
    },
  ],
  color: [
    {
      id: 'balayage',
      name: 'Balayage Sur-Mesure',
      subtitle: 'Freehand Painting & Gloss',
      price: '€290',
      time: '150 min',
      desc: 'Hand-painted dimension seamlessly blended from roots to ends for a sun-kissed, low-maintenance luminous finish.',
      detail: 'Includes silk glossing toner & bond-building elixir treatment.',
    },
    {
      id: 'gloss-glaze',
      name: 'Melted Silk Gloss & Tone',
      subtitle: 'Shine Elixir & Refresh',
      price: '€140',
      time: '60 min',
      desc: 'High-shine acidic color glaze that restores vibrancy, eliminates brass, and seals the hair cuticle.',
      detail: 'Infused with cold-pressed camellia oil.',
    },
  ],
  care: [
    {
      id: 'elixir',
      name: 'Grand Botanical Keratin Elixir',
      subtitle: 'Intensive Re-Structuring',
      price: '€220',
      time: '90 min',
      desc: 'Formaldehyde-free plant-based keratin infusion that eliminates frizz for up to 4 months while retaining natural volume.',
      detail: 'Steam infusion with organic argan and rosehip seed extract.',
    },
    {
      id: 'scalp-spa',
      name: 'Tokyo Head Spa & Scalp Detox',
      subtitle: 'Micro-Bubbles & Scalp Health',
      price: '€165',
      time: '60 min',
      desc: 'Deep clarifying scalp ritual using carbonated water treatment and shiatsu acupressure massage.',
      detail: 'Rebalances scalp microbiome and stimulates hair follicle growth.',
    },
  ],
  styling: [
    {
      id: 'gala',
      name: 'Gala & Red Carpet Waves',
      subtitle: 'Red Carpet Glamour',
      price: '€160',
      time: '60 min',
      desc: 'Sleek glass waves, vintage Hollywood curls, or modern undone chic for high-profile evening occasions.',
      detail: 'Includes heat-protective diamond sheen spray.',
    },
    {
      id: 'bridal',
      name: 'Haute Bridal Consultation & Trial',
      subtitle: 'Custom Wedding Coiffure',
      price: '€380',
      time: '120 min',
      desc: 'Personalized trial session for brides, creating custom veil integration and couture wedding up-dos.',
      detail: 'Includes champagne hospitality & veil placement guide.',
    },
  ],
};

export function TreatmentMenu({ onSelectService }: TreatmentMenuProps) {
  const [activeCategory, setActiveCategory] = useState('cuts');

  return (
    <section
      id="menu"
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#0b0b0c',
        color: '#f5f3ef',
        padding: '7rem 2rem',
        borderTop: '1px solid rgba(230, 198, 135, 0.12)',
        borderBottom: '1px solid rgba(230, 198, 135, 0.12)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section Eyebrow & Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            MENU DES RITUELS · PARIS
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '0 0 1.25rem',
            }}
          >
            The Menu of Crafts
          </h2>
          <p
            style={{
              fontFamily: serif,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(245, 243, 239, 0.7)',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Every service is an intentional ritual — crafted with French heritage, organic botanicals, and modern architectural vision.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  fontFamily: sans,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '100px',
                  background: isActive
                    ? 'linear-gradient(135deg, #f2e3c6 0%, #e6c687 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#0b0b0c' : 'rgba(245, 243, 239, 0.7)',
                  border: isActive
                    ? 'none'
                    : '1px solid rgba(230, 198, 135, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 4px 20px rgba(230, 198, 135, 0.3)' : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Treatment Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {TREATMENTS_DATA[activeCategory]?.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(20, 19, 22, 0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(230, 198, 135, 0.15)',
                borderRadius: '24px',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, borderColor 0.3s ease, boxShadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(230, 198, 135, 0.4)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(230, 198, 135, 0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(230, 198, 135, 0.15)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: sans,
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#e6c687',
                    }}
                  >
                    {item.subtitle}
                  </span>
                  <span
                    style={{
                      fontFamily: sans,
                      fontSize: '0.75rem',
                      color: 'rgba(245, 243, 239, 0.4)',
                    }}
                  >
                    {item.time}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: serif,
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    margin: '0 0 1rem',
                  }}
                >
                  {item.name}
                </h3>

                <p
                  style={{
                    fontFamily: sans,
                    fontSize: '0.85rem',
                    fontWeight: 300,
                    color: 'rgba(245, 243, 239, 0.7)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem',
                  }}
                >
                  {item.desc}
                </p>

                <div
                  style={{
                    paddingTop: '1rem',
                    borderTop: '1px dashed rgba(230, 198, 135, 0.15)',
                    marginBottom: '1.75rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: '0.75rem',
                      fontStyle: 'italic',
                      color: 'rgba(230, 198, 135, 0.75)',
                      margin: 0,
                    }}
                  >
                    ✦ {item.detail}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: serif,
                    fontSize: '1.6rem',
                    fontWeight: 400,
                    color: '#e6c687',
                  }}
                >
                  {item.price}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectService(item.id)}
                  style={{
                    fontFamily: sans,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#e6c687',
                    background: 'transparent',
                    border: '1px solid rgba(230, 198, 135, 0.35)',
                    borderRadius: '50px',
                    padding: '0.65rem 1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#e6c687';
                    (e.currentTarget as HTMLButtonElement).style.color = '#0b0b0c';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = '#e6c687';
                  }}
                >
                  Select Ritual
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
