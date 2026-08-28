#!/usr/bin/env python3
"""
Master rollout for:
1. Live restaurant jazz music synthesizer at 100% volume in AtmosphereControls.
2. Zero orange on theme shift (sleek black in light mode, primary in dark mode).
3. Frame contrast perfection: Fonts on dark media/image frames ALWAYS remain crisp white, while fonts on beige/light tiles properly shift to dark charcoal.
"""

import os

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def update_globals_css(project_dir: str):
    css_path = os.path.join(project_dir, "app", "globals.css")
    if not os.path.exists(css_path):
        return

    content = """@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;700;900&display=swap');
@import "tailwindcss";

@theme {
  --color-char: #122B1E;
  --color-char-soft: #1B3B2B;
  --color-char-mute: #284F3B;
  --color-smoke: #8FAEA0;
  --color-stone: #C5D9CE;
  --color-bone: #FAF8F2;
  --color-bone-warm: #F4EFE6;
  --color-bone-dark: #E4DCCF;
  --color-ember: #DE3B2B;
  --color-ember-glow: #F04F3F;
  --color-yolk: #EAA824;
  --color-yolk-light: #FBC85B;
  
  --font-display: 'Bebas Neue', 'Space Grotesk', Impact, sans-serif;
  --font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

:root {
  --background: #070709;
  --foreground: #FAF8F2;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body), sans-serif;
  overflow-x: hidden;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.type-display {
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
}

/* Day Mode Global Surface */
html.light body {
  background-color: #FAF8F2 !important;
  color: #18181B !important;
}

/* Day Mode Text on Light Background / Tiles ONLY */
html.light .theme-adaptive-title,
html.light #manifesto-section h2,
html.light #manifesto-section h3,
html.light #menu-section h2,
html.light #menu-section h3,
html.light #pairing-section h2,
html.light #pairing-section h3,
html.light #locations-section h2,
html.light #reservation-section h2 {
  color: #18181B !important;
}

html.light .theme-adaptive-card,
html.light #manifesto-section .bg-white\\[0\\.03\\],
html.light #manifesto-section .bg-white\\[0\\.04\\],
html.light #menu-section .bg-white\\[0\\.04\\],
html.light #pairing-section .bg-white\\[0\\.04\\],
html.light #reservation-section .bg-white\\[0\\.04\\] {
  background-color: rgba(255, 255, 255, 0.85) !important;
  border-color: rgba(0, 0, 0, 0.08) !important;
  color: #18181B !important;
  box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.06) !important;
}

html.light #manifesto-section .text-stone-400,
html.light #menu-section .text-stone-400,
html.light #pairing-section .text-stone-400 {
  color: #52525B !important;
}

/* Ensure Dark Media Frames, Heros, Smoothies, and Image Cards ALWAYS stay crisp White */
.dark-frame,
.hero-media,
.gallery-image-card,
.smoothie-container,
.video-overlay,
[data-theme-preserve="dark"] {
  color: #FAF8F2 !important;
}

.dark-frame h1,
.dark-frame h2,
.dark-frame h3,
.dark-frame p,
.hero-media h1,
.hero-media h2,
.smoothie-container h2,
.gallery-image-card h3 {
  color: #FAF8F2 !important;
}
"""
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(content)

