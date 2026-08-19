'use client';

import React from 'react';
import { ScrollyVideo, ScrollyStage } from '../shared/ScrollyVideo';

const hazardStages: ScrollyStage[] = [
  {
    range: [0, 0.2],
    badge: 'ZERO-TURBULENCE INTAKE',
    headline: 'Laminar Air Circulation',
    body: 'Unlike old induction fans that create chaotic turbulent eddies, Superfan precision blades pull intake air smoothly into a non-turbulent vortex. No dust whipping, no acoustic chaos.',
  },
  {
    range: [0.2, 0.38],
    badge: 'DUST SUPPRESSION TECH',
    headline: 'Anti-Static Shield Blades',
    body: 'Precision anti-static surface coating repels microscopic airborne particulates. Blades stay pristine with minimal maintenance even in smoky or dusty environments.',
  },
  {
    range: [0.38, 0.55],
    badge: 'ACOUSTIC SILENCE',
    headline: 'Whisper Under 32dB',
    body: 'Permanent neodymium magnets produce zero 50Hz electrical hum. The fan spins silently even as smoke swirls around it — operation that respects focus and sleep.',
  },
  {
    range: [0.55, 0.73],
    badge: 'ENVIRONMENTAL SEAL',
    headline: 'Hazard Defense Rating',
    body: '100% recyclable aluminum alloy construction resists corrosion, moisture, and airborne contaminants. IPX4-rated motor housing for safety in all conditions.',
  },
  {
    range: [0.73, 1.0],
    badge: 'SUSTAINABLE DESIGN',
    headline: 'Clean Air, Clean Planet',
    body: '35W motor = 69% less heat emission and CO2 compared to 75W induction fans. Every rotation supports a cleaner environment.',
  },
];

export const SmokeDynamicsSection: React.FC = () => {
  return (
    <ScrollyVideo
      videoSrc="/media/spinning_in_smoke.mp4"
      stages={hazardStages}
      bgHex="#030e1e"
      overlayGrad="radial-gradient(circle at center, transparent 35%, rgba(3,14,30,0.88) 90%)"
      scrollMultiplier={2.0}
      chapterLabel="CHAPTER V — HAZARD MANAGEMENT & ENVIRONMENTAL DEFENSE"
      chapterTitle="Pure Laminar Circulation"
      ariaLabel="Scroll to explore hazard management and smoke defense systems"
      sectionId="smoke-defense"
    />
  );
};
