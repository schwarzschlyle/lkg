import { useEffect, useState } from 'react';
import { AccentText, Lead, Reveal, SectionHeading } from '@/components/atoms';
import { Section } from '@/components/templates';
import { usePrefersReducedMotion, useReveal } from '@/hooks';
import { cx } from '@/lib/cx';
import { STAGGER_MS } from '@/lib/motion';
import { PROBLEM } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Problem.module.css';

const GLITCH_DURATION_MS = 600;

/** The emotional beat (spec §5): the demo works, then reality arrives. */
export function Problem() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.5 });
  const [glitching, setGlitching] = useState(false);

  // The glitch runs ONCE as the section enters view, then everything
  // snaps back crisp — it never loops.
  useEffect(() => {
    if (!revealed || reducedMotion) return;
    setGlitching(true);
    const timer = window.setTimeout(() => {
      setGlitching(false);
    }, GLITCH_DURATION_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [revealed, reducedMotion]);

  return (
    <Section
      id={SECTION_IDS.problem}
      index={SECTION_INDEX.problem}
      className={styles.section}
      labelledBy="problem-heading"
      sectionRef={ref}
    >
      {/* The heading glitches in rather than revealing — see SectionHeading. */}
      <SectionHeading
        id="problem-heading"
        reveal={false}
        className={cx(styles.heading, glitching && styles.glitching)}
      >
        {PROBLEM.heading}
      </SectionHeading>

      <Lead reveal={false} className={styles.lead}>
        {PROBLEM.lead}
      </Lead>

      <ul className={styles.list}>
        {PROBLEM.failures.map((failure, index) => (
          <Reveal as="li" key={failure} className={styles.item} delay={index * STAGGER_MS}>
            {failure}
          </Reveal>
        ))}
      </ul>

      <Reveal className={styles.resolve}>
        <AccentText segments={PROBLEM.resolve} />
      </Reveal>
    </Section>
  );
}
