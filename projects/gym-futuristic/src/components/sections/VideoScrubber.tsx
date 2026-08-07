"use client";

import React, { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface VideoScrubberProps {
  src: string;
  poster?: string;
  bgColor?: string;
  scrollDistance?: string;
  onProgress?: (progress: number) => void;
  children?: React.ReactNode;
  /** Lateral movement direction for the equipment (-1 for left-to-right, 1 for right-to-left) */
  moveDirection?: number;
}

export default function VideoScrubber({
  src,
  poster,
  bgColor = "#686b72",
  scrollDistance = "+=650vh",
  onProgress,
  children,
  moveDirection = 1,
}: VideoScrubberProps) {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  // Pre-decode video frames for instant smooth seeking
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.pause();
    const onReady = () => { v.pause(); v.currentTime = 0.001; };
    v.addEventListener("canplay", onReady, { once: true });
    v.load();
    return () => v.removeEventListener("canplay", onReady);
  }, [src]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const pinWrap = pinWrapRef.current;
    const video = videoRef.current;
    const videoWrap = videoWrapRef.current;
    if (!pinWrap || !video) return;

    let active = true;

    const loop = () => {
      if (!active) return;
      // Ultra-smooth lerp (0.06) for video frame seeking
      currentRef.current += (targetRef.current - currentRef.current) * 0.06;
      const p = Math.min(Math.max(currentRef.current, 0), 0.9999);

      if (video.duration && isFinite(video.duration) && !video.seeking) {
        const want = p * video.duration;
        if (Math.abs(video.currentTime - want) > 0.01) {
          try {
            if ("fastSeek" in video) {
              (video as unknown as { fastSeek(t: number): void }).fastSeek(want);
            } else {
              (video as HTMLVideoElement).currentTime = want;
            }
          } catch { /* ignore */ }
        }
      }

      // Equipment descending & floating motion
      if (videoWrap) {
        const translateY = -70 + p * 140;
        const translateX = (p - 0.5) * 16 * moveDirection;
        const scale = 0.92 + Math.sin(p * Math.PI) * 0.12;
        videoWrap.style.transform = `translate3d(${translateX}vw, ${translateY}px, 0) scale(${scale})`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const st = ScrollTrigger.create({
      trigger: pinWrap,
      start: "top top",
      end: scrollDistance,
      pin: true,
      scrub: 0.08,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetRef.current = self.progress;
        onProgress?.(self.progress);
      },
    });

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      st.kill();
    };
  }, [src, scrollDistance, onProgress, moveDirection]);

  return (
    <div
      ref={pinWrapRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", backgroundColor: bgColor }}
    >
      {/* 3D Equipment Video & Video-Bound Fog Mask (z-20) */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ transition: "none" }}
      >
        <video
          ref={videoRef}
          poster={poster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="w-full h-full object-contain pointer-events-none select-none max-h-[85vh]"
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Dense Fog Mask bound directly to video container */}
        <div
          className="video-bound-fog-mask"
          style={{ "--fog-color": bgColor } as React.CSSProperties}
        />
      </div>

      {/* Crisp Text Elements Layer (z-40) */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
