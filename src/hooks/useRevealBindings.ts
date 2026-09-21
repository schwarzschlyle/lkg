import { useCallback } from 'react';
import { useReveal } from './useReveal';
import { cx } from '@/lib/cx';
import styles from '@/styles/reveal.module.css';

export interface RevealBindings {
  /** Callback ref — assignable to any host element. */
  readonly ref: (node: HTMLElement | null) => void;
  readonly className: string;
  readonly revealed: boolean;
}

interface UseRevealBindingsOptions {
  readonly threshold?: number;
}

/**
 * Reveal-on-scroll as spreadable props, so a heading, paragraph or list item
 * can reveal *itself* instead of being wrapped in a layout-changing div.
 */
export function useRevealBindings({
  threshold = 0.15,
}: UseRevealBindingsOptions = {}): RevealBindings {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold });

  const setNode = useCallback(
    (node: HTMLElement | null) => {
      ref.current = node;
    },
    [ref],
  );

  return {
    ref: setNode,
    className: cx(styles.reveal, revealed && styles.revealed),
    revealed,
  };
}
