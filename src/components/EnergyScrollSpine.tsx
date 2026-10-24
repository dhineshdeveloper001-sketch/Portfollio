import React from "react";
import { useScrollProgress } from "../utils/useScrollProgress";
import { CAMERA_KEYFRAMES } from "../three/cameraScript";

export function EnergyScrollSpine() {
  const progress = useScrollProgress();

  const acts = CAMERA_KEYFRAMES.map((kf, i) => ({
    id: kf.id,
    number: kf.actNumber,
    title: kf.actTitle,
    target: kf.scrollStart,
    active: progress >= kf.scrollStart && (i === CAMERA_KEYFRAMES.length - 1 || progress < CAMERA_KEYFRAMES[i + 1].scrollStart)
  }));

  const jumpToAct = (scrollStart: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollStart * docHeight,
      behavior: "smooth"
    });
  };

  return (
    <aside
      aria-label="Scene Navigator"
      className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center pointer-events-none select-none"
    >
      <div className="relative w-8 h-80 flex flex-col items-center justify-between pointer-events-auto">
        {/* SVG Energy Circuit Trace Track */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 left-1/2 -translate-x-1/2 overflow-hidden rounded">
          <div
            className="w-full bg-gradient-to-b from-[#FF1E1E] to-[#DC2626] shadow-[0_0_12px_#FF1E1E] transition-all duration-75"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        {/* 8 Node Dots */}
        {acts.map((act) => (
          <button
            key={act.id}
            onClick={() => jumpToAct(act.target)}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
            aria-label={`Jump to Scene ${act.number}: ${act.title}`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                act.active
                  ? "bg-[#FF1E1E] border-[#FF1E1E] scale-125 shadow-[0_0_10px_#FF1E1E]"
                  : "bg-[#0A0A0E] border-white/20 group-hover:border-[#FF1E1E]"
              }`}
            />
            {/* Hover Tooltip Label */}
            <span className="absolute left-6 font-mono text-[10px] text-white/80 uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {act.number} {act.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
