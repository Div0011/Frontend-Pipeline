# Cinematic Website Templates — 5-Type Prompt Library

## Core Principle

> **Scroll-based ≠ cinematic.** A site can have GSAP ScrollTrigger on every section and still feel generic if the motion doesn't carry meaning. The test for every template below: **can you say *why* each animated element moves the way it does** (paces a story, rewards attention, reveals structure) — if the only answer is "because it's on the list of things that animate," it's decoration, not direction.

> **Synthesis over cloning.** Never ask the agent to "build a website like X." Instead, instruct it to extract the underlying *design principles* from references and synthesize them into an original, high-caliber implementation. Every interaction must reinforce the content and purpose of the site rather than serving as mere decoration.

---

## Shared Tech Stack

| Layer | Library | Notes |
| --- | --- | --- |
| **Framework** | Next.js (App Router) + Tailwind CSS | Standard modern web foundation |
| **Scroll Physics** | **Lenis** | Single source of scroll truth — everything else reads from it |
| **Scroll → Animation** | **GSAP + ScrollTrigger** (`scrub`) | Drives DOM, feeds progress into 3D |
| **3D (Full Scene)** | **React Three Fiber + drei** | For templates needing an explorable/assembled scene |
| **3D (Single Hero Object)** | **Spline** (`@splinetool/react-spline`) | Faster than R3F for one centerpiece object |
| **Micro-interactions** | **Framer Motion** | Hover states, button/cursor feedback — not main scroll narrative |
| **Video** | Native `<video>` + `next/image` poster frames | Lazy-loaded, never autoplay with sound |
| **Post-processing** | `@react-three/postprocessing` | Bloom, ChromaticAberration, Vignette grading layer |

---

## Template 1: Creative / Film Portfolio

- **Genre:** 2b (Kinetic-Type-Led) + video-morph centerpiece
- **Signature Motion & Why:** Grid thumbnails morph into full-bleed video on interaction (Imagina Studio pattern). *Reason:* A portfolio's whole job is proving the work, so interaction should feel like stepping directly into footage, not opening a modal.
- **Reference Sites:** Obys Agency, Minh Pham's portfolio, Imagina Studio
- **Assets to Generate:** Short (5-8s) muted looping clips per project for morph targets; one hero clip/still for cold open.

```markdown
Create a premium editorial portfolio inspired by award-winning creative studios without reproducing any existing layout or branding.

The experience should prioritize storytelling, typography, and project presentation over decorative effects. Motion should feel cinematic and restrained. Use generous whitespace, asymmetrical editorial layouts, smooth scroll choreography, fullscreen media transitions, and carefully timed typography animations. Every interaction must reinforce the work rather than distract from it.

Before generating code, produce a structured implementation plan covering:
1. Design rationale (why each interaction exists)
2. Page architecture (high-level structure and flow)
3. Component hierarchy (reusable UI elements)
4. Animation timeline (orchestration of sequences)
5. Scroll choreography (how motion maps to user navigation)
6. State management strategy
7. Asset loading strategy
8. Accessibility plan
9. Performance budget
10. Mobile adaptation strategy

Only after the plan is complete should implementation begin. Avoid copying navigation structures, layouts, or visual identities from any reference. Instead, synthesize the common design principles into a unique implementation with original spacing, hierarchy, motion timing, and interaction patterns.
```

---

## Template 2: SaaS Product Launch

- **Genre:** 2 (Restrained Centerpiece) — abstract exploded structure, not a literal object
- **Signature Motion & Why:** Abstract 3D structure (nodes/blocks/layers) that assembles or explodes apart as the user scrolls through feature sections. *Reason:* Structural honesty — literally showing how product pieces fit together 1:1 with feature copy.
- **Reference Sites:** Jeton, Hubtown
- **Assets to Generate:** AI-generated abstract 3D model (geometric blocks, network/node structure, or stylized "engine" form glTF).

```markdown
Design a premium SaaS landing page centered around a single interactive 3D object that visually represents the product ecosystem. The object should respond naturally to scrolling, camera movement, and user interaction while remaining secondary to the product messaging.

Maintain a clean architectural layout with strong typography, generous whitespace, and minimal color usage. Avoid excessive visual effects. Build a cohesive motion language based on physically believable movement, smooth interpolation, and consistent easing. Create an original experience that captures the principles of modern premium SaaS design without reproducing any reference website.

Before generating code, produce a structured implementation plan covering:
1. Design rationale (why each interaction exists)
2. Page architecture (high-level structure and flow)
3. Component hierarchy (reusable UI elements)
4. Animation timeline (orchestration of sequences)
5. Scroll choreography (how motion maps to user navigation)
6. State management strategy
7. Asset loading strategy
8. Accessibility plan
9. Performance budget
10. Mobile adaptation strategy

Only after the plan is complete should implementation begin.
```

---

## Template 3: Corporate / Institutional Company Site

