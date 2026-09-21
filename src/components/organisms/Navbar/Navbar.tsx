import { Button } from '@/components/atoms';
import { useActiveSection, useScrolledPast } from '@/hooks';
import { cx } from '@/lib/cx';
import { BRAND, NAV_CTA, NAV_LINKS, TRACKED_SECTIONS } from '@/content/site';
import styles from './Navbar.module.css';

export interface NavbarProps {
  readonly menuOpen: boolean;
  readonly onToggleMenu: () => void;
  readonly onLogoClick: () => void;
}

/** Fixed top navigation (spec §2). */
export function Navbar({ menuOpen, onToggleMenu, onLogoClick }: NavbarProps) {
  const scrolled = useScrolledPast(60);
  const activeSection = useActiveSection(TRACKED_SECTIONS);

  return (
    <nav className={cx(styles.nav, scrolled && styles.scrolled)} aria-label="Primary">
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} onClick={onLogoClick}>
          {BRAND.monogram}
        </a>

        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cx(styles.link, activeSection === link.href.slice(1) && styles.active)}
              aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
          <Button href={NAV_CTA.href}>{NAV_CTA.label}</Button>
        </div>

        <button
          type="button"
          className={cx(styles.hamburger, menuOpen && styles.open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={onToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
