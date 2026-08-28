'use client';

import React from 'react';
import { LenisProvider } from '../components/LenisProvider';
import { CinematicViewportEngine } from '../components/CinematicViewportEngine';
import { CustomCursor } from '../components/CustomCursor';
import { AudioEngine } from '../components/AudioEngine';

export default function Home() {
  return (
    <LenisProvider>
      {/* Luxury Glass Custom Cursor */}
      <CustomCursor />

      {/* Ambient Paris Atelier Soundscape */}
      <AudioEngine />

      {/* 
        LUMIÈRE — HAUTE COIFFURE & ATELIER PARIS
        Continuous 4-Video Scrollytelling Architecture:
        - Video 1 (192 frames): Hero Section (L'Entrée & Titre Monumental)
        - Video 2 (240 frames): The Story & The About (L'Héritage & L'Atelier)
        - Video 3 (240 frames): The Catalogue & The Booking (Les Rituels & La Réservation)
        - Video 4 (240 frames): Outro & Footer Section (L'Épilogue & Coordonnées)
      */}
      <main style={{ position: 'relative', overflowX: 'hidden', isolation: 'isolate', background: '#0b0b0c' }}>
        <CinematicViewportEngine />
      </main>
    </LenisProvider>
  );
}
