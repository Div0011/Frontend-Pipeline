// Web Audio API Procedural Sound Synthesizers (No external audio file dependencies needed)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a realistic, crisp cookie snap/crack sound
 */
export function playCookieCrack() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Sharp Snap Transient (Resonant Bandpass Click)
  const snapOsc = ctx.createOscillator();
  const snapGain = ctx.createGain();
  snapOsc.type = 'triangle';
  snapOsc.frequency.setValueAtTime(480, now);
  snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

  snapGain.gain.setValueAtTime(0.4, now);
  snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  snapOsc.connect(snapGain);
  snapGain.connect(ctx.destination);

  snapOsc.start(now);
  snapOsc.stop(now + 0.09);

  // 2. Granular Crumb Crunch Noise
  const bufferSize = ctx.sampleRate * 0.15;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.035));
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2400, now);
  filter.Q.setValueAtTime(3.5, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.35, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  noiseSource.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noiseSource.start(now);
  noiseSource.stop(now + 0.15);
}

/**
 * Liquid Pouring Sound Controller for the Hero frame sequence scroll
 */
export class CoffeePourController {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private filter1: BiquadFilterNode | null = null;
  private filter2: BiquadFilterNode | null = null;
  private isPlaying = false;
  private lastIntensity = 0;
  private fadeTimeout: NodeJS.Timeout | null = null;

  private init() {
    this.ctx = getAudioContext();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Pink/Brown noise for liquid trickle
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.96 * b1 + white * 0.15;
      b2 = 0.86 * b2 + white * 0.3;
      output[i] = (b0 + b1 + b2) * 0.08;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Fluid cavity resonance filters
    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.value = 850;
    filter1.Q.value = 4.0;

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.value = 1400;

    const gainNode = this.ctx.createGain();
    gainNode.gain.value = 0.0001;

    noiseSource.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    noiseSource.start();

    this.noiseNode = noiseSource;
    this.gainNode = gainNode;
    this.filter1 = filter1;
    this.filter2 = filter2;
    this.isPlaying = true;
  }

  public setPourIntensity(intensity: number) {
    // intensity: 0 to 1
    if (!this.isPlaying && intensity > 0.05) {
      this.init();
    }
    if (!this.ctx || !this.gainNode || !this.filter1) return;

    const targetGain = Math.min(0.22, intensity * 0.22);
    const targetFreq = 700 + intensity * 600; // Liquid pitch shifts as stream fills cup

    const now = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.08);

    this.filter1.frequency.cancelScheduledValues(now);
    this.filter1.frequency.linearRampToValueAtTime(targetFreq, now + 0.08);

    this.lastIntensity = intensity;

    if (this.fadeTimeout) clearTimeout(this.fadeTimeout);
    if (intensity > 0.02) {
      this.fadeTimeout = setTimeout(() => {
        if (this.gainNode && this.ctx) {
          const t = this.ctx.currentTime;
          this.gainNode.gain.linearRampToValueAtTime(0.0001, t + 0.2);
        }
      }, 150);
    }
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      const t = this.ctx.currentTime;
      this.gainNode.gain.linearRampToValueAtTime(0.0001, t + 0.1);
    }
  }
}

export const coffeePourSound = new CoffeePourController();
