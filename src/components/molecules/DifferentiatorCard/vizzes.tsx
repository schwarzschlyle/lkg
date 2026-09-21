import type { ReactNode } from 'react';
import type { VizKey } from '@/types/content';
import { cx } from '@/lib/cx';
import styles from './DifferentiatorCard.module.css';

/**
 * Spec §6 [v2] — the four themed mini-diagrams. Each expresses its own card's
 * idea and animates on hover (desktop) or once on scroll-in (mobile). The
 * visual carries meaning; it is not decoration.
 *
 * They share the card's stylesheet so its `:hover` / `.playing` selectors
 * reach them.
 */

/** 01 · A flat line dips into a failure spike, then self-heals back to steady. */
const SHAPES: Record<VizKey, ReactNode> = {
  selfHeal: (
    <>
      <path className={styles.line} d="M2 20 L14 20 L18 20" />
      <path
        className={cx(styles.accent, styles.heal)}
        d="M18 20 L23 20 L26 34 L30 6 L34 24 L38 20 L50 20"
      />
    </>
  ),

  // 02 · Three dots joined by a line that fills left-to-right, igniting in turn.
  phaseFill: (
    <>
      <path className={cx(styles.accent, styles.phaseFill)} d="M8 26 L26 26 L44 26" />
      <circle className={styles.phaseDot} cx="8" cy="26" r="4" />
      <circle className={cx(styles.phaseDot, styles.phaseDot2)} cx="26" cy="26" r="4" />
      <circle className={cx(styles.phaseDot, styles.phaseDot3)} cx="44" cy="26" r="4" />
    </>
  ),

  // 03 · A node pulsing inside guardrail brackets.
  guardrail: (
    <>
      <path className={styles.line} d="M12 6 L8 6 L8 32 L12 32 M40 6 L44 6 L44 32 L40 32" />
      <circle className={cx(styles.accent, styles.pulse)} cx="26" cy="19" r="4" fill="none" />
    </>
  ),

  // 04 · A handoff/shield shape over a baseline.
  handoff: (
    <>
      <path className={styles.line} d="M4 30 L26 34 L48 30" />
      <path className={styles.accent} d="M14 12 L26 8 L38 12 L38 16 L26 20 L14 16 Z" />
    </>
  ),
};

export interface VizProps {
  readonly name: VizKey;
}

export function Viz({ name }: VizProps) {
  return (
    <svg className={styles.viz} viewBox="0 0 52 38" aria-hidden="true" focusable="false">
      {SHAPES[name]}
    </svg>
  );
}
