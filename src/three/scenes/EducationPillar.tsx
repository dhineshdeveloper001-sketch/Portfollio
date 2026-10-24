import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD_COORDS } from "../world";

export function EducationPillar() {
  const origin = WORLD_COORDS.ACT_07_EDUCATION.origin;
  const pillarRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pillarRef.current) {
      pillarRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group position={origin}>
      <spotLight
        position={[0, 6, 2]}
        angle={0.4}
        penumbra={0.7}
        intensity={3.5}
        color="#F8FAFC"
      />
      <pointLight position={[0, -1, 1]} color="#FF1E1E" intensity={1.5} distance={5} />

      {/* Hexagonal Foundation Column */}
      <mesh ref={pillarRef} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 4.2, 6]} />
        <meshStandardMaterial
          color="#0C0D12"
          metalness={0.88}
          roughness={0.25}
          emissive="#150505"
        />
      </mesh>

      {/* Emissive Base Ring */}
      <mesh position={[0, -2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.4, 6]} />
        <meshBasicMaterial
          color="#FF1E1E"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
