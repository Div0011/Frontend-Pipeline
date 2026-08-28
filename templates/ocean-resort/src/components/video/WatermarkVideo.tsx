"use client";

import { useEffect, useRef } from "react";

interface WatermarkVideoProps {
  src: string;
  opacity?: number;
  className?: string;
  zIndex?: number;
}

export default function WatermarkVideo({
  src,
  opacity = 0.1,
  className = "",
  zIndex = 0,
}: WatermarkVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", onLoaded, { once: true });

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
    };
  }, [src]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover opacity-80"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        style={{ opacity }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0a3d62]/85" />
    </div>
  );
}
