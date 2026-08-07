# Pattern Analysis: Vertigo 1958 — Physical Product / Tribute

## Genre: Physical Product — Spline Camera-Tracking (Genre 5)

## Signature Motion
- Camera tracks along a path around the product as scroll progresses
- Dolly zoom effect: camera moves back while FOV narrows, or moves in while FOV widens
- Product stays centered while environment changes

## Mechanical Patterns

### 1. Spline Camera Path
- Camera position defined as 3D spline curve (Catmull-Rom or similar)
- Scroll progress maps to spline `t` value (0 to 1)
- Camera always `lookAt`s the product center
- Path goes: front → low angle → side → top → orbit around back

### 2. Environmental Lighting Shifts
- Lighting rig changes with camera position:
  - Front: even, soft lighting (product shot)
  - Low angle: dramatic, shadow-heavy
  - Side: rim lighting, contrast
  - Top: flat, studio
- Done via interpolation between light preset keyframes

### 3. Product State Changes
- As camera orbits, product material changes:
  - Default: matte finish
  - Side: reflective/metallic
  - Top: translucent
- Scroll reverse undoes material changes

### 4. Overlay Text Timing
- Text appears when camera is at specific path positions
- Text position is fixed on screen (not in 3D space)
- Fade in at 75% of camera travel to that position

## Why It Works
- Camera movement feels cinematic (like a film dolly shot)
- Lighting changes sell the premium material quality
- Product stays the hero — camera serves the product

## Extraction For Template 5
- 3D spline camera path defined in R3F
- Scroll progress → camera `t` position mapping
- Lighting preset interpolation
- Material property changes based on camera angle
- Dolly zoom effect integration
- Overlay text timed to camera positions
</content>
</｜tool｜>
</invoke>

<invoke name="create_file">
<parameter name="absolute_path" value="/Users/divyansh/Documents/GitHub/Frontend Pipeline/REFERENCE_COPIES/template-5-product/15-lusion-product.md</parameter>
<parameter name="content" content="# Pattern Analysis: Lusion — As Physical Product Reference

## Genre: Technology Product — Real-Time 3D Demonstration (Genre 5)

## Why Lusion is Here
Lusion demonstrates how a product reveal can feel like *exploring* rather than *viewing*. Their portfolio pieces treat each project as a persistent 3D object in space that the user orbits around.

## Key Mechanical Patterns

### 1. Persistent 3D Object
- Object is always "live" — rotating, responding to mouse, breathing
- Scroll doesn't play an animation, it changes *camera position* around the object
- Object has its own micro-animations (particle drift, surface undulation, glow pulse)

### 2. Material / Environment Transitions
- Object material properties change with scroll: emissive intensity, color hue, roughness
- Scene background shifts between light and dark at section boundaries
- No hard cut — all transitions are 2-3 second smooth interpolations
- Environment map transitions between studio (for product clarity) and dramatic (for emotion)

### 3. Spec Sheet Integration
- Product specs appear as HTML overlays
- Specs positioned via 3D-to-screen projection
- Each spec is anchored to a specific part of the 3D object

## Why It Works For Products
- Persistent object = always available for inspection
- Materials changing = shows product range/variants without loading new scenes
- Spec overlay = educational without leaving experience

## Extraction For Template 5
- Persistent 3D object with micro-animations
- Material property transitions on scroll
- Environment map transitions
- 3D-to-screen spec label projection
- Camera orbit as primary interaction model
