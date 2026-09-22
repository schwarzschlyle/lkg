import { useCallback, useState } from 'react';
import { CustomCursor, ScrollProgressBar } from '@/components/atoms';
import {
  Contact,
  Deliverable,
  Depth,
  Differentiators,
  Footer,
  Hero,
  Method,
  MobileMenu,
  Navbar,
  Phasing,
  Problem,
  Solutions,
  Questions,
  StickyCta,
  TrustStrip,
} from '@/components/organisms';
import { SECTION_IDS } from '@/content/site';

/**
 * Section order follows the energy map in spec §1.5 — loud and quiet
 * alternating so nothing competes, and dark/light alternating for rhythm:
 *
 *   Hero ★ · Trust · [LIGHT] Solutions · Problem ★ · [LIGHT] What I do ·
 *   Depth ★★ · [LIGHT] Deliverable · Phasing ★★ · [LIGHT] Method ·
 *   Before you book · Contact · Footer
 *
 * Solutions is the persuasion layer: it sells the CATEGORY before the page
 * sells the builder, so a visitor who has never considered custom software
 * has somewhere to start.
 */
export function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  return (
    <>
      <a className="skip-link" href={`#${SECTION_IDS.problem}`}>
        Skip to content
      </a>

      <CustomCursor />
      <ScrollProgressBar />

      <Navbar menuOpen={menuOpen} onToggleMenu={toggleMenu} onLogoClick={closeMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      <main>
        <Hero />
        <TrustStrip />
        <Solutions />
        <Problem />
        <Differentiators />
        <Depth />
        <Deliverable />
        <Phasing />
        <Method />
        <Questions />
        <Contact />
      </main>

      <Footer />
      <StickyCta suppressed={menuOpen} />
    </>
  );
}
