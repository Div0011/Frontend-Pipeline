'use client';

import React from 'react';
import { ScrollyVideo, ScrollyStage } from '../shared/ScrollyVideo';
import { ChevronDown } from 'lucide-react';

const heroStages: ScrollyStage[] = [
  {
    range: [0, 0.2],
    badge: "INDIA'S FIRST BLDC PIONEER",
    headline: 'Silence. Engineered.',
    body: '35W · 500,000+ Tons CO₂ Prevented · 100% Offline Voice Intelligence. A ceiling fan reimagined as an architectural masterpiece.',
  },
  {
    range: [0.2, 0.4],
    badge: 'PILLAR I — SILENCE (< 32dB)',
    headline: 'Acoustic Perfection.',
    body: 'Neodymium permanent magnets eliminate 50Hz hum. Under 32dB — quieter than a library whisper. Engineered for deep sleep.',
  },
  {
    range: [0.4, 0.6],
    badge: 'PILLAR II — EFFICIENCY (35W)',
    headline: '69% Less Power.',
    body: 'Slashed from 75W to 35W peak. Sensorless BLDC vector drive — pioneered in Coimbatore. BEE 5-Star certified.',
  },
  {
    range: [0.6, 0.8],
    badge: 'PILLAR III — INTELLIGENCE (myQ)',
    headline: 'Offline Voice Control.',
    body: 'Speak in Hindi or English. Onboard chip responds in milliseconds — zero internet, zero cloud, zero latency.',
  },
  {
    range: [0.8, 1.0],
    badge: 'PILLAR IV — DURABILITY (5-YEAR)',
    headline: 'Built for Generations.',
    body: '100% recyclable aluminium alloy housing. IPX4 hazard-sealed motor. Industry-leading 5-year on-site replacement warranty.',
  },
];

const HeroScrollCue = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    }}
  >
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '1.5rem',
      }}
    >
      <a href="#showcase" className="btn-8state btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.7rem' }}>
        Explore SuperQ Lux
      </a>
      <a href="#calculator" className="btn-8state btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.7rem' }}>
        Calculate Savings
      </a>
    </div>
    {/* Scroll cue arrow */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.2rem',
        opacity: 0.5,
        animation: 'scrollCueBounce 2s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes scrollCueBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 0.7; }
        }
      `}</style>
      <ChevronDown size={20} color="rgba(255,255,255,0.6)" />
    </div>
  </div>
);

export const ColdOpen: React.FC = () => {
  return (
    <ScrollyVideo
      videoSrc="/media/penthouse_turns.mp4"
      stages={heroStages}
      bgHex="#020c1b"
      overlayGrad="radial-gradient(circle at center, rgba(2,12,27,0.05) 0%, rgba(2,12,27,0.88) 78%)"
      scrollMultiplier={1.6}
      chapterLabel="CHAPTER I — THE HERO HOOK"
      ariaLabel="Hero presentation of Superfan BLDC Ceiling Fan"
      heroElement={<HeroScrollCue />}
      sectionId="hero"
      priority={true}
    />
  );
};
