import { Chip } from '@/components/atoms';
import { useRevealBindings } from '@/hooks';
import { cx } from '@/lib/cx';
import type { StackGroup as StackGroupData } from '@/types/content';
import styles from './StackGroup.module.css';

export interface StackGroupProps {
  readonly group: StackGroupData;
  /** Stagger offset for the grid reveal (spec §1.4: 70ms apart). */
  readonly delay: number;
}

/** One labelled category of the toolkit, with its wrapped row of chips. */
export function StackGroup({ group, delay }: StackGroupProps) {
  const reveal = useRevealBindings();

  return (
    <div
      ref={reveal.ref}
      className={cx(reveal.className, styles.group)}
      style={{ animationDelay: `${delay.toString()}ms` }}
    >
      <h4 className={styles.category}>{group.category}</h4>
      <div className={styles.chips}>
        {group.items.map((item) => (
          <Chip key={item} label={item} />
        ))}
      </div>
    </div>
  );
}
