import { useRef } from 'react';
import { useScrollEffect } from '@/hooks';
import { clamp01 } from '@/lib/math';
import styles from './ScrollProgressBar.module.css';

/**
 * Page scroll-progress bar pinned to the top edge (spec §2).
 * Writes `width` directly to the node — this updates every frame and must
 * never trigger a React render.
 */
export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement | null>(null);

  useScrollEffect(() => {
    const element = ref.current;
    if (!element) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0;
    element.style.width = `${(progress * 100).toFixed(3)}%`;
  });

  return <div ref={ref} className={styles.progress} aria-hidden="true" />;
}
