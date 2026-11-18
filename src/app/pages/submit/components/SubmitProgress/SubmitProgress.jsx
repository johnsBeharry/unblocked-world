import styles from "./SubmitProgress.module.scss";
import { RevealRow } from "../../../../../components/RevealRow/RevealRow.jsx";
import content from "./submit-progress-content.json";

export function SubmitProgress({
  activeStep = 1,
  compact = false,
  lineOnly = false,
  hideBar = false,
  progress = 0,
  className = "",
}) {
  return (
    <aside
      className={`${styles.progress} ${compact ? styles.compact : ""} ${activeStep === 2 ? styles.posterStep : ""} ${lineOnly ? styles.lineOnly : ""} ${hideBar ? styles.hideBar : ""} ${className}`}
      aria-label={content.label}
    >
      {/* Grows with each frame of the flow (`progress` 0–1). */}
      <div className={styles.progressBar} style={{ "--progress": progress }} />
      <ol>
        {content.steps.map((step, index) => (
          <RevealRow
            as="li"
            line={false}
            pinned
            className={index + 1 === activeStep ? styles.active : ""}
            key={step}
          >
            ({String(index + 1).padStart(2, "0")})
            {index + 1 === activeStep && <span className={styles.stepLabel}> {step}</span>}
          </RevealRow>
        ))}
      </ol>
    </aside>
  );
}
