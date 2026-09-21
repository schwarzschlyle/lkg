import { useCallback, useRef } from 'react';
import type { PointerEvent } from 'react';

/** Spec §1.4: translate up to ~6px toward the cursor. */
const PULL_X = 0.2;
const PULL_Y = 0.3;

export interface MagneticBindings {
  /** Callback ref — assignable to any host element. */
  readonly ref: (node: HTMLElement | null) => void;
  readonly onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  readonly onPointerLeave: () => void;
}

/** Magnetic button pull (spec §1.4). Inert when motion is reduced or on touch. */
export function useMagnetic(enabled: boolean): MagneticBindings {
  const nodeRef = useRef<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const element = nodeRef.current;
      if (!enabled || !element || event.pointerType !== 'mouse') return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${(x * PULL_X).toFixed(2)}px, ${(y * PULL_Y).toFixed(2)}px)`;
    },
    [enabled],
  );

  const onPointerLeave = useCallback(() => {
    const element = nodeRef.current;
    if (element) element.style.transform = '';
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
