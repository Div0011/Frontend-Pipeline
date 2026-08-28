"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AtmosphereControlsProps {
  primaryColor?: string;
  darkBg?: string;
  lightBg?: string;
}

export default function AtmosphereControls({
  primaryColor = "#D97706",
  darkBg = "#100a05",
  lightBg = "#FAF7F2",
}: AtmosphereControlsProps) {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicNodesRef = useRef<{ masterGain: GainNode; intervalId: any } | null>(null);

  // Initialize Global Click Sounds & Audio Context
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };

    // Pop Click Sound (100% Volume)
    const playPop = () => {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      } catch (err) {
        // silent fallback
      }
    };

    // Sizzle Sound for Sear / Fire buttons (100% Volume)
    const playSizzle = () => {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {
        const bufferSize = ctx.sampleRate * 0.9;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.45));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2400, ctx.currentTime);
        filter.Q.setValueAtTime(1.4, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } catch (err) {
        // silent fallback
      }
    };

    (window as any).playPopSound = playPop;
    (window as any).playSizzleSound = playSizzle;

    // Attach subtle pop click to interactive elements
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("clickable")
      ) {
        playPop();
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Classic Live Restaurant Jazz Lounge Synthesizer (100% Volume)
  const toggleMusic = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    if (isPlayingMusic) {
      // Fade out and stop
      if (musicNodesRef.current) {
        const { masterGain, intervalId } = musicNodesRef.current;
        clearInterval(intervalId);
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        setTimeout(() => {
          musicNodesRef.current = null;
        }, 600);
      }
      setIsPlayingMusic(false);
    } else {
      // Start live restaurant jazz progression at full 100% volume
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 1.0);
      masterGain.connect(ctx.destination);

      // Authentic live jazz bistro chords with walking acoustic bass notes
      const jazzChords = [
        { bass: 87.31, chord: [261.63, 349.23, 440.0, 523.25] },   // Fmaj9
        { bass: 73.42, chord: [293.66, 349.23, 440.0, 523.25] },   // Dm9
        { bass: 98.00, chord: [293.66, 392.0, 466.16, 587.33] },   // Gm9
        { bass: 65.41, chord: [261.63, 329.63, 466.16, 554.37] },  // C13b9
      ];
      let stepIndex = 0;

      const playJazzBar = () => {
        const current = jazzChords[stepIndex % jazzChords.length];
        stepIndex++;

        // 1. Acoustic Upright Bass Note
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        const bassFilter = ctx.createBiquadFilter();

        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(current.bass, ctx.currentTime);

        bassFilter.type = "lowpass";
        bassFilter.frequency.setValueAtTime(220, ctx.currentTime);

        bassGain.gain.setValueAtTime(0.001, ctx.currentTime);
        bassGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.08);
        bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(masterGain);

        bassOsc.start();
        bassOsc.stop(ctx.currentTime + 2.9);

        // 2. Warm Rhodes Piano Chord Voicings
        current.chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = i % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = "bandpass";
          filter.frequency.setValueAtTime(800 + (i * 150), ctx.currentTime);
          filter.Q.setValueAtTime(0.8, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.15 + (i * 0.03));
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + 3.2);
        });
      };

      playJazzBar();
      const intervalId = setInterval(playJazzBar, 3000);
      musicNodesRef.current = { masterGain, intervalId };
      setIsPlayingMusic(true);
    }
  };

  // Day / Night Theme Toggle
  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    const root = document.documentElement;
    const body = document.body;

    if (nextDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      body.style.backgroundColor = darkBg;
      body.style.color = "#FAF8F2";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      body.style.backgroundColor = lightBg;
      body.style.color = "#18181B";
    }

    // Inform window and interactive canvas for background update
    window.dispatchEvent(
      new CustomEvent("themechange", { detail: { isDark: nextDark } })
    );
  };

  const iconColor = isDark ? primaryColor : "#18181B";

  return (
    <aside
      aria-label="Atmosphere Controls"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 select-none"
    >
      {/* 1. Separate Floating Circle: Day & Night Theme Toggle (Sun ☀️ / Moon 🌙) */}
      <button
        type="button"
        onClick={toggleTheme}
        title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-black/60 dark:bg-black/60 light:bg-white/90 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-black/15 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-white dark:text-white light:text-black hover:border-white/40"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-5"
              style={{ color: iconColor }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" strokeWidth="2" stroke="currentColor" fill="currentColor" fillOpacity="0.2" />
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-5 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* 2. Separate Floating Circle: Live Restaurant Jazz Music & Animated Soundwave Toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        title={isPlayingMusic ? "Mute Restaurant Jazz" : "Play Live Restaurant Jazz"}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-black/60 dark:bg-black/60 light:bg-white/90 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-black/15 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-white dark:text-white light:text-black hover:border-white/40"
      >
        <div className="flex items-center justify-center gap-[3px] h-5 w-5">
          {[0.4, 0.9, 0.6, 0.3].map((heightRatio, i) => (
            <motion.span
              key={i}
              className="w-[2.5px] rounded-full"
              style={{ backgroundColor: iconColor }}
              animate={
                isPlayingMusic
                  ? {
                      height: ["4px", `${Math.round(heightRatio * 18)}px`, "4px"],
                    }
                  : { height: "4px" }
              }
              transition={
                isPlayingMusic
                  ? {
                      duration: 0.8 + i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>
      </button>
    </aside>
  );
}
