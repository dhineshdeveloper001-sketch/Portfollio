import React from "react";
import { useScrollProgress } from "../utils/useScrollProgress";
import { getActiveKeyframe } from "../three/cameraScript";

interface TimecodeHUDProps {
  currentShot?: string;
  actTitle?: string;
  actNumber?: string;
}

export function TimecodeHUD({ currentShot, actTitle, actNumber }: TimecodeHUDProps) {
  const progress = useScrollProgress();
  const activeKf = getActiveKeyframe(progress);

  const shot = currentShot || activeKf.current.shot;
  const title = actTitle || activeKf.current.actTitle;
  const num = actNumber || activeKf.current.actNumber;

  // Runtime 02:30:00 reel mapping at 24fps (150 total seconds = 3600 frames)
  const totalFrames = Math.floor(progress * 3600);
  const frame = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const timecodeString = `TC 00:${pad(minutes)}:${pad(seconds)}:${pad(frame)}`;

  return (
    <div
      aria-label="Director's Viewfinder Telemetry"
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40 flex flex-col gap-1 pointer-events-none select-none font-mono text-[11px]"
    >
      <div className="glass-panel px-3 py-1.5 rounded border border-white/10 flex items-center gap-3 bg-black/60 shadow-lg">
        {/* Rec Indicator */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF1E1E] animate-pulse" />
          <span className="text-[#FF1E1E] font-bold tracking-wider">REC</span>
        </div>

        {/* Timecode */}
        <span className="text-white tracking-widest">{timecodeString}</span>

        {/* Scene & Shot Label */}
        <div className="hidden sm:flex items-center gap-2 border-l border-white/15 pl-3 text-[#94A3B8]">
          <span>SCENE {num}</span>
          <span className="text-white/30">|</span>
          <span className="text-[#F8FAFC]">{shot}</span>
        </div>
      </div>
    </div>
  );
}
