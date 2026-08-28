'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface VideoScrubberProps {
  src: string;
  className?: string;
  scrollDistance?: string;
  onProgress?: (progress: number) => void;
  children?: React.ReactNode;
  preload?: 'auto' | 'metadata' | 'none';
  priority?: boolean;
}

export default function VideoScrubber({
  src,
  className = '',
  scrollDistance = '+=300%',
  onProgress,
  children,
  preload = 'auto',
  priority = false,
}: VideoScrubberProps) {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [, setIsReady] = useState(false);

  const webmSrc = src.replace(/\.mp4$/, '.webm');

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const pinWrap = pinWrapRef.current;
    const video = videoRef.current;
    if (!pinWrap || !video) return;

    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.preload = preload;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    if (priority) {
      video.setAttribute('importance', 'high');
    }

    const onLoadedMetadata = () => {
      setIsReady(true);
    };

    if (video.readyState >= 1) {
      setIsReady(true);
    } else {
      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('canplay', onLoadedMetadata);
    }

    // 60FPS Hardware-accelerated RAF render loop for instant seeking
    let isLoopRunning = true;
    const renderLoop = () => {
      if (!isLoopRunning) return;

      // Smooth lerp to prevent trackpad scroll jitter
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.3;

      if (video && isFinite(video.duration) && video.duration > 0) {
        const targetTime = Math.min(Math.max(currentProgressRef.current, 0), 0.9999) * video.duration;
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.01) {
          if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
            (video as unknown as { fastSeek: (t: number) => void }).fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        }
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);

    const st = ScrollTrigger.create({
      trigger: pinWrap,
      start: 'top top',
      end: scrollDistance,
      pin: true,
      scrub: 0.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
        onProgress?.(self.progress);
      },
    });

    return () => {
      isLoopRunning = false;
      st.kill();
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplay', onLoadedMetadata);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [src, scrollDistance, onProgress, preload, priority]);

  return (
    <div
      ref={pinWrapRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: '100svh' }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload={preload}
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover will-change-transform opacity-100"
        style={{
          transition: 'opacity 0.3s ease',
        }}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#000]/40 via-transparent to-[#000]/10 pointer-events-none z-10" />

      <div className="absolute inset-0 z-20">
        {children}
      </div>
    </div>
  );
}
