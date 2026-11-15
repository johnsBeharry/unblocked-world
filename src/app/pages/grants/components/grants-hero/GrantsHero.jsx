import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { HeroArtwork } from "../arworks/hero-art/HeroArt";
import styles from "./GrantsHero.module.scss";

// Two identical groups make the loop seamless; each group is wider than the
// viewport at every breakpoint.
const MARQUEE_GROUPS = ["main", "loop"];
const MARQUEE_ITEMS = 6;
const MARQUEE_SPEED = 3; // font sizes per second (60px/s at 20px text)
const MARQUEE_TURN = 0.08; // easing toward the new direction per 60fps frame

// Moves left while the page scrolls down and right while it scrolls up,
// easing through the turn instead of snapping.
function useScrollMarquee(marqueeRef) {
  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = marquee?.querySelector("[data-marquee-track]");
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const setX = gsap.quickSetter(track, "x", "px");
    let speed = 0;
    const measure = () => {
      speed = MARQUEE_SPEED * parseFloat(getComputedStyle(marquee).fontSize);
    };
    measure();
    let x = 0;
    let direction = -1;
    let velocity = -1;
    let lastScroll = window.scrollY;

    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (delta) direction = delta > 0 ? -1 : 1;
    };
    const tick = (time, deltaTime) => {
      const groupWidth = track.scrollWidth / MARQUEE_GROUPS.length;
      if (!groupWidth) return;
      const turn = 1 - (1 - MARQUEE_TURN) ** (deltaTime / (1000 / 60));
      velocity += (direction - velocity) * turn;
      x = gsap.utils.wrap(-groupWidth, 0, x + (velocity * speed * deltaTime) / 1000);
      setX(x);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      gsap.ticker.remove(tick);
    };
  }, [marqueeRef]);
}

export function GrantsHero() {
  const marqueeRef = useRef(null);
  useScrollMarquee(marqueeRef);

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
