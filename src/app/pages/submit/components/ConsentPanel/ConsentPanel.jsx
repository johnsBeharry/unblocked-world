import React from 'react'
import styles from './ConsentPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { CheckboxRow } from '../CheckboxRow/CheckboxRow.jsx'

// Submit step (copy follows the reference form): pick the posters to send,
// then accept the three required confirmations.
export const CONSENTS = [
  { name: 'original', label: 'The submitted work is original and I hold the rights to it, or have permission from everyone who does.' },
  { name: 'publicity', label: 'UNBLOCKED may show my submitted work publicly in connection with the contest, with credit to me.' },
  { name: 'rules', label: 'I have read the contest rules and eligibility.' },
]

export function ConsentPanel({ entries = [], picked = {}, onPickChange, value = {}, onChange, error }) {
  return (
    <section className={styles.panel} aria-labelledby="consent-title">
      <div className={styles.inner}>
        <RevealText as="h1" id="consent-title">Submit</RevealText>
        <RevealText as="p" className={styles.intro}>Choose the posters to send to the jury, then confirm the terms. You can come back and submit more later.</RevealText>
        {entries.length > 0 && (
          <div className={styles.list} role="group" aria-label="Posters to submit">
            {entries.map(entry => (
              <CheckboxRow key={entry.id} checked={Boolean(picked[entry.id])} onChange={checked => onPickChange?.({ [entry.id]: checked })}>
                {entry.title}
              </CheckboxRow>
            ))}
          </div>
        )}
        <div className={styles.list} role="group" aria-label="Submission terms">
          {CONSENTS.map(consent => (
            <CheckboxRow key={consent.name} required checked={Boolean(value[consent.name])} onChange={checked => onChange?.({ [consent.name]: checked })}>
              {consent.label}
            </CheckboxRow>
          ))}
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
    </section>
  )
}
