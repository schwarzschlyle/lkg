/**
 * Toggle a CSS-module class on a node.
 *
 * CSS Modules are typed as an index signature, so `noUncheckedIndexedAccess`
 * widens every lookup to `string | undefined`. Funnelling imperative class
 * changes through here keeps that honest at the type level and turns a missing
 * class into a no-op rather than a `DOMException` from an empty token.
 */
export function toggleClass(
  node: Element | null | undefined,
  name: string | undefined,
  on: boolean,
): void {
  if (!node || name === undefined || name === '') return;
  node.classList.toggle(name, on);
}
