'use client';

import { useGameStore } from '@/stores/gameStore';

export function LoadingScreen() {
  const { isLoaded } = useGameStore();

  if (isLoaded) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#f8f5f0]">
      <div className="text-center">
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-blue-400 rounded-full animate-pulse w-2/3" />
        </div>
        <p className="text-sm text-gray-500">Loading workspace...</p>
      </div>
    </div>
  );
}
