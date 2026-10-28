import React from 'react'
import styles from './SubmissionsGuidelines.module.scss'
import { SubmitArtwork } from '../../../../components/footer/submit-artwork/SubmitArtwork.jsx'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function SubmissionsGuidelines() {
  return (
    <section className={styles.hero} data-name="submissions-guidelines">
      <SubmitArtwork className={styles.artwork} />

      <div className={styles.heading}>
        <RevealText as="p">Submissions</RevealText>
        <RevealText as="p">Guidelines <span>(↓)</span></RevealText>
      </div>
    </section>
  )
}


