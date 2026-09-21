import { useCallback, useRef, useState } from 'react';
import { AccentText, GlowOrb, Lead, Reveal, SectionHeading } from '@/components/atoms';
import { ThemeRow } from '@/components/molecules';
import { Section } from '@/components/templates';
import {
  useIsMobile,
  useParticleField,
  usePrefersReducedMotion,
  useScrollEffect,
} from '@/hooks';
import { toggleClass } from '@/lib/dom';
import { DEPTH, DEPTH_THEMES } from '@/content/sections';
import { SECTION_IDS, SECTION_INDEX } from '@/content/site';
import styles from './Depth.module.css';

/** Viewport bands that decide which themes are lit (spec §7). */
const DESKTOP_BAND_TOP = 0.66;
const DESKTOP_BAND_BOTTOM = 0.25;
const DESKTOP_SECTION_GATE = 0.6;
/** Mobile: the active theme is the one nearest this point down the viewport. */
const MOBILE_FOCUS = 0.42;
const MOBILE_IN_VIEW_TOP = 0.85;
const MOBILE_IN_VIEW_BOTTOM = 0.15;

/** Offset from a rail dot's top-left to its centre, where the connector starts. */
const DOT_CENTRE = 4;

/**
 * "I build the whole system — not just the screen." (spec §7 [v2]).
 *
 * Desktop: themes light through a scrolling band, a vertical progress rail
 * fills behind them, and a curved connector runs from the active theme's rail
 * dot to a specific region of the organism, which brightens in response.
 *
 * Mobile: the connector is removed entirely (spec §15) — in a stacked layout it
 * would be a stray diagonal slicing through the text. Exactly one theme is
 * active instead, and its inline region chip carries the same meaning.
 */
export function Depth() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /** Read fresh by the canvas loop each frame — changing it never re-renders. */
  const highlightRef = useRef<readonly [number, number] | null>(null);

  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const [litCount, setLitCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  const organismRef = useParticleField({
    nodeCount: 60,
    linkDistance: 120,
    highlightRef,
    still: reducedMotion,
  });

  const setRowRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      rowRefs.current[index] = node;
    },
    [],
  );

  const setDotRef = useCallback(
    (index: number) => (node: HTMLSpanElement | null) => {
      dotRefs.current[index] = node;
    },
    [],
  );

  useScrollEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const hideConnector = (): void => {
      toggleClass(pathRef.current, styles.visible, false);
      toggleClass(ringRef.current, styles.visible, false);
    };

    const setRailFill = (fraction: number): void => {
      const fill = railFillRef.current;
      if (fill) fill.style.height = `${(fraction * 100).toFixed(2)}%`;
    };

    if (isMobile) {
      // Exactly one active theme: the one nearest the viewport focus point.
      let best = -1;
      let bestDistance = Number.POSITIVE_INFINITY;

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const centre = rect.top + rect.height / 2;
        const distance = Math.abs(centre - window.innerHeight * MOBILE_FOCUS);
        const inView =
          rect.top < window.innerHeight * MOBILE_IN_VIEW_TOP &&
          rect.bottom > window.innerHeight * MOBILE_IN_VIEW_BOTTOM;
        if (inView && distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });

      setActiveIndex(best);
      setLitCount(best >= 0 ? best + 1 : 0);
      setRailFill(best >= 0 ? (best + 1) / DEPTH_THEMES.length : 0);
      hideConnector();
      // The organism stays a calm backdrop on mobile — no region highlight.
      highlightRef.current = null;
      return;
    }

    // Desktop: themes light through the active band as it scrolls past.
    const sectionRect = section.getBoundingClientRect();
    let lit = 0;
    let active = -1;

    rowRefs.current.forEach((row, index) => {
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const on =
        rect.top < window.innerHeight * DESKTOP_BAND_TOP &&
        rect.bottom > window.innerHeight * DESKTOP_BAND_BOTTOM &&
        sectionRect.top < window.innerHeight * DESKTOP_SECTION_GATE;
      if (on) {
        lit = index + 1;
        active = index;
      }
    });

    setLitCount(lit);
    setActiveIndex(active);
    setRailFill(lit / DEPTH_THEMES.length);

    const grid = gridRef.current;
    const organism = organismRef.current;
    const dot = active >= 0 ? dotRefs.current[active] : null;
    const theme = active >= 0 ? DEPTH_THEMES[active] : undefined;

    if (!grid || !organism || !dot || !theme) {
      hideConnector();
      highlightRef.current = null;
      return;
    }

    // Everything is measured against the grid, which is the overlay's own box.
    const gridRect = grid.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();
    const organismRect = organism.getBoundingClientRect();

    const x1 = dotRect.left - gridRect.left + DOT_CENTRE;
    const y1 = dotRect.top - gridRect.top + DOT_CENTRE;
    const [regionX, regionY] = theme.regionPoint;
    const x2 = organismRect.left - gridRect.left + organismRect.width * regionX;
    const y2 = organismRect.top - gridRect.top + organismRect.height * regionY;
    const midX = (x1 + x2) / 2;

    const path = pathRef.current;
    if (path) {
      path.setAttribute(
        'd',
        `M${x1.toFixed(1)} ${y1.toFixed(1)} C ${midX.toFixed(1)} ${y1.toFixed(1)}, ${midX.toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
      );
      toggleClass(path, styles.visible, true);
    }

    const ring = ringRef.current;
    if (ring) {
      ring.setAttribute('cx', x2.toFixed(1));
      ring.setAttribute('cy', y2.toFixed(1));
      toggleClass(ring, styles.visible, true);
    }

    // That region of the organism brightens while the rest dims.
    highlightRef.current = theme.regionPoint;
  });

  return (
    <Section
      id={SECTION_IDS.depth}
      index={SECTION_INDEX.depth}
      className={styles.section}
      labelledBy="depth-heading"
      sectionRef={sectionRef}
      backdrop={<GlowOrb size={520} right="2%" top="8%" />}
    >
      <SectionHeading id="depth-heading" variant="content">
        {DEPTH.heading}
      </SectionHeading>
      <Lead variant="content">{DEPTH.lead}</Lead>

      <div ref={gridRef} className={styles.grid}>
        <canvas ref={organismRef} className={styles.organism} aria-hidden="true" />

        <svg className={styles.connector} aria-hidden="true">
          <path ref={pathRef} className={styles.connectorPath} />
          <circle ref={ringRef} className={styles.connectorRing} r="7" />
        </svg>

        <div className={styles.themes}>
          <div className={styles.rail} aria-hidden="true" />
          <div ref={railFillRef} className={styles.railFill} aria-hidden="true" />

          {DEPTH_THEMES.map((theme, index) => (
            <ThemeRow
              key={theme.id}
              theme={theme}
              lit={isMobile ? index === activeIndex : index < litCount}
              active={index === activeIndex}
              rowRef={setRowRef(index)}
              dotRef={setDotRef(index)}
            />
          ))}
        </div>
      </div>

      <Reveal className={styles.close}>
        <AccentText segments={DEPTH.close} />
      </Reveal>
    </Section>
  );
}
