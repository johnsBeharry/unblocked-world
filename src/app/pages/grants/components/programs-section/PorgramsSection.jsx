import { RevealText } from "../../../../../components/RevealText/RevealText";
import styles from "./ProgramsSection.module.scss";

export function ProgramsSections() {
  return (
    <section className={styles.section}>
      <RevealText as="h1">Sec.01</RevealText>
      <RevealText as="p">
        There are two ways to work with us, direct grants for cultural
        exploration, and hands-on support for larger funding proposals.
      </RevealText>
      <RevealText as="p">(Programs)</RevealText>
      <div className={styles.blocks}>
        <div className={styles["blcoks__item"]}>
          <RevealText className={styles["blcoks__item-title"]}>
            Cultural Work
          </RevealText>

          <RevealText className={styles["blcoks__item-amount"]}>
            $500–$5,000
          </RevealText>

          <RevealText className={styles["blcoks__item-detail"]}>
            We support independent cultural work that challenges dominant
            narratives and reimagines the systems shaping our lives. Selected
            works will join the public UNBLOCKED archive and future
            limited-edition book.
          </RevealText>

          <div className={styles.cta}>
            <RevealText>
              <a href="#">(→)</a>
            </RevealText>
          </div>
        </div>
        <div className={styles["blcoks__item"]}></div>
      </div>
    </section>
  );
}
