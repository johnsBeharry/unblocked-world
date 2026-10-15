import React from 'react'
import styles from './ContactInformationPanel.module.scss'

const fields = [
  { label: 'Full Name', value: 'Andre' },
  { label: 'Email Address' },
  { label: 'Instagram (Optional)' },
  { label: 'Telephone Number' },
  { label: 'Country', select: true },
  { label: 'City', select: true },
  { label: 'Website (Optional)' },
]

export function ContactInformationPanel({ embedded = false }) {
  return (
    <section className={`${styles.panel} ${embedded ? styles.embedded : ''}`} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <h1 id="contact-title">Contact Information</h1>
        <p className={styles.intro}>Provide your contact details so we can<br />communicate important updates regarding<br />your submission.</p>
        <form className={styles.form}>
          {fields.map(field => (
            <label className={styles.field} key={field.label}>
              {field.value
                ? <>
                    <span className={styles.fieldLabel}>{field.label}</span>
                    <input className={styles.fieldValue} aria-label={field.label} defaultValue={field.value} />
                  </>
                : field.select
                  ? <select className={styles.emptyField} aria-label={field.label} defaultValue={field.label}><option value={field.label}>{field.label}</option></select>
                  : <input className={styles.emptyField} aria-label={field.label} placeholder={field.label} />}
              {field.select && <span className={styles.chevron} aria-hidden="true" />}
            </label>
          ))}
        </form>
      </div>
    </section>
  )
}
