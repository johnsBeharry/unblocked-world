import React from 'react'
import styles from './OwnershipHowItWorks.module.scss'
import patternUrl from './ownership-pattern.png'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import content from './ownership-how-it-works-content.json'

export function OwnershipHowItWorks() {
  return (
    <section className={styles.section} data-name="how-it-works" aria-label={content.label}>
      <div className={styles.label}>
        <RevealText as="p">{content.sectionLabel}</RevealText>
      </div>

      <div className={styles.rule} aria-hidden="true" />

      <RevealText as="p" className={styles.steps}>{content.steps}</RevealText>

      <div className={styles.pattern} aria-hidden="true">
        <img src={patternUrl} alt="" />
      </div>

      <RevealText as="a" rolling className={styles.submitLink} href={content.submitLink.href}>{content.submitLink.label}</RevealText>
    </section>
  )
}
