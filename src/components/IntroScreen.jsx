import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Cinematic Brand Reveal Intro Screen
 * Sequence:
 * Step 1: "DK" monogram entrance with cinematic blur-to-sharp, scale, and subtle crimson glow
 * Step 2: Smooth morph / expansion into "Dhineshkumar J" with letter-spacing transition and subtitle
 * Step 3: Seamless dissolve & scale exit into the live portfolio
 */
const IntroScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(1); // 1: DK, 2: Dhineshkumar J morph, 3: exit
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const handleFinish = useCallback(() => {
    sessionStorage.setItem('introShown', 'true');
    sessionStorage.setItem('portfolioIntroPlayed', 'true');
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  // Session check & reduced motion bypass
  useEffect(() => {
    const introPlayed = sessionStorage.getItem('introShown') || sessionStorage.getItem('portfolioIntroPlayed');
    if (introPlayed || prefersReducedMotion) {
      sessionStorage.setItem('introShown', 'true');
      setIsVisible(false);
      onComplete?.();
    }
  }, [prefersReducedMotion, onComplete]);

  // Precise brand reveal timing sequence (~2.6s total)
  useEffect(() => {
    if (!isVisible) return;

    // Step 1 -> Step 2: Morph into full name after 1.0s
    const step2Timer = setTimeout(() => {
      setStep(2);
    }, 1000);

    // Step 2 -> Step 3: Dissolve exit after 2.4s
    const exitTimer = setTimeout(() => {
      setStep(3);
    }, 2400);

    // Complete intro at 2.7s
    const finishTimer = setTimeout(() => {
      handleFinish();
    }, 2750);

    return () => {
      clearTimeout(step2Timer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [isVisible, handleFinish]);

  // Keyboard skip
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (['Space', 'Enter', 'Escape'].includes(e.code) || e.key === ' ' || e.key === 'Escape') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleFinish]);

  // Prevent scroll during intro
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="brand-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(8px)',
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[999999] bg-[#030303] flex items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Light Field */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.85, 1.15, 1], opacity: [0.2, 0.45, 0.3] }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
            className="absolute w-[650px] h-[650px] bg-gradient-to-br from-[#ff0a2d]/20 via-[#00d4ff]/10 to-transparent rounded-full blur-[150px] pointer-events-none"
          />

          {/* Minimalist Geometric Ambient Grid Frame */}
          <div className="absolute inset-8 sm:inset-12 border border-white/[0.04] rounded-3xl pointer-events-none flex flex-col justify-between p-6">
            <div className="flex justify-between items-center text-[0.68rem] font-mono text-white/30">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff0a2d] animate-ping inline-block" />
                SYSTEM INITIALIZING
              </span>
              <span>EST. 2026</span>
            </div>
            <div className="flex justify-between items-center text-[0.65rem] font-mono text-white/20">
              <span>DHINESHKUMAR J</span>
              <span>FULL STACK & GENAI</span>
            </div>
          </div>

          {/* Content Morph Area */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1-dk"
                  initial={{ opacity: 0, scale: 0.75, filter: 'blur(16px)', letterSpacing: '0.4em' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '0.2em' }}
                  exit={{ opacity: 0, scale: 1.12, filter: 'blur(12px)', letterSpacing: '0.3em' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-black text-[clamp(4.5rem,14vw,10rem)] leading-none text-white tracking-widest"
                  style={{
                    textShadow: '0 0 35px rgba(255, 10, 45, 0.65), 0 0 70px rgba(0, 212, 255, 0.25)'
                  }}
                >
                  D<span className="text-[#ff0a2d]">K</span>
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div
                  key="step2-fullname"
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(14px)', letterSpacing: '0.05em' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '0.02em' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h1
                    className="font-display font-extrabold text-[clamp(2.4rem,7.5vw,5.5rem)] text-white uppercase tracking-tight leading-none"
                    style={{
                      textShadow: '0 0 30px rgba(255, 10, 45, 0.5), 0 0 60px rgba(0, 212, 255, 0.2)'
                    }}
                  >
                    Dhineshkumar <span className="text-[#ff0a2d]">J</span>
                  </h1>

                  {/* Horizontal Energy Divider Line */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-[#ff0a2d] to-transparent w-48 sm:w-72 mx-auto shadow-[0_0_12px_#ff0a2d]"
                  />

                  {/* Subtitle Badge */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.25 }}
                    className="font-mono text-xs sm:text-sm text-[#00d4ff] uppercase tracking-[0.25em] font-semibold"
                  >
                    Full Stack Developer & GenAI
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip Intro Button */}
          <button
            onClick={handleFinish}
            aria-label="Skip introduction animation"
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-[#ff0a2d] border border-white/15 hover:border-[#ff0a2d] text-white/70 hover:text-white text-[0.7rem] font-mono transition-all duration-300 z-50 cursor-pointer shadow-lg backdrop-blur-md"
          >
            Skip Intro [ESC]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(IntroScreen);
