import React from 'react';
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
      <SubmitArtwork />
      <div className={styles['submit-work__el-198']}>
        <p className={styles['submit-work__el-199']}>{titleLines[0]}</p>
        <p className={styles['submit-work__el-200']}>{titleLines[1]}</p>
      </div>
      {showTopLabel && topLabel && <p className={styles['submit-work__el-201']}>{topLabel}</p>}
      {showBottomLabel && bottomLabel && <p className={styles['submit-work__el-202']}>{bottomLabel}</p>}
    </section>
  );
}

