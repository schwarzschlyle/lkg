import { useIsTouch, usePrefersReducedMotion, useRevealBindings, useTilt } from '@/hooks';
import { cx } from '@/lib/cx';
import type { FeatureCardItem } from '@/types/content';
import { Viz } from './vizzes';
import styles from './FeatureCard.module.css';

export interface FeatureCardProps {
  readonly item: FeatureCardItem;
  /** Stagger offset for the grid reveal (spec §6: 70ms apart). */
  readonly delay: number;
}

/**
 * One of the four "What I Do Differently" cards (spec §6 [v2]).
 *
 * On desktop it tilts toward the cursor, carries a mouse-follow spotlight, and
 * plays its themed diagram on hover. On touch there is no hover to give, so the
 * diagram plays once as the card scrolls into view instead (spec §15) — the
 * card stays alive and meaningful either way.
 */
export function FeatureCard({ item, delay }: FeatureCardProps) {
  const isTouch = useIsTouch();
  const reducedMotion = usePrefersReducedMotion();
  const reveal = useRevealBindings();
  const tilt = useTilt(!isTouch && !reducedMotion);

  const playOnScroll = isTouch && reveal.revealed && !reducedMotion;

  return (
    <div
      ref={(node) => {
        reveal.ref(node);
        tilt.ref(node);
      }}
      className={cx(reveal.className, styles.card, playOnScroll && styles.playing)}
      style={{ animationDelay: `${delay.toString()}ms` }}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
    >
      <span className={styles.numeral} aria-hidden="true">
        {item.numeral}
      </span>
      <div className={styles.inner}>
        <Viz name={item.viz} />
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.body}>{item.body}</p>
        {item.tag !== undefined ? <span className={styles.tag}>{item.tag}</span> : null}
      </div>
    </div>
  );
}
