"use client";

import {
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundEngine } from "@/lib/audio";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Film-counter loading screen                                        */
/* ------------------------------------------------------------------ */

function FilmLoader({ total }: { total: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * total));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-cinema-bg">
      {/* Frame counter */}
      <p
        className="loading-counter"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
          letterSpacing: "0.12em",
          color: "rgba(244,241,236,0.08)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(count).padStart(6, "0")}
      </p>

      {/* Progress bar */}
      <div
        className="mt-8 mx-auto"
        style={{
          width: "160px",
          height: "1px",
          background: "rgba(244,241,236,0.06)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${(count / total) * 100}%`,
            background: "#d4a84b",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      <p
        className="mt-5"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.26em",
          color: "rgba(244,241,236,0.25)",
          textTransform: "uppercase",
        }}
      >
        Loading Film Engine
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Chapter {
  id: string;
  startFrame: number;
  endFrame: number;
  transition?: "fade" | "cut" | "dissolve" | "wipe" | "fog";
  bgTransition?: { from: string; to: string };
}

interface FrameScrubberProps {
  frames: string[];
  chapters: Chapter[];
  onProgress?: (progress: number, chapterId: string | null) => void;
  onChapterChange?: (chapterId: string) => void;
  children?: React.ReactNode;
  fog?: boolean;
  contrastWipe?: boolean;
  preloadCount?: number;
}

/* ------------------------------------------------------------------ */
/*  Chapter config                                                    */
/* ------------------------------------------------------------------ */

