#!/usr/bin/env python3
"""
Comprehensive script to:
1. Strip all remaining '//' across all project components & pages.
2. Deploy separate vertical floating circle controls (Sun/Moon + Equalizer soundwave).
3. Apply color-theory compliant Day/Night styling in globals.css (amber/dark text on light cream, crisp white/gold on dark).
4. Elevate all inner pages (/menu, /locations, /reservations, /about, /films) across all 24 projects.
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def update_globals_css(project_dir: str, primary: str):
    css_path = os.path.join(project_dir, "app", "globals.css")
    if not os.path.exists(css_path):
        return

    amber_contrast = "#B45309" if primary in ["#F5C418", "#F5A623", "#C8A96E", "#D4AF37", "#FFFFFF", "#FAF8F2"] else primary

    content = f"""@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;700;900&display=swap');
@import "tailwindcss";

@theme {{
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
}}

:root {{
  --background: #070709;
  --foreground: #FAF8F2;
}}

body {{
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body), sans-serif;
  overflow-x: hidden;
  transition: background-color 0.4s ease, color 0.4s ease;
}}

.type-display {{
  font-family: var(--font-display), sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
}}

/* Day & Night Responsive Contrast Overrides */
html.light body {{
  background-color: #F6F4EE !important;
  color: #18181B !important;
}}

html.light .text-white,
html.light .text-bone,
html.light .text-\\[\\#FAF8F2\\] {{
  color: #18181B !important;
}}

html.light .text-stone-300,
html.light .text-stone-400,
html.light .text-smoke {{
  color: #52525B !important;
}}

html.light .bg-white\\/\\[0\\.03\\],
html.light .bg-white\\/\\[0\\.04\\],
html.light .bg-white\\/\\[0\\.08\\],
html.light .bg-white\\/5 {{
  background-color: rgba(255, 255, 255, 0.85) !important;
  border-color: rgba(0, 0, 0, 0.08) !important;
  color: #18181B !important;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.06) !important;
}}

html.light .border-white\\/10,
html.light .border-white\\/15,
html.light .border-white\\/20 {{
  border-color: rgba(0, 0, 0, 0.08) !important;
}}

html.light .text-\\[{primary}\\] {{
  color: {amber_contrast} !important;
}}

