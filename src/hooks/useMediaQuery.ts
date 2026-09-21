import { useCallback, useSyncExternalStore } from 'react';

/** Reactive `matchMedia`. Returns `false` before hydration. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onStoreChange);
      return () => mql.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Breakpoints — kept in one place so JS and CSS never drift apart. */
export const BREAKPOINTS = {
  /** Mobile layout switch (spec §15). */
  mobile: '(max-width: 820px)',
  /** Desktop aesthetic layer A–E (spec §1.1d). */
  desktop: '(min-width: 1000px)',
  /** Compact blueprint fan (spec §8). */
  compact: '(max-width: 640px)',
} as const;

export const useIsMobile = (): boolean => useMediaQuery(BREAKPOINTS.mobile);
export const useIsDesktop = (): boolean => useMediaQuery(BREAKPOINTS.desktop);

/** Spec §1.4: on reduce, ALL motion becomes an instant fade. */
export const usePrefersReducedMotion = (): boolean =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

/** True on touch/coarse pointers, where hover-driven affordances are skipped. */
export const useIsTouch = (): boolean => useMediaQuery('(hover: none), (pointer: coarse)');
