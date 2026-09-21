import type { SectionIndexEntry } from '@/types/content';
import styles from './SectionIndex.module.css';

export interface SectionIndexProps {
  readonly entry: SectionIndexEntry;
}

/** Large faint numeral + mono label in a section's top-right void. */
export function SectionIndex({ entry }: SectionIndexProps) {
  return (
    <div className={styles.index} aria-hidden="true">
      <span className={styles.numeral}>{entry.numeral}</span>
      {entry.label}
    </div>
  );
}
