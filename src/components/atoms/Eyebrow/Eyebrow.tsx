import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Eyebrow.module.css';

export interface EyebrowProps {
  /**
   * `inline` inherits the surrounding alignment, which is what the hero wants.
   * `statement` and `content` mirror `SectionHeading` and `Lead`, so an
   * eyebrow lines up with the heading it introduces.
   */
  readonly variant?: 'inline' | 'statement' | 'content';
  readonly className?: string;
  readonly children: ReactNode;
}

/** Small accent label above a headline. */
export function Eyebrow({ variant = 'inline', className, children }: EyebrowProps) {
  return (
    <div
      className={cx(
        styles.eyebrow,
        variant === 'statement' && styles.statement,
        variant === 'content' && styles.content,
        className,
      )}
    >
      {children}
    </div>
  );
}
