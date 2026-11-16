import React, { useEffect, useRef } from 'react'
import styles from './ContactInformationPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { SelectPanel } from '../SelectPanel/SelectPanel.jsx'
import { CheckboxRow } from '../CheckboxRow/CheckboxRow.jsx'
import { FormField, formFieldStyles as field } from '../form-field/FormField.jsx'
import { CodeEntry, CODE_LENGTH } from '../code-entry/CodeEntry.jsx'
import { PHOTO_TYPES } from '../../api/profilePhoto.js'
import countries from '../../data/countries.json'

// Join step (fields and copy follow the reference form; layout follows the
// user's 2026-11-17 Join and Sign In column references). Joining asks for the
// profile; "Sign in" (already joined) only needs the email and carries its own
// Continue action under the field (the footer nav shows only (←) there).
const PROFILE_FIELDS = [
  { name: 'name', label: 'Full Name', maxLength: 200, autoComplete: 'name' },
  { name: 'country', label: 'Country', select: true },
  { name: 'instagram', label: 'Instagram (Optional)', maxLength: 100, autoComplete: 'off' },
]


// Photo row (reference layout): a 100px tile that opens the file picker (and
// shows the chosen photo), with the label, hint and actions beside it.
// `ruled={false}` drops the bottom rule (Profile: the photo is the last row).
export function PhotoField({ photo, onChange, ruled = true }) {
  const fileRef = useRef(null)
  const pick = () => fileRef.current?.click()
  return (
    <RevealRow className={`${field['form-field']} ${styles['contact-panel__photo-field']}`} contentClassName={styles['contact-photo']} lineClassName={field['form-field__rule']} line={ruled}>
      <button type="button" className={styles['contact-photo__tile']} onClick={pick} aria-label={photo ? 'Change photo' : 'Add a photo'}>
        {photo?.url ? <img className={styles['contact-photo__preview']} src={photo.url} alt="" /> : <span aria-hidden="true">(+)</span>}
      </button>
      <span className={styles['contact-photo__text']}>
        <span className={field['form-field__label']}>Photo (Optional)</span>
        <span className={styles['contact-photo__hint']}>JPG, PNG or WebP. Seen by the UNBLOCKED team with your entries.</span>
        <span className={styles['contact-photo__actions']}>
          <button type="button" onClick={pick}>{photo ? '(Change Photo)' : '(Add a Photo)'}</button>
          {photo && <button type="button" onClick={() => onChange?.(null)}>(Remove)</button>}
        </span>
      </span>
      <input
        ref={fileRef}
        className={styles['contact-photo__file']}
        type="file"
        accept={['.jpg', '.jpeg', '.png', '.webp', ...PHOTO_TYPES].join(',')}
        onChange={(event) => {
          const file = event.target.files?.[0]
          event.target.value = ''
          if (file) onChange?.(file)
        }}
      />
    </RevealRow>
  )
}

