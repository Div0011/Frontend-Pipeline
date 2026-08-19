'use client';

import React from 'react';
import { ScrollyVideo, ScrollyStage } from '../shared/ScrollyVideo';

const explosionStages: ScrollyStage[] = [
  {
    range: [0, 0.2],
    badge: 'LAYER 01',
    headline: 'Aerodynamic Winglet Blades',
    body: 'Seamless contoured aluminum alloy blades engineered with aeronautical winglets. Eliminates tip vortices and turbulence noise — the first layer to separate in the explosion.',
  },
  {
    range: [0.2, 0.4],
    badge: 'LAYER 02',
    headline: 'Vector Drive & Magnet Rotor',
    body: 'Sensorless vector control PCB + rare-earth N45 neodymium magnets. Computes flux electro-magnetically without fragile sensors, delivering zero rotor thermal radiation.',
  },
  {
    range: [0.4, 0.6],
    badge: 'LAYER 03',
    headline: 'BEE 5-Star 35W Stator Core',
    body: 'Ultra-dense stator winding geometry delivering maximum electromagnetic torque while drawing just 35W at peak speed. 69% energy reduction.',
  },
  {
    range: [0.6, 0.8],
    badge: 'LAYER 04',
    headline: 'Offline Neural Speech Chip',
    body: 'Onboard speech-processing microcontroller interpreting English & Hindi voice commands 100% offline. Zero internet, zero cloud dependency.',
  },
  {
    range: [0.8, 1.0],
    badge: 'CONVERGENCE',
    headline: 'Integrated Precision.',
    body: 'Every layer reassembles into a single purpose: silent, efficient, intelligent airflow. 5-year warranty. Patented sensorless BLDC control.',
  },
];

export const TechnologySection: React.FC = () => {
  return (
    <ScrollyVideo
      videoSrc="/media/exploded_view_anim.mp4"
      stages={explosionStages}
      bgHex="#030e1e"
      overlayGrad="radial-gradient(circle at center, rgba(3,14,30,0.05) 0%, rgba(3,14,30,0.88) 80%)"
      scrollMultiplier={2.2}
      sectionId="technology"
      chapterLabel="CHAPTER III — SCROLL-DRIVEN 3D CAD EXPLORATION"
      chapterTitle="The Architecture of Superfan BLDC"
      ariaLabel="Scroll to explore 3D CAD motor exploded view"
    />
  );
};
