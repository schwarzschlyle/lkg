import type { ReactNode } from 'react';
import { useRevealBindings } from '@/hooks';
import { cx } from '@/lib/cx';
import styles from './SectionHeading.module.css';

export interface SectionHeadingProps {
  /**
   * `statement` stays centred at every width (Problem, Deliverable, Contact,
   * Phasing). `content` left-aligns on mobile to cohere with the left-anchored
   * content beneath it (spec §1.2a).
   */
  readonly variant?: 'statement' | 'content';
  /** Quiet sections (the Toolkit) use a smaller heading. */
  readonly compact?: boolean;
  /**
   * Opt out of reveal-on-scroll. The Problem heading glitches in instead
   * (spec §5), and two competing entrance animations would fight.
   */
  readonly reveal?: boolean;
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

/** The `h2` that opens every section. Reveals itself on scroll. */
export function SectionHeading({
  variant = 'statement',
  compact = false,
  reveal = true,
  id,
  className,
  children,
}: SectionHeadingProps) {
  const bindings = useRevealBindings();

  return (
    <h2
      id={id}
      ref={reveal ? bindings.ref : undefined}
      className={cx(
        reveal && bindings.className,
        styles.heading,
        variant === 'content' && styles.content,
        compact && styles.compact,
        className,
      )}
    >
      {children}
    </h2>
  );
}
