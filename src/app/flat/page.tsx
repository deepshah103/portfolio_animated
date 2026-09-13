import { PORTFOLIO } from '@/data/portfolio';
import { ZONES } from '@/data/zones';
import Link from 'next/link';

export const metadata = {
  title: 'Deep Shah | Portfolio',
  description: 'Deep Shah — Software Engineer, Data Scientist & AI Builder. Professional and personal projects.',
};

export default function FlatPortfolio() {
  const contentZones = ZONES.filter((zone) => PORTFOLIO[zone.id]?.projects?.length || PORTFOLIO[zone.id]?.skills?.length || PORTFOLIO[zone.id]?.links?.length);

  return (
    <div className="min-h-screen bg-[#f5fbff] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-cyan-100 bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-lg">Deep Shah</div>
            <div className="text-xs text-slate-500">Software Engineer · Data Scientist · AI Builder</div>
          </div>
          <Link href="/" className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100">
            Enter 3D Portfolio →
          </Link>
        </div>
      </header>

      <section className="border-b border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Portfolio / Text View</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">I build software, ML systems & AI products.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            From production enterprise GenAI and computer vision to full-stack products and Android applications, I work across software engineering, data science and applied AI.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#featured" className="rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-700">Explore projects</a>
            <a href="#skills" className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-cyan-300">View skills</a>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section id="featured" className="mb-16">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-600">Selected Work</p>
            <h2 className="mt-1 text-3xl font-bold">Projects & Experience</h2>
            <p className="mt-2 text-slate-500">A direct view of the work behind the interactive portfolio.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {contentZones.map((zone) => {
              const section = PORTFOLIO[zone.id];
              if (!section?.projects?.length) return null;
              return (
                <section key={zone.id} id={zone.id} className="scroll-mt-24">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-2xl">{zone.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{section.title}</h3>
                      <p className="text-sm text-slate-500">{section.subtitle}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {section.projects.map((project) => (
                      <article key={project.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        <h4 className="text-lg font-semibold">{project.title}</h4>
                        {project.context && <p className="mt-1 text-xs font-medium text-cyan-700">{project.context}</p>}
                        <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
                        {project.impact && (
                          <div className="mt-4 rounded-xl bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-800">
                            <span className="font-bold">Impact: </span>{project.impact}
                          </div>
                        )}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-xs text-cyan-700">{tech}</span>
                          ))}
                        </div>
                        {(project.github || project.liveUrl) && (
                          <div className="mt-4 flex gap-4 text-sm font-medium">
                            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-cyan-700">GitHub ↗</a>}
                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-cyan-700">Live Demo ↗</a>}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section id="skills" className="border-t border-slate-200 pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-600">Toolkit</p>
          <h2 className="mt-1 text-3xl font-bold">Skills & Education</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {(PORTFOLIO['skill-shelf']?.skills || []).map((skill) => (
              <span key={skill} className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm text-indigo-700">{skill}</span>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {['bookshelf', 'lounge'].map((id) => {
            const section = PORTFOLIO[id];
            if (!section) return null;
            return (
              <div key={id} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="mt-2 text-slate-600">{section.content}</p>
                {section.links?.length ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {section.links.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-slate-100 px-4 py-2 text-sm hover:bg-cyan-50">{link.label} ↗</a>)}
                  </div>
                ) : null}
              </div>
            );
          })}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Deep Shah · Built with Next.js & React Three Fiber.</p>
          <Link href="/" className="mt-2 inline-block text-cyan-700 hover:underline">← Return to interactive portfolio</Link>
        </div>
      </footer>
    </div>
  );
}
