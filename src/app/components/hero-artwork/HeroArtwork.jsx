import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import styles from "./HeroArtwork.module.scss";
import { addArtworkIntro, prepareArtworkIntro } from "./artworkIntro.js";
import { ROWS } from "./heroArtworkGeometry.js";

gsap.registerPlugin(ScrollTrigger);

// Scroll: the artwork moves up faster than the page (parallax) and grows until
// it is SIDE_SPACE from the viewport edges:
// max scale = (viewport width − 2 × SIDE_SPACE) / artwork width (≈1.87 at
// 1440, ≈1.90 at 1920). It reaches max scale exactly when its top reaches the
// viewport top, so the full size is seen while it is still on screen.
const ARTWORK_PARALLAX_Y = 0.4;
const ARTWORK_SIDE_SPACE = 36;
// scrollReveal: same artwork intro as the home hero (hairlines fade in, then
// thicken bottom → top), played once when the artwork enters the viewport,
// plus a slow drift while the section scrolls past.
const REVEAL_START = "top 85%";
const PARALLAX_PERCENT = 6;

// The artwork (user-supplied 824 × 704 SVG): rows of centred layers,
// rendered as motif groups → layer elements so the scroll scaling (per
// group) and the intro (per layer, rows bottom → top) keep working on the
// shared data attributes. Geometry in heroArtworkGeometry.js, placed by
// percentages in SCSS (same drawing at every breakpoint).
function ArtworkRows() {
  return (
    <div className={styles["hero-artwork__art"]} aria-hidden="true">
      {ROWS.map((layers, rowIndex) => (
        <div
          key={rowIndex}
          className={styles["hero-artwork__row"]}
          style={{ "--row-index": rowIndex }}
          data-artwork-motif={rowIndex}
        >
          {layers.map(([x, width, height]) => (
            <div
              key={x}
              className={styles["hero-artwork__layer"]}
              style={{
                "--layer-x": x,
                "--layer-width": width,
                "--layer-height": height,
              }}
              data-artwork-layer={`${rowIndex}-${x}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function CompactArtwork() {
  return (
    <div className={styles["hero-artwork-compact"]} data-hero-artwork="tablet">
      <ArtworkRows />
    </div>
  );
}

// compactArtwork: also render the compact-portrait (tablet/mobile) artwork,
// shown instead of the desktop one at those breakpoints (home hero only).
export function HeroArtwork({
  disableScrollAnimation = false,
  scrollReveal = false,
  compactArtwork = false,
}) {
  const artworkRef = React.useRef(null);

  React.useEffect(() => {
    const artworkRoot = artworkRef.current;
    if (!artworkRoot) return undefined;

    const artworkWrappers = [
      artworkRoot,
      ...artworkRoot.querySelectorAll("[data-hero-artwork]"),
    ];
    const groups = Array.from(
      artworkRoot.querySelectorAll("[data-artwork-motif]"),
    );
    if (!artworkWrappers.length || !groups.length) return undefined;

    const resetArtwork = () => {
      gsap.killTweensOf([...artworkWrappers, ...groups]);
      gsap.set(artworkWrappers, { y: 0, scale: 1 });
      gsap.set(groups, { scaleY: 1 });
    };

    if (disableScrollAnimation) {
      resetArtwork();
      if (!scrollReveal) return undefined;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return undefined;

      const intro = prepareArtworkIntro(artworkRoot);
      const reveal = addArtworkIntro(
        gsap.timeline({ paused: true, onComplete: intro.settle }),
        intro,
      );
      const revealTrigger = ScrollTrigger.create({
        trigger: artworkRoot,
        start: REVEAL_START,
        once: true,
        onEnter: () => reveal.play(),
      });

      // Depth: the artwork drifts slower than the copy above it.
      const drift = gsap.fromTo(
        artworkRoot,
        { yPercent: PARALLAX_PERCENT },
        {
          yPercent: -PARALLAX_PERCENT,
          ease: "none",
          scrollTrigger: {
            trigger: artworkRoot,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      return () => {
        revealTrigger.kill();
        reveal.kill();
        intro.settle();
        drift.scrollTrigger?.kill();
        drift.kill();
        resetArtwork();
      };
    }

    let frame = 0;
    let neutralTop = 0;
    // Measure in neutral geometry (no transforms) to avoid feedback.
    const measureNeutral = () => {
      gsap.set(artworkWrappers, { y: 0, scale: 1 });
      neutralTop = artworkRoot.getBoundingClientRect().top + window.scrollY;
    };
    const updateLayerScale = () => {
      frame = 0;
      if (document.body.dataset.pagePhase !== "content") return;

      const maxScale = Math.max(
        1,
        (window.innerWidth - 2 * ARTWORK_SIDE_SPACE) /
          (artworkRoot.offsetWidth || 1),
      );
      // Scroll at which the artwork top meets the viewport top (it travels
      // 1 + PARALLAX_Y px per scrolled px).
      const growDistance = Math.max(1, neutralTop / (1 + ARTWORK_PARALLAX_Y));
      const progress = Math.min(1, Math.max(0, window.scrollY / growDistance));
      gsap.set(artworkWrappers, {
        y: window.scrollY * -ARTWORK_PARALLAX_Y,
        scale: 1 + (maxScale - 1) * progress,
      });
      gsap.killTweensOf(groups);
      gsap.set(groups, { scaleY: 1 });
      const startDistance = window.innerHeight * 0.1;
      const scales = groups.map((group) => {
        const rect = group.getBoundingClientRect();
        const scaleY =
          startDistance > 0
            ? Math.min(1, Math.max(0, rect.top / startDistance))
            : 1;

        return { group, scaleY };
      });

      scales.forEach(({ group, scaleY }) => {
        gsap.set(group, { scaleY });
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateLayerScale);
    };
    const onResize = () => {
      measureNeutral();
      updateLayerScale();
    };
    const phaseObserver = new MutationObserver(updateLayerScale);

    phaseObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-page-phase"],
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    measureNeutral();
    updateLayerScale();

    return () => {
      phaseObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [disableScrollAnimation, scrollReveal]);

  return (
    <>
      <div
        ref={artworkRef}
        className={styles["hero-artwork"]}
        data-hero-artwork="desktop"
        aria-hidden="true"
      >
        <ArtworkRows />
      </div>
      {compactArtwork && <CompactArtwork />}
    </>
  );
}
