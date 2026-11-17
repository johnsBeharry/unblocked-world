import React from 'react'
import styles from './ProfilePanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { SelectPanel } from '../SelectPanel/SelectPanel.jsx'
import { FormField, formFieldStyles as field } from '../form-field/FormField.jsx'
import { PhotoField } from '../ContactInformationPanel/ContactInformationPanel.jsx'
import countries from '../../data/countries.json'

// Profile & Contact Information (user reference 2026-11-17): the signed-in
// artist's details. The email is fixed (verified; "(Change Email)" starts
// over with another address); the other fields save as they are typed.
const TEXT_FIELDS = [
  { name: 'name', label: 'Full Name', maxLength: 200, autoComplete: 'name' },
  { name: 'country', label: 'Country', select: true },
  { name: 'instagram', label: 'Instagram (Optional)', maxLength: 100, autoComplete: 'off' },
]

export function ProfilePanel({ value = {}, onChange, onPhotoChange, onChangeEmail, error, busy = false }) {
  return (
    <section className={styles['profile-panel']} aria-labelledby="profile-title">
      <div className={styles['profile-panel__inner']}>
        <RevealText as="h1" id="profile-title" className={styles['profile-panel__title']}>Profile &amp; Contact Information</RevealText>
        <RevealText as="p" className={styles['profile-panel__lede']}>Manage your account details here. Any changes you make will be automatically saved as you type.</RevealText>
        <form className={styles['profile-panel__form']} onSubmit={(event) => event.preventDefault()}>
          <FormField label="Email Address" filled>
            <span className={styles['profile-panel__email-row']}>
              <input className={`${field['form-field__control']} ${styles['profile-panel__email']}`} type="email" aria-label="Email Address" value={value.email || ''} readOnly />
              <button type="button" className={styles['profile-panel__change-email']} disabled={busy} onClick={onChangeEmail}>(Change Email)</button>
            </span>
          </FormField>
          <RevealRow as="span" line={false} className={styles['profile-panel__verified']}>verified</RevealRow>
          {TEXT_FIELDS.map(item => (
            <FormField label={item.label} filled={Boolean(value[item.name])} chevron={item.select} key={item.name}>
              {item.select
                ? <SelectPanel label={item.label} value={value[item.name] || ''} options={countries} triggerClassName={`${field['form-field__control']} ${field['form-field__select']}`} emptyClassName={field['form-field__select--empty']} onChange={country => onChange?.({ country })} />
                : <input className={field['form-field__control']} aria-label={item.label} placeholder={item.label} maxLength={item.maxLength} autoComplete={item.autoComplete} value={value[item.name] || ''} onChange={event => onChange?.({ [item.name]: event.target.value })} />}
            </FormField>
          ))}
          <FormField label="Short Bio (Optional)" filled={Boolean(value.bio)} className={styles['profile-panel__bio']}>
            <textarea className={`${field['form-field__control']} ${field['form-field__textarea']}`} maxLength={1000} aria-label="Short Bio (Optional)" placeholder="Short Bio (Optional)" value={value.bio || ''} onChange={event => onChange?.({ bio: event.target.value })} />
          </FormField>
          <PhotoField photo={value.photo} onChange={onPhotoChange} ruled={false} />
          {error && <p className={styles['profile-panel__error']} role="alert">{error}</p>}
        </form>
      </div>
    </section>
  )
}
