import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD_COORDS } from "../world";

export function VaultRings() {
  const origin = WORLD_COORDS.ACT_06_CREDENTIALS.origin;
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.2;
    if (ring2.current) ring2.current.rotation.z = -t * 0.3;
    if (ring3.current) ring3.current.rotation.z = t * 0.15;
  });

  return (
    <group position={origin}>
      <pointLight position={[0, 0, 1.5]} color="#FF1E1E" intensity={1.8} distance={7} />

      {/* Ring 1 Inner */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.2, 0.04, 16, 48]} />
        <meshStandardMaterial
          color="#FF1E1E"
          emissive="#FF1E1E"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Ring 2 Middle Vault Dial */}
      <mesh ref={ring2}>
        <torusGeometry args={[1.7, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#22222E"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Ring 3 Outer Vault Gear */}
      <mesh ref={ring3}>
        <torusGeometry args={[2.2, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#111116"
          metalness={0.95}
          roughness={0.15}
          emissive="#FF1E1E"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}
