/**
 * Web Audio API Synthesizer for Micro-Interactions
 * Zero external audio assets required; synthesized in real-time.
 * Default is MUTED to respect user preferences.
 */

let audioCtx = null;
let isAudioMuted = true; // default muted

// Check localStorage for audio preference if present
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('portfolio_audio_enabled');
    if (saved === 'true') {
      isAudioMuted = false;
    }
  } catch (e) {}
}

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const isSoundEnabled = () => !isAudioMuted;

export const toggleSound = () => {
  isAudioMuted = !isAudioMuted;
  try {
    localStorage.setItem('portfolio_audio_enabled', String(!isAudioMuted));
  } catch (e) {}
  if (!isAudioMuted) {
    playNotificationSound();
  }
  return !isAudioMuted;
};

export const setSoundEnabled = (enabled) => {
  isAudioMuted = !enabled;
  try {
    localStorage.setItem('portfolio_audio_enabled', String(enabled));
  } catch (e) {}
};

/**
 * Ultra-subtle click tick (for buttons)
 */
export const playClickSound = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch (e) {}
};

/**
 * Soft micro-tick for hover
 */
export const playHoverSound = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.025);
  } catch (e) {}
};

/**
 * Futuristic chime on project modal or command open
 */
export const playOpenSound = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.035);

      gain.gain.setValueAtTime(0.025, ctx.currentTime + idx * 0.035);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.035 + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.035);
      osc.stop(ctx.currentTime + idx * 0.035 + 0.2);
    });
  } catch (e) {}
};

/**
 * Notification / Toggle feedback
 */
export const playNotificationSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.11);
  } catch (e) {}
};
