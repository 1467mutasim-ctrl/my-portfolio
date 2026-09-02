import { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { achievements, personal, projects, skillGroups, socials } from '@/data/portfolio';
import { cn, scrollToSection } from '@/lib/utils';
import { ease, viewportOnce } from '@/lib/motion';

interface Line {
  command: string;
  output: string[];
}

interface CommandDef {
  name: string;
  /** Section scrolled to after the command prints. */
  target: string | null;
  run: () => string[];
}

const PROMPT = 'mutasim@portfolio:~$';

export function Terminal() {
  const commands = useMemo<CommandDef[]>(
    () => [
      {
        name: 'about',
        target: 'about',
        run: () => [personal.name, personal.roles.join(' · '), `"${personal.statement}"`],
      },
      {
        name: 'projects',
        target: 'work',
        run: () => projects.map((project) => `${project.index}  ${project.title} — ${project.category}`),
      },
      {
        name: 'achievements',
        target: 'journey',
        run: () =>
          [...achievements]
            .reverse()
            .map((item) => `${item.year}  ${item.event} — ${item.result}`),
      },
      {
        name: 'skills',
        target: 'stack',
        run: () => skillGroups.map((group) => `${group.title.padEnd(12)} ${group.items.join(', ')}`),
      },
      {
        name: 'contact',
        target: 'contact',
        run: () => socials.map((social) => `${social.label.padEnd(9)} ${social.handle}`),
      },
    ],
    [],
  );

  // Seeded with the introduction from the brief.
  const [lines, setLines] = useState<Line[]>([
    { command: 'whoami', output: [personal.name] },
    {
      command: 'interests',
      output: [
        '> Robotics',
        '> Electronics',
        '> Programming',
        '> Photography',
        '> Problem Solving',
      ],
    },
  ]);

  const logRef = useRef<HTMLDivElement>(null);

  const runCommand = useCallback(
    (command: CommandDef) => {
      setLines((previous) => {
        // Keep the log short so the panel never dominates the page.
        const next = [...previous, { command: command.name, output: command.run() }];
        return next.slice(-5);
      });

      window.requestAnimationFrame(() => {
        const log = logRef.current;
        if (log) log.scrollTop = log.scrollHeight;
        if (command.target) scrollToSection(command.target);
      });
    },
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease }}
      className="w-full border border-ink-line bg-ink-surface/80 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm"
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-ink-line px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink-line" />
          <span className="h-2 w-2 rounded-full bg-ink-line" />
          <span className="h-2 w-2 rounded-full bg-accent/50" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-overline text-text-faint">
          bash — portfolio
        </span>
      </div>

      {/* Log */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="no-scrollbar max-h-[260px] overflow-y-auto px-4 py-4 font-mono text-[11.5px] leading-relaxed sm:px-5 sm:text-xs"
      >
        {lines.map((line, index) => (
          <div key={`${line.command}-${index}`} className={cn(index > 0 && 'mt-4')}>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-accent/80">{PROMPT}</span>
              <span className="text-text-primary">{line.command}</span>
            </p>
            <div className="mt-1.5 space-y-0.5">
              {line.output.map((row) => (
                <p key={row} className="whitespace-pre-wrap break-words text-text-muted">
                  {row}
                </p>
              ))}
            </div>
          </div>
        ))}

        <p className="mt-4 flex items-baseline gap-2">
          <span className="text-accent/80">{PROMPT}</span>
          <span aria-hidden className="inline-block h-3.5 w-[7px] animate-caret-blink bg-accent/70" />
        </p>
      </div>

      {/* Command rail */}
      <div className="flex flex-wrap gap-2 border-t border-ink-line px-4 py-3 sm:px-5">
        {commands.map((command) => (
          <button
            key={command.name}
            type="button"
            onClick={() => runCommand(command)}
            className="border border-ink-line bg-ink-base px-2.5 py-1.5 font-mono text-[10px] text-text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            <span aria-hidden className="mr-1 text-text-faint">$</span>
            {command.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
