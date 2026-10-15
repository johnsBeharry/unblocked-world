import React from 'react'
import styles from './SubmissionsGuidelines.module.scss'
import { SubmitArtwork } from '../../../../components/footer/submit-artwork/SubmitArtwork.jsx'

export function SubmissionsGuidelines() {
  return (
    <section className={styles.hero} data-name="submissions-guidelines">
      <SubmitArtwork className={styles.artwork} />

      <div className={styles.heading}>
        <p>Submissions</p>
        <p>Guidelines <span>(↓)</span></p>
      </div>
    </section>
  )
}


