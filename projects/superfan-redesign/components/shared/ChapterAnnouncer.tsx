'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Chapter {
  id: string;
  label: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'showcase', label: 'Product Showcase' },
  { id: 'technology', label: 'Technology Exploded View' },
  { id: 'calculator', label: 'Energy Savings Calculator' },
  { id: 'testimonials', label: 'Testimonials and Awards' },
  { id: 'collection', label: 'Product Collection' },
  { id: 'faq', label: 'FAQ and Support' },
];

const ANNOUNCE_GAP_MS = 1500;

export const ChapterAnnouncer: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<string>('');
  const rafRef = useRef<number>(0);
  const lastAnnounced = useRef<string>('');
  const lastAnnounceTime = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const now = Date.now();
        if (now - lastAnnounceTime.current < ANNOUNCE_GAP_MS) return;

        const viewportMid = window.innerHeight * 0.4;
        let closest: Chapter | null = null;
        let closestDist = Infinity;

        for (const ch of CHAPTERS) {
          const el = document.getElementById(ch.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - viewportMid);
          if (dist < closestDist && rect.top < window.innerHeight * 0.8) {
            closestDist = dist;
            closest = ch;
          }
        }

        if (closest && closest.id !== lastAnnounced.current) {
          lastAnnounced.current = closest.id;
          lastAnnounceTime.current = now;
          setCurrentChapter(closest.label);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!currentChapter) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      Now viewing: {currentChapter}
    </div>
  );
};
