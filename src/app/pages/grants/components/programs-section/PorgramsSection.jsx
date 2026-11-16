import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { prefersReducedMotion, revealFrames } from "../../motion/scrollMotion.js";
import styles from "./ProgramsSection.module.scss";

// Scroll experience: both program cards open with a top -> bottom mask,
// staggered. (No column drift: the cards sit edge to edge, so an offset reads
// as a misalignment.)
function useProgramsMotion(blocksRef) {
  useLayoutEffect(() => {
    const blocks = blocksRef.current;
    if (!blocks || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      revealFrames([...blocks.children], { from: "top", stagger: 0.15 });
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
        Sec.01
      </RevealText>
      <RevealText as="p" className={styles["block-description"]}>
        There are two ways to work with us, direct grants for cultural
        exploration, and hands-on support for larger funding proposals.
      </RevealText>
      <RevealText
        as="p"
        className={`${styles["block-title"]} ${styles["main-title"]}`}
      >
        (Programs)
      </RevealText>
      <div ref={blocksRef} className={styles.blocks}>
        <div className={styles["blocks__item"]}>
          <RevealText className={styles["blocks__item-title"]}>
            Cultural
            <br />
            Work
          </RevealText>

          <div className={styles["blocks__item-bottom"]}>
            <RevealText className={styles["blocks__item-amount"]}>
              $500–$5,000
            </RevealText>

            <RevealText className={styles["blocks__item-detail"]}>
              We support independent cultural work that challenges dominant
              narratives and reimagines the systems shaping our lives. Selected
              works will join the public UNBLOCKED archive and future
              limited-edition book.
            </RevealText>

            <div className={styles.cta}>
              <RevealText as="a" href="/grants/culture-grants">
                (→)
              </RevealText>
            </div>
          </div>
        </div>
        <div className={styles["blocks__item"]}>
          <RevealText className={styles["blocks__item-title"]}>
            Open
            <br />
            System
          </RevealText>

          <div className={styles["blocks__item-bottom"]}>
            <div className={styles["blocks__item-amount"]}>
              <RevealText>$100,000</RevealText>
              <RevealText className={styles.small}>over 12 mo.</RevealText>
            </div>
            <RevealText className={styles["blocks__item-detail"]}>
              We support independent cultural work that challenges dominant
              narratives and reimagines the systems shaping our lives.
              Selected works will join the public UNBLOCKED archive and future
              limited-edition book.
            </RevealText>
            <div className={styles.cta}>
              <RevealText as="a" href="/grants/open-systems">
                (→)
              </RevealText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
