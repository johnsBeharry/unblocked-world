import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../motion/scrollMotion.js";
import styles from "./RingsArtwork.module.scss";

gsap.registerPlugin(ScrollTrigger);

const OPEN = { duration: 1, step: 0.18, ease: "power2.out" };
// Timed intro (artwork already on the first screen at load).
const INTRO = { delay: 0.4, timeScale: 0.85 };

// The rings open like an iris: every disc starts at scale 0 (empty dark
// ground) and grows from the shared centre, outermost first, so the rings
// unfold outward one after another. `scroll` scrubs it while the artwork
// scrolls in (reverses on upward scroll); `intro` plays it once on mount.
// Both end on the mockup.
function useIris(rootRef, { cx, cy, play, start, end }) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const timeline =
        play === "intro"
          ? gsap.timeline({ delay: INTRO.delay }).timeScale(INTRO.timeScale)
          : gsap.timeline({ scrollTrigger: { trigger: root, start, end, scrub: true } });
      root.querySelectorAll("circle").forEach((disc, index) => {
        timeline.fromTo(
          disc,
          { scale: 0, svgOrigin: `${cx} ${cy}` },
          { scale: 1, duration: OPEN.duration, ease: OPEN.ease },
          index * OPEN.step,
        );
      });
    }, root);
    return () => ctx.revert();
  }, [rootRef, cx, cy, play, start, end]);
}

// Concentric discs on a dark ground (Open Systems hero, Culture Grants Open
// System panel). `rings` = [{ r, tone: "light" | "dark" }], outermost first
// = paint order (each disc covers the next). Colours come from the consumer
// through `--rings-light` / `--rings-dark`; size through `className`.
export function RingsArtwork({
  width,
  height,
  cx,
  cy,
  rings,
  className = "",
  play = "scroll",
  start = "top 85%",
  end = "bottom bottom",
}) {
  const rootRef = useRef(null);
  useIris(rootRef, { cx, cy, play, start, end });

  return (
    <svg
      ref={rootRef}
      className={`${styles["rings-artwork"]} ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect className={styles["rings-artwork__ground"]} width={width} height={height} />
      {rings.map(({ r, tone }) => (
        <circle
          key={r}
          className={styles[`rings-artwork__disc--${tone}`]}
          cx={cx}
          cy={cy}
          r={r}
        />
      ))}
    </svg>
  );
}
