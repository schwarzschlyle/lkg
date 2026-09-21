import { useCallback, useRef } from 'react';
import { Lead, SectionHeading } from '@/components/atoms';
import { BlueprintDoc } from '@/components/molecules';
import { LightSection } from '@/components/templates';
import { useScrollEffect } from '@/hooks';
import { clamp01 } from '@/lib/math';
import { BLUEPRINT_DOCS, DELIVERABLE } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Deliverable.module.css';

/** Scroll window that drives the fan from stacked (0) to fully open (1). */
const OPEN_START = 0.85;
const OPEN_SPAN = 0.55;

/** Fan geometry (spec §8). */
const SPREAD_RATIO = 0.62;
const CARDS_PER_SIDE = 3;
const DROP_PER_STEP = 10;
const ROTATION_PER_STEP = 4;
const FALLBACK_CARD_WIDTH = 180;

/**
 * "You get a plan, not just a promise." (spec §8 [v2]).
 *
 * As the section passes through the viewport a progress value 0→1 drives the
 * fan opening from a stack to the full arc. The spread is COMPUTED from the
 * container rather than fixed, which is what keeps all seven cards inside the
 * viewport on a phone — a fixed offset overflows and must not be used.
 */
export function Deliverable() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const docRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setDocRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      docRefs.current[index] = node;
    },
    [],
  );

  useScrollEffect(() => {
    const stack = stackRef.current;
    const section = sectionRef.current;
    if (!stack || !section) return;

    const sectionRect = section.getBoundingClientRect();
    const stackRect = stack.getBoundingClientRect();

    const progress = clamp01(
      (window.innerHeight * OPEN_START - sectionRect.top) / (window.innerHeight * OPEN_SPAN),
    );

    const measured = docRefs.current[0]?.offsetWidth ?? 0;
    const cardWidth = measured > 0 ? measured : FALLBACK_CARD_WIDTH;
    // Guarantees the outermost cards stay inside the stack at any width.
    const maxSpread = (stackRect.width - cardWidth) / 2 / CARDS_PER_SIDE;
    const spread = Math.min(cardWidth * SPREAD_RATIO, maxSpread);

    const lastIndex = docRefs.current.length - 1;

    docRefs.current.forEach((doc, index) => {
      if (!doc) return;
      const offset = index - CARDS_PER_SIDE;
      const x = offset * spread * progress;
      const y = Math.abs(offset) * DROP_PER_STEP * progress;
      const rotation = offset * ROTATION_PER_STEP * progress;

      doc.style.transform = `translateX(calc(-50% + ${x.toFixed(1)}px)) translateY(${y.toFixed(1)}px) rotate(${rotation.toFixed(2)}deg)`;
      doc.style.opacity = index === lastIndex ? '1' : (0.25 + 0.75 * progress).toFixed(2);
    });
  });

  return (
    <LightSection
      id={SECTION_IDS.deliver}
      index={SECTION_INDEX.deliver}
      className={styles.section}
      labelledBy="deliver-heading"
      sectionRef={sectionRef}
    >
      <SectionHeading id="deliver-heading">{DELIVERABLE.heading}</SectionHeading>
      <Lead className={styles.lead}>{DELIVERABLE.lead}</Lead>

      <div ref={stackRef} className={styles.stack}>
        {BLUEPRINT_DOCS.map((doc, index) => (
          <BlueprintDoc key={doc.id} label={doc.label} docRef={setDocRef(index)} />
        ))}
        <div className={styles.title}>{DELIVERABLE.stackTitle}</div>
      </div>
    </LightSection>
  );
}
