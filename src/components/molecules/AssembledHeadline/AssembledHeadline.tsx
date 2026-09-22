import { Fragment, useEffect, useMemo, useState } from 'react';
import { cx } from '@/lib/cx';
import type { TextSegment } from '@/types/content';
import styles from './AssembledHeadline.module.css';

/** Spec §3: characters lock into place ~18ms apart. */
const CHAR_STAGGER_MS = 18;
const START_DELAY_MS = 120;

interface Glyph {
  readonly char: string;
  readonly accent: boolean;
}

type Word = readonly Glyph[];

/**
 * Split segments into visual words, carrying the accent flag per character.
 *
 * Words are built from whitespace alone, NOT from segment boundaries. Each
 * `.word` is an inline-block, and browsers will happily break the line between
 * two adjacent inline-blocks even with no space between them, so splitting
 * "survives" and its full stop into separate words let the full stop wrap onto
 * a line of its own. Grouping by whitespace keeps any trailing punctuation
 * welded to the word it belongs to, whatever segment it came from.
 */
function toWords(segments: readonly TextSegment[]): Word[] {
  const words: Glyph[][] = [];
  let current: Glyph[] = [];

  const flush = (): void => {
    if (current.length > 0) {
      words.push(current);
      current = [];
    }
  };

  for (const segment of segments) {
    const accent = segment.accent === true;
    for (const char of segment.text) {
      if (/\s/.test(char)) flush();
      else current.push({ char, accent });
    }
  }

  flush();
  return words;
}

export interface AssembledHeadlineProps {
  readonly segments: readonly TextSegment[];
  readonly className?: string;
  readonly id?: string;
}

/**
 * The hero headline (spec §3). Characters start scattered and faded, then fly
 * into place and lock, ~18ms apart, with the accent word settling last.
 *
 * The split text is hidden from assistive tech and the whole line is exposed
 * once via `aria-label`, so screen readers announce a sentence rather than a
 * string of single letters.
 */
export function AssembledHeadline({ segments, className, id }: AssembledHeadlineProps) {
  const [assembled, setAssembled] = useState(false);

  const words = useMemo(() => toWords(segments), [segments]);
  const label = useMemo(() => segments.map((segment) => segment.text).join(''), [segments]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAssembled(true);
    }, START_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // Running character index drives the cumulative stagger across all words.
  let charIndex = 0;

  return (
    <h1 id={id} className={cx(className, assembled && styles.assembled)} aria-label={label}>
      {words.map((word, wordIndex) => (
        <Fragment key={`word-${wordIndex.toString()}`}>
          {/* A real breakable space, so the line can only ever wrap here. */}
          {wordIndex > 0 ? ' ' : null}
          <span className={styles.word} aria-hidden="true">
            {word.map((glyph, index) => {
              const delay = charIndex * CHAR_STAGGER_MS;
              charIndex += 1;
              return (
                <span
                  key={`${glyph.char}-${index.toString()}`}
                  className={cx(styles.char, glyph.accent && styles.charAccent)}
                  style={{ transitionDelay: `${delay.toString()}ms` }}
                >
                  {glyph.char}
                </span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </h1>
  );
}
