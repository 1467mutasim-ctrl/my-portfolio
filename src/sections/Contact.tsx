import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { contactCopy, personal, socials } from '@/data/portfolio';
import { Terminal } from '@/components/Terminal';
import { Reveal } from '@/components/Reveal';
import { fadeUp, staggerParent, viewportOnce } from '@/lib/motion';

const icons: Record<string, LucideIcon> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
};

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-ink-line py-20 sm:py-28 lg:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-30%] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,225,255,0.09),transparent_66%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-6 bg-accent/60 sm:w-10" />
                <span className="overline text-accent/80">07 / Contact</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                id="contact-title"
                className="mt-5 text-[clamp(2.2rem,8vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-text-primary"
              >
                LET&rsquo;S BUILD
                <br />
                <span className="text-accent">SOMETHING.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-prose text-[0.95rem] leading-relaxed text-text-muted sm:text-base">
                {contactCopy.body}
              </p>
            </Reveal>

            {/* Contact links */}
            <motion.ul
              variants={staggerParent(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-9 flex flex-col border-t border-ink-line sm:mt-11"
            >
              {socials.map((social) => {
                const Icon = icons[social.id] ?? Mail;
                const isLive = Boolean(social.href);

                const inner = (
                  <>
                    <Icon
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden
                      className="shrink-0 text-text-faint transition-colors duration-300 group-hover:text-accent"
                    />
                    {/* Stacks on small screens; the handle uses overflow-wrap:anywhere so a
                        long address can never widen the grid column past the viewport. */}
                    <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-5">
                      <span className="block font-mono text-[10px] uppercase tracking-overline text-text-faint sm:w-[74px] sm:shrink-0">
                        {social.label}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] leading-snug text-text-muted [overflow-wrap:anywhere] transition-colors duration-300 group-hover:text-text-primary sm:mt-0 sm:min-w-0 sm:flex-1 sm:text-xs">
                        {social.handle}
                      </span>
                    </span>
                    {isLive ? (
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.6}
                        aria-hidden
                        className="shrink-0 text-text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    ) : (
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-overline text-text-faint">
                        pending
                      </span>
                    )}
                  </>
                );

                return (
                  <motion.li key={social.id} variants={fadeUp} className="border-b border-ink-line">
                    {isLive ? (
                      <a
                        href={social.href as string}
                        target={social.id === 'email' ? undefined : '_blank'}
                        rel={social.id === 'email' ? undefined : 'noreferrer noopener'}
                        className="group flex items-center gap-4 py-4 transition-colors duration-300 hover:bg-ink-surface/50 sm:gap-5 sm:py-5"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        className="group flex cursor-not-allowed items-center gap-4 py-4 opacity-70 sm:gap-5 sm:py-5"
                        title="Link not added yet"
                      >
                        {inner}
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-overline text-text-faint">
              Links are placeholders — set them in src/data/portfolio.ts
            </p>
          </div>

          {/* Terminal */}
          <div className="lg:pt-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-overline text-text-faint">
              Or read it from the shell
            </p>
            <Terminal />
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-text-faint">
              {personal.tagline.join(' ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
