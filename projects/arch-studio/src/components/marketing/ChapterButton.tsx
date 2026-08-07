'use client';

import Link from 'next/link';
import { getLenis } from '@/lib/motion/lenis';

interface ChapterButtonProps {
  chapter: number;
  title: string;
  href: string;
}

export default function ChapterButton({ chapter, title, href }: ChapterButtonProps) {
  const handleClick = () => {
    if (typeof window === 'undefined') return;
    const lenis = getLenis();
    const scrollY = lenis ? lenis.scroll : window.scrollY;
    sessionStorage.setItem('forma-scroll-position', String(scrollY));
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="group relative inline-flex items-center gap-3 transition-all duration-500"
      style={{ textShadow: '0 0 0 rgba(0,0,0,0)' }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.textShadow = '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.textShadow = '0 0 0 rgba(0,0,0,0)';
      }}
    >
      <span className="font-mono text-xs tracking-widest uppercase text-white/80 group-hover:text-white transition-colors duration-300">
        Chapter {chapter.toString().padStart(2, '0')}
      </span>
      <span className="font-display text-lg text-white group-hover:text-white transition-colors duration-300">
        {title}
      </span>
      <svg
        className="w-4 h-4 text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}