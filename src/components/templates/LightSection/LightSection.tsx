import { SeamHairline } from '@/components/molecules/SeamHairline/SeamHairline';
import { cx } from '@/lib/cx';
import { LIGHT_SECTION_CLASS } from '@/lib/theme';
import { Section } from '../Section/Section';
import type { SectionProps } from '../Section/Section';
import styles from './LightSection.module.css';

export type LightSectionProps = SectionProps;

/**
 * A warm-bone light section (spec §1.1a) — clarity and trust, against the
 * dark sections' drama.
 *
 * Adding `section--light` re-declares every design token inside this subtree,
 * so descendants automatically pick up warm neutrals and the terracotta
 * accent without any component knowing which mode it is rendering in.
 */
export function LightSection({ className, ...props }: LightSectionProps) {
  return (
    <div className={styles.wrapper}>
      <Section {...props} className={cx(LIGHT_SECTION_CLASS, className)} />
      <SeamHairline position="top" />
      <SeamHairline position="bottom" />
    </div>
  );
}
