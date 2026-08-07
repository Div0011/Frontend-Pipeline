# Pattern Analysis: "Ever" (by Vide Infra) — Luxury Real Estate WebGL Narrative

## Genre: Luxury Real Estate — WebGL 3D Scroll Narrative (Genre 8a)

## Core Architecture
- **Stack:** React Three Fiber + GSAP + Lenis + Custom shaders
- **Approach:** The property's story told through scroll-driven 3D visualization — not a spec sheet
- Won Awwwards, CSSDA, and FWA Site of the Day simultaneously

## Key Mechanical Patterns (Behavioral Observation)

### 1. Scroll-Driven 3D Property Narrative
- The property is rendered as a full 3D scene in WebGL
- Scroll progresses through the property's story:
  - 0-15%: Aerial approach — camera descends from sky to property entrance
  - 15-35%: Exterior reveal — building exterior rotates into view with golden hour lighting
  - 35-55%: Interior stroll — camera moves through living spaces (living room → kitchen → bedroom)
  - 55-75%: Architectural detail — close-up of signature design elements (materials, textures, views)
  - 75-90%: Lifestyle — property with surroundings (pool, garden, horizon view)
  - 90-100%: CTA — contact form overlay with property stats
- Each section is a continuous camera path — no cuts, no loading

### 2. Environmental Lighting Shifts
- Lighting follows the sun across the property tour:
  - Morning: cool blue, long shadows (low angle sun)
  - Midday: bright, high contrast, short shadows
  - Golden hour: warm orange/pink, dramatic long shadows
  - Evening: twilight blue, artificial interior lights glow
- Lighting transitions are 2-3s smooth interpolations
- Sun position tracks a Bezier curve path mapped to scroll progress

### 3. Material Quality Showcase
- Materials shift from "architectural" to "tactile" as camera approaches:
  - Distant: clean PBR materials (marble, wood, glass) with standard reflections
  - Close-up: material displacement maps activate (stone grain, wood texture visible)
  - Macro: subsurface scattering for marble, accurate glass refraction
- Material detail level is a function of camera distance to surface
- At closest approach, a subtle specular highlight sweeps across the surface (0.5s animation)

### 4. Atmospheric Depth Layers
- Foreground: floating particles (dust motes in sunlight, fireflies at dusk)
- Midground: the property itself
- Background: sky gradient that shifts with lighting, distant landscape silhouette
- Particles change behavior with section: slow drift in interiors, wind-swept outside
- Depth of field blur increases/decreases based on camera speed (slow = sharp, fast = motion blur)

### 5. Overlay Integration
- Section titles appear as thin centered text (0.6rem, letter-spacing 0.3em, uppercase)
- Text is "world-space UI" — rendered in 3D but always facing camera (sprite-based)
- Metrics appear as floating numbers anchored to 3D locations (sq ft, ceiling height, etc.)
- Contact CTA appears at 85% scroll: a minimal button that floats at bottom-center
- No traditional navigation — the scroll IS the navigation

## Why It Works
- The property IS the interface — no separate UI competing with the visual
- Lighting shifts tell a day-in-the-life story without words
- Material detail progression rewards the user for looking closely
- Atmospheric layers create cinematic depth without VR

## Original Implementation Code (R3F Camera Path + Lighting)

