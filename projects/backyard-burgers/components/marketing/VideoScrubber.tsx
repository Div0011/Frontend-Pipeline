"use client";

import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Video scrubber: scroll-driven currentTime control of a <video> element.
// This approach completely avoids the frame-sequence complexity and
// the removeChild DOM conflict caused by GSAP pin-spacer wrappers.

interface VideoScrubberProps {
  src: string;
  poster?: string; // fallback image shown while video buffers
  className?: string;
  scrollDistance?: string; // e.g. "+=300%"
  onProgress?: (progress: number) => void;
  children?: React.ReactNode;
  overlayGradient?: boolean;
}

export default function VideoScrubber({
  src,
  poster,
  className = "",
  scrollDistance = "+=300%",
  onProgress,
  children,
  overlayGradient = true,
}: VideoScrubberProps) {
  // pinWrapRef: the div GSAP pins — never a React-owned section element
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  // Keep video paused and seekable
  const seekVideo = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration) || video.duration === 0) return;
    video.currentTime = Math.min(progress, 0.9999) * video.duration;
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const pinWrap = pinWrapRef.current;
    const video = videoRef.current;
    if (!pinWrap || !video) return;

    // Ensure video never auto-plays or makes sound
    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const onCanPlay = () => setIsReady(true);
    video.addEventListener("canplay", onCanPlay);

    // Create a standalone ScrollTrigger on the WRAPPER div (not a React section).
    // scrub drives our video.currentTime in an RAF loop.
    const target = { progress: 0 };
    const st = ScrollTrigger.create({
      trigger: pinWrap,
      start: "top top",
      end: scrollDistance,
      pin: true,       // GSAP pins the wrapper div — React never owns this
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        target.progress = self.progress;
        onProgress?.(self.progress);

        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0;
            seekVideo(target.progress);
            progressRef.current = target.progress;
          });
        }
      },
    });

    return () => {
      st.kill();
      video.removeEventListener("canplay", onCanPlay);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, scrollDistance]);

  return (
    // This div is what GSAP wraps in pin-spacer — it is a plain div, not a React-controlled semantic element
    <div ref={pinWrapRef} className={`relative w-full overflow-hidden ${className}`} style={{ height: "100svh" }}>
      {/* Scroll-driven video element */}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Poster / fallback image shown while video buffers */}
      {!isReady && (
        <div
          className="absolute inset-0 bg-cream-dark"
          style={poster ? {
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4) saturate(0.6)",
          } : {}}
        />
      )}

      {/* Standard dark gradient for text legibility */}
      {overlayGradient && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-cream/10 to-ink/20 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/30 via-transparent to-transparent pointer-events-none z-10" />
        </>
      )}

      {/* Children: text overlays, sidebars — they live inside the wrapper div, not a separate React section */}
      <div className="absolute inset-0 z-20">
        {children}
      </div>
    </div>
  );
}
