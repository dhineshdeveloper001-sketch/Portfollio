import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Context-Aware Reactive Cursor System
 * States:
 * - default: precision dot + smooth trailing ring
 * - button/link: magnetic halo expansion
 * - project/image: expanded frosted badge with "EXPLORE" or "VIEW" text
 * - tech tag / code: tech targeting brackets
 * - click: micro pulse feedback
 * Auto-disabled on mobile and touch devices
 */
const CreativeCursor = () => {
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'pointer' | 'view' | 'tech'
  const [customText, setCustomText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Exact raw coordinates for zero-latency inner dot
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Spring physics for trailing context halo
  const springX = useSpring(rawX, { damping: 26, stiffness: 320, mass: 0.4 });
  const springY = useSpring(rawY, { damping: 26, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    // Check touch and reduced motion
    const hasTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      // Check custom attribute first
      const viewEl = target.closest('[data-cursor="view"]');
      const exploreEl = target.closest('[data-cursor="explore"]');
      const techEl = target.closest('[data-cursor="tech"]');
      const clickableEl = target.closest('button, a, input, textarea, select, [role="button"], .btn-primary, .btn-secondary, .cursor-pointer');

      if (viewEl) {
        setCursorMode('view');
        setCustomText('VIEW');
      } else if (exploreEl) {
        setCursorMode('view');
        setCustomText('EXPLORE');
      } else if (techEl) {
        setCursorMode('tech');
        setCustomText('');
      } else if (clickableEl) {
        setCursorMode('pointer');
        setCustomText('');
      } else {
        setCursorMode('default');
        setCustomText('');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [rawX, rawY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Instant Center Dot */}
      <motion.div
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className={`w-1.5 h-1.5 rounded-full transition-transform duration-100 ${
          cursorMode === 'view' ? 'opacity-0' : 'bg-white shadow-[0_0_8px_#ff1e42]'
        }`}
      />

      {/* 2. Spring Physics Trailing Context Halo */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicking ? 0.85 : 1,
          width: cursorMode === 'view' ? 76 : cursorMode === 'pointer' ? 44 : cursorMode === 'tech' ? 32 : 28,
          height: cursorMode === 'view' ? 32 : cursorMode === 'pointer' ? 44 : cursorMode === 'tech' ? 32 : 28,
          borderRadius: cursorMode === 'view' ? '12px' : '9999px',
          borderColor:
            cursorMode === 'view'
              ? 'rgba(0, 212, 255, 0.6)'
              : cursorMode === 'pointer'
              ? 'rgba(255, 30, 66, 0.5)'
              : 'rgba(255, 255, 255, 0.25)',
          backgroundColor:
            cursorMode === 'view'
              ? 'rgba(12, 16, 24, 0.85)'
              : cursorMode === 'pointer'
              ? 'rgba(255, 30, 66, 0.08)'
              : 'transparent'
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.3
        }}
        className="fixed top-0 left-0 border backdrop-blur-[2px] flex items-center justify-center pointer-events-none select-none transition-colors duration-200"
      >
        {cursorMode === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[0.62rem] font-mono font-bold tracking-wider text-[#00d4ff]"
          >
            {customText || 'VIEW'}
          </motion.span>
        )}

        {cursorMode === 'tech' && (
          <span className="text-[0.62rem] font-mono text-[#ff1e42] font-black">
            +
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(CreativeCursor);
