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
  scrub?: number;
  playbackRate?: number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export default function VideoScrubber({
  src,
  className = "",
  trigger,
  start = "top bottom",
  end = "bottom top",
  scrub = 0.5,
  playbackRate = 1,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}: VideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = playbackRate;

    const onLoaded = () => {
      if (autoPlay) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("loadeddata", onLoaded, { once: true });

    let st: ReturnType<typeof ScrollTrigger.create> | null = null;

    const ctx = gsap.context(() => {
      if (trigger?.current) {
        st = ScrollTrigger.create({
          trigger: trigger.current,
          start,
          end,
          scrub,
          onUpdate: (self) => {
            if (video.duration && isFinite(video.duration)) {
              video.currentTime = video.duration * self.progress;
            }
          },
        });
      }
    });

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
      ctx.revert();
      if (st) st.kill();
    };
  }, [src, autoPlay, scrub, start, end, playbackRate, trigger]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover will-change-transform"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
