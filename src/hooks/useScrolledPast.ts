import { useState } from 'react';
import { useScrollEffect } from './useScrollEffect';

/** True once the page has scrolled past `offset` px. Drives the nav pill. */
export function useScrolledPast(offset: number): boolean {
  const [past, setPast] = useState(false);
  useScrollEffect(() => {
    setPast(window.scrollY > offset);
  });
  return past;
}
