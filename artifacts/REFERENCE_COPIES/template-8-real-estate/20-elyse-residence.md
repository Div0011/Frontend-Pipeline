# Pattern Analysis: Elyse Residence — Restrained Luxury Real Estate

## Genre: Luxury Real Estate — Restrained Refinement (Genre 8b)

## Core Architecture
- **Stack:** Next.js + GSAP + Lenis + High-res photography
- **Approach:** "Refinement meets wellbeing" — quieter, editorial treatment closer to Genre 2's restraint than Ever's full immersive 3D
- Prioritizes spacious photography and precise typography over 3D spectacle

## Key Mechanical Patterns (Behavioral Observation)

### 1. Full-Bleed Editorial Photography
- Every viewport is a full-bleed, high-resolution photograph
- Images are deliberately underexposed (0.3-0.5 stops) to create a "premium editorial" feel
- Each photo has a consistent warm-grade overlay: `rgba(180, 140, 100, 0.08)` — barely perceptible, but unifying
- Images use `loading="eager"` for critical first 3, `loading="lazy"` thereafter
- Aspect ratios vary: hero is 16:9, interior shots are 4:3, detail shots are square (1:1)

### 2. Whisper-Thin Typography
- Font: Extra-light weight sans-serif (weight 200-300, similar to Helvetica Now Thin or Neue Haas Unica Light)
- Size: Hero headline at 4rem, body text at 0.75rem — extreme contrast
- Letter-spacing: 0.1em for headlines, 0.05em for body
- Color: `rgba(255, 255, 255, 0.75)` for headlines, `rgba(255, 255, 255, 0.45)` for body
- Never uses pure white — always slightly transparent, creating a "distant luxury" feel
- Text alignment: centered for hero, left-aligned for body sections, right-aligned for pull quotes

### 3. The "Breather" Section Pattern
- Between content sections, a full viewport of just image + single word (e.g., "Light", "Space", "Quiet")
- No body text, no CTAs, no navigation — only the image and one word in extra-light weight
- Word fades in at 40% scroll through the breather, fades out at 60%
- Creates a moment of stillness before the next content block
- Breather sections are 100vh exactly — no scrolling within them

### 4. Scroll-Driven Opacity Stacking
- Content sections are stacked vertically with opacity-driven transitions
- As a section enters the viewport, it fades from `opacity: 0` to `opacity: 1` over 40% of viewport height
- As it exits, it fades from `opacity: 1` to `opacity: 0.3` (never fully disappears, creating a ghosting trail)
- The trailing "ghost" of the previous section remains visible at `opacity: 0.3` until the next section is fully revealed
- This creates a smooth, unbroken visual flow — no hard section boundaries

### 5. Refined Micro-Interactions
- Hover on amenity icons: icon color shifts from `rgba(255,255,255,0.4)` to `rgba(255,255,255,0.8)` over 0.4s
- Navigation dots: 6px active, 3px inactive, pulse animation on active (scale 1 → 1.1 → 1 over 2s)
- "View Gallery" button: border grows from 1px to 1.5px on hover (0.3s), never fills with color
- No cursor changes — custom cursor with circle (24px, 1px border) that subtly shrinks (20px) over interactive elements

## Why It Works
- Restraint signals confidence — doesn't need flashy 3D to sell a $10M+ property
- "Breather" sections give the user space to absorb without information overload
- Ghosting opacity stacking creates continuous visual flow without hard cuts
- Whisper-thin typography + underexposed photography = tactile, physical feel

## Original Implementation Code (GSAP Opacity Stacking + Breather Sections)

