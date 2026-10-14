import React from 'react'
import styles from './OwnershipAbout.module.scss'

export function OwnershipAbout() {
  return (
    <section className={styles.about} data-name="about" aria-label="About the Ownership theme">
      <p className={styles.intro}>
        Ownership is more than possession—it shapes identity, responsibility, freedom and the relationship between people and the things they create, protect and value.
      </p>
      <div className={styles.label}>
        <p>Sec. 01 (About the Theme)</p>
      </div>
      <p className={styles.descriptionLeft}>
        Ownership is the first theme of UNBLOCKED, inviting artists, designers, and creative thinkers to explore one of the most enduring ideas in human society. While ownership is often associated with property and assets, it also influences how we understand autonomy, stewardship, access, memory, and personal agency.
      </p>
      <p className={styles.descriptionRight}>
        This open call encourages participants to move beyond conventional definitions and examine ownership through cultural, emotional, philosophical, and creative perspectives. The goal is not to communicate a single answer, but to expand the conversation through original visual expression and thoughtful interpretation.
      </p>
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
