# Discovery Questionnaire v2 — Pre-Redesign Intake

## 0. Functional Scope (ask this FIRST — it changes everything downstream)

**Is this replacing a live site with existing functionality, or is it greenfield?**
- [ ] Greenfield — no existing backend, building from scratch
- [ ] Existing site, visual redesign only — keep current backend/CMS/e-commerce as-is
- [ ] Existing site, full rebuild — new frontend, existing backend as an API (headless)
- [ ] Existing site, full migration — replacing the backend/platform too

**If e-commerce or a system with real transactions/accounts is involved:**
- What platform is it currently on? (WooCommerce, Shopify, custom, etc.)
- Does it currently process payments? If yes: which gateway?
- Any part of this you specifically do NOT want touched (checkout, inventory sync,
  existing customer accounts)?

*This section exists because a live store or app has real financial/data risk that
a portfolio or marketing site doesn't — skipping it is how a "redesign" accidentally
breaks checkout.*

---

## 1. Visual Style & Aesthetic

| Option | Description | Reference sites (tone only — not for copying) |
|---|---|---|
| A. Minimalist | Clean, generous whitespace, functional beauty | Aesop, Muji |
| B. Brutalist | Raw, unpolished, bold typography, high contrast | Bloomberg, CTM |
| C. Corporate/Professional | Polished, trustworthy, business-forward | Stripe, McKinsey |
| D. Playful/Organic | Soft curves, warm colors, approachable tone | Duolingo, Headspace |
| E. High-Tech/Futuristic | Sleek, motion-heavy, WebGL-forward | Vercel, Arc Browser |
| F. Editorial/Digital-Magazine | Typography-driven, restrained, aspirational | Obys-style, Kinfolk |
| G. Industrial/Tech-Product | Engineering-focused, spec-heavy | Dyson, Sonos |
| H. Custom | Describe your own direction: __________ | |

**Existing brand assets:** does a logo, color palette, or photography library already
exist that this needs to match — or is the visual system being invented from scratch?

**Sites you personally admire** (freeform, any industry): _____________________
*(This grounds Creative Director far better than the style list alone — a specific
site you like tells us more than a category label does.)*

---

## 2. Scope & Scale

How many pages?
- [ ] 1 page (landing only)
- [ ] 3–5 pages
- [ ] 6–10 pages
- [ ] 10+ pages (enterprise/commercial)

---

## 3. Interactivity & Motion

**A. Interactivity level:**

| Level | Description | Performance impact |
|---|---|---|
| Static | No JS animation | Fastest |
| Micro-interactions | Hover states, subtle transitions | Fast |
| High-motion | Scroll-linked animation, parallax, video scrubbing | Moderate |
| Immersive | 3D WebGL, cinematic scroll-camera paths | Heavy |

⚠️ **Style/motion consistency check — resolve before proceeding if flagged:**
Some Section 1 + Section 3A combinations point in different directions and should
be confirmed with the client rather than built literally:
- Editorial/Digital-Magazine + Immersive → typographic restraint and a full 3D
  scene usually compete rather than combine. Confirm: is 3D meant to be one small
  restrained moment, or should the style lean toward High-Tech/Futuristic instead?
- Minimalist + Immersive → same tension; confirm scope of the 3D element specifically.
- Brutalist + Immersive → can work (raw + heavy WebGL isn't inherently
  contradictory) but confirm the 3D style is meant to feel "raw," not polished/glossy.
If a flagged combination comes back, surface it to the client as a question rather
than silently building whichever answer was selected last.

**B. Can you supply or generate video/3D assets, or should this be designed to work
with static images only?**
- [ ] Yes, I can generate/supply video and 3D assets
- [ ] Limited — some assets, not a full set
- [ ] No — design should achieve a cinematic feel using typography, layout, and
      static imagery only (see note below)

*If "No" or "Limited": the pipeline should default toward the typography/pacing/
restraint techniques that don't require generated media — oversized type, CSS-filter
grading on ordinary photos, unconventional masking/cropping, chapter-paced content
structure — rather than shipping placeholder video or a decorative 3D object bolted
on to compensate for missing assets.*

**C. How many scroll-based video elements (only relevant if 3B = Yes/Limited)?**
- [ ] 0 (static images only)
- [ ] 1 hero video
- [ ] 2–3 videos (hero + one content section)
- [ ] 4–6 videos
- [ ] 6+ (full video-driven site)

**D. Video content style, if applicable:**

Hero intro video prompt template:
```
A cinematic 8-second loop of [PRODUCT/SUBJECT] rotating slowly in a dark studio,
soft rim lighting casting subtle shadows on a seamless backdrop, camera slowly
dollying forward with shallow depth of field, moody and atmospheric, 4K, 16:9
aspect ratio, no text, product-focused
```

Content section video prompt template (repeat per section):
```
A detailed 12-second motion graphic showing [FEATURE/TOPIC], clean vector-style
animation with smooth transitions, [BRAND COLOR PALETTE], motion graphics suitable
for scroll-scrubbing where frame 0 = start state, frame 300 = end state, minimal UI,
no text overlays, 4K 16:9
```

---

## 4. Target Audience & Intent

**Primary user:**
- [ ] B2B decision makers
- [ ] End consumers
- [ ] Investors/stakeholders
- [ ] General audience (brand awareness)

**Primary goal:**
- [ ] Drive e-commerce purchases
- [ ] Generate B2B leads
- [ ] Showcase portfolio/work
- [ ] Build brand awareness / thought leadership
- [ ] Educate / inform
- [ ] Support existing customers

**Primary device:** is this site mostly viewed on mobile or desktop by your actual
audience? *(This should directly shape how aggressively Immersive/3D gets
recommended — mobile-majority audiences need the fallback experience treated as the
real experience, not an afterthought.)*

---

## 5. Brand Personality

List 3–5 adjectives that define the brand voice (e.g., Sophisticated, Innovative,
Trustworthy, Approachable, Premium): _____________________________
