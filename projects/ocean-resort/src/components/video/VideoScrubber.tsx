"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoScrubberProps {
  src: string;
  className?: string;
  trigger?: React.RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  reverse?: boolean;
  onProgress?: (progress: number) => void;
}

export default function VideoScrubber({
  src,
  className = "",
  trigger,
  start = "top top",
  end = "+=220%",
  scrub = 0.5,
  reverse = false,
  onProgress,
}: VideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Completely pause video so it ONLY moves via scroll
    video.pause();

    const handleLoaded = () => {
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("play", () => video.pause());

    let targetTime = reverse ? video.duration || 0 : 0;
    let animFrameId: number | null = null;

    // Smooth render loop to update currentTime without stutter
    const renderFrame = () => {
      if (video.duration && isFinite(video.duration)) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.001) {
          video.currentTime += diff * 0.25;
        }
      }
      animFrameId = requestAnimationFrame(renderFrame);
    };

    animFrameId = requestAnimationFrame(renderFrame);

    let st: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      const triggerEl = trigger?.current || video;

      st = ScrollTrigger.create({
        trigger: triggerEl,
        start,
        end,
        scrub: typeof scrub === "number" ? scrub : true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (onProgress) onProgress(progress);

          if (video.duration && isFinite(video.duration)) {
            targetTime = reverse
              ? video.duration * (1 - progress)
              : video.duration * progress;
          }
        },
      });
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      ctx.revert();
      if (st) st.kill();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [src, trigger, start, end, scrub, reverse, onProgress]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover will-change-transform"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
