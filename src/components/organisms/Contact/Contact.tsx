import { useCallback, useId, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import Cal from '@calcom/embed-react';
import { Button, Lead, SectionHeading } from '@/components/atoms';
import { FormField } from '@/components/molecules';
import { Section } from '@/components/templates';
import { useRevealBindings } from '@/hooks';
import { cx } from '@/lib/cx';
import { CONTACT } from '@/content/sections';
import { BRAND, SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Contact.module.css';

/** Spec §13: Cal.com (or Calendly) inline, plus a no-backend fallback form. */
const BOOKING_URL = import.meta.env.VITE_BOOKING_URL;
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

/**
 * Cal's embed wants a "<user>/<event>" link, not a full URL, so it is derived
 * from the one env var rather than asking for the same thing twice. A
 * non-Cal scheduler returns null and falls back to a plain iframe below.
 */
function toCalLink(raw: string | undefined): string | null {
  if (raw === undefined || raw === '') return null;
  try {
    const url = new URL(raw);
    if (!url.hostname.endsWith('cal.com')) return null;
    const path = url.pathname.replace(/^\/+|\/+$/g, '');
    return path === '' ? null : path;
  } catch {
    return null;
  }
}

const CAL_LINK = toCalLink(BOOKING_URL);
const hasScheduler = BOOKING_URL !== undefined && BOOKING_URL !== '';
const hasFormEndpoint = FORM_ENDPOINT !== undefined && FORM_ENDPOINT !== '';

const TABS = [
  { id: 'book', label: CONTACT.tabs.book },
  { id: 'write', label: CONTACT.tabs.write },
] as const;

type ContactTab = (typeof TABS)[number]['id'];
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/** "Let's find out if it's viable." (spec §13). */
export function Contact() {
  const baseId = useId();
  const reveal = useRevealBindings();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [tab, setTab] = useState<ContactTab>(hasScheduler ? 'book' : 'write');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  /**
   * Submitted over fetch rather than as a native POST. A native post navigates
   * the visitor away to Formspree's own thank-you page, which is the last
   * thing this page should do at its conversion moment.
   *
   * `Accept: application/json` is what makes Formspree answer with JSON
   * instead of issuing that redirect.
   */
  const submit = useCallback(async (form: HTMLFormElement): Promise<void> => {
    setSubmitState('submitting');
    try {
      const response = await fetch(FORM_ENDPOINT ?? '', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSubmitState('success');
        form.reset();
      } else {
        setSubmitState('error');
      }
    } catch {
      // Offline, blocked, or DNS failure. Same message either way.
      setSubmitState('error');
    }
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      // Captured before the await: React clears currentTarget once the
      // handler returns.
      const form = event.currentTarget;
      if (!hasFormEndpoint || submitState === 'submitting') return;
      void submit(form);
    },
    [submit, submitState],
  );

  // Arrow keys move between tabs and carry focus with them, which is what a
  // tablist is expected to do.
  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>): void => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const current = TABS.findIndex((entry) => entry.id === tab);
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const next = TABS[(current + step + TABS.length) % TABS.length];
      if (!next) return;
      setTab(next.id);
      tabRefs.current[TABS.indexOf(next)]?.focus();
    },
    [tab],
  );

  const scheduler =
    CAL_LINK !== null ? (
      // Cal sizes its own iframe to content as the user moves between the
      // calendar, the time list and the booking questions. A fixed height
      // cannot fit all three, which is what caused the stray scrollbar.
      <Cal
        className={styles.calPanel}
        calLink={CAL_LINK}
        config={{ layout: 'month_view', theme: 'dark' }}
      />
    ) : (
      <iframe
        className={styles.schedulerFrame}
        src={BOOKING_URL}
        title="Book a free 20-minute project consult"
        loading="lazy"
      />
    );

  const form =
    submitState === 'success' ? (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>{CONTACT.successTitle}</p>
        <p className={styles.successBody}>{CONTACT.successBody}</p>
      </div>
    ) : (
      <div className={styles.formPanel}>
        <form
          action={FORM_ENDPOINT}
          method="post"
          onSubmit={handleSubmit}
          aria-busy={submitState === 'submitting'}
        >
          {/* Formspree discards any submission where `_gotcha` is filled. */}
          <input
            type="text"
            name="_gotcha"
            className={styles.honeypot}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <input type="hidden" name="_subject" value={CONTACT.subject} />

          <FormField
            name={CONTACT.fields.project.name}
            label={CONTACT.fields.project.label}
            placeholder={CONTACT.fields.project.placeholder}
            required
          />
          <FormField
            name={CONTACT.fields.email.name}
            label={CONTACT.fields.email.label}
            placeholder={CONTACT.fields.email.placeholder}
            type="email"
            required
          />
          <FormField
            name={CONTACT.fields.details.name}
            label={CONTACT.fields.details.label}
            placeholder={CONTACT.fields.details.placeholder}
            multiline
          />

          <Button
            type="submit"
            variant="solid"
            magnetic
            fullWidth
            disabled={submitState === 'submitting'}
          >
            {submitState === 'submitting' ? CONTACT.submittingLabel : CONTACT.submitLabel}
          </Button>
        </form>

        <p className={styles.status} role="status" aria-live="polite">
          {submitState === 'error' ? (
            <span className={styles.statusError}>{CONTACT.errorBody}</span>
          ) : null}
        </p>
      </div>
    );

  return (
    <Section
      id={SECTION_IDS.contact}
      index={SECTION_INDEX.contact}
      className={styles.section}
      labelledBy="contact-heading"
    >
      <SectionHeading id="contact-heading" className={styles.heading}>
        {CONTACT.heading}
      </SectionHeading>
      <Lead className={styles.lead}>{CONTACT.lead}</Lead>

      <div
        ref={reveal.ref}
        className={cx(reveal.className, styles.booking, hasScheduler && styles.bookingWide)}
      >
        {hasScheduler ? (
          <div className={styles.tabs} role="tablist" aria-label={CONTACT.tabsLabel}>
            {TABS.map((entry, index) => (
              <button
                key={entry.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${entry.id}`}
                aria-selected={tab === entry.id}
                aria-controls={`${baseId}-panel-${entry.id}`}
                tabIndex={tab === entry.id ? 0 : -1}
                className={cx(styles.tab, tab === entry.id && styles.tabActive)}
                onClick={() => {
                  setTab(entry.id);
                }}
                onKeyDown={handleTabKeyDown}
              >
                {entry.label}
              </button>
            ))}
          </div>
        ) : null}

        <div
          className={styles.panel}
          role={hasScheduler ? 'tabpanel' : undefined}
          id={hasScheduler ? `${baseId}-panel-${tab}` : undefined}
          aria-labelledby={hasScheduler ? `${baseId}-tab-${tab}` : undefined}
          tabIndex={hasScheduler ? 0 : undefined}
        >
          {/* Mounted only while its tab is active: the scheduler must not load
              a third-party app for someone who only wants the form, and Cal
              cannot measure itself inside a hidden panel. */}
          {!hasScheduler ? (
            <>
              <div className={styles.schedulerNote}>{CONTACT.schedulerPlaceholder}</div>
              {form}
            </>
          ) : tab === 'book' ? (
            scheduler
          ) : (
            form
          )}
        </div>

        <div className={styles.links}>
          {CONTACT.emailPrefix}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> ·{' '}
          <a href={BRAND.linkedin} target="_blank" rel="noreferrer noopener">
            {CONTACT.linkedinLabel}
          </a>
        </div>
      </div>
    </Section>
  );
}
