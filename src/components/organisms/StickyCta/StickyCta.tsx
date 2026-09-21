import { useState } from 'react';
import { Button } from '@/components/atoms';
import { useScrollEffect } from '@/hooks';
import { cx } from '@/lib/cx';
import { NAV_CTA, SECTION_IDS } from '@/content/site';
import styles from './StickyCta.module.css';

export interface StickyCtaProps {
  /** Hidden while the mobile menu is open. */
  readonly suppressed: boolean;
}

/** Mobile-only sticky booking CTA (spec §15). */
export function StickyCta({ suppressed }: StickyCtaProps) {
  const [atContact, setAtContact] = useState(false);

  useScrollEffect(() => {
    const contact = document.getElementById(SECTION_IDS.contact);
    if (!contact) return;
    const rect = contact.getBoundingClientRect();
    setAtContact(rect.top < window.innerHeight && rect.bottom > 0);
  });

  return (
    <div className={cx(styles.sticky, (suppressed || atContact) && styles.hidden)}>
      <Button href={NAV_CTA.href} variant="solid" fullWidth>
        {NAV_CTA.label}
      </Button>
    </div>
  );
}
