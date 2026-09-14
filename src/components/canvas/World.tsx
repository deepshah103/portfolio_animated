'use client';

import { Html } from '@react-three/drei';

function FloorZone({ position, size, color, opacity = 0.10 }: { position: [number, number, number]; size: [number, number]; color: string; opacity?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[position[0], 0.009, position[2]]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.85} metalness={0.05} />
    </mesh>
  );
}

function Floor() {
  return (
    <group>
      {/* One open floor with subtle visual zones — no separate rooms or walls */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14.3, 14.3]} />
        <meshStandardMaterial color="#d8e8f0" roughness={0.3} metalness={0.1} />
      </mesh>
      <FloorZone position={[-2.7, 0, -3.6]} size={[5.1, 3.7]} color="#bfefff" opacity={0.13} />
      <FloorZone position={[3.3, 0, -2.0]} size={[4.2, 4.1]} color="#d9d0ff" opacity={0.11} />
      <FloorZone position={[-3.8, 0, 1.0]} size={[3.3, 5.4]} color="#d9f7ec" opacity={0.10} />
      <FloorZone position={[2.7, 0, 2.8]} size={[4.7, 3.7]} color="#fff0d8" opacity={0.11} />
      {[-6, -4, -2, 0, 2, 4, 6].map((x) => (
        <mesh key={`fx${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.005, 0]}>
          <planeGeometry args={[0.02, 14.3]} />
          <meshStandardMaterial color="#aaddee" emissive="#66ccdd" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {[-6, -4, -2, 0, 2, 4, 6].map((z) => (
        <mesh key={`fz${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, z]}>
          <planeGeometry args={[14.3, 0.02]} />
          <meshStandardMaterial color="#aaddee" emissive="#66ccdd" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Walls() {
  return (
    <group>
      <mesh position={[0, 0.05, -7.0]}><boxGeometry args={[14.3, 0.1, 0.1]} /><meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} /></mesh>
      <mesh position={[-7.0, 0.05, 0]}><boxGeometry args={[0.1, 0.1, 14.3]} /><meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} /></mesh>
      <mesh position={[7.0, 0.05, 0]}><boxGeometry args={[0.1, 0.1, 14.3]} /><meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} /></mesh>
      <mesh position={[0, 0.05, 7.0]}><boxGeometry args={[14.3, 0.1, 0.1]} /><meshStandardMaterial color="#00bbdd" emissive="#00aacc" emissiveIntensity={1.5} /></mesh>
    </group>
  );
}

function Desk() {
  const screens = [
    { x: -0.75, label: 'Code Agent', emissive: '#00aacc' },
    { x: -0.25, label: 'Research Agent', emissive: '#0088dd' },
    { x: 0.25, label: 'Build Agent', emissive: '#00ccaa' },
    { x: 0.75, label: 'Deploy Agent', emissive: '#00dd88' },
  ];

  return (
    <group position={[0, 0, -4.8]}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow><boxGeometry args={[3, 0.05, 0.9]} /><meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} /></mesh>
      {[[-1.4, 0, -0.4], [1.4, 0, -0.4], [-1.4, 0, 0.4], [1.4, 0, 0.4]].map((pos, i) => <mesh key={i} position={[pos[0], 0.35, pos[2]]} castShadow><boxGeometry args={[0.04, 0.7, 0.04]} /><meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} /></mesh>)}
      {screens.map((s, i) => <group key={i}><mesh position={[s.x, 1.15, -0.3]} castShadow><boxGeometry args={[0.45, 0.4, 0.02]} /><meshStandardMaterial color="#1a1a1a" roughness={0.3} /></mesh><mesh position={[s.x, 1.15, -0.28]}><boxGeometry args={[0.4, 0.34, 0.01]} /><meshStandardMaterial color="#e8ffff" emissive={s.emissive} emissiveIntensity={0.5} /></mesh><mesh position={[s.x, 0.9, -0.3]} castShadow><boxGeometry args={[0.04, 0.3, 0.04]} /><meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} /></mesh><mesh position={[s.x, 1.37, -0.3]}><sphereGeometry args={[0.02, 8, 8]} /><meshStandardMaterial color={s.emissive} emissive={s.emissive} emissiveIntensity={3} /></mesh></group>)}
      <mesh position={[0, 0.73, 0.15]} castShadow><boxGeometry args={[0.6, 0.012, 0.2]} /><meshStandardMaterial color="#e8e8e8" roughness={0.4} /></mesh>
      <mesh position={[0.5, 0.73, 0.15]} castShadow><boxGeometry args={[0.06, 0.015, 0.1]} /><meshStandardMaterial color="#e0e0e0" roughness={0.3} /></mesh>
      <mesh position={[0, 0.68, -0.43]}><boxGeometry args={[2.8, 0.02, 0.02]} /><meshStandardMaterial color="#00ddff" emissive="#00ddff" emissiveIntensity={2.5} /></mesh>
    </group>
  );
}

