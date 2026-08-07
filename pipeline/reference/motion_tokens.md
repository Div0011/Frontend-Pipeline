# Motion Token System

Concrete, pipeline-parseable motion vocabulary. Every animation in generated
sites must map to one of these tokens. Do not invent new values.

---

## ENTRANCE TOKENS

| Token | From | To | Duration | Ease |
|---|---|---|---|---|
| `fade-up` | `translateY(40px)`, `opacity: 0` | `translateY(0)`, `opacity: 1` | `0.8s` | `power3.out` |
| `mask-reveal` | `clip-path: circle(0%)` | `clip-path: circle(100%)` | `1.2s` | `power4.inOut` |
| `typewriter` | character stagger | visible | `0.03s` per char | `power2.out` |
| `zoom-fog` | `scale(1.15)`, `blur(30px)`, `opacity: 0` | `scale(1)`, `blur(0)`, `opacity: 1` | `1.5s` | `power2.out` |
| `slide-in-left` | `translateX(-60px)`, `opacity: 0` | `translateX(0)`, `opacity: 1` | `0.7s` | `power3.out` |
| `slide-in-right` | `translateX(60px)`, `opacity: 0` | `translateX(0)`, `opacity: 1` | `0.7s` | `power3.out` |
| `stagger-grid` | children fade-up | staggered reveal | `0.08s` per item | `power2.out` |
| `liquid-emerge` | `scale(0.8)`, `opacity: 0`, `blur(10px)` | `scale(1)`, `opacity: 1`, `blur(0)` | `1.0s` | `elastic.out(1, 0.5)` |

---

## SCROLL TOKENS

| Token | Behavior |
|---|---|
| `parallax-slow` | `translateY` at `0.3x` scroll speed |
| `parallax-medium` | `translateY` at `0.5x` scroll speed |
| `parallax-fast` | `translateY` at `0.8x` scroll speed |
| `pin-section` | GSAP `ScrollTrigger` `pin`, `scrub: 0.6` |
| `horizontal-reel` | pinned horizontal scroll gallery, `scrub: 0.8` |
| `color-morph` | `backgroundColor` interpolation between section colors, `scrub: 0.6` |
| `depth-layer` | multiple z-depth planes at `0.2x`, `0.5x`, `0.8x`, `1.2x` scroll speeds |

---

## INTERACTION TOKENS

| Token | Behavior |
|---|---|
| `magnetic` | cursor pull radius `50px`, strength `0.3`, ease `power2.out` |
| `liquid-fill` | background gradient sweep on hover, `0.4s`, ease `power2.inOut` |
| `tilt-3d` | `perspective(1000px)`, `rotateX/Y ±10deg` on mousemove, ease `power2.out` |
| `cursor-expand` | custom cursor scales `1→3`, shows contextual text, `0.3s`, ease `power2.out` |
| `glow-pulse` | `box-shadow` intensity oscillates, `2s` loop, ease `sine.inOut` |
| `ripple-trigger` | radial gradient expands from click point, `0.6s` |

---

## TRANSITION TOKENS

| Token | Behavior |
|---|---|
| `cut-fade` | opacity crossfade, `0.3s` (editorial) |
| `morph-scale` | `scale` + `blur` transition between sections, `0.8s` (cinematic) |
| `wipe-direction` | `clip-path` polygon sweep directional, `0.7s`, ease `power4.inOut` |
| `lens-distort` | chromatic aberration + barrel distortion on transition, `0.5s` |

---

## MOTION CONSTANTS (never deviate)

- Scroll damping (Lenis lerp): `0.1` atmospheric, `0.05` technical
- GSAP scrub easing: **LINEAR** — Lenis provides perceptual easing
- Stagger base: `0.05s` per element
- Parallax range: `20%–50%` viewport
- Grain overlay opacity: `3%–5%`
- Chromatic aberration intensity: `0.003–0.008`
- Vignette intensity: `0.3–0.6`
- Bloom threshold: `0.85`, strength: `0.4`, radius: `0.5`

---

## USAGE RULE

Every animated element in generated code MUST reference a token from this
table. Agents that invent bespoke CSS transitions without mapping to a token
fail QA.
