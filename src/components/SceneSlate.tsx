import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pulseBus } from "../utils/pulseBus";
import { CAMERA_KEYFRAMES } from "../three/cameraScript";
import { sound } from "../utils/soundEngine";

export function SceneSlate() {
  const [currentSlate, setCurrentSlate] = useState<{
    sceneNum: string;
    take: string;
    title: string;
  } | null>(null);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return pulseBus.subscribe((actIdx) => {
      const kf = CAMERA_KEYFRAMES[actIdx];
      if (!kf) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      setCurrentSlate({
        sceneNum: kf.actNumber,
        take: "01",
        title: kf.actTitle
      });

      sound.whoosh();

      if (!prefersReducedMotion) {
        timerRef.current = window.setTimeout(() => {
          setCurrentSlate(null);
        }, 850);
      }
    });
  }, []);

  if (!currentSlate) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.2 }}
        className="fixed top-20 right-6 md:right-12 z-40 pointer-events-none select-none font-mono"
      >
        <div className="bg-[#050505]/90 border border-[#FF1E1E]/60 rounded px-4 py-2 shadow-[0_0_25px_rgba(255,30,30,0.35)] backdrop-blur-md">
          {/* Clapperboard chevron stripes */}
          <div className="w-full h-1.5 flex overflow-hidden mb-1.5 rounded-sm">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i % 2 === 0 ? "bg-[#FF1E1E]" : "bg-white"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wider">
            <span className="text-[#FF1E1E]">SCENE {currentSlate.sceneNum}</span>
            <span className="text-white/40">·</span>
            <span>TAKE {currentSlate.take}</span>
            <span className="text-white/40">·</span>
            <span className="text-[#94A3B8]">{currentSlate.title}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
