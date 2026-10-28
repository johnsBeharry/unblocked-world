import React from 'react'
import styles from './OwnershipProgramme.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function OwnershipProgramme() {
  return (
    <section className={styles.section} data-name="programme" aria-label="About the Programme">
      <RevealText as="p" className={styles.intro}>
        A creative programme bringing together diverse perspectives through participation, visual expression, public dialogue, and the collective exploration of ideas that shape culture and society.
      </RevealText>

      <div className={styles.label}>
        <RevealText as="p">Sec. 04 (About the Programme)</RevealText>
      </div>

      <RevealText as="p" className={styles.descriptionLeft}>
        Each edition centres on a single theme. Participants respond with one poster that interprets the theme through image, type, symbol, story, or system.
      </RevealText>

      <RevealText as="p" className={styles.descriptionRight}>
        Selected works may be featured in an online gallery, publication, exhibition, or other programme materials.
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