function PhoneDock() {
  return (
    <group position={[3.2, 0, -3.8]} scale={[1.6, 1.6, 1.6]}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow><boxGeometry args={[0.72, 0.05, 0.62]} /><meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} /></mesh>
      <mesh position={[0, 0.22, 0]} castShadow><cylinderGeometry args={[0.05, 0.05, 0.44, 8]} /><meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, 0.54, 0]} castShadow rotation={[-0.28, 0, 0]}><boxGeometry args={[0.18, 0.34, 0.02]} /><meshStandardMaterial color="#151c22" roughness={0.3} /></mesh>
      <mesh position={[0, 0.54, 0.012]} rotation={[-0.28, 0, 0]}><boxGeometry args={[0.15, 0.29, 0.006]} /><meshStandardMaterial color="#d8f8ff" emissive="#00b8d8" emissiveIntensity={0.5} /></mesh>
      <mesh position={[0, 0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.2, 20]} /><meshStandardMaterial color="#dfffff" emissive="#00ccdd" emissiveIntensity={0.8} transparent opacity={0.7} /></mesh>
      <mesh position={[0, 0.76, 0.02]}><boxGeometry args={[0.36, 0.035, 0.025]} /><meshStandardMaterial color="#b9faff" emissive="#00e5ff" emissiveIntensity={1.4} /></mesh>
      <mesh position={[0, 0.86, 0.02]}><sphereGeometry args={[0.035, 12, 12]} /><meshStandardMaterial color="#5ff5d0" emissive="#22ddbb" emissiveIntensity={2.5} /></mesh>
    </group>
  );
}

function Whiteboard() {
  return (
    <group position={[-5.4, 0, -1.8]}>
      <mesh position={[0, 0.6, 0]} castShadow><cylinderGeometry args={[0.04, 0.04, 1.2, 8]} /><meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, 1.4, 0]} castShadow><boxGeometry args={[1.8, 1.2, 0.04]} /><meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} /></mesh>
      <mesh position={[0, 1.4, 0.025]}><boxGeometry args={[1.6, 1.0, 0.01]} /><meshStandardMaterial color="#e8ffff" emissive="#00bbdd" emissiveIntensity={0.3} /></mesh>
      <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.3, 0.3, 0.04, 16]} /><meshStandardMaterial color="#ddd" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  );
}

function AICorner() {
  return (
    <group position={[-2.8, 0, -4.2]}>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow><boxGeometry args={[1, 0.04, 0.6]} /><meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} /></mesh>
      {[[-0.45, 0, -0.25], [0.45, 0, -0.25]].map((pos, i) => <mesh key={i} position={[pos[0], 0.3, pos[2]]} castShadow><boxGeometry args={[0.03, 0.6, 0.03]} /><meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} /></mesh>)}
      <mesh position={[0, 0.64, 0.05]} castShadow><boxGeometry args={[0.5, 0.012, 0.35]} /><meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.2} /></mesh>
      <mesh position={[0, 0.88, -0.14]} castShadow rotation={[-0.2, 0, 0]}><boxGeometry args={[0.48, 0.33, 0.008]} /><meshStandardMaterial color="#1a1a1a" roughness={0.3} /></mesh>
      <mesh position={[0, 0.88, -0.135]} rotation={[-0.2, 0, 0]}><boxGeometry args={[0.43, 0.28, 0.005]} /><meshStandardMaterial color="#f0e8ff" emissive="#7733ff" emissiveIntensity={0.3} /></mesh>
      <mesh position={[0, 0.58, -0.28]}><boxGeometry args={[0.9, 0.02, 0.02]} /><meshStandardMaterial color="#aa66ff" emissive="#8833ff" emissiveIntensity={2} /></mesh>
    </group>
  );
}

