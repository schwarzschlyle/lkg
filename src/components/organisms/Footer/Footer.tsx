import { BRAND } from '@/content/site';
import { FOOTER } from '@/content/sections';
import styles from './Footer.module.css';

/** Spec §14 — quiet. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div className={styles.brand}>
            {BRAND.monogram}
            <span className={styles.separator}> · </span>
            <span className={styles.copyright}>{FOOTER.copyright}</span>
          </div>

          <div className={styles.links}>
            <a href={`mailto:${BRAND.email}`}>{FOOTER.links.email}</a>
            <a href={BRAND.linkedin} target="_blank" rel="noreferrer noopener">
              {FOOTER.links.linkedin}
            </a>
          </div>
        </div>

        <div className={styles.note}>{FOOTER.note}</div>
      </div>
    </footer>
  );
}
