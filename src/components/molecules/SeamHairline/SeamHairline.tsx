import { useId } from 'react';
import { useReveal } from '@/hooks';
import { cx } from '@/lib/cx';
import styles from './SeamHairline.module.css';

export type SeamPosition = 'top' | 'bottom';

export interface SeamHairlineProps {
  readonly position: SeamPosition;
}

/** Chevron polyline matching the clip-path peak for each edge (spec §1.1b). */
const POINTS: Record<SeamPosition, string> = {
  top: '0,100 50,0 100,100',
  bottom: '0,0 50,100 100,0',
};

/**
 * The teal→terracotta hairline riding one diagonal edge of a light section —
 * literally the handoff from cool dark mode to warm light mode.
 *
 * Two comets launch from the outer corners and converge on the centre peak
 * the first time the seam scrolls into view.
 */
export function SeamHairline({ position }: SeamHairlineProps) {
  // `useId` output contains characters that are invalid inside `url(#…)`,
  // so it is reduced to a safe token before use.
  const rawId = useId();
  const gradientId = `seam-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}-${position}`;

  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.9 });

  return (
    <div
      ref={ref}
      className={cx(
        styles.seam,
        position === 'top' ? styles.top : styles.bottom,
        revealed && styles.run,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3DD6C4" />
            <stop offset="0.5" stopColor="#8FB0A0" />
            <stop offset="1" stopColor="#C2603D" />
          </linearGradient>
        </defs>
        <polyline
          points={POINTS[position]}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className={cx(styles.comet, styles.cometLeft)} />
      <span className={cx(styles.comet, styles.cometRight)} />
    </div>
  );
}
