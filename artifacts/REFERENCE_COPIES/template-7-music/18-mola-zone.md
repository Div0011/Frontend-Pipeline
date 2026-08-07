# Pattern Analysis: Mola Zone (Studio 9P, for artist Yamê's album Ebêm)

## Genre: Music / Artist Site — Three.js Immersive World (Genre 7)

## Core Architecture
- **Stack:** Three.js + WebGL + GSAP + Blender (modeled scenes)
- **Approach:** Drops the user into a rotating 3D world tied to the album's short film
- Not a tracklist page — the world IS the album experience

## Key Mechanical Patterns (Behavioral Observation)

### 1. Rotating 3D World
- Full-viewport WebGL scene with Blender-modeled environment
- The world rotates continuously at 0.02 rad/s on idle
- Scroll overrides rotation speed: scroll down speeds up rotation, scroll up slows/reverses
- Rotation maps to album track positions — each track is a distinct location in the 3D world
- At rest (no scroll for 3s), the world decelerates back to idle rotation with exponential easing

### 2. Audio-Sync Mechanic
- Tracks are triggered by proximity to their 3D location
- As the world rotates and a track location approaches center screen (within 20°), the track begins to fade in
- Audio crossfade: incoming track ramps from 0 to 1 over 1.5s; outgoing track fades from 1 to 0 over 2s
- Bass frequencies are emphasized when the camera is near the ground in the 3D world
- Treble/highs shimmer when the camera is at high elevation points
- Audio is spatialized: left/right pan shifts based on track position relative to center

### 3. Environment State Machine
- Each track location has a distinct environment state:
  - State 1: Floating islands (track 1 — ambient/drone) — soft fog, pastel colors
  - State 2: Underwater chamber (track 2 — bass-heavy) — caustic light, blue gradient
  - State 3: Desert expanse (track 3 — rhythmic) — warm orange, dust particles
  - State 4: Cosmic void (track 4 — cinematic) — stars, nebula colors
- Environment transitions interpolate over 3-4s between states
- Particle systems per environment: density, color, velocity all lerp between presets

### 4. Immersive UI
- No traditional player controls (no play/pause, no progress bar)
- Track titles appear as floating 3D text at their world location
- When a track is active, its title pulses gently (scale: 1 → 1.02 → 1, 4s cycle)
- Bottom of screen: subtle "now playing" indicator with album art thumbnail + track name
- All UI fades out after 5s of idle and reappears on scroll or click

### 5. Preloader as Narrative Entry
- Preloader screens: album art zooms in from `scale(0.3)` to `scale(1)` over 2s
- Behind the zoom, the 3D world is already loading and visible as a blur
- Once loaded, blur resolves (2s transition), revealing the 3D world
- The first track starts automatically after preloader dismisses

## Why It Works
- The 3D world IS the tracklist — no separate UI for browsing songs
- Audio-sync makes the environment respond to music rather than just playing it
- Environment state machine makes each track feel like a distinct "place"
- Spatialized audio reinforces the physicality of the world

## Original Implementation Code (R3F + Audio-Sync + GSAP)

