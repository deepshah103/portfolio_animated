'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, DirectionalLight, AmbientLight, Fog } from 'three';

const BG_A = new Color('#e8f4fa');
const BG_B = new Color('#d0eaf5');
const CYCLE_DURATION = 120;

export function Lighting({ shadows = true }: { shadows?: boolean }) {
  const { scene } = useThree();
  const sunRef = useRef<DirectionalLight>(null);
  const ambientRef = useRef<AmbientLight>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = (Math.sin(timeRef.current * (Math.PI * 2) / CYCLE_DURATION) + 1) / 2;

    const bgColor = BG_A.clone().lerp(BG_B, t);
    scene.background = bgColor;
    if (scene.fog && 'color' in scene.fog) {
      (scene.fog as Fog).color.copy(bgColor);
    }

    if (sunRef.current) {
      sunRef.current.intensity = 1.2 + t * 0.3;
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.7 + t * 0.1;
    }
  });

  return (
    <>
      {/* Main overhead light — bright white-blue */}
      <directionalLight
        ref={sunRef}
        position={[3, 10, 5]}
        intensity={1.4}
        color="#ffffff"
        castShadow={shadows}
        shadow-mapSize-width={shadows ? 2048 : 512}
        shadow-mapSize-height={shadows ? 2048 : 512}
        shadow-camera-far={15}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Ambient fill — cool blue tint */}
      <ambientLight ref={ambientRef} intensity={0.8} color="#ddeeff" />

      {/* Secondary fill */}
      <directionalLight position={[-4, 6, -3]} intensity={0.5} color="#aaddff" />

      {/* Hemisphere — bright sky/ground */}
      <hemisphereLight args={["#ccedff", "#e0f0ff", 0.6]} />

      {/* Perimeter cyan strips */}
      <pointLight position={[0, 2.5, -5]} intensity={1.5} color="#00ddff" distance={6} />
      <pointLight position={[-5.5, 2.5, 0]} intensity={1.2} color="#00ccee" distance={5} />
      <pointLight position={[5.5, 2.5, 0]} intensity={1.2} color="#00ccee" distance={5} />
      <pointLight position={[0, 2.5, 5]} intensity={1.0} color="#00bbdd" distance={5} />

      {/* Central overhead panel glow */}
      <pointLight position={[0, 3.2, 0]} intensity={1.0} color="#ffffff" distance={8} />

      {/* Zone accents aligned with the restructured workspace */}
      <pointLight position={[-2.8, 1.8, -4.2]} intensity={0.7} color="#9b72ff" distance={3.5} />
      <pointLight position={[0, 1.8, -4.8]} intensity={0.7} color="#00d9ff" distance={3.5} />
      <pointLight position={[3.2, 1.8, -3.8]} intensity={0.55} color="#66dfff" distance={3} />
      <pointLight position={[4.6, 1.8, -2.9]} intensity={0.65} color="#4fdcff" distance={3.5} />
      <pointLight position={[-5.4, 1.6, 1.1]} intensity={0.55} color="#70ffcf" distance={3} />
      <pointLight position={[5.4, 1.8, 0]} intensity={0.6} color="#00eeff" distance={3} />
      <pointLight position={[3.8, 1.6, 1.8]} intensity={0.45} color="#8be7ff" distance={2.8} />
      <pointLight position={[0, 1.4, 3.5]} intensity={0.45} color="#b8efff" distance={3.2} />
      <pointLight position={[4.8, 1.6, 4.0]} intensity={0.4} color="#66ddff" distance={3} />
      <pointLight position={[-3.45, 1.3, 4.1]} intensity={0.5} color="#ffd37a" distance={2.6} />
    </>
  );
}
