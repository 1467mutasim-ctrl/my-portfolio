import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

interface SectionHeadingProps {
  /** id for the heading — sections point at it with aria-labelledby. */
  id?: string;
  /** Small technical label, e.g. "02 / JOURNEY". */
  overline: string;
  title: string;
  /** Optional supporting line under the title. */
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Heading level for correct document outline. */
  as?: 'h2' | 'h3';
}

export function SectionHeading({
  id,
  overline,
  title,
  lead,
  align = 'left',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerParent(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span aria-hidden className="h-px w-6 bg-accent/60 sm:w-10" />
        <span className="overline text-accent/80">{overline}</span>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Tag id={id} className="text-[clamp(1.9rem,6vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-text-primary">
          {title}
        </Tag>
      </motion.div>

      {lead && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'max-w-prose text-[0.95rem] leading-relaxed text-text-muted sm:text-base',
            align === 'center' && 'mx-auto',
          )}
        >
          {lead}
        </motion.p>
      )}
    </motion.div>
  );
}
