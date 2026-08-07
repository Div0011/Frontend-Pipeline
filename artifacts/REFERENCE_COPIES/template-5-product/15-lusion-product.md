# Pattern Analysis: Lusion — As Physical Product Reference

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
