'use client';
import { useEffect, useMemo, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { ZONES } from '@/data/zones';
import { MissionPanel } from '@/components/ui/MissionPanel';
import { assetPath } from '@/utils/basePath';

const NAV_ZONES = ZONES.filter((zone) => !['bed', 'couch', 'coding-desk'].includes(zone.id));
const TOUR_ZONES = ['workstation', 'ai-corner', 'whiteboard', 'phone-dock', 'bookshelf', 'skill-shelf', 'lounge'];

function MiniMap({ onJump }: { onJump: (zoneId: string) => void }) {
  const position = useGameStore((s) => s.characterPosition);
  const currentZone = useGameStore((s) => s.currentZone);
  const [x, , z] = position;
  const playerLeft = Math.max(4, Math.min(96, ((x + 6) / 12) * 100));
  const playerTop = Math.max(4, Math.min(96, ((z + 5.5) / 11) * 100));

  return (
    <div className="absolute bottom-6 right-6 hidden sm:block pointer-events-auto">
      <div className="w-44 rounded-2xl border border-cyan-200/80 bg-white/80 p-3 shadow-[0_10px_40px_rgba(0,120,180,0.16)] backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Workspace map</span>
          <span className="text-[10px] text-cyan-600">You are here</span>
        </div>
        <div className="relative h-28 overflow-hidden rounded-xl border border-cyan-100 bg-slate-50">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.14) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
          {NAV_ZONES.map((zone) => {
            const left = ((zone.position[0] + 6) / 12) * 100;
            const top = ((zone.position[2] + 5.5) / 11) * 100;
            const active = zone.id === currentZone;
            return <button key={zone.id} title={zone.name} aria-label={`Jump to ${zone.name}`} onClick={() => onJump(zone.id)} className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border transition ${active ? 'scale-125 border-cyan-500 bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,.7)]' : 'border-white bg-indigo-400/80 hover:scale-125 hover:bg-cyan-400'}`} style={{ left: `${left}%`, top: `${top}%` }} />;
          })}
          <div className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-900 shadow-[0_0_10px_rgba(15,23,42,.45)] transition-all duration-150" style={{ left: `${playerLeft}%`, top: `${playerTop}%` }} />
        </div>
        <p className="mt-2 text-[10px] text-slate-500">Click a room to teleport.</p>
      </div>
    </div>
  );
}

export function HUD() {
  const { controlMode, currentZone, isInteracting, startInteraction, exitActivity, setCharacterPosition, setControlMode, updateLastInputTime, setUiOverlayOpen } = useGameStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tourRunning, setTourRunning] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const zone = currentZone ? ZONES.find((z) => z.id === currentZone) : null;

  const filteredZones = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NAV_ZONES.filter((item) => !q || `${item.name} ${item.description}`.toLowerCase().includes(q));
  }, [query]);

  const jumpToZone = (zoneId: string) => {
    const target = ZONES.find((item) => item.id === zoneId);
    if (!target) return;
    setCharacterPosition(target.interactionPoint);
    setControlMode('user');
    updateLastInputTime();
    useGameStore.getState().jumpToZone(zoneId);
    setMenuOpen(false);
    setCommandOpen(false);
  };

  useEffect(() => {
    const seen = window.localStorage.getItem('deep-portfolio-help-seen');
    if (!seen) setShowWelcome(true);

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' || e.code === 'Space') {
        if (isInteracting) {
          e.preventDefault();
          exitActivity();
        } else if (currentZone) {
          e.preventDefault();
          startInteraction();
        }
      }
      if (e.code === 'KeyM') setMenuOpen((open) => !open);
      if (e.code === 'KeyK' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); setQuery(''); setCommandOpen(true); }
      if (e.code === 'Escape') { setMenuOpen(false); setCommandOpen(false); setHelpOpen(false); }
      if (e.key === '?') setHelpOpen((open) => !open);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentZone, isInteracting, startInteraction, exitActivity]);

  useEffect(() => {
    setUiOverlayOpen(showWelcome || helpOpen || commandOpen);
  }, [showWelcome, helpOpen, commandOpen, setUiOverlayOpen]);

  useEffect(() => {
    if (!tourRunning) return;
    if (tourIndex >= TOUR_ZONES.length) { setTourRunning(false); return; }
    jumpToZone(TOUR_ZONES[tourIndex]);
    const timer = window.setTimeout(() => setTourIndex((index) => index + 1), 2600);
    return () => window.clearTimeout(timer);
  }, [tourRunning, tourIndex]);

  const finishWelcome = () => { window.localStorage.setItem('deep-portfolio-help-seen', '1'); setShowWelcome(false); };
  if (isInteracting) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="flex items-center gap-2 rounded-2xl border border-cyan-200/80 bg-white/80 px-3 py-2 shadow-[0_10px_40px_rgba(0,120,180,0.14)] backdrop-blur-xl">
          <a href={assetPath('/')} className="font-bold text-sm tracking-tight text-slate-800 hover:text-cyan-700">DS</a><span className="h-4 w-px bg-slate-200" />
          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-700">Explore</button>
          <button onClick={() => setHelpOpen(true)} className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100" aria-label="Show controls">?</button>
        </div>
        {menuOpen && <div className="mt-2 w-64 rounded-2xl border border-cyan-100 bg-white/95 p-3 shadow-2xl backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between px-2"><div><div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Workspace</div><div className="text-sm font-semibold text-slate-800">Jump anywhere</div></div><kbd className="rounded-md bg-slate-100 px-1.5 py-1 text-[10px] text-slate-500">M</kbd></div>
          <div className="space-y-1">{NAV_ZONES.map((item) => <button key={item.id} onClick={() => jumpToZone(item.id)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-cyan-50"><span className="text-base">{item.icon}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-700">{item.name}</span><span className="block truncate text-[10px] text-slate-400">{item.description}</span></span><span className="text-cyan-500">→</span></button>)}</div>
          <button onClick={() => { setTourIndex(0); setTourRunning(true); setMenuOpen(false); }} className="mt-2 w-full rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2.5 text-xs font-bold text-cyan-700 hover:bg-cyan-100">✨ Start guided tour</button>
          <a href={assetPath('/flat')} className="mt-2 block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-center text-xs font-bold text-slate-600 hover:border-cyan-200 hover:text-cyan-700">Text portfolio →</a>
        </div>}
      </div>

      {zone && <div className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none animate-[pulse_2.5s_ease-in-out_infinite]"><div className="rounded-2xl border border-cyan-300/70 bg-slate-950/85 px-4 py-2.5 text-white shadow-[0_0_28px_rgba(34,211,238,.22)] backdrop-blur-xl"><div className="flex items-center gap-3 text-sm"><span className="text-lg">{zone.icon}</span><div><div className="font-semibold">{zone.name}</div><div className="text-[10px] text-slate-300">{zone.description}</div></div><span className="rounded-lg bg-cyan-400 px-2.5 py-1 text-[10px] font-black text-slate-950">{zone.id === 'bed' || zone.id === 'couch' || isInteracting ? 'E · LEAVE' : 'E · EXPLORE'}</span></div></div></div>}

      <div className="absolute top-4 right-4 pointer-events-auto flex items-center gap-2"><button onClick={() => { setQuery(''); setCommandOpen(true); }} className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-cyan-200/80 bg-white/80 px-3 py-2 text-[10px] font-semibold text-slate-500 shadow-lg backdrop-blur-xl hover:text-cyan-700"><span>⌘K</span><span>Search</span></button><a href={assetPath('/flat')} className="rounded-xl border border-cyan-200/80 bg-white/80 px-3 py-2 text-[10px] font-semibold text-slate-500 shadow-lg backdrop-blur-xl hover:text-cyan-700">Text View</a><div className="flex items-center gap-2 rounded-xl border border-cyan-200/80 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-xl"><div className={`h-2 w-2 rounded-full ${controlMode === 'ai' ? 'bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,.7)]' : 'bg-cyan-500 shadow-[0_0_9px_rgba(6,182,212,.7)]'}`} /><span className="text-[10px] font-semibold text-slate-600">{controlMode === 'ai' ? 'AUTO' : 'YOU'}</span></div></div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto hidden sm:flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-950/75 px-3 py-2 text-[10px] text-slate-300 shadow-xl backdrop-blur-xl"><span className="font-semibold text-white">WASD</span> move <span className="text-slate-500">•</span> <span className="font-semibold text-white">E</span> interact <span className="text-slate-500">•</span> <span className="font-semibold text-white">M</span> map <span className="text-slate-500">•</span> <span className="font-semibold text-white">?</span> help</div>
      <MissionPanel />
      <MiniMap onJump={jumpToZone} />

      {(helpOpen || showWelcome) && <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-6 pointer-events-auto backdrop-blur-md"><div className="relative z-[101] w-full max-w-lg rounded-3xl border border-cyan-200/40 bg-white/95 p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">{showWelcome ? 'Welcome' : 'Controls'}</p><h2 className="mt-1 text-2xl font-bold text-slate-900">Explore the workspace</h2></div><button onClick={() => { setHelpOpen(false); finishWelcome(); }} className="rounded-full bg-slate-100 px-3 py-1 text-sm">✕</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[['W A S D','Move around'],['E','Explore / interact'],['M','Open navigation'],['Ctrl/⌘ + K','Command palette'],['?','Open this help'],['ESC','Close overlays']].map(([key,label]) => <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><kbd className="rounded-lg bg-slate-900 px-2 py-1 text-xs font-bold text-white">{key}</kbd><p className="mt-2 text-sm font-medium text-slate-700">{label}</p></div>)}</div><div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50 p-4"><p className="text-xs font-semibold text-cyan-800">Tip</p><p className="mt-1 text-sm text-cyan-900/80">Use the mini-map or Explore menu to jump directly to any room. Start a guided tour for a hands-off walkthrough.</p></div><button onClick={() => { setHelpOpen(false); finishWelcome(); }} className="mt-5 w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-white hover:bg-cyan-600">Start exploring →</button></div></div>}

      {commandOpen && <div className="absolute inset-0 z-50 flex items-start justify-center bg-slate-950/35 p-6 pt-24 pointer-events-auto backdrop-blur-sm" onClick={() => setCommandOpen(false)}><div className="w-full max-w-xl overflow-hidden rounded-3xl border border-cyan-200/50 bg-white/95 shadow-2xl" onClick={(e) => e.stopPropagation()}><div className="border-b border-slate-200 p-4"><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search rooms..." className="w-full bg-transparent text-base outline-none placeholder:text-slate-400" /></div><div className="max-h-80 overflow-y-auto p-2">{filteredZones.map((item) => <button key={item.id} onClick={() => jumpToZone(item.id)} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left hover:bg-cyan-50"><span className="text-xl">{item.icon}</span><span className="flex-1"><span className="block text-sm font-semibold text-slate-800">{item.name}</span><span className="block text-xs text-slate-400">{item.description}</span></span><span className="text-cyan-500">↵</span></button>)}{filteredZones.length === 0 && <div className="p-6 text-center text-sm text-slate-500">No room matches that search.</div>}</div><div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-[10px] text-slate-400"><span>Jump instantly</span><button onClick={() => { setTourIndex(0); setTourRunning(true); setCommandOpen(false); }} className="font-bold text-cyan-600 hover:text-cyan-700">Start guided tour</button></div></div></div>}
    </div>
  );
}
