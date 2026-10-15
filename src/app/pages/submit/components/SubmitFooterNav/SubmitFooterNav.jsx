import React from 'react'
import styles from './SubmitFooterNav.module.scss'

export function SubmitFooterNav({ backHref = '/submit', nextHref = '#', nextLabel = 'Next', onBack, onNext }) {
  return (
    <nav className={styles.nav} aria-label="Submission navigation">
      {onBack ? <button className={styles.link} type="button" onClick={onBack}>(←)</button> : <a className={styles.link} href={backHref}>(←)</a>}
      {onNext ? <button className={styles.link} type="button" onClick={onNext}>{nextLabel} (→)</button> : <a className={styles.link} href={nextHref}>{nextLabel} (→)</a>}
    </nav>
  )
}
