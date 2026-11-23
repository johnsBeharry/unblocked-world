import React from 'react'
import styles from './ProfilePanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { RollingText } from '../../../../../components/RollingText/RollingText.jsx'
import { CheckboxRow } from '../CheckboxRow/CheckboxRow.jsx'
import { contentLines } from '../../../../../components/ContentLines/ContentLines.jsx'
import { SelectPanel } from '../SelectPanel/SelectPanel.jsx'
import { FormField, formFieldStyles as field } from '../form-field/FormField.jsx'
import { PhotoField } from '../ContactInformationPanel/ContactInformationPanel.jsx'
import countries from '../../data/countries.json'
import content from './profile-panel-content.json'

// Profile & Contact Information (user reference 2026-11-17): the signed-in
// artist's details. The email is fixed (verified; "(Change Email)" starts
// over with another address); the other fields save as they are typed or
// with Save (status beside it). Name, country and the terms are needed to
// submit; the terms box locks once the current terms are accepted.
const TEXT_FIELDS = [
  { name: 'name', maxLength: 200, autoComplete: 'name' },
  { name: 'country', select: true },
  { name: 'instagram', maxLength: 100, autoComplete: 'off' },
].map(item => ({ ...item, label: content.fields[item.name] }))

export function ProfilePanel({ value = {}, onChange, onPhotoChange, onChangeEmail, onSave, saveState = 'idle', error, busy = false }) {
  return (
    <section className={styles['profile-panel']} aria-labelledby="profile-title">
      <div className={styles['profile-panel__inner']}>
        <RevealText as="h1" id="profile-title" className={styles['profile-panel__title']}>{content.title}</RevealText>
        <RevealText as="p" className={styles['profile-panel__lede']}>{content.lede}</RevealText>
        <form className={styles['profile-panel__form']} onSubmit={(event) => event.preventDefault()}>
          <FormField label={content.email} filled>
            <span className={styles['profile-panel__email-row']}>
              <input className={`${field['form-field__control']} ${styles['profile-panel__email']}`} type="email" aria-label={content.email} value={value.email || ''} readOnly />
              <button type="button" className={styles['profile-panel__change-email']} disabled={busy} onClick={onChangeEmail}>{content.changeEmail}</button>
            </span>
          </FormField>
          <RevealRow as="span" line={false} className={styles['profile-panel__verified']}>{content.verified}</RevealRow>
          {TEXT_FIELDS.map(item => (
            <FormField label={item.label} filled={Boolean(value[item.name])} chevron={item.select} key={item.name}>
              {item.select
                ? <SelectPanel label={item.label} value={value[item.name] || ''} options={countries} triggerClassName={`${field['form-field__control']} ${field['form-field__select']}`} emptyClassName={field['form-field__select--empty']} onChange={country => onChange?.({ country })} />
                : <input className={field['form-field__control']} aria-label={item.label} placeholder={item.label} maxLength={item.maxLength} autoComplete={item.autoComplete} value={value[item.name] || ''} onChange={event => onChange?.({ [item.name]: event.target.value })} />}
            </FormField>
          ))}
          <FormField label={content.bio} filled={Boolean(value.bio)} className={styles['profile-panel__bio']}>
            <textarea className={`${field['form-field__control']} ${field['form-field__textarea']}`} maxLength={1000} aria-label={content.bio} placeholder={content.bio} value={value.bio || ''} onChange={event => onChange?.({ bio: event.target.value })} />
          </FormField>
          <PhotoField photo={value.photo} onChange={onPhotoChange} ruled={false} />
          <CheckboxRow className={styles['profile-panel__terms']} checked={Boolean(value.terms || value.termsAccepted)} disabled={Boolean(value.termsAccepted)} onChange={terms => onChange?.({ terms })}>
            {contentLines(content.terms, undefined, {
              terms: <span className={styles['profile-panel__terms-doc']}>{content.termsDoc}</span>,
              privacy: <span className={styles['profile-panel__terms-doc']}>{content.privacyDoc}</span>,
            })}
          </CheckboxRow>
          {error && <p className={styles['profile-panel__error']} role="alert">{error}</p>}
          <RevealRow as="button" line={false} type="button" className={styles['profile-panel__save']} contentClassName={styles['profile-panel__save-content']} disabled={busy || saveState === 'saving'} onClick={onSave}><RollingText text={content.save} /></RevealRow>
          <p className={styles['profile-panel__save-status']} role="status">{content.saveStatus[saveState] || ''}</p>
        </form>
      </div>
    </section>
  )
}
