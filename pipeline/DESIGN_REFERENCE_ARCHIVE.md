# Design References Archive

> Curated high-end sites used as craft-caliber inspiration. Each entry captures
> concrete patterns, not pixels. The pipeline and agents should draw from this
> archive to mix ideas into novel, innovative outputs.

---

## Genre 0: Cinematic Without Generated Media

**Core thesis:** Cinematic is a quality of restraint and pacing, not a media type.
Video, 3D, and generated assets are three possible tools — the goal is achievable
with nothing but type, color, whitespace, and well-directed motion on ordinary
photos. Hadaka (hadaka.jp) proves this: stark black/white/red, no hero video,
no 3D, and it reads as more cinematic than most WebGL-heavy sites because every
element earns its place.

### What "cinematic" actually means (stripped of media)

A film feels cinematic because of **pacing**, **restraint**, and **intentional
framing** — not because it has expensive footage.

- **Pacing** — one idea revealed at a time, at a controlled rhythm. A
  single-column, generous-whitespace layout with staged scroll reveals feels more
  cinematic than a dense grid, even with identical content.
- **Restraint** — the discipline to leave things out. A cinematic shot has a
  single focal point. On a site: one hero statement, one accent color, one
  signature moment — not five competing effects.
- **Intentional framing** — every crop, every negative-space choice, every type
  placement looks chosen, not default. This is the dividing line Awwwards judges
  call "art direction with a point of view."

None of these require video, 3D, or AI generation. They require decisions.

### Levers for cinematic feeling without generated media

