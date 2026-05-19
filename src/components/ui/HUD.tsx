'use client';

import { useGameStore } from '@/stores/gameStore';

export function HUD() {
  const { controlMode, currentZone } = useGameStore();

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Zone indicator */}
      {currentZone && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
          <p className="text-sm font-medium text-gray-700">{currentZone}</p>
        </div>
      )}

      {/* Control hints */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        <p className="text-xs text-gray-500">
          {controlMode === 'ai' ? (
            'Press WASD to take control'
          ) : (
            'WASD to move • E to interact • Wait to release control'
          )}
        </p>
      </div>

      {/* Mode indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${controlMode === 'ai' ? 'bg-green-400' : 'bg-blue-400'}`} />
        <span className="text-xs text-gray-500 bg-white/70 backdrop-blur-sm px-2 py-1 rounded">
          {controlMode === 'ai' ? 'Auto' : 'You'}
        </span>
      </div>
    </div>
  );
}
