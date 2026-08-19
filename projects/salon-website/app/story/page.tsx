'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import OptionWheel from '../../components/OptionWheel';
import DriftWall from '../../components/DriftWall';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

const DRIFT_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop',
    title: 'The Central Atelier',
    subtitle: 'Paris 1924',
  },
  {
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop',
    title: 'Solar Gradients',
    subtitle: 'Botanical Formulations',
  },
  {
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1600&auto=format&fit=crop',
    title: 'Pure Architecture',
    subtitle: 'Japanese Steel Shears',
  },
  {
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1600&auto=format&fit=crop',
    title: 'Acoustic Sanctuary',
    subtitle: 'Private Styling Suite',
  },
  {
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1600&auto=format&fit=crop',
    title: 'White Caviar Spa',
    subtitle: 'Immersion & Ozone Steam',
  },
  {
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1600&auto=format&fit=crop',
    title: 'Couture Silhouette',
    subtitle: 'High Precision',
  },
  {
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1600&auto=format&fit=crop',
    title: 'Parisian Mirrors',
    subtitle: 'Natural Daylight',
  },
  {
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1600&auto=format&fit=crop',
    title: 'Kinetic Movement',
    subtitle: 'Weight & Drape',
  },
];

export default function StoryPage() {
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
      <OptionWheel defaultSelected={1} />

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
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop"
          alt="LUMIÈRE Paris Heritage"
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
            The Heritage
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
            Founded in 1924 on Rue de la Paix, LUMIÈRE redefines hair styling as architectural form.
          </p>
        </div>
      </section>

      {/* Editorial Content Section with Massive Image */}
      <main
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '6rem clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {/* Large Split Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '7rem',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: serif,
                fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}
            >
              The Architecture of Hair
            </h2>

            <p
              style={{
                fontFamily: sans,
                fontSize: '0.95rem',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '1.5rem',
              }}
            >
              Every head of hair is a living sculpture. Our stylists carve with Japanese steel shears on dry hair,
              listening to the weight, grain, and natural velocity of each strand.
            </p>

            <p
              style={{
                fontFamily: serif,
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: '#ffffff',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              « No artificial forcing. Only pure form, light, and motion. »
            </p>
          </div>

          <div
            style={{
              position: 'relative',
              height: '520px',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop"
              alt="Hair Color Architecture"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* 3D DriftWall Masonry Gallery */}
        <div style={{ marginBottom: '6rem' }}>
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
              Visual Archives
            </h2>
          </div>

          <div
            style={{
              height: '620px',
              overflow: 'hidden',
            }}
          >
            <DriftWall
              items={DRIFT_ITEMS}
              columns={4}
              tileWidth={260}
              tileHeight={180}
              gap={20}
              tilt={12}
              turn={-10}
              perspective={1200}
              depth={100}
              speed={32}
              direction="up"
              variance={0.4}
              parallax={0.6}
              lift={48}
              fade={0.4}
              dim={0.3}
              overlayColor="#09090a"
              radius={8}
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
            href="/"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
            }}
          >
            &larr; Back to Experience
          </Link>

          <Link
            href="/about"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            The Atelier &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
