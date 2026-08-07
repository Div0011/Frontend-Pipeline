# Pattern Analysis: The Unconventional Gallery — WebGL Gesture-Based Gallery

## Genre: Museum / Cultural Institution — WebGL Immersive Gallery (Genre 6b)

## Core Architecture
- **Stack:** React Three Fiber + GSAP + Gesture Recognition (custom touch/mouse mapping)
- **Approach:** The gallery itself is the artwork — gesture-based navigation through WebGL exhibition space
- More immersive than Elektra — sacrifices editorial pacing for spatial exploration

## Key Mechanical Patterns (Behavioral Observation)

### 1. Gesture-Based Navigation
- No scroll bars, no arrow buttons — navigate entirely through gestures:
  - Horizontal drag/swipe: rotate the gallery space (Y-axis rotation)
  - Vertical drag: move between gallery levels/rows
  - Pinch (touch): zoom into an artwork
  - Double-click/tap: "step closer" to artwork for detail view
- Gesture sensitivity is deliberately low (0.3-0.5x) — prevents accidental triggering
- Release momentum: drag-release triggers 0.8s inertia deceleration (cubic-bezier easing)

### 2. WebGL Gallery Space
- 3D gallery room with textured walls, floor, ceiling — subtle atmospheric lighting
- Artworks are texture-mapped planes on the walls
- Each artwork has a soft emissive glow when it becomes the focal point
- Gallery lighting shifts color temperature based on which wall is facing the user:
  - North wall: cool blue (5000K)
  - East wall: warm morning (3500K)
  - South wall: vibrant (5500K with slight magenta)
  - West wall: golden afternoon (3000K)

### 3. Artwork Focus Mode
- When an artwork is centered (within 15° of camera forward), it enters "focus mode":
  - Frame subtly enlarges (scale: 1.05)
  - Frame gains a thin gold border (0.5px, animates to 1px)
  - Metadata text fades in below: title, artist, medium, year
  - Ambient sound subtly shifts to a room tone appropriate to the piece
- Focus mode is progressive: the closer to center, the more pronounced the effect

### 4. Transition Between Gallery Rooms
- At gallery boundaries, a smooth portal transition:
  - Current room fades to white (`opacity: 0` over 0.6s)
  - Brief white flash (0.2s)
  - Next room fades in from white
- Transition triggered by walking to a room boundary (far wall approached within 2 units)
- No loading — rooms are preloaded during initial experience

### 5. Minimal Overlay UI
- Bottom-left: gallery name + current room number (e.g., "Modern Wing · Room 03")
- Bottom-right: small "i" button that toggles current artwork info
- Top-right: exit button (escapes to website landing)
- All UI elements at `z-index: 100` — always above the WebGL canvas

## Why It Works
- Gesture-based navigation makes the act of browsing feel physical
- Lighting shifts by wall orientation sells the "gallery" illusion
- Progressive focus mode rewards deliberate exploration
- Portal transitions solve the "how do I change rooms" problem without UI cruft

## Original Implementation Code (R3F + Gesture Navigation)

