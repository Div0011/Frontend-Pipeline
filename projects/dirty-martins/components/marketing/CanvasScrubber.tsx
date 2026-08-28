"use client";

import {
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Global frame image cache to ensure zero latency and instant 60fps scrubbing
const globalFrameCache = new Map<string, HTMLImageElement>();

interface CanvasScrubberProps {
  frames: string[];
  scrollDistance?: string;
  onProgress?: (progress: number) => void;
  children?: React.ReactNode;
  overlayGradient?: boolean;
  preloadCount?: number;
}

function parseExtraVh(scrollDistance: string): number {
  const m = scrollDistance.match(/\+=?\s*(\d+(\.\d+)?)%/);
  return m ? parseFloat(m[1]) : 300;
}

export default function CanvasScrubber({
  frames,
  scrollDistance = "+=300%",
  onProgress,
  children,
  overlayGradient = true,
  preloadCount = 80,
}: CanvasScrubberProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(-1);
  const progressRef = useRef(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const extraVh = parseExtraVh(scrollDistance);
  const totalVh = 100 + extraVh;

  // ── Fast Image Loader with cache & async decode ────────────────────────────
  const loadFrame = useCallback(
    async (i: number): Promise<HTMLImageElement> => {
      const src = frames[i];
      if (globalFrameCache.has(src)) {
        return globalFrameCache.get(src)!;
      }
      return new Promise((res, rej) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          globalFrameCache.set(src, img);
          if ("decode" in img) {
            img.decode().then(() => res(img)).catch(() => res(img));
          } else {
            res(img);
          }
        };
        img.onerror = rej;
        img.src = src;
      });
    },
    [frames]
  );

  // ── Canvas draw (cover-fit with high performance) ───────────────────────────
  const drawFrame = useCallback((i: number) => {
    const src = frames[i];
    const img = globalFrameCache.get(src);
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    const ia = img.naturalWidth / img.naturalHeight;
    const ca = canvas.width / canvas.height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (ia > ca) {
      sw = Math.round(sh * ca);
      sx = Math.round((img.naturalWidth - sw) / 2);
    } else {
      sh = Math.round(sw / ca);
      sy = Math.round((img.naturalHeight - sh) / 2);
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, [frames]);

  // ── Preload Strategy ────────────────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;

    // 1. First frame ready immediately
    loadFrame(0).then(() => {
      if (!isMounted) return;
      drawFrame(0);
      setFirstFrameReady(true);
    }).catch(() => {});

    // 2. High priority batch
    const count = Math.min(preloadCount, frames.length);
    for (let i = 1; i < count; i++) {
      loadFrame(i).catch(() => {});
    }

    // 3. Idle background loader for the remainder
    let handle = 0;
    let idx = count;
    const loadNext = () => {
      if (!isMounted || idx >= frames.length) return;
      loadFrame(idx++).catch(() => {});
      handle = window.setTimeout(loadNext, 6);
    };
    handle = window.setTimeout(loadNext, 200);

    return () => {
      isMounted = false;
      window.clearTimeout(handle);
    };
  }, [frames, preloadCount, loadFrame, drawFrame]);

  // ── ScrollTrigger with smooth RAF throttle ──────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.15,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        onProgress?.(self.progress);

        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0;
            const fi = Math.min(
              frames.length - 1,
              Math.floor(progressRef.current * frames.length)
            );
            if (fi !== currentFrameRef.current) {
              currentFrameRef.current = fi;
              drawFrame(fi);
            }
          });
        }
      },
    });

    const onResize = () => {
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [frames, scrollDistance, onProgress, drawFrame]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${totalVh}vh` }}
      className="relative"
    >
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-transparent"
        data-cursor="drag"
      >
        {/* Full-bleed high-fps canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: firstFrameReady ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        />

        {!firstFrameReady && (
          <div className="absolute inset-0 bg-transparent" />
        )}

        {/* Content overlay */}
        <div className="absolute inset-0 z-20">{children}</div>
      </div>
    </div>
  );
}
