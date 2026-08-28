#!/usr/bin/env python3
"""
Master rollout for guaranteed live restaurant jazz audio (100% vol) and foolproof Day/Night theme transitions across all 24 projects.
"""

import os

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

from rollout_interactive_doodles_and_upgrades import brand_configs

def update_layout(project_dir: str, slug: str, cfg: dict):
    layout_path = os.path.join(project_dir, "app", "layout.tsx")
    if not os.path.exists(layout_path):
        return

    name = cfg.get("name", slug.title())
    primary = cfg.get("primary", "#FF0036")
    theme_base = cfg.get("theme_base", "#070709")
    city = cfg.get("city", "Global")

    code = f"""import InteractiveBackground from "@/components/ui/InteractiveBackground";
import AtmosphereControls from "@/components/ui/AtmosphereControls";
import type {{ Metadata }} from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {{
  title: "{name} | {city.upper()}",
  description: "{name} — Culinary craft atelier in {city}.",
}};

export default function RootLayout({{
  children,
}}: Readonly<{{
  children: React.ReactNode;
}}>) {{
  return (
    <html lang="en" className="dark">
      <body className="antialiased overflow-x-hidden transition-colors duration-500">
        <LenisProvider>
          <InteractiveBackground primaryColor="{primary}" themeBase="{theme_base}" />
          <CustomCursor />
          {{children}}
          <AtmosphereControls primaryColor="{primary}" darkBg="{theme_base}" lightBg="#FAF8F2" />
        </LenisProvider>
      </body>
    </html>
  );
}}
"""
    with open(layout_path, "w", encoding="utf-8") as f:
        f.write(code)

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<any>(null);

  // Initialize Audio & Click Sounds
  useEffect(() => {{
    // 1. Create native HTML5 Audio Element for rich restaurant jazz
    const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3");
    audio.loop = true;
    audio.volume = 1.0; // 100% volume
    audioRef.current = audio;

    // Pop Click Sound
    const playPop = () => {{
      try {{
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
      }} catch (err) {{
        // silent fallback
      }}
    }};

    // Sizzle Sound for Sear / Fire buttons
    const playSizzle = () => {{
      try {{
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 0.7;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {{
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.35));
        }}
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

    return () => {{
      window.removeEventListener("click", handleGlobalClick);
      if (audioRef.current) {{
        audioRef.current.pause();
        audioRef.current = null;
      }}
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    }};
  }}, []);

  // Live Restaurant Jazz Audio Toggle (100% Volume)
  const toggleMusic = () => {{
    const audio = audioRef.current;

    if (isPlayingMusic) {{
      // Pause
      if (audio) {{
        audio.pause();
      }}
      if (synthIntervalRef.current) {{
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }}
      setIsPlayingMusic(false);
    }} else {{
      // Play at 100% Volume
      setIsPlayingMusic(true);

      if (audio) {{
        audio.volume = 1.0;
        audio
          .play()
          .catch(() => {{
            // Web Audio fallback if MP3 stream is blocked
            startSynthFallback();
          }});
      }} else {{
        startSynthFallback();
      }}
    }}
  }};

  const startSynthFallback = () => {{
    try {{
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

      const playChord = () => {{
        const c = chords[chordIdx % chords.length];
        chordIdx++;
        const now = ctx.currentTime;

        c.forEach((freq) => {{
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
        }});
      }};

      playChord();
      synthIntervalRef.current = setInterval(playChord, 2200);
    }} catch (e) {{
      // ignore
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
      body.classList.add("dark");
      body.classList.remove("light");
      body.style.setProperty("background-color", darkBg, "important");
      body.style.setProperty("color", "#FAF8F2", "important");
    }} else {{
      root.classList.remove("dark");
      root.classList.add("light");
      body.classList.remove("dark");
      body.classList.add("light");
      body.style.setProperty("background-color", lightBg, "important");
      body.style.setProperty("color", "#18181B", "important");
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

def generate_interactive_background(primary: str, theme_base: str, food_type: str) -> str:
    doodle_types_json = '["pizza", "slice", "flame", "star", "sparkle", "steam", "swirl"]' if food_type == "pizza" else '["burger", "spatula", "flame", "star", "sparkle", "steam", "swirl"]'

    return f"""\"use client\";

import React, {{ useEffect, useRef, useState }} from "react";
import {{ motion, useMotionValue, useSpring }} from "framer-motion";

interface InteractiveBackgroundProps {{
  primaryColor?: string;
  themeBase?: string;
}}

export default function InteractiveBackground({{
  primaryColor = "{primary}",
  themeBase = "{theme_base}",
}}: InteractiveBackgroundProps) {{
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const springX = useSpring(mouseX, {{ stiffness: 45, damping: 25 }});
  const springY = useSpring(mouseY, {{ stiffness: 45, damping: 25 }});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {{
    const handleThemeChange = (e: any) => {{
      const isDark = e.detail?.isDark !== undefined ? e.detail.isDark : true;
      setIsDarkMode(isDark);
    }};

    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }}, []);

  useEffect(() => {{
    const handleMouseMove = (e: MouseEvent) => {{
      const {{ innerWidth, innerHeight }} = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    }};

    window.addEventListener("mousemove", handleMouseMove, {{ passive: true }});
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }}, [mouseX, mouseY]);

  useEffect(() => {{
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {{
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }};
    window.addEventListener("resize", handleResize);

    const doodleTypes = {doodle_types_json};
    const doodleCount = 22;

    const doodles = Array.from({{ length: doodleCount }}, (_, i) => ({{
      type: doodleTypes[i % doodleTypes.length],
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 22 + 18,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.3 + 0.1),
      alpha: Math.random() * 0.35 + 0.15,
      maxAlpha: Math.random() * 0.45 + 0.2,
      fadeSpeed: Math.random() * 0.004 + 0.002,
    }}));

    const emberCount = 35;
    const embers = Array.from({{ length: emberCount }}, () => ({{
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      vy: -(Math.random() * 0.5 + 0.2),
      vx: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.006 + 0.003,
    }}));

    const drawBurger = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.arc(0, -s * 0.3, s, Math.PI, 0, false);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(-s * 0.4, -s * 0.6, 1.2, 0, Math.PI * 2);
      c.arc(0, -s * 0.7, 1.2, 0, Math.PI * 2);
      c.arc(s * 0.4, -s * 0.6, 1.2, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.moveTo(-s * 1.1, 0);
      c.quadraticCurveTo(0, s * 0.3, s * 1.1, 0);
      c.stroke();
      c.beginPath();
      c.moveTo(-s, s * 0.1);
      c.lineTo(-s * 0.3, s * 0.5);
      c.lineTo(0, s * 0.1);
      c.lineTo(s * 0.4, s * 0.6);
      c.lineTo(s, s * 0.1);
      c.stroke();
      c.beginPath();
      c.arc(0, s * 0.3, s * 0.9, 0, Math.PI, false);
      c.stroke();
    }};

    const drawPizza = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s * 1.2);
      c.lineTo(s * 0.9, s * 0.9);
      c.quadraticCurveTo(0, s * 1.1, -s * 0.9, s * 0.9);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(-s * 0.2, 0, 2.5, 0, Math.PI * 2);
      c.arc(s * 0.25, s * 0.2, 2.5, 0, Math.PI * 2);
      c.arc(0, s * 0.5, 2.5, 0, Math.PI * 2);
      c.fill();
    }};

    const drawSpatula = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.rect(-s * 0.7, -s * 0.9, s * 1.4, s * 0.8);
      c.stroke();
      c.beginPath();
      c.moveTo(-s * 0.3, -s * 0.7);
      c.lineTo(-s * 0.3, -s * 0.3);
      c.moveTo(0, -s * 0.7);
      c.lineTo(0, -s * 0.3);
      c.moveTo(s * 0.3, -s * 0.7);
      c.lineTo(s * 0.3, -s * 0.3);
      c.stroke();
      c.beginPath();
      c.moveTo(0, -s * 0.1);
      c.lineTo(0, s * 0.9);
      c.stroke();
    }};

    const drawFlame = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s);
      c.quadraticCurveTo(s * 0.8, -s * 0.2, s * 0.5, s * 0.7);
      c.quadraticCurveTo(0, s, -s * 0.5, s * 0.7);
      c.quadraticCurveTo(-s * 0.8, -s * 0.2, 0, -s);
      c.stroke();
    }};

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.4;
      c.beginPath();
      c.moveTo(0, -s * 1.2);
      c.lineTo(s * 0.3, -s * 0.3);
      c.lineTo(s * 1.2, 0);
      c.lineTo(s * 0.3, s * 0.3);
      c.lineTo(0, s * 1.2);
      c.lineTo(-s * 0.3, s * 0.3);
      c.lineTo(-s * 1.2, 0);
      c.lineTo(-s * 0.3, -s * 0.3);
      c.closePath();
      c.stroke();
    }};

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.35;
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.moveTo(-s, 0);
      c.lineTo(s, 0);
      c.stroke();
    }};

    const drawSteam = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(-s * 0.3, s * 0.6);
      c.quadraticCurveTo(-s * 0.6, 0, -s * 0.2, -s * 0.6);
      c.moveTo(s * 0.3, s * 0.6);
      c.quadraticCurveTo(s * 0.6, 0, s * 0.2, -s * 0.6);
      c.stroke();
    }};

    const drawSwirl = (c: CanvasRenderingContext2D, size: number) => {{
      const s = size * 0.4;
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 1.5, false);
      c.stroke();
    }};

    const render = () => {{
      ctx.clearRect(0, 0, width, height);

      const mX = springX.get() * width;
      const mY = springY.get() * height;

      // Draw Embers
      ctx.fillStyle = primaryColor;
      for (let i = 0; i < embers.length; i++) {{
        const e = embers[i];
        e.y += e.vy;
        e.x += e.vx;
        e.alpha += e.fadeSpeed;
        if (e.alpha > 0.6 || e.alpha < 0.1) e.fadeSpeed = -e.fadeSpeed;

        if (e.y < -10) {{
          e.y = height + 10;
          e.x = Math.random() * width;
        }}

        ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha));
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
      }}

      // Draw Motion Doodles
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < doodles.length; i++) {{
        const d = doodles[i];

        d.x += d.vx;
        d.y += d.vy;
        d.rotation += d.rotSpeed;

        d.alpha += d.fadeSpeed;
        if (d.alpha > d.maxAlpha || d.alpha < 0.12) {{
          d.fadeSpeed = -d.fadeSpeed;
        }}

        const dx = mX - d.x;
        const dy = mY - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {{
          const force = (180 - dist) / 180;
          d.x -= (dx / dist) * force * 1.5;
          d.y -= (dy / dist) * force * 1.5;
        }}

        if (d.y < -50) {{
          d.y = height + 50;
          d.x = Math.random() * width;
        }}
        if (d.x < -50) d.x = width + 50;
        if (d.x > width + 50) d.x = -50;

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, d.alpha));

        switch (d.type) {{
          case "burger":
            drawBurger(ctx, d.size);
            break;
          case "pizza":
          case "slice":
            drawPizza(ctx, d.size);
            break;
          case "spatula":
            drawSpatula(ctx, d.size);
            break;
          case "flame":
            drawFlame(ctx, d.size);
            break;
          case "star":
            drawStar(ctx, d.size);
            break;
          case "sparkle":
            drawSparkle(ctx, d.size);
            break;
          case "steam":
            drawSteam(ctx, d.size);
            break;
          case "swirl":
            drawSwirl(ctx, d.size);
            break;
        }}

        ctx.restore();
      }}

      animationFrameId = requestAnimationFrame(render);
    }};

    render();

    return () => {{
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    }};
  }}, [primaryColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      {{/* Dynamic Background Surface */}}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{{{
          background: isDarkMode
            ? `radial-gradient(circle at 50% 30%, ${{themeBase}} 0%, #050806 100%)`
            : `radial-gradient(circle at 50% 30%, #FAF8F2 0%, #EDE7DB 100%)`,
        }}}}
      />

      {{/* Atmospheric Ambient Glows */}}
      <motion.div
        className={{`absolute w-[900px] h-[900px] rounded-full blur-[180px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${{
          isDarkMode ? "opacity-20" : "opacity-10"
        }}`}}
        style={{{{
          backgroundColor: primaryColor,
          left: springX ? `${{springX.get() * 100}}%` : "50%",
          top: springY ? `${{springY.get() * 100}}%` : "30%",
        }}}}
      />

      <div
        className={{`absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none transition-opacity duration-500 ${{
          isDarkMode ? "opacity-15" : "opacity-0"
        }}`}}
        style={{{{ backgroundColor: primaryColor }}}}
      />
      <div
        className={{`absolute bottom-0 left-10 w-[800px] h-[800px] rounded-full blur-[220px] pointer-events-none transition-opacity duration-500 ${{
          isDarkMode ? "opacity-12" : "opacity-0"
        }}`}}
        style={{{{ backgroundColor: primaryColor }}}}
      />

      <canvas
        ref={{canvasRef}}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}}
"""

def main():
    print("🚀 Rolling out Live Restaurant Jazz & Foolproof Day/Night Engine across all 24 projects...")
    for slug, cfg in brand_configs.items():
        project_dir = os.path.join(PROJECTS_DIR, slug)
        if not os.path.exists(project_dir):
            continue

        primary = cfg.get("primary", "#FF0036")
        theme_base = cfg.get("theme_base", "#070709")
        food_type = cfg.get("food_type", "burger")

        ui_dir = os.path.join(project_dir, "components", "ui")
        os.makedirs(ui_dir, exist_ok=True)

        # 1. layout.tsx with clean body
        update_layout(project_dir, slug, cfg)

        # 2. AtmosphereControls with HTML5 live audio stream @ 100% vol
        with open(os.path.join(ui_dir, "AtmosphereControls.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_atmosphere_controls(primary, theme_base))

        # 3. InteractiveBackground with dynamic state
        with open(os.path.join(ui_dir, "InteractiveBackground.tsx"), "w", encoding="utf-8") as f:
            f.write(generate_interactive_background(primary, theme_base, food_type))

        print(f"✓ Deployed live jazz audio & theme engine to {slug}")

    print("\n🎉 Master rollout of Live Jazz Audio & Theme Engine complete!")

if __name__ == "__main__":
    main()
