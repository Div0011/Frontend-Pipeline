'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ChapterInnerPageProps {
  chapterNumber: number;
  title: string;
  subtitle: string;
  description: string;
  images: { src: string; alt: string; caption?: string }[];
  backHref?: string;
}

export default function ChapterInnerPage({
  chapterNumber,
  title,
  subtitle,
  description,
  images,
  backHref = '/',
}: ChapterInnerPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-ink">
      {/* Fixed looping background video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-20"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        >
          <source src="/videos/background-doodles.webm" type="video/webm" />
          <source src="/videos/background-doodles.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-ink/5">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href={backHref} className="font-mono text-xs tracking-widest uppercase text-ink/60 hover:text-ink transition-colors">
              ← Back
            </Link>
            <span className="font-mono text-xs tracking-widest uppercase text-ink/40">
              Chapter {chapterNumber.toString().padStart(2, '0')}
            </span>
          </div>
        </header>

        {/* Hero text */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <p className="font-mono text-xs tracking-widest uppercase text-ink/50 mb-4">
            {subtitle}
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tighter text-ink leading-[0.95] mb-8">
            {title}
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/60 leading-relaxed max-w-2xl">
            {description}
          </p>
        </section>

        {/* Images */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden ${
                  index === 0 && images.length === 1 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] bg-stone">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {image.caption && (
                  <p className="mt-3 font-mono text-[11px] tracking-widest uppercase text-ink/40">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer with back button */}
        <footer className="border-t border-ink/5">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-display text-xl tracking-tight text-ink">FORMA</span>
            <Link href={backHref} className="font-mono text-xs tracking-widest uppercase text-ink/60 hover:text-ink transition-colors">
              ← Back to Experience
            </Link>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink/40">
              Architecture Studio
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
