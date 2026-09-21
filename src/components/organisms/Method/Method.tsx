import { useRef, useState } from 'react';
import { Lead, SectionHeading } from '@/components/atoms';
import { MethodStep } from '@/components/molecules';
import { LightSection } from '@/components/templates';
import { useIsMobile, useScrollEffect } from '@/hooks';
import { clamp01 } from '@/lib/math';
import { METHOD, METHOD_STEPS } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Method.module.css';

/** The track draws as it passes through the viewport's mid-band. */
const DRAW_LINE = 0.62;
const DRAW_SPAN = 0.75;

/**
 * "Every build runs a disciplined method." (spec §10 [v2]).
 *
 * The accent fill draws along the track — left→right on desktop, top→bottom on
 * mobile — and the nodes ignite in sequence as it passes them. That
 * state-gradient IS the sense of progression.
 */
export function Method() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const [litCount, setLitCount] = useState(0);
  const isMobile = useIsMobile();

  useScrollEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    const rect = track.getBoundingClientRect();
    if (rect.height === 0) return;

    const progress = clamp01(
      (window.innerHeight * DRAW_LINE - rect.top) / (rect.height * DRAW_SPAN),
    );
    const percent = `${(progress * 100).toFixed(2)}%`;

    // Clear the axis that is not in play, so no stale inline value survives a
    // breakpoint change.
    if (isMobile) {
      fill.style.width = '';
      fill.style.height = percent;
    } else {
      fill.style.height = '';
      fill.style.width = percent;
    }

    setLitCount(Math.round(progress * METHOD_STEPS.length));
  });

  return (
    <LightSection
      id={SECTION_IDS.method}
      index={SECTION_INDEX.method}
      labelledBy="method-heading"
    >
      <SectionHeading id="method-heading" variant="content">
        {METHOD.heading}
      </SectionHeading>

      <div ref={trackRef} className={styles.track}>
        <div className={styles.line} aria-hidden="true" />
        <div ref={fillRef} className={styles.fill} aria-hidden="true" />

        <ol className={styles.steps}>
          {METHOD_STEPS.map((step, index) => (
            <MethodStep
              key={step.numeral}
              step={step}
              lit={index < litCount}
              current={index === litCount - 1}
            />
          ))}
        </ol>
      </div>

      <Lead variant="content" className={styles.sub}>
        {METHOD.sub}
      </Lead>
    </LightSection>
  );
}
