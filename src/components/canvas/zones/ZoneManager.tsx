'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { ZONES } from '@/data/zones';
import { Html } from '@react-three/drei';
import { analytics } from '@/utils/analytics';

function ZoneMarker({ zone }: { zone: typeof ZONES[0] }) {
  const currentZone = useGameStore((s) => s.currentZone);
  const isActive = currentZone === zone.id;
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3.2) * (isActive ? 0.06 : 0.02);
    pulseRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group position={zone.position}>
      <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[zone.radius - 0.1, zone.radius, 32]} />
        <meshStandardMaterial color={isActive ? '#22d3ee' : '#a5d8e8'} transparent opacity={isActive ? 0.7 : 0.18} emissive={isActive ? '#22d3ee' : '#000000'} emissiveIntensity={isActive ? 0.5 : 0} />
      </mesh>

      <Html position={[0, 2.5, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div className={`select-none rounded-full border px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-sm transition-all duration-300 ${isActive ? 'scale-110 border-cyan-400 bg-slate-950/90 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,.3)]' : 'border-white/60 bg-white/80 text-slate-600'}`}>
          <span className="mr-1">{zone.icon}</span>{zone.name}
        </div>
      </Html>

      {isActive && <mesh position={[0, 1, 0]}><cylinderGeometry args={[0.04, 0.06, 2, 8]} /><meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} transparent opacity={0.2} /></mesh>}
    </group>
  );
}

export function ZoneManager() {
  const lastZone = useRef<string | null>(null);

  useFrame(() => {
    const { characterPosition, enterZone, leaveZone } = useGameStore.getState();
    const [cx, , cz] = characterPosition;
    let foundZone: string | null = null;

    for (const zone of ZONES) {
      const dx = cx - zone.position[0];
      const dz = cz - zone.position[2];
      if (Math.sqrt(dx * dx + dz * dz) < zone.radius) {
        foundZone = zone.id;
        break;
      }
    }

    if (foundZone !== lastZone.current) {
      if (foundZone) { enterZone(foundZone); analytics.enterZone(foundZone); }
      else { leaveZone(); analytics.leaveZone(); }
      lastZone.current = foundZone;
    }
  });

  return <group>{ZONES.map((zone) => <ZoneMarker key={zone.id} zone={zone} />)}</group>;
}
