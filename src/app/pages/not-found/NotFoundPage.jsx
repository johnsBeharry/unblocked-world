import { useRef } from "react";
import { RevealText } from "../../../components/RevealText/RevealText.jsx";
import { RollingText } from "../../../components/RollingText/RollingText.jsx";
import { contentLines } from "../../../components/ContentLines/ContentLines.jsx";
import { useScrollMarquee } from "../../components/scroll-marquee/useScrollMarquee.js";
import styles from "./NotFoundPage.module.scss";
import content from "./not-found-content.json";

// Enough rows to fill a portrait screen; the section clips the rest.
const MARQUEE_ROWS = ["first", "second", "third", "fourth", "fifth", "sixth"];
// Two identical groups make the loop seamless; four digit pairs keep each
// group wider than the viewport.
const MARQUEE_GROUPS = ["main", "loop"];
const MARQUEE_PAIRS = 4;
const MARQUEE_SPEED = 0.25; // font sizes per second (~114px/s at 1440)

// One "404040…" row. Every second row starts on the other digit (as in the
// reference) and runs the other way.
function MarqueeRow({ index }) {
  const rowRef = useRef(null);
  const reverse = index % 2 === 1;
  useScrollMarquee(rowRef, { speed: MARQUEE_SPEED, reverse });
  const pair = reverse
    ? [...content.marquee.pair].reverse().join("")
    : content.marquee.pair;

  return (
    <div ref={rowRef} className={styles["not-found__marquee-row"]}>
      <div className={styles["not-found__marquee-track"]} data-marquee-track>
        {MARQUEE_GROUPS.map((group) => (
          <span key={group} className={styles["not-found__marquee-group"]}>
            {pair.repeat(MARQUEE_PAIRS)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <main className={styles["not-found"]}>
      <div
        className={styles["not-found__marquee"]}
        role="img"
        aria-label={content.marquee.label}
      >
        <div aria-hidden="true">
          {MARQUEE_ROWS.map((row, index) => (
            <MarqueeRow key={row} index={index} />
          ))}
        </div>
      </div>

      <div className={styles["not-found__footer"]}>
        <RevealText as="h1" className={styles["not-found__title"]}>
          {content.title}
        </RevealText>
        <div className={styles["not-found__aside"]}>
          <RevealText as="p" className={styles["not-found__message"]}>
            {contentLines(content.message)}
          </RevealText>
          <a className={styles["not-found__back"]} href={content.back.href}>
            <RollingText text={content.back.label} />
          </a>
        </div>
      </div>
    </main>
  );
}
