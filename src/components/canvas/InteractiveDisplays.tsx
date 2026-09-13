'use client';

import { Html } from '@react-three/drei';

function Display({ position, title, accent, lines }: { position: [number, number, number]; title: string; accent: string; lines: string[] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0, -0.025]} castShadow>
        <boxGeometry args={[1.05, 0.72, 0.04]} />
        <meshStandardMaterial color="#15232b" roughness={0.25} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.94, 0.61, 0.012]} />
        <meshStandardMaterial color="#eaffff" emissive={accent} emissiveIntensity={0.35} />
      </mesh>
      <Html position={[0, 0, 0.04]} center transform distanceFactor={5} style={{ pointerEvents: 'none', width: 150 }}>
        <div className="overflow-hidden rounded-lg border border-white/25 bg-slate-950/90 p-2 font-mono text-[7px] leading-[1.45] text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,.14)] backdrop-blur-sm">
          <div className="mb-1 flex items-center gap-1.5 border-b border-white/10 pb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,.8)]" />
            <span className="font-black tracking-[0.14em] text-white">{title}</span>
          </div>
          <div className="space-y-0.5">
            {lines.map((line, index) => (
              <div key={line} className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-cyan-400">{index === lines.length - 1 ? '▶' : '·'}</span>
                <span className={index === lines.length - 1 ? 'text-white' : 'text-slate-400'}>{line}</span>
              </div>
            ))}
          </div>
          <div className="mt-1.5 h-0.5 overflow-hidden rounded bg-white/10"><div className="h-full w-1/2 animate-[pulse_1.7s_ease-in-out_infinite] bg-cyan-400" /></div>
        </div>
      </Html>
    </group>
  );
}

export function InteractiveDisplays() {
  return (
    <group>
      <Display position={[-0.9, 1.45, -4.9]} title="AGENT PIPELINE" accent="#00d8ff" lines={['ingest → reason', 'tools → action', 'eval → deploy', 'status: ONLINE']} />
      <Display position={[-2.45, 1.22, -4.18]} title="NEURAL CORE" accent="#8b5cf6" lines={['context: ACTIVE', 'memory: READY', 'planner: RUNNING', 'status: LEARNING']} />
      <Display position={[-5.0, 1.78, -2.62]} title="SYSTEM MAP" accent="#06b6d4" lines={['inputs', 'orchestrator', 'agents', 'outputs']} />
    </group>
  );
}
