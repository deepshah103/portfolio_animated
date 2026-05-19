'use client';

import { useGameStore } from '@/stores/gameStore';
import { PORTFOLIO } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

function ProjectCard({ project }: { project: { title: string; description: string; techStack: string[]; github?: string; liveUrl?: string } }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <h4 className="font-semibold text-gray-800 mb-1">{project.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.techStack.map((tech) => (
          <span key={tech} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-800 underline">
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:text-blue-700 underline">
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
        <span key={skill} className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm rounded-lg font-medium border border-blue-100">
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
          className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100">
          <span className="text-lg font-semibold text-gray-700">{link.label}</span>
          <span className="text-gray-400 ml-auto">→</span>
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
            className="absolute inset-0 bg-black/20 z-20"
            onClick={endInteraction}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full sm:w-[480px] bg-white/95 backdrop-blur-xl z-30 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                <p className="text-sm text-gray-500">{section.subtitle}</p>
              </div>
              <button
                onClick={endInteraction}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              <p className="text-gray-600 leading-relaxed">{section.content}</p>

              {section.projects && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Projects</h3>
                  {section.projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </div>
              )}

              {section.skills && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Technical Skills</h3>
                  <SkillBadges skills={section.skills} />
                </div>
              )}

              {section.links && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Links</h3>
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