html.light .border-\\[{primary}\\] {{
  border-color: {amber_contrast} !important;
}}
"""
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(content)

def update_atmosphere_controls(project_dir: str, primary: str, theme_base: str):
    ui_dir = os.path.join(project_dir, "components", "ui")
    os.makedirs(ui_dir, exist_ok=True)
    ctrl_path = os.path.join(ui_dir, "AtmosphereControls.tsx")

    amber_contrast = "#B45309" if primary in ["#F5C418", "#F5A623", "#C8A96E", "#D4AF37", "#FFFFFF", "#FAF8F2"] else primary
    light_bg = "#F6F4EE"

    code = f"""\"use client\";

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
  lightBg = "{light_bg}",
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
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
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
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
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

    // Attach subtle pop click to interactive elements
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

  // Soothing Lo-Fi Ambient Synthesizer
  const toggleMusic = () => {{
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!audioCtxRef.current && AudioContextClass) {{
      audioCtxRef.current = new AudioContextClass();
    }}
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    if (isPlayingMusic) {{
      // Fade out and stop
      if (musicNodesRef.current) {{
        const {{ masterGain, intervalId }} = musicNodesRef.current;
        clearInterval(intervalId);
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        setTimeout(() => {{
          musicNodesRef.current = null;
        }}, 600);
      }}
      setIsPlayingMusic(false);
    }} else {{
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

      const playChord = () => {{
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {{
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
        }});
      }};

      playChord();
      const intervalId = setInterval(playChord, 3200);
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

    // Inform window for canvas background update
    window.dispatchEvent(
      new CustomEvent("themechange", {{ detail: {{ isDark: nextDark }} }})
    );
  }};

  return (
    <aside
      aria-label="Atmosphere Controls"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 select-none"
    >
      {{/* 1. Separate Floating Circle: Day & Night Seamless Theme Toggle (Sun ☀️ / Moon 🌙) */}}
      <button
        type="button"
        onClick={{toggleTheme}}
        title={{isDark ? "Switch to Day Mode" : "Switch to Night Mode"}}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-black/60 dark:bg-black/60 light:bg-white/90 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-black/15 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-white dark:text-white light:text-black hover:border-white/40"
      >
        <AnimatePresence mode="wait" initial={{false}}>
          {{isDark ? (
            <motion.svg
              key="sun"
              initial={{{{ rotate: -90, scale: 0.5, opacity: 0 }}}}
              animate={{{{ rotate: 0, scale: 1, opacity: 1 }}}}
              exit={{{{ rotate: 90, scale: 0.5, opacity: 0 }}}}
              transition={{{{ duration: 0.25 }}}}
              className="w-5 h-5"
              style={{{{ color: primaryColor }}}}
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
              exit={{{{ rotate: -90, scale: 0.5, opacity: 0 }}}}
              transition={{{{ duration: 0.25 }}}}
              className="w-5 h-5 text-amber-700 dark:text-[#F5C418]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          )}}
        </AnimatePresence>
      </button>

      {{/* 2. Separate Floating Circle: Soothing Lo-Fi Music & Animated Soundwave Toggle */}}
      <button
        type="button"
        onClick={{toggleMusic}}
        title={{isPlayingMusic ? "Mute Ambient Sound" : "Play Soothing Ambient Sound"}}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-black/60 dark:bg-black/60 light:bg-white/90 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-black/15 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-white dark:text-white light:text-black hover:border-white/40"
      >
        <div className="flex items-center justify-center gap-[3px] h-5 w-5">
          {{[0.4, 0.9, 0.6, 0.3].map((heightRatio, i) => (
            <motion.span
              key={{i}}
              className="w-[2.5px] rounded-full"
              style={{{{ backgroundColor: isDark ? primaryColor : "{amber_contrast}" }}}}
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
    with open(ctrl_path, "w", encoding="utf-8") as f:
        f.write(code)

def clean_file_slashes_and_fonts(filepath: str):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Clean double slashes in text
    content = re.sub(r'//\s*TABLE RESERVATIONS', 'TABLE RESERVATIONS', content)
    content = re.sub(r'//\s*PHYSICAL OUTPOSTS', 'PHYSICAL OUTPOSTS', content)
    content = re.sub(r'//\s*CRAFT LAB\s*&\s*SCIENCE', 'MAILLARD SCIENCE', content)
    content = re.sub(r'//\s*CULINARY BOARD', 'SIGNATURE MENU', content)
    content = re.sub(r'//\s*CINEMATIC SERIES', 'CINEMATIC SERIES', content)
    content = re.sub(r'//\s*VIP TABLE RESERVATIONS', 'TABLE BOOKINGS', content)
    content = re.sub(r'//\s*VIP PASS', '', content)
    content = re.sub(r'//\s*BENGALURU', '· BENGALURU', content)
    content = re.sub(r'//\s*AUSTIN', '· AUSTIN', content)

    # General brand // patterns
    content = re.sub(r'[A-Z0-9\s\'\.\-]+\s*//\s*PHYSICAL OUTPOSTS', 'PHYSICAL OUTPOSTS', content)
    content = re.sub(r'[A-Z0-9\s\'\.\-]+\s*//\s*TABLE RESERVATIONS', 'TABLE RESERVATIONS', content)
    content = re.sub(r'[A-Z0-9\s\'\.\-]+\s*//\s*CRAFT LAB\s*&\s*SCIENCE', 'MAILLARD SCIENCE', content)
    content = re.sub(r'[A-Z0-9\s\'\.\-]+\s*//\s*CULINARY BOARD', 'SIGNATURE MENU', content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

def update_inner_pages(project_dir: str, slug: str, cfg: dict):
    name = cfg.get("name", slug.title())
    primary = cfg.get("primary", "#FF0036")
    city = cfg.get("city", "Global")

    # 1. /locations/page.tsx
    loc_path = os.path.join(project_dir, "app", "locations", "page.tsx")
    if os.path.exists(loc_path):
        with open(loc_path, "w", encoding="utf-8") as f:
            f.write(f"""\"use client\";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import RestaurantLocations from "@/components/marketing/RestaurantLocations";

export default function LocationsPage() {{
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-16 sm:py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold block" style={{{{ color: "{primary}" }}}}>
              PHYSICAL OUTPOSTS
            </span>
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white">
              OUR OUTPOSTS
            </h1>
          </div>
        </section>

        <RestaurantLocations />
      </main>
      <Footer />
    </>
  );
}}
""")

    # 2. /reservations/page.tsx
    res_path = os.path.join(project_dir, "app", "reservations", "page.tsx")
    if os.path.exists(res_path):
        with open(res_path, "w", encoding="utf-8") as f:
            f.write(f"""\"use client\";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import ReservationCTA from "@/components/marketing/ReservationCTA";

export default function ReservationsPage() {{
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-16 sm:py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold block" style={{{{ color: "{primary}" }}}}>
              TABLE BOOKINGS
            </span>
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white">
              RESERVE YOUR TABLE
            </h1>
          </div>
        </section>

        <ReservationCTA />
      </main>
      <Footer />
    </>
  );
}}
""")

    # 3. /about/page.tsx
    abt_path = os.path.join(project_dir, "app", "about", "page.tsx")
    if os.path.exists(abt_path):
        with open(abt_path, "w", encoding="utf-8") as f:
            f.write(f"""\"use client\";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import Image from "next/image";
import HowWeSmash from "@/components/marketing/HowWeSmash";

export default function AboutPage() {{
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-20 lg:py-28 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold block" style={{{{ color: "{primary}" }}}}>
              CULINARY HERITAGE
            </span>
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white leading-none">
              BUILT ON CAST IRON.
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-body">
              {name} brings genuine, handcrafted culinary discipline to {city} with fresh daily prime ingredients, custom artisanal recipes, and uncompromising craft.
            </p>
          </div>
        </section>

        <section className="py-16 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&q=80"
                  alt="{name} Craft Discipline"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold block" style={{{{ color: "{primary}" }}}}>
                    THE HEAT DISCIPLINE
                  </span>
                  <h3 className="type-display text-2xl text-white font-bold">
                    High-Heat Precision Sear
                  </h3>
                </div>
              </div>

              <div className="relative h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&q=80"
                  alt="{name} Fresh Ingredients"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold block" style={{{{ color: "{primary}" }}}}>
                    BESPOKE FLAVORS
                  </span>
                  <h3 className="type-display text-2xl text-white font-bold">
                    Signature Compositions
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowWeSmash />
      </main>
      <Footer />
    </>
  );
}}
""")

    # 4. /films/page.tsx
    films_path = os.path.join(project_dir, "app", "films", "page.tsx")
    if os.path.exists(films_path):
        with open(films_path, "w", encoding="utf-8") as f:
            f.write(f"""\"use client\";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import CinematicFrame from "@/components/marketing/CinematicFrame";

const frames = [
  {{
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
    title: "The Searing 450°F Horizon",
    maskType: "organic" as const,
    textPosition: "top-right" as const,
  }},
  {{
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    title: "Double Butter Cloche Steam",
    maskType: "parallelogram" as const,
    textPosition: "bottom-left" as const,
  }},
  {{
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1200&q=80",
    title: "Artisanal Reduction Craft",
    maskType: "circle" as const,
    textPosition: "center-below" as const,
  }},
  {{
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200&q=80",
    title: "Crisp Golden Companion",
    maskType: "pill" as const,
    textPosition: "bottom-right" as const,
  }},
];

export default function FilmsPage() {{
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10 font-sans">
        <section className="py-20 lg:py-28 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold block" style={{{{ color: "{primary}" }}}}>
              CINEMATIC GALLERY
            </span>
            <h1 className="type-display text-5xl sm:text-7xl md:text-8xl font-black text-white">
              CRAFT CHRONICLES
            </h1>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-24">
              {{frames.map((frame, i) => (
                <div key={{frame.title}}>
                  <CinematicFrame
                    image={{frame.image}}
                    title={{frame.title}}
                    index={{i + 1}}
                    maskType={{frame.maskType}}
                    textPosition={{frame.textPosition}}
                  />
                </div>
              ))}}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}}
""")

def main():
    print("🚀 Rolling out Inner Pages Polish, WCAG Day/Night Contrast & Clean Slashes across all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue

        primary = cfg.get("primary", "#FF0036")
        theme_base = cfg.get("theme_base", "#070709")

        # 1. Update globals.css with WCAG day/night contrast rules
        update_globals_css(project_dir, primary)

        # 2. Update AtmosphereControls with separate vertical circles
        update_atmosphere_controls(project_dir, primary, theme_base)

        # 3. Clean slashes in all marketing components
        marketing_dir = os.path.join(project_dir, "components", "marketing")
        if os.path.exists(marketing_dir):
            for fname in os.listdir(marketing_dir):
                if fname.endswith(".tsx") or fname.endswith(".ts"):
                    clean_file_slashes_and_fonts(os.path.join(marketing_dir, fname))

        # 4. Clean slashes and elevate inner pages
        update_inner_pages(project_dir, slug, cfg)

        print(f"✓ Completed polish & inner page upgrades for {slug}")

    print("\n🎉 Master rollout of Inner Pages & Theme Contrast completed successfully!")

if __name__ == "__main__":
    main()
