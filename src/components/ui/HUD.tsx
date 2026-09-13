'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { ZONES } from '@/data/zones';
import { assetPath } from '@/utils/basePath';

export function HUD() {
  const { controlMode, currentZone, isInteracting, startInteraction, exitActivity } = useGameStore();

  const zone = currentZone ? ZONES.find((z) => z.id === currentZone) : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.code === 'KeyE' || e.code === 'Space') && currentZone && !isInteracting) {
        if (currentZone === 'bed' || currentZone === 'couch') {
          exitActivity();
        } else {
          startInteraction();
        }
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
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl border border-cyan-300 shadow-[0_0_20px_rgba(0,200,255,0.2)] animate-pulse">
          <p className="text-sm font-medium text-gray-700">
            <span className="mr-2">{zone.icon}</span>
            {zone.description}
            <span className="ml-3 px-2 py-0.5 bg-cyan-500 text-white rounded text-xs font-bold">{zone.id === 'bed' || zone.id === 'couch' ? 'E · Leave' : 'E'}</span>
          </p>
        </div>
      )}

      {/* Control hints */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-200 shadow-sm">
        <p className="text-xs text-gray-500">
          {controlMode === 'ai' ? (
            'Press WASD to take control'
          ) : (
            'WASD move • E interact'
          )}
        </p>
      </div>

      {/* Mode indicator + accessible link */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <a href={assetPath('/flat')} className="text-xs text-gray-500 bg-white/80 backdrop-blur-md px-2 py-1 rounded border border-cyan-200 hover:text-cyan-600 hover:border-cyan-400 pointer-events-auto transition-colors">
          Text View
        </a>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded border border-cyan-200">
          <div className={`w-2 h-2 rounded-full ${controlMode === 'ai' ? 'bg-emerald-400 shadow-[0_0_6px_rgba(0,200,100,0.5)]' : 'bg-cyan-500 shadow-[0_0_6px_rgba(0,200,255,0.5)]'}`} />
          <span className="text-xs text-gray-600">
            {controlMode === 'ai' ? 'Auto' : 'You'}
          </span>
        </div>
      </div>
    </div>
  );
}
