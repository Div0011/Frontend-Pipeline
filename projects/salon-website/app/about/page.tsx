'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import OptionWheel from '../../components/OptionWheel';
import CircularGallery from '../../components/CircularGallery';

const serif = 'var(--font-display)';
const sans = 'var(--font-body)';

const GALLERY_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop',
    text: 'Central Atelier • Rue de la Paix',
  },
  {
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop',
    text: 'Solar Gradients • Pigment Alchemy',
  },
  {
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1600&auto=format&fit=crop',
    text: 'Japanese Steel • Dry Sculpting',
  },
  {
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1600&auto=format&fit=crop',
    text: 'Acoustic Suite • Private Haven',
  },
  {
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1600&auto=format&fit=crop',
    text: 'White Caviar • Scalp Spa',
  },
  {
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1600&auto=format&fit=crop',
    text: 'Couture Styling • Pure Form',
  },
];

const MASTERS = [
  {
    name: 'Antoine de Saint-Germain',
    role: 'Artistic Director',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop',
    bio: 'Pioneer of morphological dry cutting with 18 years across Paris, Tokyo, and Milan.',
  },
  {
    name: 'Éléonore Moreau',
    role: 'Lead Colorist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    bio: 'Master of natural sun-kissed balayage and ammonia-free tonal glazes.',
  },
  {
    name: 'Kenji Takahashi',
    role: 'Head Spa Master',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop',
    bio: 'Creator of cranio-sacral warm obsidian stone scalp therapies with ozone steam.',
  },
];

export default function AboutPage() {
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
      <OptionWheel defaultSelected={2} />

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
          src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2000&auto=format&fit=crop"
          alt="LUMIÈRE Paris Atelier"
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
            The Atelier
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
            Private acoustic sanctuaries designed for complete calm, precision, and tailored hair artistry.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '6rem clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {/* 3D CircularGallery Section */}
        <div style={{ marginBottom: '7rem' }}>
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
              The Atelier Spaces
            </h2>
          </div>

          <div
            style={{
              height: '580px',
              overflow: 'hidden',
            }}
          >
            <CircularGallery
              items={GALLERY_ITEMS}
              bend={1.2}
              textColor="#ffffff"
              borderRadius={0.04}
              scrollEase={0.05}
              scrollSpeed={2}
            />
          </div>
        </div>

        {/* Master Stylists Profiles with Massive Editorial Portraits */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
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
              The Master Artisans
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
            }}
          >
            {MASTERS.map((master, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    position: 'relative',
                    height: '420px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                  }}
                >
                  <img
                    src={master.image}
                    alt={master.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(30%) contrast(1.1)',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(9,9,10,0.8) 0%, transparent 60%)',
                    }}
                  />
                </div>

                <span
                  style={{
                    fontFamily: sans,
                    fontSize: '0.68rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {master.role}
                </span>

                <h3
                  style={{
                    fontFamily: serif,
                    fontSize: '1.6rem',
                    fontWeight: 400,
                    color: '#ffffff',
                    marginBottom: '0.6rem',
                  }}
                >
                  {master.name}
                </h3>

                <p
                  style={{
                    fontFamily: sans,
                    fontSize: '0.88rem',
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.75)',
                    margin: '0 0 1.25rem 0',
                  }}
                >
                  {master.bio}
                </p>

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
                    gap: '0.5rem',
                  }}
                >
                  <span>Book with {master.name.split(' ')[0]}</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            ))}
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
            href="/story"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
            }}
          >
            &larr; The Story
          </Link>

          <Link
            href="/catalogue"
            style={{
              fontFamily: sans,
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            The Catalogue &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
