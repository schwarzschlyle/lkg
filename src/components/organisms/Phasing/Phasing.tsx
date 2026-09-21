import { useCallback, useRef, useState } from 'react';
import { SectionHeading } from '@/components/atoms';
import { PhaseStation } from '@/components/molecules';
import { Section } from '@/components/templates';
import { useScrollEffect } from '@/hooks';
import { clamp01 } from '@/lib/math';
import { PHASES, PHASING } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Phasing.module.css';

/** A station ignites once it passes this point up the viewport. */
const IGNITE_LINE = 0.6;

/**
 * "A path that protects your budget." (spec §9).
 *
 * The strongest mobile moment: the rail draws top-to-bottom in a single
 * column and the stations ignite in turn as the accent fill reaches them.
 */
export function Phasing() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [litCount, setLitCount] = useState(0);

  const setStationRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      stationRefs.current[index] = node;
    },
    [],
  );

  useScrollEffect(() => {
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;

    const rect = rail.getBoundingClientRect();
    if (rect.height === 0) return;

    const progress = clamp01((window.innerHeight * IGNITE_LINE - rect.top) / rect.height);
    fill.style.height = `${(progress * 100).toFixed(2)}%`;

    // A station ignites as the fill reaches it.
    let lit = 0;
    for (const station of stationRefs.current) {
      if (!station) continue;
      if (station.getBoundingClientRect().top < window.innerHeight * IGNITE_LINE) lit += 1;
    }
    setLitCount(lit);
  });

  return (
    <Section
      id={SECTION_IDS.phasing}
      index={SECTION_INDEX.phasing}
      className={styles.section}
      labelledBy="phasing-heading"
    >
      <SectionHeading id="phasing-heading" className={styles.heading}>
        {PHASING.heading}
      </SectionHeading>

      <div ref={railRef} className={styles.rail}>
        <div className={styles.track} aria-hidden="true" />
        <div ref={fillRef} className={styles.fill} aria-hidden="true" />

        {PHASES.map((phase, index) => (
          <PhaseStation
            key={phase.numeral}
            phase={phase}
            lit={index < litCount}
            stationRef={setStationRef(index)}
          />
        ))}
      </div>

      <p className={styles.close}>{PHASING.close}</p>
    </Section>
  );
}
