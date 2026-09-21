import styles from './Chip.module.css';

export interface ChipProps {
  readonly label: string;
}

/** A single toolkit entry. `data-cursor` grows the custom cursor over it. */
export function Chip({ label }: ChipProps) {
  return (
    <span className={styles.chip} data-cursor="grow">
      {label}
    </span>
  );
}
