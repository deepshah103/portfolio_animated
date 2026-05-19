'use client';

import { useEffect, useRef } from 'react';
import { ZONES } from '@/data/zones';
import { useGameStore } from '@/stores/gameStore';

interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
  mobileX: number;
  mobileZ: number;
}

export function useKeyboard() {
  const keys = useRef<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    interact: false,
    mobileX: 0,
    mobileZ: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        case 'KeyE':
        case 'Space':
          keys.current.interact = true;
          break;
      }

      // Teleport shortcuts: keys 1-8
      const num = parseInt(e.key);
      if (num >= 1 && num <= ZONES.length) {
        const zone = ZONES[num - 1];
        const store = useGameStore.getState();
        store.setCharacterPosition(zone.interactionPoint);
        store.setControlMode('user');
        store.updateLastInputTime();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        case 'KeyE':
        case 'Space':
          keys.current.interact = false;
          break;
      }
    };

    // Poll mobile input
    const mobileInterval = setInterval(() => {
      const mobileInput = ((window as unknown) as { __mobileInput?: { x: number; z: number } }).__mobileInput;
      if (mobileInput) {
        keys.current.mobileX = mobileInput.x || 0;
        keys.current.mobileZ = mobileInput.z || 0;
      }
    }, 16);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(mobileInterval);
    };
  }, []);

  return keys;
}
