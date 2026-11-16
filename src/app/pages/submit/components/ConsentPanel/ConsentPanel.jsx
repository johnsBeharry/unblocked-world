import React from 'react'
import styles from './ConsentPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { CheckboxRow } from '../CheckboxRow/CheckboxRow.jsx'

// Consent step (user reference 2026-11-17): the three required
// confirmations. Every in-progress poster is sent (SubmitPage ticks them all
// when entering the step); the reference has no poster picker.
export const CONSENTS = [
  { name: 'original', label: 'I confirm this is original work and I have the right to submit it.' },
  { name: 'terms', label: 'I accept the submission terms.' },
  { name: 'privacy', label: 'I accept the privacy policy.' },
]

export function ConsentPanel({ value = {}, onChange, error }) {
  return (
    <section className={styles['consent-panel']} aria-labelledby="consent-title">
      <div className={styles['consent-panel__inner']}>
        <RevealText as="h1" id="consent-title" className={styles['consent-panel__title']}>Consent</RevealText>
        <RevealText as="p" className={styles['consent-panel__lede']}>Confirm that your submission complies with the programme guidelines.</RevealText>
        <div className={styles['consent-panel__list']} role="group" aria-label="Submission terms">
          {CONSENTS.map(consent => (
            <CheckboxRow key={consent.name} className={styles['consent-panel__row']} required checked={Boolean(value[consent.name])} onChange={checked => onChange?.({ [consent.name]: checked })}>
              {consent.label}
            </CheckboxRow>
          ))}
        </div>
        {error && <p className={styles['consent-panel__error']} role="alert">{error}</p>}
      </div>
    </section>
  )
}
