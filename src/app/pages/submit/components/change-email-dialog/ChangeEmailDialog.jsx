import React, { useEffect } from 'react'
import styles from './ChangeEmailDialog.module.scss'
import { ConfirmDialog } from '../confirm-dialog/ConfirmDialog.jsx'
import { FormField, formFieldStyles as field } from '../form-field/FormField.jsx'
import { CodeEntry, digitLabel } from '../code-entry/CodeEntry.jsx'
import { contentLines } from '../../../../../components/ContentLines/ContentLines.jsx'
import content from './change-email-dialog-content.json'

// Change Email popup (user reference 2026-11-17). The portal can't change an
// account's email (another address is a separate profile), so — user choice —
// "Send Code" sends a code to the new address with the current details; the
// current session stays until that code is confirmed, then the artist is
// signed in with the new address. Stage `email`: new address; stage `code`
// ("Enter Code" reference): CodeEntry with black boxes, (←) back to the
// address, checked as soon as the six boxes are full or with Verify Email.
export function ChangeEmailDialog({ open, state = {}, onChange, onSend, onConfirm, onResend, onBack, onClose }) {
  const codeStage = state.stage === 'code'
  const copy = codeStage ? content.code : content.email
  // Moving to the code stage puts the caret in the first box.
  useEffect(() => {
    if (!open || !codeStage) return undefined
    const frame = requestAnimationFrame(() => document.querySelector(`[role="alertdialog"] input[aria-label="${digitLabel(1)}"]`)?.focus({ preventScroll: true }))
    return () => cancelAnimationFrame(frame)
  }, [open, codeStage])
  return (
    <ConfirmDialog
      open={open}
      className={`${styles['change-email']} ${codeStage ? styles['change-email--code'] : ''}`}
      title={copy.title}
      confirmLabel={state.busy ? copy.busy : copy.confirm}
      onBack={codeStage ? onBack : undefined}
      busy={state.busy}
      error={state.error}
      onConfirm={codeStage ? onConfirm : onSend}
      onClose={onClose}
      content={codeStage
        ? (
          <CodeEntry
            className={styles['change-email__code']}
            value={state.code || ''}
            onChange={code => onChange?.({ code })}
            busy={state.busy}
            checking={state.busy}
            onResend={onResend}
            onChangeEmail={onBack}
          />
          )
        : (
          <div className={styles['change-email__field']}>
            <FormField label={content.email.field} filled={Boolean(state.email)}>
              <input
                className={field['form-field__control']}
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={200}
                aria-label={content.email.field}
                placeholder={content.email.field}
                value={state.email || ''}
                disabled={state.busy}
                data-dialog-autofocus
                onChange={event => onChange?.({ email: event.target.value })}
                onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); onSend?.() } }}
              />
            </FormField>
          </div>
          )}
    >
      {contentLines(copy.message, undefined, {
        email: <strong className={styles['change-email__address']}>{state.email}</strong>,
      })}
    </ConfirmDialog>
  )
}
