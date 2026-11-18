import React from 'react'
import styles from './OwnershipProgramme.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import content from './ownership-programme-content.json'

export function OwnershipProgramme() {
  return (
    <section className={styles.section} data-name="programme" aria-label={content.label}>
      <RevealText highlight as="p" className={styles.intro}>
        {content.intro}
      </RevealText>

      <div className={styles.label}>
        <RevealText as="p">{content.sectionLabel}</RevealText>
      </div>

      <RevealText as="p" className={styles.descriptionLeft}>
        {content.descriptionLeft}
      </RevealText>

      <RevealText as="p" className={styles.descriptionRight}>
        {content.descriptionRight}
      </RevealText>

      <div className={styles.rule} data-name="line" aria-hidden="true">
        <div className={styles.ruleInset}>
          <svg className={styles.ruleSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 1400 1">
            <path d="M0 0.5H1400" stroke="var(--stroke-0, #DC91A8)" />
          </svg>
        </div>
      </div>
    </section>
  )
}
