import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD_COORDS } from "../world";

export function ContactBeacon() {
  const origin = WORLD_COORDS.ACT_08_CONTACT.origin;
  const beaconRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = (Math.sin(t * 3.5) + 1) / 2; // 0 to 1

    if (beaconRef.current) {
      beaconRef.current.scale.setScalar(0.9 + pulse * 0.25);
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1.0 + pulse * 0.8);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = 0.8 * (1 - pulse);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.0 + pulse * 3.0;
    }
  });

  return (
    <group position={origin}>
      <pointLight ref={lightRef} position={[0, 0, 0]} color="#FF1E1E" intensity={3} distance={12} />

      {/* Central Pulsing Beacon Sphere */}
      <mesh ref={beaconRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#FF1E1E"
          emissive="#FF1E1E"
          emissiveIntensity={3.5}
        />
      </mesh>

      {/* Expanding Signal Radiance Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 0.9, 48]} />
        <meshBasicMaterial
          color="#FF3B3B"
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}
