import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../../../grants/components/section-label/SectionLabel.jsx";
import { prefersReducedMotion, revealFrames } from "../../../grants/motion/scrollMotion";
import { TunnelArtwork } from "../makers-artwork/TunnelArtwork";
import { BarsArtwork } from "../makers-artwork/BarsArtwork";
import { GlyphArtwork } from "../makers-artwork/GlyphArtwork";
import content from "./makers.json";
import styles from "./MakersSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

// The rule draws in from the left once it enters (RevealRow curve and
// duration); the cards open with the Grants frame mask, top → bottom, like
// the Grants program cards. Artworks run their own scrubbed build.
function useMakersIntro(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const rule = root.querySelector("[data-makers-rule]");
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: rule, start: "top 90%", once: true },
        },
      );
      revealFrames([...root.querySelectorAll("[data-makers-card]")], { from: "top" });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}

export function MakersSection() {
  const rootRef = useRef(null);
  useMakersIntro(rootRef);

  return (
    <section ref={rootRef} className={styles.makers} aria-labelledby="makers-title">
      {/* Desktop mockup: two spaces before "Makers"; mobile mockup: one. */}
      <SectionLabel className={`${styles["makers__label"]} ${styles["makers__label--wide"]}`}>
        {content.label}
      </SectionLabel>
      <SectionLabel className={`${styles["makers__label"]} ${styles["makers__label--compact"]}`}>
        {content.labelCompact}
      </SectionLabel>

      <RevealText as="h2" id="makers-title" className={styles["makers__title"]}>
        {content.title}
      </RevealText>

      <span className={styles["makers__rule"]} data-makers-rule aria-hidden="true" />

      <div className={`${styles["makers__card"]} ${styles["makers__card--tunnel"]}`} data-makers-card>
        <TunnelArtwork />
      </div>

      <RevealText as="p" className={styles["makers__intro"]}>
        {content.intro}
      </RevealText>

      <RevealText as="p" className={styles["makers__scope"]}>
        {content.scope}
      </RevealText>

      <div className={`${styles["makers__card"]} ${styles["makers__card--bars"]}`} data-makers-card>
        <BarsArtwork />
      </div>

      <div className={`${styles["makers__card"]} ${styles["makers__card--glyph"]}`} data-makers-card>
        <GlyphArtwork />
      </div>
    </section>
  );
}
