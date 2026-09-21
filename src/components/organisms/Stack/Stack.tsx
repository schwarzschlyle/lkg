import { SectionHeading } from '@/components/atoms';
import { StackGroup } from '@/components/molecules';
import { Section } from '@/components/templates';
import { STAGGER_MS } from '@/lib/motion';
import { STACK_GROUPS, STACK_HEADING } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Stack.module.css';

/** The toolkit (spec §11). */
export function Stack() {
  return (
    <Section
      id={SECTION_IDS.stack}
      index={SECTION_INDEX.stack}
      className={styles.section}
      labelledBy="stack-heading"
      backdrop={
        <div className={styles.word} aria-hidden="true">
          STACK
        </div>
      }
    >
      <SectionHeading id="stack-heading" variant="content" compact>
        {STACK_HEADING}
      </SectionHeading>

      <div className={styles.grid}>
        {STACK_GROUPS.map((group, index) => (
          <StackGroup key={group.category} group={group} delay={index * STAGGER_MS} />
        ))}
      </div>
    </Section>
  );
}
