"use client";

// Web Audio API Ambient Soundscape & Dynamic Micro-SFX Engine

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isInitialized = false;
  private isMuted = false;
  private volume = 0.4;
  private lastScrollTime = 0;

  public init() {
    if (this.isInitialized || typeof window === "undefined") return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Analyser node for UI visualizer
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Lowpass Filter for cinematic warmth
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3, this.ctx.currentTime);

      // Drone Gain
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.droneGain.connect(this.filter);
      this.filter.connect(this.masterGain);

      // Oscillator 1: Deep Sine (55Hz - A1)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);
      this.osc1.connect(this.droneGain);
      this.osc1.start();

      // Oscillator 2: Warm Triangle (110Hz - A2, slightly detuned +2.5Hz for chorusing)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "triangle";
      this.osc2.frequency.setValueAtTime(112.5, this.ctx.currentTime);
      
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.osc2.connect(subGain);
      subGain.connect(this.droneGain);
      this.osc2.start();

      // LFO for organic filter modulation (breathing effect)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(40, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public triggerScrollClick(velocity: number = 1) {
    if (!this.ctx || this.isMuted || !this.isInitialized) return;
    const now = Date.now();
    if (now - this.lastScrollTime < 70) return; // Throttle sound rate
    this.lastScrollTime = now;

    try {
      this.resume();
      // Film reel click micro-sound
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      const pitch = 300 + Math.min(600, Math.abs(velocity) * 80);
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Audio context state recovery fallback
    }
  }

  public triggerHoverClick() {
    if (!this.ctx || this.isMuted || !this.isInitialized) return;

    try {
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {
      // Ignore
    }
  }

  public getFrequencyData(dataArray: Uint8Array): void {
    if (this.analyser) {
      // Cast dataArray for TS compatibility
      this.analyser.getByteFrequencyData(dataArray as unknown as Uint8Array<ArrayBuffer>);
    }
  }
}

export const soundEngine = new SoundEngine();
