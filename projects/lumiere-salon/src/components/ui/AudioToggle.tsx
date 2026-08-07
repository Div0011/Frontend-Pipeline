"use client";

import { useEffect, useRef, useState } from "react";

// Minimal audio manager — Howler not needed, Web Audio API works perfectly
class AudioManager {
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private source: AudioBufferSourceNode | null = null;
  private buffer: AudioBuffer | null = null;
  private isPlaying = false;

  async init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = 0;
    this.gainNode.connect(this.ctx.destination);

    // Generate atmospheric ambient tone procedurally — no file needed
    const sampleRate = this.ctx.sampleRate;
    const duration = 8; // 8-second loop
    const bufferSize = sampleRate * duration;
    this.buffer = this.ctx.createBuffer(2, bufferSize, sampleRate);

    for (let ch = 0; ch < 2; ch++) {
      const data = this.buffer.getChannelData(ch);
      // Low rumble + high shimmer — salon ambiance
      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;
        // Layered sine waves for atmospheric depth
        data[i] =
          Math.sin(2 * Math.PI * 40 * t) * 0.08 +    // sub bass
          Math.sin(2 * Math.PI * 80 * t) * 0.05 +    // bass
          Math.sin(2 * Math.PI * 220 * t) * 0.02 +   // mid shimmer
          (Math.random() * 2 - 1) * 0.015;            // white noise texture
        // Fade in/out for seamless loop
        if (i < sampleRate * 0.5) data[i] *= i / (sampleRate * 0.5);
        if (i > bufferSize - sampleRate * 0.5) data[i] *= (bufferSize - i) / (sampleRate * 0.5);
      }
    }
  }

  async unmute() {
    await this.init();
    if (!this.ctx || !this.buffer || !this.gainNode) return;
    if (this.ctx.state === "suspended") await this.ctx.resume();

    // Stop existing source
    this.source?.stop();
    this.source = this.ctx.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.loop = true;
    this.source.connect(this.gainNode);
    this.source.start(0);
    this.isPlaying = true;

    // Fade in
    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2);
  }

  mute() {
    if (!this.ctx || !this.gainNode) return;
    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
    setTimeout(() => {
      this.source?.stop();
      this.isPlaying = false;
    }, 1100);
  }

  playClick() {
    if (!this.ctx || !this.isPlaying) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.frequency.value = 1200;
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.1);
  }
}

export const audioManager = new AudioManager();

export default function AudioToggle() {
  const [muted, setMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // No audio on mobile per spec
  if (isMobile) return null;

  const toggle = async () => {
    if (muted) {
      await audioManager.unmute();
    } else {
      audioManager.mute();
    }
    audioManager.playClick();
    setMuted(!muted);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 hover:text-[#d4a574] border border-white/20 hover:border-[#d4a574]/50 px-4 py-2.5 transition-all duration-300 bg-black/40 backdrop-blur-sm cursor-pointer"
      aria-label={muted ? "Enable ambient sound" : "Disable ambient sound"}
    >
      {/* Animated sound bars */}
      <span className="flex items-end gap-[2px] h-3">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className="w-[2px] bg-current rounded-full transition-all duration-300"
            style={{
              height: muted ? "4px" : `${4 + bar * 3}px`,
              animation: muted ? "none" : `audioBar${bar} 0.8s ease-in-out infinite alternate`,
              animationDelay: `${bar * 0.1}s`,
            }}
          />
        ))}
      </span>
      {muted ? "SOUND" : "MUTE"}
    </button>
  );
}
