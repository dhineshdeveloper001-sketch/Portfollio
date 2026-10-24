import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[99999] pointer-events-none bg-black/40">
      {/* Red Web Line Progress Bar */}
      <motion.div
        className="h-full bg-gradient-to-r from-[#e62429] via-[#ff4d4d] to-[#ffd700] shadow-[0_0_12px_#e62429] relative"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.05, ease: 'easeOut' }}
      >
        {/* Moving Spider Icon at leading edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-xs drop-shadow-[0_0_8px_#e62429]">
          🕷️
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollProgress;
