import { useRef } from "react";
import { useArtScrub } from "./useArtScrub";
import styles from "./MakersArtwork.module.scss";

// Supplied 301 × 420 nested frames (outer → inner). All share one centre.
const FRAMES = [
  { x: 8.24219, y: 8.24219, width: 284.404, height: 402.906, stroke: 16.4872 },
  { x: 43.793, y: 58.6094, width: 213.303, height: 302.18, stroke: 12.3654 },
  { x: 70.4531, y: 96.3828, width: 159.977, height: 226.635, stroke: 8.24361 },
  { x: 90.4531, y: 124.711, width: 119.983, height: 169.976, stroke: 4.1218 },
  { x: 105.449, y: 145.977, width: 89.9873, height: 127.482, stroke: 4.1218 },
  { x: 116.695, y: 162.805, width: 67.4905, height: 95.6115, stroke: 2.0609 },
];
const CENTRE = `${8.24219 + 284.404 / 2} ${8.24219 + 402.906 / 2}`;
const INNER_WIDTH = FRAMES.at(-1).width;

// Telescope: every frame starts folded onto the innermost one and the
// outer frames open first, like a tunnel stretching towards the viewer.
const build = (timeline, root) => {
  root.querySelectorAll("[data-tunnel-frame]").forEach((frame, index) => {
    if (index === FRAMES.length - 1) return;
    timeline.fromTo(
      frame,
      { scale: INNER_WIDTH / FRAMES[index].width, svgOrigin: CENTRE },
      { scale: 1, svgOrigin: CENTRE, duration: 1, ease: "power2.out" },
      index * 0.12,
    );
  });
};

export function TunnelArtwork() {
  const rootRef = useRef(null);
  useArtScrub(rootRef, build);

  return (
    <svg
      ref={rootRef}
      className={styles["makers-artwork--tunnel"]}
      viewBox="0 0 301 420"
      fill="none"
      aria-hidden="true"
    >
      {FRAMES.map((frame) => (
        <rect
          key={frame.width}
          x={frame.x}
          y={frame.y}
          width={frame.width}
          height={frame.height}
          strokeWidth={frame.stroke}
          data-tunnel-frame
        />
      ))}
    </svg>
  );
}
