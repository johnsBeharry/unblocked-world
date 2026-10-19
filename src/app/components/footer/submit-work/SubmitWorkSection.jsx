import React from 'react'
import styles from './SubmitWorkSection.module.scss'
import { SubmitArtwork } from '../submit-artwork/SubmitArtwork.jsx'

/** Export frame: 1440 × 800. Global Figma top:6576px normalized to local section origin. */
export default function SubmitWorkSection({
  variant = 'default',
  titleLines = ['Submit', 'Work (→)'],
  topLabel = 'Current Theme (Ownership)',
  bottomLabel = 'View Brief (→)',
  showTopLabel = true,
  showBottomLabel = true,
}) {
  return (
    <section className={`${styles['submit-work']} ${styles['submit-work__el-000']} ${variant === 'poster' ? styles['submit-work--poster'] : ''}`} data-name="-">
      <SubmitArtwork className={styles['submit-work__legacy-art']} />
      <div className={styles['submit-work__el-198']}>
        <span className={styles['submit-work__title-desktop']}>
          <p className={styles['submit-work__el-199']}>{titleLines[0]}</p>
          <p className={styles['submit-work__el-200']}>{titleLines[1]}</p>
        </span>
        {variant === 'poster' && (
          <span className={styles['submit-work__title-mobile']}>
            <p>Read the</p>
            <p>Guidelines</p>
            <p>(→)</p>
          </span>
        )}
      </div>
      {showTopLabel && topLabel && (
        <p className={styles['submit-work__el-201']}>
          {variant === 'poster' ? (
            <>
              <span className={styles['submit-work__top-label-desktop']}>{topLabel}</span>
              <span className={styles['submit-work__top-label-tablet']}>
                Before You Submit. Make sure your work is<br />
                original, prepared in the correct format, and<br />
                connected to the current theme.
              </span>
              <span className={styles['submit-work__top-label-mobile']}>
                Before You Submit. Make sure your<br />
                work is original, prepared in the<br />
                correct format, and connected to the<br />
                current theme.
              </span>
            </>
          ) : topLabel}
        </p>
      )}
      {showBottomLabel && bottomLabel && <p className={styles['submit-work__el-202']}>{bottomLabel}</p>}
    </section>
  )
}
