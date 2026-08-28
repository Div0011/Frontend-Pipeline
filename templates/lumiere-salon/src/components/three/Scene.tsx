"use client";

import { Canvas } from "@react-three/fiber";
import CameraRig, { useActiveMood } from "./CameraRig";
import { HairStrandArchitecture } from "./HairStrandArchitecture";
import { MirrorTools } from "./MirrorTools";
import { ParticleField } from "./ParticleField";
import { GoldenLightBurst } from "./GoldenLightBurst";
import { PostProcessingStack } from "./PostProcessingStack";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 55, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <CameraRig />
        <SceneContent />
      </Canvas>
    </div>
  );
}

function SceneContent() {
  const mood = useActiveMood();

  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 8, 35]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#d4a574" />
      <pointLight position={[-5, 2, -5]} intensity={0.3} color="#d4a574" />
      <pointLight position={[0, 5, 0]} intensity={0.2} color="#fff8e7" />

      <HairStrandArchitecture visible={mood === "arrival"} />
      <MirrorTools visible={mood === "consultation"} />
      <ParticleField visible={mood === "transformation"} />
      <GoldenLightBurst intensity={1.2} visible={mood === "reveal"} />

      {/* PostProcessing last — receives live mood */}
      <PostProcessingStack mood={mood} />
    </>
  );
}
