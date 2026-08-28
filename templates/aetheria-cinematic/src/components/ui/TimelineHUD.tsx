"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { id: "hero", label: "Cold Open", icon: "◐" },
  { id: "exhibition", label: "Exhibition", icon: "◈" },
  { id: "collection", label: "Collection", icon: "◇" },
  { id: "visit", label: "Visit", icon: "○" },
];

export default function TimelineHUD() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      chapters.forEach((chapter) => {
        const el = document.getElementById(chapter.id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveChapter(chapter.id),
          onEnterBack: () => setActiveChapter(chapter.id),
        });
      });

      // Global scroll progress
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setProgress(self.progress),
      });
    });

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] pointer-events-none">
      {/* Progress Bar */}
      <div className="h-[2px] bg-stone/20 w-full">
        <div
          className="h-full bg-amber transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Chapter Indicators */}
      <div className="flex justify-between items-center px-[8vw] py-3">
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={`flex items-center gap-2 pointer-events-auto transition-all duration-500 ${
              activeChapter === chapter.id ? "opacity-100" : "opacity-40"
            }`}
            data-cursor-text
          >
            <span
              className={`text-xs transition-colors duration-500 ${
                activeChapter === chapter.id ? "text-amber" : "text-bone-dim"
              }`}
            >
              {chapter.icon}
            </span>
            <span
              className={`font-sans text-[10px] uppercase tracking-[0.25em] transition-colors duration-500 hidden sm:block ${
                activeChapter === chapter.id ? "text-amber" : "text-bone-dim"
              }`}
            >
              {chapter.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
