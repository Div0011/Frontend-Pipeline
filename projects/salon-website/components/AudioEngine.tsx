'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useReducedMotion } from './shared/useReducedMotion';

export function AudioEngine() {
  const prefersReduced = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const startAmbience = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Warm atmospheric salon drone frequencies (A2, E3, C#4)
      const freqs = [110, 164.81, 277.18];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        // Lowpass filter for smooth warm ambiance
        filter.type = 'lowpass';
        filter.frequency.value = 320;

        // LFO subtle shimmer modulation
        lfo.frequency.value = 0.15 + Math.random() * 0.1;
        lfoGain.gain.value = 15;
        lfo.connect(filter.frequency);
        lfo.start();

        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();

        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (err) {
      console.error('Audio initialization error:', err);
    }
  }, []);

  const stopAmbience = useCallback(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        oscillatorsRef.current = [];
        setIsPlaying(false);
      }, 1250);
    } else {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      if (customEvent.detail && customEvent.detail.active) {
        startAmbience();
      } else {
        stopAmbience();
      }
    };

    window.addEventListener('salon-sound-toggle', handleToggle);
    return () => {
      window.removeEventListener('salon-sound-toggle', handleToggle);
      stopAmbience();
    };
  }, [startAmbience, stopAmbience]);

  if (prefersReduced) return null;

  return null;
}
