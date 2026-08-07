'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroReveal from '@/components/marketing/HeroReveal';
import VideoScrubber from '@/components/marketing/VideoScrubber';
import ContentSection from '@/components/marketing/ContentSection';
import MinimalFooter from '@/components/marketing/MinimalFooter';
import ChapterButton from '@/components/marketing/ChapterButton';
import { getLenis } from '@/lib/motion/lenis';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_1 = '/videos/01-white-interior.mp4';
const VIDEO_2 = '/videos/02-staircase.mp4';
const VIDEO_3 = '/videos/03-basement-light.mp4';

export default function Home() {
  const router = useRouter();
  const [showFooter, setShowFooter] = useState(false);

  const handleVideo3Progress = useCallback((progress: number) => {
    if (progress > 0.88) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem('forma-scroll-position');
    if (!stored) return;

    const targetScroll = Number(stored);
    sessionStorage.removeItem('forma-scroll-position');

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetScroll, { immediate: false, duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, [router]);

  return (
    <main className="relative">
      <HeroReveal />

      <VideoScrubber
        src={VIDEO_1}
        scrollDistance="+=300%"
        className="bg-white"
        preload="auto"
        priority
      >
        <div className="absolute inset-0 flex items-end p-8 md:p-16">
          <div className="max-w-xl space-y-4">
            <ChapterButton chapter={1} title="LIGHT AND VOID" href="/chapter-1" />
          </div>
        </div>
      </VideoScrubber>

      <ContentSection
        index={1}
        title="Spatial Poetry"
        description="Every void is as intentional as every volume. We sculpt emptiness to give presence to the essential."
        href="/chapter-1"
      />

      <VideoScrubber
        src={VIDEO_2}
        scrollDistance="+=300%"
        className="bg-white"
        preload="auto"
      >
        <div className="absolute inset-0 flex items-end p-8 md:p-16">
          <div className="max-w-xl space-y-4">
            <ChapterButton chapter={2} title="VERTICAL LIVING" href="/chapter-2" />
          </div>
        </div>
      </VideoScrubber>

      <ContentSection
        index={2}
        title="Material Truth"
        description="Concrete, glass, timber — materials age with grace, accumulating stories rather than losing value."
        href="/chapter-2"
      />

      <VideoScrubber
        src={VIDEO_3}
        scrollDistance="+=300%"
        onProgress={handleVideo3Progress}
        className="bg-white"
        preload="auto"
      >
        <div className="absolute inset-0 flex items-end p-8 md:p-16">
          <div className="max-w-xl space-y-4">
            <ChapterButton chapter={3} title="INTO THE BASEMENT" href="/contact" />
          </div>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 z-30 pointer-events-none"
          style={{ opacity: showFooter ? 1 : 0 }}
        >
          <div className="pointer-events-auto">
            <MinimalFooter />
          </div>
        </div>
      </VideoScrubber>
    </main>
  );
}
