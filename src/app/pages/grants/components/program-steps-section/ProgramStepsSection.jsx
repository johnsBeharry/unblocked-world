import { RevealRow } from "../../../../../components/RevealRow/RevealRow.jsx";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../section-label/SectionLabel.jsx";
import { ApplyLink } from "../apply-link/ApplyLink";
import styles from "./ProgramStepsSection.module.scss";

// Steps section of the grant program pages (Culture Grants "Application",
// Open Systems "How the process works"): label, title over columns 3–4,
// numbered steps flowing from column 3 over the four-column grid, then
// Apply Now. Content comes from the page's JSON. Text uses the plain line
// reveal only (no scroll-linked motion on text); each step reveals with
// RevealRow, its rule drawing in with the content.
export function ProgramStepsSection({ id, content, className = "" }) {
  return (
    <section className={`${styles["program-steps"]} ${className}`} aria-labelledby={id}>
      <SectionLabel className={styles["program-steps__label"]}>{content.label}</SectionLabel>

      {/* Desktop keeps the mockup's fixed lines; mobile wraps the same words
          naturally (Culture Grants: "Reviewed every" shares a line). */}
      <h2 id={id} className={styles["program-steps__title"]}>
        <span className={styles["program-steps__title-lines"]}>
          {content.title.map((line) => (
            <RevealText key={line}>{line}</RevealText>
          ))}
        </span>
        <RevealText className={styles["program-steps__title-flow"]}>
          {content.title.join(" ")}
        </RevealText>
      </h2>

      <ol className={styles["program-steps__steps"]}>
        {content.steps.map((step) => (
          <RevealRow
            key={step.id}
            className={styles["program-step"]}
            contentClassName={styles["program-step__content"]}
          >
            <span className={styles["program-step__number"]}>{step.number}</span>
            <span className={styles["program-step__text"]}>{step.text}</span>
          </RevealRow>
        ))}
      </ol>

      <ApplyLink className={styles["program-steps__apply"]} />
    </section>
  );
}
