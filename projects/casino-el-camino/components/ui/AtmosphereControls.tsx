"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AtmosphereControlsProps {
  primaryColor?: string;
  darkBg?: string;
  lightBg?: string;
}

export default function AtmosphereControls({
  primaryColor = "#DC2626",
  darkBg = "#0e0505",
  lightBg = "#FAF8F2",
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

    // Pop Click Sound
    const playPop = () => {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } catch (err) {
        // silent fallback
      }
    };

    // Sizzle Sound for Sear / Fire buttons
    const playSizzle = () => {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {
        const bufferSize = ctx.sampleRate * 0.8;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2400, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

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

  // Classic Live Restaurant Jazz Ambient Synthesizer at 100% Volume
  const toggleMusic = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    if (isPlayingMusic) {
      if (musicNodesRef.current) {
        const { masterGain, intervalId } = musicNodesRef.current;
        clearInterval(intervalId);
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        setTimeout(() => {
          musicNodesRef.current = null;
        }, 500);
      }
      setIsPlayingMusic(false);
    } else {
      // Full 100% Master Volume (1.0)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.8);
      masterGain.connect(ctx.destination);

      // Classic Live Dining Jazz Chords (Fender Rhodes + Upright Bass voicings)
      const jazzProgression = [
        {
          bass: 87.31, // F2
          chord: [174.61, 220.0, 261.63, 329.63, 392.0], // Fmaj9 (F A C E G)
        },
        {
          bass: 73.42, // D2
          chord: [146.83, 220.0, 261.63, 329.63, 349.23], // Dm9 (D A C E F)
        },
        {
          bass: 98.0, // G2
          chord: [196.0, 233.08, 293.66, 349.23, 440.0], // Gm9 (G Bb D F A)
        },
        {
          bass: 65.41, // C2
          chord: [130.81, 196.0, 246.94, 293.66, 369.99], // C13 (C G B D F#)
        },
        {
          bass: 110.0, // A2
          chord: [220.0, 261.63, 329.63, 392.0, 493.88], // Am9 (A C E G B)
        },
        {
          bass: 73.42, // D2
          chord: [146.83, 220.0, 277.18, 349.23, 415.3], // D7b9 (D A C# F G#)
        },
        {
          bass: 98.0, // G2
          chord: [196.0, 246.94, 293.66, 349.23, 440.0], // G9 (G B D F A)
        },
        {
          bass: 65.41, // C2
          chord: [130.81, 185.0, 233.08, 293.66, 329.63], // C7alt (C F# Bb D E)
        },
      ];

      let step = 0;

      const playJazzStep = () => {
        const currentJazz = jazzProgression[step % jazzProgression.length];
        step++;

        const now = ctx.currentTime;

        // 1. Warm Acoustic Upright Bass
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        const bassFilter = ctx.createBiquadFilter();

        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(currentJazz.bass, now);

        bassFilter.type = "lowpass";
        bassFilter.frequency.setValueAtTime(220, now);

        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.linearRampToValueAtTime(0.35, now + 0.05);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(masterGain);

        bassOsc.start(now);
        bassOsc.stop(now + 2.3);

        // 2. Lush Rhodes / Piano Chord Voicings
        currentJazz.chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.02);

          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(freq * 1.002, now + idx * 0.02);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800 + idx * 100, now);

          noteGain.gain.setValueAtTime(0.001, now + idx * 0.02);
          noteGain.gain.linearRampToValueAtTime(0.12 / currentJazz.chord.length, now + 0.08 + idx * 0.02);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

          osc.connect(filter);
          osc2.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(now + idx * 0.02);
          osc2.start(now + idx * 0.02);
          osc.stop(now + 2.8);
          osc2.stop(now + 2.8);
        });

        // 3. Subtle Live Brushed Ride Cymbal Tap
        try {
          const bufSize = Math.floor(ctx.sampleRate * 0.15);
          const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < bufSize; i++) {
            d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
          }
          const brush = ctx.createBufferSource();
          brush.buffer = buf;

          const brushFilter = ctx.createBiquadFilter();
          brushFilter.type = "highpass";
          brushFilter.frequency.setValueAtTime(6000, now);

          const brushGain = ctx.createGain();
          brushGain.gain.setValueAtTime(0.04, now);
          brushGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

          brush.connect(brushFilter);
          brushFilter.connect(brushGain);
          brushGain.connect(masterGain);

          brush.start(now + 0.02);
        } catch (e) {
          // ignore
        }
      };

      playJazzStep();
      const intervalId = setInterval(playJazzStep, 2400);
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

    window.dispatchEvent(
      new CustomEvent("themechange", { detail: { isDark: nextDark } })
    );
  };

  return (
    <aside
      aria-label="Atmosphere Controls"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 select-none"
    >
      {/* 1. Theme Button - Sun ☀️ / Moon 🌙 (Dark: Gold/Primary, Light: Crisp Black, NO Orange) */}
      <button
        type="button"
        onClick={toggleTheme}
        title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isDark
            ? "bg-black/70 border-white/20 text-white hover:border-white/40"
            : "bg-white/95 border-black/15 text-stone-900 hover:border-black/30"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-5 text-[#DC2626]"
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
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-5 text-stone-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* 2. Soothing Music Button - Soundwave Bars (Dark: Gold/Primary, Light: Clean Black, NO Orange) */}
      <button
        type="button"
        onClick={toggleMusic}
        title={isPlayingMusic ? "Mute Ambient Sound" : "Play Live Restaurant Jazz (100% Vol)"}
        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isDark
            ? "bg-black/70 border-white/20 text-white hover:border-white/40"
            : "bg-white/95 border-black/15 text-stone-900 hover:border-black/30"
        }`}
      >
        <div className="flex items-center justify-center gap-[3px] h-5 w-5">
          {[0.4, 0.9, 0.6, 0.3].map((heightRatio, i) => (
            <motion.span
              key={i}
              className="w-[2.5px] rounded-full"
              style={{ backgroundColor: isDark ? primaryColor : "#18181B" }}
              animate={{
                height: isPlayingMusic
                  ? ["4px", `${Math.round(heightRatio * 18)}px`, "4px"]
                  : "4px",
              }}
              transition={{
                duration: isPlayingMusic ? 0.8 + i * 0.2 : 0.3,
                repeat: isPlayingMusic ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </button>
    </aside>
  );
}
