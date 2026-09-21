/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Inline booking scheduler URL (Cal.com / Calendly) — spec §13. */
  readonly VITE_BOOKING_URL?: string;
  /** Formspree / Web3Forms endpoint for the fallback contact form — spec §13. */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
