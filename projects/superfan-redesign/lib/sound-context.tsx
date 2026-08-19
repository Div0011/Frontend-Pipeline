'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SoundStateType {
  isSoundPlaying: boolean;
  setIsSoundPlaying: (playing: boolean) => void;
}

const SoundContext = createContext<SoundStateType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isSoundPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;

          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.015;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
          gainNodeRef.current = gainNode;

          whiteNoise.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
          whiteNoise.start(0);
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      } catch {
        // Fallback silently if Web Audio API blocked
      }
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    }
  }, [isSoundPlaying]);

  return (
    <SoundContext.Provider value={{ isSoundPlaying, setIsSoundPlaying }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
};
