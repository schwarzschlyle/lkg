import type { ReactNode, Ref } from 'react';
import { SectionIndex } from '@/components/molecules/SectionIndex/SectionIndex';
import { cx } from '@/lib/cx';
import type { SectionIndexEntry } from '@/types/content';
import styles from './Section.module.css';

export interface SectionProps {
  readonly id: string;
  /** Editorial numeral + label for the right-side void, ≥1000px (spec §1.1d B). */
  readonly index?: SectionIndexEntry;
  /** Applied to the `<section>` element. */
  readonly className?: string;
  /** Applied to the inner max-width container. */
  readonly containerClassName?: string;
  /** Rendered outside the container — backdrops, canvases, background words. */
  readonly backdrop?: ReactNode;
  readonly labelledBy?: string;
  /** Ref to the `<section>` itself, for scroll observers. */
  readonly sectionRef?: Ref<HTMLElement>;
  readonly children: ReactNode;
}

/**
 * The page's structural unit: a full-width `<section>` with the shared
 * vertical rhythm and a centred max-width container inside it.
 */
export function Section({
  id,
  index,
  className,
  containerClassName,
  backdrop,
  labelledBy,
  sectionRef,
  children,
}: SectionProps) {
  return (
    <section
      ref={sectionRef}
      id={id}
      className={cx(styles.section, className)}
      aria-labelledby={labelledBy}
    >
      {backdrop}
      {index ? <SectionIndex entry={index} /> : null}
      <div className={cx(styles.wrap, containerClassName)}>{children}</div>
    </section>
  );
}
