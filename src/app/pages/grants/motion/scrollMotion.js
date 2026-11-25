// Shared scroll motion for the Grants sections (awwwards references: kinetic
// header split, line slide-in, clip-path frame reveal with zoom-out).
// Call inside a gsap.context; every effect ends on the static layout, and
// callers skip them under prefers-reduced-motion.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Design px at the 1440 base -> current px.
const designPx = (value) => (value * window.innerWidth) / 1440;

// Two words on one row start `share` of their gap closer to the centre and
// slide apart to their layout positions while `trigger` enters (scrubbed).
export function slideApart(trigger, left, right, share = 0.4) {
  // Never negative: when the two words wrap onto separate lines (narrow
  // layouts) the "gap" is negative and would push them off screen instead.
  const gather = () =>
    Math.max(0, right.offsetLeft - (left.offsetLeft + left.offsetWidth)) * share;
  gsap
    .timeline({
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "top 25%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .fromTo(left, { x: gather }, { x: 0, ease: "none" }, 0)
    .fromTo(right, { x: () => -gather() }, { x: 0, ease: "none" }, 0);
}

// Stacked lines start offset to the right (further for later lines) and
// settle while `trigger` enters (scrubbed).
export function slideLinesIn(trigger, lines, step = 60) {
  gsap.fromTo(
    lines,
    { x: (index) => designPx(step * (index + 1)) },
    {
      x: 0,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "top 25%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

// Each frame is a stationary clip-path mask that opens bottom -> top
// (`from: "bottom"`) or top -> bottom (`from: "top"`); its first child (when
// `zoom` is set) zooms out from `zoom` to 1 inside it.
// Frames entering together play as one staggered batch, once. `ease` (default
// expo.out) sets the mask curve; tall frames read better with an in-out curve.
export function revealFrames(
  frames,
  { from = "bottom", zoom = null, duration = 1.2, stagger = 0.1, ease = "expo.out" } = {},
) {
  const inner = (frame) => frame.firstElementChild;
  const hidden = from === "top" ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)";
  gsap.set(frames, { clipPath: hidden });
  if (zoom) gsap.set(frames.map(inner), { scale: zoom });
  ScrollTrigger.batch(frames, {
    start: "top 85%",
    once: true,
    onEnter: (batch) => {
      const tl = gsap.timeline();
      tl.to(batch, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration,
        ease,
        stagger,
      }, 0);
      if (zoom)
        tl.to(batch.map(inner), {
          scale: 1,
          duration: duration * 1.3,
          ease: "expo.out",
          stagger,
        }, 0);
    },
  });
}