function Bookshelf() {
  return (
    <group position={[4.6, 0, -2.9]}>
      <mesh position={[0, 1.2, -1.4]} castShadow><boxGeometry args={[1.5, 2.4, 0.3]} /><meshStandardMaterial color="#f0f8ff" roughness={0.3} metalness={0.1} /></mesh>
      {[0.4, 0.9, 1.4, 1.9].map((y, i) => <mesh key={i} position={[0, y, -1.33]} castShadow><boxGeometry args={[1.3, 0.03, 0.25]} /><meshStandardMaterial color="#ffffff" roughness={0.3} /></mesh>)}
      <mesh position={[0, 1.2, -1.53]}><boxGeometry args={[1.4, 2.2, 0.01]} /><meshStandardMaterial color="#e0f8ff" emissive="#00aacc" emissiveIntensity={0.2} /></mesh>
      <mesh position={[0, 1.58, -1.59]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.3, 0.3, 0.04, 32]} /><meshStandardMaterial color="#12202a" roughness={0.35} metalness={0.25} /></mesh>
      <mesh position={[0, 1.58, -1.615]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.21, 0.21, 0.045, 32]} /><meshStandardMaterial color="#bdefff" emissive="#19c8e6" emissiveIntensity={0.65} roughness={0.4} /></mesh>
      <mesh position={[0, 1.18, -1.59]}><boxGeometry args={[0.9, 0.1, 0.035]} /><meshStandardMaterial color="#13232e" emissive="#00bbdd" emissiveIntensity={0.35} /></mesh>
      <mesh position={[-0.42, 1.0, -1.59]}><boxGeometry args={[0.34, 0.07, 0.03]} /><meshStandardMaterial color="#d9f7ff" /></mesh>
      <mesh position={[0, 1.0, -1.59]}><boxGeometry args={[0.34, 0.07, 0.03]} /><meshStandardMaterial color="#d9e7ff" /></mesh>
      <mesh position={[0.42, 1.0, -1.59]}><boxGeometry args={[0.34, 0.07, 0.03]} /><meshStandardMaterial color="#e8dcff" /></mesh>
      <mesh position={[0, 0.78, -1.59]}><boxGeometry args={[0.72, 0.03, 0.03]} /><meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={1.7} /></mesh>
      {[[-0.4, 0.55, '#22aacc'], [-0.2, 0.55, '#3366cc'], [0, 0.55, '#44bb88'], [0.2, 0.55, '#cc7733'], [0.4, 0.55, '#7744cc'], [-0.3, 1.05, '#cc5544'], [0, 1.05, '#3399cc'], [0.3, 1.05, '#339966']].map(([x, y, color], i) => <mesh key={i} position={[x as number, y as number, -1.35]} castShadow><boxGeometry args={[0.06, 0.2, 0.15]} /><meshStandardMaterial color={color as string} roughness={0.7} /></mesh>)}
      <Html position={[0, 2.28, -1.62]} center distanceFactor={5} style={{ pointerEvents: 'none', zIndex: 5 }}>
        <div className="w-44 rounded-2xl border border-cyan-200/70 bg-slate-950/88 px-3 py-2 text-center shadow-[0_0_24px_rgba(34,211,238,.18)] backdrop-blur-md">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">Deep Shah</div>
          <div className="mt-1 text-[10px] font-semibold text-white">Software · AI · Data</div>
          <div className="mt-1 text-[8px] uppercase tracking-[0.13em] text-slate-400">Building intelligent products</div>
        </div>
      </Html>
    </group>
  );
}

