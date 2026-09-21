import type { CSSProperties, ReactNode } from 'react';
import { useRevealBindings } from '@/hooks';
import { cx } from '@/lib/cx';

/** The host elements the site actually reveals. */
type RevealTag = 'div' | 'span' | 'li' | 'p';

export interface RevealProps {
  /** Host element to render. Defaults to `div`. */
  readonly as?: RevealTag;
  /** Stagger offset in ms for grouped items (spec §1.4: 70ms apart). */
  readonly delay?: number;
  /** Fraction visible before revealing. */
  readonly threshold?: number;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly children?: ReactNode;
}

/**
 * Fades and lifts its child into place when it scrolls into view.
 *
 * Renders the requested host element directly rather than wrapping it, so grid
 * and list layouts (`.plist li`, the 2×2 card grid) keep their real structure.
 */
export function Reveal({
  as = 'div',
  delay = 0,
  threshold = 0.15,
  className,
  style,
  children,
}: RevealProps) {
  const reveal = useRevealBindings({ threshold });

  const shared = {
    ref: reveal.ref,
    className: cx(reveal.className, className),
    style: delay > 0 ? { ...style, animationDelay: `${delay.toString()}ms` } : style,
  };

  switch (as) {
    case 'span':
      return <span {...shared}>{children}</span>;
    case 'li':
      return <li {...shared}>{children}</li>;
    case 'p':
      return <p {...shared}>{children}</p>;
    default:
      return <div {...shared}>{children}</div>;
  }
}
