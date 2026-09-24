"use client";

import { useMemo, useRef, type ComponentRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import landDots from "@/lib/globe-dots.json";

const VOLT = "#c8ff2e";
const R = 1.6;
const HOME = { lat: 21.17, lng: 72.83 }; // Surat
// Illustrative remote-work hubs the arcs fly to.
const DESTINATIONS = [
  { lat: 25.2, lng: 55.27 }, // Dubai
  { lat: 51.5, lng: -0.12 }, // London
  { lat: 1.35, lng: 103.82 }, // Singapore
  { lat: 40.71, lng: -74.0 }, // New York
  { lat: -33.87, lng: 151.21 }, // Sydney
  { lat: 52.52, lng: 13.4 }, // Berlin
  { lat: 43.65, lng: -79.38 }, // Toronto
];

function toVec(lat: number, lng: number, r = R) {
  const la = THREE.MathUtils.degToRad(lat);
  const ln = THREE.MathUtils.degToRad(lng);
  return new THREE.Vector3(r * Math.cos(la) * Math.cos(ln), r * Math.sin(la), -r * Math.cos(la) * Math.sin(ln));
}

// Intro: dots start scattered across the hero and fly to their spot on the globe.
const dotVertex = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uTime;
  uniform float uGlobe;
  uniform vec3 uCenter;
  attribute vec3 aStart;
  attribute float aRand;
  varying float vFront;
  varying float vVolt;
  varying float vFade;

  void main() {
    float g = smoothstep(0.0, 1.0, clamp(uGlobe * 1.5 - aRand * 0.5, 0.0, 1.0));

    vec3 drift = 0.05 * vec3(sin(uTime * 0.7 + aRand * 30.0), cos(uTime * 0.6 + aRand * 20.0), 0.0);
    vec4 introMV = viewMatrix * vec4(uCenter + aStart + drift, 1.0);
    vec4 globeMV = modelViewMatrix * vec4(position, 1.0);
    vec4 mv = mix(introMV, globeMV, g);

    vFront = mix(1.0, normalize(normalMatrix * position).z, g);
    vVolt = (1.0 - g) * step(0.6, aRand);
    vFade = mix(0.35, 1.0, g);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio / -mv.z * mix(0.9, 1.0, g);
  }
`;

const dotFragment = /* glsl */ `
  varying float vFront;
  varying float vVolt;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = mix(0.08, 0.9, smoothstep(-0.25, 0.45, vFront)) * vFade;
    vec3 c = mix(vec3(0.93, 0.93, 0.9), vec3(0.78, 1.0, 0.18), vVolt);
    gl_FragColor = vec4(c, a * smoothstep(0.5, 0.3, d));
  }
`;

const glowVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragment = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    float i = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0) * 0.5;
    gl_FragColor = vec4(0.78, 1.0, 0.18, 1.0) * i;
  }
`;

type Intro = { globe: number; reveal: number; center: THREE.Vector3 };

