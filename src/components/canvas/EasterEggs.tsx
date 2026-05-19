'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh } from 'three';

function SpinningCube() {
  const [found, setFound] = useState(false);
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <group position={[9, 3.5, -9]}>
      <mesh
        ref={meshRef}
        onClick={() => setFound(true)}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          color={found ? '#ffcc00' : '#666'}
          emissive={found ? '#ffaa00' : '#000'}
          emissiveIntensity={found ? 1 : 0}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      {found && (
        <Html position={[0, 0.3, 0]} center>
          <div className="bg-yellow-100 px-3 py-1.5 rounded-lg text-xs font-medium text-yellow-800 whitespace-nowrap shadow-md animate-bounce">
            You found me! 🎉
          </div>
        </Html>
      )}
    </group>
  );
}

function KonamiListener() {
  const [activated, setActivated] = useState(false);
  const sequence = useRef<string[]>([]);
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useFrame(() => {
    // Listen via window events would need useEffect,
    // but we handle in a lightweight way here
  });

  // Use a React effect instead
  if (typeof window !== 'undefined' && !activated) {
    const handler = (e: KeyboardEvent) => {
      sequence.current.push(e.code);
      if (sequence.current.length > 10) sequence.current.shift();
      if (sequence.current.join(',') === KONAMI.join(',')) {
        setActivated(true);
        window.removeEventListener('keydown', handler);
      }
    };
    if (sequence.current.length === 0) {
      window.addEventListener('keydown', handler);
    }
  }

  if (!activated) return null;

  return (
    <group position={[0, 3, 0]}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 0.5) * 3,
            2 + Math.cos(i * 0.3) * 1,
            Math.cos(i * 0.5) * 3,
          ]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={`hsl(${i * 18}, 80%, 60%)`}
            emissive={`hsl(${i * 18}, 80%, 40%)`}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function HiddenMessage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <group position={[-9.7, 0.5, 8]}>
      <mesh
        onClick={() => setRevealed(!revealed)}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#888" transparent opacity={0.3} />
      </mesh>
      {revealed && (
        <Html position={[0.5, 0.5, 0]} center>
          <div className="bg-purple-100 px-3 py-2 rounded-lg text-xs text-purple-800 whitespace-nowrap shadow-md">
            Built with ❤️ and Three.js
          </div>
        </Html>
      )}
    </group>
  );
}

export function EasterEggs() {
  return (
    <>
      <SpinningCube />
      <KonamiListener />
      <HiddenMessage />
    </>
  );
}
