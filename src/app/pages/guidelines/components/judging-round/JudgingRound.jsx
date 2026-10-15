import React from 'react'
import styles from './JudgingRound.module.scss'
import { RuledList } from '../guideline-section/GuidelineSection.jsx'

export function JudgingRound({ title, status, description, items }) {
  return (
    <article className={styles.round}>
      <div className={styles.roundHeader}>
        <h3>{title}</h3>
        <div className={styles.roundStatus}>
          <span>Status</span>
          <span className={styles.statusLabel}>{status}</span>
        </div>
      </div>
      <div className={styles.roundContent}>
        <p>{description}</p>
        <RuledList items={items} />
      </div>
    </article>
  )
}
