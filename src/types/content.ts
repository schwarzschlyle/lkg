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

/**
 * One card in a themed grid. Shared by "What I Do Differently" (§6) and the
 * Solutions grid, which are the same object with different content.
 */
export interface FeatureCardItem {
  readonly id: string;
  readonly numeral: string;
  readonly title: string;
  readonly body: string;
  readonly viz: VizKey;
  /** Optional outcome pill, e.g. "hours back / week". Solutions only. */
  readonly tag?: string;
}

/** Keys into the themed mini-diagrams in `FeatureCard/vizzes.tsx`. */
export type VizKey =
  // What I Do Differently
  | 'selfHeal'
  | 'phaseFill'
  | 'guardrail'
  | 'handoff'
  // Solutions
  | 'automate'
  | 'connect'
  | 'dashboard'
  | 'selfServe'
  | 'assistant'
  | 'prove';

/**
 * One of the two kinds of work on offer. The page serves two buyers, an
 * operator with a business that runs on manual work and a founder with a
 * product idea, and the tracks are what let each recognise themselves
 * without the copy going vague to cover both.
 */
export interface SolutionTrack {
  readonly id: string;
  /** Mono label, e.g. "INTERNAL SYSTEMS". */
  readonly label: string;
  /** One line saying who this track is for. */
  readonly qualifier: string;
  /**
   * How the track pays for itself, in two or three words. Deliberately not
   * symmetrical in certainty: internal systems remove a cost that already
   * exists, while a product has to land first. The page says so rather than
   * flattening both into "makes you money".
   */
  readonly returns: string;
  readonly cards: readonly FeatureCardItem[];
}

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

/** One row in the "Before you book" grid: the objection, and the answer. */
export interface QuestionItem {
  readonly id: string;
  readonly index: string;
  readonly question: string;
  readonly answer: string;
}

export interface SectionIndexEntry {
  readonly numeral: string;
  readonly label: string;
}
