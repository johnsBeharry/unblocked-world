import { RevealRow } from "../../../../../components/RevealRow/RevealRow.jsx";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../section-label/SectionLabel.jsx";
import styles from "./ProgramListSection.module.scss";

// Numbered list section of the grant program pages (Culture Grants
// "Eligibility Criteria", Open Systems "Our Role"): label, two-line title,
// then groups. Each group head sits in the left column with a full-width
// rule; it is either a 40px `title` or `intro` paragraphs (20px). Rows sit
// in the right column with a rule under each. Content comes from the page's
// JSON. Text uses the plain line reveal only; group heads and rows reveal
// with RevealRow, rules drawing in (no RevealText inside a RevealRow).
export function ProgramListSection({ id, content, className = "" }) {
  return (
    <section className={`${styles["program-list"]} ${className}`} aria-labelledby={id}>
      {/* Desktop mockups: two spaces after "Sec. 0X"; mobile mockup: one. */}
      <SectionLabel className={`${styles["program-list__label"]} ${styles["program-list__label--wide"]}`}>
        {content.label}
      </SectionLabel>
      <SectionLabel className={`${styles["program-list__label"]} ${styles["program-list__label--compact"]}`}>
        {content.labelCompact}
      </SectionLabel>

      <h2 id={id} className={styles["program-list__title"]}>
        {content.title.map((line) => (
          <RevealText key={line}>{line}</RevealText>
        ))}
      </h2>

      {content.groups.map((group, groupIndex) => {
        const isLastGroup = groupIndex === content.groups.length - 1;
        return (
          <div className={styles["program-list-group"]} key={group.id}>
            {/* The group rule spans the full content width. */}
            {group.intro ? (
              <RevealRow
                as="div"
                className={styles["program-list-group__intro"]}
                lineClassName={styles["program-list-group__rule"]}
              >
                {group.intro.map((paragraph) => (
                  <span className={styles["program-list-group__paragraph"]} key={paragraph}>
                    {paragraph}
                  </span>
                ))}
              </RevealRow>
            ) : (
              <RevealRow
                as="h3"
                className={styles["program-list-group__title"]}
                lineClassName={styles["program-list-group__rule"]}
              >
                {group.title}
              </RevealRow>
            )}

            <ol className={styles["program-list-group__list"]}>
              {group.items.map((item, index) => (
                <RevealRow
                  key={item.id}
                  className={styles["program-list-item"]}
                  contentClassName={styles["program-list-item__content"]}
                  lineClassName={styles["program-list-item__rule"]}
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
