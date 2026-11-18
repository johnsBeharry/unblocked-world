import { useRef } from "react";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { HeroArtwork } from "../arworks/hero-art/HeroArt";
import { useScrollMarquee } from "../../../../components/scroll-marquee/useScrollMarquee";
import { contentLines } from "../../../../../components/ContentLines/ContentLines.jsx";
import styles from "./GrantsHero.module.scss";
import content from "./grants-hero-content.json";

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
        {content.title.map((line) => (
          <RevealText key={line} as="h1" className={styles["main-title"]}>
            {line}
          </RevealText>
        ))}
      </div>

      <div
        ref={marqueeRef}
        className={styles.marquee}
        role="img"
        aria-label={content.marquee.label}
      >
        <div className={styles["marquee__track"]} data-marquee-track>
          {MARQUEE_GROUPS.map((group) => (
            <div className={styles["marquee__group"]} key={group} aria-hidden="true">
              {Array.from({ length: MARQUEE_ITEMS }, (_, index) => (
                <span className={styles["marquee__item"]} key={index}>
                  {content.marquee.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className={styles["content-section"]}>
        <HeroArtwork label={content.artworkLabel} />
        <div className={styles["copy-wrap"]}>
          <RevealText as="p" className={styles["copy-wrap__ledge"]}>
            {content.intro}
          </RevealText>
          <div className={styles["copy-wrap__block"]}>
            {/* A paragraph given as lines breaks only on mobile (the
                breaks carry the mobile-only class). */}
            {content.copy.map((paragraph, index) => (
              <RevealText key={index}>
                {contentLines(paragraph, styles["copy-wrap__mobile-break"])}
              </RevealText>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
