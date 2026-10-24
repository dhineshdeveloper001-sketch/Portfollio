import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WORLD_COORDS } from "../world";
import { pulseBus } from "../../utils/pulseBus";

interface HeroCoreProps {
  mode: "CYBER CORE" | "WIREFRAME" | "OVERCLOCK";
  isStatic?: boolean;
}

export function HeroCore({ mode, isStatic = false }: HeroCoreProps) {
  const origin = WORLD_COORDS.ACT_01_HERO.origin;
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const lightCone1Ref = useRef<THREE.SpotLight>(null);
  const lightCone2Ref = useRef<THREE.SpotLight>(null);

  const [shockwaveScale, setShockwaveScale] = useState(1);
  const shockwaveRef = useRef<THREE.Mesh>(null);

  // Speed multiplier based on overclock
  const speed = mode === "OVERCLOCK" ? 3.0 : 1.0;
  const isWireframe = mode === "WIREFRAME";

  // Shockwave listener
  useEffect(() => {
    return pulseBus.subscribe(() => {
      setShockwaveScale(1.0);
    });
  }, []);

  // 180 Fibonacci sphere particle initial positions
  const { particleData, dummy } = useMemo(() => {
    const count = 180;
    const data = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const r = 2.8 + Math.random() * 1.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      data.push({ x, y, z, r, baseR: r, speed: 0.15 + Math.random() * 0.25 });
    }
    return { particleData: data, dummy: new THREE.Object3D() };
  }, []);

  useFrame((state, delta) => {
    if (isStatic) return;

    const time = state.clock.getElapsedTime() * speed;

    // Rings rotate on independent axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.45;
      ring1Ref.current.rotation.y = time * 0.65;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.55;
      ring2Ref.current.rotation.z = time * 0.35;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.4;
      ring3Ref.current.rotation.x = -time * 0.3;
    }

    // Core slow breathing rotation
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.2;
      coreRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
    }

    // Particles inward drift
    if (particlesRef.current) {
      for (let i = 0; i < particleData.length; i++) {
        const p = particleData[i];
        p.r -= delta * p.speed * speed;
        if (p.r < 1.3) p.r = p.baseR;
        const norm = p.r / p.baseR;
        dummy.position.set(p.x * norm, p.y * norm, p.z * norm);
        const s = Math.max(0.015, 0.035 * (1 - norm * 0.3));
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Volumetric sweeping light cones
    if (lightCone1Ref.current) {
      lightCone1Ref.current.position.x = Math.sin(time * 0.4) * 3.5;
      lightCone1Ref.current.position.y = Math.cos(time * 0.3) * 2.5 + 1.5;
    }
    if (lightCone2Ref.current) {
      lightCone2Ref.current.position.x = -Math.sin(time * 0.35) * 3.5;
      lightCone2Ref.current.position.z = Math.cos(time * 0.45) * 3.5;
    }

    // Shockwave expansion
    if (shockwaveRef.current) {
      shockwaveRef.current.scale.addScalar(delta * 4.5);
      const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = Math.max(0, 0.8 - (shockwaveRef.current.scale.x - 1) * 0.25);
      }
    }
  });

  return (
    <group ref={groupRef} position={origin}>
      {/* Volumetric red fog */}
      <fog attach="fog" args={["#0a0000", 6, 22]} />

      {/* Sweeping Light Cones */}
      <spotLight
        ref={lightCone1Ref}
        position={[3, 3, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={2.5}
        color="#FF1E1E"
        target={coreRef.current || undefined}
      />
      <spotLight
        ref={lightCone2Ref}
        position={[-3, -2, 3]}
        angle={0.5}
        penumbra={0.9}
        intensity={1.8}
        color="#DC2626"
        target={coreRef.current || undefined}
      />
      <pointLight position={[0, 0, 0]} intensity={2.0} color="#FF1E1E" distance={6} />

      {/* Procedural Core Icosahedron */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color={isWireframe ? "#FF1E1E" : "#0A0A10"}
          roughness={isWireframe ? 0.9 : 0.18}
          metalness={isWireframe ? 0.0 : 0.95}
          wireframe={isWireframe}
          emissive={isWireframe ? "#FF1E1E" : "#110202"}
          emissiveIntensity={isWireframe ? 0.6 : 0.2}
        />
      </mesh>

      {/* Holographic 3D Monogram Emblem */}
      <group position={[0, 0, 1.45]}>
        <mesh>
          <boxGeometry args={[0.9, 0.45, 0.08]} />
          <meshBasicMaterial
            color="#FF1E1E"
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* Torus Ring 1 (Inner Emissive Electric Red) */}
      <mesh ref={ring1Ref} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[1.65, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#FF1E1E"
          emissive="#FF1E1E"
          emissiveIntensity={mode === "OVERCLOCK" ? 4.0 : 2.0}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Torus Ring 2 (Middle Dark Metal) */}
      <mesh ref={ring2Ref} rotation={[-0.6, 0.5, 0.2]}>
        <torusGeometry args={[1.95, 0.02, 16, 64]} />
        <meshStandardMaterial
          color={isWireframe ? "#FF1E1E" : "#1A1A22"}
          metalness={0.9}
          roughness={0.2}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Torus Ring 3 (Outer Precision Ring) */}
      <mesh ref={ring3Ref} rotation={[0.8, -0.4, 0.6]}>
        <torusGeometry args={[2.25, 0.018, 16, 64]} />
        <meshStandardMaterial
          color={isWireframe ? "#FF1E1E" : "#2A2A35"}
          metalness={0.85}
          roughness={0.25}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Outer Wireframe Icosahedron Cage */}
      <mesh>
        <icosahedronGeometry args={[2.6, 2]} />
        <meshBasicMaterial
          color="#FF1E1E"
          wireframe
          transparent
          opacity={isWireframe ? 0.5 : 0.15}
        />
      </mesh>

      {/* 180 Glowing Fibonacci Particles */}
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, 180]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color="#FF2E2E"
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      {/* Shockwave Mesh */}
      <mesh ref={shockwaveRef} scale={shockwaveScale}>
        <ringGeometry args={[1.0, 1.05, 64]} />
        <meshBasicMaterial
          color="#FF1E1E"
          side={THREE.DoubleSide}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
