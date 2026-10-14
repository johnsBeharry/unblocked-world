import React from 'react'
import styles from './OwnershipExploration.module.scss'

export function OwnershipExploration() {
  return (
    <section className={styles.section} data-name="exploration">
      <div className={styles.intro}>
        <p>This theme invites creatives to question assumptions about control, authority, freedom, and the relationship between individuals and the things they claim as their own.</p>
      </div>
      <div className={styles.label}><p>Sec. 02 (Creative Exploration)</p></div>
      <p className={styles.descriptionLeft}>
        Creative exploration often begins with questions rather than conclusions. What distinguishes ownership from access? What responsibilities come with control? What can truly be owned, and what remains beyond possession?
      </p>
      <p className={styles.descriptionRight}>
        Participants are encouraged to pursue unexpected directions and develop work that introduces curiosity, reflection, and discussion. Whether conceptual, abstract, narrative, or experimental, submissions should show meaningful engagement with the theme while offering a distinctive perspective.
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
