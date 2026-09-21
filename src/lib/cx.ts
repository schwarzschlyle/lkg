export type ClassValue = string | false | null | undefined;

/** Join truthy class names. Keeps conditional `className` expressions readable. */
export const cx = (...values: ClassValue[]): string =>
  values.filter(Boolean).join(' ');
