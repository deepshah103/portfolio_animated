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

  return (
    <group position={zone.position}>
      {/* Ground ring indicator */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[zone.radius - 0.1, zone.radius, 32]} />
        <meshStandardMaterial
          color={isActive ? '#44aaff' : '#aaccee'}
          transparent
          opacity={isActive ? 0.6 : 0.2}
        />
      </mesh>

      {/* Floating label */}
      <Html
        position={[0, 2.5, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
          isActive
            ? 'bg-blue-500 text-white shadow-lg scale-110'
            : 'bg-white/80 text-gray-600 shadow-sm'
        }`}>
          <span className="mr-1">{zone.icon}</span>
          {zone.name}
        </div>
      </Html>

      {/* Glow pillar when active */}
      {isActive && (
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshStandardMaterial
            color="#44aaff"
            emissive="#44aaff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
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
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < zone.radius) {
        foundZone = zone.id;
        break;
      }
    }

    if (foundZone !== lastZone.current) {
      if (foundZone) {
        enterZone(foundZone);
        analytics.enterZone(foundZone);
      } else {
        leaveZone();
        analytics.leaveZone();
      }
      lastZone.current = foundZone;
    }
  });

  return (
    <group>
      {ZONES.map((zone) => (
        <ZoneMarker key={zone.id} zone={zone} />
      ))}
    </group>
  );
}
