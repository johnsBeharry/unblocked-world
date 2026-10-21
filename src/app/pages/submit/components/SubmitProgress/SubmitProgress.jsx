import React from 'react'
import styles from './SubmitProgress.module.scss'

export function SubmitProgress({ activeStep = 1, compact = false, lineOnly = false, hideBar = false }) {
  const steps = ['Contact', 'Poster', 'Consent']

  return (
    <aside className={`${styles.progress} ${compact ? styles.compact : ''} ${activeStep === 2 ? styles.posterStep : ''} ${lineOnly ? styles.lineOnly : ''} ${hideBar ? styles.hideBar : ''}`} aria-label="Submission progress">
      <div className={styles.progressBar} style={{ '--progress-width': `${(activeStep / steps.length) * 100}%` }} />
      <ol>
        {steps.map((step, index) => (
          <li className={index + 1 === activeStep ? styles.active : ''} key={step}>
            ({String(index + 1).padStart(2, '0')}){index + 1 === activeStep && ` ${step}`}
          </li>
        ))}
      </ol>
    </aside>
  )
}
