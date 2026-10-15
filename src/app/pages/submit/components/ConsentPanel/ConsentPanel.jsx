import React from 'react'
import styles from './ConsentPanel.module.scss'

const consents = [
  { label: 'I confirm this is original work and I have the right to submit it.', checked: true },
  { label: 'I accept the submission terms.' },
  { label: 'I accept the privacy policy.' },
]

export function ConsentPanel() {
  return (
    <section className={styles.panel} aria-labelledby="consent-title">
      <div className={styles.inner}>
        <h1 id="consent-title">Consent</h1>
        <p className={styles.intro}>Confirm that your submission complies with<br />the programme guidelines.</p>
        <div className={styles.list}>
          {consents.map(consent => (
            <label className={styles.row} key={consent.label}>
              <input type="checkbox" defaultChecked={consent.checked} />
              <span>{consent.label}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}
