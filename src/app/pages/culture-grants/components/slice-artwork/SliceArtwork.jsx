import { useId, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARTWORK, BAND, COLUMNS, SLICES } from "./sliceGeometry";
import styles from "./SliceArtwork.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Scroll experience: every column starts as one plain circle (its slices are
// stacked on the centre circle, where they are invisible) and splits into
// the mockup's slices while the artwork scrolls in. The centre column leads
// and the outer columns follow, so the split spreads outward like a wave.
// Scrubbed, so it reverses on upward scroll; the end state is the mockup.
const SPLIT = {
  start: "top 80%",
  end: "center center",
  duration: 0.8, // per column, in timeline units
  step: 0.1, // delay per column away from the centre
  ease: "power2.inOut",
};

// Mobile (mobile mixin, ≤600px): the whole artwork is on the first screen,
// so a scroll scrub would load it collapsed (unlike the mobile mockup). There
// the same split plays once as a timed intro and settles on the mockup.
const MOBILE_QUERY = "(max-width: 600px)";
const MOBILE_INTRO = { delay: 0.4, timeScale: 0.85 }; // ≈1.4s total

function useSliceSplit(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const middle = (COLUMNS.length - 1) / 2;
    const addSplit = (timeline) =>
      COLUMNS.forEach((column, index) => {
        const slices = root.querySelectorAll(`[data-slice-column="${column.id}"]`);
        timeline.fromTo(
          slices,
          { y: (_, slice) => ARTWORK.centerY - Number(slice.dataset.sliceCy) },
          { y: 0, duration: SPLIT.duration, ease: SPLIT.ease },
          Math.abs(index - middle) * SPLIT.step,
        );
      });

    const mm = gsap.matchMedia(root);
    mm.add(`not all and ${MOBILE_QUERY}`, () => {
      addSplit(
        gsap.timeline({
          scrollTrigger: { trigger: root, start: SPLIT.start, end: SPLIT.end, scrub: true },
        }),
      );
    });
    mm.add(MOBILE_QUERY, () => {
      addSplit(gsap.timeline({ delay: MOBILE_INTRO.delay }).timeScale(MOBILE_INTRO.timeScale));
    });

    return () => mm.revert();
  }, [rootRef]);
}

export function SliceArtwork() {
  const rootRef = useRef(null);
  // Clip ids must be unique per instance.
  const idPrefix = useId().replace(/:/g, "");
  useSliceSplit(rootRef);

  return (
    <svg
      ref={rootRef}
      className={styles["slice-artwork"]}
      viewBox={`0 0 ${ARTWORK.width} ${ARTWORK.height}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {COLUMNS.flatMap((column) =>
          SLICES.map((slice) => (
            <clipPath
              id={`${idPrefix}-${column.id}-${slice.id}`}
              key={`${column.id}-${slice.id}`}
            >
              <rect
                x={column.cx - BAND.width / 2}
                y={slice.bandTop}
                width={BAND.width}
                height={BAND.height}
              />
            </clipPath>
          )),
        )}
      </defs>
      <rect
        className={styles["slice-artwork__ground"]}
        width={ARTWORK.width}
        height={ARTWORK.height}
      />
      {COLUMNS.map((column) => (
        <g className={styles["slice-artwork__column"]} key={column.id}>
          <circle cx={column.cx} cy={ARTWORK.centerY} r={column.r} />
          {/* The clip-path sits on the moved group, so the band travels with
              its circle and the slice keeps its shape while it moves. */}
          {SLICES.map((slice) => (
            <g
              key={slice.id}
              clipPath={`url(#${idPrefix}-${column.id}-${slice.id})`}
              data-slice-column={column.id}
              data-slice-cy={slice.cy}
            >
              <circle cx={column.cx} cy={slice.cy} r={column.r} />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
