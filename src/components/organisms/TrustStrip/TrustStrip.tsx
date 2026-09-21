import { Fragment } from 'react';
import { Reveal } from '@/components/atoms';
import { TRUST_ITEMS } from '@/content/sections';
import styles from './TrustStrip.module.css';

/** Four proof phrases separated by an accent dot (spec §4). */
export function TrustStrip() {
  return (
    <div className={styles.strip}>
      <div className={styles.inner}>
        {TRUST_ITEMS.map((item, index) => (
          <Fragment key={item}>
            {index > 0 ? (
              <span className={styles.separator} aria-hidden="true">
                ·
              </span>
            ) : null}
            <Reveal as="span" className={styles.item}>
              {item}
            </Reveal>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
