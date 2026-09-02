import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Github } from 'lucide-react';
import type { Project, ProjectCaseStudy } from '@/data/portfolio';
import { ImageFrame } from '@/components/ImageFrame';
import { LinkButton } from '@/components/Button';
import { cn } from '@/lib/utils';
import { ease, fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

/** Each project gets its own composition — no repeated card grid. */
export type ProjectLayout = 'banner' | 'split' | 'offset';

interface ProjectCardProps {
  project: Project;
  layout: ProjectLayout;
}

export function ProjectCard({ project, layout }: ProjectCardProps) {
  return (
    <motion.article
      variants={staggerParent(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      aria-labelledby={`project-${project.id}-title`}
      className="group/project relative"
    >
      {layout === 'banner' && <BannerLayout project={project} />}
      {layout === 'split' && <SplitLayout project={project} />}
      {layout === 'offset' && <OffsetLayout project={project} />}
    </motion.article>
  );
}

/* ── Layout A: wide cinematic banner, meta beneath ─────────────────────────── */

function BannerLayout({ project }: { project: Project }) {
  return (
    <div className="grid gap-8 lg:gap-10">
      <motion.div variants={fadeUp} className="relative">
        <ImageFrame
          src={project.coverImage}
          alt={`${project.title} — project cover`}
          ratio="wide"
          placeholderLabel={`projects/${project.id}/cover.jpg`}
          className="w-full lg:aspect-[21/9]"
          interactive
        />
        <ProjectIndex value={project.index} className="-top-3 left-4 sm:left-6" />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-end lg:gap-16">
        <motion.div variants={fadeUp}>
          <ProjectHeader project={project} size="lg" />
          <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-text-muted sm:text-base">
            {project.summary}
          </p>
          <TagRow tags={project.tags} className="mt-6" />
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <ProjectActions project={project} />
          <CaseStudy project={project} />
        </motion.div>
      </div>
    </div>
  );
}

/* ── Layout B: text left, tall visual right ────────────────────────────────── */

function SplitLayout({ project }: { project: Project }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <motion.div variants={fadeUp} className="lg:col-span-5 lg:pr-4">
        <ProjectIndex value={project.index} className="relative mb-6 inline-flex" static />
        <ProjectHeader project={project} size="md" />
        <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-text-muted">
          {project.summary}
        </p>
        <TagRow tags={project.tags} className="mt-6" />
        <div className="mt-7">
          <ProjectActions project={project} />
        </div>
        <div className="mt-6">
          <CaseStudy project={project} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="lg:col-span-7">
        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          <ImageFrame
            src={project.coverImage}
            alt={`${project.title} — project cover`}
            ratio="landscape"
            placeholderLabel={`projects/${project.id}/cover.jpg`}
            className="col-span-5 sm:col-span-3 sm:aspect-[3/4]"
            interactive
          />
          <div className="col-span-5 grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-1 sm:gap-4">
            {project.gallery.slice(0, 2).map((src, index) => (
              <ImageFrame
                key={src}
                src={src}
                alt={`${project.title} — detail ${index + 1}`}
                ratio="square"
                placeholderLabel={`projects/${project.id}/0${index + 1}.jpg`}
                interactive
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Layout C: visual left, offset sticky column right ─────────────────────── */

function OffsetLayout({ project }: { project: Project }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <motion.div variants={fadeUp} className="lg:col-span-7 lg:order-1">
        <ImageFrame
          src={project.coverImage}
          alt={`${project.title} — project cover`}
          ratio="landscape"
          placeholderLabel={`projects/${project.id}/cover.jpg`}
          className="w-full"
          interactive
        />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4">
          {project.gallery.slice(0, 2).map((src, index) => (
            <ImageFrame
              key={src}
              src={src}
              alt={`${project.title} — detail ${index + 1}`}
              ratio="wide"
              placeholderLabel={`projects/${project.id}/0${index + 1}.jpg`}
              interactive
            />
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="lg:col-span-5 lg:order-2 lg:pt-10">
        <div className="lg:sticky lg:top-28">
          <ProjectIndex value={project.index} className="relative mb-6 inline-flex" static />
          <ProjectHeader project={project} size="md" />
          <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-text-muted">
            {project.summary}
          </p>
          <TagRow tags={project.tags} className="mt-6" />
          <div className="mt-7">
            <ProjectActions project={project} />
          </div>
          <div className="mt-6">
            <CaseStudy project={project} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Shared pieces ─────────────────────────────────────────────────────────── */

function ProjectIndex({
  value,
  className,
  static: isStatic = false,
}: {
  value: string;
  className?: string;
  static?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'items-center justify-center border border-ink-line bg-ink-base px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider2 text-accent',
        isStatic ? 'inline-flex' : 'absolute z-20 inline-flex',
        className,
      )}
    >
      {value}
    </span>
  );
}

function ProjectHeader({ project, size }: { project: Project; size: 'md' | 'lg' }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-overline text-accent/80">
          {project.category}
        </span>
        {project.year && (
          <>
            <span aria-hidden className="h-3 w-px bg-ink-line" />
            <span className="font-mono text-[10px] tracking-overline text-text-faint">
              {project.year}
            </span>
          </>
        )}
      </div>

      <h3
        id={`project-${project.id}-title`}
        className={cn(
          'mt-3 font-sans font-bold tracking-[-0.03em] text-text-primary',
          size === 'lg'
            ? 'text-[clamp(2rem,6.5vw,4rem)] leading-[0.95]'
            : 'text-[clamp(1.75rem,5vw,3rem)] leading-[0.98]',
        )}
      >
        {project.title}
      </h3>
    </>
  );
}

function TagRow({ tags, className }: { tags: readonly string[]; className?: string }) {
  if (tags.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-ink-line bg-ink-surface/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider2 text-text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      <LinkButton
        href={project.demoUrl}
        external
        variant="outline"
        pendingLabel="View Project"
        icon={<ArrowUpRight size={14} strokeWidth={1.8} />}
        ariaLabel={`View ${project.title}`}
      >
        View Project
      </LinkButton>

      <LinkButton
        href={project.githubUrl}
        external
        variant="outline"
        pendingLabel="GitHub"
        icon={<Github size={14} strokeWidth={1.6} />}
        ariaLabel={`${project.title} source on GitHub`}
      >
        GitHub
      </LinkButton>
    </div>
  );
}

const caseStudyFields: { key: keyof ProjectCaseStudy; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'hardware', label: 'Hardware' },
  { key: 'software', label: 'Software' },
  { key: 'contribution', label: 'My Contribution' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'result', label: 'Result' },
];

function hasContent(value: string | readonly string[]): boolean {
  return Array.isArray(value) ? value.length > 0 : String(value).trim().length > 0;
}

/**
 * Expandable case study. While the data file is still empty it shows the
 * outline of what will go here rather than inventing technical detail.
 */
function CaseStudy({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const filled = caseStudyFields.filter(({ key }) => hasContent(project.caseStudy[key]));
  const isEmpty = filled.length === 0;

  return (
    <div className="border border-ink-line bg-ink-surface/40">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-ink-raised sm:px-5"
      >
        <span className="font-mono text-[10px] uppercase tracking-overline text-text-muted">
          Case Study
          {isEmpty && <span className="ml-2 text-text-faint">· pending</span>}
        </span>
        <ChevronDown
          size={15}
          strokeWidth={1.6}
          aria-hidden
          className={cn(
            'shrink-0 text-text-faint transition-transform duration-300 ease-precise',
            open && 'rotate-180 text-accent',
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-line px-4 py-5 sm:px-5">
              {isEmpty ? (
                <>
                  <p className="text-[0.85rem] leading-relaxed text-text-muted">
                    The full write-up for {project.title} is not published yet. It will cover:
                  </p>
                  <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {caseStudyFields.map(({ key, label }) => (
                      <li
                        key={key}
                        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-text-faint"
                      >
                        <span aria-hidden className="h-px w-3 bg-ink-line" />
                        {label}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <dl className="grid gap-5">
                  {filled.map(({ key, label }) => {
                    const value = project.caseStudy[key];
                    return (
                      <div key={key}>
                        <dt className="overline text-accent/70">{label}</dt>
                        <dd className="mt-2 text-[0.9rem] leading-relaxed text-text-muted">
                          {Array.isArray(value) ? (
                            <ul className="flex flex-wrap gap-2">
                              {value.map((item) => (
                                <li
                                  key={item}
                                  className="border border-ink-line bg-ink-base px-2 py-1 font-mono text-[10px] uppercase tracking-wider2"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            (value as string)
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