```tsx
// PropertyCameraPath.tsx
"use client";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CameraKeyframe {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
  sunAngle: number;     // 0-1 representing sun position across the sky
  sunIntensity: number;
  ambientColor: string;
}

const CAMERA_PATH: CameraKeyframe[] = [
  {
    position: new THREE.Vector3(0, 50, 80),    // Aerial approach
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 50,
    sunAngle: 0.1,      // Early morning
    sunIntensity: 0.6,
    ambientColor: "#4a6fa5",
  },
  {
    position: new THREE.Vector3(15, 5, 30),    // Exterior reveal
    lookAt: new THREE.Vector3(0, 3, 0),
    fov: 45,
    sunAngle: 0.3,      // Mid-morning
    sunIntensity: 0.8,
    ambientColor: "#87ceeb",
  },
  {
    position: new THREE.Vector3(8, 2, 12),     // Interior living room
    lookAt: new THREE.Vector3(0, 2, 0),
    fov: 55,
    sunAngle: 0.5,      // Midday
    sunIntensity: 1.0,
    ambientColor: "#b0d4f1",
  },
  {
    position: new THREE.Vector3(-5, 2, 8),     // Kitchen detail
    lookAt: new THREE.Vector3(2, 2, 3),
    fov: 50,
    sunAngle: 0.5,
    sunIntensity: 0.9,
    ambientColor: "#c8dce8",
  },
  {
    position: new THREE.Vector3(0, 3, 20),      // Architectural detail
    lookAt: new THREE.Vector3(0, 4, 0),
    fov: 40,
    sunAngle: 0.65,     // Golden hour
    sunIntensity: 0.7,
    ambientColor: "#e8a86a",
  },
  {
    position: new THREE.Vector3(25, 5, 35),    // Lifestyle / surroundings
    lookAt: new THREE.Vector3(0, 2, 0),
    fov: 60,
    sunAngle: 0.8,      // Sunset
    sunIntensity: 0.5,
    ambientColor: "#d4756b",
  },
  {
    position: new THREE.Vector3(0, 3, 15),     // CTA view
    lookAt: new THREE.Vector3(0, 2, 0),
    fov: 50,
    sunAngle: 0.85,     // Twilight
    sunIntensity: 0.3,
    ambientColor: "#2c3e50",
  },
];

function lerpKeyframes(a: CameraKeyframe, b: CameraKeyframe, t: number): CameraKeyframe {
  return {
    position: new THREE.Vector3().lerpVectors(a.position, b.position, t),
    lookAt: new THREE.Vector3().lerpVectors(a.lookAt, b.lookAt, t),
    fov: a.fov + (b.fov - a.fov) * t,
    sunAngle: a.sunAngle + (b.sunAngle - a.sunAngle) * t,
    sunIntensity: a.sunIntensity + (b.sunIntensity - a.sunIntensity) * t,
    ambientColor: new THREE.Color(a.ambientColor).lerp(new THREE.Color(b.ambientColor), t).getHexString(),
  };
}

export default function PropertyCameraPath() {
  const { camera, scene } = useThree();
  const scrollProgress = useRef(0);
  const currentSunRef = useRef<THREE.DirectionalLight>(null);
  const currentAmbientRef = useRef<THREE.AmbientLight>(null);

  useEffect(() => {
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(50, 50, 0);
    sun.castShadow = true;
    scene.add(sun);
    currentSunRef.current = sun;

    const ambient = new THREE.AmbientLight(0x4a6fa5, 0.5);
    scene.add(ambient);
    currentAmbientRef.current = ambient;

    return () => {
      scene.remove(sun);
      scene.remove(ambient);
    };
  }, [scene]);

  // Track scroll progress for the camera path
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  useFrame(() => {
    const progress = scrollProgress.current * (CAMERA_PATH.length - 1);
    const index = Math.floor(progress);
    const frac = progress - index;
    const i0 = Math.min(index, CAMERA_PATH.length - 2);
    const i1 = i0 + 1;

    const current = lerpKeyframes(CAMERA_PATH[i0], CAMERA_PATH[i1], frac);

    // Apply camera position with smooth lerp
    camera.position.lerp(current.position, 0.05);
    camera.lookAt(current.lookAt);
    camera.fov = camera.fov + (current.fov - camera.fov) * 0.05;
    camera.updateProjectionMatrix();

    // Update lighting
    if (currentSunRef.current) {
      const sunAngle = current.sunAngle * Math.PI;
      const radius = 80;
      currentSunRef.current.position.set(
        Math.cos(sunAngle) * radius,
        Math.sin(sunAngle) * radius * 0.6,
        20
      );
      currentSunRef.current.intensity = current.sunIntensity;
      currentSunRef.current.color.set(
        current.sunAngle < 0.3 ? "#fff4e0" :
        current.sunAngle < 0.6 ? "#ffffff" :
        current.sunAngle < 0.8 ? "#ffd48a" :
        "#ff8855"
      );
    }

    if (currentAmbientRef.current) {
      currentAmbientRef.current.color.set(`#${current.ambientColor}`);
    }
  });

  return null;
}
```

```tsx
// PropertySection.tsx — Full component
"use client";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";

export default function PropertySection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh] w-full bg-black" // 6x viewport for 6 sections
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          camera={{ position: [0, 50, 80], fov: 50, near: 0.1, far: 200 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
          shadows
        >
          {/* Property 3D model would be loaded here */}
          <PropertyCameraPath />
          <Environment preset="sunset" />
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.5}
            scale={40}
            blur={2}
          />
        </Canvas>

        {/* World-space UI overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Section titles */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center">
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/50 font-mono">
              The Approach
            </p>
          </div>

          {/* Floating metrics anchored to 3D positions projected to 2D */}
          <div className="absolute bottom-[30%] right-[15%] text-right">
            <span className="text-3xl font-light text-white/80">6,200</span>
            <span className="block text-[0.5rem] tracking-wider text-white/40 uppercase mt-1">
              Sq. Ft. Living Space
            </span>
          </div>

        {/* CTA — appears at 85% scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-700 z-10 pointer-events-auto">
          <button className="px-8 py-3 border border-white/20 text-white/80 text-xs tracking-widest uppercase hover:bg-white/10 transition-all">
            Inquire About This Property
          </button>
        </div>
    </section>
  );
}
```

## Extraction For Template (Luxury Real Estate)
- Scroll-driven camera path through 7 keyframe positions (aerial → exterior → interior → detail → lifestyle → CTA)
- Sun position and color temperature interpolated across the scroll journey (morning → midday → golden hour → twilight)
- PBR material quality level-of-detail based on camera distance (standard → displacement → subsurface)
- Atmospheric depth layers: foreground particles, midground property, background sky
- Floating 3D-world-space metrics projected to 2D screen positions
- ScrollTrigger scrub: 1.5 for smooth camera lerp
- 600vh section height for 6 scroll segments
