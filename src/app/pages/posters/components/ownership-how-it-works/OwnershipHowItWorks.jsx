import React from 'react'
import styles from './OwnershipHowItWorks.module.scss'
import patternUrl from './ownership-pattern.png'

const STEPS = 'Read the contest overview (→) Review the current theme (→) Read the submission guidelines (→) Create an original poster (→) Submit your entry through the form (→)'

export function OwnershipHowItWorks() {
  return (
    <section className={styles.section} data-name="how-it-works" aria-label="How It Works">
      <div className={styles.label}>
        <p>Sec. 06 (How It Works)</p>
      </div>

      <div className={styles.rule} aria-hidden="true" />

      <p className={styles.steps}>{STEPS}</p>

      <div className={styles.pattern} aria-hidden="true">
        <img src={patternUrl} alt="" />
      </div>

      <a className={styles.submitLink} href="/submit">Submit Work (→)</a>
    </section>
  )
}
