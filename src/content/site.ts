import type { MobileMenuLink, NavLink, SectionIndexEntry } from '@/types/content';

/** Canonical section ids. Used for anchors, nav highlighting and the index. */
export const SECTION_IDS = {
  hero: 'hero',
  problem: 'problem',
  diff: 'diff',
  depth: 'depth',
  deliver: 'deliver',
  phasing: 'phasing',
  method: 'method',
  stack: 'stack',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const BRAND = {
  monogram: 'LKG',
  name: 'Lyle Kenneth Geraldez',
  role: 'Full-Stack AI Systems Engineer',
  email: 'lylekeng@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lyle-kenneth/',
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Approach', href: '#problem' },
  { label: 'Method', href: '#method' },
];

export const NAV_CTA = { label: 'Book a call', href: '#contact' } as const;

/** Mobile jump-menu — numbered links to every section (spec §2). */
export const MOBILE_MENU_LINKS: readonly MobileMenuLink[] = [
  { index: '01', label: 'Approach', href: '#problem' },
  { index: '02', label: 'What I do', href: '#diff' },
  { index: '03', label: 'Depth', href: '#depth' },
  { index: '04', label: 'Deliverable', href: '#deliver' },
  { index: '05', label: 'Phasing', href: '#phasing' },
  { index: '06', label: 'Method', href: '#method' },
  { index: '07', label: 'Toolkit', href: '#stack' },
];

/** Editorial index shown in each section's right-side void, ≥1000px (spec §1.1d B). */
export const SECTION_INDEX: Readonly<Record<string, SectionIndexEntry>> = {
  problem: { numeral: '01', label: 'APPROACH' },
  diff: { numeral: '02', label: 'WHAT I DO' },
  depth: { numeral: '03', label: 'DEPTH' },
  deliver: { numeral: '04', label: 'DELIVERABLE' },
  phasing: { numeral: '05', label: 'PHASING' },
  method: { numeral: '06', label: 'METHOD' },
  stack: { numeral: '07', label: 'TOOLKIT' },
  contact: { numeral: '08', label: 'CONTACT' },
};

/** Sections the nav highlight tracks, in document order (spec §1.1d E). */
export const TRACKED_SECTIONS: readonly string[] = [
  'problem',
  'diff',
  'depth',
  'deliver',
  'phasing',
  'method',
  'stack',
  'contact',
];
