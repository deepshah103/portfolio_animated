'use client';

import { useGameStore } from '@/stores/gameStore';

export function LoadingScreen() {
  const { isLoaded } = useGameStore();

  if (isLoaded) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-sky-50 to-cyan-50">
      <div className="text-center">
        <div className="w-48 h-1.5 bg-cyan-100 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-cyan-500 rounded-full animate-pulse w-2/3 shadow-[0_0_10px_rgba(0,200,255,0.5)]" />
        </div>
        <p className="text-sm text-cyan-600 font-medium">Initializing lab...</p>
      </div>
    </div>
  );
}
