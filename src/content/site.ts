import type { MobileMenuLink, NavLink, SectionIndexEntry } from '@/types/content';

/** Canonical section ids. Used for anchors, nav highlighting and the index. */
export const SECTION_IDS = {
  hero: 'hero',
  solutions: 'solutions',
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
  { label: 'Solutions', href: '#solutions' },
  { label: 'Approach', href: '#problem' },
  { label: 'Method', href: '#method' },
];

export const NAV_CTA = { label: 'Book a call', href: '#contact' } as const;

/** Mobile jump-menu — numbered links to every section (spec §2). */
export const MOBILE_MENU_LINKS: readonly MobileMenuLink[] = [
  { index: '01', label: 'Solutions', href: '#solutions' },
  { index: '02', label: 'Approach', href: '#problem' },
  { index: '03', label: 'What I do', href: '#diff' },
  { index: '04', label: 'Depth', href: '#depth' },
  { index: '05', label: 'Deliverable', href: '#deliver' },
  { index: '06', label: 'Phasing', href: '#phasing' },
  { index: '07', label: 'Method', href: '#method' },
  { index: '08', label: 'Toolkit', href: '#stack' },
];

/** Editorial index shown in each section's right-side void, ≥1000px (spec §1.1d B). */
export const SECTION_INDEX: Readonly<Record<string, SectionIndexEntry>> = {
  solutions: { numeral: '01', label: 'SOLUTIONS' },
  problem: { numeral: '02', label: 'APPROACH' },
  diff: { numeral: '03', label: 'WHAT I DO' },
  depth: { numeral: '04', label: 'DEPTH' },
  deliver: { numeral: '05', label: 'DELIVERABLE' },
  phasing: { numeral: '06', label: 'PHASING' },
  method: { numeral: '07', label: 'METHOD' },
  stack: { numeral: '08', label: 'TOOLKIT' },
  contact: { numeral: '09', label: 'CONTACT' },
};

/** Sections the nav highlight tracks, in document order (spec §1.1d E). */
export const TRACKED_SECTIONS: readonly string[] = [
  'solutions',
  'problem',
  'diff',
  'depth',
  'deliver',
  'phasing',
  'method',
  'stack',
  'contact',
];
