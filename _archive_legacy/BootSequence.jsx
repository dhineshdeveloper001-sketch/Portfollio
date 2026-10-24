import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playOpenSound } from '../utils/soundEffects';

/**
 * Cinematic Digital Identity Boot Sequence
 * DK ➔ DHINESHKUMAR ➔ Full Stack Developer & GenAI ➔ Dissolve into Portfolio
 */
const BootSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: DK, 1: Dhineshkumar, 2: Role reveal, 3: Dissolve exit
  const [hasSkipped, setHasSkipped] = useState(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem('dk_boot_completed', 'true');
    } catch (e) {}
    setHasSkipped(true);
    onComplete();
  }, [onComplete]);

  // Handle keyboard shortcut (Escape, Space, Enter)
  useEffect(() => {
    const handleKey = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        finish();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [finish]);

  // Sequence progression
  useEffect(() => {
    // Check if previously played in this browser session
    try {
      const alreadyPlayed = sessionStorage.getItem('dk_boot_completed');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (alreadyPlayed === 'true' || prefersReduced) {
        finish();
        return;
      }
    } catch (e) {}

    const t1 = setTimeout(() => {
      setPhase(1); // Morph to DHINESHKUMAR
    }, 700);

    const t2 = setTimeout(() => {
      setPhase(2); // Reveal Full Stack Developer & GenAI
      playOpenSound();
    }, 1450);

    const t3 = setTimeout(() => {
      setPhase(3); // Start exit animation
    }, 2250);

    const t4 = setTimeout(() => {
      finish();
    }, 2550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [finish]);

  if (hasSkipped) return null;

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={finish}
          className="fixed inset-0 z-[999999] bg-[#040508] text-white flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none font-body"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,30,66,0.12)_0%,rgba(0,212,255,0.06)_40%,transparent_70%)] pointer-events-none" />

          {/* Micro Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Laser Scanline Effect */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '200%' }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#00d4ff]/10 to-transparent pointer-events-none"
          />

          {/* Center Identity Stage */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
            
            {/* Top Telemetry Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[0.7rem] font-mono text-slate-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e42] animate-pulse" />
              <span>SYS_IDENTITY // BOOTLOADER v3.2</span>
              <span className="text-emerald-400 font-bold ml-1">READY</span>
            </motion.div>

            {/* Kinetic Identity Transformation Stage */}
            <div className="relative h-20 sm:h-24 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {phase === 0 ? (
                  /* Step 1: DK Monogram with Glowing Geometric Bracket */
                  <motion.div
                    key="dk-initial"
                    initial={{ scale: 0.7, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ scale: 1.15, opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center gap-3 font-display font-black text-6xl sm:text-7xl tracking-tighter"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#ff1e42] drop-shadow-[0_0_30px_rgba(255,30,66,0.6)]">
                      DK
                    </span>
                    <span className="text-[#00d4ff] text-4xl animate-pulse">_</span>
                  </motion.div>
                ) : (
                  /* Step 2: DHINESHKUMAR Fully Assembled with Light Sweep */
                  <motion.div
                    key="full-name"
                    initial={{ opacity: 0, letterSpacing: '0.3em', scale: 0.95 }}
                    animate={{ opacity: 1, letterSpacing: '0.04em', scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white flex items-center gap-1.5"
                  >
                    <span className="relative">
                      Dhineshkumar
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff1e42] via-[#00d4ff] to-transparent" />
                    </span>
                    <span className="text-[#ff1e42]">J</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 3: Subtitle reveal */}
            <div className="h-8 mt-4 overflow-hidden">
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-slate-300"
                  >
                    <span className="text-[#00d4ff] font-semibold">Full Stack Developer</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[#ff1e42] font-semibold">GenAI Engineer</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Track */}
            <div className="w-48 sm:w-56 h-[3px] bg-white/[0.08] rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#ff1e42] via-[#00d4ff] to-[#10b981]"
              />
            </div>

            {/* System Status Metrics */}
            <div className="flex items-center gap-3 mt-3 text-[0.65rem] font-mono text-slate-500">
              <span>JAVA_21: ONLINE</span>
              <span>SPRING: ACTIVE</span>
              <span>REACT: HYDRATING</span>
            </div>

          </div>

          {/* Skip Hint */}
          <div className="absolute bottom-6 right-6 text-[0.7rem] font-mono text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06]">
            <span>Click or press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.1] text-white text-[0.62rem]">ESC</kbd>
            <span>to skip</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(BootSequence);
