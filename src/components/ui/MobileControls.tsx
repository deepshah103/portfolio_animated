'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

interface TouchState { active: boolean; startX: number; startY: number; currentX: number; currentY: number; }

export function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const touchState = useRef<TouchState>({ active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 });
  const { isInteracting, currentZone, startInteraction, exitActivity, setControlMode, updateLastInputTime } = useGameStore();

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = joystickRef.current?.getBoundingClientRect();
    if (!rect) return;
    touchState.current = { active: true, startX: rect.left + rect.width / 2, startY: rect.top + rect.height / 2, currentX: touch.clientX, currentY: touch.clientY };
    setControlMode('user');
    updateLastInputTime();
  }, [setControlMode, updateLastInputTime]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchState.current.active) return;
    e.preventDefault();
    const touch = e.touches[0];
    touchState.current.currentX = touch.clientX;
    touchState.current.currentY = touch.clientY;
    const dx = touch.clientX - touchState.current.startX;
    const dy = touch.clientY - touchState.current.startY;
    const maxDist = 50;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
    const angle = Math.atan2(dy, dx);
    if (knobRef.current) knobRef.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
    updateLastInputTime();
  }, [updateLastInputTime]);

  const handleTouchEnd = useCallback(() => {
    touchState.current.active = false;
    if (knobRef.current) knobRef.current.style.transform = 'translate(0px, 0px)';
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      const input = ((window as unknown) as { __mobileInput?: { x: number; z: number } });
      if (!touchState.current.active) { input.__mobileInput = { x: 0, z: 0 }; return; }
      const dx = touchState.current.currentX - touchState.current.startX;
      const dy = touchState.current.currentY - touchState.current.startY;
      const maxDist = 50;
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
      input.__mobileInput = { x: (dx / maxDist) * (dist / maxDist), z: (dy / maxDist) * (dist / maxDist) };
    }, 16);
    return () => clearInterval(interval);
  }, [isMobile]);

  if (!isMobile || isInteracting) return null;
  const leaveActivity = currentZone === 'bed' || currentZone === 'couch';

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="flex items-end justify-between px-5">
        <div className="relative">
          <div ref={joystickRef} className="grid h-32 w-32 touch-none place-items-center rounded-full border-2 border-cyan-300/80 bg-slate-950/40 shadow-[0_0_30px_rgba(6,182,212,.2)] backdrop-blur-xl pointer-events-auto" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <span className="absolute top-2 text-[10px] font-black text-cyan-200/70">▲</span><span className="absolute bottom-2 text-[10px] font-black text-cyan-200/70">▼</span><span className="absolute left-2 text-[10px] font-black text-cyan-200/70">◀</span><span className="absolute right-2 text-[10px] font-black text-cyan-200/70">▶</span>
            <div ref={knobRef} className="h-14 w-14 rounded-full border-2 border-cyan-300 bg-cyan-400/80 shadow-[0_0_18px_rgba(34,211,238,.55)] transition-transform duration-75" />
          </div>
          <div className="mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70">Drag to move</div>
        </div>

        {currentZone && (
          <button onClick={() => (leaveActivity ? exitActivity() : startInteraction())} className={`mb-5 grid h-20 w-20 place-items-center rounded-3xl border shadow-[0_0_24px_rgba(6,182,212,.25)] pointer-events-auto active:scale-95 ${leaveActivity ? 'border-amber-300 bg-amber-400 text-slate-950' : 'border-cyan-300 bg-cyan-500 text-white'}`}>
            <span className="text-sm font-black">{leaveActivity ? 'LEAVE' : 'EXPLORE'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
