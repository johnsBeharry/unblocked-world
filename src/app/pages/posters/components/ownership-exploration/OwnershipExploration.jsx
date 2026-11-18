import React from 'react'
import styles from './OwnershipExploration.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { contentLines } from '../../../../../components/ContentLines/ContentLines.jsx'
import content from './ownership-exploration-content.json'

export function OwnershipExploration() {
  return (
    <section className={styles.section} data-name="exploration">
      <div className={styles.intro}>
        <p>
          <RevealText highlight as="span" className={styles.desktopCopy}>{content.intro.desktop}</RevealText>
          <RevealText highlight as="span" className={styles.tabletCopy}>{contentLines(content.intro.tablet)}</RevealText>
        </p>
      </div>
      <div className={styles.label}><RevealText as="p">{content.sectionLabel}</RevealText></div>
      <p className={styles.descriptionLeft}>
        <RevealText as="span" className={styles.desktopCopy}>{content.descriptionLeft}</RevealText>
        <RevealText as="span" className={styles.tabletCopy}>{content.descriptionLeft}</RevealText>
      </p>
      <p className={styles.descriptionRight}>
        <RevealText as="span" className={styles.desktopCopy}>{content.descriptionRight}</RevealText>
        <RevealText as="span" className={styles.tabletCopy}>{content.descriptionRight}</RevealText>
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
