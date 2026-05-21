'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

interface TouchState {
  active: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const touchState = useRef<TouchState>({ active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 });
  const knobRef = useRef<HTMLDivElement>(null);
  const { isInteracting, currentZone, startInteraction, setControlMode, updateLastInputTime } = useGameStore();

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = joystickRef.current?.getBoundingClientRect();
    if (!rect) return;

    touchState.current = {
      active: true,
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
      currentX: touch.clientX,
      currentY: touch.clientY,
    };
    setControlMode('user');
    updateLastInputTime();
  }, [setControlMode, updateLastInputTime]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchState.current.active) return;
    const touch = e.touches[0];
    touchState.current.currentX = touch.clientX;
    touchState.current.currentY = touch.clientY;

    const dx = touch.clientX - touchState.current.startX;
    const dy = touch.clientY - touchState.current.startY;
    const maxDist = 40;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
    const angle = Math.atan2(dy, dx);

    if (knobRef.current) {
      knobRef.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
    }

    updateLastInputTime();
  }, [updateLastInputTime]);

  const handleTouchEnd = useCallback(() => {
    touchState.current.active = false;
    if (knobRef.current) {
      knobRef.current.style.transform = 'translate(0px, 0px)';
    }
  }, []);

  // Expose joystick direction for the character controller
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      if (!touchState.current.active) {
        ((window as unknown) as { __mobileInput: { x: number; z: number } }).__mobileInput = { x: 0, z: 0 };
        return;
      }
      const dx = touchState.current.currentX - touchState.current.startX;
      const dy = touchState.current.currentY - touchState.current.startY;
      const maxDist = 40;
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
      const nx = (dx / maxDist) * (dist / maxDist);
      const nz = (dy / maxDist) * (dist / maxDist);
      ((window as unknown) as { __mobileInput: { x: number; z: number } }).__mobileInput = { x: nx, z: nz };
    }, 16);

    return () => clearInterval(interval);
  }, [isMobile]);

  if (!isMobile || isInteracting) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
      <div className="flex justify-between items-end p-6">
        {/* Joystick */}
        <div
          ref={joystickRef}
          className="w-28 h-28 rounded-full bg-black/50 backdrop-blur-sm border-2 border-cyan-500/40 flex items-center justify-center pointer-events-auto shadow-[0_0_15px_rgba(0,200,255,0.1)]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={knobRef}
            className="w-12 h-12 rounded-full bg-cyan-500/40 border border-cyan-400/60 shadow-[0_0_10px_rgba(0,200,255,0.3)] transition-transform duration-75"
          />
        </div>

        {/* Interact button */}
        {currentZone && (
          <button
            onClick={() => startInteraction()}
            className="w-16 h-16 rounded-full bg-cyan-500/80 text-gray-950 font-bold text-lg shadow-[0_0_20px_rgba(0,200,255,0.4)] pointer-events-auto active:scale-90 transition-transform border border-cyan-400/60"
          >
            E
          </button>
        )}
      </div>
    </div>
  );
}
