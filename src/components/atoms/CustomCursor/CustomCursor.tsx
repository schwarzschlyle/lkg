import { useEffect, useRef } from 'react';
import { useIsTouch, usePrefersReducedMotion } from '@/hooks';
import { toggleClass } from '@/lib/dom';
import styles from './CustomCursor.module.css';

/** Elements the cursor grows over. `[data-cursor]` opts anything else in. */
const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [data-cursor]';

/**
 * The 8px accent dot that replaces the native cursor on precise pointers
 * (spec §1.4).
 *
 * Position is written straight to the node inside a rAF — putting a
 * `pointermove` into React state would re-render the whole tree on every pixel.
 * Hit-testing uses one delegated listener rather than binding to every
 * interactive element, so it keeps working as sections mount and unmount.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouch();
  const reducedMotion = usePrefersReducedMotion();
  const disabled = isTouch || reducedMotion;

  useEffect(() => {
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    let frameId = 0;
    let x = 0;
    let y = 0;

    const render = (): void => {
      frameId = 0;
      element.style.transform = `translate3d(${x.toString()}px, ${y.toString()}px, 0) translate(-50%, -50%)`;
    };

    const onPointerMove = (event: PointerEvent): void => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      toggleClass(element, styles.visible, true);
      if (frameId === 0) frameId = requestAnimationFrame(render);
    };

    const onPointerOver = (event: PointerEvent): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      toggleClass(element, styles.grown, target.closest(INTERACTIVE_SELECTOR) !== null);
    };

    const onPointerLeaveWindow = (): void => {
      toggleClass(element, styles.visible, false);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerleave', onPointerLeaveWindow);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerleave', onPointerLeaveWindow);
      if (frameId !== 0) cancelAnimationFrame(frameId);
    };
  }, [disabled]);

  if (disabled) return null;

  return <div ref={ref} className={styles.cursor} aria-hidden="true" />;
}
