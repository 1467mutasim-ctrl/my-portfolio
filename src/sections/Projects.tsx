import { projects } from '@/data/portfolio';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectCard } from '@/components/ProjectCard';
import type { ProjectLayout } from '@/components/ProjectCard';

/** One composition per project, cycled by position. */
const layouts: ProjectLayout[] = ['banner', 'split', 'offset'];

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="work-title"
            overline="01 / Work"
            title="SELECTED MISSIONS"
            lead="Machines built to compete, and hardware built to solve something real."
          />
          <p className="hidden font-mono text-[10px] uppercase tracking-overline text-text-faint sm:block">
            {String(projects.length).padStart(2, '0')} projects
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-20 sm:gap-24 lg:mt-20 lg:gap-32">
          {projects.map((project, index) => (
            <div key={project.id} className="relative">
              {index > 0 && (
                <span
                  aria-hidden
                  className="absolute -top-10 left-0 h-px w-full bg-ink-line sm:-top-12 lg:-top-16"
                />
              )}
              <ProjectCard project={project} layout={layouts[index % layouts.length]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
