# Cinematic 3D Scroll-Storytelling — Pipeline Reference

This file trains the pipeline to produce output at the level of the studios that
actually define this category — Active Theory, Resn, Lusion, Obys, Locomotive — and
specific Awwwards-caliber sites (Hubtown, Minh Pham's portfolio, Jeton). It's scoped
to **three** output families now:

1. **Genre 1: Full Scroll-Camera** — high-end, motion-directed sites where scroll
   choreography drives a virtual camera through 3D space.
2. **Genre 2: Restrained Centerpiece** — one confident 3D object or motion system,
   everything else is GSAP-choreographed DOM.
3. **Genre 0: Cinematic Without Generated Media** — cinematic quality achieved
   purely through typography, pacing, grading, and restraint. No video, no 3D,
   no generated assets. Hadaka and Obys are the reference ceiling.

The Planner must classify which genre a brief needs before Creative Director/Motion/Engineering
start work — see §0.

---

## 0. Genre Classification (Planner decision, made first)

| Signal in the brief | Genre |
|---|---|
| Video/3D assets unavailable; brand calls for restraint, editorial elegance, Japanese minimalism, or typography-led drama; brief says "no 3D", "minimal", "editorial" | **Genre 0: Cinematic Without Generated Media** |
| Brand has a literal journey/timeline/chronology; product benefits from being "explored"; luxury, automotive, heritage, environmental storytelling | **Genre 1: Full Scroll-Camera** |
| Brand needs gravitas but content is otherwise conventional (B2B, fintech, corporate, developer tool); one hero moment needs to carry the whole impression | **Genre 2: Restrained Centerpiece** |
| Content is dense/informational and typography itself can carry drama (editorial, agency, portfolio) | **Genre 2b: Kinetic-Type-Led** (a Genre 2 variant — see §4) |

Default to Genre 0 when video/3D are unavailable and the brief doesn't explicitly
require them. Genre 1 is higher-risk, higher-payload, and only pays off when the
content genuinely has a journey to tell — the Hubtown case study (a real-estate
developer's site, objectively "boring" B2B content) is proof that Genre 2/0 can
still feel fully cinematic without the cost and failure surface of a full explorable
3D world. Reserve Genre 1 for briefs where Recipe K/L-style content (chronological,
product-as-journey) actually exists.

---

## 1. Genre 1: Full Scroll-Camera — The Canonical Mechanic

Reference sites: **The Year of Greta**, **Vertigo 1958 Tribute**, **Kieran Clarke**,
**Invisible Moscow**, **Imagina Studio**, **Canals Amsterdam** (grading), and at the
studio-craft ceiling: **Active Theory** (activetheory.net), **Resn** (resn.co.nz),
**Lusion** (lusion.co) — Lusion in particular is the closest working reference for
"camera moves through a real-time 3D scene tied to scroll."

Every site in this genre shares one underlying pattern that non-3D sites don't:
**scroll position drives a virtual camera through 3D space**, and everything else
(typography overlays, audio, lighting) is synced to *where the camera is*, not to
"has this div entered the viewport."

This is the single most important instruction to hardcode into the Engineering
agent's prompt for this genre. If the agent implements this as a series of
`IntersectionObserver` fade-ins with a 3D model floating in the hero, you get a
generic site with a 3D decoration, not a cinematic 3D site. The tell is whether
scrolling *backward* smoothly reverses the camera path — if it doesn't, it's not
actually scroll-scrubbed.

**Reference implementation shape (React Three Fiber + GSAP):**

```jsx
// CameraRig.jsx — scroll position drives camera along a defined path
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

// Define camera waypoints as (position, lookAt) pairs — one per "chapter"
const WAYPOINTS = [
  { pos: [0, 2, 10], look: [0, 0, 0] },   // chapter 1
  { pos: [4, 1, 4],  look: [0, 1, 0] },   // chapter 2
  { pos: [-2, 3, 2], look: [1, 0, -1] },  // chapter 3
]

export function CameraRig() {
  const scroll = useScroll() // 0 -> 1 across the scrollable track

  useFrame(({ camera }) => {
    const t = scroll.offset * (WAYPOINTS.length - 1)
    const i = Math.min(Math.floor(t), WAYPOINTS.length - 2)
    const localT = t - i
    const a = WAYPOINTS[i]
    const b = WAYPOINTS[i + 1]

    camera.position.lerpVectors(
      new THREE.Vector3(...a.pos),
      new THREE.Vector3(...b.pos),
      localT
    )
    const lookTarget = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...a.look),
      new THREE.Vector3(...b.look),
      localT
    )
    camera.lookAt(lookTarget)
  })

  return null
}
```

The Motion agent's spec should output `WAYPOINTS`-shaped data (position + lookAt per
chapter) rather than abstract animation descriptions — that's the concrete artifact
Engineering needs.

**Fallback requirement (non-negotiable):** mobile + low-end GPUs +
`prefers-reduced-motion` must degrade to a 2D version — swap the R3F canvas for a
sequence of static frames or a lightweight Lottie/video, scrubbed the same way via
scroll. Never just disable the experience on mobile — the studio-ranking consensus is
explicit that mobile is where these sites live or die, and jurors (and real users)
test on real devices, not just desktop demos.

---

## 2. Genre 2: Restrained Single-Centerpiece 3D

Reference sites: **Hubtown** (by Unseen Studio — Awwwards SOTD, June 2026),
**Minh Pham's personal portfolio** (Awwwards SOTD, developer score 7.77), **Jeton**
(fintech, Awwwards SOTD), and studio-level: **Obys Agency** (obys.agency, typography-led
rather than heavy-3D) and **Locomotive** (locomotive.ca, agency-grade brand restraint).

The mechanic here is fundamentally different from Genre 1, and mistaking one for the
other is the most common way this genre goes wrong: **one confident 3D object or motion
system, not an explorable world.** Hubtown is a glowing 3D monolith with a mouse-reveal
interaction — that's the entire 3D budget of the site. Everything else is conventional,
well-executed layout. The lesson from Minh Pham's portfolio specifically: the 3D never
overwhelms the content it's framing. This is the dividing line Awwwards judges cite
between a 6.5 and a 9 — **art direction with a point of view, plus restraint**, not
maximalism.

**When to reach for Genre 2 instead of Genre 1:**
- The brief is B2B, fintech, dev-tool, or otherwise "serious" content that still needs
  to feel premium (Jeton proves a fintech product flow can carry this treatment
  without sacrificing usability).
- Budget/timeline doesn't support a full explorable 3D world.
- The content doesn't have a literal journey — it's conventional informational
  content that needs one moment of gravitas, not six chapters of camera movement.

**Implementation shape:** a single Three.js or Spline scene, positioned as a hero or
recurring anchor element (not a full-page canvas), with:
- A mouse/scroll-reveal interaction as the signature moment (cursor uncovers
  geometry/lighting detail — the Hubtown pattern) rather than a scroll-driven camera
  path.
- Conventional GSAP-driven DOM choreography for the rest of the page — entrance
  timing, stagger, easing (see the concrete numbers in §5) — carrying most of the
  page, with the 3D centerpiece as punctuation, not the whole meal.
- This is meaningfully cheaper to build and far more mobile-forgiving than Genre 1,
  since only one asset needs a capability check + fallback, not a whole scene graph.

---

## 3. Quality Bar (the Awwwards judging lens — apply to both genres)

Both genres are judged, informally, against the same three criteria that separate
the merely competent from the actually cinematic. Bake these into the QA agent's
rubric as explicit scored dimensions, not just vibes:

1. **Art direction with a point of view.** Every type choice, color, and layout grid
   serves one idea. Test: strip out all animation — do the static frames still look
   deliberate, or do they look like an unstyled scaffold with motion bolted on? If a
   site only looks finished while things are moving, the art direction failed, not
   just the motion.
2. **Directed motion, not animation for its own sake.** Every transition should carry
   meaning — a scroll sequence paces a story, a micro-interaction rewards attention.
   QA check: for each animated element, can you state *why* it moves the way it does
   (not just that it moves)? If the answer is "because it's on the list of things
   that should animate," it's undirected.
3. **Performance, on real devices.** A 3D hero that drops to 18fps on a mid-range
   Android, or a page that takes six seconds to paint, fails regardless of how good
   the concept is. This is where "nice-looking" sites most often fail the bar that
   separates them from award-caliber ones. See §6 for the concrete budget.

---

## 4. Genre 2b: Kinetic-Type-Led (no 3D at all)

Worth calling out separately since Obys is the reference and it's easy for the
Creative Director to default to "add 3D" when the brief actually wants restraint in
the opposite direction — typography carrying 100% of the drama, zero WebGL. Use when
content is dense/editorial (agency work, long-form portfolios) and a 3D centerpiece
would compete with, not support, the reading experience. Mechanics: character-level
text splitting, scroll-scrubbed line reveals, large-scale display type as the
structural grid itself. No 3D scene, no fallback complexity — the entire performance
budget goes into making type motion buttery at 60fps.

---

## 5. Scroll Engine Stack & Concrete Numbers

| Layer | Library | Role |
|---|---|---|
| Scroll physics | **Lenis** | Smooth/damped scroll, single source of scroll truth |
| Scroll → animation binding | **GSAP + ScrollTrigger** (`scrub: true`) | Drives both 2D DOM animation and feeds progress into R3F |
| 3D scene (Genre 1) | **React Three Fiber** + `@react-three/drei`'s `ScrollControls`/`useScroll` | Camera rig, model loading, lighting |
| 3D scene (Genre 2) | **Spline** (`.splinecode` via `@splinetool/react-spline`) or a single lightweight R3F canvas | One hero object, not a full scene graph |
| Typography overlay | DOM positioned absolutely over canvas, driven by the *same* scroll progress value — never a separate scroll listener | |
| Audio (Genre 1 only) | Howler.js, crossfaded on chapter boundaries — always behind a user-initiated "unmute" gesture | |

**Critical wiring rule:** there must be exactly one scroll-progress value per page
(from Lenis), and GSAP, R3F camera, DOM overlays, and audio crossfades all read from
it. Separate scroll listeners cause the classic "3D scene and text drift out of sync"
bug — the most common failure mode in this category, worth an explicit QA check.

**Concrete numbers:**
- **Scroll damping (Lenis):** `lerp: 0.1` for atmospheric/slow (Invisible Moscow
  feel), `lerp: 0.05` for near-1:1 responsiveness (Vertigo 1958 / technical content).
- **Camera/motion easing:** `linear` interpolation *within* a scrub — GSAP
  ScrollTrigger already provides perceptual easing via scroll damping. A second
  easing curve on top causes lag/rubber-banding between input and response.
- **Chromatic grading:** apply as post-processing (`@react-three/postprocessing`'s
  `Bloom`, `ChromaticAberration`, `Vignette`), not baked into textures, so the
  Creative Director's mood direction stays a swappable parameter.
- **Typography z-depth:** fake depth via scale + opacity synced to scroll progress,
  so 2D text feels native to the 3D scene rather than pasted on top.
- **Loading strategy:** for any real 3D scene, a branded loading sequence tied to
  actual asset load (not a fake timer) — heavy initial payloads with an unbranded
  spinner break the cinematic framing before the site even starts.

---

## 6. Performance Budget

- Interactive within 3s on mid-tier mobile for the *fallback* experience; full 3D can
  progressively enhance after first paint.
- Genre 1: primary 3D asset under ~2-3MB (Draco-compressed glTF), texture atlasing.
- Genre 2: single hero asset, same compression discipline, much smaller total payload.
- Run the full R3F/postprocessing stack only on devices passing a capability check
  (WebGL2 + `detect-gpu` tier check) — everything else gets the fallback.
- QA scores a dedicated dimension for this category: does scroll reverse smoothly,
  does the fallback actually degrade gracefully (not just disable), and does it hold
  60fps on a mid-range Android — the existing generic 7-dim rubric misses all three.

---

## 8. Filtered Pattern Taxonomy

| Pattern | Source | Genre | Use for |
|---|---|---|---|
| Scroll-bound 3D camera path | The Year of Greta, Lusion | 1 | Chronological/narrative product or brand journeys |
| Real-time WebGL, game-grade craft | Active Theory | 1 | Enterprise/flagship budgets, technical showcase pieces |
| Spline camera + mouse tilt | Vertigo 1958 | 1 | Single-scene hero interactives, faster than full R3F |
| Bespoke 3D mechanical disassembly | Kieran Clarke | 1 | Technical/automotive/hardware product reveals |
| Slow-inertia scroll + audio crossfade | Invisible Moscow | 1 | Moody, atmospheric brand walks |
| Video-morph grid-to-fullscreen | Imagina Studio | 1 | Agency/creative portfolios with strong video assets |
| Atmospheric color grading | Canals Amsterdam | 1/2 | Grading layer, not a structural pattern |
| Single 3D monolith + mouse-reveal | Hubtown | 2 | Dignifying "boring" B2B/corporate sectors |
| Restrained GSAP + WebGL layering | Minh Pham portfolio | 2 | Personal/agency portfolios, proof of taste over maximalism |
| Serious-product scroll UX | Jeton | 2 | Fintech, regulated industries needing premium feel without gimmicks |
| Typography as the entire drama | Obys | 2b | Editorial, long-form agency/portfolio content |
| Cinematic without generated media | Hadaka, Obys, 1PV, L'Oréal | 0 | When video/3D unavailable; restraint, pacing, grading on ordinary photos |
| Brand-forward restraint | Locomotive | 2 | Commercial client work, agency-grade but not experimental |

Everything else in the general archive (mega-menus, quote showcases, service cards,
year-in-review) is orthogonal to this category and shouldn't be pulled into either
genre's brief — those patterns solve information-density problems this category
deliberately trades away for immersion or restraint.

---

## 9. Genre 0: Cinematic Without Generated Media

**Reference sites:** **Hadaka** (hadaka.jp), **Obys Agency** (obys.agency),
**1 Place Vendôme** (1-placevendome.com), **L'Oréal Mediaroom** (loreal.com),
**Canals Amsterdam** (canals-amsterdam.com).

**Core thesis:** Cinematic is a quality of restraint and pacing, not a media type.
Video, 3D, and generated assets are three possible tools — the goal is achievable
with nothing but type, color, whitespace, and well-directed motion on ordinary
photos. Hadaka proves this outright: stark black/white/red, no hero video, no 3D,
and it reads as more cinematic than most WebGL-heavy sites because every element
earns its place.

### What cinematic means here

A film feels cinematic because of **pacing**, **restraint**, and **intentional
framing** — not because it has expensive footage. Translate those three directly:

- **Pacing** — one idea revealed at a time, at a controlled rhythm. A
  single-column, generous-whitespace layout with staged scroll reveals feels more
  cinematic than a dense grid, even with identical content.
- **Restraint** — the discipline to leave things out. One hero statement, one
  accent color, one signature moment — not five competing effects.
- **Intentional framing** — every crop, negative-space choice, and type placement
  looks chosen, not default. This is the dividing line Awwwards judges call "art
  direction with a point of view."

### Levers (no 3D/video required)

| Lever | Execution |
|-------|-----------|
| Typography as visual centerpiece | Oversized type (10–15vw display sizes), tight/negative letter-spacing on headlines, a single characterful display face (Obys' whole approach) |
| Scroll-paced reveal | Stagger text/images on scroll (40–80ms offsets, expo-out easing) — pacing feels cinematic independent of what's being revealed |
| Grading on ordinary photos | CSS filters (contrast, saturate, subtle duotone via mix-blend-mode) applied consistently across every image — unified grade on stock/client photos |
| Masking and cropping | clip-path/border-radius on ordinary photos (organic-blob, parallelogram, circle, pill shapes) — unusual crop reads as directed |
| Negative space as framing | Oversized margins, photo occupying 40% of viewport instead of 100%, "arriving late" content — space does framing work a camera move would do |
| Cursor and micro-interaction | Custom cursor, magnetic buttons, hover-reveal caption — signature moment doesn't have to be 3D |
| Custom easing | Never default ease-in-out; well-timed fades feel directed, linear defaults feel templated |
| Chapter pacing | Cold open → statement → work → close structure gives scroll narrative shape |

### Hard rule for AI agents

When uncertain how to make something feel more cinematic, the instinct is to add
(a gradient, a floating shape, an extra animation). The actual fix is almost always
to **remove something instead**. Restraint is the default lever when in doubt, not
more motion.

### Implementation constraints

- **Zero Three.js/WebGL imports** unless the brief explicitly upgrades to Genre 1/2.
- **Zero video files** unless the brief provides them. Stock photos with CSS
  grading are the default imagery.
- **Single accent color** maximum. Reject gradient blobs, mesh gradients, and
  purple/teal "premium" combinations.
- **One focal point per screen.** If a section has two competing attention magnets,
  remove one.
- **Custom easing on every transition.** GSAP `expo.out`, `power3.inOut`,
  `back.out(1.7)` — never default `ease-in-out` or CSS `linear` on fades.
- **Chapter-paced content structure** even without a literal camera: cold open →
  beat → beat → close. The scroll should have narrative shape, not flat sections.
- **Test for success:** Does the site feel deliberate and paced, or does it feel
  like a template with animations added? If uncertain, remove an element rather
  than add one.
