import { useId, useRef } from "react";
import { useArtScrub } from "../../../grants/motion/useArtScrub";
import { FRAGMENTS, GLYPH_PATH } from "./glyphGeometry";
import styles from "./MakersArtwork.module.scss";

// Centre → out, all at once. Each fragment's clip band is a fixed mask box
// at its final place; only the glyph inside moves, from the centre glyph's
// position to its own (all fragments start together, no per-ring delay; the
// outer ones travel two bands, so they enter their box later on their own).
// Starts are pushed 3% further out (OVERSHOOT): a glyph parked exactly on its
// box edge showed a 1px anti-aliased sliver before moving. Do not animate the
// box itself (moving it overlapped the neighbours).
const OVERSHOOT = 1.03;

const build = (timeline, root) => {
  root.querySelectorAll("[data-glyph-fragment]").forEach((element) => {
    const { dx, dy } = element.dataset;
    timeline.fromTo(
      element.firstElementChild,
      { x: -dx * OVERSHOOT, y: -dy * OVERSHOOT },
      { x: 0, y: 0, duration: 1, ease: "power2.inOut" },
      0,
    );
  });
};

export function GlyphArtwork() {
  const rootRef = useRef(null);
  const idPrefix = useId().replace(/:/g, "");
  useArtScrub(rootRef, build);

  return (
    <svg
      ref={rootRef}
      className={styles["makers-artwork--glyph"]}
      viewBox="0 0 174 249"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {FRAGMENTS.map(({ id, clip: [x, y, width, height] }) => (
          <clipPath id={`${idPrefix}-${id}`} key={id}>
            <rect x={x} y={y} width={width} height={height} />
          </clipPath>
        ))}
      </defs>
      <path d={GLYPH_PATH} />
      {FRAGMENTS.map(({ id, dx, dy }) => (
        <g
          key={id}
          clipPath={`url(#${idPrefix}-${id})`}
          data-glyph-fragment
          data-dx={dx}
          data-dy={dy}
        >
          <g>
            <path d={GLYPH_PATH} transform={`translate(${dx} ${dy})`} />
          </g>
        </g>
      ))}
    </svg>
  );
}