```tsx
// BreatherSection.tsx
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BreatherSection({ imageUrl, word }: { imageUrl: string; word: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wordEl = wordRef.current;
    if (!section || !wordEl) return;

    const ctx = gsap.context(() => {
      // Word fades in from 40% to 60% of the section scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (p >= 0.4 && p <= 0.6) {
            // Word visible zone
            const wordProgress = (p - 0.4) / 0.2;
            gsap.set(wordEl, {
              opacity: gsap.utils.interpolate(0, 1, wordProgress),
              y: gsap.utils.interpolate(20, 0, wordProgress),
            });
          } else if (p < 0.4) {
            gsap.set(wordEl, { opacity: 0, y: 20 });
          } else {
            gsap.set(wordEl, {
              opacity: gsap.utils.interpolate(1, 0, (p - 0.6) / 0.4),
              y: gsap.utils.interpolate(0, -10, (p - 0.6) / 0.4),
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Scrim: warm overlay for consistent editorial feel */}
      <div className="absolute inset-0 bg-[rgba(180,140,100,0.08)]" />
      {/* Gradient scrim for text legibility — 40% black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      <h2
        ref={wordRef}
        className="relative z-10 text-[5rem] font-[200] tracking-[0.15em] text-white/75 opacity-0"
        style={{ fontFamily: "'Helvetica Now Display', 'Neue Haas Unica', sans-serif" }}
      >
        {word}
      </h2>
    </section>
  );
}
```

```tsx
// ContentSection.tsx — Opacity stacking between sections
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContentSectionProps {
  imageUrl: string;
  headline: string;
  body: string;
  index: number;
}

export function ContentSection({ imageUrl, headline, body, index }: ContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Opacity stacking: section fades in at entry, fades to 0.3 ghost at exit
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          // Entry: 0 → 0.4: opacity 0 → 1
          // Active: 0.4 → 0.6: opacity 1
          // Exit: 0.6 → 1.0: opacity 1 → 0.3 (ghost)
          let opacity: number;
          if (p < 0.4) {
            opacity = gsap.utils.interpolate(0, 1, p / 0.4);
          } else if (p < 0.6) {
            opacity = 1;
          } else {
            opacity = gsap.utils.interpolate(1, 0.3, (p - 0.6) / 0.4);
          }
          gsap.set(section, { opacity });
        },
      });

      // Text elements: staggered entry
      const textElements = content.querySelectorAll("[data-reveal]");
      textElements.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const delay = i * 0.15; // 150ms stagger between elements
            const elementProgress = Math.max(0, Math.min(1, (p - delay) * 2));
            gsap.set(el, {
              opacity: gsap.utils.interpolate(0, 1, elementProgress),
              y: gsap.utils.interpolate(30, 0, elementProgress),
            });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden opacity-0"
      style={{ zIndex: 10 - index }}
    >
      {/* Background image with editorial underexposure overlay */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
          loading={index < 3 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-[rgba(180,140,100,0.08)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* Content — left-aligned, whisper-thin typography */}
      <div
        ref={contentRef}
        className="absolute bottom-[15%] left-[8%] max-w-lg z-10"
      >
        <p
          data-reveal
          className="text-[0.55rem] tracking-[0.25em] uppercase text-white/40 font-mono mb-3"
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <h2
          data-reveal
          className="text-4xl font-[200] tracking-[0.1em] text-white/75 leading-tight mb-4"
          style={{ fontFamily: "'Helvetica Now Display', 'Neue Haas Unica', sans-serif" }}
        >
          {headline}
        </h2>
        <p
          data-reveal
          className="text-[0.75rem] font-[200] text-white/45 leading-relaxed max-w-md"
        >
          {body}
        </p>
      </div>
    </section>
  );
}
```

## Extraction For Template (Luxury Real Estate — Restrained)
- Full-bleed editorial photography with consistent warm overlay (`rgba(180,140,100,0.08)`)
- Opacity stacking between sections: entry fade (0→1), active (1), exit ghost (1→0.3)
- "Breather" sections: full viewport of just image + single word, word fades in 40-60% scroll
- Whisper-thin typography: weight 200-300, never pure white (always `rgba(255,255,255,0.45-0.75)`)
- Image `loading="eager"` for first 3, `lazy` thereafter
- Deliberate underexposure on photography (0.3-0.5 stops below normal)
- Hover state refinement: border-width growth instead of color fill, cursor circle shrink
