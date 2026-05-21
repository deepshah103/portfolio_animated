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
    const maxDist = 50;
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
      const maxDist = 50;
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
        {/* Joystick with directional arrows */}
        <div className="relative">
          <div
            ref={joystickRef}
            className="w-32 h-32 rounded-full bg-white/70 backdrop-blur-sm border-2 border-cyan-300 flex items-center justify-center pointer-events-auto shadow-[0_0_20px_rgba(0,200,255,0.2)]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Direction indicators */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-cyan-400/60 text-xs select-none">W</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-cyan-400/60 text-xs select-none">S</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400/60 text-xs select-none">A</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400/60 text-xs select-none">D</span>
            <div
              ref={knobRef}
              className="w-14 h-14 rounded-full bg-cyan-400/70 border-2 border-cyan-500 shadow-[0_0_12px_rgba(0,200,255,0.4)] transition-transform duration-75"
            />
          </div>
        </div>

        {/* Interact button */}
        {currentZone && (
          <button
            onClick={() => startInteraction()}
            className="w-16 h-16 rounded-full bg-cyan-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(0,200,255,0.3)] pointer-events-auto active:scale-90 transition-transform border border-cyan-400"
          >
            E
          </button>
        )}
      </div>
    </div>
  );
}
