import React from 'react'
import styles from './ContactInformationPanel.module.scss'

const fields = [
  { name: 'full_name', label: 'Full Name', value: 'Andre' },
  { name: 'email', label: 'Email Address' },
  { name: 'instagram', label: 'Instagram (Optional)' },
  { name: 'telephone', label: 'Telephone Number' },
  { name: 'country', label: 'Country', select: true },
  { name: 'city', label: 'City', select: true },
  { name: 'website', label: 'Website (Optional)' },
]

export function ContactInformationPanel({ embedded = false, value = {}, onChange }) {
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
                    <input className={styles.fieldValue} aria-label={field.label} value={value[field.name] ?? field.value} onChange={event => onChange?.({ [field.name]: event.target.value })} />
                  </>
                : field.select
                  ? <select className={styles.emptyField} aria-label={field.label} value={value[field.name] || ''} onChange={event => onChange?.({ [field.name]: event.target.value })}><option value="">{field.label}</option></select>
                  : <input className={styles.emptyField} aria-label={field.label} placeholder={field.label} value={value[field.name] || ''} onChange={event => onChange?.({ [field.name]: event.target.value })} />}
              {field.select && <span className={styles.chevron} aria-hidden="true" />}
            </label>
          ))}
        </form>
      </div>
    </section>
  )
}
