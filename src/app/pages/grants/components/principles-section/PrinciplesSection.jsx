import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { ThemeArtwork } from "../../../../components/theme-artwork/ThemeArtwork.jsx";
import { revealFrames } from "../../motion/scrollMotion.js";
import { SectionLabel } from "../section-label/SectionLabel.jsx";
import content from "./principles-content.json";
import styles from "./PrinciplesSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Title: glyphs rise inside a stationary mask, starting from the middle
// letters and stepping outward one pair at a time.
const TITLE = { duration: 1.2, fade: 0.6, step: 0.14, ease: "expo.out" };
// Cards: start stacked in the middle of the group and spread to the layout,
// scrubbed with scroll (reverses on scroll up). Card content stays visible.
// The "Themes" title starts centred in the viewport when the spread starts and
// moves with the same scroll range to its layout position (parallax).
const CARDS = {
  // Title bottom = top of the card stack. The spread starts when the stack top
  // is at 70% of the viewport (user reference) and ends at 20%.
  start: 0.7,
  end: 0.2,
};
// The spread/parallax needs the desktop layout; the stacked mobile cards open
// with the shared mask reveal, top -> bottom (same breakpoint as the mobile
// mixin).
const MOBILE_QUERY = "(max-width: 600px)";

function usePrinciplesIntro(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const title = root.querySelector("[data-principles-title]");
    const glyphs = [...root.querySelectorAll("[data-title-glyph]")];
    const cards = [...root.querySelectorAll("[data-theme-card]")];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const middle = (glyphs.length - 1) / 2;
      gsap.set(glyphs, { yPercent: 150, opacity: 0 });
      const titleTl = gsap.timeline({ paused: true });
      glyphs.forEach((glyph, index) => {
        const at = Math.floor(Math.abs(index - middle)) * TITLE.step;
        titleTl
          .to(glyph, { yPercent: 0, duration: TITLE.duration, ease: TITLE.ease }, at)
          .to(glyph, { opacity: 1, duration: TITLE.fade, ease: "none" }, at);
      });

      // Layout offset (the title is transformed by the parallax).
      ScrollTrigger.create({
        trigger: root,
        start: () => `top+=${title.offsetTop} 85%`,
        once: true,
        onEnter: () => titleTl.play(),
      });
    }, root);

    mm.add(MOBILE_QUERY, () => revealFrames(cards, { from: "top" }));
    mm.add(`not all and ${MOBILE_QUERY}`, () => {
      // Offset from each card's layout centre to the centre of the whole
      // card group (layout values, so the CSS rotation does not skew them).
      const centres = cards.map((card) => [
        card.offsetLeft + card.offsetWidth / 2,
        card.offsetTop + card.offsetHeight / 2,
      ]);
      const groupCentre = (axis) =>
        centres.reduce((sum, point) => sum + point[axis], 0) / centres.length;
      const angles = cards.map((card) => gsap.getProperty(card, "rotation"));

      // Layout offset of the title bottom (the title itself is transformed, so
      // it is not used as the trigger element).
      const stackTop = () => title.offsetTop + title.offsetHeight;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: () => `top+=${stackTop()} ${CARDS.start * 100}%`,
            end: () => `top+=${stackTop()} ${CARDS.end * 100}%`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          cards,
          {
            x: (index) => groupCentre(0) - centres[index][0],
            y: (index) => groupCentre(1) - centres[index][1],
            rotation: 0, // stacked cards start straight (user request)
          },
          {
            x: 0,
            y: 0,
            rotation: (index) => angles[index],
            ease: "power2.inOut",
          },
          0,
        )
        .fromTo(
          title,
          // At the start the title bottom sits at CARDS.start of the viewport;
          // shift it so its centre is on the viewport centre instead.
          {
            y: () =>
              window.innerHeight * 0.5 -
              (window.innerHeight * CARDS.start - title.offsetHeight / 2),
          },
          { y: 0, ease: "none" },
          0,
        );
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [rootRef]);
}

export function PrinciplesSection() {
  const rootRef = useRef(null);
  usePrinciplesIntro(rootRef);

  return (
    <section
      ref={rootRef}
      className={styles["principles-section"]}
      aria-labelledby="principles-title"
    >
      <SectionLabel className={styles["principles-section__label"]}>
        {content.label}
      </SectionLabel>

      <h2
        id="principles-title"
        className={styles["principles-section__title"]}
        aria-label={content.title}
        data-principles-title
      >
        {Array.from(content.title, (glyph, index) => (
          <span
            key={`${glyph}-${index}`}
            className={styles["principles-section__title-mask"]}
            aria-hidden="true"
          >
            <span className={styles["principles-section__title-glyph"]} data-title-glyph>
              {glyph}
            </span>
          </span>
        ))}
      </h2>

      <ul className={styles["principles-section__cards"]}>
        {content.themes.map((theme) => (
          <li
            key={theme.id}
            className={`${styles["theme-card"]} ${styles[`theme-card--${theme.id}`]}`}
            data-theme-card
          >
            <h3 className={styles["theme-card__title"]}>{theme.title}</h3>
            <p className={styles["theme-card__description"]}>{theme.description}</p>
            <ThemeArtwork theme={theme.id} className={styles["theme-card__art"]} />
          </li>
        ))}
      </ul>

      <RevealText as="p" className={styles["principles-section__description"]}>
        {content.description}
      </RevealText>
    </section>
  );
}
