"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, SlidersHorizontal, Sparkles } from "lucide-react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showControls, setShowControls] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isSetupRef = useRef(false);

  // Web Audio API Synthesized Ocean Sound Generator
  const initOceanSound = () => {
    if (isSetupRef.current && audioCtxRef.current) {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Buffer for Pink/Brown Noise (Ocean Waves)
      const bufferSize = 3 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain boost
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter for deep ocean sound profile
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 350;

      // Wave rhythm modulation (LFO)
      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.2, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.12; // 8 second wave cycle
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.35;

      lfo.connect(lfoGain);
      lfoGain.connect(waveGain.gain);

      noiseSource.connect(lowpass);
      lowpass.connect(waveGain);
      waveGain.connect(masterGain);

      noiseSource.start();
      lfo.start();

      // 2. High Frequency Sea Breeze shimmer
      const breezeBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const breezeData = breezeBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        breezeData[i] = (Math.random() * 2 - 1) * 0.05;
      }
      const breezeSource = ctx.createBufferSource();
      breezeSource.buffer = breezeBuffer;
      breezeSource.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.value = 1200;
      bandpass.Q.value = 1.5;

      const breezeGain = ctx.createGain();
      breezeGain.gain.value = 0.08;

      breezeSource.connect(bandpass);
      bandpass.connect(breezeGain);
      breezeGain.connect(masterGain);

      breezeSource.start();

      isSetupRef.current = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  };

  const toggleSound = () => {
    if (!isPlaying) {
      initOceanSound();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {showControls && isPlaying && (
        <div className="glass-card px-4 py-2 rounded-full flex items-center gap-3 animate-fade-in text-[#f5f0e6]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#48d1cc]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-20 accent-[#48d1cc] cursor-pointer h-1 bg-[#1e6091] rounded-lg"
          />
          <span className="font-mono text-[10px] text-[#48d1cc]">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}

      <button
        onClick={toggleSound}
        onMouseEnter={() => setShowControls(true)}
        className={`relative flex items-center gap-3 px-5 py-3 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg ${
          isPlaying
            ? "glass-card-strong text-[#48d1cc] border-[#48d1cc]/60 shadow-[0_0_20px_rgba(72,209,204,0.3)]"
            : "glass-card text-[#f5f0e6]/80 hover:text-[#48d1cc] hover:border-[#48d1cc]/40"
        }`}
        aria-label="Toggle Ambient Ocean Audio"
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-4 w-4">
              <span className="w-1 bg-[#48d1cc] rounded-full animate-eq-1" />
              <span className="w-1 bg-[#48d1cc] rounded-full animate-eq-2" />
              <span className="w-1 bg-[#48d1cc] rounded-full animate-eq-3" />
            </div>
            <span className="font-semibold text-[#f5f0e6]">SOUNDSCAPE ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#f5f0e6]/60" />
            <span className="flex items-center gap-1.5">
              <span>OCEAN SOUND</span>
              <Sparkles className="w-3 h-3 text-[#48d1cc]" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
