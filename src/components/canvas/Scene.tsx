'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Lighting } from './Lighting';
import { World } from './World';
import { Character } from './Character';
import { FollowCamera } from './Camera';

export function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 8], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <color attach="background" args={['#e8f0f8']} />
      <fog attach="fog" args={['#e8f0f8', 15, 30]} />

      <Suspense fallback={null}>
        <Lighting />
        <World />
        <Character />
        <FollowCamera />
      </Suspense>
    </Canvas>
  );
}
