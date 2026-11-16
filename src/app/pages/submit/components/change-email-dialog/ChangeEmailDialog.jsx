import React, { useEffect } from 'react'
import styles from './ChangeEmailDialog.module.scss'
import { ConfirmDialog } from '../confirm-dialog/ConfirmDialog.jsx'
import { FormField, formFieldStyles as field } from '../form-field/FormField.jsx'
import { CodeEntry } from '../code-entry/CodeEntry.jsx'

// Change Email popup (user reference 2026-11-17). The portal can't change an
// account's email (another address is a separate profile), so — user choice —
// "Send Code" sends a code to the new address with the current details; the
// current session stays until that code is confirmed, then the artist is
// signed in with the new address. Stage `email`: new address; stage `code`
// ("Enter Code" reference): CodeEntry with black boxes, (←) back to the
// address, checked as soon as the six boxes are full or with Verify Email.
export function ChangeEmailDialog({ open, state = {}, onChange, onSend, onConfirm, onResend, onBack, onClose }) {
  const codeStage = state.stage === 'code'
  // Moving to the code stage puts the caret in the first box.
  useEffect(() => {
    if (!open || !codeStage) return undefined
    const frame = requestAnimationFrame(() => document.querySelector('[role="alertdialog"] input[aria-label="Digit 1"]')?.focus({ preventScroll: true }))
    return () => cancelAnimationFrame(frame)
  }, [open, codeStage])
  return (
    <ConfirmDialog
      open={open}
      className={`${styles['change-email']} ${codeStage ? styles['change-email--code'] : ''}`}
      title={codeStage ? 'Enter Code' : 'Change Email'}
      confirmLabel={state.busy ? (codeStage ? 'Checking…' : 'Sending…') : codeStage ? 'Verify Email' : 'Send Code'}
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
            <FormField label="New Email Address" filled={Boolean(state.email)}>
              <input
                className={field['form-field__control']}
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={200}
                aria-label="New Email Address"
                placeholder="New Email Address"
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
      {codeStage
        ? <>Enter the 6-digit code we sent<br />to <strong className={styles['change-email__address']}>{state.email}</strong>. It expires in 15 minutes.</>
        : <>We’ll send a 6-digit code to your new address. Your current email stays active until you confirm it.</>}
    </ConfirmDialog>
  )
}
