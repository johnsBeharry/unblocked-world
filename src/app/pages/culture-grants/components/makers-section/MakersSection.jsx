import { ProgramGridSection } from "../../../grants/components/program-grid-section/ProgramGridSection.jsx";
import { TunnelArtwork } from "../makers-artwork/TunnelArtwork";
import { BarsArtwork } from "../makers-artwork/BarsArtwork";
import { GlyphArtwork } from "../makers-artwork/GlyphArtwork";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import content from "./makers.json";
import styles from "./MakersSection.module.scss";

// Culture Grants "Sec. 01 Makers" on the shared ProgramGridSection shell
// (label, title, rule, card mask and rule motion). Desktop mockup: two
// spaces before "Makers"; mobile mockup: one.
export function MakersSection() {
  return (
    <ProgramGridSection
      id="makers-title"
      label={content.label}
      labelCompact={content.labelCompact}
      title={content.title}
      className={styles.makers}
    >
      <div className={`${styles["makers__card"]} ${styles["makers__card--tunnel"]}`} data-program-card>
        <TunnelArtwork />
      </div>

      <RevealText as="p" className={styles["makers__intro"]}>
        {content.intro}
      </RevealText>

      <RevealText as="p" className={styles["makers__scope"]}>
        {content.scope}
      </RevealText>

      <div className={`${styles["makers__card"]} ${styles["makers__card--bars"]}`} data-program-card>
        <BarsArtwork />
      </div>

      <div className={`${styles["makers__card"]} ${styles["makers__card--glyph"]}`} data-program-card>
        <GlyphArtwork />
      </div>
    </ProgramGridSection>
  );
}