// Seeded PRNG keeps particle layouts stable across renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function LandDots({ intro }: { intro: React.RefObject<Intro> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { gl, size } = useThree();
  const geometry = useMemo(() => {
    const pts = landDots as number[];
    const pos = new Float32Array((pts.length / 2) * 3);
    for (let i = 0; i < pts.length; i += 2) {
      const v = toVec(pts[i], pts[i + 1]);
      pos.set([v.x, v.y, v.z], (i / 2) * 3);
    }
    const count = pts.length / 2;
    const random = mulberry32(11);
    const start = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      start[i * 3] = (random() - 0.5) * 14;
      start[i * 3 + 1] = (random() - 0.5) * 8;
      start[i * 3 + 2] = (random() - 0.5) * 4;
      rand[i] = random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aStart", new THREE.BufferAttribute(start, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    return g;
  }, []);
  const uniforms = useMemo(
    () => ({
      uSize: { value: size.width < 768 ? 12 : 14 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uTime: { value: 0 },
      uGlobe: { value: 0 },
      uCenter: { value: new THREE.Vector3() },
    }),
    [gl, size.width],
  );

  useFrame((state) => {
    const u = material.current?.uniforms;
    const i = intro.current;
    if (!u || !i) return;
    u.uTime.value = state.clock.elapsedTime;
    u.uGlobe.value = i.globe;
    u.uCenter.value.copy(i.center);
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial ref={material} vertexShader={dotVertex} fragmentShader={dotFragment} uniforms={uniforms} transparent depthWrite={false} />
    </points>
  );
}

type LineRef = ComponentRef<typeof Line>;

function Arc({ to, index }: { to: { lat: number; lng: number }; index: number }) {
  const line = useRef<LineRef>(null);
  const head = useRef<THREE.Mesh>(null);
  const { curve, points } = useMemo(() => {
    const a = toVec(HOME.lat, HOME.lng);
    const b = toVec(to.lat, to.lng);
    const lift = 1 + a.distanceTo(b) * 0.28;
    const mid = a.clone().add(b).normalize().multiplyScalar(R * lift);
    const c = new THREE.QuadraticBezierCurve3(a, mid, b);
    return { curve: c, points: c.getPoints(80) };
  }, [to]);

  useFrame((state, dt) => {
    const mat = line.current?.material as { dashOffset: number } | undefined;
    if (mat) mat.dashOffset -= dt * 0.35;
    // A bright spark travels from Surat to the destination, staggered per arc.
    const t = (state.clock.elapsedTime * 0.22 + index * 0.37) % 1;
    head.current?.position.copy(curve.getPoint(t));
    head.current?.scale.setScalar(Math.sin(t * Math.PI) * 1.2 + 0.2);
  });

  return (
    <group>
      <Line points={points} color={VOLT} lineWidth={1} transparent opacity={0.28} />
      <Line
        ref={line}
        points={points}
        color={VOLT}
        lineWidth={1.6}
        dashed
        dashSize={0.25}
        gapSize={0.6}
        transparent
        opacity={0.9}
        toneMapped={false}
      />
      <mesh ref={head}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color={VOLT} toneMapped={false} />
      </mesh>
      <mesh position={toVec(to.lat, to.lng, R * 1.004)}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#edede6" />
      </mesh>
    </group>
  );
}

function Beacon() {
  const ring = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => toVec(HOME.lat, HOME.lng, R * 1.005), []);
  const quat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()),
    [pos],
  );

  useFrame((state) => {
    const r = ring.current;
    if (!r) return;
    const t = (state.clock.elapsedTime * 0.8) % 1;
    r.scale.setScalar(1 + t * 5);
    (r.material as THREE.MeshBasicMaterial).opacity = 1 - t;
  });

  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <circleGeometry args={[0.045, 32]} />
        <meshBasicMaterial color={VOLT} toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.05, 0.062, 48]} />
        <meshBasicMaterial color={VOLT} transparent toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.004, 0.004, 0.36, 8]} />
        <meshBasicMaterial color={VOLT} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Globe({ ready }: { ready: boolean }) {

  const outer = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const extras = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);
  const intro = useRef<Intro>({ globe: 0, reveal: 0.001, center: new THREE.Vector3() });
  const readyAt = useRef<number | null>(null);
  const { viewport, size } = useThree();
  const mobile = size.width < 768;

  // Turn the globe so Surat faces the camera, then tilt so it sits just above center.
  const faceHome = useMemo(() => {
    const h = toVec(HOME.lat, HOME.lng);
    return Math.atan2(-h.x, h.z);
  }, []);

  useFrame((state, dt) => {
    const o = outer.current;
    const s = spin.current;
    if (!o || !s) return;
    const t = state.clock.elapsedTime;
    const progress = Math.min(window.scrollY / window.innerHeight, 1.5);

    // After the preloader the scattered dots fly into the globe over 2.4s.
    if (ready && readyAt.current === null) readyAt.current = t;
    const since = readyAt.current === null ? 0 : t - readyAt.current;
    const i = intro.current;
    i.globe = THREE.MathUtils.clamp((since - 0.2) / 2.4, 0, 1);
    i.reveal = THREE.MathUtils.damp(i.reveal, i.globe > 0.85 ? 1 : 0.001, 3, dt);
    i.center.copy(o.position);
    extras.current?.scale.setScalar(i.reveal);
    halo.current?.scale.setScalar(i.reveal);

    // The globe sits right of the camera, so we see its left side; turn back by that viewing angle.
    const viewYaw = Math.atan2(o.position.x, state.camera.position.z);
    s.rotation.y = THREE.MathUtils.damp(
      s.rotation.y,
      faceHome - viewYaw + Math.sin(t * 0.2) * 0.25 + state.pointer.x * 0.4 + progress * 1.5,
      2,
      dt,
    );
    o.rotation.x = THREE.MathUtils.damp(o.rotation.x, 0.28 - state.pointer.y * 0.2, 2, dt);
    o.position.x = mobile ? 0 : viewport.width * 0.27;
    o.position.y = (mobile ? viewport.height * 0.135 : viewport.height * 0.1) + progress * 1.4;
    // Short phones have less room between the labels and the name, so the globe shrinks a little there.
    const mobileScale = 0.45 * THREE.MathUtils.clamp((size.height - 100) / 744, 0.78, 1);
    o.scale.setScalar((mobile ? mobileScale : 0.5) * (1 - progress * 0.2));
  });

  return (
    <group ref={outer} scale={0.5}>
      <group ref={halo} scale={0.001}>
      {/* Atmosphere rim */}
      <mesh scale={1.1}>
        <sphereGeometry args={[R, 64, 64]} />
        <shaderMaterial
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2 - 0.2, 0.15, 0]}>
        <torusGeometry args={[R * 1.35, 0.003, 8, 200]} />
        <meshBasicMaterial color="#edede6" transparent opacity={0.18} />
      </mesh>
      </group>
      <group ref={spin} rotation-y={faceHome}>
        <LandDots intro={intro} />
        {/* Appears once the dots have formed the globe. */}
        <group ref={extras} scale={0.001}>
          {/* Dark core hides most of the far side; drawn first so the land dots always sit on top. */}
          <mesh renderOrder={-1}>
            <sphereGeometry args={[R * 0.985, 64, 64]} />
            <meshBasicMaterial color="#09090c" transparent opacity={0.9} />
          </mesh>
          <Beacon />
          {DESTINATIONS.map((d, i) => (
            <Arc key={i} to={d} index={i} />
          ))}
        </group>
      </group>
    </group>
  );
}

function Stars({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const random = mulberry32(7);
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (random() - 0.5) * 20;
      p[i * 3 + 1] = (random() - 0.5) * 12;
      p[i * 3 + 2] = -random() * 8 - 2;
    }
    return p;
  }, [count]);

  useFrame((state, dt) => {
    const r = ref.current;
    if (!r) return;
    r.position.x = THREE.MathUtils.damp(r.position.x, -state.pointer.x * 0.3, 2, dt);
    r.position.y = THREE.MathUtils.damp(r.position.y, -state.pointer.y * 0.2, 2, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#edede6" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HeroGlobe({ ready, active }: { ready: boolean; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Track the pointer over the whole page, not just the canvas under the hero text.
      eventSource={document.body}
      eventPrefix="client"
    >
      <Stars />
      <Globe ready={ready} />
    </Canvas>
  );
}
