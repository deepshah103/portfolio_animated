'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, DirectionalLight, AmbientLight, Fog } from 'three';

const DAY_BG = new Color('#e8f0f8');
const NIGHT_BG = new Color('#1a2030');
const CYCLE_DURATION = 120;

export function Lighting({ shadows = true }: { shadows?: boolean }) {
  const { scene } = useThree();
  const sunRef = useRef<DirectionalLight>(null);
  const ambientRef = useRef<AmbientLight>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = (Math.sin(timeRef.current * (Math.PI * 2) / CYCLE_DURATION) + 1) / 2;

    const bgColor = DAY_BG.clone().lerp(NIGHT_BG, 1 - t);
    scene.background = bgColor;
    if (scene.fog && 'color' in scene.fog) {
      (scene.fog as Fog).color.copy(bgColor);
    }

    if (sunRef.current) {
      sunRef.current.intensity = 0.3 + t * 1.2;
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.25 + t * 0.35;
    }
  });

  return (
    <>
      {/* Main sunlight — animated by day/night cycle */}
      <directionalLight
        ref={sunRef}
        position={[5, 8, 3]}
        intensity={1.5}
        castShadow={shadows}
        shadow-mapSize-width={shadows ? 2048 : 512}
        shadow-mapSize-height={shadows ? 2048 : 512}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Warm ambient fill — animated */}
      <ambientLight ref={ambientRef} intensity={0.6} color="#fff5e6" />

      {/* Soft fill (static) */}
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#e6f0ff" />

      {/* Hemisphere light */}
      <hemisphereLight args={["#ffeedd", "#f0f0ff", 0.4]} />

      {/* Desk LED accent light */}
      <pointLight position={[0, 1.5, -3]} intensity={0.5} color="#88ccff" distance={5} />
    </>
  );
}