const DEFAULT_CHAPTERS: Chapter[] = [
  { id: "intro", startFrame: 0, endFrame: 250, transition: "fog" },
  { id: "work", startFrame: 251, endFrame: 550, transition: "fade" },
  { id: "philosophy", startFrame: 551, endFrame: 750, transition: "wipe" },
  { id: "reel", startFrame: 751, endFrame: 950, transition: "fade" },
  { id: "contact", startFrame: 951, endFrame: 1100, transition: "dissolve" },
  { id: "outro", startFrame: 1101, endFrame: 1210, transition: "cut" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function chapterForFrame(
  frame: number,
  chapters: Chapter[]
): { chapter: Chapter; localProgress: number } | null {
  for (const ch of chapters) {
    if (frame >= ch.startFrame && frame <= ch.endFrame) {
      const range = ch.endFrame - ch.startFrame;
      const local = range > 0 ? (frame - ch.startFrame) / range : 0;
      return { chapter: ch, localProgress: local };
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function FrameScrubber({
  frames,
  chapters = DEFAULT_CHAPTERS,
  onProgress,
  onChapterChange,
  children,
  fog = true,
  contrastWipe = true,
  preloadCount = 100,
}: FrameScrubberProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fogCanvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(frames.length).fill(null)
  );
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(-1);
  const progressRef = useRef(0);
  const currentChapterRef = useRef<string | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [contrastOpacity, setContrastOpacity] = useState(0);
  const [chapter, setChapter] = useState<string | null>(null);

  const totalFrames = frames.length;
  const extraVh = chapters.length > 0 ? chapters.length * 100 : 600;
  const totalVh = 100 + extraVh;

  /* ----------------------------- frame loading -------------------- */

  const loadFrame = useCallback(
    (i: number): Promise<HTMLImageElement> =>
      new Promise((res, rej) => {
        if (imagesRef.current[i]) {
          res(imagesRef.current[i]!);
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          imagesRef.current[i] = img;
          res(img);
        };
        img.onerror = rej;
        img.src = frames[i];
      }),
    [frames]
  );

  const findNearestLoadedFrame = useCallback((targetIndex: number) => {
    if (imagesRef.current[targetIndex]) return imagesRef.current[targetIndex];
    let dist = 1;
    while (targetIndex - dist >= 0 || targetIndex + dist < totalFrames) {
      if (targetIndex - dist >= 0 && imagesRef.current[targetIndex - dist]) {
        return imagesRef.current[targetIndex - dist];
      }
      if (targetIndex + dist < totalFrames && imagesRef.current[targetIndex + dist]) {
        return imagesRef.current[targetIndex + dist];
      }
      dist++;
      if (dist > totalFrames) break;
    }
    return imagesRef.current[0];
  }, [totalFrames]);

  const drawFrame = useCallback((i: number) => {
    const img = findNearestLoadedFrame(i);
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const ia = img.naturalWidth / img.naturalHeight;
    const ca = canvas.width / canvas.height;
    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;
    if (ia > ca) {
      sw = Math.round(sh * ca);
      sx = Math.round((img.naturalWidth - sw) / 2);
    } else {
      sh = Math.round(sw / ca);
      sy = Math.round((img.naturalHeight - sh) / 2);
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, [findNearestLoadedFrame]);

  const loadFrameWindow = useCallback((centerIndex: number, windowSize = 5) => {
    const start = Math.max(0, centerIndex - windowSize);
    const end = Math.min(totalFrames - 1, centerIndex + windowSize);
    for (let i = start; i <= end; i++) {
      if (!imagesRef.current[i]) {
        loadFrame(i).then(() => {
          if (currentFrameRef.current === i) {
            drawFrame(i);
          }
        }).catch(() => {});
      }
    }
  }, [totalFrames, loadFrame, drawFrame]);

  /* ----------------------------- fog ------------------------------ */

  const drawFog = useCallback((progress: number, chapterId: string | null) => {
    const canvas = fogCanvasRef.current;
    if (!canvas || !fog) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let fogDensity = 0;
    let fogColor = "rgba(10, 10, 10, 0.35)";

    if (chapterId === "intro") {
      fogDensity = Math.max(0, 1 - progress * 3);
      fogColor = `rgba(10, 10, 10, ${0.6 * fogDensity})`;
    } else if (chapterId === "contact") {
      fogDensity = Math.min(1, Math.max(0, (progress - 0.5) * 2));
      fogColor = `rgba(10, 10, 10, ${0.5 * fogDensity})`;
    } else if (chapterId === "outro") {
      fogDensity = Math.min(1, progress * 1.5);
      fogColor = `rgba(0, 0, 0, ${0.85 * fogDensity})`;
    }

    if (fogDensity > 0.01) {
      ctx.fillStyle = fogColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const t = Date.now() * 0.001;
      for (let i = 0; i < 5; i++) {
        const x = (Math.sin(t + i * 1.3) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(t * 0.7 + i * 0.9) * 0.5 + 0.5) * canvas.height;
        const r = canvas.width * (0.15 + fogDensity * 0.25);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `rgba(245, 245, 245, ${0.04 * fogDensity})`);
        grad.addColorStop(1, "rgba(245, 245, 245, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [fog]);

  /* ----------------------------- contrast wipe ------------------- */

  const updateContrastWipe = useCallback(
    (progress: number, chapterId: string | null) => {
      if (!contrastWipe) return;

      const ch = chapterForFrame(
        Math.floor(progress * (totalFrames - 1)),
        chapters
      );
      if (!ch) {
        setContrastOpacity(0);
        return;
      }

      let op = 0;
      const local = ch.localProgress;

      if (ch.chapter.transition === "wipe") {
        if (local < 0.15) {
          op = Math.min(1, local / 0.15);
        } else if (local > 0.85) {
          op = Math.min(1, (local - 0.85) / 0.15);
        } else {
          op = 0;
        }
      } else if (ch.chapter.transition === "cut") {
        op = local < 0.05 ? 1 - local / 0.05 : 0;
      } else if (ch.chapter.transition === "dissolve") {
        op = local < 0.2 ? 1 - local / 0.2 : local > 0.8 ? (local - 0.8) / 0.2 : 0;
      }

      setContrastOpacity(Math.max(0, Math.min(1, op)));
    },
    [contrastWipe, chapters, totalFrames]
  );

  /* ----------------------------- frame preload ------------------- */

  useEffect(() => {
    loadFrame(0)
      .then((img) => {
        imagesRef.current[0] = img;
        drawFrame(0);
        setFirstFrameReady(true);
      })
      .catch(() => {});

    const count = Math.min(preloadCount, frames.length);
    for (let i = 1; i < count; i++) loadFrame(i).catch(() => {});

    let handle = 0;
    let idx = count;
    const loadNext = () => {
      if (idx >= frames.length) return;
      loadFrame(idx++).catch(() => {});
      handle = window.setTimeout(loadNext, 6);
    };
    handle = window.setTimeout(loadNext, 300);

    return () => {
      window.clearTimeout(handle);
      imagesRef.current = new Array(frames.length).fill(null);
    };
  }, [frames, loadFrame, drawFrame, preloadCount]);

  /* ----------------------------- scroll driver ------------------- */

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.75,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const ch = chapterForFrame(
          Math.min(frames.length - 1, Math.floor(self.progress * frames.length)),
          chapters
        );
        const chId = ch?.chapter.id || null;
        onProgress?.(self.progress, chId);

        // Sound trigger
        soundEngine.triggerScrollClick(self.getVelocity() / 1000);

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
              loadFrameWindow(fi);

              const ch = chapterForFrame(fi, chapters);
              const chId = ch?.chapter.id || null;
              if (chId !== currentChapterRef.current) {
                currentChapterRef.current = chId;
                setChapter(chId);
                onChapterChange?.(chId || "");
              }
              drawFog(progressRef.current, chId);
              updateContrastWipe(progressRef.current, chId);
            }
          });
        }
      },
    });

    const onResize = () => {
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current = { x, y };
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0) scale(1.04)`;
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [frames, chapters, drawFrame, loadFrameWindow, drawFog, updateContrastWipe, onProgress, onChapterChange]);

  /* ----------------------------- animation loop for fog ---------- */

  useEffect(() => {
    if (!fog) return;
    let handle = 0;
    const tick = () => {
      const fi = currentFrameRef.current;
      if (fi >= 0) {
        const ch = chapterForFrame(fi, chapters);
        drawFog(progressRef.current, ch?.chapter.id || null);
      }
      handle = requestAnimationFrame(tick);
    };
    handle = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(handle);
  }, [fog, chapters, drawFog]);

  /* ----------------------------- render -------------------------- */

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${totalVh}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cinema-bg">
        {/* ── Cinematic loading screen ── */}
        {!firstFrameReady && <FilmLoader total={totalFrames} />}

        {/* ── Letterbox bars — 2.39:1 framing ── */}
        <div className="letterbox-top" />
        <div className="letterbox-bottom" />

        {/* ── Frame Canvas ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out will-change-transform"
        />

        {/* ── Fog Canvas ── */}
        {fog && (
          <canvas
            ref={fogCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />
        )}

        {/* ── Anamorphic vignette ── */}
        <div className="vignette-anamorphic" />

        {/* ── Contrast Wipe ── */}
        {contrastWipe && (
          <div
            className="absolute inset-0 bg-cinema-bg pointer-events-none z-[25] transition-opacity duration-300"
            style={{ opacity: contrastOpacity }}
          />
        )}

        {/* ── Frame counter HUD ── */}
        {firstFrameReady && (
          <div
            className="absolute bottom-8 right-8 pointer-events-none z-[36]"
            style={{ opacity: 0.28 }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.45rem",
                letterSpacing: "0.18em",
                color: "rgba(244,241,236,0.6)",
                textTransform: "uppercase",
              }}
            >
              FRAME{" "}
              <span style={{ color: "#d4a84b" }}>
                {String(
                  Math.min(
                    totalFrames - 1,
                    Math.max(0, currentFrameRef.current)
                  )
                ).padStart(4, "0")}
              </span>
              {" "}/ {String(totalFrames - 1).padStart(4, "0")}
            </p>
          </div>
        )}

        {/* ── Chapter Overlay Content ── */}
        {children}
      </div>
    </div>
  );
}
