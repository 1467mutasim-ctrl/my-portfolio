import { motion } from 'framer-motion';
import { skillGroups } from '@/data/portfolio';
import { SectionHeading } from '@/components/SectionHeading';
import { SkillGroup } from '@/components/SkillGroup';
import { staggerParent, viewportOnce } from '@/lib/motion';

export function Skills() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="relative border-y border-ink-line bg-ink-surface/25 py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          id="stack-title"
          overline="04 / Capabilities"
          title="TECH STACK"
          lead="Tools and languages I actively work with. No levels, no percentages — just what I use."
        />

        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {skillGroups.map((group, index) => (
            <SkillGroup key={group.id} group={group} position={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
