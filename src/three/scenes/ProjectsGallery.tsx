import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD_COORDS } from "../world";

export function ProjectsGallery() {
  const origin = WORLD_COORDS.ACT_04_PROJECTS.origin;
  const slabsRef = useRef<THREE.Group>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);

  // 6 floating data slabs
  const slabs = [-5, -3, -1, 1, 3, 5];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (spotlightRef.current) {
      spotlightRef.current.position.x = Math.sin(t * 0.5) * 4;
    }
    if (slabsRef.current) {
      slabsRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(t * 0.8 + i * 0.9) * 0.12;
      });
    }
  });

  return (
    <group position={origin}>
      <spotLight
        ref={spotlightRef}
        position={[0, 4, 3]}
        angle={0.6}
        penumbra={0.8}
        intensity={3}
        color="#FF1E1E"
      />

      <group ref={slabsRef}>
        {slabs.map((x, i) => (
          <group key={i} position={[x, 0, (i % 2) * 0.3]}>
            {/* Dark glass slab */}
            <mesh>
              <boxGeometry args={[1.6, 2.2, 0.05]} />
              <meshStandardMaterial
                color="#0A0A10"
                metalness={0.9}
                roughness={0.15}
                emissive="#150202"
              />
            </mesh>
            {/* Emissive border */}
            <mesh>
              <boxGeometry args={[1.62, 2.22, 0.06]} />
              <meshBasicMaterial
                color="#FF1E1E"
                wireframe
                transparent
                opacity={0.35}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
