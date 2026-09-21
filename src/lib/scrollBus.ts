/**
 * One rAF-batched `scroll` + `resize` subscription shared by every scroll-driven
 * effect on the page.
 *
 * The reference build attached a separate listener per section, so a single
 * scroll tick ran six uncoordinated layout-reading callbacks. Batching them into
 * one animation frame keeps all reads in the same frame and holds 60fps
 * (spec §16 performance targets).
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let frameId = 0;
let attached = false;

function flush(): void {
  frameId = 0;
  for (const listener of listeners) listener();
}

function schedule(): void {
  if (frameId !== 0) return;
  frameId = requestAnimationFrame(flush);
}

function attach(): void {
  if (attached) return;
  attached = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

function detach(): void {
  if (!attached) return;
  attached = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  if (frameId !== 0) {
    cancelAnimationFrame(frameId);
    frameId = 0;
  }
}

/** Subscribe to batched scroll/resize ticks. Fires once immediately. */
export function subscribeToScroll(listener: Listener): () => void {
  listeners.add(listener);
  attach();
  schedule();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) detach();
  };
}
