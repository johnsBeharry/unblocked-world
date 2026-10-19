import React from 'react'
import styles from './OwnershipExploration.module.scss'

export function OwnershipExploration() {
  return (
    <section className={styles.section} data-name="exploration">
      <div className={styles.intro}>
        <p>
          <span className={styles.desktopCopy}>This theme invites creatives to question assumptions about control, authority, freedom, and the relationship between individuals and the things they claim as their own.</span>
          <span className={styles.tabletCopy}>This theme invites creatives to question<br />assumptions about control, authority,<br />freedom, and the relationship between<br />individuals and the things they claim as their<br />own.</span>
        </p>
      </div>
      <div className={styles.label}><p>Sec. 02 (Creative Exploration)</p></div>
      <p className={styles.descriptionLeft}>
        <span className={styles.desktopCopy}>Creative exploration often begins with questions rather than conclusions. What distinguishes ownership from access? What responsibilities come with control? What can truly be owned, and what remains beyond possession?</span>
        <span className={styles.tabletCopy}>Ownership is the first theme of UNBLOCKED,<br />inviting artists, designers, and creative<br />thinkers to explore one of the most enduring<br />ideas in human society. While ownership is<br />often associated with property and assets, it<br />also influences how we understand<br />autonomy, stewardship, access, memory,<br />and personal agency.</span>
      </p>
      <p className={styles.descriptionRight}>
        <span className={styles.desktopCopy}>Participants are encouraged to pursue unexpected directions and develop work that introduces curiosity, reflection, and discussion. Whether conceptual, abstract, narrative, or experimental, submissions should show meaningful engagement with the theme while offering a distinctive perspective.</span>
        <span className={styles.tabletCopy}>This open call encourages participants to<br />move beyond conventional definitions and<br />examine ownership through cultural,<br />emotional, philosophical, and creative<br />perspectives. The goal is not to communicate<br />a single answer, but to expand the<br />conversation through original visual<br />expression and thoughtful interpretation.</span>
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
