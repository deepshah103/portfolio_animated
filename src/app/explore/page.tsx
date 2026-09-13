'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { HUD } from '@/components/ui/HUD';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { InteractionPanel } from '@/components/ui/InteractionPanel';
import { MobileControls } from '@/components/ui/MobileControls';

const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((mod) => ({ default: mod.Scene })),
  { ssr: false }
);

export default function Home() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`relative h-[100dvh] w-full overflow-hidden bg-slate-950 transition-opacity duration-700 ${entered ? 'opacity-100' : 'opacity-0'}`}>
      <Scene />
      <HUD />
      <InteractionPanel />
      <MobileControls />
      <LoadingScreen />
    </div>
  );
}
