import { motion } from 'framer-motion';
import { Compass, Cpu, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { identityCards, loves, passions, personal } from '@/data/portfolio';
import { SectionHeading } from '@/components/SectionHeading';
import { ImageFrame } from '@/components/ImageFrame';
import { Reveal } from '@/components/Reveal';
import { ease, fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

const icons: Record<string, LucideIcon> = {
  engineer: Cpu,
  competitor: Trophy,
  explorer: Compass,
};

export function Identity() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHeading
          id="about-title"
          overline="03 / Identity"
          title="WHO IS MUTASIM?"
          lead={personal.intro}
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14">
          {/* Portrait + interests */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <ImageFrame
                src={personal.profileImage}
                alt={`Portrait of ${personal.name}`}
                ratio="portrait"
                placeholderLabel="profile/profile.jpg"
                className="w-full max-w-[340px]"
                interactive
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-col gap-6">
                <InterestList label="Passions" items={passions} accent />
                <InterestList label="Loves" items={loves} />
              </div>
            </Reveal>
          </div>

          {/* Three cards */}
          <motion.ul
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-px bg-ink-line sm:grid-cols-2 lg:grid-cols-1"
          >
            {identityCards.map((card, index) => {
              const Icon = icons[card.id] ?? Cpu;
              const isLast = index === identityCards.length - 1;

              return (
                <motion.li
                  key={card.id}
                  variants={fadeUp}
                  className={`group relative flex flex-col justify-between gap-8 bg-ink-base p-7 transition-colors duration-300 hover:bg-ink-surface sm:p-9 ${
                    isLast ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Accent edge on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-precise group-hover:scale-y-100"
                  />

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="font-mono text-[10px] tracking-overline text-text-faint">
                        {card.index}
                      </span>
                      <h3 className="mt-3 font-sans text-2xl font-bold tracking-[-0.02em] text-text-primary sm:text-[1.75rem]">
                        {card.title}
                      </h3>
                    </div>
                    <Icon
                      size={22}
                      strokeWidth={1.3}
                      className="shrink-0 text-text-faint transition-colors duration-300 group-hover:text-accent"
                    />
                  </div>

                  <p className="max-w-prose text-[0.95rem] leading-relaxed text-text-muted">
                    {card.body}
                  </p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function InterestList({
  label,
  items,
  accent = false,
}: {
  label: string;
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <div>
      <p className="overline">{label}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.35, ease }}
            className={`border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider2 ${
              accent
                ? 'border-accent/25 bg-accent/[0.06] text-accent/90'
                : 'border-ink-line bg-ink-surface/60 text-text-muted'
            }`}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
