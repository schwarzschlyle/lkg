/** Shared content shapes. Every string the site renders is typed here and
 *  lives in `src/content/*`, so copy edits never require touching a component. */

/** A run of headline text, optionally rendered in the accent colour. */
export interface TextSegment {
  readonly text: string;
  /** Renders in `--accent-ink` and, in the hero, settles last with a glow. */
  readonly accent?: boolean;
}

export interface NavLink {
  readonly label: string;
  readonly href: `#${string}`;
}

export interface MobileMenuLink extends NavLink {
  readonly index: string;
}

export interface Differentiator {
  readonly id: string;
  readonly numeral: string;
  readonly title: string;
  readonly body: string;
  readonly viz: VizKey;
}

/** Keys into the themed mini-diagrams in `DifferentiatorCard/vizzes.tsx`. */
export type VizKey = 'selfHeal' | 'phaseFill' | 'guardrail' | 'handoff';

export interface DepthTheme {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  /** Mobile-only stand-in for the desktop connector line (spec §15). */
  readonly regionChip: string;
  /** Relative (x, y) target on the organism canvas, 0..1 (spec §7). */
  readonly regionPoint: readonly [number, number];
}

export interface BlueprintLabel {
  readonly id: string;
  readonly label: string;
}

export interface Phase {
  readonly numeral: string;
  readonly title: string;
  readonly body: string;
}

/** Keys into the line-glyphs in `MethodStep/glyphs.tsx`. */
export type GlyphKey =
  | 'understand'
  | 'estimate'
  | 'architect'
  | 'phases'
  | 'harden'
  | 'launch'
  | 'scale';

export interface MethodStep {
  readonly numeral: string;
  readonly label: string;
  readonly description: string;
  readonly glyph: GlyphKey;
}

export interface StackGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export interface SectionIndexEntry {
  readonly numeral: string;
  readonly label: string;
}
