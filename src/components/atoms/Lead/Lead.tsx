import type { ReactNode } from 'react';
import { useRevealBindings } from '@/hooks';
import { cx } from '@/lib/cx';
import styles from './Lead.module.css';

export interface LeadProps {
  /** See `SectionHeading` — mirrors its alignment behaviour (spec §1.2a). */
  readonly variant?: 'statement' | 'content';
  /** Opt out of reveal-on-scroll (the Problem lead is static). */
  readonly reveal?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

/** The muted intro/outro paragraph that sits under a section heading. */
export function Lead({ variant = 'statement', reveal = true, className, children }: LeadProps) {
  const bindings = useRevealBindings();

  return (
    <p
      ref={reveal ? bindings.ref : undefined}
      className={cx(
        reveal && bindings.className,
        styles.lead,
        variant === 'content' && styles.content,
        className,
      )}
    >
      {children}
    </p>
  );
}
