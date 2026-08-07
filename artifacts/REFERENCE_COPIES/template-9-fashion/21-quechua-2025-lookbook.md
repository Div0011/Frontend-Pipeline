# Pattern Analysis: Quechua 2025 Lookbook (Decathlon) — Fashion Lookbook

## Genre: Fashion / Apparel E-commerce — Editorial Lookbook Reveal (Genre 9)

## Core Architecture
- **Stack:** Next.js + GSAP + Lenis + Custom image loader
- **Approach:** Lookbook/collection reveal without becoming a generic product grid
- Site of the Day (Awwwards) — demonstrates how editorial fashion translates to web

## Key Mechanical Patterns (Behavioral Observation)

### 1. Editorial Spread Layout
- Each "spread" mimics a magazine layout: full-bleed hero image + smaller supporting images + caption block
- Layouts alternate between:
  - Type A: Full-bleed image left (70vw), 3 smaller images stacked right (30vw)
  - Type B: Hero image center (60vw), two detail shots flanking (20vw each)
  - Type C: Full-bleed single image with typography overlay (editorial cover style)
  - Type D: Triptych — 3 equal-width images (33vw each) with staggered scroll reveals
- No two consecutive spreads use the same layout — constant visual rhythm
- Layouts are pre-defined as a sequence, not generated dynamically

### 2. Scroll-Triggered Image Reveal
- Images enter with a clip-path reveal: `polygon(0 100%, 100% 100%, 100% 100%, 0 100%)` → `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
- Reveal duration: 1.2s per image, with 0.15s stagger between images in a spread
- Reveal direction alternates per spread (left-to-right, right-to-left, center-out)
- Images have a subtle scale entrance (1.05 → 1.0) simultaneous with clip-path reveal
- After reveal, images have a persistent slow zoom (1.0 → 1.02 over 10s) for cinematic feel

### 3. Product Detail Hover
- Hovering an image shows:
  - Thin (0.5px) border outline in accent color `#d4af37`
  - Product name + price at bottom-left, fading in over 0.3s
  - A subtle overlay gradient at bottom (20% black) to ensure text legibility
- On mobile: tap shows the overlay permanently, tap again dismisses
- No add-to-cart on hover — this is editorial, not transactional
- Link to product page is on the product name text only (not the whole image)

### 4. Collection Navigation
- Bottom-fixed nav strip showing collection thumbnails in a horizontal scroll
- Active thumbnail has a 1px gold border, others at 0.3 opacity
- Clicking a thumbnail jumps to that collection spread (Lenis scrollTo)
- Thumbnils are 60x80px, with lazy loading for non-visible ones
- Nav strip is 100% width with `overflow-x: auto` and `scrollbar-width: none`

### 5. Material & Texture Emphasis
- Images are deliberately high-contrast to emphasize fabric texture
- A subtle grain overlay (CSS `background-image` with noise SVG) is applied to all images
- On scroll, a parallax offset of 5% is applied to the grain layer, creating depth
- Product close-ups (30% of images) show fabric weave, stitching, and material drape
- Captions include fabric composition and care instructions as "footnotes"

### 6. Typography for Fashion
- Display: Geometric sans-serif with high contrast (e.g., Didot or Bodoni for headlines)
- Body: Clean sans-serif with generous tracking (0.08em)
- Prices: Monospace, right-aligned in captions
- Collection names: All caps, 0.3em letter-spacing, 0.5rem size
- Footnote details: 0.4rem, lighter weight, low opacity (0.3)

## Why It Works
- Magazine-style layout variety prevents the "endless grid" fatigue
- Clip-path reveals feel editorial, not templated
- Texture emphasis sells fabric quality without needing "feel" - the visual does it
- Collection nav stays accessible without breaking the editorial flow
- Deliberate lack of add-to-cart on images preserves the editorial experience

## Original Implementation Code (Clip-Path Reveal + Magazine Spread)

