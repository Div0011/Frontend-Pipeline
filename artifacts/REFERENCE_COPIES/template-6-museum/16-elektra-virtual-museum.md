# Pattern Analysis: Elektra Virtual Museum — Editorial Minimal Scroll Pacing

## Genre: Museum / Cultural Institution — Editorial Exhibition (Genre 6a)

## Core Architecture
- **Stack:** Next.js + GSAP + Lenis + Custom Canvas
- **Approach:** Restrained, editorial-minimal scroll pacing for exhibition content
- Closer to Template 3's restraint than a heavy 3D build — the content is the experience

## Key Mechanical Patterns (Behavioral Observation)

### 1. Editorial Scroll Pacing
- Scroll is slowed deliberately (Lenis duration: 1.8-2.2s) to force a museum-gallery walking pace
- Each "exhibit" occupies 120-150vh of scroll space — the user must scroll through the full space
- No scroll snapping — continuous, deliberate flow between pieces
- Text appears in measured pulses: 60% of scroll through an exhibit before text fades in
- Between exhibits: a 0.5s "breather" zone with only ambient background before next piece loads

### 2. Exhibition Card Stack
- Artworks presented as overlapping cards in a vertical stack
- Cards have perspective depth: `rotateX(2deg)` at top of viewport, flattening to `rotateX(0)` at center
- As user scrolls past, card compresses backward: `scale(0.95)` + `opacity(0.6)` + slight `blur(1px)`
- Active card is at `z-index: 10`, background cards at `z-index: 1-5` with increasing blur

### 3. Minimalist Chrome
- No persistent navigation — only a thin progress bar at top (2px, accent color)
- Exhibit title appears as a marginal note (right-aligned, 0.6rem, letter-spacing 0.2em)
- No arrows, no "scroll for more" indicators — trust the pacing
- Year/metadata appears on hover of the progress bar thumb

### 4. Ambient Background Treatment
- Background: dark neutral (`#1a1a1e`) with subtle noise texture overlayer
- Each exhibit adds a color wash that bleeds into the noise layer (via CSS `mix-blend-mode: overlay`)
- Color washes transition at exhibit boundaries with 2s crossfade
- No video backgrounds — only still imagery with slow parallax (5px over full scroll)

### 5. Typography as Exhibition Label
- Serif display for artwork titles (similar to Playfair Display)
- Ultra-light weight (200-300) for body text — mimics museum wall text
- Body text set at `max-width: 32ch` — never wider, forcing focused reading
- Character spacing: `0.05em` for body, `0.15em` for metadata
- Text never overlaps imagery — always in dedicated caption zones below or beside

## Why It Works
- Deliberate pacing forces museum-like contemplation — you can't rush through
- Card stack with perspective creates physical depth without 3D
- Color washes unify diverse artworks under a coherent atmosphere
- Minimal chrome eliminates distraction — the art is the interface

## Original Implementation Code (GSAP + Lenis Scroll Pacing)

```tsx
// ExhibitionScrollPacer.tsx
"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function ExhibitionScrollPacer() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,          // Deliberately slow — museum walking pace
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.6,    // Further reduce scroll speed
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}
```

```tsx
// ExhibitionCardStack.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Exhibit {
  id: string;
  title: string;
  artist: string;
  year: string;
  image: string;
  description: string;
}

export default function ExhibitionCardStack({ exhibits }: { exhibits: Exhibit[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Each card gets its own scroll-driven lifecycle
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",       // Card enters from bottom
          end: "bottom top",         // Card exits at top
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            // Card enters: 0 → 0.4 → flattens and moves center
            // Card active: 0.4 → 0.6 → fully flat, full opacity
            // Card exits: 0.6 → 1.0 → compresses backward, blurs
            const zIndex = Math.floor(10 - i * 0.5);

            if (progress < 0.4) {
              // Entering: tilted, scaling up
              const entryT = progress / 0.4;
              gsap.set(card, {
                rotateX: gsap.utils.interpolate(2, 0, entryT),
                scale: gsap.utils.interpolate(0.92, 1, entryT),
                opacity: gsap.utils.interpolate(0.4, 1, entryT),
                filter: `blur(${gsap.utils.interpolate(2, 0, entryT)}px)`,
                zIndex,
              });
            } else if (progress < 0.6) {
              // Active zone: fully visible
              gsap.set(card, {
                rotateX: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                zIndex: 10,
              });
            } else {
              // Exiting: compresses backward
              const exitT = (progress - 0.6) / 0.4;
              gsap.set(card, {
                rotateX: gsap.utils.interpolate(0, -2, exitT),
                scale: gsap.utils.interpolate(1, 0.93, exitT),
                opacity: gsap.utils.interpolate(1, 0.5, exitT),
                filter: `blur(${gsap.utils.interpolate(0, 3, exitT)}px)`,
                zIndex: Math.max(1, zIndex - 5),
              });
            }
          },
        });

        // Text fade-in at 60% of exhibit scroll distance
        ScrollTrigger.create({
          trigger: card,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
          onUpdate: (self) => {
            const textProgress = self.progress;
            const textElements = card.querySelectorAll(".exhibit-text");
            textElements.forEach((el) => {
              (el as HTMLElement).style.opacity = String(
                gsap.utils.interpolate(0, 1, Math.min(1, textProgress * 1.5))
              );
              (el as HTMLElement).style.transform = `translateY(${gsap.utils.interpolate(20, 0, Math.min(1, textProgress * 1.5))}px)`;
            });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [exhibits]);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-[#1a1a1e]">
      {/* Ambient color wash that changes per exhibit */}
      <div className="fixed inset-0 pointer-events-none transition-colors duration-2000 mix-blend-overlay" />

      {/* Thin progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/10 z-50">
        <div className="h-full bg-amber-400/60 scale-x-0 origin-left" id="exhibit-progress" />
      </div>

      <div className="relative z-10 py-[15vh] space-y-[50vh]">
        {exhibits.map((exhibit, i) => (
          <div
            key={exhibit.id}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="exhibit-card relative mx-auto w-[85vw] max-w-5xl min-h-[70vh] rounded-sm overflow-hidden"
            style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
          >
            <div className="relative w-full h-full">
              <img
                src={exhibit.image}
                alt={exhibit.title}
                className="w-full h-[70vh] object-cover"
                loading="lazy"
              />
              {/* Scrim overlay — minimum 30% opacity for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Caption zone — below the image, never overlapping faces/product */}
            <div className="exhibit-text opacity-0 mt-6 px-4 max-w-[32ch]">
              <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-amber-400/80 font-mono">
                {exhibit.year}
              </span>
              <h2 className="text-2xl font-serif text-white/90 mt-1">
                {exhibit.title}
              </h2>
              <p className="text-xs font-light text-white/60 mt-1 leading-relaxed">
                {exhibit.artist}
              </p>
              <p className="text-sm font-light text-white/70 mt-3 leading-relaxed">
                {exhibit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Extraction For Template (Museum / Cultural Institution)
- Deliberate slow scroll pacing via Lenis (`duration: 2.0`, `wheelMultiplier: 0.6`)
- Exhibition card stack with perspective depth on scroll
- Scrim overlay min 30% black gradient for text-on-image legibility
- Caption zone below image — never overlays artwork focal points
- Ambient color wash transitions between exhibits via mix-blend-mode
- Thin progress bar as only persistent navigation element

