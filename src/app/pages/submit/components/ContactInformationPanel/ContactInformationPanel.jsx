import React, { useRef } from 'react'
import styles from './ContactInformationPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { SelectPanel } from '../SelectPanel/SelectPanel.jsx'
import { CheckboxRow } from '../CheckboxRow/CheckboxRow.jsx'
import { PHOTO_TYPES } from '../../api/profilePhoto.js'
import countries from '../../data/countries.json'

// Join step (fields and copy follow the reference form). Joining asks for the
// profile; "Sign in" (already joined) only needs the email.
const PROFILE_FIELDS = [
  { name: 'name', label: 'Full Name', maxLength: 200, autoComplete: 'name' },
  { name: 'country', label: 'Country', select: true },
  { name: 'instagram', label: 'Instagram (Optional)', maxLength: 100, autoComplete: 'off' },
]
const CODE_LENGTH = 6

function CodeInput({ value = '', onChange }) {
  const inputsRef = useRef([])
  const digits = Array.from({ length: CODE_LENGTH }, (_, index) => value[index] ?? '')
  const focus = (index) => inputsRef.current[Math.max(0, Math.min(CODE_LENGTH - 1, index))]?.focus()
  const setDigits = (next) => onChange?.(next.join('').replace(/\D/g, '').slice(0, CODE_LENGTH))

  const onInput = (index, raw) => {
    const typed = raw.replace(/\D/g, '')
    if (!typed) return setDigits(digits.map((digit, i) => (i === index ? '' : digit)))
    // Typing or pasting several digits fills the following boxes.
    const next = [...digits]
    typed.split('').forEach((digit, offset) => { if (index + offset < CODE_LENGTH) next[index + offset] = digit })
    setDigits(next)
    focus(index + typed.length)
  }
  const onKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index]) focus(index - 1)
    if (event.key === 'ArrowLeft') focus(index - 1)
    if (event.key === 'ArrowRight') focus(index + 1)
  }

  return (
    <div className={styles.code} role="group" aria-label="Email verification code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => { inputsRef.current[index] = node }}
          className={styles.digit}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={index === 0 ? CODE_LENGTH : 1}
          aria-label={`Digit ${index + 1}`}
          value={digit}
          onChange={(event) => onInput(index, event.target.value)}
          onKeyDown={(event) => onKeyDown(index, event)}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  )
}

function PhotoField({ photo, onChange }) {
  const fileRef = useRef(null)
  return (
    <RevealRow className={`${styles.field} ${styles.fieldAuto}`} contentClassName={styles.fieldContent} lineClassName={styles.fieldRule}>
      <div className={styles.photo}>
        <div>
          <p className={styles.photoTitle}>Profile Photo (Optional)</p>
          <p className={styles.photoHint}>JPG, PNG or WebP. Seen by the UNBLOCKED team with your entries.</p>
          <p className={styles.photoActions}>
            <button type="button" onClick={() => fileRef.current?.click()}>(Add a photo)</button>
            {photo && <button type="button" onClick={() => onChange?.(null)}>(Remove)</button>}
          </p>
        </div>
        {photo?.url && <img className={styles.photoPreview} src={photo.url} alt="" />}
        <input
          ref={fileRef}
          className={styles.fileInput}
          type="file"
          accept={['.jpg', '.jpeg', '.png', '.webp', ...PHOTO_TYPES].join(',')}
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (file) onChange?.(file)
          }}
        />
      </div>
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
}) {
  const codeSent = verification.status === 'code_sent' || verification.status === 'verifying'
  const joining = mode === 'join'

  return (
    <section className={styles.panel} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <RevealText as="h1" id="contact-title">Join the collective</RevealText>
        <p className={styles.intro}>
          {joining ? 'Already joined? ' : 'New here? '}
          <button type="button" className={styles.inlineLink} disabled={codeSent} onClick={() => onModeChange?.(joining ? 'signin' : 'join')}>
            {joining ? 'Sign in' : 'Join'}
          </button>
        </p>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <RevealRow as="label" className={styles.field} contentClassName={styles.fieldContent} lineClassName={styles.fieldRule}>
            <input className={styles.emptyField} type="email" inputMode="email" autoComplete="email" maxLength={200} aria-label="Email Address" placeholder="Email Address" disabled={codeSent} value={value.email || ''} onChange={event => onChange?.({ email: event.target.value })} />
          </RevealRow>
          {joining && PROFILE_FIELDS.map(field => (
            <RevealRow as="label" className={styles.field} contentClassName={styles.fieldContent} lineClassName={styles.fieldRule} key={field.name}>
              {field.select
                ? <SelectPanel label={field.label} value={value[field.name] || ''} options={countries} triggerClassName={`${styles.emptyField} ${styles.selectField}`} emptyClassName={styles.selectEmpty} disabled={codeSent} onChange={country => onChange?.({ country })} />
                : <input className={styles.emptyField} aria-label={field.label} placeholder={field.label} maxLength={field.maxLength} autoComplete={field.autoComplete} disabled={codeSent} value={value[field.name] || ''} onChange={event => onChange?.({ [field.name]: event.target.value })} />}
              {field.select && <span className={styles.chevron} aria-hidden="true" />}
            </RevealRow>
          ))}
          {joining && (
            <RevealRow as="label" className={`${styles.field} ${styles.fieldAuto}`} contentClassName={styles.fieldContent} lineClassName={styles.fieldRule}>
              <textarea className={`${styles.emptyField} ${styles.textarea}`} rows={3} maxLength={1000} aria-label="Short Bio (Optional)" placeholder="Short Bio (Optional)" disabled={codeSent} value={value.bio || ''} onChange={event => onChange?.({ bio: event.target.value })} />
            </RevealRow>
          )}
          {joining && <PhotoField photo={value.photo} onChange={onPhotoChange} />}
          {joining && (
            <CheckboxRow className={styles.terms} checked={Boolean(value.terms)} onChange={terms => onChange?.({ terms })}>
              I agree to the Terms of Service and Privacy Policy.
            </CheckboxRow>
          )}
          {codeSent && (
            <div className={styles.verification}>
              <p className={styles.fieldLabel}>Enter the 6-digit code we sent to {value.email}.</p>
              <CodeInput value={verification.code || ''} onChange={code => onVerificationChange?.({ code })} />
              <p className={styles.verificationHint}>
                <button type="button" className={styles.inlineLink} onClick={onResend}>(Resend code)</button>
                <span aria-hidden="true"> · </span>
                <button type="button" className={styles.inlineLink} onClick={onEditDetails}>(Edit details)</button>
              </p>
            </div>
          )}
          {verification.error && <p className={styles.error} role="alert">{verification.error}</p>}
        </form>
      </div>
    </section>
  )
}