| Lever | How to execute |
|-------|---------------|
| Typography as visual centerpiece | Oversized type (10–15vw display sizes), tight/negative letter-spacing on headlines, a single characterful display face doing the emotional work an image would carry (Obys' whole approach) |
| Scroll-paced reveal, not video | Stagger existing text/images on scroll (40–80ms offsets, expo-out easing) — the pacing is what feels cinematic |
| Grading on ordinary photos | CSS filters (contrast, saturate, subtle duotone via mix-blend-mode) applied consistently across every image — unified grade on stock/client photos |
| Masking and cropping | clip-path/border-radius on ordinary photos (organic-blob, parallelogram, circle, pill shapes) — an unusual crop reads as directed, a rectangle reads as default |
| Negative space as compositional tool | Oversized margins, a photo occupying 40% of viewport instead of 100%, "arriving late" content — space itself does framing work a camera move would do |
| Cursor and micro-interaction as texture | Custom cursor, magnetic buttons, hover-reveal caption — the signature moment doesn't have to be 3D |
| Sound of motion, without sound | Custom easing curves (never default ease-in-out) on CSS transitions — a well-timed fade feels directed |
| Chapter pacing on plain sections | Cold open → statement → work → close structure gives scroll a narrative shape |

### Hard rule for AI agents

When uncertain how to make something feel more cinematic, the instinct is to add
(a gradient, a floating shape, an extra animation). The actual fix is almost
always to **remove something instead**. Restraint is the default lever when in
doubt, not more motion.

### Reference sites for this genre

- **Hadaka** (hadaka.jp) — Japanese minimalist philosophy, stark black/white/red
  limited palette, intentional negative space, no hero explanation
- **Obys Agency** (obys.agency) — Typography-led editorial motion, kinetic type
  carrying the entire experience, no heavy WebGL
- **1 Place Vendôme** (1-placevendome.com) — Ultra-luxury restraint, jewel-tone
  accents, quote-driven showcases, minimal chrome
- **L'Oréal Groupe Mediaroom** (loreal.com/en/mediaroom) — Institutional gravitas,
  restrained palette with strategic accent, premium typography
- **Canals Amsterdam** (canals-amsterdam.com) — Atmospheric pacing, cinematic
  color grading, editorial asymmetry

### When to use Genre 0

Use when:
- Video/3D assets are unavailable or not yet generated
- Brand DNA calls for restraint, editorial elegance, or Japanese minimalism
- Content is dense/informational but doesn't need a literal journey
- The brief explicitly asks for "minimal," "editorial," "typography-led," or
  "no 3D"
- Budget/timeline doesn't support 3D production

Do NOT use when:
- The brief explicitly requires a scroll-camera journey or 3D product exploration
- The brand has strong video assets that should be the centerpiece
- The client specifically requests WebGL/Three.js

---

## 0. Cinematic 3D Scroll-Storytelling — Pipeline Reference

**File:** `CINEMATIC_3D_SCROLL_REFERENCE.md`

**Source sites:** The Year of Greta, Vertigo 1958 Tribute, Kieran Clarke, Invisible Moscow, Imagina Studio, Canals Amsterdam

**Studio craft ceiling:** Active Theory (activetheory.net), Resn (resn.co.nz), Lusion (lusion.co), Obys Agency (obys.agency), Locomotive (locomotive.ca)

**Specific award-caliber sites:** Hubtown by Unseen Studio (Awwwards SOTD June 2026), Minh Pham portfolio (Awwwards SOTD, 7.77 dev), Jeton (fintech, Awwwards SOTD)

**Core mechanic:** Scroll position drives a virtual camera through 3D space (not DOM fade-ins with a decorative 3D hero). Single scroll-progress value (Lenis) feeds GSAP, R3F camera, DOM overlays, and audio. Scroll backward must smoothly reverse the camera path.

**Chapter structure:** 4-6 chapters, each with a camera waypoint, lighting/color mood, and one narrative beat. Cold open → 2-4 chapters → convergence → close.

**Technical stack:** Lenis (scroll physics), GSAP + ScrollTrigger (scrub), React Three Fiber + @react-three/drei (3D scene), postprocessing (Bloom, ChromaticAberration, Vignette). Spline for single-scene hero objects.

**Fallback:** 2D frame-sequence or video, scrubbed identically, for mobile/low-end GPUs/prefers-reduced-motion.

**Genre classification:** See `CINEMATIC_3D_SCROLL_REFERENCE.md` §0 for Genre 1 (Full Scroll-Camera) vs Genre 2 (Restrained Centerpiece) vs Genre 2b (Kinetic-Type-Led).

---

## 0b. SFUMATO — Cinematic Single-Page Scroll (Current Pipeline Project)

**URL:** https://kinoatwork.vercel.app

**Status:** Active production build. Rebranded from "Kino at Work" to SFUMATO cinema production house.

**Craft patterns:**
- **Intro splash overlay:** Fixed full-screen intro that always plays on load/refresh with fade/scale transition; no persistent skip state
- **Zoom-fog hero entrance:** Hero section starts at `scale: 1.15`, `blur: 30px`, `opacity: 0` and smoothly zooms into view with cinematic fog overlay
- **Scroll-driven background color morphing:** Fixed background layer continuously interpolates between section colors using GSAP timeline with `scrub: 0.6`; colors transition fluidly rather than jumping
- **Horizontal scroll film reel:** Pinned horizontal scroll gallery for film stills with parallax X on images
- **Editorial spreads with mask reveals:** Project cards with organic, parallelogram, circle, and pill mask shapes that animate on scroll
- **3-column parallax strip:** Three Pillars section with scroll-driven Y drift and staggered label/quote reveals
- **Pinned philosophy section:** Dual-stage content — philosophy text zooms out while background morphs, then directors cards reveal
- **Custom cursor with contextual states:** Data-attribute-driven cursor that expands and shows text on interactive elements; mounted only after intro completes
- **Lenis smooth scroll:** Custom duration/easing for cinematic scroll physics
- **Film grain overlay:** Fixed grain texture using SVG noise data URI
- **Magnetic hover effects:** Configurable magnetic pull on interactive elements

**Technical stack:**
- Next.js 16 App Router (static export)
- React 19 + TypeScript 5.9
- Tailwind CSS v4 with custom theme tokens
- GSAP 3.15 + ScrollTrigger for all scroll-driven animations
- Lenis 1.3 for smooth scroll
- Three.js ecosystem installed but not yet used in production pages
- Vercel deployment with locked dependency versions

**Innovation potential:** Study for how to combine multiple scroll-driven techniques (background color morph, horizontal scroll, parallax, pinned sections) into a cohesive single-page narrative without WebGL; reference for "cinematic without 3D" pattern

---

## 1. Canals Amsterdam
**URL:** https://canals-amsterdam.com/

**Craft patterns:**
- **Immersive editorial storytelling:** Full-bleed imagery with cinematic pacing, slow reveals
- **Atmospheric color grading:** Muted, cinematic tones with selective saturation
- **Typography as navigation:** Large display type that guides scroll rhythm
- **Layered depth:** Foreground text over atmospheric backgrounds creates dimensional feel

**Innovation potential:** Combine with Snowhouse's data visualization + 1PV's quote-driven storytelling for a narrative-forward luxury brand site

---

## 2. Snowhouse Studio - Year in Review 2024
**URL:** https://www.snowhouse.studio/year-in-review-2024

**Craft patterns:**
- **Year-in-review as narrative:** Personal, introspective storytelling through stats and anecdotes
- **Playful SVG illustrations:** Custom 3D-like SVG figures with personality
- **Project grid with hover reveals:** Thumbnail-first with layered metadata on interaction
- **Section dividers with personality:** Decorative dividers that break monotony
- **Team grid with image cards:** Humanizing the studio through stacked photo cards
- **Playful micro-copy:** Stats presented with humor and personality ("10+ Thor worrying about money")
- **Generous whitespace with content bursts:** Alternating quiet sections with dense visual moments
- **Editorial typography:** Large display numbers, tight leading for impact

**Innovation potential:** Combine with L'Oréal's restrained elegance + Hadaka's Japanese minimalism for a sophisticated corporate annual report site

---

## 3. Six B Dentaire
**URL:** https://sixb-dentaire.fr/

**Craft patterns:**
- **Warm human-centered design:** Approachable, reassuring visual language for healthcare
- **Service cards with iconography:** Clean blocks combining imagery, icons, and descriptive text
- **Professional photography integration:** Real team photos with consistent treatment
- **Gentle animations:** Subtle fade-in and hover states, nothing aggressive
- **Trust signals prominent:** Address, phone, hours displayed with visual hierarchy
- **French editorial elegance:** Serif headings with generous spacing, refined color palette
- **Accent image treatments:** Consistent hover zoom/reveal on team and service images

**Innovation potential:** Combine with 1PV's luxury restraint + Snowhouse's illustration style for a premium healthcare/wellness brand

---

## 4. L'Oréal Groupe - Mediaroom
**URL:** https://www.loreal.com/en/mediaroom

**Craft patterns:**
- **Mega-menu sophistication:** Deep, well-organized navigation with visual hierarchy
- **Restrained palette with strategic accent:** Black/white/cream with precise brand accent moments
- **Media-first layouts:** Press release cards designed for journalist consumption
- **Premium typography:** Tight tracking, refined weights, hierarchical heading scales
- **Institutional gravitas:** Content density balanced with breathing room
- **Block Certification signals:** Trust indicators integrated naturally
- **Footer as resource:** Comprehensive footer with multi-column organization

**Innovation potential:** Combine with History of Animation's scrollytelling + Canals' cinematic pacing for an immersive corporate/fintech site

---

## 5. Hadaka (株式会社裸)
**URL:** https://hadaka.jp/

**Craft patterns:**
- **Japanese minimalist philosophy:** Extreme reduction, every element earns its place
- **Raw creative authenticity:** Imperfect, hand-crafted feel with deliberate roughness
- **Stark contrast:** Black/white/red limited palette with powerful focal color
- **Artistic portfolio presentation:** Works displayed with gallery-like restraint
- **Intentional negative space:** Content breathes in large empty regions
- **APNG/Thunder motif:** Animated elements that feel hand-made, not polished
- **Logo as art direction:** Multiple logo treatments showing range and philosophy
- **No hero explanation:** Site speaks through work, not wordy intro copy

**Innovation potential:** Combine with Canals' cinematic atmosphere + Snowhouse's playful data for a creative agency portfolio with Japanese restraint

---

## 6. 1 Place Vendôme
**URL:** https://www.1-placevendome.com/en/

**Craft patterns:**
- **Ultra-luxury editorial:** Every pixel signals exclusivity and craft
- **Immersive room showcases paired with curated quotes:** Image galleries interrupted by poetic text
- **Crystal/light metaphors:** Visual language tied to material properties and atmosphere
- **Sophisticated serif typography:** Refined display faces with precise optical sizing
- **Jewel-tone accents:** Amber, emerald, sapphire used as accent color system
- **Collection grid with narrative:** Each item tells a story through image + quote + detail
- **Horizontal scroll gallery:** Alternative navigation that feels premium
- **Minimal chrome interface:** UI disappears to let content command attention

**Innovation potential:** Combine with Snowhouse's year-in-review narrative + History of Animation's chapter structure for a luxury brand heritage site

---

## 7. Four Pillars Studio
**URL:** https://fourpillars.studio/

**Craft patterns:**
- **Transport error — site unavailable at fetch time**
- **Known reference from design community for:**
  - Precision micro-interactions
  - Kinetic typography
  - Geometric design systems
  - Smooth scroll choreography

**Innovation potential:** Re-fetch when live, use as motion/interaction reference

---

## 8. History of Animation
**URL:** https://history-of-animation.webflow.io/

**Craft patterns:**
- **Scrollytelling mastery:** Chapter-based sections that unfold as you scroll
- **Timeline-driven narrative:** Vertical timeline with anchors, images, and expanding details
- **Rich illustration integration:** Custom illustrations matched to content periods
- **Educational yet visually stunning:** Information density without visual fatigue
- **Chapter number systems:** Large outlined numbers or typographic chapter markers
- **Alternating layouts:** Zig-zag visual rhythm (text-left/image-right → flip → repeat)
- **Historical artifact presentation:** Images treated as museum pieces with captions
- **Progressive reveal complexity:** Early chapters simple → later chapters more layered

**Innovation potential:** Combine with L'Oréal's institutional layout + Canals' cinematic gradients for an immersive brand history/timeline page

---

## 9. The Year of Greta
**URL:** https://theyearofgreta.com/

**Craft patterns:**
- **Scroll-bound 3D path timeline:** User scroll flies a camera along a 3D path, encountering stories chronologically
- **Low-poly environmental storytelling:** Visual metaphor changes dynamically (e.g. melting ice caps) to represent text narrations
- **WebGL/Three.js integration:** High performance 3D scenes synced perfectly with 2D HTML typography overlays
- **Cinematic audio-visual pacing:** Muted color tone transitions matched with ambient soundscapes and scroll triggers

**Innovation potential:** Combine with Snowhouse's year-in-review narrative + History of Animation's chapter structure for a powerful, scroll-driven environmental or historical storytelling project

---

## 10. Vertigo 1958 Tribute
**URL:** https://webflow.com/made-in-webflow/website/vertigo1958

**Craft patterns:**
- **Interactive 3D camera tracking:** Spline camera angles tilt and shift based on mouse movements and scroll offsets
- **Spline/Blender scene integration:** High-performance web-compatible 3D models with dark atmospheric lighting
- **Retro-cinema styling:** Stylized spiral motifs, chromatic aberration filters, and high-contrast color grading
- **Immersive cursor effects:** Custom cursor that morphs into a spiral or coordinates when hovering over interactive elements

**Innovation potential:** Combine with Canals' atmospheric pacing + Zajno's motion principles for a highly interactive, cinematic gaming or film promotional site

---

## 11. Imagina Studio
**URL:** https://webflow.com/made-in-webflow/website/imaginastudio-agency-website-l0uy1lj7

**Craft patterns:**
- **Seamless video-morph transitions:** Grid thumbnails expand and morph directly into full-bleed HTML5 video players on scroll
- **Film reel scroll effects:** Dynamic translation and scaling that replicates the motion of a movie reel
- **High-end editorial layouts:** Strong asymmetric grids, heavy visual weight on video frames, and thin typography rules
- **Cinematic cuts:** Fades and section transitions timed to feel like camera cuts in film

**Innovation potential:** Combine with L'Oréal's corporate editorial + 1 Place Vendôme's quote-driven showcases for a high-end creative agency or fashion brand portfolio

---

## 12. Invisible Moscow
**URL:** https://webflow.com/made-in-webflow/website/invisible-moscow-landing

**Craft patterns:**
- **Immersive audio path:** Background audio and sound effects crossfade dynamically based on scroll anchors and section enters
- **Slow-inertia scrolling:** Heavy scroll damping that slows down user pace to force absorption of typography and atmosphere
- **Layered multi-plane parallax:** Multiple background, midground, and foreground image planes sliding at differing scroll speeds
- **Atmospheric typography:** Serifs with generous letter-spacing combined with deep, dark background tones

**Innovation potential:** Combine with SixB's warm human-centered approach + Canals' editorial storytelling for a localized tourism, museum walk, or historical audio guide site

---

## 13. Kieran Clarke
**URL:** https://webflow.com/made-in-webflow/website/kierans-dandy-site

**Craft patterns:**
- **Bespoke 3D machinery visualization:** High-fidelity 3D mechanical models (tracking cars, custom stunt rigs) rotate and disassemble on scroll
- **Horizontal-to-vertical scroll layouts:** Layout flips direction to present technical schematics alongside stunt reels
- **Brutalist editorial structure:** Large, industrial tech-grotesque display headers paired with clean technical labels
- **Custom cursor tracking:** Magnetic crosshair cursor that details coordinate data when hovering over interactive elements

**Innovation potential:** Combine with Ford M-Sport's engineering precision + Theo's wishlist mechanics for a luxury automotive, heavy machinery, or engineering product showcase site

---

## 14. Active Theory
**URL:** https://activetheory.net/

**Craft patterns:**
- **Game-grade WebGL on the web:** Real-time 3D, networked multiplayer touches, nothing decorative
- **Technical ceiling reference:** If you want to see what's technically possible, start here
- **Performance-first 3D:** Heavy optimization so complex scenes remain interactive
- **Immersive interaction design:** Every interaction feels physical and responsive

**Innovation potential:** Reference for the craft ceiling of what's possible; use for technical inspiration on complex WebGL scenes, not direct pattern replication

---

## 15. Resn
**URL:** https://resn.co.nz/

**Craft patterns:**
- **11 Awwwards Site of the Month wins, 2 Site of the Year:** Consistent award-winning output
- **Interactive 3D + playful concept work:** Strong on whimsical 3D interactions rather than pure moodiness
- **Playful yet polished:** Balances technical complexity with approachable aesthetics
- **Concept-driven 3D:** 3D serves a narrative concept, not just visual flair

**Innovation potential:** Combine with Lusion's cinematic camera work for playful-but-premium brand experiences; study for how to make 3D feel approachable

---

## 16. Lusion
**URL:** https://lusion.co/

**Craft patterns:**
- **Real-time 3D visual storytelling:** Closest working reference to "camera moves through a real-time 3D scene tied to scroll"
- **Cinematic camera choreography:** Smooth, deliberate camera movements synced to user interaction
- **Performance-optimized WebGL:** Complex scenes that maintain interactivity
- **Narrative through motion:** 3D scenes that tell stories through movement and timing

**Innovation potential:** Primary reference for Genre 1 (Full Scroll-Camera) implementation; study for scroll-camera mechanics and real-time 3D performance

---

## 17. Obys Agency
**URL:** https://obys.agency/

**Craft patterns:**
- **Typography-led editorial motion:** Kinetic type carrying the entire experience, no heavy WebGL
- **Restraint as a feature:** Proves that typography and motion alone can create cinematic impact
- **Editorial grid systems:** Strong typographic hierarchy as structural element
- **Attention through pacing:** Long-form content with deliberate scroll-timing

**Innovation potential:** Primary reference for Genre 2b (Kinetic-Type-Led); study for when NOT to use 3D — typography carrying the whole experience

---

## 18. Locomotive
**URL:** https://locomotive.ca/

**Craft patterns:**
- **Montreal studio, repeat Awwwards Agency of the Year:** Consistent high-caliber output
- **Brand-forward restraint:** More restrained than Active Theory or Resn, closer to commercial client needs
- **Elegant motion systems:** Smooth, purposeful animations that serve the brand
- **Commercial-grade polish:** Professional execution suitable for serious client briefs

**Innovation potential:** Primary reference for Genre 2 (Restrained Centerpiece) in commercial contexts; study for client-appropriate cinematic treatment

---

## 19. Hubtown (by Unseen Studio)
**URL:** https://www.hubtown.com/ (or direct reference: Unseen Studio's case study)

**Craft patterns:**
- **Single 3D monolith hero:** Glowing 3D centerpiece with mouse-reveal interaction — entire 3D budget of the site
- **B2B sector, cinematic treatment:** Proof that "boring" industries can carry full cinematic treatment with one confident 3D moment
- **Mouse-reveal interaction:** Cursor uncovers geometry/lighting detail as signature moment
- **Conventional layout around centerpiece:** Everything else is well-executed standard layout

**Innovation potential:** Primary Genre 2 reference for B2B/corporate; study for "one confident 3D object" pattern rather than explorable world

---

## 20. Minh Pham's Portfolio
**URL:** https://minhpham.net/ (or direct Awwwards reference)

**Craft patterns:**
- **GSAP motion system layered over Three.js/WebGL:** Scored 7.77 dev on Awwwards
- **Restraint as defining characteristic:** 3D never overwhelms the content it frames
- **Motion serving content:** Every 3D element has a clear purpose tied to the work being shown
- **Performance-conscious 3D:** Complex effects that don't compromise usability

**Innovation potential:** Study for restraint — the 3D never overwhelms; proof that "taste over maximalism" wins at Awwwards level

---

## 21. Jeton
**URL:** https://www.jeton.com/ (fintech, Awwwards Site of the Day)

**Craft patterns:**
- **Serious fintech with scroll-based movement:** Proves cinematic treatment works outside "creative agency" territory
- **Scroll-scrubbed narrative:** Content-driven scroll experience with premium feel
- **Regulated industry, premium UX:** Financial product that feels luxurious without gimmicks
- **Mobile-first performance:** Cinematic experience that works on real devices

**Innovation potential:** Primary Genre 2 reference for fintech/serious products; study for "premium without playful" in regulated industries

---

# Cross-Site Innovation Recipes

These are suggested combinations of patterns from multiple references for novel outputs:

**Recipe A: Cinematic Luxury Brand**
- Base: 1 Place Vendôme's restrained luxury + L'Oréal's institutional gravitas
- Add: Canals Amsterdam's atmospheric depth + History of Animation's scrollytelling
- Result: Immersive brand heritage experience with chapter-based scroll narrative

**Recipe B: Playful Corporate Annual**
- Base: Snowhouse's year-in-review personality + SixB's human warmth
- Add: History of Animation's timeline structure + Hadaka's intentional simplicity
- Result: Annual report that feels like a story, not a PDF dump

**Recipe C: Creative Studio Portfolio**
- Base: Hadaka's Japanese minimalism + Canals' cinematic pacing
- Add: Snowhouse's playful SVG illustrations + Four Pillars' micro-interactions
- Result: Sparse, confident portfolio where every scroll moment feels crafted

**Recipe D: Editorial Product Showcase**
- Base: Snowhouse's project grid + 1 Place Vendôme's quote-driven showcases
- Add: L'Oréal's sophisticated navigation + Canals' immersive hero
- Result: Product/campaign page that reads like a curated editorial spread

**Recipe E: Japanese Art-Gallery Brand Experience**
- Base: Gyre Omotesando's exhibition storytelling + Hadaka's minimalist restraint
- Add: 1 Place Vendôme's quote-driven showcases + Canals' cinematic atmosphere
- Result: Luxury cultural brand site with curator-level depth and intentional negative space

**Recipe F: Multi-Brand Retail Destination**
- Base: Must Société's mega-menu sophistication + Snowhouse's project grid reveals
- Add: Moon On My Wall's trust badges + Theo's playful cursor effects
- Result: High-end furniture/lifestyle e-commerce that feels editorial, not transactional

**Recipe G: Fandom/Music Immersive Experience**
- Base: Un Verano Sin Ti's album journey + Gyre Omotesando's exhibition structure
- Add: History of Animation's chapter progression + Zajno's motion demos
- Result: Music/entertainment brand site that unfolds like a gallery exhibition with interactive moments

**Recipe H: Serious Educational Platform**
- Base: What Is Hoarding's clinical tone + History of Animation's scrollytelling
- Add: Motion Zajno's interactive demos + SixB's human-centered trust signals
- Result: Healthcare/mental health awareness site that educates without feeling cold

**Recipe I: Motorsport Performance Brand**
- Base: Ford M-Sport's split-screen hero + Theo's minimalist UI
- Add: Snowhouse's technical storytelling + Zajno's motion principle demos
- Result: Automotive/performance brand site that balances engineering precision with visual flair

**Recipe J: E-commerce Product as Art**
- Base: Moon On My Wall's product showcase + 1 Place Vendôme's luxury restraint
- Add: Zajno's interactive demos + Theo's playful micro-interactions
- Result: Premium product page where specifications become storytelling and reviews become visual art

**Recipe K: High-Stakes 3D Product Interactive**
- Base: Kieran Clarke's mechanical 3D models + Vertigo 1958's Spline camera tracking
- Add: Canals Amsterdam's atmospheric pacing + History of Animation's scrollytelling
- Result: Narrative product experience where scrolling flies the camera through detailed 3D assemblies with atmospheric shaders

**Recipe L: Cinematic Video Storytelling Showcase**
- Base: Imagina Studio's video-morph transitions + Invisible Moscow's immersive audio path
- Add: L'Oréal's institutional editorial + Snowhouse's year-in-review narrative
- Result: Multimedia brand portfolio that transitions seamlessly via fullscreen video cuts synced with scroll trigger pacing

---

# Pattern Taxonomy

| Pattern | Sites | Usage |
|---------|-------|-------|
| Scrollytelling chapters | History of Animation, Canals | Long-form narrative, brand stories |
| Year-in-review narrative | Snowhouse | Annual reports, retrospectives, milestone pages |
| Quote-driven showcases | 1 Place Vendôme, Snowhouse | Testimonials, philosophy pages, vision |
| Human-centered service cards | SixB | Healthcare, consulting, professional services |
| Luxury restrained palette | L'Oréal, 1 Place Vendôme | Premium brands, institutional sites |
| Playful SVG illustration | Snowhouse, Hadaka | Creative agencies, playful brands |
| Japanese minimalism | Hadaka | High-end creative, fashion, art portfolios |
| Cinematic atmospheric hero | Canals | Entertainment, luxury, immersive experiences |
| Mega-menu sophistication | L'Oréal | Large corporate, multi-division brands |
| Project grid with reveals | Snowhouse, Four Pillars | Agency portfolios, product showcases |
| Timeline-driven narrative | History of Animation | Heritage, history, product evolution |
| Exhibition storytelling | Gyre Omotesando | Art galleries, cultural sites, immersive brand storytelling |
| Japanese art-gallery minimalism | Gyre Omotesando | Luxury retail, cultural institutions, portfolio sites |
| Curator dialogue presentation | Gyre Omotesando | Editorial depth, thought leadership, interview formats |
| Complex mega-menu navigation | Must Société | Multi-brand retail, category-heavy e-commerce |
| Seasonal collection storytelling | Must Société | Fashion, furniture, lifestyle brands with seasonal drops |
| Immersive music/album experience | Un Verano Sin Ti | Music brands, entertainment, fandom sites |
| Nostalgic color palette | Un Verano Sin Ti | Summer brands, travel, lifestyle, music |
| Social proof carousel | Moon On My Wall | E-commerce, product pages, review-heavy sites |
| Countdown scarcity | Moon On My Wall | Drops, limited editions, flash sales |
| Trust badge grid | Moon On My Wall | Consumer products, Amazon-style product pages |
| Serious educational tone | What Is Hoarding | Healthcare, mental health, awareness campaigns |
| Clinical image grids | What Is Hoarding | Medical, nonprofit, educational content |
| Split-screen automotive hero | Ford M-Sport | Performance brands, automotive, extreme sports |
| Driver/team reveal cards | Ford M-Sport | Teams, athletes, leadership pages |
| Technical spec sections | Ford M-Sport | Engineering, manufacturing, product detail |
| Playful cursor effects | Theo | Brand personality, creative agencies, youth brands |
| Wishlist/growth mechanics | Theo | E-commerce, gift guides, seasonal shopping |
| Brand family navigation | Theo | Multi-product brands, eyewear, fashion |
| Motion principle education | Motion Zajno | Design agencies, educational platforms, UX sites |
| Before/after animation demos | Motion Zajno | Case studies, portfolio process reveals |
| Chapter-based learning | Motion Zajno | Courses, documentation, long-form educational |
| Scroll-bound 3D paths | The Year of Greta | Chronological timelines, physical narrative progression |
| Spline camera tracking | Vertigo 1958 | Interactive 3D portfolios, gamified landing pages |
| Video-morph transitions | Imagina Studio | Creative agency portfolios, dynamic video grids |
| Immersive audio path | Invisible Moscow | Moody landing pages, theatrical walks, storytelling |
| Bespoke 3D machinery | Kieran Clarke | Technical portfolios, automotive specs, hardware drops |
| Slow-inertia scrolling | Invisible Moscow | Immersive reading, storytelling, portfolio pages |
| Horizontal-to-vertical scrolls | Kieran Clarke | Technical spec pages, alternating content views |
| Game-grade WebGL | Active Theory | Enterprise/flagship technical showcase, WebGL ceiling reference |
| Playful 3D concept work | Resn | Award-winning playful 3D interactions, concept-driven scenes |
| Real-time 3D scroll-camera | Lusion | Cinematic camera through real-time 3D tied to scroll |
| Typography-led motion (no 3D) | Obys Agency | Editorial/agency sites where type carries the drama |
| Brand-forward restraint | Locomotive | Commercial client work, agency-grade but not experimental |
| Single 3D monolith + mouse-reveal | Hubtown | B2B/corporate sectors needing one confident 3D moment |
| Restrained GSAP + WebGL layering | Minh Pham | Personal/agency portfolios, taste over maximalism |
| Serious-product scroll UX | Jeton | Fintech/regulated industries needing premium feel without gimmicks |

