import React from "react";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  Noise,
  Vignette,
  SMAA
} from "@react-three/postprocessing";
import * as THREE from "three";

interface PostFXProps {
  mode: "CYBER CORE" | "WIREFRAME" | "OVERCLOCK";
  focusDistance: number;
  enableDOF?: boolean;
}

export function PostFX({ mode, focusDistance, enableDOF = true }: PostFXProps) {
  const isOverclock = mode === "OVERCLOCK";
  const bloomIntensity = isOverclock ? 2.0 : 0.9;
  const caOffset = isOverclock
    ? new THREE.Vector2(0.004, 0.004)
    : new THREE.Vector2(0.0008, 0.0008);

  return (
    <EffectComposer multisampling={0}>
      {/* 1. Bloom */}
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.8}
        mipmapBlur
      />

      {/* 2. Depth of Field with dynamic rack focus */}
      {enableDOF && (
        <DepthOfField
          focusDistance={focusDistance}
          focalLength={0.02}
          bokehScale={4}
        />
      )}

      {/* 3. Subtle Film Chromatic Aberration */}
      <ChromaticAberration
        offset={caOffset}
        radialModulation={false}
        modulationOffset={0}
      />

      {/* 4. Film Grain Noise */}
      <Noise opacity={0.035} />

      {/* 5. Vignette */}
      <Vignette offset={0.35} darkness={0.7} />

      {/* 6. SMAA Antialiasing */}
      <SMAA />
    </EffectComposer>
  );
}
