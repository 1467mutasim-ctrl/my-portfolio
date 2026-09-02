import { ArrowUp } from 'lucide-react';
import { personal, siteMeta } from '@/data/portfolio';
import { scrollToTop } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink-base">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-xl font-bold uppercase tracking-[-0.01em] text-text-primary sm:text-2xl">
              {personal.name}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider2 text-accent/80">
              {personal.tagline.join(' ')}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2.5 self-start border border-ink-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider2 text-text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent sm:self-auto"
          >
            Back to top
            <ArrowUp
              size={13}
              strokeWidth={1.6}
              aria-hidden
              className="transition-transform duration-300 ease-precise group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ink-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-overline text-text-faint">
            © {siteMeta.copyrightYear} {personal.name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-overline text-text-faint">
            Built with {siteMeta.builtWith.join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  );
}
