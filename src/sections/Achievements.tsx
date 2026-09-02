import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { achievements } from '@/data/portfolio';
import { SectionHeading } from '@/components/SectionHeading';
import { AchievementCard } from '@/components/AchievementCard';

export function Achievements() {
  const railRef = useRef<HTMLDivElement>(null);

  // The spine fills as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 78%', 'end 55%'],
  });
  const raw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const scaleY = useTransform(raw, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative border-y border-ink-line bg-ink-surface/25 py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          id="journey-title"
          overline="02 / Timeline"
          title="THE JOURNEY"
          lead="Competition has been the constant — first on the mat, now in robotics."
        />

        <div ref={railRef} className="relative mt-12 lg:mt-16">
          {/* Spine */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[11px] top-2 w-px bg-ink-line sm:left-[15px]"
          >
            <motion.span
              style={{ scaleY }}
              className="absolute inset-0 block origin-top bg-gradient-to-b from-accent/70 to-accent/20"
            />
          </span>

          <ol className="flex flex-col gap-6 sm:gap-8">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
