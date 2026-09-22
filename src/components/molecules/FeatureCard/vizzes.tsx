import type { ReactNode } from 'react';
import type { VizKey } from '@/types/content';
import { cx } from '@/lib/cx';
import styles from './FeatureCard.module.css';

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

  /* ---- Solutions grid ---------------------------------------------------
     Same vocabulary as above: muted shapes carry the structure, one accent
     element carries the idea, and the existing `heal` / `pulse` animations do
     the moving. No new animation CSS. */

  // 01 · A closed cycle: the work goes round without a hand on it.
  automate: (
    <>
      <path className={styles.line} d="M14 14 A8 8 0 0 1 38 14" />
      <path className={styles.accent} d="M38 14 L38 8 M38 14 L32 14" />
      <path className={styles.line} d="M38 24 A8 8 0 0 1 14 24" />
      <path className={styles.accent} d="M14 24 L14 30 M14 24 L20 24" />
    </>
  ),

  // 02 · Scattered tools wired into one hub.
  connect: (
    <>
      <path className={styles.line} d="M26 19 L9 8 M26 19 L43 8 M26 19 L9 30 M26 19 L43 30" />
      <circle className={styles.line} cx="9" cy="8" r="2.5" />
      <circle className={styles.line} cx="43" cy="8" r="2.5" />
      <circle className={styles.line} cx="9" cy="30" r="2.5" />
      <circle className={styles.line} cx="43" cy="30" r="2.5" />
      <circle className={styles.accent} cx="26" cy="19" r="4.5" />
    </>
  ),

  // 03 · A trend line drawing itself across a baseline.
  dashboard: (
    <>
      <path className={styles.line} d="M5 33 L47 33" />
      <path className={cx(styles.accent, styles.heal)} d="M7 28 L17 20 L25 24 L34 11 L45 7" />
    </>
  ),

  // 04 · A customer completing something themselves.
  selfServe: (
    <>
      <circle className={styles.line} cx="17" cy="12" r="4.5" />
      <path className={styles.line} d="M8 31 A9 9 0 0 1 26 31" />
      <path className={styles.accent} d="M32 21 L37 26 L46 13" />
    </>
  ),

  // 06 · Prove it small, then build the real thing: an accent prototype
  //      feeding a larger outline. Deliberately not another tick, so it does
  //      not read as a duplicate of the self-serve card.
  prove: (
    <>
      <rect className={styles.accent} x="5" y="19" width="13" height="13" rx="2" />
      <path className={styles.line} d="M20 25 H27" />
      <rect className={styles.line} x="30" y="7" width="17" height="25" rx="2" />
    </>
  ),

  // 05 · A document answering back: lines drafting themselves.
  assistant: (
    <>
      <path className={styles.line} d="M11 5 H33 L41 13 V33 H11 Z M33 5 V13 H41" />
      <path className={cx(styles.accent, styles.heal)} d="M17 20 H34 M17 26 H29" />
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