function Lounge() {
  return (
    <group position={[3.8, 0, 1.8]}>
      <mesh position={[0, 0.35, 0]} castShadow><boxGeometry args={[0.7, 0.5, 0.7]} /><meshStandardMaterial color="#e8f4f8" roughness={0.6} /></mesh>
      <mesh position={[0, 0.6, -0.3]} castShadow><boxGeometry args={[0.7, 0.4, 0.08]} /><meshStandardMaterial color="#e8f4f8" roughness={0.6} /></mesh>
      <mesh position={[0.9, 0.32, 0]} castShadow receiveShadow><cylinderGeometry args={[0.3, 0.3, 0.03, 16]} /><meshStandardMaterial color="#eeffff" roughness={0.1} metalness={0.2} transparent opacity={0.8} /></mesh>
      <mesh position={[0.9, 0.15, 0]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.28, 8]} /><meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0.9, 0.36, 0.08]} castShadow><cylinderGeometry args={[0.03, 0.025, 0.06, 8]} /><meshStandardMaterial color="#ffffff" roughness={0.4} /></mesh>
    </group>
  );
}

function DataDashboard() {
  return (
    <group position={[-5.4, 0, 1.1]}>
      <mesh position={[0, 0.5, 0]} castShadow><cylinderGeometry args={[0.03, 0.03, 1.0, 8]} /><meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, 1.1, 0]} castShadow><boxGeometry args={[1.4, 0.8, 0.03]} /><meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.2} /></mesh>
      <mesh position={[0, 1.1, 0.02]}><boxGeometry args={[1.3, 0.7, 0.01]} /><meshStandardMaterial color="#0a1a0a" emissive="#00aa44" emissiveIntensity={0.3} /></mesh>
      <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.25, 0.25, 0.04, 16]} /><meshStandardMaterial color="#ddd" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  );
}

function SkillShelf() {
  return (
    <group position={[5.4, 0, 0]}>
      {[0.7, 1.3, 1.9].map((y, i) => <mesh key={i} position={[0, y, 0]} castShadow><boxGeometry args={[2, 0.04, 0.25]} /><meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} /></mesh>)}
      {[0.68, 1.28, 1.88].map((y, i) => <mesh key={`led${i}`} position={[0, y, 0.13]}><boxGeometry args={[1.8, 0.015, 0.015]} /><meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} /></mesh>)}
      {[[-0.6, 1.55], [0, 1.55], [0.6, 1.55]].map(([x, y], i) => <mesh key={i} position={[x, y, 0.08]} castShadow><boxGeometry args={[0.4, 0.28, 0.02]} /><meshStandardMaterial color="#f0f8ff" roughness={0.3} /></mesh>)}
    </group>
  );
}

function Bed() {
  return (
    <group position={[4.8, 0, 4.0]}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow><boxGeometry args={[1.4, 0.25, 1.8]} /><meshStandardMaterial color="#e0f0f8" roughness={0.3} metalness={0.1} /></mesh>
      <mesh position={[0, 0.38, 0]} castShadow><boxGeometry args={[1.2, 0.12, 1.6]} /><meshStandardMaterial color="#f8f8ff" roughness={0.9} /></mesh>
      <mesh position={[0, 0.46, -0.55]} castShadow><boxGeometry args={[0.8, 0.1, 0.3]} /><meshStandardMaterial color="#ffffff" roughness={0.8} /></mesh>
      <mesh position={[0, 0.46, 0.25]} castShadow><boxGeometry args={[1.1, 0.06, 0.9]} /><meshStandardMaterial color="#d0eeff" roughness={0.7} /></mesh>
      <mesh position={[0, 0.65, -0.85]} castShadow><boxGeometry args={[1.4, 0.6, 0.06]} /><meshStandardMaterial color="#e8f4f8" roughness={0.3} metalness={0.1} /></mesh>
      <mesh position={[0, 0.38, -0.82]}><boxGeometry args={[1.3, 0.025, 0.02]} /><meshStandardMaterial color="#00ddff" emissive="#00ccff" emissiveIntensity={2.5} /></mesh>
      <mesh position={[0, 0.06, 0]}><boxGeometry args={[1.5, 0.02, 1.9]} /><meshStandardMaterial color="#00ddff" emissive="#00bbdd" emissiveIntensity={1} transparent opacity={0.4} /></mesh>
    </group>
  );
}

