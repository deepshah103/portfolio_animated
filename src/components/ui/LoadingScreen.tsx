'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

const STEPS = ['Environment', 'Character', 'Workspace modules', 'AI systems'];

export function LoadingScreen() {
  const isLoaded = useGameStore((s) => s.isLoaded);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    if (isLoaded) {
      setProgress(100);
      return;
    }
    const interval = window.setInterval(() => {
      setProgress((value) => Math.min(value + Math.random() * 10, 92));
    }, 180);
    return () => window.clearInterval(interval);
  }, [isLoaded]);

  if (isLoaded && progress >= 100) return null;

  const activeStep = Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length));

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020617] text-white transition-opacity duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,.14),transparent_32%),linear-gradient(135deg,#020617,#0f172a)]" />
      <div className="relative w-full max-w-md px-6">
        <div className="mb-10 flex items-end justify-between"><div><div className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Deep Shah</div><div className="mt-2 text-3xl font-semibold tracking-tight">Initializing world</div></div><div className="text-2xl font-black text-cyan-300">{Math.round(progress)}%</div></div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
        <div className="mt-5 grid grid-cols-2 gap-2">{STEPS.map((step, index) => <div key={step} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition ${index <= activeStep ? 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-500'}`}><span>{index < activeStep || isLoaded ? '✓' : index === activeStep ? '•' : '○'}</span>{step}</div>)}</div>
        <p className="mt-6 text-center text-xs text-slate-400">Preparing an interactive portfolio workspace…</p>
      </div>
    </div>
  );
}
