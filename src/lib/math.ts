/** Clamp to the 0..1 range used by every scroll-progress calculation. */
export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));
