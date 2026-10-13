import React from 'react'
import styles from './Footer.module.scss'
import SubmitWorkSection from './submit-work/SubmitWorkSection.jsx'

export const FOOTER_COLORS = { home: '#d9d9d9', poster: '#d9d9d9' }

export function Footer({ color = FOOTER_COLORS.home }) {
  return (
    <footer className={styles.footer} style={{ color }}>
      <div className={styles.main}>
        <p className={styles.brand}>UNBLOCKED</p>
        <p className={`${styles.text} ${styles.question}`}>Question Everything</p>
        <p className={`${styles.text} ${styles.explore}`}>Explore</p>
        <a className={styles.email} href="mailto:hello@unblocked.net">
          <p className={styles.emailText}><span>(h</span><span>ello@unblocked.net)</span></p>
        </a>
        <a className={`${styles.text} ${styles.ownership}`} href="/posters">Ownership</a>
        <a className={`${styles.text} ${styles.guidelines}`} href="/guidelines">Guidelines</a>
        <a className={`${styles.text} ${styles.submit}`} href="/submit">(→) Submit</a>
        <p className={`${styles.text} ${styles.copyright}`}>© Copyright&nbsp;2026</p>
        <a className={`${styles.text} ${styles.backToTop}`} href="#top">Back to Top (↑)</a>
        <p className={`${styles.text} ${styles.description}`}>Exploring ownership, permanence, energy and peers through art, design and culture.</p>
        <p className={`${styles.text} ${styles.socials}`}>Socials</p>
      </div>
      <div className={styles.cta}>
        <SubmitWorkSection />
      </div>
    </footer>
  )
}
