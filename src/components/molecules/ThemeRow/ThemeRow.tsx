import type { Ref } from 'react';
import { cx } from '@/lib/cx';
import type { DepthTheme } from '@/types/content';
import styles from './ThemeRow.module.css';

export interface ThemeRowProps {
  readonly theme: DepthTheme;
  /** Lit as the row enters the active band (desktop) or is nearest centre (mobile). */
  readonly lit: boolean;
  /** Mobile: the single nearest-centre theme, which also shows its region chip. */
  readonly active: boolean;
  /** Depth measures the row to decide whether it is in the active band. */
  readonly rowRef?: Ref<HTMLDivElement>;
  /** The connector line is drawn from this dot, so Depth needs its position. */
  readonly dotRef?: Ref<HTMLSpanElement>;
}

/** One theme in the Depth column, with its rail dot and mobile region chip. */
export function ThemeRow({ theme, lit, active, rowRef, dotRef }: ThemeRowProps) {
  return (
    <div
      ref={rowRef}
      className={cx(styles.theme, lit && styles.lit, active && styles.active)}
    >
      <span ref={dotRef} className={styles.dot} aria-hidden="true" />
      <h4 className={styles.title}>{theme.title}</h4>
      <p className={styles.caption}>{theme.caption}</p>
      <div className={styles.chip} aria-hidden="true">
        {theme.regionChip}
      </div>
    </div>
  );
}
