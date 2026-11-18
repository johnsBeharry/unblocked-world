import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { RevealRow } from "../../../../../components/RevealRow/RevealRow.jsx";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../section-label/SectionLabel.jsx";
import { prefersReducedMotion, slideLinesIn } from "../../motion/scrollMotion.js";
import content from "./selection-content.json";
import styles from "./SelectionSection.module.scss";

// Scroll experience: the title lines slide in from the right, later lines
// from further away, settling as the section enters.
function useSelectionMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      slideLinesIn(root, [...root.querySelector("[data-selection-title]").children]);
    }, root);
    return () => ctx.revert();
  }, [rootRef]);
}

export function SelectionSection() {
  const rootRef = useRef(null);
  useSelectionMotion(rootRef);

  return (
    <section
      ref={rootRef}
      className={styles["selection-section"]}
      aria-labelledby="selection-title"
    >
      <SectionLabel className={styles["selection-section__label"]}>{content.label}</SectionLabel>

      <h2 id="selection-title" className={styles["selection-section__title"]} data-selection-title>
        {content.title.map((line) => (
          <RevealText key={line}>{line}</RevealText>
        ))}
      </h2>

      <RevealText as="p" className={styles["selection-section__intro"]}>
        {content.intro}
      </RevealText>

      <ol className={styles["selection-section__steps"]}>
        {content.steps.map((step) => (
          <RevealRow
            key={step.id}
            className={styles["selection-step"]}
            contentClassName={styles["selection-step__content"]}
            lineClassName={styles["selection-step__rule"]}
          >
            <span className={styles["selection-step__number"]}>{step.number}</span>
            <h3 className={styles["selection-step__title"]}>{step.title}</h3>
            <p className={styles["selection-step__description"]}>{step.description}</p>
          </RevealRow>
        ))}
      </ol>
    </section>
  );
}
