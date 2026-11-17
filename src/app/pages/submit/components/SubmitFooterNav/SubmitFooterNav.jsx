import React from 'react'
import styles from './SubmitFooterNav.module.scss'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { RollingText } from '../../../../../components/RollingText/RollingText.jsx'

export function SubmitFooterNav({ backHref = '/submit', nextHref = '#', nextLabel = 'Next', nextLabelMobile, onBack, onNext, disabled = false, className = '' }) {
  const nextText = nextLabelMobile
    ? <><span className={styles.labelDesktop}><RollingText text={`${nextLabel} (→)`} /></span><span className={styles.labelMobile}><RollingText text={`${nextLabelMobile} (→)`} /></span></>
    : <RollingText text={`${nextLabel} (→)`} />
  return (
    <nav className={`${styles.nav} ${className}`} aria-label="Submission navigation">
      {onBack ? <RevealRow as="button" line={false} pinned className={styles.link} type="button" onClick={onBack}><RollingText text="(←)" /></RevealRow> : <RevealRow as="a" line={false} pinned className={styles.link} href={backHref}><RollingText text="(←)" /></RevealRow>}
      {/* nextLabel null: the step renders its own next action (Sign in). */}
      {nextLabel && (onNext ? <RevealRow as="button" line={false} pinned className={styles.link} type="button" disabled={disabled} onClick={onNext}>{nextText}</RevealRow> : <RevealRow as="a" line={false} pinned className={styles.link} href={nextHref}>{nextText}</RevealRow>)}
    </nav>
  )
}
