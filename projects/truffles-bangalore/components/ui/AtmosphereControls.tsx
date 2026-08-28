"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AtmosphereControlsProps {
  primaryColor?: string;
  darkBg?: string;
  lightBg?: string;
}

export default function AtmosphereControls({
  primaryColor = "#F5A623",
  darkBg = "#100a06",
  lightBg = "#F6F4EE",
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
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
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
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
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

  // Soothing Lo-Fi Ambient Synthesizer
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
      // Start soothing chord generator
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);

      // Warm chord progression (Lo-fi chill neo-soul voicings)
      const chords = [
        [220.0, 261.63, 329.63, 392.0], // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 349.23], // G7
        [164.81, 196.0, 246.94, 293.66], // Em7
      ];
      let chordIndex = 0;

      const playChord = () => {
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = i === 0 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(650 + Math.random() * 200, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.05 / currentChord.length, ctx.currentTime + 0.6);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + 3.4);
        });
      };

      playChord();
      const intervalId = setInterval(playChord, 3200);
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
      root.style.setProperty("--theme-bg", darkBg);
      root.style.setProperty("--theme-text", "#FAF8F2");
      root.style.setProperty("--card-glass-bg", "rgba(255, 255, 255, 0.03)");
      root.style.setProperty("--card-glass-border", "rgba(255, 255, 255, 0.1)");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      body.style.backgroundColor = lightBg;
      body.style.color = "#18181B";
      root.style.setProperty("--theme-bg", lightBg);
      root.style.setProperty("--theme-text", "#18181B");
      root.style.setProperty("--card-glass-bg", "rgba(255, 255, 255, 0.65)");
      root.style.setProperty("--card-glass-border", "rgba(0, 0, 0, 0.08)");
    }

    // Inform window for canvas background update
    window.dispatchEvent(
      new CustomEvent("themechange", { detail: { isDark: nextDark } })
    );
  };

  return (
    <aside
      aria-label="Atmosphere Controls"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-black/60 dark:bg-black/60 light:bg-white/80 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-black/10 shadow-2xl transition-all duration-300 select-none"
    >
      {/* 1. Soothing Lo-Fi Music & Animated Soundwave Toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        title={isPlayingMusic ? "Mute Ambient Sound" : "Play Soothing Ambient Sound"}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 text-white dark:text-white light:text-black hover:bg-white/10"
      >
        <div className="flex items-center justify-center gap-[3px] h-4 w-4">
          {[0.4, 0.9, 0.6, 0.3].map((heightRatio, i) => (
            <motion.span
              key={i}
              className="w-[2.5px] rounded-full"
              style={{ backgroundColor: primaryColor }}
              animate={{
                height: isPlayingMusic
                  ? ["4px", `${Math.round(heightRatio * 16)}px`, "4px"]
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

      {/* Vertical Divider */}
      <div className="w-[1px] h-4 bg-white/20 dark:bg-white/20 light:bg-black/15" />

      {/* 2. Day & Night Seamless Theme Toggle (Sun ☀️ / Moon 🌙) */}
      <button
        type="button"
        onClick={toggleTheme}
        title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 text-white dark:text-white light:text-black hover:bg-white/10"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-4 h-4"
              style={{ color: primaryColor }}
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
              className="w-4 h-4"
              style={{ color: primaryColor }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </aside>
  );
}
