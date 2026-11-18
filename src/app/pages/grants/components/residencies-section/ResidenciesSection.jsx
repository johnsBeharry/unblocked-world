import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../section-label/SectionLabel.jsx";
import content from "./residencies-content.json";
import styles from "./ResidenciesSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

// The opening quote mark grows from a small mark to its full size while the
// section scrolls in, then the quote words light up with scroll (RevealText
// highlight).
const MARK = { fromScale: 0.4, start: "top 85%", end: "top 35%" };

function useQuoteMark(markRef) {
  useLayoutEffect(() => {
    const mark = markRef.current;
    if (!mark || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mark,
        { scale: MARK.fromScale, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: mark, start: MARK.start, end: MARK.end, scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, [markRef]);
}

export function ResidenciesSection() {
  const markRef = useRef(null);
  useQuoteMark(markRef);

  return (
    <section className={styles["residencies-section"]} aria-label={content.sectionLabel}>
      <SectionLabel className={styles["residencies-section__label"]}>
        {content.label}
      </SectionLabel>

      <RevealText as="p" className={styles["residencies-section__intro"]}>
        {content.intro}
      </RevealText>

      <figure className={styles["residencies-section__quote-wrap"]}>
        <span ref={markRef} className={styles["residencies-section__quote-mark"]} aria-hidden="true">
          “
        </span>
        <RevealText as="blockquote" className={styles["residencies-section__quote"]} highlight>
          {content.quote}
        </RevealText>
        <RevealText as="figcaption" className={styles["residencies-section__attribution"]}>
          {content.attribution}
        </RevealText>
      </figure>
    </section>
  );
}
