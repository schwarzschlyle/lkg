import { useEffect, useRef } from 'react';
import { Button, Eyebrow, GlowOrb, Reveal, ScrollCue } from '@/components/atoms';
import { AssembledHeadline } from '@/components/molecules';
import {
  useIsDesktop,
  useParticleField,
  usePrefersReducedMotion,
  useScrollEffect,
} from '@/hooks';
import { HERO } from '@/content/sections';
import { BRAND, SECTION_IDS } from '@/content/site';
import styles from './Hero.module.css';

/** Spec §1.1d E1: gentle parallax on the ghost monogram, desktop only. */
const GHOST_PARALLAX = 0.06;

/** Spec §3: the whole field parallaxes gently opposite the cursor, max ~20px. */
const FIELD_PARALLAX_PX = 20;
/** Easing per frame toward the cursor target — low enough to feel like drift. */
const FIELD_EASING = 0.08;

/** The hero (spec §3) — full viewport, left-aligned, with the living graph behind. */
export function Hero() {
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const parallaxEnabled = isDesktop && !reducedMotion;

  // 40–50+ nodes connected by thin lines: a living distributed system. Painted
  // dimmer than the Depth organism — here it is atmosphere, not the subject.
  const graphRef = useParticleField({
    nodeCount: 64,
    linkDistance: 160,
    nodeAlpha: 0.4,
    linkAlpha: 0.11,
    still: reducedMotion,
  });

  useScrollEffect(() => {
    const ghost = ghostRef.current;
    if (!ghost) return;
    ghost.style.transform = parallaxEnabled
      ? `translateY(calc(-50% + ${(window.scrollY * GHOST_PARALLAX).toFixed(1)}px))`
      : '';
  });

  // Whole-field cursor parallax. Applied as a CSS transform on the canvas so
  // the field and its mask drift together, and so the canvas's own render loop
  // stays untouched. The easing loop only runs while there is distance left to
  // travel, rather than burning a frame every tick.
  useEffect(() => {
    const canvas = graphRef.current;
    if (!canvas) return;

    if (!parallaxEnabled) {
      canvas.style.transform = '';
      return;
    }

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const tick = (): void => {
      frame = 0;
      x += (targetX - x) * FIELD_EASING;
      y += (targetY - y) * FIELD_EASING;
      canvas.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) start();
    };

    const start = (): void => {
      if (frame === 0) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent): void => {
      if (event.pointerType !== 'mouse') return;
      // Opposite the cursor, so the field feels like it sits behind the page.
      targetX = -(event.clientX / window.innerWidth - 0.5) * 2 * FIELD_PARALLAX_PX;
      targetY = -(event.clientY / window.innerHeight - 0.5) * 2 * FIELD_PARALLAX_PX;
      start();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (frame !== 0) cancelAnimationFrame(frame);
      canvas.style.transform = '';
    };
  }, [graphRef, parallaxEnabled]);

  return (
    <section id={SECTION_IDS.hero} className={styles.hero} aria-labelledby="hero-headline">
      <canvas ref={graphRef} className={styles.graph} aria-hidden="true" />

      <div ref={ghostRef} className={styles.ghost} aria-hidden="true">
        {BRAND.monogram}
      </div>
      {/* Glow now sits with the field on the right rather than under the text. */}
      <GlowOrb size={600} right="8%" top="18%" />

      <div className={styles.textScrim} aria-hidden="true" />

      <div className={styles.content}>
        <Reveal>
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
        </Reveal>

        <AssembledHeadline
          id="hero-headline"
          className={styles.headline}
          segments={HERO.headline}
        />

        <Reveal as="p" className={styles.sub}>
          {HERO.sub}
        </Reveal>

        <Reveal className={styles.actions}>
          <Button href={HERO.primaryCta.href} variant="solid" magnetic>
            {HERO.primaryCta.label}
          </Button>
          <Button href={HERO.secondaryCta.href} variant="ghost" magnetic>
            {HERO.secondaryCta.label}
          </Button>
        </Reveal>
      </div>

      <div className={styles.readout} aria-hidden="true">
        {HERO.readout}
      </div>
      <ScrollCue />
    </section>
  );
}
