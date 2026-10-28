import React from 'react'
import styles from './FaqAccordion.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function FaqAccordion({ question, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className={styles.root}>
      <summary className={`${styles.summary} ${children ? styles.contentfulSummary : ''}`}>
        <RevealText as="span">{question}</RevealText>
        <span aria-hidden="true" className={`${styles.icon} ${styles.expandIcon}`}>+</span>
        <span aria-hidden="true" className={`${styles.icon} ${styles.collapseIcon}`}>−</span>
      </summary>
      {children ? <div className={styles.content}>{children}</div> : null}
    </details>
  )
}
