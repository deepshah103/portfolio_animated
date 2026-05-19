import { PORTFOLIO } from '@/data/portfolio';
import { ZONES } from '@/data/zones';
import Link from 'next/link';

export const metadata = {
  title: 'Deep Shah | Portfolio (Accessible View)',
  description: 'Portfolio of Deep Shah — Data Scientist. Accessible text version.',
};

export default function FlatPortfolio() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Deep Shah</h1>
          <p className="text-xl text-gray-600">Data Scientist & Software Engineer</p>
          <p className="mt-4 text-gray-500 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">← Back to 3D Portfolio</Link>
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {ZONES.map((zone) => {
          const section = PORTFOLIO[zone.id];
          if (!section) return null;

          return (
            <section key={zone.id} id={zone.id} className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{zone.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <p className="text-sm text-gray-500 mb-3">{section.subtitle}</p>
              <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>

              {/* Projects */}
              {section.projects && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.projects.map((project) => (
                    <div key={project.title} className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline">GitHub</a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline">Live Demo</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {section.skills && (
                <div className="flex flex-wrap gap-2">
                  {section.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-lg border border-indigo-100">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              {section.links && (
                <div className="flex flex-wrap gap-4">
                  {section.links.map((link) => (
                    <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Deep Shah. Built with Next.js & React Three Fiber.</p>
          <p className="mt-1">
            <Link href="/" className="text-blue-600 hover:underline">View Interactive 3D Version</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
