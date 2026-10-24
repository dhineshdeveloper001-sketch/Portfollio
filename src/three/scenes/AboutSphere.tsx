import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD_COORDS } from "../world";

export function AboutSphere() {
  const origin = WORLD_COORDS.ACT_02_ABOUT.origin;
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // 800 starfield points
  const [positions] = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.12;
      sphereRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.15;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group position={origin}>
      <pointLight position={[0, 0, 0]} color="#FF1E1E" intensity={1.5} distance={8} />

      {/* Holographic Wireframe Icosahedron Sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshBasicMaterial
          color="#FF3333"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Planetary Orbit Ring */}
      <mesh ref={ringRef} rotation={[1.1, 0.4, 0]}>
        <ringGeometry args={[2.8, 2.85, 64]} />
        <meshBasicMaterial
          color="#94A3B8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* 800 Background Starfield Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#CBD5E1"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
