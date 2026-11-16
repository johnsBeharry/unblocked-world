import React from "react";
import { gsap } from "gsap";
import styles from "./OwnershipContestHero.module.scss";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";

const bars = [
  [223.39, 275.55, 155.503, 30.342],
  [223.39, 237.63, 155.503, 22.757],
  [223.39, 207.27, 155.503, 15.171],
  [223.39, 184.52, 155.503, 7.586],
  [223.39, 165.55, 155.503, 3.793],
  [223.39, 461.38, 155.503, 30.342],
  [223.39, 506.92, 155.503, 22.757],
  [223.39, 544.81, 155.503, 15.171],
  [223.39, 575.17, 155.503, 7.586],
  [223.39, 597.93, 155.503, 3.793],
  [193.05, 305.88, 30.342, 155.503],
  [155.12, 305.88, 22.757, 155.503],
  [124.77, 305.88, 15.171, 155.503],
  [102.01, 305.88, 7.586, 155.503],
  [83.05, 305.88, 3.793, 155.503],
  [378.88, 305.89, 30.342, 155.503],
  [424.41, 305.89, 22.757, 155.503],
  [462.33, 305.89, 15.171, 155.503],
  [492.67, 305.89, 7.586, 155.503],
  [515.43, 305.89, 3.793, 155.503],
];

const toVw = (size) => `${(size / 1440) * 100}vw`;
const toMobileVw = (size) => `${(size / 375) * 100}vw`;
const mobileScaleX = 188.5 / 602;
const mobileScaleY = 240 / 766.609;

function PosterTitleReveal({ children, className, label }) {
  return (
    <span className={className} aria-label={label}>
      {Array.from(children).map((character, index) => (
        <span
          className={styles.char}
          key={`${character}-${index}`}
          aria-hidden="true"
          style={{ "--char-index": index }}
        >
          <span className={styles.charInner} data-char-inner>
            {character === " " ? "\u00a0" : character}
          </span>
        </span>
      ))}
    </span>
  );
}

// Start the character reveal only after fonts are loaded and layout has
// settled, so the first animation frames are not lost to font reflow.
function useFontsReady() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let frame;
    let cancelled = false;
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setReady(true));
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  return ready;
}

// Artwork box enters right after the subtitle reveal, as one sequence with the
// title. Chained to the last subtitle glyph's animationend so it always follows
// the CSS timing without duplicating it.
const ART_SLIDE_Y_PERCENT = 10;
const ART_DURATION = 1;

function useArtworkSequence(ready, sectionRef) {
  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    const artBox = section?.querySelector("[data-art-box]");
    if (!artBox) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(artBox, { opacity: 1, yPercent: 0 });
      return undefined;
    }

    gsap.set(artBox, { opacity: 0, yPercent: ART_SLIDE_Y_PERCENT });
    if (!ready) return undefined;

    const subtitleGlyphs = section.querySelectorAll(
      "[data-subtitle-reveal] [data-char-inner]",
    );
    const lastGlyph = subtitleGlyphs[subtitleGlyphs.length - 1];
    let tween;
    const reveal = () => {
      tween = gsap.to(artBox, {
        opacity: 1,
        yPercent: 0,
        duration: ART_DURATION,
        ease: "power2.inOut",
      });
    };

    if (!lastGlyph) {
      reveal();
      return () => tween?.kill();
    }

    lastGlyph.addEventListener("animationend", reveal, { once: true });
    return () => {
      lastGlyph.removeEventListener("animationend", reveal);
      tween?.kill();
    };
  }, [ready, sectionRef]);
}

export function OwnershipContestHero({ guidelinesHref = "/guidelines", submitHref = "/submit" }) {
  const ready = useFontsReady();
  const sectionRef = React.useRef(null);
  useArtworkSequence(ready, sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${styles.hero} ${ready ? styles.ready : ""}`}
      data-name="contest-hero"
      aria-labelledby="ownership-contest-title"
    >
      <div className={styles.art} aria-hidden="true">
        <div className={styles.artBox} data-art-box>
          {bars.map(([left, top, width, height], index) => (
            <span
              className={styles.bar}
              key={index}
              style={{
                "--desktop-bar-left": toVw(left),
                "--desktop-bar-top": toVw(top),
                "--desktop-bar-width": toVw(width),
                "--desktop-bar-height": toVw(height),
                "--mobile-left": toMobileVw(left * mobileScaleX),
                "--mobile-top": toMobileVw(top * mobileScaleY),
                "--mobile-width": toMobileVw(width * mobileScaleX),
                "--mobile-height": toMobileVw(height * mobileScaleY),
              }}
            />
          ))}
        </div>
      </div>

      <h1 className={styles.title} id="ownership-contest-title">
        <PosterTitleReveal className={styles.titleText} label="Ownership">
          Ownership
        </PosterTitleReveal>
      </h1>
      <p className={styles.subtitle} data-subtitle-reveal>
        <PosterTitleReveal
          className={styles.subtitleText}
          label="Poster Contest (↓)"
        >
          Poster Contest (↓)
        </PosterTitleReveal>
      </p>
      <RevealText as="p" className={styles.dates}>
        21.02.26—23.09.26
      </RevealText>
      <RevealText as="a" className={styles.guidelines} href={guidelinesHref}>
        Submission Guidelines (→)
      </RevealText>
      <RevealText as="a" className={styles.submit} href={submitHref}>
        Submit Poster (→)
      </RevealText>
    </section>
  );
}
