import { RevealRow } from "../../../../../components/RevealRow/RevealRow.jsx";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { SectionLabel } from "../../../grants/components/section-label/SectionLabel.jsx";
import { ApplyLink } from "../apply-link/ApplyLink";
import content from "./application.json";
import styles from "./ApplicationSection.module.scss";

// Text uses the plain line reveal only (no scroll-linked motion on text);
// each step reveals with RevealRow, its rule drawing in with the content.
export function ApplicationSection() {
  return (
    <section className={styles.application} aria-labelledby="application-title">
      <SectionLabel className={styles["application__label"]}>{content.label}</SectionLabel>

      {/* Desktop keeps the mockup's three fixed lines; mobile wraps the same
          words naturally ("Reviewed every" shares a line). */}
      <h2 id="application-title" className={styles["application__title"]}>
        <span className={styles["application__title-lines"]}>
          {content.title.map((line) => (
            <RevealText key={line}>{line}</RevealText>
          ))}
        </span>
        <RevealText className={styles["application__title-flow"]}>
          {content.title.join(" ")}
        </RevealText>
      </h2>

      <ol className={styles["application__steps"]}>
        {content.steps.map((step) => (
          <RevealRow
            key={step.id}
            className={styles["application-step"]}
            contentClassName={styles["application-step__content"]}
          >
            <span className={styles["application-step__number"]}>{step.number}</span>
            <span className={styles["application-step__text"]}>{step.text}</span>
          </RevealRow>
        ))}
      </ol>

      <ApplyLink className={styles["application__apply"]} />
    </section>
  );
}