function CodingDesk() {
  return (
    <group position={[1.3, 0, -5.8]}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow><boxGeometry args={[1.4, 0.04, 0.6]} /><meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} /></mesh>
      {[[-0.6, 0, -0.25], [0.6, 0, -0.25], [-0.6, 0, 0.25], [0.6, 0, 0.25]].map((pos, i) => <mesh key={i} position={[pos[0], 0.35, pos[2]]} castShadow><boxGeometry args={[0.03, 0.7, 0.03]} /><meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} /></mesh>)}
      <mesh position={[0, 0.74, 0.05]} castShadow><boxGeometry args={[0.55, 0.012, 0.35]} /><meshStandardMaterial color="#e8e8e8" metalness={0.7} roughness={0.2} /></mesh>
      <mesh position={[0, 0.97, -0.14]} castShadow rotation={[-0.15, 0, 0]}><boxGeometry args={[0.53, 0.35, 0.01]} /><meshStandardMaterial color="#1a1a1a" roughness={0.3} /></mesh>
      <mesh position={[0, 0.97, -0.13]} rotation={[-0.15, 0, 0]}><boxGeometry args={[0.48, 0.3, 0.005]} /><meshStandardMaterial color="#e8fff8" emissive="#00cc88" emissiveIntensity={0.3} /></mesh>
      <mesh position={[0, 0.68, -0.28]}><boxGeometry args={[1.3, 0.02, 0.02]} /><meshStandardMaterial color="#00ddff" emissive="#00ccee" emissiveIntensity={2} /></mesh>
      <group position={[0, 0, 0.7]}>
        <mesh position={[0, 0.4, 0]} castShadow><boxGeometry args={[0.4, 0.05, 0.4]} /><meshStandardMaterial color="#e8f0f4" roughness={0.5} /></mesh>
        <mesh position={[0, 0.65, -0.18]} castShadow><boxGeometry args={[0.38, 0.4, 0.04]} /><meshStandardMaterial color="#e8f0f4" roughness={0.5} /></mesh>
        <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.35, 6]} /><meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} /></mesh>
        <mesh position={[0, 0.03, 0]}><cylinderGeometry args={[0.2, 0.2, 0.03, 5]} /><meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} /></mesh>
      </group>
    </group>
  );
}

function CeilingLightPanel() { return null; }

function LabEquipment() {
  return (
    <group>
      {[[-5.5, 0, -4], [-5.8, 0, -3.5], [-5.3, 0, -3.2]].map(([x, , z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.5, 0]} castShadow><cylinderGeometry args={[0.06, 0.06, 1, 12]} /><meshStandardMaterial color="#e8ffff" roughness={0.1} metalness={0.1} transparent opacity={0.6} /></mesh>
          <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.05, 0.05, 0.4, 12]} /><meshStandardMaterial color={['#00ccff', '#00ffaa', '#aa88ff'][i]} emissive={['#00aadd', '#00dd88', '#8866dd'][i]} emissiveIntensity={0.5} transparent opacity={0.7} /></mesh>
        </group>
      ))}
    </group>
  );
}

function TradingDesk() {
  return null;
}

function Couch() {
  return (
    <group position={[0, 0, 3.5]}>
      <mesh position={[0, 0.25, 0]} castShadow><boxGeometry args={[2.2, 0.3, 0.8]} /><meshStandardMaterial color="#e0f0f8" roughness={0.7} /></mesh>
      <mesh position={[0, 0.55, -0.35]} castShadow><boxGeometry args={[2.2, 0.4, 0.15]} /><meshStandardMaterial color="#d0eaf5" roughness={0.7} /></mesh>
      <mesh position={[-1.0, 0.4, 0]} castShadow><boxGeometry args={[0.15, 0.3, 0.8]} /><meshStandardMaterial color="#d8eef5" roughness={0.7} /></mesh>
      <mesh position={[1.0, 0.4, 0]} castShadow><boxGeometry args={[0.15, 0.3, 0.8]} /><meshStandardMaterial color="#d8eef5" roughness={0.7} /></mesh>
      {[[-0.9, 0, 0.3], [0.9, 0, 0.3], [-0.9, 0, -0.3], [0.9, 0, -0.3]].map((pos, i) => <mesh key={i} position={[pos[0], 0.05, pos[2]]}><cylinderGeometry args={[0.03, 0.03, 0.1, 8]} /><meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} /></mesh>)}
      <mesh position={[-0.7, 0.5, 0.05]} castShadow rotation={[0, 0, 0.15]}><boxGeometry args={[0.25, 0.25, 0.12]} /><meshStandardMaterial color="#88ddff" roughness={0.8} /></mesh>
      <mesh position={[0.7, 0.5, 0.05]} castShadow rotation={[0, 0, -0.1]}><boxGeometry args={[0.25, 0.25, 0.12]} /><meshStandardMaterial color="#aaeeff" roughness={0.8} /></mesh>
    </group>
  );
}

