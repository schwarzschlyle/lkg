import { useEffect, useMemo, useState } from 'react';
import { cx } from '@/lib/cx';
import type { TextSegment } from '@/types/content';
import styles from './AssembledHeadline.module.css';

/** Spec §3: characters lock into place ~18ms apart. */
const CHAR_STAGGER_MS = 18;
const START_DELAY_MS = 120;

interface WordToken {
  readonly kind: 'word';
  readonly text: string;
  readonly accent: boolean;
}

interface SpaceToken {
  readonly kind: 'space';
}

type Token = WordToken | SpaceToken;

/**
 * Split segments into word/space tokens. Words become non-breaking wrappers of
 * per-character spans; spaces stay real breakable spaces between them.
 */
function tokenize(segments: readonly TextSegment[]): Token[] {
  const tokens: Token[] = [];

  for (const segment of segments) {
    for (const part of segment.text.split(/(\s+)/)) {
      if (part === '') continue;
      if (/^\s+$/.test(part)) {
        tokens.push({ kind: 'space' });
      } else {
        tokens.push({ kind: 'word', text: part, accent: segment.accent === true });
      }
    }
  }

  return tokens;
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

  const tokens = useMemo(() => tokenize(segments), [segments]);
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
    <h1
      id={id}
      className={cx(className, assembled && styles.assembled)}
      aria-label={label}
    >
      {tokens.map((token, tokenIndex) => {
        if (token.kind === 'space') {
          return <span key={`space-${tokenIndex.toString()}`}>{' '}</span>;
        }

        return (
          <span
            key={`word-${tokenIndex.toString()}`}
            className={cx(styles.word, token.accent && styles.accentWord)}
            aria-hidden="true"
          >
            {[...token.text].map((char, index) => {
              const delay = charIndex * CHAR_STAGGER_MS;
              charIndex += 1;
              return (
                <span
                  key={`${char}-${index.toString()}`}
                  className={styles.char}
                  style={{ transitionDelay: `${delay.toString()}ms` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
