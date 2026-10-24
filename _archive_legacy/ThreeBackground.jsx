import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

// Particle Field Component
function ParticleField({ count = 400 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#ff0a2d'); // Crimson Red
    const color2 = new THREE.Color('#00d4ff'); // Cyan Blue
    const color3 = new THREE.Color('#ffffff'); // Pure White

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const mixedColor = Math.random() > 0.5 ? color1 : Math.random() > 0.3 ? color2 : color3;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating Geometries Component
function FloatingShapes() {
  const shape1 = useRef();
  const shape2 = useRef();
  const shape3 = useRef();

  useFrame((state, delta) => {
    if (shape1.current) {
      shape1.current.rotation.x += delta * 0.2;
      shape1.current.rotation.y += delta * 0.3;
    }
    if (shape2.current) {
      shape2.current.rotation.y += delta * 0.25;
      shape2.current.rotation.z += delta * 0.15;
    }
    if (shape3.current) {
      shape3.current.rotation.x += delta * 0.15;
      shape3.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <>
      {/* 1. Distorted TorusKnot (Crimson Red Glow) */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={shape1} position={[-4, 2.5, -4]} scale={0.75}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <MeshDistortMaterial
            color="#ff0a2d"
            emissive="#ff0a2d"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* 2. Icosahedron (Cyan Blue Glow) */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh ref={shape2} position={[4.5, -2, -5]} scale={0.9}>
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.35}
            roughness={0.1}
            metalness={0.9}
            distort={0.2}
            speed={1.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* 3. Octahedron (Center Background Accent) */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.2}>
        <mesh ref={shape3} position={[0, -3.5, -6]} scale={0.8}>
          <octahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial
            color="#ff0a2d"
            emissive="#00d4ff"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </>
  );
}

// Mouse Parallax Camera Rig
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 1.2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.8, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const ThreeBackground = () => {
  const { isLowPerformance } = useDeviceCapability();

  // Low performance fallback (mobile / low power devices)
  if (isLowPerformance) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#030303] via-[#060810] to-[#0a0a0f]" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-80">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ powerPreference: 'high-performance', antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#ff0a2d" />

        <Suspense fallback={null}>
          <ParticleField count={450} />
          <FloatingShapes />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default React.memo(ThreeBackground);
