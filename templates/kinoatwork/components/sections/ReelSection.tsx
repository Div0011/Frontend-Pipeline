"use client";

import { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Volume2, VolumeX, Play, Pause, Sparkles, Sliders } from "lucide-react";

export default function ReelSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    soundEngine.triggerHoverClick();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <section className="relative z-20 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
              [ CHAPTER 05 — 2026 CINEMATIC SHOWREEL ]
            </span>
            <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
              Sfumato <span className="italic font-normal text-[#d4a84b]">Showreel</span> & Sound
            </h2>
          </div>

          <button
            onClick={toggleSound}
            className="flex items-center gap-3 bg-black/40 border border-white/20 hover:border-[#d4a84b] px-6 py-3 rounded-full text-xs font-mono tracking-widest transition-all backdrop-blur-md"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-white/50" />
                <span className="text-white/60">AUDIO MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#d4a84b]" />
                <span className="text-[#d4a84b]">SPATIAL AUDIO ACTIVE</span>
              </>
            )}
          </button>
        </div>

        {/* Cinematic Reel Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/15 shadow-2xl group">
          {/* Reel Frame Graphic / Background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#15120c] to-[#070707] flex flex-col items-center justify-center p-8">
            <div className="vignette-anamorphic" />

            {/* Central Animated Aperture / Reel Ring */}
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-[#d4a84b]/40 animate-spin-slow flex items-center justify-center">
                <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#d4a84b]/10 blur-xl" />
                </div>
              </div>

              {/* Play Button Overlay */}
              <button
                onClick={() => {
                  soundEngine.triggerHoverClick();
                  setIsPlaying(!isPlaying);
                }}
                className="absolute bg-[#d4a84b] text-black p-6 sm:p-8 rounded-full shadow-2xl hover:scale-110 hover:bg-white transition-all duration-300 z-30"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-black" />
                ) : (
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                )}
              </button>
            </div>

            <p className="mt-8 text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase z-20">
              {isPlaying ? "PLAYING 4K SCOPE SHOWREEL" : "CLICK TO PLAY SHOWREEL (4K / 2.39:1)"}
            </p>
          </div>

          {/* Sound Wave Equalizer Footer */}
          <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md p-6 border-t border-white/10 flex items-center justify-between z-30">
            <div className="flex items-center gap-4">
              <Sliders className="w-4 h-4 text-[#d4a84b]" />
              <span className="text-xs font-mono text-white/80 tracking-widest">
                AUDIO FREQUENCY: 96KHZ / 24-BIT BINAURAL
              </span>
            </div>

            {/* Equalizer Bars */}
            <div className="flex items-center gap-1.5 h-6">
              {[40, 75, 30, 90, 60, 100, 45, 80, 50, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#d4a84b] rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${h}%` : "20%",
                    opacity: isMuted ? 0.2 : 0.8,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
