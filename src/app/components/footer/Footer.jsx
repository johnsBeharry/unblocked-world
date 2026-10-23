import React from 'react'
import styles from './Footer.module.scss'
import SubmitWorkSection from './submit-work/SubmitWorkSection.jsx'

export const FOOTER_COLORS = { home: '#d9d9d9', poster: '#d9d9d9' }

export function Footer({ color = FOOTER_COLORS.home, ctaVariant = 'default' }) {
  const colorClass = color === FOOTER_COLORS.poster ? styles.posterColor : styles.homeColor
  const ctaProps = ctaVariant === 'poster'
    ? {
        variant: 'poster',
        titleLines: ['Read the', 'Guidelines (→)'],
        topLabel: 'Before You Submit. Make sure your work is original, prepared in the correct format, and connected to the current theme.',
        bottomLabel: '',
      }
    : ctaVariant === 'guidelines'
      ? {
          titleLines: ['Submit', 'Entry (→)'],
          showTopLabel: false,
          showBottomLabel: false,
        }
    : {}

  return (
    <footer className={`${styles.footer} ${colorClass}`}>
      <div className={styles.cta}>
        <SubmitWorkSection {...ctaProps} />
      </div>
      <div className={styles.main}>
        <p className={styles.brand} data-page-static>UNBLOCKED</p>
        <p className={`${styles.text} ${styles.question}`}>Question Everything</p>
        <p className={`${styles.text} ${styles.explore}`}>Explore</p>
        <a className={styles.email} href="mailto:hello@unblocked.net">
          <p className={styles.emailText}><span>(h</span><span>ello@unblocked.net)</span></p>
        </a>
        <a className={`${styles.text} ${styles.ownership}`} href="/posters">Ownership</a>
        <a className={`${styles.text} ${styles.guidelines}`} href="/guidelines">Guidelines</a>
        <a className={`${styles.text} ${styles.submit}`} href="/submit">(→) Submit</a>
        <a className={`${styles.text} ${styles.instagram}`} href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a className={`${styles.text} ${styles.twitter}`} href="https://twitter.com" target="_blank" rel="noreferrer">Twitter (X)</a>
        <p className={`${styles.text} ${styles.copyright}`}>© Copyright&nbsp;2026</p>
        <a className={`${styles.text} ${styles.backToTop}`} href="#top">Back to Top (↑)</a>
        <p className={`${styles.text} ${styles.description}`}>Exploring ownership, permanence, energy and peers through art, design and culture. Built through participation, dialogue and creative expression.</p>
        <p className={`${styles.text} ${styles.socials}`}>Socials</p>
      </div>
    </footer>
  )
}