def generate_atmosphere_controls(primary: str, theme_base: str) -> str:
    return f"""\"use client\";

import React, {{ useState, useEffect, useRef }} from "react";
import {{ motion, AnimatePresence }} from "framer-motion";

interface AtmosphereControlsProps {{
  primaryColor?: string;
  darkBg?: string;
  lightBg?: string;
}}

export default function AtmosphereControls({{
  primaryColor = "{primary}",
  darkBg = "{theme_base}",
  lightBg = "#FAF8F2",
}}: AtmosphereControlsProps) {{
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicNodesRef = useRef<{{ masterGain: GainNode; intervalId: any }} | null>(null);

  // Initialize Global Click Sounds & Audio Context
  useEffect(() => {{
    const initAudio = () => {{
      if (!audioCtxRef.current) {{
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {{
          audioCtxRef.current = new AudioContextClass();
        }}
      }}
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {{
        audioCtxRef.current.resume();
      }}
    }};

    // Pop Click Sound
    const playPop = () => {{
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {{
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
      }} catch (err) {{
        // silent fallback
      }}
    }};

    // Sizzle Sound for Sear / Fire buttons
    const playSizzle = () => {{
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      try {{
        const bufferSize = ctx.sampleRate * 0.8;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {{
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
        }}
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
      }} catch (err) {{
        // silent fallback
      }}
    }};

    (window as any).playPopSound = playPop;
    (window as any).playSizzleSound = playSizzle;

    const handleGlobalClick = (e: MouseEvent) => {{
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("clickable")
      ) {{
        playPop();
      }}
    }};

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }}, []);

  // Classic Live Restaurant Jazz Ambient Synthesizer at 100% Volume
  const toggleMusic = () => {{
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {{
      audioCtxRef.current = new AudioContextClass();
    }}
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    if (isPlayingMusic) {{
      if (musicNodesRef.current) {{
        const {{ masterGain, intervalId }} = musicNodesRef.current;
        clearInterval(intervalId);
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        setTimeout(() => {{
          musicNodesRef.current = null;
        }}, 500);
      }}
      setIsPlayingMusic(false);
    }} else {{
      // Full 100% Master Volume (1.0)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.8);
      masterGain.connect(ctx.destination);

      // Classic Live Dining Jazz Chords (Fender Rhodes + Upright Bass voicings)
      const jazzProgression = [
        {{
          bass: 87.31, // F2
          chord: [174.61, 220.0, 261.63, 329.63, 392.0], // Fmaj9 (F A C E G)
        }},
        {{
          bass: 73.42, // D2
          chord: [146.83, 220.0, 261.63, 329.63, 349.23], // Dm9 (D A C E F)
        }},
        {{
          bass: 98.0, // G2
          chord: [196.0, 233.08, 293.66, 349.23, 440.0], // Gm9 (G Bb D F A)
        }},
        {{
          bass: 65.41, // C2
          chord: [130.81, 196.0, 246.94, 293.66, 369.99], // C13 (C G B D F#)
        }},
        {{
          bass: 110.0, // A2
          chord: [220.0, 261.63, 329.63, 392.0, 493.88], // Am9 (A C E G B)
        }},
        {{
          bass: 73.42, // D2
          chord: [146.83, 220.0, 277.18, 349.23, 415.3], // D7b9 (D A C# F G#)
        }},
        {{
          bass: 98.0, // G2
          chord: [196.0, 246.94, 293.66, 349.23, 440.0], // G9 (G B D F A)
        }},
        {{
          bass: 65.41, // C2
          chord: [130.81, 185.0, 233.08, 293.66, 329.63], // C7alt (C F# Bb D E)
        }},
      ];

      let step = 0;

      const playJazzStep = () => {{
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
        currentJazz.chord.forEach((freq, idx) => {{
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
        }});

        // 3. Subtle Live Brushed Ride Cymbal Tap
        try {{
          const bufSize = Math.floor(ctx.sampleRate * 0.15);
          const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < bufSize; i++) {{
            d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
          }}
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
        }} catch (e) {{
          // ignore
        }}
      }};

      playJazzStep();
      const intervalId = setInterval(playJazzStep, 2400);
      musicNodesRef.current = {{ masterGain, intervalId }};
      setIsPlayingMusic(true);
    }}
  }};

  // Day / Night Theme Toggle
  const toggleTheme = () => {{
    const nextDark = !isDark;
    setIsDark(nextDark);

    const root = document.documentElement;
    const body = document.body;

    if (nextDark) {{
      root.classList.add("dark");
      root.classList.remove("light");
      body.style.backgroundColor = darkBg;
      body.style.color = "#FAF8F2";
    }} else {{
      root.classList.remove("dark");
      root.classList.add("light");
      body.style.backgroundColor = lightBg;
      body.style.color = "#18181B";
    }}

    window.dispatchEvent(
      new CustomEvent("themechange", {{ detail: {{ isDark: nextDark }} }})
    );
  }};

  return (
    <aside
      aria-label="Atmosphere Controls"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 select-none"
    >
      {{/* 1. Theme Button - Sun ☀️ / Moon 🌙 (Dark: Gold/Primary, Light: Crisp Black, NO Orange) */}}
      <button
        type="button"
        onClick={{toggleTheme}}
        title={{isDark ? "Switch to Day Mode" : "Switch to Night Mode"}}
        className={{`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${{
          isDark
            ? "bg-black/70 border-white/20 text-white hover:border-white/40"
            : "bg-white/95 border-black/15 text-stone-900 hover:border-black/30"
        }}`}}
      >
        <AnimatePresence mode="wait" initial={{false}}>
          {{isDark ? (
            <motion.svg
              key="sun"
              initial={{{{ rotate: -90, scale: 0.5, opacity: 0 }}}}
              animate={{{{ rotate: 0, scale: 1, opacity: 1 }}}}
              exit={{{{ rotate: 90, scale: 0.5, opacity: 0 }}}}
              transition={{{{ duration: 0.25 }}}}
              className="w-5 h-5 text-[{primary}]"
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
              initial={{{{ rotate: 90, scale: 0.5, opacity: 0 }}}}
              animate={{{{ rotate: 0, scale: 1, opacity: 1 }}}}
              exit={{{{ rotate: 90, scale: 0.5, opacity: 0 }}}}
              transition={{{{ duration: 0.25 }}}}
              className="w-5 h-5 text-stone-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          )}}
        </AnimatePresence>
      </button>

      {{/* 2. Soothing Music Button - Soundwave Bars (Dark: Gold/Primary, Light: Clean Black, NO Orange) */}}
      <button
        type="button"
        onClick={{toggleMusic}}
        title={{isPlayingMusic ? "Mute Ambient Sound" : "Play Live Restaurant Jazz (100% Vol)"}}
        className={{`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${{
          isDark
            ? "bg-black/70 border-white/20 text-white hover:border-white/40"
            : "bg-white/95 border-black/15 text-stone-900 hover:border-black/30"
        }}`}}
      >
        <div className="flex items-center justify-center gap-[3px] h-5 w-5">
          {{[0.4, 0.9, 0.6, 0.3].map((heightRatio, i) => (
            <motion.span
              key={{i}}
              className="w-[2.5px] rounded-full"
              style={{{{ backgroundColor: isDark ? primaryColor : "#18181B" }}}}
              animate={{{{
                height: isPlayingMusic
                  ? ["4px", `${{Math.round(heightRatio * 18)}}px`, "4px"]
                  : "4px",
              }}}}
              transition={{{{
                duration: isPlayingMusic ? 0.8 + i * 0.2 : 0.3,
                repeat: isPlayingMusic ? Infinity : 0,
                ease: "easeInOut",
              }}}}
            />
          ))}}
        </div>
      </button>
    </aside>
  );
}}
"""

