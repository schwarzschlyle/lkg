import styles from './ScrollCue.module.css';

/** Looping scroll hint at the bottom of the hero. */
export function ScrollCue() {
  return <div className={styles.cue} aria-hidden="true" />;
}
