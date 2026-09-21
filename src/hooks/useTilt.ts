import { useCallback, useRef } from 'react';
import type { PointerEvent } from 'react';

/** Spec §6: rotateX ±8°, rotateY ±10°, plus a 6px lift. */
const MAX_ROTATE_X = 8;
const MAX_ROTATE_Y = 10;
const LIFT_PX = 6;

export interface TiltBindings {
  /** Callback ref — assignable to any host element. */
  readonly ref: (node: HTMLElement | null) => void;
  readonly onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  readonly onPointerLeave: () => void;
}

/**
 * 3D tilt + mouse-follow spotlight for the differentiator cards (spec §6).
 *
 * Writes `--mx` / `--my` (spotlight origin) and the transform straight to the
 * node instead of through React state — a pointer move must never re-render.
 * Inert on touch, where the card plays its viz on scroll instead (spec §15).
 */
export function useTilt(enabled: boolean): TiltBindings {
  const nodeRef = useRef<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const element = nodeRef.current;
      if (!enabled || !element || event.pointerType !== 'mouse') return;

      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      element.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
      element.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);

      const rotateX = (py - 0.5) * -MAX_ROTATE_X;
      const rotateY = (px - 0.5) * MAX_ROTATE_Y;
      element.style.transform = `translateY(-${LIFT_PX.toString()}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    },
    [enabled],
  );

  const onPointerLeave = useCallback(() => {
    const element = nodeRef.current;
    if (element) element.style.transform = '';
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
