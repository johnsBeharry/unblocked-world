import React from 'react'
import styles from './OwnershipExploration.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function OwnershipExploration() {
  return (
    <section className={styles.section} data-name="exploration">
      <div className={styles.intro}>
        <p>
          <RevealText highlight as="span" className={styles.desktopCopy}>This theme invites creatives to question assumptions about control, authority, freedom, and the relationship between individuals and the things they claim as their own.</RevealText>
          <RevealText highlight as="span" className={styles.tabletCopy}>This theme invites creatives to question<br />assumptions about control, authority,<br />freedom, and the relationship between<br />individuals and the things they claim as their<br />own.</RevealText>
        </p>
      </div>
      <div className={styles.label}><RevealText as="p">Sec. 02 (Creative Exploration)</RevealText></div>
      <p className={styles.descriptionLeft}>
        <RevealText as="span" className={styles.desktopCopy}>Creative exploration often begins with questions rather than conclusions. What distinguishes ownership from access? What responsibilities come with control? What can truly be owned, and what remains beyond possession?</RevealText>
        <RevealText as="span" className={styles.tabletCopy}>Creative exploration often begins with questions rather than conclusions. What distinguishes ownership from access? What responsibilities come with control? What can truly be owned, and what remains beyond possession?</RevealText>
      </p>
      <p className={styles.descriptionRight}>
        <RevealText as="span" className={styles.desktopCopy}>Participants are encouraged to pursue unexpected directions and develop work that introduces curiosity, reflection, and discussion. Whether conceptual, abstract, narrative, or experimental, submissions should show meaningful engagement with the theme while offering a distinctive perspective.</RevealText>
        <RevealText as="span" className={styles.tabletCopy}>Participants are encouraged to pursue unexpected directions and develop work that introduces curiosity, reflection, and discussion. Whether conceptual, abstract, narrative, or experimental, submissions should show meaningful engagement with the theme while offering a distinctive perspective.</RevealText>
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
