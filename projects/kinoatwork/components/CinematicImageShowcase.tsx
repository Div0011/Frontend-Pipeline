"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";

/* ================================================================== */
/* Data definitions                                                   */
/* ================================================================== */

interface ImageItem {
  id: string;
  title: string;
  url: string;
}

const WORK_IMAGES: ImageItem[] = [
  {
    id: "ghats",
    title: "Silence of the Ghats",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=90&fit=crop",
  },
  {
    id: "monsoon",
    title: "The Last Monsoon",
    url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1920&q=90&fit=crop",
  },
  {
    id: "light",
    title: "After the Light",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=90&fit=crop",
  },
  {
    id: "benares",
    title: "Benares Shadows",
    url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1920&q=90&fit=crop",
  },
];

const REEL_IMAGES: ImageItem[] = [
  {
    id: "ghats-reel",
    title: "Silence of the Ghats",
    url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1920&q=90&fit=crop",
  },
  {
    id: "desert",
    title: "Desert Solitude",
    url: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1920&q=90&fit=crop",
  },
  {
    id: "light-reel",
    title: "After the Light",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=90&fit=crop",
  },
  {
    id: "mist",
    title: "Morning Mist",
    url: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=1920&q=90&fit=crop",
  },
];

/* ================================================================== */
/* Helper transitions                                                 */
/* ================================================================== */

const TRANSITION_SIZE = 0.08; // size of transition zone around boundaries

