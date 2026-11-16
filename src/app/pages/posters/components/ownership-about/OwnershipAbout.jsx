import React from 'react'
import styles from './OwnershipAbout.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function OwnershipAbout() {
  return (
    <section id="ownership-theme" className={styles.about} data-name="about" aria-label="About the Ownership theme">
      <p className={styles.intro}>
        <RevealText highlight as="span" className={styles.desktopCopy}>Ownership is more than possession—it shapes identity, responsibility, freedom and the relationship between people and the things they create, protect and value.</RevealText>
        <RevealText highlight as="span" className={styles.mobileCopy}>Ownership is more than<br />possession—it shapes identity,<br />responsibility, freedom and the<br />relationship between people<br />and the things they create,<br />protect and value.</RevealText>
      </p>
      <div className={styles.label}>
        <RevealText as="p">Sec. 01 (About the Theme)</RevealText>
      </div>
      <p className={styles.descriptionLeft}>
        <RevealText as="span" className={styles.desktopCopy}>Ownership is the first theme of UNBLOCKED, inviting artists, designers, and creative thinkers to explore one of the most enduring ideas in human society. While ownership is often associated with property and assets, it also influences how we understand autonomy, stewardship, access, memory, and personal agency.</RevealText>
        <RevealText as="span" className={styles.landscapeCopy}>Ownership is the first theme of UNBLOCKED,<br />inviting artists, designers, and creative<br />thinkers to explore one of the most enduring<br />ideas in human society. While ownership is<br />often associated with property and assets, it<br />also influences how we understand<br />autonomy, stewardship, access, memory,<br />and personal agency.</RevealText>
        <RevealText as="span" className={styles.mobileCopy}>Ownership is the first theme of<br />UNBLOCKED, inviting artists,<br />designers, and creative thinkers to<br />explore one of the most enduring<br />ideas in human society. While<br />ownership is often associated with<br />property and assets, it also<br />influences how we understand<br />autonomy, stewardship, access,<br />memory, and personal agency.</RevealText>
      </p>
      <p className={styles.descriptionRight}>
        <RevealText as="span" className={styles.desktopCopy}>This open call encourages participants to move beyond conventional definitions and examine ownership through cultural, emotional, philosophical, and creative perspectives. The goal is not to communicate a single answer, but to expand the conversation through original visual expression and thoughtful interpretation.</RevealText>
        <RevealText as="span" className={styles.landscapeCopy}>This open call encourages participants to<br />move beyond conventional definitions and<br />examine ownership through cultural,<br />emotional, philosophical, and creative<br />perspectives. The goal is not to communicate<br />a single answer, but to expand the<br />conversation through original visual<br />expression and thoughtful interpretation.</RevealText>
        <RevealText as="span" className={styles.mobileCopy}>This open call encourages<br />participants to move beyond<br />conventional definitions and examine<br />ownership through cultural,<br />emotional, philosophical, and creative<br />perspectives. The goal is not to<br />communicate a single answer, but to<br />expand the conversation through<br />original visual expression and<br />thoughtful interpretation.</RevealText>
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