```tsx
// EditorialSpread.tsx
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SpreadLayout = "A" | "B" | "C" | "D";

interface SpreadImage {
  url: string;
  alt: string;
  productName?: string;
  price?: string;
}

interface SpreadProps {
  layout: SpreadLayout;
  heroImage: SpreadImage;
  supportingImages?: SpreadImage[];
  caption?: string;
  collectionName: string;
  index: number;
  revealDirection?: "ltr" | "rtl" | "center";
}

function getLayoutClasses(layout: SpreadLayout): string {
  switch (layout) {
    case "A":
      return "grid grid-cols-[7fr_3fr] gap-4 h-full";
    case "B":
      return "grid grid-cols-[2fr_6fr_2fr] gap-4 h-full";
    case "C":
      return "grid grid-cols-1 h-full";
    case "D":
      return "grid grid-cols-3 gap-3 h-full";
  }
}

export default function EditorialSpread({
  layout,
  heroImage,
  supportingImages = [],
  caption,
  collectionName,
  index,
  revealDirection = "ltr",
}: SpreadProps) {
  const spreadRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const spread = spreadRef.current;
    if (!spread) return;

    const ctx = gsap.context(() => {
      // Reveal each image with staggered clip-path animation
      imageRefs.current.forEach((imageContainer, i) => {
        if (!imageContainer) return;

        // Set initial state
        gsap.set(imageContainer, {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          scale: 1.05,
        });

        // Determine reveal origin based on direction
        let clipStart: string;
        let clipEnd = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

        switch (revealDirection) {
          case "ltr":
            clipStart = "polygon(0 0, 0 0, 0 100%, 0 100%)";
            clipEnd = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
            break;
          case "rtl":
            clipStart = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
            clipEnd = "polygon(0 0, 0 0, 0 100%, 0 100%)";
            break;
          default:
            clipStart = "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)";
            clipEnd = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
        }

        ScrollTrigger.create({
          trigger: spread,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            const delay = i * 0.15; // 150ms stagger between images
            const imageProgress = Math.max(0, Math.min(1, (p - delay) * 2));

            // Clip-path reveal
            if (revealDirection === "ltr" || revealDirection === "rtl") {
              const revealPct = imageProgress * 100;
              if (revealDirection === "ltr") {
                gsap.set(imageContainer, {
                  clipPath: `polygon(0 0, ${revealPct}% 0, ${revealPct}% 100%, 0 100%)`,
                });
              } else {
                gsap.set(imageContainer, {
                  clipPath: `polygon(${100 - revealPct}% 0, 100% 0, 100% 100%, ${100 - revealPct}% 100%)`,
                });
              }
            } else {
              const revealCenter = 50 + (imageProgress - 0.5) * 100;
              gsap.set(imageContainer, {
                clipPath: `polygon(${50 - imageProgress * 50}% 0, ${50 + imageProgress * 50}% 0, ${50 + imageProgress * 50}% 100%, ${50 - imageProgress * 50}% 100%)`,
              });
            }

            // Scale entrance (1.05 → 1.0)
            gsap.set(imageContainer, {
              scale: gsap.utils.interpolate(1.05, 1, imageProgress),
            });
          },
        });

        // Persistent slow zoom after reveal (1.0 → 1.02 over 10s)
        let startTime = performance.now();
        const slowZoom = () => {
          const elapsed = (performance.now() - startTime) / 1000;
          const zoom = Math.min(1.02, 1 + elapsed * 0.002);
          gsap.set(imageContainer, { scale: zoom });
          if (zoom < 1.02) requestAnimationFrame(slowZoom);
        };
        requestAnimationFrame(slowZoom);
      });
    }, spread);

    return () => ctx.revert();
  }, [revealDirection]);

  return (
    <section
      ref={spreadRef}
      className="relative min-h-screen w-full py-12 px-6"
    >
      {/* Collection label */}
      <div className="mb-8">
        <span className="text-[0.5rem] tracking-[0.3em] uppercase text-white/30 font-mono">
          {collectionName}
        </span>
        <span className="text-[0.4rem] text-white/20 ml-4">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Spread grid */}
      <div className={getLayoutClasses(layout)}>
        {/* Hero image always first */}
        <div
          ref={(el) => { imageRefs.current[0] = el; }}
          className="relative overflow-hidden group cursor-pointer"
        >
          <img
            src={heroImage.url}
            alt={heroImage.alt}
            className="w-full h-full object-cover"
            loading={index < 2 ? "eager" : "lazy"}
          />
          {/* Noise grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Hover overlay — product details */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            {heroImage.productName && (
              <div className="absolute bottom-4 left-4">
                <p className="text-[0.65rem] text-white/90 tracking-wider font-light">
                  {heroImage.productName}
                </p>
                {heroImage.price && (
                  <p className="text-[0.55rem] text-white/60 font-mono mt-1">
                    {heroImage.price}
                  </p>
                )}
              </div>
            )}
          </div>

        {/* Supporting images */}
        {supportingImages.map((img, i) => (
          <div
            key={i}
            ref={(el) => { imageRefs.current[i + 1] = el; }}
            className="relative overflow-hidden group cursor-pointer"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              {img.productName && (
                <div className="absolute bottom-3 left-3">
                  <p className="text-[0.55rem] text-white/90 tracking-wider font-light">
                    {img.productName}
                  </p>
                  {img.price && (
                    <p className="text-[0.45rem] text-white/60 font-mono mt-0.5">
                      {img.price}
                    </p>
                  )}
                </div>
              )}
            </div>
        ))}
      </div>

      {/* Caption / footnote */}
      {caption && (
        <div className="mt-6 max-w-[32ch]">
          <p className="text-[0.4rem] text-white/30 leading-relaxed font-light tracking-wider">
            {caption}
          </p>
        </div>
      )}
    </section>
  );
}
```

```tsx
// CollectionNav.tsx — Bottom-fixed thumbnail strip
"use client";
import { useRef } from "react";
import Lenis from "lenis";

interface CollectionNavProps {
  collections: { id: string; thumbnail: string; name: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function CollectionNav({ collections, activeIndex, onSelect }: CollectionNavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  const scrollToSpread = (index: number) => {
    const lenis = new Lenis();
    const target = document.querySelector(`[data-spread-index="${index}"]`);
    if (target) {
      lenis.scrollTo(target, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
    onSelect(index);
  };

  return (
    <div
      ref={navRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-3 px-6 py-3 bg-black/40 backdrop-blur-sm rounded-full overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {collections.map((col, i) => (
        <button
          key={col.id}
          onClick={() => scrollToSpread(i)}
          className="flex-shrink-0 transition-all duration-300"
          style={{
            width: 60,
            height: 80,
            border: activeIndex === i ? "1px solid #d4af37" : "1px solid transparent",
            opacity: activeIndex === i ? 1 : 0.3,
          }}
        >
          <img
            src={col.thumbnail}
            alt={col.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}
```

## Extraction For Template (Fashion / Apparel E-commerce)
- Magazine spread layout system (4 alternating types A/B/C/D) — no two consecutive layouts same
- Clip-path image reveal: direction alternates per spread (ltr/rtl/center), 1.2s duration, 0.15s stagger
- Persistent slow zoom after reveal (1.0 → 1.02 over 10s)
- Noise grain overlay on all images for tactile/editorial feel
- Hover overlay: product name + price at bottom-left, gradient scrim for legibility
- Collection navigation: bottom-fixed thumbnail strip with Lenis scrollTo
- Editorial-first approach: no add-to-cart on images, product links on text only
- Fabric/weave close-ups at 30% of images to emphasize material quality
