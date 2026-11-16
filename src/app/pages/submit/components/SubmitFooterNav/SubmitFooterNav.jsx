import React from 'react'
import styles from './SubmitFooterNav.module.scss'

export function SubmitFooterNav({ backHref = '/submit', nextHref = '#', nextLabel = 'Next', nextLabelMobile, onBack, onNext, disabled = false, className = '' }) {
  const nextText = nextLabelMobile
    ? <><span className={styles.labelDesktop}>{nextLabel}</span><span className={styles.labelMobile}>{nextLabelMobile}</span></>
    : nextLabel
  return (
    <nav className={`${styles.nav} ${className}`} aria-label="Submission navigation">
      {onBack ? <button className={styles.link} type="button" onClick={onBack}>(←)</button> : <a className={styles.link} href={backHref}>(←)</a>}
      {/* nextLabel null: the step renders its own next action (Sign in). */}
      {nextLabel && (onNext ? <button className={styles.link} type="button" disabled={disabled} onClick={onNext}>{nextText} (→)</button> : <a className={styles.link} href={nextHref}>{nextText} (→)</a>)}
    </nav>
  )
}
