import { useRef } from "react";
import { useArtScrub } from "./useArtScrub";
import styles from "./MakersArtwork.module.scss";

// Supplied 161 × 159 vertical bars, right (tallest, thickest) → left.
const BARS = [
  { x: 156.316, top: 0, bottom: 158.813, stroke: 7.99057 },
  { x: 144.332, top: 3.99219, bottom: 154.814, stroke: 7.99057 },
  { x: 132.344, top: 7.98438, bottom: 150.816, stroke: 7.99057 },
  { x: 120.359, top: 11.9844, bottom: 146.825, stroke: 5.99293 },
  { x: 108.371, top: 15.9844, bottom: 142.835, stroke: 5.99293 },
  { x: 96.3867, top: 19.9766, bottom: 138.836, stroke: 5.99293 },
  { x: 84.4023, top: 23.9766, bottom: 134.846, stroke: 5.99293 },
  { x: 72.4141, top: 27.9609, bottom: 130.84, stroke: 3.99529 },
  { x: 60.4297, top: 31.9531, bottom: 126.841, stroke: 3.99529 },
  { x: 48.4414, top: 35.9531, bottom: 122.851, stroke: 3.99529 },
  { x: 36.457, top: 39.9531, bottom: 118.86, stroke: 3.99529 },
  { x: 24.4727, top: 43.9453, bottom: 114.862, stroke: 1.99764 },
  { x: 12.4844, top: 47.9375, bottom: 110.863, stroke: 1.99764 },
  { x: 0.5, top: 51.9375, bottom: 106.873, stroke: 0.998822 },
];

// Bars grow from their centre line, thinnest first, so the wedge builds
// left → right towards the thick end.
const build = (timeline, root) => {
  const bars = [...root.querySelectorAll("[data-bar]")].reverse();
  timeline.fromTo(
    bars,
    { scaleY: 0, transformOrigin: "50% 50%" },
    { scaleY: 1, duration: 0.6, ease: "power2.out", stagger: 0.05 },
  );
};

export function BarsArtwork() {
  const rootRef = useRef(null);
  useArtScrub(rootRef, build);

  return (
    <svg
      ref={rootRef}
      className={styles["makers-artwork--bars"]}
      viewBox="0 0 161 159"
      fill="none"
      aria-hidden="true"
    >
      {BARS.map((bar) => (
        <path
          key={bar.x}
          d={`M${bar.x} ${bar.top}V${bar.bottom}`}
          strokeWidth={bar.stroke}
          data-bar
        />
      ))}
    </svg>
  );
}
