import { motion } from 'framer-motion';
import { ArrowDownRight, FileText } from 'lucide-react';
import { heroHighlights, personal } from '@/data/portfolio';
import { LinkButton } from '@/components/Button';
import { ease, lineReveal, staggerParent } from '@/lib/motion';
import { scrollToSection } from '@/lib/utils';

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 sm:pt-28"
    >
      <HeroBackdrop />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pb-10 sm:px-6 lg:px-10">
        {/* Engineering metadata rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mb-10"
        >
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-overline text-text-faint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {personal.location}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-ink-line sm:block" />
          <span className="font-mono text-[10px] uppercase tracking-overline text-text-faint">
            Robotics · Electronics · Software
          </span>
        </motion.div>

        {/* Display type */}
        <h1 id="hero-title">
          <span className="sr-only">
            {personal.name} — {personal.tagline.join(' ')}
          </span>

          <motion.span
            aria-hidden
            variants={staggerParent(0.09, 0.1)}
            initial="hidden"
            animate="visible"
            className="block"
          >
            {personal.tagline.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={lineReveal}
                  className={`block text-display font-bold ${
                    index === personal.tagline.length - 1 ? 'text-accent' : 'text-text-primary'
                  }`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h1>

        {/* Intro + actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.6, ease }}
          className="mt-9 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16"
        >
          <div className="max-w-prose">
            <p className="font-sans text-xl font-semibold leading-none tracking-[-0.02em] text-text-primary sm:text-2xl">
              {personal.name}
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
              {personal.roles.map((role, index) => (
                <li key={role} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-text-faint" />
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-wider2 text-text-muted sm:text-[11px]">
                    {role}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-text-muted sm:text-base">
              “{personal.statement}”
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('work')}
                className="group inline-flex h-11 items-center gap-2.5 bg-accent px-5 font-mono text-[11px] font-semibold uppercase tracking-wider2 text-ink-base transition-colors duration-200 hover:bg-accent-soft sm:h-12 sm:px-6"
              >
                Explore Work
                <ArrowDownRight
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-precise group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </button>

              <LinkButton
                href={personal.resumeUrl}
                external
                variant="outline"
                icon={<FileText size={14} strokeWidth={1.6} />}
                ariaLabel="Open resume (PDF, opens in a new tab)"
              >
                Resume
              </LinkButton>
            </div>
          </div>

          {/* Achievement highlights */}
          <motion.ul
            variants={staggerParent(0.08, 0.8)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-px border-l border-ink-line pl-5 lg:min-w-[300px] lg:pl-6"
          >
            {heroHighlights.map((item) => (
              <motion.li
                key={item.value}
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
                }}
                className="py-2.5"
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider2 text-accent">
                  {item.value}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-text-muted">{item.label}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Baseline strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative border-t border-ink-line"
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-10">
          <span className="font-mono text-[10px] uppercase tracking-overline text-text-faint">
            Scroll
          </span>
          <span aria-hidden className="h-px flex-1 bg-ink-line" />
          <span className="hidden font-mono text-[10px] uppercase tracking-overline text-text-faint sm:inline">
            Selected missions · The journey · Beyond the circuits
          </span>
          <span className="font-mono text-[10px] tracking-overline text-text-faint">01</span>
        </div>
      </motion.div>
    </section>
  );
}

/** Static, cheap background: grid, a single glow, and two hairlines. */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="tech-grid mask-fade-b absolute inset-0 opacity-80" />
      <div className="absolute -left-[10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(56,225,255,0.10),transparent_68%)] blur-[2px]" />
      <div className="absolute inset-y-0 left-[18%] hidden w-px bg-gradient-to-b from-transparent via-ink-line to-transparent lg:block" />
      <div className="absolute inset-y-0 right-[22%] hidden w-px bg-gradient-to-b from-transparent via-ink-line to-transparent xl:block" />
    </div>
  );
}
