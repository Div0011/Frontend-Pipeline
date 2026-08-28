"use client";

import { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { Play, Pause, Volume2, VolumeX, Headphones, Disc } from "lucide-react";

interface AudioTrack {
  id: string;
  title: string;
  book: string;
  duration: string;
  narrator: string;
}

const TRACKS: AudioTrack[] = [
  {
    id: "track-1",
    title: "The Bending of Optical Memory",
    book: "Anamorphic Dreams — Chapter 01",
    duration: "04:12",
    narrator: "Julian Vance & London Studio Strings",
  },
  {
    id: "track-2",
    title: "Highland Acoustics & Sub-Bass",
    book: "Echoes of Silence — Chapter 04",
    duration: "06:45",
    narrator: "Binaural Field Recordings & Modular Drone",
  },
  {
    id: "track-3",
    title: "Reflections in Obsidian Spire",
    book: "The Glass Horizon — Prologue",
    duration: "05:18",
    narrator: "Full Orchestra & Synth Array",
  },
];

export default function AudioNarrationsSection() {
  const [activeTrack, setActiveTrack] = useState<string>("track-1");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const togglePlay = (id: string) => {
    soundEngine.triggerHoverClick();
    if (activeTrack === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(id);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    soundEngine.triggerHoverClick();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <section className="relative z-10 min-h-screen py-32 px-6 lg:px-16 text-[#F8F6F3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-[#d4a84b] uppercase">
              [ CHAPTER 04 — SPATIAL AUDIO NARRATIONS ]
            </span>
            <h2 className="text-4xl sm:text-6xl font-light font-display tracking-tight mt-2">
              Binaural <span className="italic font-normal text-[#d4a84b]">Soundscapes</span> & Readings
            </h2>
          </div>

          <button
            onClick={toggleMute}
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

        {/* Audio Player Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Playlist Column */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {TRACKS.map((t) => {
              const isSelected = activeTrack === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => togglePlay(t.id)}
                  onMouseEnter={() => soundEngine.triggerHoverClick()}
                  className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#14120e] border-[#d4a84b] shadow-xl shadow-[#d4a84b]/10"
                      : "bg-black/30 border-white/10 hover:border-white/20 hover:bg-black/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      className={`p-4 rounded-full transition-all ${
                        isSelected && isPlaying
                          ? "bg-[#d4a84b] text-black"
                          : "bg-white/10 text-white group-hover:bg-[#d4a84b] group-hover:text-black"
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <div>
                      <span className="text-[9px] font-mono text-[#d4a84b] tracking-widest block uppercase">
                        {t.book}
                      </span>
                      <h3 className="text-lg font-display text-white font-light tracking-wide">
                        {t.title}
                      </h3>
                      <span className="text-xs font-sans text-white/50 block mt-0.5">
                        {t.narrator}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-white/40">{t.duration}</span>
                </div>
              );
            })}
          </div>

          {/* Player Visualizer Spotlight Card */}
          <div className="lg:col-span-6">
            <div className="p-10 rounded-2xl bg-gradient-to-br from-[#12110f] via-[#0a0a0a] to-[#050505] border border-[#d4a84b]/40 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-[#d4a84b]/10 border border-[#d4a84b]/30 flex items-center justify-center mb-6 animate-pulse">
                <Disc className="w-12 h-12 text-[#d4a84b] animate-spin-slow" />
              </div>

              <span className="text-xs font-mono text-[#d4a84b] tracking-[0.3em] uppercase">
                NOW PLAYING NARRATION
              </span>

              {TRACKS.filter((t) => t.id === activeTrack).map((t) => (
                <div key={t.id} className="mt-2">
                  <h3 className="text-2xl font-display text-white font-light">{t.title}</h3>
                  <p className="text-xs font-sans text-white/60 mt-1">{t.book}</p>
                </div>
              ))}

              {/* Equalizer Frequency Bars */}
              <div className="mt-10 flex items-center gap-1.5 h-12 w-full max-w-xs justify-center">
                {[30, 65, 45, 90, 70, 100, 50, 85, 40, 75, 95, 60, 35].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-[#d4a84b] rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${h}%` : "15%",
                      opacity: isMuted ? 0.2 : 0.85,
                    }}
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-white/40">
                <Headphones className="w-3.5 h-3.5 text-[#d4a84b]" />
                <span>RECOMMENDED WITH BINAURAL HEADPHONES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
