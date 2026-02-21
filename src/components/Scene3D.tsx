import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function GlassOrb({ position, scale, color, speed = 1 }: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color={color}
          distort={0.25}
          speed={1.5}
          roughness={0.1}
          metalness={0.95}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, color, speed }: {
  radius: number;
  color: string;
  speed: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.15;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function ParticleField() {
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8b5cf6"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.85 }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0d0ff" />
          <pointLight position={[-4, 3, 3]} intensity={0.4} color="#8b5cf6" />
          <pointLight position={[4, -2, 2]} intensity={0.3} color="#a855f7" />

          {/* Main orb - centered, elegant */}
          <GlassOrb position={[3, 0.5, 0]} scale={1.1} color="#7c3aed" speed={0.6} />
          
          {/* Orbiting rings around main orb */}
          <group position={[3, 0.5, 0]}>
            <OrbitRing radius={1.8} color="#8b5cf6" speed={1} />
            <OrbitRing radius={2.2} color="#a855f7" speed={-0.7} />
          </group>

          {/* Secondary smaller orbs */}
          <GlassOrb position={[-3.5, -1, -1]} scale={0.4} color="#a855f7" speed={0.8} />
          <GlassOrb position={[-2, 2, -2]} scale={0.25} color="#c084fc" speed={1.2} />

          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function IntroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 3, 3]} intensity={1} color="#e0d0ff" />
          <pointLight position={[-3, 2, 2]} intensity={0.6} color="#8b5cf6" />
          <pointLight position={[2, -2, 3]} intensity={0.4} color="#a855f7" />

          {/* Central geometric form */}
          <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1}>
            <mesh scale={1.6}>
              <icosahedronGeometry args={[1, 2]} />
              <MeshDistortMaterial
                color="#7c3aed"
                distort={0.3}
                speed={2}
                roughness={0.05}
                metalness={0.95}
                envMapIntensity={2}
              />
            </mesh>
          </Float>

          <group>
            <OrbitRing radius={2.5} color="#8b5cf6" speed={0.8} />
            <OrbitRing radius={3} color="#a855f7" speed={-0.5} />
          </group>

          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
