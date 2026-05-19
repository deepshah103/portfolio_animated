'use client';

import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.1} darkness={0.3} />
      <SMAA />
    </EffectComposer>
  );
}
