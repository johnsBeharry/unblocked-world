import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../section-label/SectionLabel.jsx";
import { prefersReducedMotion, revealFrames } from "../../motion/scrollMotion";
import styles from "./ProgramGridSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

// The rule draws in from the left once it enters (RevealRow curve and
// duration); cards (`data-program-card` children) open with the Grants frame
// mask, top → bottom, like the Grants program cards. Artworks run their own
// scrubbed build.
function useGridIntro(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const rule = root.querySelector("[data-program-rule]");
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
      revealFrames([...root.querySelectorAll("[data-program-card]")], { from: "top" });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}

// Section shell of the grant program pages (Culture Grants Makers, Open
// Systems Intro): dark section tag, title over columns 2–3, full-width rule,
// then the consumer's cards and copy, placed on the shared 690 / 335 / 335
// grid by the consumer's own classes (rows 3 and 4). `labelCompact` is the
// mobile variant of the tag when the mockups spell it differently.
export function ProgramGridSection({ id, label, labelCompact, title, className = "", children }) {
  const rootRef = useRef(null);
  useGridIntro(rootRef);
  const labelClass = styles["program-grid__label"];

  return (
    <section ref={rootRef} className={`${styles["program-grid"]} ${className}`} aria-labelledby={id}>
      {labelCompact ? (
        <>
          <SectionLabel className={`${labelClass} ${styles["program-grid__label--wide"]}`}>
            {label}
          </SectionLabel>
          <SectionLabel className={`${labelClass} ${styles["program-grid__label--compact"]}`}>
            {labelCompact}
          </SectionLabel>
        </>
      ) : (
        <SectionLabel className={labelClass}>{label}</SectionLabel>
      )}

      <RevealText as="h2" id={id} className={styles["program-grid__title"]}>
        {title}
      </RevealText>

      <span className={styles["program-grid__rule"]} data-program-rule aria-hidden="true" />

      {children}
    </section>
  );
}
