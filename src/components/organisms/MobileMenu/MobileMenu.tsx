import { useEffect } from 'react';
import { useBodyScrollLock, useIsMobile } from '@/hooks';
import { cx } from '@/lib/cx';
import { MOBILE_MENU_LINKS, NAV_CTA } from '@/content/site';
import styles from './MobileMenu.module.css';

/** Spec §2: items reveal with a stagger when the panel opens. */
const STAGGER_MS = 45;
const STAGGER_OFFSET_MS = 80;

export interface MobileMenuProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

/**
 * The mobile section jump-menu (spec §2).
 *
 * Closes on link tap, on Escape, and automatically when the viewport is
 * resized back to desktop. Page scroll is locked while it is open.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const isMobile = useIsMobile();

  useBodyScrollLock(open);

  // Close if the viewport grows back to desktop while the panel is open.
  useEffect(() => {
    if (open && !isMobile) onClose();
  }, [open, isMobile, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={cx(styles.menu, open && styles.open)}
      // Hidden from assistive tech and from tab order while closed.
      inert={!open}
      aria-label="Sections"
    >
      {MOBILE_MENU_LINKS.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          className={styles.link}
          style={{ transitionDelay: `${(index * STAGGER_MS + STAGGER_OFFSET_MS).toString()}ms` }}
          onClick={onClose}
        >
          <span className={styles.index}>{link.index}</span>
          {link.label}
        </a>
      ))}
      <a
        href={NAV_CTA.href}
        className={cx(styles.link, styles.cta)}
        style={{
          transitionDelay: `${(MOBILE_MENU_LINKS.length * STAGGER_MS + STAGGER_OFFSET_MS).toString()}ms`,
        }}
        onClick={onClose}
      >
        {NAV_CTA.label}
      </a>
    </div>
  );
}
