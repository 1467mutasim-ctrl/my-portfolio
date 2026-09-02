import { motion, useReducedMotion } from 'framer-motion';
import { Award, Medal } from 'lucide-react';
import type { Achievement } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { ease, viewportOnce } from '@/lib/motion';

interface AchievementCardProps {
  achievement: Achievement;
}

/**
 * A single node on the timeline. The `featured` entry gets a larger type scale,
 * an accent surface and a marker ring so it reads as the peak of the story.
 */
export function AchievementCard({ achievement }: AchievementCardProps) {
  const reduced = useReducedMotion();
  const { featured, kind } = achievement;
  const Icon = kind === 'sports' ? Medal : Award;

  return (
    <motion.li
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, ease }}
      className="relative pl-12 sm:pl-16"
    >
      {/* Marker */}
      <span aria-hidden className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center sm:left-1">
        {featured && (
          <span className="absolute h-6 w-6 animate-pulse-ring rounded-full border border-accent/50" />
        )}
        <span
          className={cn(
            'relative block rounded-full',
            featured
              ? 'h-3 w-3 bg-accent shadow-[0_0_0_4px_rgba(56,225,255,0.14)]'
              : 'h-2 w-2 border border-text-faint bg-ink-base',
          )}
        />
      </span>

      <article
        className={cn(
          'group relative border transition-colors duration-300',
          featured
            ? 'border-accent/25 bg-[linear-gradient(135deg,rgba(56,225,255,0.07),rgba(16,18,22,0.6)_45%)] p-6 sm:p-9'
            : 'border-ink-line bg-ink-surface/50 p-5 hover:border-ink-line/80 hover:bg-ink-surface sm:p-7',
        )}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span
            className={cn(
              'font-mono tracking-wider2',
              featured ? 'text-[13px] font-bold text-accent' : 'text-[11px] text-text-faint',
            )}
          >
            {achievement.year}
          </span>
          <span aria-hidden className="h-px w-5 bg-ink-line" />
          <span className="font-mono text-[10px] uppercase tracking-overline text-text-faint">
            {achievement.segment}
          </span>

          {featured && (
            <span className="ml-auto inline-flex items-center gap-1.5 border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[9px] uppercase tracking-overline text-accent">
              <Icon size={11} strokeWidth={1.8} />
              Peak
            </span>
          )}
        </div>

        <h3
          className={cn(
            'mt-3 font-sans font-bold tracking-[-0.02em] text-text-primary',
            featured ? 'text-[clamp(1.5rem,4.4vw,2.4rem)] leading-[1.02]' : 'text-lg sm:text-xl',
          )}
        >
          {achievement.event}
        </h3>

        <p
          className={cn(
            'mt-2 font-mono uppercase tracking-wider2',
            featured ? 'text-sm font-bold text-accent sm:text-base' : 'text-[11px] text-text-muted',
          )}
        >
          {achievement.result}
        </p>

        {achievement.detail && (
          <p className="mt-4 max-w-prose border-t border-ink-line/70 pt-4 text-[0.9rem] leading-relaxed text-text-muted">
            {achievement.detail}
          </p>
        )}

        {!featured && (
          <Icon
            aria-hidden
            size={18}
            strokeWidth={1.3}
            className="absolute right-5 top-5 text-text-faint/60 transition-colors duration-300 group-hover:text-accent/70 sm:right-7 sm:top-7"
          />
        )}
      </article>
    </motion.li>
  );
}
