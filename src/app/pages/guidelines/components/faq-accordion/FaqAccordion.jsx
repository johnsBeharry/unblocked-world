import React from 'react'
import styles from './FaqAccordion.module.scss'

export function FaqAccordion({ question, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className={styles.root}>
      <summary className={`${styles.summary} ${children ? styles.contentfulSummary : ''}`}>
        <span>{question}</span>
        <span aria-hidden="true" className={`${styles.icon} ${styles.expandIcon}`}>+</span>
        <span aria-hidden="true" className={`${styles.icon} ${styles.collapseIcon}`}>−</span>
      </summary>
      {children ? <div className={styles.content}>{children}</div> : null}
    </details>
  )
}
