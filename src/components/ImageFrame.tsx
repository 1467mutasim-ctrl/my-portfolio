import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

type Ratio = 'square' | 'portrait' | 'landscape' | 'wide' | 'tall' | 'auto';

const ratioClass: Record<Ratio, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/10]',
  tall: 'aspect-[3/4]',
  auto: '',
};

interface ImageFrameProps {
  src: string;
  alt: string;
  /** The frame's shape. The photo fills it via object-cover, whatever its own ratio. */
  ratio?: Ratio;
  className?: string;
  imgClassName?: string;
  /** Short caption drawn on the placeholder while no file exists. */
  placeholderLabel?: string;
  priority?: boolean;
  /** Adds a subtle zoom on hover — used by project covers. */
  interactive?: boolean;
}

/**
 * A fixed frame that accepts photographs of any aspect ratio.
 *
 * The image is centre-cropped to fill the frame, so a 16:9 landscape and a 4:5
 * vertical both sit correctly without letterboxing, stretching or shifting the
 * layout. Until a file exists at `src` — or if it fails to load — an engineered
 * placeholder is drawn instead, so the page never shows a broken image.
 */
export function ImageFrame({
  src,
  alt,
  ratio = 'landscape',
  className,
  imgClassName,
  placeholderLabel,
  priority = false,
  interactive = false,
}: ImageFrameProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div
      className={cn(
        'group/frame relative isolate overflow-hidden bg-ink-surface',
        'border border-ink-line',
        ratioClass[ratio],
        className,
      )}
    >
      {/* Placeholder — visible until (and unless) the real photo loads. */}
      {status !== 'loaded' && (
        <FramePlaceholder label={placeholderLabel ?? alt} failed={status === 'error'} />
      )}

      {status !== 'error' && (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={status === 'loaded' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease }}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-center',
            interactive &&
              'transition-transform duration-700 ease-precise group-hover/frame:scale-[1.04]',
            imgClassName,
          )}
        />
      )}

      {/* Corner ticks — a light technical framing device. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 z-10">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/20" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/20" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/20" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/20" />
      </span>
    </div>
  );
}

/** Drawn with CSS only — no network request, no layout shift. */
function FramePlaceholder({ label, failed }: { label: string; failed: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(56,225,255,0.07),transparent_65%)]" />

      {/* Diagonal registration lines. */}
      <svg
        className="absolute inset-0 h-full w-full text-white/[0.05]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.35" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.35" />
      </svg>

      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span className="grid h-8 w-8 place-items-center border border-ink-line bg-ink-base/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-overline text-text-faint">
          {failed ? 'image pending' : 'loading'}
        </span>
        <span className="line-clamp-2 max-w-[22ch] font-mono text-[9px] leading-relaxed text-text-faint">
          {label}
        </span>
      </div>

      {/* Sweep — a quiet sign of life while the frame is empty. */}
      {!failed && (
        <span className="absolute inset-y-0 -left-1/3 w-1/3 animate-sweep-x bg-gradient-to-r from-transparent via-white/[0.045] to-transparent" />
      )}
    </div>
  );
}
