import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/soundEngine";

export function IntroSequence() {
  const [phase, setPhase] = useState<number>(0); // 0: init, 1: draw, 2: name/type, 3: split seam, 4: complete
  const [telemetry, setTelemetry] = useState({ fps: 60, lat: "12.0012°N", alt: "128m" });

  useEffect(() => {
    // Check session storage
    try {
      if (sessionStorage.getItem("dk_intro_seen") === "true") {
        setPhase(4);
        return;
      }
    } catch {
      // ignore
    }

    // Play low bass swell
    sound.introReveal();

    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1900);
    const t4 = setTimeout(() => {
      setPhase(4);
      try {
        sessionStorage.setItem("dk_intro_seen", "true");
      } catch {
        // ignore
      }
    }, 2600);

    // Telemetry tick
    const interval = setInterval(() => {
      setTelemetry({
        fps: 59 + Math.floor(Math.random() * 3),
        lat: `12.${Math.floor(1000 + Math.random() * 8999)}°N`,
        alt: `${125 + Math.floor(Math.random() * 6)}m`
      });
    }, 120);

    // ESC key listener to skip
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const skip = () => {
    setPhase(4);
    try {
      sessionStorage.setItem("dk_intro_seen", "true");
    } catch {
      // ignore
    }
  };

  if (phase === 4) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-auto overflow-hidden">
        {/* Top-right Skip button */}
        <button
          onClick={skip}
          className="absolute top-6 right-6 z-50 text-xs font-mono text-[#94A3B8] hover:text-[#FF1E1E] transition-colors border border-white/10 hover:border-[#FF1E1E]/50 px-3 py-1.5 rounded bg-black/60 backdrop-blur"
        >
          [ SKIP · ESC ]
        </button>

        {/* Top-left Telemetry HUD */}
        <div className="absolute top-6 left-6 z-50 text-[10px] font-mono text-[#64748B] flex gap-4 pointer-events-none">
          <span>FPS: {telemetry.fps}</span>
          <span>LAT: {telemetry.lat}</span>
          <span>ALT: {telemetry.alt}</span>
        </div>

        {/* Phase 3 Split Panels: Top and Bottom */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: phase >= 3 ? "-100%" : 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#050505] border-b border-[#FF1E1E]/80 shadow-[0_10px_30px_rgba(255,30,30,0.4)]"
        />
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: phase >= 3 ? "100%" : 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050505] border-t border-[#FF1E1E]/80 shadow-[0_-10px_30px_rgba(255,30,30,0.4)]"
        />

        {/* Central Content */}
        <div className="relative z-40 w-full h-full flex flex-col items-center justify-center pointer-events-none px-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* SVG Stroke Monogram */}
            <motion.svg
              width="90"
              height="90"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_0_20px_rgba(255,30,30,0.6)]"
              animate={phase >= 2 ? { x: -10 } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.path
                d="M 20 20 L 20 80 L 45 80 C 65 80 65 20 45 20 Z"
                fill="none"
                stroke="#FF1E1E"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M 68 20 L 68 80 M 88 20 L 68 50 L 92 80"
                fill="none"
                stroke="#FF1E1E"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              />
            </motion.svg>

            {/* Revealed Name & Title */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                className="text-center md:text-left"
              >
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-ui">
                  DHINESHKUMAR J
                </h1>
                <p className="text-xs md:text-sm font-mono text-[#FF1E1E] mt-1 tracking-widest uppercase">
                  FULL STACK DEVELOPER · GENAI ENTHUSIAST
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
