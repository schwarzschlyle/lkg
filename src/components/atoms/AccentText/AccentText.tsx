import { Fragment } from 'react';
import type { TextSegment } from '@/types/content';
import styles from './AccentText.module.css';

export interface AccentTextProps {
  readonly segments: readonly TextSegment[];
}

/**
 * Renders a run of copy where some words carry the accent colour.
 * Accent segments use `--accent-ink`, so they read teal on dark and terracotta
 * on light without the component knowing which mode it is in (spec §1.1).
 */
export function AccentText({ segments }: AccentTextProps) {
  return (
    <>
      {segments.map((segment, index) => (
        <Fragment key={`${segment.text}-${index.toString()}`}>
          {segment.accent === true ? (
            <span className={styles.accent}>{segment.text}</span>
          ) : (
            segment.text
          )}
        </Fragment>
      ))}
    </>
  );
}
