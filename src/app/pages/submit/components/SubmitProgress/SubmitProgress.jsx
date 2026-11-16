import styles from "./SubmitProgress.module.scss";

export function SubmitProgress({
  activeStep = 1,
  compact = false,
  lineOnly = false,
  hideBar = false,
  progress = 0,
  className = "",
}) {
  const steps = ["Join", "Poster", "Consent"];

  return (
    <aside
      className={`${styles.progress} ${compact ? styles.compact : ""} ${activeStep === 2 ? styles.posterStep : ""} ${lineOnly ? styles.lineOnly : ""} ${hideBar ? styles.hideBar : ""} ${className}`}
      aria-label="Submission progress"
    >
      {/* Grows with each frame of the flow (`progress` 0–1). */}
      <div className={styles.progressBar} style={{ "--progress": progress }} />
      <ol>
        {steps.map((step, index) => (
          <li
            className={index + 1 === activeStep ? styles.active : ""}
            key={step}
          >
            ({String(index + 1).padStart(2, "0")})
            {index + 1 === activeStep && <span className={styles.stepLabel}> {step}</span>}
          </li>
        ))}
      </ol>
    </aside>
  );
}
