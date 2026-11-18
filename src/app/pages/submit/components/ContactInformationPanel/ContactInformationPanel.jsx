import React, { useEffect, useRef } from 'react'
import styles from './ContactInformationPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RollingText } from '../../../../../components/RollingText/RollingText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { SelectPanel } from '../SelectPanel/SelectPanel.jsx'
import { CheckboxRow } from '../CheckboxRow/CheckboxRow.jsx'
import { FormField, formFieldStyles as field } from '../form-field/FormField.jsx'
import { CodeEntry, CODE_LENGTH } from '../code-entry/CodeEntry.jsx'
import { PHOTO_TYPES } from '../../api/profilePhoto.js'
import countries from '../../data/countries.json'
import { contentLines } from '../../../../../components/ContentLines/ContentLines.jsx'
import content from './contact-information-content.json'

// Join step (fields and copy follow the reference form; layout follows the
// user's 2026-11-17 Join and Sign In column references). Joining asks for the
// profile; "Sign in" (already joined) only needs the email and carries its own
// Continue action under the field (the footer nav shows only (←) there).
const PROFILE_FIELDS = [
  { name: 'name', maxLength: 200, autoComplete: 'name' },
  { name: 'country', select: true },
  { name: 'instagram', maxLength: 100, autoComplete: 'off' },
].map(item => ({ ...item, label: content.fields[item.name] }))


// Photo row (reference layout): a 100px tile that opens the file picker (and
// shows the chosen photo), with the label, hint and actions beside it.
// `ruled={false}` drops the bottom rule (Profile: the photo is the last row).
export function PhotoField({ photo, onChange, ruled = true }) {
  const fileRef = useRef(null)
  const pick = () => fileRef.current?.click()
  return (
    <RevealRow className={`${field['form-field']} ${styles['contact-panel__photo-field']}`} contentClassName={styles['contact-photo']} lineClassName={field['form-field__rule']} line={ruled}>
      <button type="button" className={styles['contact-photo__tile']} onClick={pick} aria-label={photo ? content.photo.tileChange : content.photo.tileAdd}>
        {photo?.url ? <img className={styles['contact-photo__preview']} src={photo.url} alt="" /> : <span aria-hidden="true">{content.photo.tileIcon}</span>}
      </button>
      <span className={styles['contact-photo__text']}>
        <span className={field['form-field__label']}>{content.photo.label}</span>
        <span className={styles['contact-photo__hint']}>{content.photo.hint}</span>
        <span className={styles['contact-photo__actions']}>
          <button type="button" onClick={pick}>{photo ? content.photo.change : content.photo.add}</button>
          {photo && <button type="button" onClick={() => onChange?.(null)}>{content.photo.remove}</button>}
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
  submitLabel = content.submit,
  submitDisabled = false,
  onSubmit,
}) {
  const codeSent = verification.status === 'code_sent' || verification.status === 'verifying'
  const joining = mode === 'join'
  const copy = joining ? content.join : content.signIn
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
        <RevealText as="h1" id="contact-title" className={styles['contact-panel__title']}>{copy.title}</RevealText>
        {codeView ? (
          // RevealRow, not RevealText: the email is bold (RevealText is text only).
          <RevealRow as="p" line={false} className={styles['contact-panel__lede']}>
            {contentLines(content.codeLede, undefined, {
              email: <strong className={styles['contact-panel__email']}>{value.email}</strong>,
            })}
          </RevealRow>
        ) : (
          <RevealText as="p" className={styles['contact-panel__lede']}>
            {copy.lede}
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
        <RevealRow as="p" line={false} className={styles['contact-panel__switch']}>
          <span className={styles['contact-panel__switch-prompt']}>{copy.switchPrompt}</span>
          <button type="button" className={styles['contact-panel__inline-link']} disabled={codeSent} onClick={() => onModeChange?.(joining ? 'signin' : 'join')}>
            {copy.switchLink}
          </button>
        </RevealRow>
        <form
          className={styles['contact-panel__form']}
          onSubmit={(event) => {
            event.preventDefault()
            if (!joining && !submitDisabled) onSubmit?.()
          }}
        >
          <FormField label={content.email} filled={Boolean(value.email)}>
            <input className={field['form-field__control']} type="email" inputMode="email" autoComplete="email" maxLength={200} aria-label={content.email} placeholder={content.email} disabled={codeSent} value={value.email || ''} onChange={event => onChange?.({ email: event.target.value })} />
          </FormField>
          {joining && PROFILE_FIELDS.map(item => (
            <FormField label={item.label} filled={Boolean(value[item.name])} chevron={item.select} key={item.name}>
              {item.select
                ? <SelectPanel label={item.label} value={value[item.name] || ''} options={countries} triggerClassName={`${field['form-field__control']} ${field['form-field__select']}`} emptyClassName={field['form-field__select--empty']} disabled={codeSent} onChange={country => onChange?.({ country })} />
                : <input className={field['form-field__control']} aria-label={item.label} placeholder={item.label} maxLength={item.maxLength} autoComplete={item.autoComplete} disabled={codeSent} value={value[item.name] || ''} onChange={event => onChange?.({ [item.name]: event.target.value })} />}
            </FormField>
          ))}
          {joining && (
            <FormField label={content.bio} filled={Boolean(value.bio)} className={styles['contact-panel__bio-field']}>
              <textarea className={`${field['form-field__control']} ${field['form-field__textarea']}`} maxLength={1000} aria-label={content.bio} placeholder={content.bio} disabled={codeSent} value={value.bio || ''} onChange={event => onChange?.({ bio: event.target.value })} />
            </FormField>
          )}
          {joining && <PhotoField photo={value.photo} onChange={onPhotoChange} />}
          {joining && (
            <CheckboxRow className={styles['contact-panel__terms']} checked={Boolean(value.terms)} onChange={terms => onChange?.({ terms })}>
              {/* Underlined like links in the reference; no Terms / Privacy
                  pages exist yet, so they are not links. */}
              {contentLines(content.terms, undefined, {
                terms: <span className={styles['contact-panel__terms-doc']}>{content.termsDoc}</span>,
                privacy: <span className={styles['contact-panel__terms-doc']}>{content.privacyDoc}</span>,
              })}
            </CheckboxRow>
          )}
          {verification.error && <p className={styles['contact-panel__error']} role="alert">{verification.error}</p>}
          {!joining && (
            <RevealRow as="button" line={false} type="submit" className={styles['contact-panel__submit']} contentClassName={styles['contact-panel__submit-content']} disabled={submitDisabled}><RollingText text={`${submitLabel} ${content.submitArrow}`} /></RevealRow>
          )}
        </form>
        </>)}
      </div>
    </section>
  )
}
