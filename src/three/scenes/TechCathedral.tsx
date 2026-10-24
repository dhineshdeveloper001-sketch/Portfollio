import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD_COORDS } from "../world";

export function TechCathedral() {
  const origin = WORLD_COORDS.ACT_03_STACK.origin;
  const groupRef = useRef<THREE.Group>(null);

  const pillars = [-4, -2, 0, 2, 4];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = origin[1] + Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={origin}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 2, 0]} color="#FF1E1E" intensity={2.0} distance={10} />

      {/* 5 Vertical Pillars representing tech stacks */}
      {pillars.map((x, i) => (
        <group key={i} position={[x, 0, -i * 1.2]}>
          {/* Main Column */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.25, 4.5, 0.25]} />
            <meshStandardMaterial
              color="#0A0A10"
              metalness={0.9}
              roughness={0.2}
              emissive="#FF1E1E"
              emissiveIntensity={0.15}
            />
          </mesh>

          {/* Emissive Edge Ribs */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.27, 4.52, 0.27]} />
            <meshBasicMaterial
              color="#FF1E1E"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Glowing Rune / Data Ring */}
          <mesh position={[0, 0.8 * Math.sin(i * 1.5), 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.35, 0.4, 32]} />
            <meshBasicMaterial
              color="#FF2E2E"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