const getMaskStyle = (index: number) => {
  const normalizedIndex = index % 4;
  if (normalizedIndex === 0) {
    return {
      style: { borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%" },
      className: "w-[85vw] md:w-[50vw] aspect-[16/10]",
    };
  }
  if (normalizedIndex === 1) {
    return {
      style: { clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)", borderRadius: "0px" },
      className: "w-[85vw] md:w-[52vw] aspect-[16/10]",
    };
  }
  if (normalizedIndex === 2) {
    return {
      style: { borderRadius: "50%" },
      className: "w-[75vw] md:w-[35vw] aspect-square",
    };
  }
  return {
    style: { borderRadius: "9999px" },
    className: "w-[85vw] md:w-[52vw] aspect-[16/10]",
  };
};

interface Props {
  progress: number;
  chapterId: string | null;
}

export default function CinematicImageShowcase({ progress, chapterId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const easedMouseRef = useRef({ x: 0, y: 0 });
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(0);

  // 1. Calculate active chapter local progress and current image to show
  const { localProgress, images, itemIndex, isImageChapter } = useMemo(() => {
    const isWork = chapterId === "work";
    const isReel = chapterId === "reel";
    const isImageChapter = isWork || isReel;

    if (!isImageChapter) {
      return { localProgress: 0, images: [], itemIndex: -1, isImageChapter: false };
    }

    const ranges: Record<string, [number, number]> = {
      work: [0.208, 0.455],
      reel: [0.62, 0.785],
    };
    const r = ranges[chapterId!];
    if (!r) return { localProgress: 0, images: [], itemIndex: -1, isImageChapter: false };

    const [start, end] = r;
    const local = Math.max(0, Math.min(1, (progress - start) / (end - start)));
    const imgs = isWork ? WORK_IMAGES : REEL_IMAGES;
    const rawIdx = Math.floor(local * imgs.length);
    const itemIndex = Math.max(0, Math.min(imgs.length - 1, rawIdx));

    return { localProgress: local, images: imgs, itemIndex, isImageChapter };
  }, [progress, chapterId]);

  // 2. Determine fog density and image visibility state
  const { fogDensity, showImage } = useMemo(() => {
    if (!isImageChapter) return { fogDensity: 0, showImage: false };

    const count = images.length;
    // Boundaries are at 0, 1/count, 2/count, ... 1.0
    const boundaries = Array.from({ length: count + 1 }, (_, i) => i / count);

    // Find the nearest boundary
    let minDistance = 999;
    for (const b of boundaries) {
      const dist = Math.abs(localProgress - b);
      if (dist < minDistance) {
        minDistance = dist;
      }
    }

    // Calculate fog density: climbs to 1.0 near boundaries
    const fogDensity = Math.max(
      0,
      Math.min(1, 1 - minDistance / TRANSITION_SIZE)
    );

    // Show image when we are NOT in the boundary zones of the outer edges
    // e.g. at localProgress < TRANSITION_SIZE or localProgress > 1 - TRANSITION_SIZE,
    // we are transitioning back to the moving frame canvas
    const nearStartEdge = localProgress < TRANSITION_SIZE;
    const nearEndEdge = localProgress > 1 - TRANSITION_SIZE;
    const showImage = !nearStartEdge && !nearEndEdge;

    return { fogDensity, showImage };
  }, [localProgress, images, isImageChapter]);

  // 3. Keep tracking mouse movement with smooth lerp
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // 4. Update the active image and fade opacities based on current state
  useEffect(() => {
    if (!showImage || !isImageChapter || itemIndex === -1) {
      // Fade out
      setImageOpacity(0);
      setActiveImage(null);
      return;
    }

    const nextImg = images[itemIndex]?.url || null;
    if (nextImg !== activeImage) {
      // Swipe with fog cover: if changing images, do it quickly when fog is thick
      if (fogDensity > 0.6 || !activeImage) {
        setActiveImage(nextImg);
        setImageOpacity(1);
      }
    } else {
      // Smoothly adjust opacity with fog density:
      // When fog is 1.0, image opacity dips slightly to blend better with fog
      const targetOpacity = 1.0 - fogDensity * 0.45;
      setImageOpacity(targetOpacity);
    }
  }, [showImage, itemIndex, activeImage, images, fogDensity, isImageChapter]);

  // 5. Canvas Fog particles loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let handle = 0;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string; // black/white fog mix
      alpha: number;
    }[] = [];

    // Initialize smoke particles
    const PARTICLE_COUNT = 32;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isWhite = Math.random() > 0.45;
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 0.8,
        size: window.innerWidth * (0.25 + Math.random() * 0.3),
        color: isWhite ? "244, 241, 236" : "6, 6, 6",
        alpha: 0.05 + Math.random() * 0.12,
      });
    }

    const tick = () => {
      handle = requestAnimationFrame(tick);

      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      if (fogDensity < 0.005) return;

      // Render & drift particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -p.size) p.x = w + p.size;
        if (p.x > w + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = h + p.size;
        if (p.y > h + p.size) p.y = -p.size;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        // Scale particle alpha by current fog density
        const alpha = p.alpha * fogDensity * 1.5;
        gradient.addColorStop(0, `rgba(${p.color}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${p.color}, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
    };

    handle = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(handle);
  }, [fogDensity]);

  // 6. Image position animation loop (Smooth mouse lag + scroll parallax)
  useEffect(() => {
    let handle = 0;
    const imgEl = containerRef.current?.querySelector(".parallax-img-el") as HTMLElement;

    const updateParallax = () => {
      handle = requestAnimationFrame(updateParallax);

      // Lerp mouse
      easedMouseRef.current.x += (mouseRef.current.x - easedMouseRef.current.x) * 0.08;
      easedMouseRef.current.y += (mouseRef.current.y - easedMouseRef.current.y) * 0.08;

      if (!imgEl) return;

      // Scroll-driven Y parallax offset: centering the offset around the active index
      const itemProgress = (localProgress * images.length) % 1;
      const scrollYOffset = (itemProgress - 0.5) * -75; // -75px to 75px translation

      // Mouse-driven offset
      const mouseXOffset = easedMouseRef.current.x * -16;
      const mouseYOffset = easedMouseRef.current.y * -12;

      imgEl.style.transform = `translate3d(${mouseXOffset}px, ${scrollYOffset + mouseYOffset}px, 0) scale(1.08)`;
    };

    handle = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(handle);
  }, [localProgress, images.length]);

  const maskConfig = itemIndex !== -1 ? getMaskStyle(itemIndex) : null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[21] pointer-events-none"
    >
      {/* ── Floating Image Container with morphing shape mask ── */}
      {activeImage && maskConfig && (
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-cinema-rule/20 bg-cinema-surface/10 backdrop-blur-xs shadow-2xl transition-all duration-700 ${maskConfig.className}`}
          style={{
            opacity: imageOpacity,
            ...maskConfig.style,
          }}
        >
          {/* Parallax Container */}
          <img
            src={activeImage}
            alt="Cinematic Showcase"
            className="parallax-img-el absolute inset-0 w-full h-full object-cover select-none will-change-transform"
            style={{
              transition: "opacity 0.3s ease-out",
            }}
          />
          {/* Subtle color grading layer to pull it into the dark scheme */}
          <div className="absolute inset-0 bg-black/15 mix-blend-multiply" />
        </div>
      )}

      {/* ── Fog transition canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[22]"
        style={{ opacity: Math.min(1, fogDensity * 1.2) }}
      />
    </div>
  );
}
