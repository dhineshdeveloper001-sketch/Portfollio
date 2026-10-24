import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD_COORDS } from "../world";

export function ExperienceMonolith() {
  const origin = WORLD_COORDS.ACT_05_EXPERIENCE.origin;
  const monolithRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (monolithRef.current) {
      monolithRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.position.y = Math.sin(t * 0.6) * 1.5;
    }
  });

  return (
    <group position={origin}>
      <pointLight position={[1, 1, 2]} color="#FF1E1E" intensity={2.5} distance={8} />

      <group ref={monolithRef}>
        {/* Obsidian Monolith */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 4.2, 0.35]} />
          <meshStandardMaterial
            color="#08080C"
            metalness={0.95}
            roughness={0.12}
            emissive="#1F0404"
          />
        </mesh>

        {/* Emissive Edge Highlight */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.22, 4.22, 0.37]} />
          <meshBasicMaterial
            color="#FF1E1E"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Horizontal Scanner Beam / Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.0, 32]} />
          <meshBasicMaterial
            color="#FF1E1E"
            side={THREE.DoubleSide}
            transparent
            opacity={0.75}
          />
        </mesh>
      </group>
    </group>
  );
}
