import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-wider2 ' +
  'transition-colors duration-200 ease-precise disabled:pointer-events-none disabled:opacity-40';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink-base hover:bg-accent-soft font-semibold',
  outline:
    'border border-ink-line bg-ink-surface/40 text-text-primary hover:border-accent/50 hover:bg-ink-raised hover:text-accent',
  ghost:
    'text-text-muted hover:text-accent',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5',
  md: 'h-11 px-5 sm:h-12 sm:px-6',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'outline',
  size = 'md',
  children,
  className,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {icon}
    </button>
  );
}

interface LinkButtonProps extends CommonProps {
  /** null renders a non-interactive button labelled as pending, never a dead link. */
  href: string | null;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
  /** Shown in place of the label when href is null. */
  pendingLabel?: string;
}

export function LinkButton({
  href,
  external = false,
  download = false,
  variant = 'outline',
  size = 'md',
  children,
  className,
  icon,
  ariaLabel,
  pendingLabel,
}: LinkButtonProps) {
  if (!href) {
    return (
      <span
        className={cn(
          base,
          sizes[size],
          'cursor-not-allowed border border-dashed border-ink-line text-text-faint',
          className,
        )}
        title="Link not added yet"
      >
        {pendingLabel ?? children}
        <span className="sr-only"> — link not available yet</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      download={download || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
      {icon}
    </a>
  );
}
