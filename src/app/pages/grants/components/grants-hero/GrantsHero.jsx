import { RevealText } from "../../../../../components/RevealText/RevealText";
import { HeroArtwork } from "../arworks/hero-art/HeroArt";
import styles from "./GrantsHero.module.scss";

export function GrantsHero() {
  return (
    <section className={styles.hero} aria-labelledby="grants-title">
      <div className={styles.heading}>
        <RevealText as="h1" className={styles["main-title"]}>
          Residency &amp;
        </RevealText>
        <RevealText as="h1" className={styles["main-title"]}>
          Grant Programs
        </RevealText>
        <RevealText as="h1" className={styles["main-title"]}>
          for Creatives
        </RevealText>
      </div>

      <div
        className={styles.marquee}
        aria-label="Progress is not inevitability"
      >
        <div className={styles.marqueeTrack}>
          {Array.from({ length: 6 }, (_, index) => (
            <div className={styles["marquee-item"]}>
              <span className={styles["marquee-item__content"]} key={index}>
                <i aria-hidden="true" />
                Progress ≠ inevitability
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles["content-section"]}>
        <HeroArtwork />
        <div className={styles["copy-wrap"]}>
          <RevealText as="p" className={styles["copy-wrap__ledge"]}>
            We back artists, designers, filmmakers, and writers who make the
            hidden systems shaping our lives visible—and imagine how they could
            work differently.
          </RevealText>
          <div className={styles["copy-wrap__block"]}>
            <RevealText>
              The modern internet promised connection, but many platforms now
              turn creative labour into raw material—scraped, consumed, and
              resold without consent. This is not a rejection of technology. It
              is a refusal to treat its direction as predetermined. Creatives
              should have a say in the systems being built around them.
            </RevealText>
            <RevealText>
              Supported by a founding grant from Spiral and private patrons, we
              bring creative practice into conversations about open money, open
              intelligence, and the systems shaping culture, technology, and
              everyday life.
            </RevealText>
          </div>
        </div>
      </section>
    </section>
  );
}
