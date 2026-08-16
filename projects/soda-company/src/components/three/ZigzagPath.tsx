"use client";

import { useMemo } from "react";
import * as THREE from "three";

export type ZigzagPoint = {
  x: number;
  y: number;
  z: number;
};

function lerp(a: THREE.Vector3, b: THREE.Vector3, t: number): THREE.Vector3 {
  return new THREE.Vector3().lerpVectors(a, b, t);
}

export function getZigzagPath(): ZigzagPoint[] {
  return [
    { x: 2.5, y: 1.8, z: 1.5 },
    { x: -2.5, y: 1.2, z: 1.5 },
    { x: 2.5, y: 0.6, z: 1.5 },
    { x: -2.5, y: 0.0, z: 1.5 },
    { x: 2.5, y: -0.6, z: 1.5 },
    { x: -2.5, y: -1.2, z: 1.5 },
    { x: 2.5, y: -1.8, z: 1.5 },
  ];
}

export function getPositionOnZigzag(progress: number): THREE.Vector3 {
  const path = getZigzagPath();
  const safeProgress = Math.max(0, Math.min(1, progress));
  const totalSegments = path.length - 1;
  const segmentFloat = safeProgress * totalSegments;
  const index = Math.min(Math.floor(segmentFloat), totalSegments - 1);
  const t = segmentFloat - index;

  const a = new THREE.Vector3(path[index].x, path[index].y, path[index].z);
  const b = new THREE.Vector3(path[Math.min(index + 1, path.length - 1)].x, path[Math.min(index + 1, path.length - 1)].y, path[Math.min(index + 1, path.length - 1)].z);

  return lerp(a, b, t);
}

export function useZigzagPath() {
  return useMemo(() => getZigzagPath(), []);
}
