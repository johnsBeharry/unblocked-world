import { useRef } from "react";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { HeroArtwork } from "../arworks/hero-art/HeroArt";
import { useScrollMarquee } from "../../../../components/scroll-marquee/useScrollMarquee";
import styles from "./GrantsHero.module.scss";

// Two identical groups make the loop seamless; each group is wider than the
// viewport at every breakpoint.
const MARQUEE_GROUPS = ["main", "loop"];
const MARQUEE_ITEMS = 6;
const MARQUEE_SPEED = 3; // font sizes per second (60px/s at 20px text)

export function GrantsHero() {
  const marqueeRef = useRef(null);
  useScrollMarquee(marqueeRef, { speed: MARQUEE_SPEED });

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
        ref={marqueeRef}
        className={styles.marquee}
        role="img"
        aria-label="Progress is not inevitability"
      >
        <div className={styles["marquee__track"]} data-marquee-track>
          {MARQUEE_GROUPS.map((group) => (
            <div className={styles["marquee__group"]} key={group} aria-hidden="true">
              {Array.from({ length: MARQUEE_ITEMS }, (_, index) => (
                <span className={styles["marquee__item"]} key={index}>
                  Progress ≠ inevitability
                </span>
              ))}
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
              turn creative labour into raw material
              <br className={styles["copy-wrap__mobile-break"]} />—scraped, consumed, and
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