- **Genre:** 1, lightweight (3-4 chapters max, not a full explorable 3D world)
- **Signature Motion & Why:** Chapter-based scrollytelling where each section shift is marked by an environmental/lighting change (History of Animation + Canals Amsterdam pattern). *Reason:* Institutional trust is built by pacing (a company that doesn't rush its story reads as established), not density.
- **Reference Sites:** L'Oréal Groupe Mediaroom, Canals Amsterdam
- **Assets to Generate:** 3-4 atmospheric background loops or still photography with consistent, restrained color grading.

```markdown
Create a premium institutional website that emphasizes trust, heritage, and innovation through cinematic storytelling rather than visual spectacle. Structure the experience into clearly defined narrative chapters with restrained motion, sophisticated typography, and carefully paced transitions. Use immersive background media only where it strengthens the narrative.

Before generating code, produce a structured implementation plan covering:
1. Design rationale (why each interaction exists)
2. Page architecture (high-level structure and flow)
3. Component hierarchy (reusable UI elements)
4. Animation timeline (orchestration of sequences)
5. Scroll choreography (how motion maps to user navigation)
6. State management strategy
7. Asset loading strategy
8. Accessibility plan
9. Performance budget
10. Mobile adaptation strategy

Only after the plan is complete should implementation begin. Develop an original information architecture and interaction model inspired by best practices from high-end institutional websites without reproducing their layouts, branding, or visual identity.
```

---

## Template 4: Marketing / Creative Agency

- **Genre:** 1 (high-energy) or 2b, agency's choice
- **Signature Motion & Why:** Project-grid reveal with aggressive stagger + full agency showreel paced like a highlight cut. *Reason:* Agency sells its own energy and range as the product, not a single body of work.
- **Reference Sites:** Locomotive, Active Theory, Resn
- **Assets to Generate:** Fast-cut agency showreel (10-20s, multiple past-project clips edited together) for hero; project thumbnails as stills or short loops.

```markdown
Build an award-level creative agency website that demonstrates technical excellence through purposeful interaction design. Every animation should communicate craftsmanship rather than novelty. Integrate WebGL, motion graphics, and advanced scrolling techniques into a cohesive experience that remains fast, accessible, and intuitive.

Before generating code, produce a structured implementation plan covering:
1. Design rationale (why each interaction exists)
2. Page architecture (high-level structure and flow)
3. Component hierarchy (reusable UI elements)
4. Animation timeline (orchestration of sequences)
5. Scroll choreography (how motion maps to user navigation)
6. State management strategy
7. Asset loading strategy
8. Accessibility plan
9. Performance budget
10. Mobile adaptation strategy

Only after the plan is complete should implementation begin. The design should synthesize principles from leading creative agencies while maintaining an entirely original layout, interaction model, and visual identity. Avoid reproducing distinctive scenes, navigation patterns, or branded effects from any single reference.
```

---

## Template 5: Consumer Product / E-commerce (Physical Object)

- **Genre:** 1, Kieran Clarke-style mechanical disassembly
- **Signature Motion & Why:** Literal physical product exploding into component parts as camera moves through scroll sequence. *Reason:* Proof of engineering/craft — showing what's inside builds premium justification for price.
- **Reference Sites:** Kieran Clarke, Vertigo 1958
- **Assets to Generate:** Real breakable/exploded 3D model (segmented glTF mesh via AI 3D generators or photograph → mesh).

```markdown
Create a premium product experience where a fully interactive 3D model serves as the central storytelling element. Use scroll-driven assembly, exploded views, camera choreography, and contextual feature reveals to communicate engineering quality and product craftsmanship.

Treat the product as the primary interface, supported by restrained typography and minimal surrounding UI.

Before generating code, produce a structured implementation plan covering:
1. Design rationale (why each interaction exists)
2. Page architecture (high-level structure and flow)
3. Component hierarchy (reusable UI elements)
4. Animation timeline (orchestration of sequences)
5. Scroll choreography (how motion maps to user navigation)
6. State management strategy
7. Asset loading strategy
8. Accessibility plan
9. Performance budget
10. Mobile adaptation strategy

Only after the plan is complete should implementation begin. Build an original experience inspired by premium hardware product launches without reproducing any existing layout, animation sequence, or visual identity.
```

---

## Resource Directory: AI Asset Generation

### 🎥 AI Video Generation

| Tool | Good For | Free Tier Notes |
| --- | --- | --- |
| **Kling AI** | Most natural motion, best free daily volume (~6 clips/day) | 720p, watermarked, personal-use |
| **Luma Dream Machine** | Cinematic, slower atmospheric motion — best for Templates 1 & 3 | 720p, watermarked |
| **Pika** | Built-in "explode/melt/crush" toolkit (Template 5 b-roll) | 480p cap, commercial use rights |
| **Runway** | Best camera-control & editing workspace | One-time free credits |
| **Hailuo (MiniMax)** | Strong physical motion/physics | ~3 clips/day free |

### 🖼️ AI Image Generation

- **Adobe Firefly**, **Leonardo.ai**, **Ideogram**: Usable free tiers for hero stills and moodboard exploration.

### 📦 AI 3D Model Generation (Templates 2 & 5)

| Tool | Good For | Notes |
| --- | --- | --- |
| **Meshy AI** | Watertight, web-ready glTF meshes straight out of box | Generous free credits |
| **Tripo AI** | Fastest generation (~10-30s), auto-rigging capabilities | Generous free credits |
| **3D AI Studio** | Multi-engine hub (Tripo, Meshy, Rodin) | ~1,000 credits/mo free |
| **Hunyuan3D / TRELLIS** | Open-source, self-hosted 3D generation | 0 cost (needs GPU) |
| **Sketchfab** | Pre-made CC-licensed 3D models & exploded views | Search "exploded view", "cutaway" |
