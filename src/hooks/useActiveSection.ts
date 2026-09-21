import { useState } from 'react';
import { useScrollEffect } from './useScrollEffect';

/**
 * The section currently crossing the viewport middle (spec §1.1d E).
 * Drives the accent highlight on the desktop nav links.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useScrollEffect(() => {
    const middle = window.innerHeight * 0.5;
    let next: string | null = null;

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      if (rect.top < middle && rect.bottom > middle) next = id;
    }

    setActiveId(next);
  });

  return activeId;
}
