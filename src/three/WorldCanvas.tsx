import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { HeroCore } from "./scenes/HeroCore";
import { AboutSphere } from "./scenes/AboutSphere";
import { TechCathedral } from "./scenes/TechCathedral";
import { ProjectsGallery } from "./scenes/ProjectsGallery";
import { ExperienceMonolith } from "./scenes/ExperienceMonolith";
import { VaultRings } from "./scenes/VaultRings";
import { EducationPillar } from "./scenes/EducationPillar";
import { ContactBeacon } from "./scenes/ContactBeacon";
import { PostFX } from "./fx/PostFX";

interface WorldCanvasProps {
  mode: "CYBER CORE" | "WIREFRAME" | "OVERCLOCK";
  onShotUpdate?: (shot: string, actTitle: string, actNumber: string) => void;
}

export function WorldCanvas({ mode, onShotUpdate }: WorldCanvasProps) {
  const [focusDistance, setFocusDistance] = useState(0.02);
  const [dpr, setDpr] = useState<number>(1.5);
  const [enableDOF, setEnableDOF] = useState(true);
  const [isDegraded, setIsDegraded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check coarse pointer or prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    const checkDegradation = () => {
      const reduced = motionQuery.matches;
      const coarse = pointerQuery.matches;
      setIsReducedMotion(reduced);
      setIsDegraded(reduced || coarse);
    };

    checkDegradation();
    motionQuery.addEventListener("change", checkDegradation);
    pointerQuery.addEventListener("change", checkDegradation);

    return () => {
      motionQuery.removeEventListener("change", checkDegradation);
      pointerQuery.removeEventListener("change", checkDegradation);
    };
  }, []);

  // Performance watchdog: Sample FPS, drop quality if FPS < 45 for 2s
  useEffect(() => {
    if (isDegraded) return;
    let frames = 0;
    let lastTime = performance.now();
    let lowFpsCount = 0;

    const timer = setInterval(() => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      const fps = Math.round(frames / delta);
      frames = 0;
      lastTime = now;

      if (fps < 45 && fps > 0) {
        lowFpsCount++;
        if (lowFpsCount >= 2) {
          setDpr(1.0);
          setEnableDOF(false);
          clearInterval(timer);
        }
      } else {
        lowFpsCount = 0;
      }
    }, 1000);

    const onFrame = () => {
      frames++;
      rafId = requestAnimationFrame(onFrame);
    };
    let rafId = requestAnimationFrame(onFrame);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(rafId);
    };
  }, [isDegraded]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={isDegraded ? 1.0 : [1, dpr]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true
        }}
        camera={{ position: [0, 0.4, 4.6], fov: 55, near: 0.1, far: 200 }}
      >
        <ambientLight intensity={0.4} />

        {isDegraded ? (
          // Static Hero-only degradation for reduced motion / coarse touch
          <HeroCore mode={mode} isStatic={true} />
        ) : (
          // Full continuous 8-act 3D universe
          <>
            <CameraRig
              onFocusChange={setFocusDistance}
              onShotChange={onShotUpdate}
              isReducedMotion={isReducedMotion}
            />
            <HeroCore mode={mode} isStatic={false} />
            <AboutSphere />
            <TechCathedral />
            <ProjectsGallery />
            <ExperienceMonolith />
            <VaultRings />
            <EducationPillar />
            <ContactBeacon />
            <PostFX
              mode={mode}
              focusDistance={focusDistance}
              enableDOF={enableDOF}
            />
          </>
        )}
      </Canvas>
    </div>
  );
}
