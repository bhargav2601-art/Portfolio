"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, PointMaterial, Points } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuralField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, linePairs } = useMemo(() => {
    const count = 320;
    const pos = new Float32Array(count * 3);
    const vec: Array<[number, number, number]> = [];
    for (let i = 0; i < count; i += 1) {
      const x = (Math.random() - 0.5) * 11;
      const y = (Math.random() - 0.5) * 7;
      const z = (Math.random() - 0.5) * 4;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      vec.push([x, y, z]);
    }

    const pairs: Array<[[number, number, number], [number, number, number]]> = [];
    for (let i = 0; i < 36; i += 1) {
      const a = vec[Math.floor(Math.random() * vec.length)];
      const b = vec[Math.floor(Math.random() * vec.length)];
      if (a && b) pairs.push([a, b]);
    }

    return { positions: pos, linePairs: pairs };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.08;
  });

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00D1FF"
          size={0.016}
          sizeAttenuation
          depthWrite={false}
          opacity={0.62}
        />
      </Points>

      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#FF6B00"
          size={0.008}
          sizeAttenuation
          depthWrite={false}
          opacity={0.34}
        />
      </Points>

      {linePairs.map(([from, to], idx) => (
        <Line
          key={`${idx}-${from[0]}`}
          points={[from, to]}
          color={idx % 2 === 0 ? "#00D1FF" : "#FF6B00"}
          transparent
          opacity={0.1}
          lineWidth={0.5}
        />
      ))}

      <mesh position={[0, 0, -2.2]}>
        <planeGeometry args={[10, 6]} />
        <meshBasicMaterial
          color="#0b1020"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

function FloatingOrbs() {
  const orbRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!orbRef.current) return;
    orbRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
    orbRef.current.rotation.z = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={orbRef} position={[0, 0, -1.5]}>
      {[
        [-2.5, 1.4, 0, "#FF6B00"],
        [2.2, -1.1, 0, "#00D1FF"],
      ].map(([x, y, z, color], idx) => (
        <mesh key={idx} position={[x as number, y as number, z as number]}>
          <sphereGeometry args={[0.35, 18, 18]} />
          <meshBasicMaterial color={color as string} transparent opacity={0.18} />
        </mesh>
      ))}
    </group>
  );
}

export function NeuralCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 58 }}
        dpr={[1, 1.25]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.45} />
        <NeuralField />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
