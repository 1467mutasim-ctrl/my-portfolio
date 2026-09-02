import { motion } from 'framer-motion';
import type { SkillGroup as SkillGroupData } from '@/data/portfolio';
import { ease, fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

interface SkillGroupProps {
  group: SkillGroupData;
  /** Column index, used only for the label numbering. */
  position: number;
}

export function SkillGroup({ group, position }: SkillGroupProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group/skill relative flex flex-col gap-6 bg-ink-base p-6 transition-colors duration-300 hover:bg-ink-surface/60 sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-sans text-sm font-bold uppercase tracking-wider2 text-text-primary">
          {group.title}
        </h3>
        <span aria-hidden className="font-mono text-[10px] tracking-overline text-text-faint">
          {String(position + 1).padStart(2, '0')}
        </span>
      </div>

      <p className="-mt-3 font-mono text-[10px] uppercase tracking-overline text-text-faint">
        {group.caption}
      </p>

      <motion.ul
        variants={staggerParent(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-auto flex flex-wrap gap-2"
      >
        {group.items.map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
            }}
            className="border border-ink-line bg-ink-surface/70 px-3 py-2 font-mono text-[11px] text-text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
