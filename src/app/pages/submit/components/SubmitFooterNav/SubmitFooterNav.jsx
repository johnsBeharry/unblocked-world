import React from 'react'
import styles from './SubmitFooterNav.module.scss'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { RollingText } from '../../../../../components/RollingText/RollingText.jsx'
import content from './submit-footer-nav-content.json'

// Footer band of the Submit steps: "(←)" cell | next action. `nextLabel`
// null: the step renders its own next action (Sign In) and only (←) shows.
// The whole band (rule, divider and both actions) slides in as one unit
// (user request 2026-11-18): the nav is the RevealRow, the band its content.
export function SubmitFooterNav({ backHref = '/submit', nextHref = '#', nextLabel = content.next, nextLabelMobile, onBack, onNext, disabled = false, className = '' }) {
  const nextText = nextLabelMobile
    ? <>
        <span className={styles['footer-nav__label-desktop']}><RollingText text={`${nextLabel} ${content.nextArrow}`} /></span>
        <span className={styles['footer-nav__label-mobile']}><RollingText text={`${nextLabelMobile} ${content.nextArrow}`} /></span>
      </>
    : <RollingText text={`${nextLabel} ${content.nextArrow}`} />
  const back = styles['footer-nav__back']
  const next = styles['footer-nav__next']
  return (
    <RevealRow
      as="nav"
      line={false}
      pinned
      className={`${styles['footer-nav']} ${className}`}
      contentClassName={styles['footer-nav__band']}
      aria-label={content.label}
    >
      {onBack
        ? <button className={back} type="button" onClick={onBack}><RollingText text={content.back} /></button>
        : <a className={back} href={backHref}><RollingText text={content.back} /></a>}
      {nextLabel && (onNext
        ? <button className={next} type="button" disabled={disabled} onClick={onNext}>{nextText}</button>
        : <a className={next} href={nextHref}>{nextText}</a>)}
    </RevealRow>
  )
}
