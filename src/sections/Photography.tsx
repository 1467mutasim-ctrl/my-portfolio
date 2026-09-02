import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { photoCategories, photos } from '@/data/portfolio';
import type { PhotoCategory } from '@/data/portfolio';
import { SectionHeading } from '@/components/SectionHeading';
import { ImageFrame } from '@/components/ImageFrame';
import { cn } from '@/lib/utils';
import { ease, viewportOnce } from '@/lib/motion';

type Filter = PhotoCategory | 'ALL';

/**
 * Frame shape per item. The photograph inside is centre-cropped to fill it, so
 * the source file's own aspect ratio never matters.
 */
const frameRatio: Record<string, 'tall' | 'wide' | 'square'> = {
  tall: 'tall',
  wide: 'wide',
  square: 'square',
};

export function Photography() {
  const [filter, setFilter] = useState<Filter>('ALL');

  const visible = useMemo(
    () => (filter === 'ALL' ? photos : photos.filter((photo) => photo.category === filter)),
    [filter],
  );

  const filters: Filter[] = ['ALL', ...photoCategories];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden border-t border-ink-line py-20 sm:py-28 lg:py-36"
    >
      <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          id="gallery-title"
          overline="06 / Off-duty"
          title="BEYOND THE CIRCUITS"
          lead="Travel, sport, nature — the things that keep the engineering honest."
        />

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter photographs by category"
          className="no-scrollbar mt-9 flex gap-2 overflow-x-auto pb-1 sm:mt-11 sm:flex-wrap sm:overflow-visible"
        >
          {filters.map((item) => {
            const isActive = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={isActive}
                className={cn(
                  'shrink-0 border px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider2 transition-colors duration-200',
                  isActive
                    ? 'border-accent/50 bg-accent/10 text-accent'
                    : 'border-ink-line bg-ink-surface/50 text-text-muted hover:border-accent/30 hover:text-text-primary',
                )}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Gallery — CSS column masonry. Items pack against each other with no
            gaps, whatever mix of frame shapes is on screen. */}
        {visible.length > 0 ? (
          <ul
            key={filter}
            className="mt-8 columns-2 gap-3 [column-fill:balance] sm:mt-10 sm:gap-4 md:columns-3"
          >
            {visible.map((photo, index) => (
              <motion.li
                key={photo.src}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, ease, delay: Math.min(index * 0.05, 0.3) }}
                className="group relative mb-3 break-inside-avoid sm:mb-4"
              >
                <ImageFrame
                  src={photo.src}
                  alt={photo.alt}
                  ratio={frameRatio[photo.span] ?? 'square'}
                  className="w-full"
                  placeholderLabel={photo.src.split('/').pop() ?? photo.alt}
                  interactive
                />

                {/* Caption overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-ink-base/85 to-transparent p-3 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
                  <span className="font-mono text-[9px] uppercase tracking-overline text-accent">
                    {photo.category}
                  </span>
                  <span className="font-mono text-[9px] tracking-overline text-text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 border border-dashed border-ink-line p-8 text-center font-mono text-[11px] uppercase tracking-wider2 text-text-faint">
            No photographs tagged {filter} yet
          </p>
        )}

        <p className="mt-6 font-mono text-[10px] uppercase tracking-overline text-text-faint">
          Frames accept any aspect ratio — photographs are centre-cropped to fit
        </p>
      </div>
    </section>
  );
}
