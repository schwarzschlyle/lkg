import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface UseRevealOptions {
  /** Fraction of the element that must be visible. */
  readonly threshold?: number;
  /** Stop observing after the first intersection (default). */
  readonly once?: boolean;
}

interface UseRevealResult<T extends Element> {
  readonly ref: RefObject<T | null>;
  readonly revealed: boolean;
}

/**
 * Reveal-on-scroll primitive (spec §1.4). Elements start at
 * `opacity: 0; translateY(24px)` and settle when they enter the viewport.
 */
export function useReveal<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  once = true,
}: UseRevealOptions = {}): UseRevealResult<T> {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  return { ref, revealed };
}