```tsx
// AudioSyncWorld.tsx
"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// --- Audio Manager ---
class AudioManager {
  private ctx: AudioContext;
  private tracks: Map<string, { buffer: AudioBuffer; source: AudioBufferSourceNode | null; gain: GainNode }> = new Map();
  private masterGain: GainNode;
  private analyser: AnalyserNode;

  constructor() {
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.analyser = this.ctx.createAnalyser();
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    this.masterGain.gain.value = 0.8;
  }

  async loadTrack(id: string, url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await this.ctx.decodeAudioData(arrayBuffer);
    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    gain.connect(this.masterGain);
    this.tracks.set(id, { buffer, source: null, gain });
  }

  playTrack(id: string) {
    const track = this.tracks.get(id);
    if (!track) return;
    // Stop current playback
    track.source?.stop();
    // Create new source
    const source = this.ctx.createBufferSource();
    source.buffer = track.buffer;
    source.loop = true;
    source.connect(track.gain);
    source.start();
    track.source = source;
  }

  crossfade(fromId: string, toId: string, duration: number = 1.5) {
    const from = this.tracks.get(fromId);
    const to = this.tracks.get(toId);
    if (!from || !to) return;

    const now = this.ctx.currentTime;
    from.gain.gain.setValueAtTime(from.gain.gain.value, now);
    from.gain.gain.linearRampToValueAtTime(0, now + duration);

    to.gain.gain.setValueAtTime(0, now);
    to.gain.gain.linearRampToValueAtTime(1, now + duration);
  }

  getFrequencyData(): Uint8Array {
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

// Singleton audio manager
const audioManager = new AudioManager();

// --- Track Location in 3D World ---
interface TrackLocation {
  id: string;
  name: string;
  angle: number;  // Radians around the world Y-axis
  position: [number, number, number];
  environment: EnvironmentPreset;
}

interface EnvironmentPreset {
  fogColor: string;
  fogDensity: number;
  ambientColor: string;
  particleCount: number;
  particleColor: string;
  particleVelocity: number;
}

// --- Environment Particles ---
function EnvironmentParticles({ preset }: { preset: EnvironmentPreset }) {
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const positions = new Float32Array(preset.particleCount * 3);
    for (let i = 0; i < preset.particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [preset]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < preset.particleCount; i++) {
      positions[i * 3 + 1] += delta * preset.particleVelocity;
      if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.08}
        color={preset.particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// --- Rotating World Scene ---
function RotatingWorld({
  tracks,
  activeTrackId,
  onTrackChange,
}: {
  tracks: TrackLocation[];
  activeTrackId: string | null;
  onTrackChange: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollVelocityRef = useRef(0);
  const idleRotationRef = useRef(0.02);
  const currentEnvironmentRef = useRef<EnvironmentPreset | null>(null);
  const { scene } = useThree();

  // Scroll handler: maps scroll to rotation speed
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Accumulate scroll into velocity
      scrollVelocityRef.current += e.deltaY * 0.0001;
      // Clamp velocity
      scrollVelocityRef.current = Math.max(-0.15, Math.min(0.15, scrollVelocityRef.current));
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Decay scroll velocity toward idle when no input
    scrollVelocityRef.current += (idleRotationRef.current - scrollVelocityRef.current) * 0.02;

    // Apply rotation
    groupRef.current.rotation.y += scrollVelocityRef.current * delta * 10;

    // Check which track is closest to center (0°, Z-forward)
    const worldRotation = groupRef.current.rotation.y;
    let closestTrack: TrackLocation | null = null;
    let closestAngle = Infinity;

    tracks.forEach((track) => {
      // Calculate angle between track and camera forward
      const trackWorldAngle = track.angle + worldRotation;
      let diff = Math.abs(trackWorldAngle % (Math.PI * 2));
      if (diff > Math.PI) diff = Math.PI * 2 - diff;

      if (diff < closestAngle && diff < Math.PI / 9) { // Within 20°
        closestAngle = diff;
        closestTrack = track;
      }
    });

    if (closestTrack && closestTrack.id !== activeTrackId) {
      onTrackChange(closestTrack.id);
    }

    // Lerp environment to current track's preset
    if (closestTrack && currentEnvironmentRef.current !== closestTrack.environment) {
      const preset = closestTrack.environment;
      gsap.to(scene.fog, {
        color: preset.fogColor,
        density: preset.fogDensity,
        duration: 3,
        ease: "power2.inOut",
      });
      const ambientLight = scene.children.find(
        (c) => c.isAmbientLight
      ) as THREE.AmbientLight;
      if (ambientLight) {
        gsap.to(ambientLight.color, {
          r: new THREE.Color(preset.ambientColor).r,
          g: new THREE.Color(preset.ambientColor).g,
          b: new THREE.Color(preset.ambientColor).b,
          duration: 3,
          ease: "power2.inOut",
        });
      }
      currentEnvironmentRef.current = preset;
    }
  });

  return (
    <group ref={groupRef}>
      {tracks.map((track) => (
        <group
          key={track.id}
          position={track.position}
          rotation={[0, track.angle, 0]}
        >
          {/* Track location visual — floating geometry */}
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color={activeTrackId === track.id ? "#d4af37" : "#ffffff44"}
              emissive={activeTrackId === track.id ? "#d4af37" : "#000000"}
              emissiveIntensity={activeTrackId === track.id ? 0.5 : 0}
              transparent
            />
          </mesh>
          {/* Track title as 3D text */}
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
          >
            {track.name}
          </Text>
        </group>
      ))}
    </group>
  );
}

// --- Main Component ---
export default function MolaZoneExperience({ tracks }: { tracks: TrackLocation[] }) {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [showUI, setShowUI] = useState(true);
  const uiTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleTrackChange = useCallback((id: string) => {
    if (id === activeTrackId) return;
    // Crossfade audio
    if (activeTrackId) {
      audioManager.crossfade(activeTrackId, id);
    } else {
      audioManager.playTrack(id);
    }
    setActiveTrackId(id);
    // Show UI and reset timeout
    setShowUI(true);
    clearTimeout(uiTimeoutRef.current);
    uiTimeoutRef.current = setTimeout(() => setShowUI(false), 5000);
  }, [activeTrackId]);

  // Show UI on interaction
  useEffect(() => {
    const show = () => {
      setShowUI(true);
      clearTimeout(uiTimeoutRef.current);
      uiTimeoutRef.current = setTimeout(() => setShowUI(false), 5000);
    };
    window.addEventListener("pointermove", show);
    window.addEventListener("scroll", show);
    return () => {
      window.removeEventListener("pointermove", show);
      window.removeEventListener("scroll", show);
    };
  }, []);

  const activeTrack = tracks.find((t) => t.id === activeTrackId);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black">
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2(0x1a1a2e, 0.02);
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.5} />
        <EnvironmentParticles preset={tracks[0]?.environment || {
          fogColor: "#1a1a2e",
          fogDensity: 0.02,
          ambientColor: "#4a4a6e",
          particleCount: 500,
          particleColor: "#ffffff",
          particleVelocity: 0.5,
        }} />
        <RotatingWorld
          tracks={tracks}
          activeTrackId={activeTrackId}
          onTrackChange={handleTrackChange}
        />
      </Canvas>

      {/* Overlay UI — fades after 5s idle */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-100 transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0"
        }`}
      >
        {activeTrack && (
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <span className="text-xs text-white/80 font-light tracking-wider">
              {activeTrack.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Extraction For Template (Music / Artist Site)
- Rotating 3D world with scroll-mapped rotation speed
- Audio crossfade system triggered by proximity to 3D locations
- Environment state machine with interpolated fog/lighting/particle transitions (3-4s)
- Spatialized audio with frequency-based camera height mapping
- Auto-hiding "now playing" UI (5s idle timeout)
- Preloader with album art zoom + blur reveal of 3D world
- GSAP for environment transitions (fog color/density, ambient light color)

