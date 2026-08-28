"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AtmosphereControlsProps {
  primaryColor?: string;
  darkBg?: string;
  lightBg?: string;
}

export default function AtmosphereControls({
  primaryColor = "#166534",
  darkBg = "#051007",
  lightBg = "#FAF8F2",
}: AtmosphereControlsProps) {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<any>(null);

  // Initialize Audio & Click Sounds
  useEffect(() => {
    // 1. Create native HTML5 Audio Element for rich restaurant jazz
    const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3");
    audio.loop = true;
    audio.volume = 1.0; // 100% volume
    audioRef.current = audio;

    // Pop Click Sound
    const playPop = () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch (err) {
        // silent fallback
      }
    };

    // Sizzle Sound for Sear / Fire buttons
    const playSizzle = () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 0.7;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.35));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2400, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

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

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, []);

  // Live Restaurant Jazz Audio Toggle (100% Volume)
  const toggleMusic = () => {
    const audio = audioRef.current;

    if (isPlayingMusic) {
      // Pause
      if (audio) {
        audio.pause();
      }
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
      setIsPlayingMusic(false);
    } else {
      // Play at 100% Volume
      setIsPlayingMusic(true);

      if (audio) {
        audio.volume = 1.0;
        audio
          .play()
          .catch(() => {
            // Web Audio fallback if MP3 stream is blocked
            startSynthFallback();
          });
      } else {
        startSynthFallback();
      }
    }
  };

  const startSynthFallback = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = synthCtxRef.current || new AudioCtx();
      synthCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      const chords = [
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [146.83, 220.0, 261.63, 349.23], // Dm9
        [196.0, 233.08, 293.66, 349.23], // Gm7
        [130.81, 196.0, 246.94, 293.66], // C9
      ];
      let chordIdx = 0;

      const playChord = () => {
        const c = chords[chordIdx % chords.length];
        chordIdx++;
        const now = ctx.currentTime;

        c.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.25 / c.length, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 2.5);
        });
      };

      playChord();
      synthIntervalRef.current = setInterval(playChord, 2200);
    } catch (e) {
      // ignore
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
      body.classList.add("dark");
      body.classList.remove("light");
      body.style.setProperty("background-color", darkBg, "important");
      body.style.setProperty("color", "#FAF8F2", "important");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      body.classList.remove("dark");
      body.classList.add("light");
      body.style.setProperty("background-color", lightBg, "important");
      body.style.setProperty("color", "#18181B", "important");
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
              className="w-5 h-5 text-[#166534]"
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
