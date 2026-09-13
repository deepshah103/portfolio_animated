'use client';

import { useGameStore } from '@/stores/gameStore';
import { PORTFOLIO, Project } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-lg"
    >
      <div className="border-b border-slate-100 bg-gradient-to-r from-cyan-50 via-white to-indigo-50 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-bold text-slate-900">{project.title}</div>
            {project.context && <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-700">{project.context}</div>}
          </div>
          <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-cyan-700">Project</span>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <p className="text-sm leading-6 text-slate-600">{project.description}</p>

        {project.impact && (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 p-3">
            <div className="text-[9px] font-black uppercase tracking-[0.14em] text-emerald-700">Impact</div>
            <p className="mt-1 text-xs leading-5 text-emerald-900/80">{project.impact}</p>
          </div>
        )}

        <div>
          <div className="mb-2 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">Tech stack</div>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 transition group-hover:border-cyan-100 group-hover:bg-cyan-50 group-hover:text-cyan-700">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {(project.github || project.liveUrl) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-bold text-white transition hover:bg-cyan-600">GitHub ↗</a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-[11px] font-bold text-cyan-700 transition hover:bg-cyan-100">Live demo ↗</a>}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function SkillBadges({ skills }: { skills: string[] }) {
  return <div className="flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">{skill}</span>)}</div>;
}

function ContactLinks({ links }: { links: { label: string; url: string }[] }) {
  return <div className="flex flex-col gap-2">{links.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-cyan-300 hover:bg-cyan-50"><span className="text-sm font-bold text-slate-700">{link.label}</span><span className="ml-auto text-cyan-500">↗</span></a>)}</div>;
}

export function InteractionPanel() {
  const { isInteracting, currentZone, exitActivity } = useGameStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.code === 'Escape' || e.code === 'KeyE') && isInteracting) {
        e.preventDefault();
        exitActivity();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isInteracting, exitActivity]);

  const section = currentZone ? PORTFOLIO[currentZone] : null;

  return (
    <AnimatePresence>
      {isInteracting && section && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-slate-950/45 backdrop-blur-[2px]" onClick={exitActivity} />
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 210, mass: 0.75 }}
            className="absolute right-0 top-0 z-30 flex h-full w-full max-w-[560px] flex-col overflow-hidden border-l border-cyan-200/70 bg-slate-50/98 shadow-[-20px_0_60px_rgba(8,145,178,.12)] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={section.title}
          >
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/92 px-5 py-4 backdrop-blur-xl">
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,.7)]" /><span className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-700">Workspace module</span></div>
                <h2 className="mt-1 truncate text-xl font-bold tracking-tight text-slate-900">{section.title}</h2>
                <p className="text-xs text-slate-500">{section.subtitle}</p>
              </div>
              <button onClick={exitActivity} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500" aria-label="Close panel">✕</button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 touch-pan-y [scrollbar-gutter:stable]">
              <div className="space-y-6 pb-8">
                <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-indigo-50 p-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-700">Overview</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{section.content}</p>
                </div>

                {section.projects?.length ? <section className="space-y-3"><div className="flex items-end justify-between"><h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Selected work</h3><span className="text-[10px] text-slate-400">{section.projects.length} item{section.projects.length === 1 ? '' : 's'}</span></div>{section.projects.map((project) => <ProjectCard key={project.title} project={project} />)}</section> : null}
                {section.skills?.length ? <section className="space-y-3"><h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Technical skills</h3><SkillBadges skills={section.skills} /></section> : null}
                {section.links?.length ? <section className="space-y-3"><h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Connect</h3><ContactLinks links={section.links} /></section> : null}
              </div>
            </div>

            <footer className="border-t border-slate-200 bg-white/95 px-5 py-3 text-[10px] text-slate-400">Scroll for more · E / ESC closes · Click outside to return to the workspace</footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
