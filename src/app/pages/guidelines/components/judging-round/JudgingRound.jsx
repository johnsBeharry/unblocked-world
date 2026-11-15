import React from 'react'
import styles from './JudgingRound.module.scss'
import { RuledList } from '../guideline-section/GuidelineSection.jsx'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function JudgingRound({ title, status, description, items }) {
  return (
    <article className={styles.round}>
      <div className={styles.roundHeader}>
        <RevealText as="h3">{title}</RevealText>
        <div className={styles.roundStatus}>
          <RevealText as="span">Status</RevealText>
          <span className={styles.statusLabel}><RevealText as="span">{status}</RevealText></span>
        </div>
      </div>
      <div className={styles.roundContent}>
        <RevealText as="p">{description}</RevealText>
        <RuledList items={items} />
      </div>
    </article>
  )
}
