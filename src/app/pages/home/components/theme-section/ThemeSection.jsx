import React from "react";
import styles from "./ThemeSection.module.scss";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";

export function ThemeSection({
  variant,
  title,
  index,
  question,
  description,
  sideLabel,
  versus = "(vs)",
  barCount,
  backgroundColor,
  reveal = true,
}) {
  return (
    <div className={styles.frame} data-theme-section-frame>
      <section
        id={variant}
        className={`${styles["theme-section"]} ${styles[`theme-section--${variant}`]}`}
        style={{ backgroundColor }}
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

        {/* <div className={styles["theme-section__art"]} aria-hidden="true">
          {Array.from({ length: barCount }, (_, i) => (
            <div
              key={i}
              className={`${styles["theme-section__bar"]} ${styles[`theme-section__bar--${String(i + 1).padStart(2, "0")}`]}`}
            />
          ))}
        </div> */}

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
            <div className={styles["content-wrap"]}>
              <div className={styles["content-wrap__question-wrap"]}>
                <RevealText as="p" enabled={reveal}>
                  {question}
                </RevealText>
              </div>
              <div className={styles["content-wrap__description-wrap"]}>
                <RevealText as="p" enabled={reveal}>
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
