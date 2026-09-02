import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { philosophyQuote, philosophySteps } from '@/data/portfolio';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';
import { ease, viewportOnce } from '@/lib/motion';

/**
 * A five-node process diagram. Hover or focus a node to inspect it; the loop
 * back from IMPROVE to UNDERSTAND is drawn explicitly, because the process is
 * a cycle rather than a checklist.
 */
export function Philosophy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = philosophySteps[activeIndex];

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHeading id="process-title" overline="05 / Method" title="HOW I THINK" />

        <Reveal>
          <blockquote className="mt-8 max-w-3xl border-l-2 border-accent/50 pl-5 sm:mt-10 sm:pl-7">
            <p className="font-sans text-[clamp(1.1rem,3.2vw,1.75rem)] font-medium leading-snug tracking-[-0.02em] text-text-primary">
              “{philosophyQuote}”
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-14">
          {/* Diagram */}
          <div>
            <ol
              className="relative grid gap-px bg-ink-line sm:grid-cols-5"
              onMouseLeave={() => setActiveIndex(0)}
            >
              {philosophySteps.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <li key={step.index} className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isActive}
                      aria-label={`${step.index} ${step.title} — ${step.body}`}
                      className={cn(
                        'flex h-full w-full flex-row items-center gap-4 px-5 py-5 text-left transition-colors duration-300 sm:flex-col sm:items-start sm:gap-8 sm:px-4 sm:py-7',
                        isActive ? 'bg-ink-surface' : 'bg-ink-base hover:bg-ink-surface/60',
                      )}
                    >
                      <span
                        className={cn(
                          'font-mono text-[11px] tracking-wider2 transition-colors duration-300',
                          isActive ? 'text-accent' : 'text-text-faint',
                        )}
                      >
                        {step.index}
                      </span>

                      <span className="flex-1 sm:flex-none">
                        <span
                          className={cn(
                            'block font-sans text-sm font-bold uppercase tracking-wider2 transition-colors duration-300 sm:text-[0.8rem]',
                            isActive ? 'text-text-primary' : 'text-text-muted',
                          )}
                        >
                          {step.title}
                        </span>
                      </span>

                      {/* Node marker */}
                      <span aria-hidden className="hidden sm:block">
                        <span
                          className={cn(
                            'block h-2 w-2 rounded-full transition-all duration-300',
                            isActive
                              ? 'bg-accent shadow-[0_0_0_4px_rgba(56,225,255,0.14)]'
                              : 'bg-ink-line',
                          )}
                        />
                      </span>
                    </button>

                    {/* Connector between nodes */}
                    {index < philosophySteps.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -right-px bottom-0 hidden h-px w-px sm:block"
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Loop-back rail */}
            <div aria-hidden className="mt-3 flex items-center gap-3 pl-1">
              <RotateCw size={13} strokeWidth={1.5} className="shrink-0 text-accent/70" />
              <span className="h-px flex-1 bg-gradient-to-r from-accent/40 via-ink-line to-ink-line" />
              <span className="font-mono text-[10px] uppercase tracking-overline text-text-faint">
                Repeat with what the last pass taught
              </span>
            </div>
          </div>

          {/* Inspector */}
          <div className="panel relative min-h-[190px] p-6 sm:p-8">
            <span className="overline text-accent/70">Step detail</span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease }}
                className="mt-4"
              >
                <p className="font-sans text-2xl font-bold tracking-[-0.02em] text-text-primary">
                  <span className="mr-3 font-mono text-sm font-normal text-accent">
                    {active.index}
                  </span>
                  {active.title}
                </p>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-text-muted">{active.body}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress ticks */}
            <div aria-hidden className="mt-7 flex gap-1.5">
              {philosophySteps.map((step, index) => (
                <motion.span
                  key={step.index}
                  initial={false}
                  animate={{ opacity: index === activeIndex ? 1 : 0.28 }}
                  viewport={viewportOnce}
                  className={cn(
                    'h-0.5 flex-1',
                    index === activeIndex ? 'bg-accent' : 'bg-ink-line',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
