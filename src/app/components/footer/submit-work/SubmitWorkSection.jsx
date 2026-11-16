import styles from "./SubmitWorkSection.module.scss";
import { HeroArtwork } from "../../hero-artwork/HeroArtwork.jsx";
import { RevealText } from "../../../../components/RevealText/RevealText.jsx";

/** Export frame: 1440 × 800. Global Figma top:6576px normalized to local section origin. */
export default function SubmitWorkSection({
  variant = "default",
  titleLines = ["Submit", "Work (→)"],
  topLabel = "Current Theme (Ownership)",
  bottomLabel = "View Brief (→)",
  titleHref = "/submit",
  bottomHref = "/posters",
  showTopLabel = true,
  showBottomLabel = true,
}) {
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
      <a className={styles["submit-work__title-link"]} href={titleHref}>
        <span className={styles["submit-work__title-desktop"]}>
          <RevealText as="p" className={styles["submit-work__el-199"]}>
            {titleLines[0]}
          </RevealText>
          <RevealText as="p" className={styles["submit-work__el-200"]}>
            {titleLines[1]}
          </RevealText>
        </span>
        {variant === "poster" && (
          <span className={styles["submit-work__title-mobile"]}>
            <RevealText as="p">Read the</RevealText>
            <RevealText as="p">Guidelines</RevealText>
            <RevealText as="p">(→)</RevealText>
          </span>
        )}
      </a>
      {showTopLabel && topLabel && (
        <p className={styles["submit-work__el-201"]}>
          {variant === "poster" ? (
            <>
              <span className={styles["submit-work__top-label-desktop"]}>
                <RevealText as="span">{topLabel}</RevealText>
              </span>
              <span className={styles["submit-work__top-label-tablet"]}>
                <RevealText as="span">
                  Before You Submit. Make sure your work is
                  <br />
                  original, prepared in the correct format, and
                  <br />
                  connected to the current theme.
                </RevealText>
              </span>
              <span className={styles["submit-work__top-label-mobile"]}>
                <RevealText as="span">
                  Before You Submit. Make sure your
                  <br />
                  work is original, prepared in the
                  <br />
                  correct format, and connected to the
                  <br />
                  current theme.
                </RevealText>
              </span>
            </>
          ) : (
            <RevealText as="span">{topLabel}</RevealText>
          )}
        </p>
      )}
      {showBottomLabel && bottomLabel && (
        <RevealText as="a" className={styles["submit-work__brief-link"]} href={bottomHref}>
          {bottomLabel}
        </RevealText>
      )}
    </section>
  );
}
