'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Lighting } from './Lighting';
import { World } from './World';
import { Character } from './Character';
import { CoffeeTerminal } from './CoffeeTerminal';
import { FollowCamera } from './Camera';
import { ZoneManager } from './zones/ZoneManager';
import { PostProcessing } from './PostProcessing';
import { DustParticles } from './Particles';
import { EasterEggs } from './EasterEggs';
import { useGameStore } from '@/stores/gameStore';
import { useSettingsStore } from '@/stores/settingsStore';

export const WORLD_SCALE = 1.45;

function SceneReady() {
  const setLoaded = useGameStore((s) => s.setLoaded);
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);
  return null;
}

export function Scene() {
  const { settings, initialized, initQuality } = useSettingsStore();

  useEffect(() => {
    if (!initialized) initQuality();
  }, [initialized, initQuality]);

  return (
    <Canvas
      shadows={settings.shadows}
      camera={{ position: [0, 3.5, 6], fov: 55 }}
      style={{ width: '100%', height: '100%' }}
      dpr={settings.pixelRatio}
    >
      <color attach="background" args={['#e8f4fa']} />
      <fog attach="fog" args={['#e8f4fa', 18, 32]} />

      <Suspense fallback={null}>
        <Lighting shadows={settings.shadows} />
        <group scale={WORLD_SCALE}>
          <World />
          <CoffeeTerminal />
          <Character />
          <ZoneManager />
          <EasterEggs />
        </group>
        {settings.particles && <DustParticles count={settings.particleCount} />}
        <FollowCamera />
        {settings.postProcessing && <PostProcessing />}
        <SceneReady />
      </Suspense>
    </Canvas>
  );
}
