import os

brands = {
    'backyard-burgers': {'primary': '#E67E22', 'particles': True, 'dot_opacity': 0.12, 'theme': 'ember'},
    'beyondburg-inc': {'primary': '#F5C418', 'particles': True, 'dot_opacity': 0.10, 'theme': 'aurora'},
    'biggies-burger': {'primary': '#F26522', 'particles': True, 'dot_opacity': 0.12, 'theme': 'ember'},
    'burger-bar-austin': {'primary': '#2563EB', 'particles': False, 'dot_opacity': 0.10, 'theme': 'grid'},
    'burger-elite': {'primary': '#7C3AED', 'particles': True, 'dot_opacity': 0.10, 'theme': 'aurora'},
    'burger-seigneur': {'primary': '#C8A96E', 'particles': True, 'dot_opacity': 0.08, 'theme': 'luxury'},
    'burgerman': {'primary': '#15803D', 'particles': False, 'dot_opacity': 0.10, 'theme': 'grid'},
    'casino-el-camino': {'primary': '#DC2626', 'particles': True, 'dot_opacity': 0.14, 'theme': 'ember'},
    'dans-burgers': {'primary': '#D97706', 'particles': False, 'dot_opacity': 0.10, 'theme': 'vintage'},
    'dirty-martins': {'primary': '#BF5700', 'particles': False, 'dot_opacity': 0.10, 'theme': 'vintage'},
    'good-flippin-burgers': {'primary': '#BE123C', 'particles': True, 'dot_opacity': 0.10, 'theme': 'grid'},
    'jewboy-burgers': {'primary': '#06B6D4', 'particles': False, 'dot_opacity': 0.10, 'theme': 'grid'},
    'leons-burgers': {'primary': '#B12727', 'particles': True, 'dot_opacity': 0.12, 'theme': 'ember'},
    'little-deli-pizzeria': {'primary': '#166534', 'particles': False, 'dot_opacity': 0.10, 'theme': 'grid'},
    'louis-burger': {'primary': '#D4AF37', 'particles': True, 'dot_opacity': 0.08, 'theme': 'luxury'},
    'nadc-burger': {'primary': '#FFFFFF', 'particles': True, 'dot_opacity': 0.06, 'theme': 'luxury'},
    'original-burger-co': {'primary': '#2563EB', 'particles': False, 'dot_opacity': 0.10, 'theme': 'grid'},
    'pedrosos-pizza': {'primary': '#B91C1C', 'particles': True, 'dot_opacity': 0.12, 'theme': 'ember'},
    'pool-burger': {'primary': '#F43F5E', 'particles': True, 'dot_opacity': 0.10, 'theme': 'aurora'},
    'sankys-burger-house': {'primary': '#FFE500', 'particles': True, 'dot_opacity': 0.12, 'theme': 'ember'},
    'simon-burgers': {'primary': '#DC2626', 'particles': True, 'dot_opacity': 0.12, 'theme': 'ember'},
    'smash-guys': {'primary': '#F5C418', 'particles': True, 'dot_opacity': 0.10, 'theme': 'ember'},
    'sour-duck-market': {'primary': '#EA580C', 'particles': True, 'dot_opacity': 0.10, 'theme': 'vintage'},
    'truffles-bangalore': {'primary': '#F5A623', 'particles': True, 'dot_opacity': 0.10, 'theme': 'aurora'},
}

interactive_bg_template = '''"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface InteractiveBackgroundProps {
  primaryColor?: string;
  enableParticles?: boolean;
}

export default function InteractiveBackground({
  primaryColor = "__PRIMARY__",
  enableParticles = __PARTICLES__,
}: InteractiveBackgroundProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse tracking for interactive spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating ambient embers / sparks for cinematic warmth
  useEffect(() => {
    if (!enableParticles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      vy: -(Math.random() * 0.4 + 0.15),
      vx: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      maxAlpha: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.005 + 0.002,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.alpha += p.fadeSpeed;

        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.alpha = 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha * 0.4));
        ctx.shadowBlur = 8;
        ctx.shadowColor = primaryColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enableParticles, primaryColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* ── Deep Base Canvas ── */}
      <div className="absolute inset-0 bg-[#070709]" />

      {/* ── Interactive Cursor Spotlight ── */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[160px] opacity-15 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: primaryColor,
          left: springX ? `${springX.get() * 100}%` : "50%",
          top: springY ? `${springY.get() * 100}%` : "30%",
        }}
      />

      {/* ── Fixed Ambient Atmosphere Orbs ── */}
      <div
        className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute bottom-0 left-10 w-[700px] h-[700px] rounded-full blur-[200px] opacity-08 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      {/* ── Subtle Geometric Dot Matrix Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[__DOT_OPACITY__]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${primaryColor} 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Subtle Film Grain Noise ── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Floating Embers / Sparks Canvas ── */}
      {enableParticles && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}
    </div>
  );
}
'''

for slug, cfg in brands.items():
    p_path = os.path.join('projects', slug)
    if not os.path.exists(p_path):
        continue

    # 1. Create InteractiveBackground.tsx in components/ui
    bg_code = interactive_bg_template.replace('__PRIMARY__', cfg['primary']).replace('__PARTICLES__', 'true' if cfg['particles'] else 'false').replace('__DOT_OPACITY__', str(cfg['dot_opacity']))
    os.makedirs(os.path.join(p_path, 'components', 'ui'), exist_ok=True)
    with open(os.path.join(p_path, 'components', 'ui', 'InteractiveBackground.tsx'), 'w') as f:
        f.write(bg_code)

    # 2. Add InteractiveBackground to app/layout.tsx
    layout_path = os.path.join(p_path, 'app', 'layout.tsx')
    if os.path.exists(layout_path):
        with open(layout_path, 'r') as f:
            layout_c = f.read()
        
        if 'InteractiveBackground' not in layout_c:
            layout_c = 'import InteractiveBackground from "@/components/ui/InteractiveBackground";\n' + layout_c
            layout_c = layout_c.replace(
                '<CustomCursor />',
                '<InteractiveBackground />\n          <CustomCursor />'
            )
            with open(layout_path, 'w') as f:
                f.write(layout_c)

    print(f"✓ Deployed React Bits Interactive Background for {slug}")

print("\n🎉 Interactive Backgrounds deployed across all 24 projects!")
