import type { Ref } from 'react';
import { cx } from '@/lib/cx';
import styles from './BlueprintDoc.module.css';

export interface BlueprintDocProps {
  readonly label: string;
  /**
   * Deliverable writes this card's fan position straight to the node on every
   * scroll tick, so it needs a handle on the element itself.
   */
  readonly docRef?: Ref<HTMLDivElement>;
}

/** One blueprint "document" in the Deliverable fan (spec §8). */
export function BlueprintDoc({ label, docRef }: BlueprintDocProps) {
  return (
    <div ref={docRef} className={styles.doc} aria-hidden="true">
      <div className={styles.label}>{label}</div>
      <div className={styles.rule} />
      <div className={cx(styles.rule, styles.ruleShort)} />
    </div>
  );
}
