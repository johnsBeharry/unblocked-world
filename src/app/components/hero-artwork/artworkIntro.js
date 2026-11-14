import { gsap } from "gsap";

// Shared artwork intro (home hero + Submit Work section): every layer appears
// as a ~1px line and fades in, then the rows thicken to full height from the
// bottom row upward. Thickening overlaps the fade with an ease-out so there is
// no visible pause between the two steps.
const HAIRLINE_PX = 1;
const FADE = { duration: 0.5, ease: "power1.out" };
const THICKEN = { offset: 0.25, duration: 1, spread: 0.6, ease: "power2.out" };

// Sets the hidden state; returns what the timeline needs plus `settle`, which
// clears every leftover transform/opacity so the result renders as static.
export function prepareArtworkIntro(root) {
  const rows = Array.from(
    root.querySelectorAll("[data-artwork-motif]"),
  ).filter((row) => row.offsetHeight > 0);
  const layers = rows.flatMap((row) =>
    Array.from(row.querySelectorAll("[data-artwork-layer]")),
  );
  layers.forEach((layer) => {
    const height = layer.offsetHeight || 1;
    gsap.set(layer, {
      scaleY: Math.min(1, HAIRLINE_PX / height),
      opacity: 0,
      transformOrigin: "50% 50%",
    });
  });
  const settle = () =>
    gsap.set(layers, { clearProps: "transform,opacity" });
  return { rows, layers, settle };
}

// Adds the intro to `timeline` starting at `at` (seconds).
export function addArtworkIntro(timeline, { rows, layers }, at = 0) {
  timeline.to(layers, { opacity: 1, ...FADE }, at);
  const rowStep = THICKEN.spread / Math.max(1, rows.length - 1);
  [...rows].reverse().forEach((row, index) => {
    timeline.to(
      row.querySelectorAll("[data-artwork-layer]"),
      { scaleY: 1, duration: THICKEN.duration, ease: THICKEN.ease },
      at + THICKEN.offset + index * rowStep,
    );
  });
  return timeline;
}
