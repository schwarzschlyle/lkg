import { cx } from '@/lib/cx';
import type { MethodStep as MethodStepData } from '@/types/content';
import { Glyph } from './glyphs';
import styles from './MethodStep.module.css';

export interface MethodStepProps {
  readonly step: MethodStepData;
  /** The accent fill has reached or passed this node. */
  readonly lit: boolean;
  /** The latest lit node — shows its description and the "you-are-here" pulse. */
  readonly current: boolean;
}

/** One of the seven stops on the method track (spec §10 [v2]). */
export function MethodStep({ step, lit, current }: MethodStepProps) {
  return (
    <li className={cx(styles.step, lit && styles.lit, current && styles.current)}>
      <div className={styles.glyph}>
        <Glyph name={step.glyph} />
      </div>
      <div className={styles.node} aria-hidden="true" />
      <div className={styles.text}>
        <div className={styles.label}>{step.label}</div>
        <div className={styles.numeral}>{step.numeral}</div>
        <div className={styles.description}>{step.description}</div>
      </div>
    </li>
  );
}
