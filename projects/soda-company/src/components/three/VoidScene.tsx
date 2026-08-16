"use client";

import { Canvas } from "@react-three/fiber";
import FloatingFragments from "./FloatingFragments";

export default function VoidScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#f5f5f7"]} />
        <fog attach="fog" args={["#f5f5f7", 4, 20]} />

        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.7} color="#d4a574" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#bbbbbb" />

        <FloatingFragments count={120} />
      </Canvas>
    </div>
  );
}