export function ContactInformationPanel({
  value = {},
  onChange,
  mode = 'join',
  onModeChange,
  verification = {},
  onVerificationChange,
  onResend,
  onEditDetails,
  onPhotoChange,
  submitLabel = 'Continue',
  submitDisabled = false,
  onSubmit,
}) {
  const codeSent = verification.status === 'code_sent' || verification.status === 'verifying'
  const joining = mode === 'join'
  // After the code was sent (Join and Sign In, 2026-11-17 references): the
  // form is replaced by the code boxes, centred like Sign In; a complete code
  // is checked right away (Join also keeps its footer Continue).
  const codeView = codeSent
  const code = verification.code || ''
  useEffect(() => {
    if (codeView && verification.status === 'code_sent' && code.length === CODE_LENGTH) onSubmit?.()
    // Only a newly completed code submits; a failed check keeps the same code.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return (
    <section className={`${styles['contact-panel']} ${joining && !codeView ? '' : styles['contact-panel--centred']} ${codeView ? styles['contact-panel--code'] : ''}`} aria-labelledby="contact-title">
      {/* Keyed by mode so the title and lede replay their reveal on switch. */}
      <div className={styles['contact-panel__inner']} key={codeView ? `${mode}-code` : mode}>
        <RevealText as="h1" id="contact-title" className={styles['contact-panel__title']}>{joining ? 'Join the Collective' : 'Sign In'}</RevealText>
        {codeView ? (
          // RevealRow, not RevealText: the email is bold (RevealText is text only).
          <RevealRow as="p" line={false} className={styles['contact-panel__lede']}>
            Enter the 6-digit code we sent<br />to <strong className={styles['contact-panel__email']}>{value.email}</strong> to sign in. It expires in 15 minutes.
          </RevealRow>
        ) : (
          <RevealText as="p" className={styles['contact-panel__lede']}>
            {joining
              ? 'Be part of a body of creative work exploring the systems shaping our lives. Submit posters in our open calls, contribute to the archive, discover new voices, and take part in upcoming grants, residencies, exhibitions, and conversations.'
              : 'Enter the email you joined with and we’ll send you a code to sign in.'}
          </RevealText>
        )}
        {codeView ? (
          <div className={styles['contact-panel__code']}>
            <CodeEntry
              value={code}
              onChange={next => onVerificationChange?.({ code: next })}
              busy={submitDisabled}
              checking={verification.status === 'verifying'}
              onResend={onResend}
              onChangeEmail={onEditDetails}
            />
            {verification.error && <p className={styles['contact-panel__error']} role="alert">{verification.error}</p>}
          </div>
        ) : (<>
        <p className={styles['contact-panel__switch']}>
          <span className={styles['contact-panel__switch-prompt']}>{joining ? 'Already joined? ' : 'New here? '}</span>
          <button type="button" className={styles['contact-panel__inline-link']} disabled={codeSent} onClick={() => onModeChange?.(joining ? 'signin' : 'join')}>
            {joining ? 'Sign in' : 'Join UNBLOCKED'}
          </button>
        </p>
        <form
          className={styles['contact-panel__form']}
          onSubmit={(event) => {
            event.preventDefault()
            if (!joining && !submitDisabled) onSubmit?.()
          }}
        >
          <FormField label="Email Address" filled={Boolean(value.email)}>
            <input className={field['form-field__control']} type="email" inputMode="email" autoComplete="email" maxLength={200} aria-label="Email Address" placeholder="Email Address" disabled={codeSent} value={value.email || ''} onChange={event => onChange?.({ email: event.target.value })} />
          </FormField>
          {joining && PROFILE_FIELDS.map(item => (
            <FormField label={item.label} filled={Boolean(value[item.name])} chevron={item.select} key={item.name}>
              {item.select
                ? <SelectPanel label={item.label} value={value[item.name] || ''} options={countries} triggerClassName={`${field['form-field__control']} ${field['form-field__select']}`} emptyClassName={field['form-field__select--empty']} disabled={codeSent} onChange={country => onChange?.({ country })} />
                : <input className={field['form-field__control']} aria-label={item.label} placeholder={item.label} maxLength={item.maxLength} autoComplete={item.autoComplete} disabled={codeSent} value={value[item.name] || ''} onChange={event => onChange?.({ [item.name]: event.target.value })} />}
            </FormField>
          ))}
          {joining && (
            <FormField label="Short Bio (Optional)" filled={Boolean(value.bio)} className={styles['contact-panel__bio-field']}>
              <textarea className={`${field['form-field__control']} ${field['form-field__textarea']}`} maxLength={1000} aria-label="Short Bio (Optional)" placeholder="Short Bio (Optional)" disabled={codeSent} value={value.bio || ''} onChange={event => onChange?.({ bio: event.target.value })} />
            </FormField>
          )}
          {joining && <PhotoField photo={value.photo} onChange={onPhotoChange} />}
          {joining && (
            <CheckboxRow className={styles['contact-panel__terms']} checked={Boolean(value.terms)} onChange={terms => onChange?.({ terms })}>
              {/* Underlined like links in the reference; no Terms / Privacy
                  pages exist yet, so they are not links. */}
              I agree to the <span className={styles['contact-panel__terms-doc']}>Terms of Service</span> &amp; <span className={styles['contact-panel__terms-doc']}>Privacy Policy</span>.
            </CheckboxRow>
          )}
          {verification.error && <p className={styles['contact-panel__error']} role="alert">{verification.error}</p>}
          {!joining && (
            <button type="submit" className={styles['contact-panel__submit']} disabled={submitDisabled}>{submitLabel} (→)</button>
          )}
        </form>
        </>)}
      </div>
    </section>
  )
}