def generate_brand_manifesto(primary: str) -> str:
    return f"""\"use client\";

import React, {{ useState }} from "react";
import Image from "next/image";
import {{ motion, AnimatePresence }} from "framer-motion";

interface PillarSpec {{
  id: string;
  number: string;
  title: string;
  badge: string;
  stats: {{ label: string; value: string; progress: number }}[];
  image: string;
  hotspots: {{ x: number; y: number; label: string }}[];
}}

export default function BrandManifesto() {{
  const [activePillar, setActivePillar] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"spec" | "compare">("spec");
  const [isSizzling, setIsSizzling] = useState(false);

  const pillars: PillarSpec[] = [
    {{
      id: "pillar-1",
      number: "01",
      title: "HEAVY STEEL SMASH",
      badge: "450°F CAST IRON",
      stats: [
        {{ label: "Sear Heat", value: "450°F", progress: 95 }},
        {{ label: "Maillard Crust Index", value: "98.6%", progress: 98 }},
        {{ label: "Lace Thickness", value: "1.2 mm", progress: 90 }},
      ],
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        {{ x: 35, y: 48, label: "Lacy Caramelized Crust" }},
        {{ x: 62, y: 38, label: "Dual Prime Coarse Grind" }},
        {{ x: 48, y: 72, label: "Rendered Pan Jus" }}
      ]
    }},
    {{
      id: "pillar-2",
      number: "02",
      title: "SQUISHY POTATO ROLLS",
      badge: "CULTURED BUTTER",
      stats: [
        {{ label: "Toasting Temp", value: "380°F", progress: 85 }},
        {{ label: "Pillow Softness", value: "99.4%", progress: 99 }},
        {{ label: "Lamination", value: "Sweet Cream Butter", progress: 92 }},
      ],
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        {{ x: 50, y: 25, label: "Golden Butter Toast" }},
        {{ x: 50, y: 80, label: "Cloud Soft Crumb" }}
      ]
    }},
    {{
      id: "pillar-3",
      number: "03",
      title: "CRAFT MALTS & SIDES",
      badge: "HAND-SPUN",
      stats: [
        {{ label: "Spin Viscosity", value: "100% Velvet", progress: 96 }},
        {{ label: "Reduction Density", value: "Double Puree", progress: 94 }},
        {{ label: "Gelato Base", value: "Madagascar Vanilla", progress: 90 }},
      ],
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1200&auto=format&fit=crop",
      hotspots: [
        {{ x: 50, y: 20, label: "Caramelized Cookie Dust" }},
        {{ x: 50, y: 55, label: "Double Cream Reduction" }}
      ]
    }}
  ];

  const current = pillars[activePillar];

  return (
    <section
      id="manifesto-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10 select-none font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {{/* Header */}}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl md:text-7xl text-white [html.light_&]:text-stone-950 font-black leading-tight tracking-tight">
              THE 450°F STEEL SMASH STANDARD.
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 [html.light_&]:bg-black/5 border border-white/15 [html.light_&]:border-black/10 backdrop-blur-xl self-start md:self-end shadow-xl">
            <button
              type="button"
              onClick={{() => setViewMode("spec")}}
              className="px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              style={{{{
                backgroundColor: viewMode === "spec" ? "{primary}" : "transparent",
                color: viewMode === "spec" ? "#000000" : undefined,
              }}}}
            >
              Specimen
            </button>
            <button
              type="button"
              onClick={{() => setViewMode("compare")}}
              className="px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              style={{{{
                backgroundColor: viewMode === "compare" ? "{primary}" : "transparent",
                color: viewMode === "compare" ? "#000000" : undefined,
              }}}}
            >
              Duel
            </button>
          </div>
        </div>

        {{/* Specimen View */}}
        {{viewMode === "spec" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {{pillars.map((p, idx) => {{
                const isSelected = activePillar === idx;
                return (
                  <motion.div
                    key={{p.id}}
                    onClick={{() => {{
                      setActivePillar(idx);
                      setActiveHotspot(0);
                    }}}}
                    whileHover={{{{ y: -2 }}}}
                    className={{`p-5 rounded-2xl cursor-pointer transition-all backdrop-blur-xl border flex items-center justify-between shadow-xl ${{
                      isSelected
                        ? "border-[{primary}] bg-white/[0.08] [html.light_&]:bg-white [html.light_&]:border-[{primary}]"
                        : "border-white/10 [html.light_&]:border-black/10 bg-white/[0.03] [html.light_&]:bg-white/60"
                    }}`}}
                  >
                    <span
                      className={{`font-sans text-xs font-extrabold tracking-wider ${{
                        isSelected
                          ? "text-[{primary}] [html.light_&]:text-stone-950"
                          : "text-[#FAF8F2] [html.light_&]:text-stone-700"
                      }}`}}
                    >
                      {{p.number}}. {{p.title}}
                    </span>
                    <span
                      className="text-[10px] font-sans px-2.5 py-0.5 rounded-full border font-semibold"
                      style={{{{
                        backgroundColor: isSelected ? "{primary}20" : "rgba(255,255,255,0.05)",
                        color: isSelected ? "{primary}" : undefined,
                        borderColor: isSelected ? "{primary}40" : "rgba(255,255,255,0.1)",
                      }}}}
                    >
                      {{p.badge}}
                    </span>
                  </motion.div>
                );
              }})}}
            </div>

            {{/* Specimen Stage */}}
            <AnimatePresence mode="wait">
              <motion.div
                key={{current.id}}
                initial={{{{ opacity: 0, y: 10 }}}}
                animate={{{{ opacity: 1, y: 0 }}}}
                exit={{{{ opacity: 0, y: -10 }}}}
                transition={{{{ duration: 0.25 }}}}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-white/[0.03] [html.light_&]:bg-white/80 backdrop-blur-2xl border border-white/15 [html.light_&]:border-black/10 shadow-2xl items-center"
              >
                {{/* Left: Image with Hotspots */}}
                <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-white/15 bg-black/60 group shadow-2xl dark-frame">
                  <Image
                    src={{current.image}}
                    alt={{current.title}}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {{current.hotspots.map((h, hIdx) => (
                    <div
                      key={{hIdx}}
                      style={{{{ left: `${{h.x}}%`, top: `${{h.y}}%` }}}}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        type="button"
                        onClick={{() => setActiveHotspot(hIdx)}}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border text-xs font-sans font-bold hover:scale-110 transition-transform shadow-2xl"
                        style={{{{ borderColor: "{primary}", color: "{primary}" }}}}
                      >
                        {{hIdx + 1}}
                      </button>
                    </div>
                  ))}}

                  {{activeHotspot !== null && current.hotspots[activeHotspot] && (
                    <div
                      className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/90 backdrop-blur-md border font-sans text-xs font-bold uppercase tracking-wider shadow-xl"
                      style={{{{ borderColor: "{primary}40", color: "{primary}" }}}}
                    >
                      Layer {{activeHotspot + 1}}: {{current.hotspots[activeHotspot].label}}
                    </div>
                  )}}
                </div>

                {{/* Right: Metrics & Sear Test */}}
                <div className="lg:col-span-5 space-y-6">
                  <h3 className="type-display text-3xl text-white [html.light_&]:text-stone-950 font-extrabold">
                    {{current.title}}
                  </h3>

                  <div className="space-y-3 font-sans">
                    {{current.stats.map((st, sIdx) => (
                      <div key={{sIdx}} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-stone-400 [html.light_&]:text-stone-600">{{st.label}}</span>
                          <span className="font-bold [html.light_&]:text-stone-950" style={{{{ color: "{primary}" }}}}>{{st.value}}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 [html.light_&]:bg-black/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{{{ width: `${{st.progress}}%`, backgroundColor: "{primary}" }}}}
                          />
                        </div>
                      </div>
                    ))}}
                  </div>

                  <button
                    type="button"
                    onClick={{() => {{
                      setIsSizzling(true);
                      setTimeout(() => setIsSizzling(false), 1500);
                    }}}}
                    className="w-full py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95 hover:brightness-110 hover:scale-[1.02] text-black"
                    style={{{{ backgroundColor: "{primary}" }}}}
                  >
                    {{isSizzling ? "SEARING 450°F..." : "TEST FLAT-TOP SEAR"}}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}}

        {{/* Duel View */}}
        {{viewMode === "compare" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white/[0.04] [html.light_&]:bg-white/80 border border-white/15 [html.light_&]:border-black/10 backdrop-blur-xl shadow-2xl space-y-4">
              <span className="text-xs uppercase font-extrabold [html.light_&]:text-stone-950 block" style={{{{ color: "{primary}" }}}}>
                OUR CAST-IRON SMASH
              </span>
              <h3 className="type-display text-2xl text-white [html.light_&]:text-stone-950 font-bold">
                450°F STEEL HIGH-HEAT PRESS
              </h3>
              <p className="text-xs text-stone-300 [html.light_&]:text-stone-700 leading-relaxed font-body">
                Smashed ultra-thin on screaming hot steel for complete Maillard caramelization and crunchy lace edges.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] [html.light_&]:bg-stone-100 border border-white/5 [html.light_&]:border-black/5 opacity-75 space-y-4">
              <span className="text-xs uppercase font-extrabold text-stone-500 block">
                STANDARD THICK BURGER
              </span>
              <h3 className="type-display text-2xl text-stone-400 [html.light_&]:text-stone-700 font-bold">
                MILD-HEAT STEAM COOK
              </h3>
              <p className="text-xs text-stone-400 [html.light_&]:text-stone-600 leading-relaxed font-body">
                Thick dense patty with minimal surface caramelization and soft steamed exterior.
              </p>
            </div>
          </div>
        )}}
      </div>
    </section>
  );
}}
"""

def main():
    print("🚀 Rolling out Live Jazz Audio @ 100% Vol and Frame Contrast Fixes across all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue

        primary = cfg.get("primary", "#FF0036")
        theme_base = cfg.get("theme_base", "#070709")

        mkt_dir = os.path.join(project_dir, "components", "marketing")
        ui_dir = os.path.join(project_dir, "components", "ui")

        # 1. Update globals.css
        update_globals_css(project_dir)

        # 2. Update AtmosphereControls
        with open(os.path.join(ui_dir, "AtmosphereControls.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_atmosphere_controls(primary, theme_base))

        # 3. Update BrandManifesto
        with open(os.path.join(mkt_dir, "BrandManifesto.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_brand_manifesto(primary))

        print(f"✓ Deployed audio & contrast fixes to {slug}")

    print("\n🎉 Master rollout of Live Jazz Audio & Frame Contrast Fixes complete!")

if __name__ == "__main__":
    main()
