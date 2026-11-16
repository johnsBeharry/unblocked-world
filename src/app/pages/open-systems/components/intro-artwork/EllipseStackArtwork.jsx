import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../../grants/motion/scrollMotion";
import styles from "./IntroArtwork.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Supplied 256 × 823 export (Open Systems Intro, blue card): nine touching
// rings seen edge-on around a horizontal axis — the front one is a full
// circle, the ones above and below get flatter. Heights by distance from
// the front ring (0 … 4); at 4.5 a ring is fully edge-on (height 0).
const RX = 127.554;
const HEIGHTS = [127.554, 63.9619, 38.8208, 25.8805, 13.31, 0];
const SLOTS = 9; // rings, at offsets -4 … 4 from the front
const HALF = SLOTS / 2;
const CENTER_Y = 411.499; // stack centre (= the front circle centre)
// The export draws the circle 0.742 left of the ellipses.
const CX = { ring: 128.297, front: 127.555 };

// Real-time scroll: the rings rotate around the horizontal axis with the
// page (scroll down → rings travel up). A ring passing the front opens into
// the circle, rings leaving one end come back at the other end while
// edge-on (height 0), so the loop has no seam. `TRAVEL` = ring steps over
// the artwork's full pass through the viewport; the export is the frame
// with the artwork centred in the viewport.
const TRAVEL = 3;

// Monotone cubic (Fritsch–Carlson) through HEIGHTS at STEPS, flat at the
// front, so a ring grows and shrinks smoothly between the exported sizes
// (the secant ratios stay under 3, so no slope limiting is needed).
const STEPS = [0, 1, 2, 3, 4, HALF];
const SECANTS = HEIGHTS.slice(1).map((h, i) => (h - HEIGHTS[i]) / (STEPS[i + 1] - STEPS[i]));
const SLOPES = HEIGHTS.map((_, i) =>
  i === 0 ? 0 : i === HEIGHTS.length - 1 ? SECANTS[i - 1] : (SECANTS[i - 1] + SECANTS[i]) / 2,
);

function ringHeight(offset) {
  const a = Math.min(Math.abs(offset), HALF);
  let i = 0;
  while (i < STEPS.length - 2 && a > STEPS[i + 1]) i += 1;
  const width = STEPS[i + 1] - STEPS[i];
  const t = (a - STEPS[i]) / width;
  const t2 = t * t;
  const t3 = t2 * t;
  return Math.max(
    0,
    (2 * t3 - 3 * t2 + 1) * HEIGHTS[i] +
      (t3 - 2 * t2 + t) * width * SLOPES[i] +
      (-2 * t3 + 3 * t2) * HEIGHTS[i + 1] +
      (t3 - t2) * width * SLOPES[i + 1],
  );
}

// Ring geometry at rotation `phase` (in ring steps): each ring's offset
// from the front wraps into [-4.5, 4.5); rings touch, and the stack is
// centred on CENTER_Y. At phase 0 this is the export exactly.
function layout(phase) {
  const rings = Array.from({ length: SLOTS }, (_, slot) => {
    const offset = ((((slot - phase + 0.5) % SLOTS) + SLOTS) % SLOTS) - HALF;
    return { slot, offset, ry: ringHeight(offset) };
  }).sort((a, b) => a.offset - b.offset);
  const total = rings.reduce((sum, ring) => sum + ring.ry * 2, 0);
  let top = CENTER_Y - total / 2;
  return rings.map((ring) => {
    const cy = top + ring.ry;
    top += ring.ry * 2;
    const frontness = Math.max(0, 1 - Math.abs(ring.offset));
    return { ...ring, cy, cx: CX.ring - (CX.ring - CX.front) * frontness };
  });
}

const REST = layout(0);

function useRingRotation(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (prefersReducedMotion()) return undefined;
    const ellipses = [...root.querySelectorAll("[data-ring-slot]")];
    const apply = (phase) => {
      layout(phase).forEach((ring) => {
        const ellipse = ellipses[ring.slot];
        ellipse.setAttribute("cx", ring.cx);
        ellipse.setAttribute("cy", ring.cy);
        ellipse.setAttribute("ry", ring.ry);
      });
    };
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => apply((self.progress - 0.5) * TRAVEL),
      onRefresh: (self) => apply((self.progress - 0.5) * TRAVEL),
    });
    return () => {
      trigger.kill();
      apply(0);
    };
  }, [rootRef]);
}

export function EllipseStackArtwork() {
  const rootRef = useRef(null);
  useRingRotation(rootRef);
  const bySlot = [...REST].sort((a, b) => a.slot - b.slot);

  return (
    <svg
      ref={rootRef}
      className={styles["intro-artwork--ellipses"]}
      viewBox="0 0 256 823"
      fill="none"
      aria-hidden="true"
    >
      {bySlot.map((ring) => (
        <ellipse
          key={ring.slot}
          cx={ring.cx}
          cy={ring.cy}
          rx={RX}
          ry={ring.ry}
          data-ring-slot={ring.slot}
        />
      ))}
    </svg>
  );
}
