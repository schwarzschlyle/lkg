import { Chip, Eyebrow, GlowOrb, Reveal, SectionHeading } from '@/components/atoms';
import { QuestionRow } from '@/components/molecules';
import { Section } from '@/components/templates';
import { STAGGER_MS } from '@/lib/motion';
import { QUESTIONS, QUESTION_ITEMS, SHIPPED_WITH } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Questions.module.css';

/**
 * "Before you book."
 *
 * The last section before the ask, and the only one on the page carrying any
 * track record. Everything above it argues method; this answers the questions
 * a visitor has not said out loud, which is what actually stands between them
 * and the booking.
 *
 * Replaced the toolkit, which was 33 tool names making no argument: noise to
 * the operator the page had just told not to worry about technology, and a
 * checklist anyone could write to the technical reader. Those names survive
 * as one line beneath the questions.
 */
export function Questions() {
  return (
    <Section
      id={SECTION_IDS.faq}
      index={SECTION_INDEX.faq}
      className={styles.section}
      labelledBy="questions-heading"
      backdrop={<GlowOrb size={480} right="-4%" top="16%" />}
    >
      <Eyebrow variant="content">{QUESTIONS.eyebrow}</Eyebrow>
      <SectionHeading id="questions-heading" variant="content">
        {QUESTIONS.heading}
      </SectionHeading>

      <div className={styles.grid}>
        {QUESTION_ITEMS.map((item, index) => (
          <QuestionRow key={item.id} item={item} delay={index * STAGGER_MS} />
        ))}
      </div>

      <Reveal className={styles.shipped}>
        <span className={styles.shippedLabel}>{SHIPPED_WITH.label}</span>
        {SHIPPED_WITH.items.map((name) => (
          <Chip key={name} label={name} />
        ))}
      </Reveal>
    </Section>
  );
}
