import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../../../grants/components/section-label/SectionLabel.jsx";
import { prefersReducedMotion } from "../../../grants/motion/scrollMotion";
import content from "./directions-content.json";
import styles from "./DirectionsSection.module.scss";

// Scroll experience (real time, no reveal): the tags sit on a drum that
// turns with the scroll. An "active" position runs continuously down the
// list while the list scrolls through the middle of the viewport (first
// tag at the start, as the mockup, last tag at the end; reverses on upward
// scroll). Each tag sits at angle θ = (index − position) × STEP on a circle
// whose radius makes neighbouring tags touch at the front (arc = tag
// height): it moves to y = R·sin θ, back to z = R·(cos θ − 1) and tilts by
// θ, so with the list's perspective (origin on the active position) the
// stack curves away like a wheel; tags past 90° (the back of the drum) are
// hidden. The pink also fades into the ground by half per step (d = 1 is
// the mockup's 50% tag). Written directly per scroll update; reduced
// motion keeps the flat mockup.
const PINK = [245, 70, 164];
const GROUND = [16, 16, 16];
const STEP = 10; // deg between neighbouring tags (smaller = wider drum)
const FADE = 0.5; // pink share kept per step away
const MIN_PINK = 0.12;
const RAD = Math.PI / 180;

function paintTags(list, tags, position) {
  const height = tags[0].offsetHeight;
  const radius = height / (STEP * RAD);
  const activeY = (position + 0.5) * height;
  list.style.perspectiveOrigin = `50% ${activeY}px`;
  tags.forEach((tag, index) => {
    const offset = index - position;
    const angle = offset * STEP;
    if (Math.abs(angle) >= 90) {
      tag.style.visibility = "hidden";
      return;
    }
    const y = radius * Math.sin(angle * RAD) - offset * height;
    const z = radius * (Math.cos(angle * RAD) - 1);
    const pink = Math.max(MIN_PINK, FADE ** Math.abs(offset));
    const [r, g, b] = PINK.map((value, channel) =>
      Math.round(GROUND[channel] + (value - GROUND[channel]) * pink),
    );
    tag.style.visibility = "";
    tag.style.backgroundColor = `rgb(${r} ${g} ${b})`;
    tag.style.transform = `translate3d(0, ${y}px, ${z}px) rotateX(${-angle}deg)`;
  });
}

// Mobile (mobile mixin, ≤600px) keeps the plain mockup list: no drum.
const DRUM_QUERY = "(min-width: 601px)";

function useDirectionTrack(listRef) {
  useLayoutEffect(() => {
    const list = listRef.current;
    if (prefersReducedMotion()) return undefined;
    const tags = [...list.children];
    const track = (progress) => paintTags(list, tags, progress * (tags.length - 1));
    const mm = gsap.matchMedia();
    mm.add(DRUM_QUERY, () => {
      const trigger = ScrollTrigger.create({
        trigger: list,
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => track(self.progress),
        onRefresh: (self) => track(self.progress),
      });
      return () => {
        trigger.kill();
        list.style.removeProperty("perspective-origin");
        tags.forEach((tag) => tag.removeAttribute("style"));
      };
    });
    return () => mm.revert();
  }, [listRef]);
}

// Open Systems "Sec. 02 Guidelines": grey title, the stacked direction tags
// and the closing note.
export function DirectionsSection() {
  const listRef = useRef(null);
  useDirectionTrack(listRef);

  return (
    <section className={styles.directions} aria-labelledby="open-systems-directions-title">
      <SectionLabel className={styles["directions__label"]}>{content.label}</SectionLabel>

      <RevealText as="h2" id="open-systems-directions-title" className={styles["directions__title"]}>
        {content.title}
      </RevealText>

      <ul ref={listRef} className={styles["directions__list"]}>
        {content.directions.map((direction, index) => (
          <li
            key={direction}
            className={styles["directions__tag"]}
            data-active={index === 0 ? "" : undefined}
          >
            {direction}
          </li>
        ))}
      </ul>

      <RevealText as="p" className={styles["directions__note"]}>
        {content.note}
      </RevealText>
    </section>
  );
}
