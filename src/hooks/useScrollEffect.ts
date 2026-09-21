import { useEffect, useRef } from 'react';
import { subscribeToScroll } from '@/lib/scrollBus';

/**
 * Run `handler` on every batched scroll/resize tick (and once on mount).
 *
 * The handler is held in a ref, so an inline arrow function does not
 * re-subscribe on every render.
 */
export function useScrollEffect(handler: () => void): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => subscribeToScroll(() => handlerRef.current()), []);
}
