"use client";

/**
 * CanvasScrubber — Genre 2 scroll-scrubbed frame sequence player.
 *
 * ARCHITECTURE: CSS `position: sticky` inner + GSAP ScrollTrigger watching
 * the outer wrapper progress (0→1). No `pin: true` — eliminates pin-spacer
 * jumps and layout flashes.
 *
 * This is the signature hero interaction for the BURGERMAN Genre 2 food-cinema
 * variant. It is NOT a Genre 1 scroll-camera. The frame sequence is the single
 * confident hero moment; everything below is conventional GSAP-choreographed DOM.
 *
 * Performance:
 *  - Frame 0 loads eagerly, canvas fades in on first-frame-ready.
 *  - Eager batch (default 60) loaded on mount.
 *  - Remaining frames background-loaded at 8ms intervals to avoid blocking.
 *  - DPR-aware canvas sizing + object-cover drawImage math.
 *  - requestAnimationFrame throttle prevents paint storms.
 */

import {
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface CanvasScrubberProps {
  frames: string[];
  /** e.g. "+=300%" → wrapper height = 100vh + 300vh = 400vh */
  scrollDistance?: string;
  onProgress?: (progress: number) => void;
  children?: React.ReactNode;
  overlayGradient?: boolean;
  /** Frames to load eagerly on mount. Use frames.length to preload all. */
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
  preloadCount = 60,
}: CanvasScrubberProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const imagesRef   = useRef<(HTMLImageElement | null)[]>(
    new Array(frames.length).fill(null)
  );
  const rafRef          = useRef<number>(0);
  const currentFrameRef = useRef(-1);
  const progressRef     = useRef(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const extraVh   = parseExtraVh(scrollDistance);  // e.g. 300
  const totalVh   = 100 + extraVh;                 // e.g. 400

  // ── Frame loading ──────────────────────────────────────────────────────────
  const loadFrame = useCallback(
    (i: number): Promise<HTMLImageElement> =>
      new Promise((res, rej) => {
        if (imagesRef.current[i]) { res(imagesRef.current[i]!); return; }
        const img = new Image();
        img.decoding = "async";
        img.onload  = () => { imagesRef.current[i] = img; res(img); };
        img.onerror = rej;
        img.src = frames[i];
      }),
    [frames]
  );

  // ── Canvas draw (cover-fit) ─────────────────────────────────────────────────
  const drawFrame = useCallback((i: number) => {
    const img    = imagesRef.current[i];
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const ia = img.naturalWidth / img.naturalHeight;
    const ca = canvas.width / canvas.height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (ia > ca) { sw = Math.round(sh * ca); sx = Math.round((img.naturalWidth - sw) / 2); }
    else         { sh = Math.round(sw / ca); sy = Math.round((img.naturalHeight - sh) / 2); }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, []);

  // ── Preload ────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Frame 0 immediately → show canvas
    loadFrame(0).then(img => {
      imagesRef.current[0] = img;
      drawFrame(0);
      setFirstFrameReady(true);
    }).catch(() => {});

    // Eager batch
    const count = Math.min(preloadCount, frames.length);
    for (let i = 1; i < count; i++) loadFrame(i).catch(() => {});

    // Background-load rest (small delays to avoid blocking)
    let handle = 0;
    let idx = count;
    const loadNext = () => {
      if (idx >= frames.length) return;
      loadFrame(idx++).catch(() => {});
      handle = window.setTimeout(loadNext, 8);
    };
    handle = window.setTimeout(loadNext, 400);

    return () => {
      window.clearTimeout(handle);
      imagesRef.current = new Array(frames.length).fill(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);

  // ── ScrollTrigger (NO pin — CSS sticky handles positioning) ──────────────
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end:   "bottom bottom",
      scrub: 0.3,
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
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames, scrollDistance]);

  return (
    /*
     * Outer wrapper — sets total scroll height so the browser knows
     * how much to scroll before unsticking the inner element.
     * GSAP watches this wrapper's progress (0→1).
     */
    <div
      ref={wrapperRef}
      style={{ height: `${totalVh}vh` }}
      className="relative"
    >
      {/*
       * Inner sticky — purely CSS. The browser pins this at `top: 0`
       * while the wrapper is in view. Zero JS layout mutation.
       */}
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-transparent"
        data-cursor="drag"
      >
        {/* Full-bleed canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: firstFrameReady ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Dark fallback while frame 0 loads */}
        {!firstFrameReady && (
          <div className="absolute inset-0 bg-transparent" />
        )}

        {/* Text-legibility gradients */}
        {overlayGradient && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-char/75 via-char/10 to-char/15 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-char/20 via-transparent to-transparent pointer-events-none z-10" />
          </>
        )}

        {/* Content overlay */}
        <div className="absolute inset-0 z-20">{children}</div>
      </div>
    </div>
  );
}
