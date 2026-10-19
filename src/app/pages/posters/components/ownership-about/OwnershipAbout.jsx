import React from 'react'
import styles from './OwnershipAbout.module.scss'

export function OwnershipAbout() {
  return (
    <section className={styles.about} data-name="about" aria-label="About the Ownership theme">
      <p className={styles.intro}>
        <span className={styles.desktopCopy}>Ownership is more than possession—it shapes identity, responsibility, freedom and the relationship between people and the things they create, protect and value.</span>
        <span className={styles.mobileCopy}>Ownership is more than<br />possession—it shapes identity,<br />responsibility, freedom and the<br />relationship between people<br />and the things they create,<br />protect and value.</span>
      </p>
      <div className={styles.label}>
        <p>Sec. 01 (About the Theme)</p>
      </div>
      <p className={styles.descriptionLeft}>
        <span className={styles.desktopCopy}>We mistake access for ownership. We mistake convenience for control. We mistake permission for freedom. What happens when the things that matter most no longer belong to us?</span>
        <span className={styles.landscapeCopy}>Ownership is the first theme of UNBLOCKED,<br />inviting artists, designers, and creative<br />thinkers to explore one of the most enduring<br />ideas in human society. While ownership is<br />often associated with property and assets, it<br />also influences how we understand<br />autonomy, stewardship, access, memory,<br />and personal agency.</span>
        <span className={styles.mobileCopy}>We mistake access for ownership. We<br />mistake convenience for control. We<br />mistake permission for freedom.<br />What happens when the things that<br />matter most no longer belong to us?</span>
      </p>
      <p className={styles.descriptionRight}>
        <span className={styles.desktopCopy}>This open call encourages participants to move beyond conventional definitions and examine ownership through cultural, emotional, philosophical, and creative perspectives. The goal is not to communicate a single answer, but to expand the conversation through original visual expression and thoughtful interpretation.</span>
        <span className={styles.landscapeCopy}>This open call encourages participants to<br />move beyond conventional definitions and<br />examine ownership through cultural,<br />emotional, philosophical, and creative<br />perspectives. The goal is not to communicate<br />a single answer, but to expand the<br />conversation through original visual<br />expression and thoughtful interpretation.</span>
        <span className={styles.mobileCopy}>This open call encourages<br />participants to move beyond<br />conventional definitions and examine<br />ownership through cultural,<br />emotional, philosophical, and creative<br />perspectives. The goal is not to<br />communicate a single answer, but to<br />expand the conversation through<br />original visual expression and<br />thoughtful interpretation.</span>
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
