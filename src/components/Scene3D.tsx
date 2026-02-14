import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

function FloatingSphere({ position, scale, speed, color }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, scale, speed, color }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={1.5}>
      <mesh position={position} scale={scale} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={1.5}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#FF4DE8" />
          <pointLight position={[5, 3, -3]} intensity={0.5} color="#9C4DFF" />
          <FloatingSphere position={[3.5, 1, 0]} scale={0.8} speed={1.5} color="#9C4DFF" />
          <FloatingTorus position={[-3.5, -0.5, -1]} scale={0.6} speed={2} color="#FF4DE8" />
          <FloatingSphere position={[-2, 2.5, -2]} scale={0.4} speed={1} color="#C17EFF" />
          <FloatingSphere position={[2, -2, -1]} scale={0.35} speed={2.5} color="#FF4DE8" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function IntroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <pointLight position={[-3, 2, 2]} intensity={0.8} color="#FF4DE8" />
          <Float speed={2} rotationIntensity={3} floatIntensity={2}>
            <mesh scale={1.8}>
              <icosahedronGeometry args={[1, 1]} />
              <MeshDistortMaterial
                color="#9C4DFF"
                distort={0.5}
                speed={3}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          </Float>
          <FloatingSphere position={[2.5, 1.5, -2]} scale={0.3} speed={3} color="#FF4DE8" />
          <FloatingSphere position={[-2, -1.5, -1]} scale={0.25} speed={2} color="#C17EFF" />
        </Suspense>
      </Canvas>
    </div>
  );
}
