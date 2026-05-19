'use client';

import dynamic from 'next/dynamic';
import { HUD } from '@/components/ui/HUD';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { InteractionPanel } from '@/components/ui/InteractionPanel';
import { MobileControls } from '@/components/ui/MobileControls';

const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((mod) => ({ default: mod.Scene })),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Scene />
      <HUD />
      <InteractionPanel />
      <MobileControls />
      <LoadingScreen />
    </div>
  );
}
