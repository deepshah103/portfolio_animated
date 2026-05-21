'use client';

import { useGameStore } from '@/stores/gameStore';
import { PORTFOLIO } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

function ProjectCard({ project }: { project: { title: string; description: string; techStack: string[]; github?: string; liveUrl?: string } }) {
  return (
    <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-colors">
      <h4 className="font-semibold text-gray-100 mb-1">{project.title}</h4>
      <p className="text-sm text-gray-400 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.techStack.map((tech) => (
          <span key={tech} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 text-xs rounded-full font-medium border border-cyan-500/20">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-cyan-300 underline transition-colors">
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-200 underline transition-colors">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

function SkillBadges({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className="px-3 py-1.5 bg-cyan-500/10 text-cyan-200 text-sm rounded-lg font-medium border border-cyan-500/20">
          {skill}
        </span>
      ))}
    </div>
  );
}

function ContactLinks({ links }: { links: { label: string; url: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-gray-900/60 rounded-xl hover:bg-cyan-500/10 transition-colors border border-gray-700/50 hover:border-cyan-500/30">
          <span className="text-lg font-semibold text-gray-200">{link.label}</span>
          <span className="text-cyan-400 ml-auto">→</span>
        </a>
      ))}
    </div>
  );
}

export function InteractionPanel() {
  const { isInteracting, currentZone, endInteraction } = useGameStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isInteracting) {
        endInteraction();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isInteracting, endInteraction]);

  const section = currentZone ? PORTFOLIO[currentZone] : null;

  return (
    <AnimatePresence>
      {isInteracting && section && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 z-20"
            onClick={endInteraction}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full sm:w-[480px] bg-gray-950/95 backdrop-blur-xl z-30 shadow-[0_0_40px_rgba(0,200,255,0.1)] border-l border-cyan-500/20 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800/80 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-100">{section.title}</h2>
                <p className="text-sm text-cyan-400/70">{section.subtitle}</p>
              </div>
              <button
                onClick={endInteraction}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500/20 border border-gray-700 hover:border-red-500/50 transition-colors text-gray-400 hover:text-red-400"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              <p className="text-gray-400 leading-relaxed">{section.content}</p>

              {section.projects && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-cyan-500/70 uppercase tracking-wider">Projects</h3>
                  {section.projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </div>
              )}

              {section.skills && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-cyan-500/70 uppercase tracking-wider">Technical Skills</h3>
                  <SkillBadges skills={section.skills} />
                </div>
              )}

              {section.links && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-cyan-500/70 uppercase tracking-wider">Links</h3>
                  <ContactLinks links={section.links} />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
