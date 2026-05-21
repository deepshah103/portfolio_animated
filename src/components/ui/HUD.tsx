'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { ZONES } from '@/data/zones';

export function HUD() {
  const { controlMode, currentZone, isInteracting, startInteraction } = useGameStore();

  const zone = currentZone ? ZONES.find((z) => z.id === currentZone) : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.code === 'KeyE' || e.code === 'Space') && currentZone && !isInteracting) {
        startInteraction();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentZone, isInteracting, startInteraction]);

  if (isInteracting) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Zone interaction prompt */}
      {zone && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(0,200,255,0.15)] animate-pulse">
          <p className="text-sm font-medium text-cyan-100">
            <span className="mr-2">{zone.icon}</span>
            {zone.description}
            <span className="ml-3 px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded text-xs font-bold border border-cyan-500/40">E</span>
          </p>
        </div>
      )}

      {/* Control hints */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700/50">
        <p className="text-xs text-gray-400">
          {controlMode === 'ai' ? (
            'Press WASD to take control'
          ) : (
            'WASD move • E interact'
          )}
        </p>
      </div>

      {/* Mode indicator + accessible link */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <a href="/flat" className="text-xs text-gray-500 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-gray-700/50 hover:text-cyan-300 hover:border-cyan-500/40 pointer-events-auto transition-colors">
          Text View
        </a>
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-gray-700/50">
          <div className={`w-2 h-2 rounded-full ${controlMode === 'ai' ? 'bg-green-400 shadow-[0_0_6px_rgba(0,255,100,0.6)]' : 'bg-cyan-400 shadow-[0_0_6px_rgba(0,200,255,0.6)]'}`} />
          <span className="text-xs text-gray-400">
            {controlMode === 'ai' ? 'Auto' : 'You'}
          </span>
        </div>
      </div>
    </div>
  );
}
