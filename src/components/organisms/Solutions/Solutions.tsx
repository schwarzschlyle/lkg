import { Eyebrow, Lead, Reveal, SectionHeading } from '@/components/atoms';
import { FeatureCard } from '@/components/molecules';
import { LightSection } from '@/components/templates';
import { STAGGER_MS } from '@/lib/motion';
import { SOLUTIONS, SOLUTION_TRACKS } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Solutions.module.css';

/**
 * "Two problems. The same engineering underneath."
 *
 * The page sells to two buyers: an operator whose business runs on manual
 * work, and a founder with a product idea. Blending them produces copy vague
 * enough to speak to neither, so the section forks instead: two labelled
 * tracks, three cards each, and one closing line that hands both of them to
 * the Problem section.
 *
 * Reuses `FeatureCard` wholesale, so these and the differentiator cards share
 * the tilt, the spotlight, the gradient border and the diagram animations.
 */
export function Solutions() {
  return (
    <LightSection
      id={SECTION_IDS.solutions}
      index={SECTION_INDEX.solutions}
      labelledBy="solutions-heading"
    >
      <Eyebrow variant="content">{SOLUTIONS.eyebrow}</Eyebrow>
      <SectionHeading id="solutions-heading" variant="content">
        {SOLUTIONS.heading}
      </SectionHeading>
      <Lead variant="content" className={styles.lead}>
        {SOLUTIONS.lead}
      </Lead>

      {SOLUTION_TRACKS.map((track) => (
        <div key={track.id} className={styles.track}>
          <Reveal className={styles.trackHead}>
            <span className={styles.trackLabel}>{track.label}</span>
            <span className={styles.trackQualifier}>{track.qualifier}</span>
          </Reveal>

          <div className={styles.grid}>
            {track.cards.map((item, index) => (
              <FeatureCard key={item.id} item={item} delay={index * STAGGER_MS} />
            ))}
          </div>
        </div>
      ))}

      <Reveal className={styles.close}>{SOLUTIONS.close}</Reveal>
    </LightSection>
  );
}
