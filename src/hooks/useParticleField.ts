import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/** Canvas literals mirroring the dark-mode tokens. Both fields that use this
 *  hook (hero graph, Depth organism) live in dark sections by design (§1.1c),
 *  so the cool teal is always the correct accent here. */
const ACCENT_RGB = '61, 214, 196';
const NODE_RGB = '245, 245, 243';

const MAX_DPR = 2;
const DRIFT = 0.15;
const REPEL_RADIUS = 110;
const REPEL_FORCE = 0.6;
const HIGHLIGHT_RADIUS = 90;
const PACKET_CHANCE = 0.04;
const PACKET_SPEED = 0.02;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Packet {
  from: Node;
  to: Node;
  t: number;
}

export interface ParticleFieldOptions {
  /** Node count — 64 for the hero graph, 60 for the Depth organism. */
  readonly nodeCount: number;
  /** Max distance at which two nodes are linked. */
  readonly linkDistance: number;
  /**
   * Node fill alpha. The Depth organism is the SUBJECT of its section and
   * keeps the bright default; the hero field is atmosphere behind a headline
   * and runs dimmer, so the two are no longer painted identically.
   */
  readonly nodeAlpha?: number;
  /** Link stroke alpha at zero distance, falling off to 0 at `linkDistance`. */
  readonly linkAlpha?: number;
  /**
   * Live relative (x, y) target, 0..1. When set, nodes near it turn accent and
   * enlarge while the rest dim (spec §7). Read fresh every frame, so changing
   * it never restarts the animation.
   */
  readonly highlightRef?: RefObject<readonly [number, number] | null>;
  /** Render one static frame instead of animating (`prefers-reduced-motion`). */
  readonly still?: boolean;
}

/**
 * The living "system graph" / "architecture organism" (spec §3, §7).
 *
 * DPR-scaled so the field fills its box instead of clustering, with node
 * coordinates kept in CSS pixels. Sized from a ResizeObserver, so it tracks the
 * hero's `100vh` and the organism's per-breakpoint height without a window
 * listener.
 */
export function useParticleField({
  nodeCount,
  linkDistance,
  nodeAlpha = 0.5,
  linkAlpha = 0.14,
  highlightRef,
  still = false,
}: ParticleFieldOptions): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const nodes: Node[] = [];
    let packets: Packet[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    const pointer = { x: -9999, y: -9999 };

    const resize = (): void => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = rect.width || canvas.offsetWidth;
      const nextHeight = rect.height || canvas.offsetHeight;
      if (nextWidth === 0 || nextHeight === 0) return;

      // Keep the field's composition when the box changes size.
      if (width > 0 && height > 0 && nodes.length > 0) {
        const sx = nextWidth / width;
        const sy = nextHeight / height;
        for (const node of nodes) {
          node.x *= sx;
          node.y *= sy;
        }
      }

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Seed on the first real measurement.
      if (nodes.length === 0) {
        for (let i = 0; i < nodeCount; i += 1) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * DRIFT,
            vy: (Math.random() - 0.5) * DRIFT,
          });
        }
      }

      if (still) draw();
    };

    const step = (): void => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < REPEL_RADIUS && distance > 0) {
          node.x += (dx / distance) * REPEL_FORCE;
          node.y += (dy / distance) * REPEL_FORCE;
        }
      }
    };

    const draw = (): void => {
      ctx.clearRect(0, 0, width, height);

      // Links.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          if (!b) continue;
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance >= linkDistance) continue;
          const alpha = linkAlpha * (1 - distance / linkDistance);
          ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${alpha.toString()})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes, brightening around the active region when one is set.
      const region = highlightRef?.current ?? null;
      const focus = region ? { x: region[0] * width, y: region[1] * height } : null;

      for (const node of nodes) {
        let radius = 1.6;
        if (focus) {
          const distance = Math.hypot(node.x - focus.x, node.y - focus.y);
          if (distance < HIGHLIGHT_RADIUS) {
            const k = 1 - distance / HIGHLIGHT_RADIUS;
            radius = 1.6 + k * 1.8;
            ctx.fillStyle = `rgba(${ACCENT_RGB}, ${(0.5 + k * 0.5).toString()})`;
          } else {
            // Everything outside the active region dims back.
            ctx.fillStyle = `rgba(${NODE_RGB}, ${(nodeAlpha * 0.7).toString()})`;
          }
        } else {
          ctx.fillStyle = `rgba(${NODE_RGB}, ${nodeAlpha.toString()})`;
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Data packets travelling along links.
      ctx.fillStyle = `rgba(${ACCENT_RGB}, 0.9)`;
      for (const packet of packets) {
        const px = packet.from.x + (packet.to.x - packet.from.x) * packet.t;
        const py = packet.from.y + (packet.to.y - packet.from.y) * packet.t;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const advancePackets = (): void => {
      if (Math.random() < PACKET_CHANCE && nodes.length > 1) {
        const from = nodes[Math.floor(Math.random() * nodes.length)];
        const to = nodes[Math.floor(Math.random() * nodes.length)];
        if (from && to && from !== to) packets.push({ from, to, t: 0 });
      }
      for (const packet of packets) packet.t += PACKET_SPEED;
      packets = packets.filter((packet) => packet.t < 1);
    };

    const loop = (): void => {
      step();
      advancePackets();
      draw();
      frameId = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onPointerLeave = (): void => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    if (!still) {
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerleave', onPointerLeave);
      frameId = requestAnimationFrame(loop);
    }

    return () => {
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      if (frameId !== 0) cancelAnimationFrame(frameId);
    };
  }, [nodeCount, linkDistance, nodeAlpha, linkAlpha, highlightRef, still]);

  return canvasRef;
}
