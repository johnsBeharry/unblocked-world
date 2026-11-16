import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { prefersReducedMotion } from "../../../grants/motion/scrollMotion.js";
import content from "./openSystem.json";
import styles from "./OpenSystemSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Rings measured from the 1440 × 800 mockup (720 × 800 panel, centre
// 360 / 400), outermost first = paint order (each disc covers the next).
const PANEL = { width: 720, height: 800, cx: 360, cy: 400 };
const RINGS = [
  { r: 483.5, tone: "light" },
  { r: 447.5, tone: "dark" },
  { r: 373.5, tone: "light" },
  { r: 320, tone: "dark" },
  { r: 230.5, tone: "light" },
];
const OPEN = { duration: 1, step: 0.18, ease: "power2.out" };

// Scroll experience on the artwork only (text keeps the plain line reveal):
// the rings open like an iris. Every disc starts at scale 0 (empty black panel) and grows
// from the centre, outermost first, so the rings unfold outward one after
// another while the panel scrolls in (scrubbed, reverses on upward scroll,
// ends on the mockup).
function useOpenSystemMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const panel = root.querySelector("[data-open-system-panel]");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top 85%",
          end: "bottom bottom",
          scrub: true,
        },
      });
      panel.querySelectorAll("circle").forEach((disc, index) => {
        timeline.fromTo(
          disc,
          { scale: 0, svgOrigin: `${PANEL.cx} ${PANEL.cy}` },
          { scale: 1, duration: OPEN.duration, ease: OPEN.ease },
          index * OPEN.step,
        );
      });
    }, root);
    return () => ctx.revert();
  }, [rootRef]);
}

export function OpenSystemSection() {
  const rootRef = useRef(null);
  useOpenSystemMotion(rootRef);

  return (
    <section ref={rootRef} className={styles["open-system"]} aria-labelledby="open-system-title">
      <div className={styles["open-system__copy"]}>
        <h2 id="open-system-title" className={styles["open-system__title"]}>
          {content.title.map((line) => (
            <RevealText key={line}>{line}</RevealText>
          ))}
        </h2>
        <RevealText as="p" className={styles["open-system__description"]}>
          {content.description}
        </RevealText>
      </div>

      <svg
        className={styles["open-system__panel"]}
        viewBox={`0 0 ${PANEL.width} ${PANEL.height}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        data-open-system-panel
      >
        <rect className={styles["open-system__ground"]} width={PANEL.width} height={PANEL.height} />
        {RINGS.map(({ r, tone }) => (
          <circle
            key={r}
            className={styles[`open-system__disc--${tone}`]}
            cx={PANEL.cx}
            cy={PANEL.cy}
            r={r}
          />
        ))}
      </svg>
    </section>
  );
}
