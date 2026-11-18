import styles from "./SubmitWorkSection.module.scss";
import { HeroArtwork } from "../../hero-artwork/HeroArtwork.jsx";
import { RevealText } from "../../../../components/RevealText/RevealText.jsx";
import { contentLines } from "../../../../components/ContentLines/ContentLines.jsx";

/** Export frame: 1440 × 800. Global Figma top:6576px normalized to local section origin. */
// Content (title lines, link targets, labels) comes from the footer's
// footer-content.json `cta` entry; `topLabel` is a string, or per-breakpoint copy
// ({ desktop, tablet, mobile }) for the poster variant.
export default function SubmitWorkSection({ variant = "default", content }) {
  const { title, titleMobile, href, topLabel, bottomLink } = content;
  return (
    <section
      className={`${styles["submit-work"]} ${styles["submit-work__el-000"]} ${variant === "poster" ? styles["submit-work--poster"] : ""}`}
      data-name="-"
    >
      <HeroArtwork
        className={styles["submit-work__el-001"]}
        disableScrollAnimation={true}
        scrollReveal
      />

      {/* The title is the section's main CTA; the link wraps the line
          reveals (RevealText flattens links placed inside it). */}
      <a className={styles["submit-work__title-link"]} href={href}>
        <span className={styles["submit-work__title-desktop"]}>
          <RevealText as="p" rolling="arrow" className={styles["submit-work__el-199"]}>
            {title[0]}
          </RevealText>
          <RevealText as="p" rolling="arrow" className={styles["submit-work__el-200"]}>
            {title[1]}
          </RevealText>
        </span>
        {titleMobile && (
          <span className={styles["submit-work__title-mobile"]}>
            {titleMobile.map((line) => (
              <RevealText key={line} as="p" rolling="arrow">
                {line}
              </RevealText>
            ))}
          </span>
        )}
      </a>
      {topLabel && (
        <p className={styles["submit-work__el-201"]}>
          {typeof topLabel === "string" ? (
            <RevealText as="span">{topLabel}</RevealText>
          ) : (
            <>
              <span className={styles["submit-work__top-label-desktop"]}>
                <RevealText as="span">{topLabel.desktop}</RevealText>
              </span>
              <span className={styles["submit-work__top-label-tablet"]}>
                <RevealText as="span">{contentLines(topLabel.tablet)}</RevealText>
              </span>
              <span className={styles["submit-work__top-label-mobile"]}>
                <RevealText as="span">{contentLines(topLabel.mobile)}</RevealText>
              </span>
            </>
          )}
        </p>
      )}
      {bottomLink && (
        <RevealText
          as="a"
          rolling
          className={styles["submit-work__brief-link"]}
          href={bottomLink.href}
        >
          {bottomLink.label}
        </RevealText>
      )}
    </section>
  );
}
