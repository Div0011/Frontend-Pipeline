"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3.0);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const freqs = [138.59, 207.65, 277.18, 415.30, 554.37];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = i % 2 === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        const LFO = ctx.createOscillator();
        const LFOGain = ctx.createGain();
        LFO.frequency.value = 0.2 + i * 0.1;
        LFOGain.gain.value = 1.5;
        LFO.connect(osc.frequency);
        LFO.start();

        oscGain.gain.value = 0.15 / (i + 1);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (err) {
      console.warn("Audio synthesis error:", err);
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => osc.stop());
        oscillatorsRef.current = [];
        ctx.close();
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1500);
    } else {
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      data-cursor-label="SOUND"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-2.5 bg-[#160306]/80 border border-[#f5d061]/40 backdrop-blur-md hover:border-[#f5d061] transition-all duration-300 group cursor-pointer shadow-[0_0_20px_rgba(245,208,97,0.15)]"
      aria-label="Toggle Royal Ambient Audio"
    >
      <div className="flex items-end gap-1 h-3.5 w-3.5">
        {isPlaying ? (
          <>
            <span className="w-0.5 bg-[#f5d061] animate-eq-1 rounded-full" />
            <span className="w-0.5 bg-[#f5d061] animate-eq-2 rounded-full" />
            <span className="w-0.5 bg-[#f5d061] animate-eq-3 rounded-full" />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#f5d061]/50 group-hover:text-[#f5d061] transition-colors" />
        )}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#f5d061]/80 group-hover:text-[#f5d061] transition-colors">
        {isPlaying ? "RAGA SOUND ON" : "ROYAL SOUND"}
      </span>
    </button>
  );
}
