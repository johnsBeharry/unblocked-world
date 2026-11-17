import React, { useEffect, useRef, useState } from "react";
import styles from "./ThemeSection.module.scss";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";
import { ThemeArtwork } from "../../../../components/theme-artwork/ThemeArtwork.jsx";

// Question + description play together once 60% of their block is on
// screen. RevealText's own trigger ignores the bottom 10% of the viewport,
// and this block sits at the bottom of a pinned full-screen section, so short
// descriptions (Permanence at 1905 × 836, all but Peers at 864 × 1238) stayed
// in that band and never played.
function useCopyReveal() {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const block = ref.current;
    if (!block) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlay(true);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(block);
    return () => observer.disconnect();
  }, []);
  return [ref, play];
}

export function ThemeSection({
  variant,
  title,
  index,
  question,
  description,
  sideLabel,
  versus = "(vs)",
  backgroundColor,
  reveal = true,
}) {
  const [copyRef, playCopy] = useCopyReveal();
  return (
    <div className={styles.frame} data-theme-section-frame>
      <section
        id={variant}
        className={`${styles["theme-section"]} ${styles[`theme-section--${variant}`]}`}
        style={{ backgroundColor, "--theme-art-color": backgroundColor }}
        data-name={variant}
        data-theme-section
      >
        <div className={styles["theme-section__content"]}>
          <div className={styles["theme-section__pin-header"]}>
            <RevealText
              as="p"
              className={styles["theme-section__index"]}
              enabled={reveal}
            >
              {index}
            </RevealText>
            <RevealText
              as="p"
              className={styles["theme-section__title"]}
              enabled={reveal}
            >
              {title}
            </RevealText>
          </div>


          <div className={styles["theme-section__pin-meta"]}>
            <div className={styles["theme-section__pin-meta-header"]}>
              <RevealText
                as="p"
                className={styles["theme-section__versus"]}
                enabled={reveal}
              >
                {versus}
              </RevealText>
              <RevealText
                as="p"
                className={styles["theme-section__side-label"]}
                enabled={reveal}
              >
                {sideLabel}
              </RevealText>
            </div>

            <div className={styles["theme-section__pin-meta-detail"]}>
              <div
                className={styles["content__rule"]}
                data-name="line"
                aria-hidden="true"
              >
                {/* Theme mark (same artwork as the Grants principle cards),
                    in the section colour on the dark box. */}
                <ThemeArtwork theme={variant} className={styles["theme-section__art"]} />
                <div className={styles["theme-section__rule-inset"]}>
                  <svg
                    className={styles["theme-section__rule-svg"]}
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 1400 1"
                  >
                    <path d="M0 0.5H1400" stroke="var(--theme-ink)" />
                  </svg>
                </div>
              </div>
              <div ref={copyRef} className={styles["content-wrap"]}>
                <div className={styles["content-wrap__question-wrap"]}>
                  <RevealText as="p" enabled={reveal} play={playCopy}>
                    {question}
                  </RevealText>
                </div>
                <div className={styles["content-wrap__description-wrap"]}>
                  <RevealText
                    as="p"
                    enabled={reveal}
                    play={playCopy}
                    delay={0.1}
                  >
                    {description}
                  </RevealText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
