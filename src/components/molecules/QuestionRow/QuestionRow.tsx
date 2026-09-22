import { useRevealBindings } from '@/hooks';
import { cx } from '@/lib/cx';
import type { QuestionItem } from '@/types/content';
import styles from './QuestionRow.module.css';

export interface QuestionRowProps {
  readonly item: QuestionItem;
  /** Stagger offset for the grid reveal (spec §1.4: 70ms apart). */
  readonly delay: number;
}

/** One objection, answered. */
export function QuestionRow({ item, delay }: QuestionRowProps) {
  const reveal = useRevealBindings();

  return (
    <div
      ref={reveal.ref}
      className={cx(reveal.className, styles.row, reveal.revealed && styles.lit)}
      style={{ animationDelay: `${delay.toString()}ms` }}
    >
      <span className={styles.index} aria-hidden="true">
        {item.index}
      </span>
      <h3 className={styles.question}>{item.question}</h3>
      <p className={styles.answer}>{item.answer}</p>
    </div>
  );
}
