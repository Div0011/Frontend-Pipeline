"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lenisScrollRef } from "../LenisProvider";

export type Mood = "arrival" | "consultation" | "transformation" | "reveal" | "departure";

const WAYPOINTS = [
  {
    pos: [0, 2, 15] as [number, number, number],
    look: [0, 0, 0] as [number, number, number],
    mood: "arrival" as Mood,
  },
  {
    pos: [3, 1, 3] as [number, number, number],
    look: [0, 1, 0] as [number, number, number],
    mood: "consultation" as Mood,
  },
  {
    pos: [-2, 0, 2] as [number, number, number],
    look: [1, 0, -1] as [number, number, number],
    mood: "transformation" as Mood,
  },
  {
    pos: [0, 0, 0.5] as [number, number, number],
    look: [0, 0, 0] as [number, number, number],
    mood: "reveal" as Mood,
  },
  {
    pos: [0, 5, 20] as [number, number, number],
    look: [0, 2, 0] as [number, number, number],
    mood: "departure" as Mood,
  },
];

// Cinematic cubic ease for camera movement weight
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const _from = new THREE.Vector3();
const _to = new THREE.Vector3();
const _lookFrom = new THREE.Vector3();
const _lookTo = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();

export function useActiveMood(): Mood {
  const moodRef = useRef<Mood>("arrival");

  useFrame(() => {
    // Read from the shared Lenis scroll ref — same source as DOM ScrollTrigger
    const offset = Math.max(0, Math.min(1, lenisScrollRef.current));
    const t = offset * (WAYPOINTS.length - 1);
    const i = Math.min(Math.floor(t), WAYPOINTS.length - 2);
    moodRef.current = WAYPOINTS[i].mood;
  });

  return moodRef.current;
}

export default function CameraRig() {
  useFrame(({ camera }) => {
    // CRITICAL FIX: Read from Lenis shared ref, NOT window.scrollY
    // This ensures 3D camera and DOM text are always in sync
    const offset = Math.max(0, Math.min(1, lenisScrollRef.current));
    const t = offset * (WAYPOINTS.length - 1);
    const i = Math.min(Math.floor(t), WAYPOINTS.length - 2);
    const localT = easeInOutCubic(t - i); // cinematic easing within segment
    const a = WAYPOINTS[i];
    const b = WAYPOINTS[i + 1];

    _from.set(...a.pos);
    _to.set(...b.pos);
    _lookFrom.set(...a.look);
    _lookTo.set(...b.look);

    camera.position.lerpVectors(_from, _to, localT);
    _lookTarget.lerpVectors(_lookFrom, _lookTo, localT);
    camera.lookAt(_lookTarget);
  });

  return null;
}
