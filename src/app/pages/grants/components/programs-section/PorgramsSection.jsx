import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { prefersReducedMotion, revealFrames } from "../../motion/scrollMotion.js";
import { contentLines } from "../../../../../components/ContentLines/ContentLines.jsx";
import styles from "./ProgramsSection.module.scss";
import content from "./programs-content.json";

// Scroll experience: both program cards open with a top -> bottom mask,
// staggered. (No column drift: the cards sit edge to edge, so an offset reads
// as a misalignment.) User request 2026-11-17: smoother and a bit slower —
// the shared expo.out 1.2s did nearly the whole wipe in the first ~0.15s on
// these tall cards and read as a glitch; power2.inOut over 1.6s, 0.25s apart.
const CARD_REVEAL = { from: "top", duration: 1.6, ease: "power2.inOut", stagger: 0.25 };
function useProgramsMotion(blocksRef) {
  useLayoutEffect(() => {
    const blocks = blocksRef.current;
    if (!blocks || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      revealFrames([...blocks.children], CARD_REVEAL);
    }, blocks);
    return () => ctx.revert();
  }, [blocksRef]);
}

export function ProgramsSections() {
  const blocksRef = useRef(null);
  useProgramsMotion(blocksRef);

  return (
    <section className={styles.section}>
      <RevealText as="h1" className={styles["main-title"]}>
        {content.label}
      </RevealText>
      <RevealText as="p" className={styles["block-description"]}>
        {content.description}
      </RevealText>
      <RevealText
        as="p"
        className={`${styles["block-title"]} ${styles["main-title"]}`}
      >
        {content.title}
      </RevealText>
      <div ref={blocksRef} className={styles.blocks}>
        {content.programs.map((program) => (
          <div key={program.id} className={styles["blocks__item"]}>
            <RevealText className={styles["blocks__item-title"]}>
              {contentLines(program.title)}
            </RevealText>

            <div className={styles["blocks__item-bottom"]}>
              {/* An amount with a note ("over 12 mo.") is two stacked lines. */}
              {program.amountNote ? (
                <div className={styles["blocks__item-amount"]}>
                  <RevealText>{program.amount}</RevealText>
                  <RevealText className={styles.small}>
                    {program.amountNote}
                  </RevealText>
                </div>
              ) : (
                <RevealText className={styles["blocks__item-amount"]}>
                  {program.amount}
                </RevealText>
              )}

              <RevealText className={styles["blocks__item-detail"]}>
                {program.detail}
              </RevealText>

              <div className={styles.cta}>
                <RevealText as="a" rolling href={program.link.href}>
                  {program.link.label}
                </RevealText>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
