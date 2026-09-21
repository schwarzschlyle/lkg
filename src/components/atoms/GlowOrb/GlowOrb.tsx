import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { usePrefersReducedMotion, useIsDesktop, useScrollEffect } from '@/hooks';
import styles from './GlowOrb.module.css';

export interface GlowOrbProps {
  readonly size: number;
  /** Offsets relative to the containing section. */
  readonly left?: string;
  readonly right?: string;
  readonly top?: string;
  /** Spec §1.1d E1: gentle scroll parallax, desktop only. */
  readonly parallax?: number;
}

/** A blurred accent bloom behind dark-section content. */
export function GlowOrb({ size, left, right, top, parallax = 0.04 }: GlowOrbProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const parallaxEnabled = isDesktop && !reducedMotion && parallax !== 0;

  useScrollEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!parallaxEnabled) {
      element.style.transform = '';
      return;
    }
    const section = element.parentElement;
    if (!section) return;
    const offset = -section.getBoundingClientRect().top * parallax;
    element.style.transform = `translateY(${offset.toFixed(1)}px)`;
  });

  const style: CSSProperties = {
    width: `${size.toString()}px`,
    height: `${size.toString()}px`,
    left,
    right,
    top,
  };

  return <div ref={ref} className={styles.glow} style={style} aria-hidden="true" />;
}
