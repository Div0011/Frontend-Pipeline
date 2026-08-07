"use client";

import { useRef } from "react";
import { ArrowRight, Play, Server, Shield, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Scene from "@/components/three/Scene";

export default function Hero() {
  const progressRef = useRef(0.2);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen bg-[#090a0f] text-white overflow-hidden pt-32 pb-20 flex items-center border-b border-white/10"
    >
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7000ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 text-xs font-mono text-[#00f0ff] mb-8 w-fit shadow-lg shadow-[#00f0ff]/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
            </span>
            QUANTUM EDGE MESH v4.2 // 284 NODES ONLINE
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] uppercase">
            Autonomous
            <br />
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#7000ff] to-[#ff00a0] bg-clip-text text-transparent">
              Edge Engine.
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-lg font-mono font-light">
            Deploy to 284 ultra-low latency edge points of presence. Observe every micro-transaction in real time with zero cold starts.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-[#00f0ff] hover:bg-[#00d0df] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-none px-8 shadow-xl shadow-[#00f0ff]/20 cursor-pointer"
            >
              Deploy Edge Mesh
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest rounded-none px-6 cursor-pointer"
            >
              <Play className="mr-2 h-4 w-4 fill-white" />
              Interactive Demo
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { label: "EDGE UPTIME", value: "99.999%", icon: Server },
              { label: "SECURITY", value: "SOC 2 TYPE II", icon: Shield },
              { label: "LATENCY", value: "0.4 MS", icon: Cpu },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-1.5 text-[#00f0ff] text-[10px] tracking-widest uppercase font-mono mb-1">
                  <stat.icon className="h-3.5 w-3.5" />
                  {stat.label}
                </div>
                <div className="font-mono text-xl font-bold text-white tracking-tight">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D WebGL Canvas Scene */}
        <div className="lg:col-span-6 h-[500px] w-full relative bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-4 left-4 z-20 font-mono text-[10px] uppercase text-[#00f0ff] tracking-widest flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> THREE.JS WEBGL // INTERACTIVE ARCHITECTURE MESH
          </div>
          <Scene isExploded={true} progressRef={progressRef} />
        </div>
      </div>
    </section>
  );
}

