"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FrameScrubberProps {
  frames: string[];
  progress?: number;
  className?: string;
  alt?: string;
  scrubStart?: string;
  scrubEnd?: string;
  pin?: boolean;
  priority?: boolean;
  preloadCount?: number;
  bufferSize?: number;
  onProgressChange?: (progress: number, frameIndex: number) => void;
}

export default function FrameScrubber({
  frames,
  progress,
  className = "",
  alt = "Cinematic frame sequence",
  scrubStart = "top top",
  scrubEnd = "bottom top",
  pin = false,
  priority = false,
  preloadCount = 40,
  bufferSize = 12,
  onProgressChange,
}: FrameScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(-1);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedSetRef = useRef<Set<number>>(new Set());
  const [loadProgress, setLoadProgress] = useState(0);

  // Safely get physical canvas context and update size according to DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const rect = container.getBoundingClientRect();
    const displayWidth = Math.floor(rect.width * dpr);
    const displayHeight = Math.floor(rect.height * dpr);

    if (displayWidth > 0 && displayHeight > 0 && (canvas.width !== displayWidth || canvas.height !== displayHeight)) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      return true;
    }
    return false;
  }, []);

  // Preload a single frame index
  const preloadFrame = useCallback(
    (index: number): Promise<HTMLImageElement | null> => {
      if (index < 0 || index >= frames.length) return Promise.resolve(null);
      if (imageCacheRef.current.has(index)) {
        return Promise.resolve(imageCacheRef.current.get(index)!);
      }

      return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          imageCacheRef.current.set(index, img);
          loadedSetRef.current = new Set(loadedSetRef.current).add(index);
          setLoadProgress(loadedSetRef.current.size / frames.length);
          resolve(img);
        };
        img.onerror = () => resolve(null);
        img.src = frames[index];
      });
    },
    [frames]
  );

  // Find closest loaded frame if target frame is still downloading
  const getBestAvailableImage = useCallback(
    (targetIndex: number): HTMLImageElement | null => {
      const direct = imageCacheRef.current.get(targetIndex);
      if (direct && direct.complete && direct.naturalWidth > 0) {
        return direct;
      }

      // Search outwards for nearest available frame
      for (let offset = 1; offset < frames.length; offset++) {
        const prev = targetIndex - offset;
        if (prev >= 0) {
          const imgPrev = imageCacheRef.current.get(prev);
          if (imgPrev && imgPrev.complete && imgPrev.naturalWidth > 0) {
            return imgPrev;
          }
        }
        const next = targetIndex + offset;
        if (next < frames.length) {
          const imgNext = imageCacheRef.current.get(next);
          if (imgNext && imgNext.complete && imgNext.naturalWidth > 0) {
            return imgNext;
          }
        }
      }
      return null;
    },
    [frames.length]
  );

  // Draw frame to canvas at full physical resolution with object-cover math
  const renderCanvas = useCallback(
    (targetIndex: number, forceRedraw = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = getBestAvailableImage(targetIndex);
      if (!img) return;

      if (!forceRedraw && targetIndex === currentFrameRef.current) return;
      currentFrameRef.current = targetIndex;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Perfect object-cover scale calculation
      const scale = Math.max(cw / iw, ch / ih);
      const dw = Math.round(iw * scale);
      const dh = Math.round(ih * scale);
      const dx = Math.round((cw - dw) / 2);
      const dy = Math.round((ch - dh) / 2);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [getBestAvailableImage]
  );

  // Multi-tier preloader strategy
  useEffect(() => {
    if (!frames.length) return;
    let isCancelled = false;

    // Tier 1: Keyframe priority load (every 4th frame)
    const keyframes: number[] = [];
    const step = 4;
    for (let i = 0; i < frames.length; i += step) {
      keyframes.push(i);
    }
    if (!keyframes.includes(frames.length - 1)) {
      keyframes.push(frames.length - 1);
    }

    Promise.all(keyframes.map((idx) => preloadFrame(idx))).then(() => {
      if (isCancelled) return;
      resizeCanvas();
      renderCanvas(targetFrameRef.current, true);

      // Tier 2: Background fill remaining frames in idle chunks
      let fillIndex = 0;
      const loadChunk = () => {
        if (isCancelled || fillIndex >= frames.length) return;
        const batchSize = 8;
        const promises: Promise<any>[] = [];
        for (let b = 0; b < batchSize && fillIndex < frames.length; b++) {
          if (!loadedSetRef.current.has(fillIndex)) {
            promises.push(preloadFrame(fillIndex));
          }
          fillIndex++;
        }
        Promise.all(promises).then(() => {
          if (!isCancelled && fillIndex < frames.length) {
            if ("requestIdleCallback" in window) {
              (window as any).requestIdleCallback(loadChunk, { timeout: 100 });
            } else {
              setTimeout(loadChunk, 10);
            }
          }
        });
      };
      loadChunk();
    });

    return () => {
      isCancelled = true;
    };
  }, [frames, preloadFrame, renderCanvas, resizeCanvas]);

  // Window ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      if (resizeCanvas()) {
        renderCanvas(targetFrameRef.current >= 0 ? targetFrameRef.current : 0, true);
      }
    });

    observer.observe(container);
    resizeCanvas();

    return () => observer.disconnect();
  }, [resizeCanvas, renderCanvas]);

  // Mode A: Controlled progress prop passed from parent
  useEffect(() => {
    if (progress === undefined || progress === null) return;

    const clamped = Math.max(0, Math.min(1, progress));
    const frameIndex = Math.min(
      Math.floor(clamped * frames.length),
      frames.length - 1
    );

    targetFrameRef.current = frameIndex;

    // Sliding window priority preloading around scrub point
    const windowStart = Math.max(0, frameIndex - bufferSize);
    const windowEnd = Math.min(frames.length - 1, frameIndex + bufferSize);
    for (let i = windowStart; i <= windowEnd; i++) {
      preloadFrame(i);
    }

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = 0;
        renderCanvas(targetFrameRef.current);
      });
    }
  }, [progress, frames.length, bufferSize, preloadFrame, renderCanvas]);

  // Mode B: Fallback standalone ScrollTrigger (only if progress prop is undefined)
  useEffect(() => {
    if (progress !== undefined) return; // Parent is controlling progress directly!
    if (!containerRef.current || !canvasRef.current || !frames.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      preloadFrame(0).then(() => {
        resizeCanvas();
        renderCanvas(0, true);
      });
      return;
    }

    const ctx = gsap.context(() => {
      const updateTrigger = (self: any) => {
        const p = Math.max(0, Math.min(1, self.progress));
        const frameIndex = Math.min(
          Math.floor(p * frames.length),
          frames.length - 1
        );

        targetFrameRef.current = frameIndex;

        if (onProgressChange) {
          onProgressChange(p, frameIndex);
        }

        const windowStart = Math.max(0, frameIndex - bufferSize);
        const windowEnd = Math.min(frames.length - 1, frameIndex + bufferSize);
        for (let i = windowStart; i <= windowEnd; i++) {
          preloadFrame(i);
        }

        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = 0;
            renderCanvas(targetFrameRef.current);
          });
        }
      };

      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrubStart,
          end: scrubEnd,
          pin: pin,
          scrub: 0.5,
          onUpdate: updateTrigger,
          onRefresh: () => {
            resizeCanvas();
            renderCanvas(targetFrameRef.current, true);
          },
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [
    progress,
    frames.length,
    scrubStart,
    scrubEnd,
    pin,
    bufferSize,
    preloadFrame,
    renderCanvas,
    resizeCanvas,
    onProgressChange,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-label={alt}
        className="w-full h-full object-cover block will-change-transform"
        draggable={false}
      />

      {/* Subtle luxury preloader progress accent bar */}
      {loadProgress < 1 && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-ink/5 pointer-events-none z-30">
          <div
            className="h-full bg-gold transition-all duration-300 ease-out"
            style={{ width: `${Math.round(loadProgress * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
