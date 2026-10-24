/**
 * SoundEngine: Zero-asset Web Audio API synthesizer
 * Subtle, cinematic, and responsive micro-sounds
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private _muted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem("dk_portfolio_sound_muted");
      if (saved !== null) {
        this._muted = JSON.parse(saved);
      }
    } catch {
      this._muted = false;
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this._muted ? 0 : 0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public get isMuted(): boolean {
    return this._muted;
  }

  public setMuted(muted: boolean) {
    this._muted = muted;
    try {
      localStorage.setItem("dk_portfolio_sound_muted", JSON.stringify(muted));
    } catch {
      // ignore
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.35, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this._muted);
    return this._muted;
  }

  // 1. Subtle UI Hover (high-passed soft click)
  public hover() {
    if (this._muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  // 2. UI Click (crisp tech click)
  public click() {
    if (this._muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // ignore
    }
  }

  // 3. Toggle (two-tone pip)
  public toggle(state: boolean) {
    if (this._muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const startFreq = state ? 440 : 880;
      const endFreq = state ? 880 : 440;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }

  // 4. Whoosh (sweeping filtered noise / pitch)
  public whoosh() {
    if (this._muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(now + 0.26);
    } catch {
      // ignore
    }
  }

  // 5. Red Shockwave Pulse (sub bass swell)
  public pulse() {
    if (this._muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(now + 0.36);
    } catch {
      // ignore
    }
  }

  // 6. Intro Sequence Reveal (cinematic bass boom & rising resonance)
  public introReveal() {
    if (this._muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = "sine";
      sub.frequency.setValueAtTime(55, now);
      sub.frequency.exponentialRampToValueAtTime(35, now + 1.2);

      subGain.gain.setValueAtTime(0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      sub.connect(subGain);
      subGain.connect(this.masterGain);

      sub.start();
      sub.stop(now + 1.2);

      // Shimmer overlay
      const shimmer = ctx.createOscillator();
      const sGain = ctx.createGain();
      shimmer.type = "triangle";
      shimmer.frequency.setValueAtTime(220, now + 0.2);
      shimmer.frequency.exponentialRampToValueAtTime(880, now + 0.8);

      sGain.gain.setValueAtTime(0.001, now);
      sGain.gain.setValueAtTime(0.06, now + 0.2);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      shimmer.connect(sGain);
      sGain.connect(this.masterGain);

      shimmer.start(now + 0.2);
      shimmer.stop(now + 0.9);
    } catch {
      // ignore
    }
  }

  // 7. Logic Game Match
  public match() {
    if (this._muted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.08, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.16);
      });
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
