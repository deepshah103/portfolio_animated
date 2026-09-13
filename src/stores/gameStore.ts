import { create } from 'zustand';

interface GameState {
  characterPosition: [number, number, number];
  characterRotation: number;
  currentAnimation: string;
  controlMode: 'user' | 'ai';
  lastInputTime: number;
  currentZone: string | null;
  isInteracting: boolean;
  isLoaded: boolean;

  setCharacterPosition: (pos: [number, number, number]) => void;
  setCharacterRotation: (rot: number) => void;
  setCurrentAnimation: (anim: string) => void;
  setControlMode: (mode: 'user' | 'ai') => void;
  updateLastInputTime: () => void;
  enterZone: (zoneId: string) => void;
  leaveZone: () => void;
  startInteraction: () => void;
  endInteraction: () => void;
  exitActivity: () => void;
  jumpToZone: (zoneId: string) => void;
  setLoaded: (loaded: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  characterPosition: [0, 0, 0],
  characterRotation: 0,
  currentAnimation: 'idle',
  controlMode: 'ai',
  lastInputTime: 0,
  currentZone: null,
  isInteracting: false,
  isLoaded: false,

  setCharacterPosition: (pos) => set({ characterPosition: pos }),
  setCharacterRotation: (rot) => set({ characterRotation: rot }),
  setCurrentAnimation: (anim) => set({ currentAnimation: anim }),
  setControlMode: (mode) => set({ controlMode: mode }),
  updateLastInputTime: () => set({ lastInputTime: Date.now() }),
  enterZone: (zoneId) => set({ currentZone: zoneId }),
  leaveZone: () => set({ currentZone: null }),
  startInteraction: () => set({ isInteracting: true }),
  endInteraction: () => set({ isInteracting: false }),
  exitActivity: () => set({ isInteracting: false, controlMode: 'user', currentAnimation: 'idle', lastInputTime: Date.now() }),
  jumpToZone: (zoneId) => {
    // Kept as a lightweight store action; the UI passes a valid zone id and the
    // HUD resolves the actual interaction point before calling setCharacterPosition.
    set({ currentZone: zoneId, controlMode: 'user', isInteracting: false, lastInputTime: Date.now() });
  },
  setLoaded: (loaded) => set({ isLoaded: loaded }),
}));
