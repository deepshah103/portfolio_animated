'use client';

import { useMemo } from 'react';
import { useGameStore } from '@/stores/gameStore';

const OBJECTIVES = [
  { id: 'workstation', icon: '💻', title: 'Explore projects', zone: 'workstation' },
  { id: 'ai-corner', icon: '🧠', title: 'Meet the AI', zone: 'ai-corner' },
  { id: 'skill-shelf', icon: '🏆', title: 'Inspect skills', zone: 'skill-shelf' },
  { id: 'bookshelf', icon: '👤', title: 'Discover the story', zone: 'bookshelf' },
  { id: 'lounge', icon: '✉️', title: 'Find contact', zone: 'lounge' },
];

export function MissionPanel() {
  const currentZone = useGameStore((s) => s.currentZone);
  const visited = useGameStore((s) => {
    const active = s.currentZone;
    return OBJECTIVES.map((item) => item.zone === active || false);
  });

  const completedCount = useMemo(() => visited.filter(Boolean).length, [visited]);

  return (
    <div className="absolute bottom-5 left-5 hidden w-64 pointer-events-auto sm:block">
      <div className="rounded-2xl border border-cyan-200/80 bg-white/82 p-3 shadow-[0_14px_50px_rgba(0,120,180,.14)] backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-600">Optional mission</div>
            <div className="text-sm font-bold text-slate-800">Explore Deep's workspace</div>
          </div>
          <div className="rounded-full bg-cyan-50 px-2 py-1 text-[10px] font-bold text-cyan-700">{completedCount}/5</div>
        </div>
        <div className="space-y-1.5">
          {OBJECTIVES.map((item, index) => {
            const complete = visited[index];
            const active = currentZone === item.zone;
            return (
              <div key={item.id} className={`flex items-center gap-2 rounded-xl px-2.5 py-2 transition ${active ? 'bg-cyan-50 ring-1 ring-cyan-200' : ''}`}>
                <span className={`grid h-6 w-6 place-items-center rounded-lg text-xs ${complete ? 'bg-emerald-100' : 'bg-slate-100'}`}>{complete ? '✓' : item.icon}</span>
                <span className={`flex-1 text-xs font-medium ${complete ? 'text-emerald-700 line-through decoration-emerald-300' : 'text-slate-600'}`}>{item.title}</span>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,.65)]" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
