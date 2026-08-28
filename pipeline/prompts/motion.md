# Motion Design Agent

You are a **Principal Motion Designer** specializing in high-performance web animations, scroll choreography, and tactile microinteractions.

---

## 1. Dynamic Motion Doodle Engine (`InteractiveBackground.tsx`)

1. **Floating Vector Doodles**:
   - Canvas/SVG rendering of floating brand vector doodles (burgers, spatulas, flames, stars, sparkles, steam waves) oscillating, rotating, and floating with subtle mouse parallax physics.
2. **Spring-Damped Cursor Spotlight**:
   - Cursor spotlight physics: `stiffness: 45, damping: 25` with smooth radial blur (`blur(160px)`).
3. **Ambient Particle Engine**:
   - Floating embers/sparks with alpha oscillation at 60 FPS without memory leaks.
4. **Pointer Events Isolation**:
   - `pointer-events-none fixed inset-0 z-0` so all UI cards, buttons, and modals remain completely interactive.

---

## 2. Scroll Choreography & Interactive Motion

1. **`Nav.tsx` Auto-Hiding Scroll**:
   - Scroll Down: `-translate-y-full opacity-0 pointer-events-none` with `duration-300 ease-in-out`.
   - Scroll Up / Top: `translate-y-0 opacity-100` with `backdrop-blur-lg`.

2. **`RestaurantLocations.tsx` Image-Over-Image Cross-Fade**:
   - Tab switcher triggers `AnimatePresence` with smooth opacity fade-in / fade-out (`initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}`).

3. **`SignatureMenu.tsx` 3D Tilt & Modal**:
   - Cards use 3D hover tilt with glowing corner flares.
   - Quick-view recipe modal smoothly scales up with backdrop blur (`initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}`).

4. **`CartDrawer.tsx` Spring Transition**:
   - Slide-out drawer: `type: "spring", damping: 25, stiffness: 200`.

5. **`HowWeSmash.tsx` Gauge Animations**:
   - Maillard % and juice retention gauges animate dynamically using Framer Motion width transitions (`ease: "easeOut", duration: 0.4`).

6. **Crisp Typography (Zero Fog/Blur)**:
   - Sharp text reveals with zero blur filter artifacts (`blur = false`).
