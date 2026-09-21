import type { ReactElement } from 'react';
import type { GlyphKey } from '@/types/content';

/**
 * Spec §10 — a unique 1.6px stroke line-glyph per step, so the seven stops read
 * as differentiated and sequential rather than as identical pills.
 * Stroke colour and width come from the step's stylesheet.
 */

const GLYPH_PATHS: Record<GlyphKey, ReactElement> = {
  // Understand — magnifier
  understand: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5 L20 20" />
    </>
  ),
  // Estimate — bar gauge
  estimate: <path d="M4 20 V9 M10 20 V5 M16 20 V12 M22 20 V7" />,
  // Architect — blueprint grid
  architect: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9 H21 M9 9 V21" />
    </>
  ),
  // Build in phases — ascending bars
  phases: (
    <>
      <rect x="4" y="14" width="4" height="6" />
      <rect x="10" y="9" width="4" height="11" />
      <rect x="16" y="5" width="4" height="15" />
    </>
  ),
  // Harden — shield
  harden: <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />,
  // Launch — rocket
  launch: (
    <>
      <path d="M12 3 C15 6 16 10 12 21 C8 10 9 6 12 3 Z" />
      <path d="M8 15 L5 20 M16 15 L19 20" />
    </>
  ),
  // Scale — rising line with arrow
  scale: (
    <>
      <path d="M3 17 L9 11 L13 15 L21 7" />
      <path d="M21 12 V7 H16" />
    </>
  ),
};

export interface GlyphProps {
  readonly name: GlyphKey;
  readonly className?: string;
}

export function Glyph({ name, className }: GlyphProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {GLYPH_PATHS[name]}
    </svg>
  );
}
