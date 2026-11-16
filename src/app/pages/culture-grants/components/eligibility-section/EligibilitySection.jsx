import { RevealRow } from "../../../../../components/RevealRow/RevealRow.jsx";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../../../grants/components/section-label/SectionLabel.jsx";
import content from "./eligibility.json";
import styles from "./EligibilitySection.module.scss";

// Text uses the plain line reveal only (no scroll-linked motion on text);
// group titles and criteria rows reveal with RevealRow, rules drawing in.
export function EligibilitySection() {
  return (
    <section className={styles.eligibility} aria-labelledby="eligibility-title">
      {/* Desktop mockup: two spaces before "Eligibility"; mobile mockup: one. */}
      <SectionLabel className={`${styles["eligibility__label"]} ${styles["eligibility__label--wide"]}`}>
        {content.label}
      </SectionLabel>
      <SectionLabel className={`${styles["eligibility__label"]} ${styles["eligibility__label--compact"]}`}>
        {content.labelCompact}
      </SectionLabel>

      <h2 id="eligibility-title" className={styles["eligibility__title"]}>
        {content.title.map((line) => (
          <RevealText key={line}>{line}</RevealText>
        ))}
      </h2>

      {content.groups.map((group, groupIndex) => {
        const isLastGroup = groupIndex === content.groups.length - 1;
        return (
          <div className={styles["eligibility-group"]} key={group.id}>
            {/* The group rule spans the full content width. */}
            <RevealRow
              as="h3"
              className={styles["eligibility-group__title"]}
              lineClassName={styles["eligibility-group__rule"]}
            >
              {group.title}
            </RevealRow>

            <ol className={styles["eligibility-group__list"]}>
              {group.items.map((item, index) => (
                <RevealRow
                  key={item.id}
                  className={styles["eligibility-item"]}
                  contentClassName={styles["eligibility-item__content"]}
                  lineClassName={styles["eligibility-item__rule"]}
                  // The next group's full rule closes the list above it.
                  line={isLastGroup || index < group.items.length - 1}
                >
                  <span>{item.number}</span>
                  <span>{item.text}</span>
                </RevealRow>
              ))}
            </ol>
          </div>
        );
      })}
    </section>
  );
}
