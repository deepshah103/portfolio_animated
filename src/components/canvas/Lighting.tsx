'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, DirectionalLight, AmbientLight, Fog } from 'three';

const DARK_BG = new Color('#0d0d18');
const SLIGHTLY_LIGHTER = new Color('#141422');
const CYCLE_DURATION = 120;

export function Lighting({ shadows = true }: { shadows?: boolean }) {
  const { scene } = useThree();
  const sunRef = useRef<DirectionalLight>(null);
  const ambientRef = useRef<AmbientLight>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = (Math.sin(timeRef.current * (Math.PI * 2) / CYCLE_DURATION) + 1) / 2;

    const bgColor = DARK_BG.clone().lerp(SLIGHTLY_LIGHTER, t);
    scene.background = bgColor;
    if (scene.fog && 'color' in scene.fog) {
      (scene.fog as Fog).color.copy(bgColor);
    }

    if (sunRef.current) {
      sunRef.current.intensity = 0.5 + t * 0.5;
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.4 + t * 0.2;
    }
  });

  return (
    <>
      <directionalLight
        ref={sunRef}
        position={[5, 8, 3]}
        intensity={0.8}
        color="#6699cc"
        castShadow={shadows}
        shadow-mapSize-width={shadows ? 2048 : 512}
        shadow-mapSize-height={shadows ? 2048 : 512}
        shadow-camera-far={15}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      <ambientLight ref={ambientRef} intensity={0.5} color="#334466" />

      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#4466aa" />

      <hemisphereLight args={["#223344", "#111122", 0.4]} />

      {/* Cyan neon accent lights — brighter */}
      <pointLight position={[0, 1.5, -4.5]} intensity={2.0} color="#00ccff" distance={6} />
      <pointLight position={[-5, 1.5, -2.5]} intensity={1.5} color="#00ccff" distance={5} />
      <pointLight position={[3.5, 1.5, 1.5]} intensity={1.5} color="#0088ff" distance={5} />
      <pointLight position={[1.5, 1.5, -5.5]} intensity={1.2} color="#00ffcc" distance={4.5} />
      <pointLight position={[-3, 1.5, -4.5]} intensity={1.0} color="#8844ff" distance={4.5} />

      {/* Warm accent at bed */}
      <pointLight position={[4.5, 1.0, 3.5]} intensity={0.8} color="#ff6600" distance={4} />

      {/* General room fill */}
      <pointLight position={[0, 3, 0]} intensity={0.6} color="#334466" distance={10} />
    </>
  );
}
