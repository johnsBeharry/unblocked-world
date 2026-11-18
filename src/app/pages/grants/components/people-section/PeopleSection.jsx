import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { RevealRow } from "../../../../../components/RevealRow/RevealRow.jsx";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { prefersReducedMotion, revealFrames, slideApart } from "../../motion/scrollMotion.js";
import content from "./people-content.json";
import styles from "./PeopleSection.module.scss";

// Scroll experience: header words slide apart, photos open with a mask and
// zoom out. The photo columns stay aligned while scrolling (user request).
function usePeopleMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const [label, title] = root.querySelector("[data-people-header]").children;
      // The header words sit on one row only above the mobile breakpoint.
      if (!window.matchMedia("(max-width: 600px)").matches) slideApart(root, label, title);
      revealFrames(gsap.utils.toArray("[data-person-photo]", root), { zoom: 1.25 });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}

// Description segments: plain strings, or { text, href } for linked names
// (rendered underlined without a link until the URL is known).
function Description({ segments }) {
  return segments.map((segment, index) => {
    if (typeof segment === "string") return segment;
    const className = styles["person-card__link"];
    return segment.href ? (
      <a key={index} className={className} href={segment.href} target="_blank" rel="noreferrer">
        {segment.text}
      </a>
    ) : (
      <span key={index} className={className}>
        {segment.text}
      </span>
    );
  });
}

function PersonCard({ person }) {
  return (
    <li className={styles["person-card"]}>
      {/* Stationary mask (clip-path) with the zooming colour block + image. */}
      <div className={styles["person-card__photo"]} data-person-photo>
        <div className={styles["person-card__photo-fill"]}>
          {person.photo && (
            <img
              className={styles["person-card__image"]}
              src={person.photo}
              alt={person.name}
              loading="lazy"
            />
          )}
        </div>
      </div>
      <RevealText as="h4" className={styles["person-card__name"]}>
        {person.name}
      </RevealText>
      <RevealText as="p" className={styles["person-card__role"]}>
        {person.role}
      </RevealText>
      <RevealRow as="p" line={false} className={styles["person-card__description"]}>
        <Description segments={person.description} />
      </RevealRow>
    </li>
  );
}

export function PeopleSection() {
  const rootRef = useRef(null);
  usePeopleMotion(rootRef);

  return (
    <section
      ref={rootRef}
      className={styles["people-section"]}
      aria-labelledby="people-title"
    >
      <h2 id="people-title" className={styles["people-section__header"]} data-people-header>
        <RevealText>{content.label}</RevealText>
        <RevealText>{content.title}</RevealText>
      </h2>

      {content.groups.filter((group) => !group.hidden).map((group) => (
        <div
          key={group.id}
          className={`${styles["people-group"]} ${styles[`people-group--${group.id}`]}`}
        >
          <RevealRow
            as="h3"
            className={styles["people-group__title"]}
            lineClassName={styles["people-group__rule"]}
          >
            {group.title}
          </RevealRow>
          <ul className={styles["people-group__grid"]}>
            {group.people.filter((person) => !person.hidden).map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