function ServerRack() {
  return (
    <group position={[6, 0, -3]}>
      <mesh position={[0, 1.2, 0]} castShadow><boxGeometry args={[0.6, 2.4, 0.5]} /><meshStandardMaterial color="#e0eef5" roughness={0.3} metalness={0.2} /></mesh>
      {[0.4, 0.7, 1.0, 1.3, 1.6, 1.9].map((y, i) => <mesh key={i} position={[0.31, y, 0]}><boxGeometry args={[0.01, 0.08, 0.3]} /><meshStandardMaterial color={i % 2 === 0 ? '#00ffcc' : '#00aaff'} emissive={i % 2 === 0 ? '#00ddaa' : '#0088dd'} emissiveIntensity={1.5} /></mesh>)}
      <mesh position={[0, 0.02, 0]}><boxGeometry args={[0.7, 0.02, 0.6]} /><meshStandardMaterial color="#00ddff" emissive="#00bbdd" emissiveIntensity={1} transparent opacity={0.4} /></mesh>
    </group>
  );
}

function Plants() {
  return (
    <group>
      <group position={[5.5, 0, 0]}><mesh position={[0, 0.25, 0]} castShadow><cylinderGeometry args={[0.15, 0.12, 0.5, 8]} /><meshStandardMaterial color="#e8f4f0" roughness={0.6} /></mesh><mesh position={[0, 0.65, 0]} castShadow><sphereGeometry args={[0.25, 8, 8]} /><meshStandardMaterial color="#44bb88" roughness={0.8} /></mesh><mesh position={[0.1, 0.8, 0.08]} castShadow><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#55cc99" roughness={0.8} /></mesh></group>
      <group position={[-5.8, 0, -5]}><mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.12, 0.1, 0.4, 8]} /><meshStandardMaterial color="#e0f0e8" roughness={0.6} /></mesh><mesh position={[0, 0.55, 0]} castShadow><sphereGeometry args={[0.2, 8, 8]} /><meshStandardMaterial color="#33aa77" roughness={0.8} /></mesh></group>
      <group position={[5.8, 0, 4.5]}><mesh position={[0, 0.3, 0]} castShadow><cylinderGeometry args={[0.18, 0.14, 0.6, 8]} /><meshStandardMaterial color="#ddf0e8" roughness={0.6} /></mesh><mesh position={[0, 0.75, 0]} castShadow><sphereGeometry args={[0.3, 8, 8]} /><meshStandardMaterial color="#55cc88" roughness={0.8} /></mesh><mesh position={[-0.1, 0.9, 0.1]} castShadow><sphereGeometry args={[0.18, 8, 8]} /><meshStandardMaterial color="#66ddaa" roughness={0.8} /></mesh></group>
    </group>
  );
}

function HologramPedestal() { return null; }

function WallDecor() { return <group />; }

function SideTable() {
  return (
    <group position={[1.8, 0, 2.4]}>
      <mesh position={[0, 0.45, 0]} castShadow><cylinderGeometry args={[0.3, 0.3, 0.04, 16]} /><meshStandardMaterial color="#f4fbff" roughness={0.2} metalness={0.2} /></mesh>
      <mesh position={[0, 0.22, 0]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.44, 8]} /><meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, 0.04, 0]} castShadow><cylinderGeometry args={[0.18, 0.18, 0.03, 16]} /><meshStandardMaterial color="#e8f4f8" /></mesh>
    </group>
  );
}

function FloorLights() { return <group />; }
function WaterCooler() { return <group />; }

export function World() {
  return (
    <>
      <Floor />
      <Walls />
      <Desk />
      <PhoneDock />
      <Whiteboard />
      <AICorner />
      <Bookshelf />
      <Lounge />
      <DataDashboard />
      <SkillShelf />
      <Bed />
      <CodingDesk />
      <Couch />
      <SideTable />
      <Plants />
      <WallDecor />
      <FloorLights />
      <WaterCooler />
      <LabEquipment />
      <ServerRack />
    </>
  );
}
