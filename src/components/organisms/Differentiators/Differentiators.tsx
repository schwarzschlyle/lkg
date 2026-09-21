import { SectionHeading } from '@/components/atoms';
import { DifferentiatorCard } from '@/components/molecules';
import { LightSection } from '@/components/templates';
import { STAGGER_MS } from '@/lib/motion';
import { DIFFERENTIATORS, DIFFERENTIATORS_HEADING } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Differentiators.module.css';

/**
 * "Not another dev. An engineer." (spec §6 [v2]).
 *
 * The first light section — after the dark Problem's chaos, flipping to warm
 * bone reads as relief and daylight (spec §1.1a).
 */
export function Differentiators() {
  return (
    <LightSection
      id={SECTION_IDS.diff}
      index={SECTION_INDEX.diff}
      labelledBy="diff-heading"
    >
      <SectionHeading id="diff-heading" variant="content">
        {DIFFERENTIATORS_HEADING}
      </SectionHeading>

      <div className={styles.grid}>
        {DIFFERENTIATORS.map((item, index) => (
          <DifferentiatorCard key={item.id} item={item} delay={index * STAGGER_MS} />
        ))}
      </div>
    </LightSection>
  );
}
