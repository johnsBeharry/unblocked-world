import React from 'react'
import styles from './OwnershipHowItWorks.module.scss'
import patternUrl from './ownership-pattern.png'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

const STEPS = 'Read the contest overview (→) Review the current theme (→) Read the submission guidelines (→) Create an original poster (→) Submit your entry through the form (→)'

export function OwnershipHowItWorks() {
  return (
    <section className={styles.section} data-name="how-it-works" aria-label="How It Works">
      <div className={styles.label}>
        <RevealText as="p">Sec. 06 (How It Works)</RevealText>
      </div>

      <div className={styles.rule} aria-hidden="true" />

      <RevealText as="p" className={styles.steps}>{STEPS}</RevealText>

      <div className={styles.pattern} aria-hidden="true">
        <img src={patternUrl} alt="" />
      </div>

      <RevealText as="a" className={styles.submitLink} href="/submit">Submit Work (→)</RevealText>
    </section>
  )
}
