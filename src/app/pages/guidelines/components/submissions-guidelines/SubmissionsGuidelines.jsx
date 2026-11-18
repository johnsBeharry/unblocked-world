import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";
import { contentLines } from "../../../../../components/ContentLines/ContentLines.jsx";
import styles from "./SubmissionsGuidelines.module.scss";
import content from "./submissions-guidelines-content.json";

export function SubmissionsGuidelines() {
  return (
    <section className={styles.hero} data-name="submissions-guidelines">
      {/* <SubmitArtwork className={styles.artwork} /> */}

      <div className={styles.heading}>
        <RevealText as="p">{content.title}</RevealText>
        <p className={styles.wide}>
          <RevealText as="span">{content.subtitle}</RevealText>
        </p>
        <p className={styles.compact}>
          <RevealText as="span">
            {contentLines(content.subtitleCompact)}
          </RevealText>
        </p>
      </div>
    </section>
  );
}
