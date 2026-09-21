import type { Ref } from 'react';
import { cx } from '@/lib/cx';
import type { Phase } from '@/types/content';
import styles from './PhaseStation.module.css';

export interface PhaseStationProps {
  readonly phase: Phase;
  readonly lit: boolean;
  /** Phasing measures the station to decide when its node ignites. */
  readonly stationRef?: Ref<HTMLDivElement>;
}

/** One phase on the "How we work together" rail (spec §9). */
export function PhaseStation({ phase, lit, stationRef }: PhaseStationProps) {
  return (
    <div ref={stationRef} className={cx(styles.station, lit && styles.lit)}>
      <span className={styles.node} aria-hidden="true" />
      <div className={styles.numeral}>{phase.numeral}</div>
      <h3 className={styles.title}>{phase.title}</h3>
      <p className={styles.body}>{phase.body}</p>
    </div>
  );
}
