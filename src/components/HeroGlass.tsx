"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";

const VOLT = "#c8ff2e";

function GlassKnot({ ready }: { ready: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();
  const mobile = size.width < 768;
  const bg = useMemo(() => new THREE.Color("#07070a"), []);

  useFrame((state, dt) => {
    const m = ref.current;
    if (!m) return;
    const progress = Math.min(window.scrollY / window.innerHeight, 1.5);
    const baseX = mobile ? 0 : viewport.width * 0.24;
    const baseY = mobile ? viewport.height * 0.12 : 0;
    const target = (ready ? (mobile ? 0.55 : 0.74) : 0) * (1 - progress * 0.25);

    m.rotation.x += dt * 0.12;
    m.rotation.y += dt * 0.18 + progress * dt * 0.8;
    m.position.x = THREE.MathUtils.damp(m.position.x, baseX + state.pointer.x * 0.35, 3, dt);
    m.position.y = THREE.MathUtils.damp(
      m.position.y,
      baseY + state.pointer.y * 0.25 + progress * 1.6,
      3,
      dt,
    );
    const s = THREE.MathUtils.damp(m.scale.x, target, 2.4, dt);
    m.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} scale={0.001}>
      <torusKnotGeometry args={[1, 0.34, mobile ? 160 : 280, mobile ? 24 : 48]} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.4}
        samples={mobile ? 4 : 8}
        resolution={mobile ? 256 : 512}
        thickness={1.1}
        roughness={0.06}
        ior={1.35}
        chromaticAberration={0.7}
        anisotropicBlur={0.2}
        distortion={0.35}
        distortionScale={0.4}
        temporalDistortion={0.12}
        clearcoat={1}
        attenuationDistance={2.5}
        attenuationColor="#ffffff"
        color="#f4f4ee"
        background={bg}
      />
    </mesh>
  );
}

// A glowing ring and orbs sit behind the glass so the refraction has color to bend.
function Backdrop({ ready }: { ready: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const mobile = size.width < 768;

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.z += dt * 0.08;
    const target = ready ? (mobile ? 0.6 : 0.78) : 0;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, target, 2, dt));
    g.position.x = mobile ? 0 : viewport.width * 0.24;
    g.position.y = (mobile ? viewport.height * 0.12 : 0) + Math.min(window.scrollY / window.innerHeight, 1.5) * 1.2;
  });

  return (
    <group ref={group} position={[0, 0, -2.5]} scale={0.001}>
      <mesh>
        <torusGeometry args={[2.1, 0.035, 16, 200]} />
        <meshBasicMaterial color={VOLT} toneMapped={false} />
      </mesh>
      <Float speed={2} floatIntensity={1.4}>
        <mesh position={[-1.9, 1.1, 0.4]}>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshBasicMaterial color={VOLT} toneMapped={false} />
        </mesh>
      </Float>
      <Float speed={1.4} floatIntensity={1.8}>
        <mesh position={[1.8, -1.3, 0.6]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="#7aa2ff" toneMapped={false} />
        </mesh>
      </Float>
      <mesh position={[0.3, 0.2, -0.6]}>
        <planeGeometry args={[0.08, 5]} />
        <meshBasicMaterial color={VOLT} toneMapped={false} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Seeded PRNG keeps the particle layout stable across renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    const random = mulberry32(23);
    for (let i = 0; i < count; i++) {
      const r = 4 + random() * 6;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi) - 3;
    }
    return p;
  }, [count]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.02;
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, state.pointer.y * 0.1, 2, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#edede6" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HeroScene({ ready, active }: { ready: boolean; active: boolean }) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6], fov: 40 }}
      // Track the pointer over the whole page, not just the canvas under the hero text.
      eventSource={document.body}
      eventPrefix="client"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))} />
      <Particles />
      <Backdrop ready={ready} />
      <GlassKnot ready={ready} />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="ring" color={VOLT} intensity={6} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={4} />
          <Lightformer form="rect" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 1, 1]} />
        </group>
      </Environment>
    </Canvas>
  );
}
