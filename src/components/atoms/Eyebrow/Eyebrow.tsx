import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './Eyebrow.module.css';

export interface EyebrowProps {
  readonly className?: string;
  readonly children: ReactNode;
}

/** Small accent label above a headline. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return <div className={cx(styles.eyebrow, className)}>{children}</div>;
}
