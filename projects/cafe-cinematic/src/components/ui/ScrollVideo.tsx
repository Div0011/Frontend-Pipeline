'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollVideo({
  src,
  end = '+=150%',
  className = '',
}: {
  src: string;
  end?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setReady(true);
    video.addEventListener('canplaythrough', handleCanPlay);
    video.load();

    return () => video.removeEventListener('canplaythrough', handleCanPlay);
  }, [src]);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || !ready) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: end,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          if (video.duration && isFinite(video.duration)) {
            video.currentTime = progress * video.duration;
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [ready, src, end]);

  return (
    <section
      ref={containerRef}
      className={`relative h-screen w-full bg-cafe-dark overflow-hidden ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
}
