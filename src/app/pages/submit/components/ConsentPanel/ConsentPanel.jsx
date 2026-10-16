import React from 'react'
import styles from './ConsentPanel.module.scss'

const consents = [
  { name: 'original', label: 'I confirm this is original work and I have the right to submit it.' },
  { name: 'terms', label: 'I accept the submission terms.' },
  { name: 'privacy', label: 'I accept the privacy policy.' },
]

export function ConsentPanel({ value = {}, onChange, error }) {
  return (
    <section className={styles.panel} aria-labelledby="consent-title">
      <div className={styles.inner}>
        <h1 id="consent-title">Consent</h1>
        <p className={styles.intro}>Confirm that your submission complies with<br />the programme guidelines.</p>
        <div className={styles.list}>
          {consents.map((consent, index) => (
            <label className={styles.row} key={consent.label}>
              <input type="checkbox" checked={Boolean(value[consent.name] ?? index === 0)} onChange={event => onChange?.({ [consent.name]: event.target.checked })} />
              <span>{consent.label}</span>
            </label>
          ))}
        </div>
        {error && <p role="alert">{error}</p>}
      </div>
    </section>
  )
}
