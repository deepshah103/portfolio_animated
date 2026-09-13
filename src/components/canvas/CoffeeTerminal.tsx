'use client';

import { Html } from '@react-three/drei';

export function CoffeeTerminal() {
  return (
    <group position={[-4.2, 0, 4.1]}>
      {/* Compact futuristic coffee station */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.65, 1.25, 0.5]} />
        <meshStandardMaterial color="#f2f7fa" roughness={0.28} metalness={0.35} />
      </mesh>

      {/* Glowing front display */}
      <mesh position={[0, 0.98, 0.255]}>
        <boxGeometry args={[0.42, 0.28, 0.015]} />
        <meshStandardMaterial color="#eaffff" emissive="#00bcd4" emissiveIntensity={1.1} />
      </mesh>

      {/* Status light */}
      <mesh position={[0, 1.28, 0.255]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#5ff5d0" emissive="#22ddbb" emissiveIntensity={2.5} />
      </mesh>

      {/* Cup bay */}
      <mesh position={[0, 0.55, 0.29]} castShadow>
        <boxGeometry args={[0.28, 0.14, 0.22]} />
        <meshStandardMaterial color="#dbe7ec" roughness={0.5} />
      </mesh>

      {/* Cup */}
      <mesh position={[0, 0.7, 0.38]} castShadow>
        <cylinderGeometry args={[0.075, 0.06, 0.14, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} />
      </mesh>

      {/* Spout */}
      <mesh position={[0, 0.78, 0.3]}>
        <cylinderGeometry args={[0.025, 0.025, 0.18, 10]} />
        <meshStandardMaterial color="#9aaab4" metalness={0.85} roughness={0.16} />
      </mesh>

      {/* Base glow */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.3, 24]} />
        <meshStandardMaterial color="#ccffff" emissive="#00cfe8" emissiveIntensity={1.7} transparent opacity={0.7} />
      </mesh>

      <Html position={[0, 1.52, 0]} center distanceFactor={6} style={{ pointerEvents: 'none', zIndex: 4 }}>
        <div className="rounded-full border border-cyan-200/70 bg-slate-950/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,.2)] backdrop-blur-md">
          Coffee Terminal
        </div>
      </Html>
    </group>
  );
}
