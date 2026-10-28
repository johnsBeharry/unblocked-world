import React from 'react'
import styles from './ContactInformationPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

const fields = [
  { name: 'full_name', label: 'Full Name', value: 'Andre' },
  { name: 'email', label: 'Email Address' },
  { name: 'instagram', label: 'Instagram (Optional)' },
  { name: 'telephone', label: 'Telephone Number' },
  { name: 'country', label: 'Country', select: true },
  { name: 'city', label: 'City', select: true },
  { name: 'website', label: 'Website (Optional)' },
]

export function ContactInformationPanel({ value = {}, onChange }) {
  return (
    <section className={styles.panel} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <RevealText as="h1" id="contact-title">Contact Information</RevealText>
        <RevealText as="p" className={styles.intro}>Provide your contact details so we can communicate important updates regarding your submission.</RevealText>
        <form className={styles.form}>
          {fields.map(field => (
            <label className={styles.field} key={field.label}>
              {field.value
                ? <>
                    <span className={styles.fieldLabel}>{field.label}</span>
                    <input className={styles.fieldValue} aria-label={field.label} value={value[field.name] ?? field.value} onChange={event => onChange?.({ [field.name]: event.target.value })} />
                  </>
                : field.select
                  ? <select className={`${styles.emptyField} ${styles.selectField}`} aria-label={field.label} value={value[field.name] || ''} onChange={event => onChange?.({ [field.name]: event.target.value })}><option value="">{field.label}</option></select>
                  : <input className={styles.emptyField} aria-label={field.label} placeholder={field.label} value={value[field.name] || ''} onChange={event => onChange?.({ [field.name]: event.target.value })} />}
              {field.select && <span className={styles.chevron} aria-hidden="true" />}
            </label>
          ))}
        </form>
      </div>
    </section>
  )
}
