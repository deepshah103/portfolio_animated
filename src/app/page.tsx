'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-slate-950 text-white">
      {/* Ambient workspace-like background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(99,102,241,0.18),transparent_32%),linear-gradient(135deg,#020617,#0f172a_55%,#111827)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-6 py-8 md:px-10">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold tracking-tight">DEEP SHAH</div>
            <div className="mt-1 text-xs tracking-[0.22em] text-cyan-300/70">SOFTWARE · DATA · AI</div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 backdrop-blur">
            Portfolio
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-12">
          <div className={`w-full max-w-5xl text-center transition-all duration-700 ${show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Welcome to my workspace</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              How would you like to explore?
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              I build software, machine-learning systems and generative AI products.
              Choose an interactive walkthrough or jump straight into the work.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Link
                href="/?experience=3d"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/?experience=3d&start=1';
                }}
                className="group relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-white/[0.06] p-7 text-left shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-300/[0.08]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-indigo-400/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-3xl">◈</span>
                    <span className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-200">IMMERSIVE</span>
                  </div>
                  <h2 className="text-2xl font-semibold">Interactive Experience</h2>
                  <p className="mt-3 min-h-14 text-sm leading-6 text-slate-300">
                    Walk through my virtual workspace, discover projects and interact with the environment.
                  </p>
                  <span className="mt-6 inline-flex rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition group-hover:bg-cyan-300">
                    Enter the workspace →
                  </span>
                </div>
              </Link>

              <Link
                href="/flat"
                className="group relative overflow-hidden rounded-3xl border border-indigo-300/20 bg-white/[0.06] p-7 text-left shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-indigo-300/50 hover:bg-indigo-300/[0.08]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/10 via-transparent to-cyan-400/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-3xl">▣</span>
                    <span className="rounded-full border border-indigo-300/20 px-3 py-1 text-xs text-indigo-200">DIRECT</span>
                  </div>
                  <h2 className="text-2xl font-semibold">Text Portfolio</h2>
                  <p className="mt-3 min-h-14 text-sm leading-6 text-slate-300">
                    Browse my projects, experience, skills and contact information in a traditional portfolio.
                  </p>
                  <span className="mt-6 inline-flex rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition group-hover:bg-white/15">
                    Browse portfolio →
                  </span>
                </div>
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
              <span>Software Engineering</span>
              <span>·</span>
              <span>Data Science</span>
              <span>·</span>
              <span>Generative AI</span>
            </div>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 md:flex-row">
          <span>Deep Shah · Software Engineer · Data Scientist · AI Builder</span>
          <div className="flex gap-4">
            <a className="hover:text-cyan-300" href="https://github.com/deepshah103" target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-cyan-300" href="https://www.linkedin.com/in/deepshah/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
