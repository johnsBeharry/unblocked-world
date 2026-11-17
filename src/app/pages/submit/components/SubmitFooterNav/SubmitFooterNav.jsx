import React from 'react'
import styles from './SubmitFooterNav.module.scss'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'

export function SubmitFooterNav({ backHref = '/submit', nextHref = '#', nextLabel = 'Next', nextLabelMobile, onBack, onNext, disabled = false, className = '' }) {
  const nextText = nextLabelMobile
    ? <><span className={styles.labelDesktop}>{nextLabel}</span><span className={styles.labelMobile}>{nextLabelMobile}</span></>
    : nextLabel
  return (
    <nav className={`${styles.nav} ${className}`} aria-label="Submission navigation">
      {onBack ? <RevealRow as="button" line={false} pinned className={styles.link} type="button" onClick={onBack}>(←)</RevealRow> : <RevealRow as="a" line={false} pinned className={styles.link} href={backHref}>(←)</RevealRow>}
      {/* nextLabel null: the step renders its own next action (Sign in). */}
      {nextLabel && (onNext ? <RevealRow as="button" line={false} pinned className={styles.link} type="button" disabled={disabled} onClick={onNext}>{nextText} (→)</RevealRow> : <RevealRow as="a" line={false} pinned className={styles.link} href={nextHref}>{nextText} (→)</RevealRow>)}
    </nav>
  )
}
