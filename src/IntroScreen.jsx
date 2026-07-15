import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState('dk'); // phases: 'dk' -> 'fullname'

  useEffect(() => {
    // 6. Play only once per browser session
    const hasPlayed = sessionStorage.getItem('introPlayed');
    
    if (!hasPlayed) {
      setIsVisible(true);
      
      // 3. After 1.5 seconds: zoom out DK and transform into "Dhinesh Kumar"
      const phaseTimer = setTimeout(() => {
        setPhase('fullname');
      }, 1500);

      // 4. After another 1.5 seconds: fade out the entire intro screen
      const fadeOutTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('introPlayed', 'true');
      }, 3000);

      return () => {
        clearTimeout(phaseTimer);
        clearTimeout(fadeOutTimer);
      };
    }
  }, []);

  // 9. Prevent scrolling/layout shifts while intro is playing
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#030303', // 8. Deep dark theme
            zIndex: 999999, // Overlay on top of everything
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <AnimatePresence mode="wait">
            {phase === 'dk' && (
              <motion.div
                key="dk-text"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }} // Smoothly zooms out and blurs
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(5rem, 15vw, 12rem)', // 7. Scales perfectly on all devices
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  // 8. Match black/red theme with red neon glow effect
                  textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.5), 0 0 80px rgba(255, 0, 0, 0.3)',
                  fontFamily: '"Inter", system-ui, -apple-system, sans-serif'
                }}
              >
                DK
              </motion.div>
            )}

            {phase === 'fullname' && (
              <motion.div
                key="fullname-text"
                initial={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 1.05, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(2rem, 8vw, 6rem)', // 7. Mobile responsive scaling
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                  padding: '0 20px',
                  whiteSpace: 'nowrap'
                }}
              >
                Dhinesh Kumar
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
