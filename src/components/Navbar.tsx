import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems, personal } from '@/data/portfolio';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn, scrollToSection, scrollToTop } from '@/lib/utils';
import { ease, fastTransition } from '@/lib/motion';

const sectionIds = navItems.map((item) => item.targetId);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and close it on Escape.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Let the sheet unmount before scrolling so focus lands cleanly.
    window.requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <a
        href="#work"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection('work');
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-ink-base"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-precise',
          scrolled ? 'bg-ink-base/80 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div
          className={cn(
            'mx-auto flex h-[64px] w-full max-w-[1400px] items-center justify-between px-5 sm:px-6 md:h-[72px] lg:px-10',
            scrolled && 'border-b border-ink-line/70',
          )}
        >
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-baseline gap-2 font-sans text-[13px] font-bold uppercase tracking-wider2 text-text-primary transition-colors hover:text-accent sm:text-sm"
          >
            {personal.shortName}
            <span
              aria-hidden
              className="h-1 w-1 translate-y-[-2px] rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
            />
            <span className="sr-only">— back to top</span>
          </button>

          {/* Desktop */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.targetId;
              return (
                <button
                  key={item.targetId}
                  type="button"
                  onClick={() => go(item.targetId)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider2 transition-colors duration-200',
                    isActive ? 'text-accent' : 'text-text-muted hover:text-text-primary',
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ duration: 0.32, ease }}
                      className="absolute inset-x-2.5 -bottom-px h-px bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center border border-ink-line text-text-primary transition-colors hover:border-accent/50 hover:text-accent md:hidden"
          >
            {open ? <X size={17} strokeWidth={1.6} /> : <Menu size={17} strokeWidth={1.6} />}
          </button>
        </div>

        {/* Scroll progress rail */}
        <div className="h-px w-full bg-ink-line/60">
          <div
            className="h-px origin-left bg-accent"
            style={{ transform: `scaleX(${progress})` }}
            role="presentation"
          />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fastTransition}
            className="fixed inset-0 z-40 bg-ink-base md:hidden"
          >
            <div className="tech-grid absolute inset-0 opacity-60" />
            <nav
              aria-label="Mobile"
              className="relative flex h-full flex-col justify-center gap-1 px-6 pb-24 pt-20"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.targetId}
                  type="button"
                  onClick={() => go(item.targetId)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.35, ease }}
                  className="group flex items-baseline gap-4 border-b border-ink-line/70 py-5 text-left"
                >
                  <span className="font-mono text-[10px] text-text-faint">
                    0{index + 1}
                  </span>
                  <span
                    className={cn(
                      'font-sans text-3xl font-bold tracking-[-0.02em] transition-colors',
                      active === item.targetId
                        ? 'text-accent'
                        : 'text-text-primary group-hover:text-accent',
                    )}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10 font-mono text-[10px] uppercase tracking-overline text-text-faint"
              >
                {personal.tagline.join(' ')}
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
