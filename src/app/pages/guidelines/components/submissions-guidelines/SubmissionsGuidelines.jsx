import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";
import styles from "./SubmissionsGuidelines.module.scss";

export function SubmissionsGuidelines() {
  return (
    <section className={styles.hero} data-name="submissions-guidelines">
      {/* <SubmitArtwork className={styles.artwork} /> */}

      <div className={styles.heading}>
        <RevealText as="p">Submissions</RevealText>
        <p className={styles.wide}>
          <RevealText as="span">Guidelines (↓)</RevealText>
        </p>
        <p className={styles.compact}>
          <RevealText as="span">
            Guidelines
            <br />
            (↓)
          </RevealText>
        </p>
      </div>
    </section>
  );
}
