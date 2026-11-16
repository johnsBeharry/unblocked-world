import { RevealText } from "../../../../../components/RevealText/RevealText";
import { ProgramGridSection } from "../../../grants/components/program-grid-section/ProgramGridSection.jsx";
import { EllipseStackArtwork } from "../intro-artwork/EllipseStackArtwork";
import { BalanceArtwork } from "../intro-artwork/BalanceArtwork";
import content from "./intro.json";
import styles from "./IntroSection.module.scss";

// Open Systems "Sec. 01 Intro" on the shared ProgramGridSection shell
// (label, title, rule, card mask and rule motion, like Culture Grants
// Makers). DOM order is the reading order; desktop placement is in the SCSS.
export function IntroSection() {
  return (
    <ProgramGridSection
      id="open-systems-intro-title"
      label={content.label}
      title={content.title}
      className={styles.intro}
    >
      <div className={`${styles["intro__card"]} ${styles["intro__card--ellipses"]}`} data-program-card>
        <EllipseStackArtwork />
      </div>

      <RevealText as="p" className={`${styles["intro__copy"]} ${styles["intro__copy--money"]}`}>
        {content.money}
      </RevealText>

      <RevealText as="p" className={`${styles["intro__copy"]} ${styles["intro__copy--intelligence"]}`}>
        {content.intelligence}
      </RevealText>

      <RevealText as="p" className={`${styles["intro__copy"]} ${styles["intro__copy--brief"]}`}>
        {content.brief}
      </RevealText>

      <div className={`${styles["intro__card"]} ${styles["intro__card--balance"]}`} data-program-card>
        <BalanceArtwork />
      </div>

      <RevealText as="p" className={`${styles["intro__copy"]} ${styles["intro__copy--support"]}`}>
        {content.support}
      </RevealText>
    </ProgramGridSection>
  );
}
