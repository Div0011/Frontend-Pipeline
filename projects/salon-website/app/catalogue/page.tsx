'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import OptionWheel from '../../components/OptionWheel';
import ScrollExpand from '../../components/ScrollExpand';
import FlyingPosters from '../../components/FlyingPosters';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

const CATALOGUE_RITUALS = [
  {
    category: 'HAUTE CUTTING & SHAPING',
    services: [
      {
        name: 'Sculptural Dry Cut & Glaze',
        time: '90 min',
        price: '185 €',
        desc: 'Morphological diagnostic, dry carving with Japanese steel shears, and high-gloss shine finish.',
      },
      {
        name: 'Complete Restructuring & Visagism',
        time: '120 min',
        price: '240 €',
        desc: 'Total volume realignment and silhouette transformation guided by facial architecture.',
      },
    ],
  },
  {
    category: 'COLOR & SOLAR BALAYAGE',
    services: [
      {
        name: 'Sun-Kissed Balayage',
        time: '180 min',
        price: '340 €',
        desc: 'Signature chiaroscuro gradient applied with watercolor brushes for seamless natural daylight radiance.',
      },
      {
        name: 'Pure Botanical Color Gloss',
        time: '75 min',
        price: '160 €',
        desc: 'Ammonia-free organic pigment bath infused with camellia oil for multidimensional depth.',
      },
    ],
  },
  {
    category: 'SCALP SPA & CAVIAR',
    services: [
      {
        name: 'White Caviar Immersion & Obsidian Therapy',
        time: '90 min',
        price: '230 €',
        desc: 'Enzymatic scalp exfoliation, micronized ozone steam, and warm obsidian cranio-sacral massage.',
      },
      {
        name: 'Japanese Head Spa Ceremony',
        time: '75 min',
        price: '210 €',
        desc: 'Therapeutic warm water cascade, cellular oxygenation, and tension-release acupressure.',
      },
    ],
  },
];

const POSTER_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1600&auto=format&fit=crop',
];

export default function CataloguePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#09090a',
        color: '#ffffff',
        overflowX: 'hidden',
      }}
    >
      <Header />
      <OptionWheel defaultSelected={3} />

      {/* Full-Bleed Hero Image with Content Overlaid */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '75vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'clamp(2rem, 6vw, 6rem)',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2000&auto=format&fit=crop"
          alt="LUMIÈRE Paris Catalogue"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.55)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '850px',
          }}
        >
          <h1
            style={{
              fontFamily: serif,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              margin: '0 0 1.25rem 0',
              color: '#ffffff',
              textShadow: '0 10px 40px rgba(0,0,0,0.8)',
            }}
          >
            The Catalogue
          </h1>

          <p
            style={{
              fontFamily: sans,
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 0,
              maxWidth: '650px',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            A curated suite of bespoke hair and scalp ceremonies.
          </p>
        </div>
      </section>

      {/* Full-Width ScrollExpand Feature */}
      <div style={{ margin: '4rem 0' }}>
        <ScrollExpand
          src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2000&auto=format&fit=crop"
          alt="White Caviar Ritual"
          title="THE SIGNATURE RITUAL"
          scrollHint="Scroll to expand"
          startWidth={65}
          startHeight={65}
          startRadius={16}
          endRadius={0}
        >
          <p
            style={{
              fontFamily: serif,
              fontSize: '1.4rem',
              fontStyle: 'italic',
              color: '#ffffff',
              maxWidth: '520px',
              margin: '0 auto 1.5rem auto',
            }}
          >
            « An extraordinary sensory interlude in private acoustic suites. »
          </p>
          <Link
            href="/booking"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              background: '#ffffff',
              color: '#09090a',
              padding: '0.8rem 2.2rem',
              borderRadius: '100px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Reserve Now &rarr;
          </Link>
        </ScrollExpand>
      </div>

      {/* Main Service List (Borderless & Monochromatic) */}
      <main
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '4rem clamp(1.5rem, 5vw, 5rem) 6rem clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {CATALOGUE_RITUALS.map((cat, idx) => (
          <div key={idx} style={{ marginBottom: '5rem' }}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '0.04em',
                color: '#ffffff',
                marginBottom: '2rem',
              }}
            >
              {cat.category}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {cat.services.map((srv, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                  }}
                >
                  <div style={{ maxWidth: '680px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.4rem' }}>
                      <h3
                        style={{
                          fontFamily: serif,
                          fontSize: '1.5rem',
                          fontWeight: 400,
                          color: '#ffffff',
                          margin: 0,
                        }}
                      >
                        {srv.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: sans,
                          fontSize: '0.72rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        {srv.time}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: sans,
                        fontSize: '0.88rem',
                        fontWeight: 300,
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: 0,
                      }}
                    >
                      {srv.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <span
                      style={{
                        fontFamily: serif,
                        fontSize: '1.6rem',
                        fontWeight: 400,
                        color: '#ffffff',
                      }}
                    >
                      {srv.price}
                    </span>
                    <Link
                      href="/booking"
                      style={{
                        fontFamily: sans,
                        fontSize: '0.72rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span>Book</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 3D FlyingPosters Section */}
        <div style={{ marginTop: '5rem', marginBottom: '6rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 300,
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Botanical Formulations
            </h2>
          </div>

          <div
            style={{
              height: '580px',
              overflow: 'hidden',
            }}
          >
            <FlyingPosters
              items={POSTER_IMAGES}
              planeWidth={340}
              planeHeight={420}
              distortion={3.0}
              scrollEase={0.04}
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
          }}
        >
          <Link
            href="/about"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
            }}
          >
            &larr; The Atelier
          </Link>

          <Link
            href="/booking"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            The Booking &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
