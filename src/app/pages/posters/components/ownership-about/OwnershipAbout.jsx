import React from 'react'
import styles from './OwnershipAbout.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { contentLines } from '../../../../../components/ContentLines/ContentLines.jsx'
import content from './ownership-about-content.json'

export function OwnershipAbout() {
  return (
    <section id="ownership-theme" className={styles.about} data-name="about" aria-label={content.label}>
      <p className={styles.intro}>
        <RevealText highlight as="span" className={styles.desktopCopy}>{content.intro.desktop}</RevealText>
        <RevealText highlight as="span" className={styles.mobileCopy}>{contentLines(content.intro.mobile)}</RevealText>
      </p>
      <div className={styles.label}>
        <RevealText as="p">{content.sectionLabel}</RevealText>
      </div>
      <p className={styles.descriptionLeft}>
        <RevealText as="span" className={styles.desktopCopy}>{content.descriptionLeft.desktop}</RevealText>
        <RevealText as="span" className={styles.landscapeCopy}>{contentLines(content.descriptionLeft.landscape)}</RevealText>
        <RevealText as="span" className={styles.mobileCopy}>{contentLines(content.descriptionLeft.mobile)}</RevealText>
      </p>
      <p className={styles.descriptionRight}>
        <RevealText as="span" className={styles.desktopCopy}>{content.descriptionRight.desktop}</RevealText>
        <RevealText as="span" className={styles.landscapeCopy}>{contentLines(content.descriptionRight.landscape)}</RevealText>
        <RevealText as="span" className={styles.mobileCopy}>{contentLines(content.descriptionRight.mobile)}</RevealText>
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