```tsx
// GestureGallery.tsx
"use client";
import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Plane } from "@react-three/drei";
import * as THREE from "three";

// --- Gesture Handler ---
function useGalleryGesture() {
  const [rotation, setRotation] = useState({ y: 0, x: 0 });
  const velocityRef = useRef({ y: 0, x: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: PointerEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - lastPos.current.x) * 0.003; // Low sensitivity
    const dy = (e.clientY - lastPos.current.y) * 0.002;
    setRotation((prev) => ({
      y: prev.y + dx,
      x: Math.max(-0.5, Math.min(0.5, prev.x + dy)), // Clamp vertical
    }));
    velocityRef.current = { y: dx, x: dy };
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    // Inertia deceleration
    const startVel = { ...velocityRef.current };
    let frame = 0;
    const decelerate = () => {
      const factor = Math.max(0, 1 - frame * 0.05); // 20 frames = 0.8s @ 60fps
      if (factor <= 0) return;
      setRotation((prev) => ({
        y: prev.y + startVel.y * factor,
        x: Math.max(-0.5, Math.min(0.5, prev.x + startVel.x * factor)),
      }));
      frame++;
      requestAnimationFrame(decelerate);
    };
    requestAnimationFrame(decelerate);
  }, []);

  return { rotation, onPointerDown, onPointerMove, onPointerUp };
}

// --- Artwork Plane with Focus Mode ---
function ArtworkPlane({
  position,
  rotation,
  imageUrl,
  metadata,
  cameraDirection,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  imageUrl: string;
  metadata: { title: string; artist: string; medium: string; year: string };
  cameraDirection: THREE.Vector3;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isFocused, setIsFocused] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const worldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPos);
    const dirToCamera = cameraDirection.clone().sub(worldPos).normalize();
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(meshRef.current.quaternion);

    // Check if camera is looking at this artwork (within 15°)
    const angle = forward.angleTo(dirToCamera);
    const focusAmount = Math.max(0, 1 - angle / (Math.PI / 12)); // 15° threshold
    const shouldFocus = focusAmount > 0.5;

    if (shouldFocus !== isFocused) {
      setIsFocused(shouldFocus);
    }

    // Progressive scale and glow
    const scale = 1 + focusAmount * 0.05;
    meshRef.current.scale.setScalar(scale);
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    if (material.emissive) {
      material.emissiveIntensity = focusAmount * 0.3;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <planeGeometry args={[2.4, 3.2]} />
        <meshStandardMaterial
          map={new THREE.TextureLoader().load(imageUrl)}
          emissive={new THREE.Color("#d4af37")}
          emissiveIntensity={0}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.7, 3.5]} />
        <meshStandardMaterial
          color="#1a1a1e"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      {/* Focus metadata — fades in when focused */}
      {isFocused && (
        <group position={[0, -2.2, 0]}>
          <Text
            position={[0, 0.3, 0]}
            fontSize={0.15}
            color="#d4af37"
            font="/fonts/PlayfairDisplay-Regular.woff"
          >
            {metadata.title}
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={0.08}
            color="#ffffffcc"
          >
            {metadata.artist}
          </Text>
          <Text
            position={[0, -0.25, 0]}
            fontSize={0.06}
            color="#ffffff88"
          >
            {`${metadata.medium} · ${metadata.year}`}
          </Text>
        </group>
      )}
    </group>
  );
}

// --- Gallery Room with Lighting ---
function GalleryRoom({ wallOrientation }: { wallOrientation: string }) {
  // Color temperature based on wall orientation
  const lightColors: Record<string, [number, number, number]> = {
    north: [0.6, 0.7, 1.0],     // Cool blue
    east: [1.0, 0.85, 0.6],     // Warm morning
    south: [1.0, 0.8, 0.9],     // Vibrant magenta
    west: [1.0, 0.75, 0.5],     // Golden afternoon
  };
  const color = lightColors[wallOrientation] || lightColors.north;

  return (
    <>
      <ambientLight intensity={0.3} color={color} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color={color} />
      <hemisphereLight
        args={[color, "#1a1a1e", 0.4]}
      />
      {/* Gallery architecture — subtle walls/floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.9} />
      </mesh>
    </>
  );
}

// --- Main Gallery Canvas ---
export default function GalleryCanvas() {
  const { rotation, onPointerDown, onPointerMove, onPointerUp } = useGalleryGesture();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <div
      className="fixed inset-0 w-screen h-screen"
      onPointerDown={onPointerDown as any}
      onPointerMove={onPointerMove as any}
      onPointerUp={onPointerUp as any}
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <GalleryRoom wallOrientation="north" />
        <group rotation={[rotation.x, rotation.y, 0]}>
          <ArtworkPlane
            position={[-4, 0, -5]}
            rotation={[0, 0.3, 0]}
            imageUrl="/artwork-01.webp"
            metadata={{ title: "Nocturne", artist: "E. V. Day", medium: "Oil on canvas", year: "2023" }}
            cameraDirection={new THREE.Vector3(0, 0, 0)}
          />
          {/* Additional artwork planes positioned around the room */}
        </group>
      </Canvas>

      {/* Overlay UI — always above canvas */}
      <div className="fixed bottom-6 left-6 z-100">
        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-white/50 font-mono">
          Modern Wing · Room 03
        </span>
      </div>
      <div className="fixed bottom-6 right-6 z-100">
        <button className="w-8 h-8 rounded-full border border-white/20 text-white/50 text-xs hover:border-white/60 transition-colors">
          i
        </button>
      </div>
    </div>
  );
}
```

## Extraction For Template (Museum / Cultural Institution — WebGL Version)
- Pointer gesture handler with configurable sensitivity (0.003 horizontal, 0.002 vertical)
- Inertia deceleration system (20-frame cubic-bezier release)
- Artwork focus detection via angle-between-forward-and-camera-to-artwork
- Lighting color temperature shifts by gallery orientation
- Overlay UI at z-index: 100 — always above canvas
- Portal room transitions: fade-to-white → load → fade-from-white
- Gallery room as persistent 3D space with wall textures

