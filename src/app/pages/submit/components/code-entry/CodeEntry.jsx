import React, { useRef } from 'react'
import styles from './CodeEntry.module.scss'

// Email code entry shared by the Join / Sign In code screens and the Change
// Email popup (2026-11-17 references): six digit boxes (typing or pasting
// fills the following boxes), "(Resend Code) • (Change Email)" and the
// email-link note. Spacing above is the consumer's; the box colour comes from
// `--code-entry-box` (#101010 on the black column, black in the popup).
export const CODE_LENGTH = 6

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
    <div className={styles['code-entry__boxes']} role="group" aria-label="Email verification code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => { inputsRef.current[index] = node }}
          className={styles['code-entry__digit']}
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

export function CodeEntry({ value, onChange, busy = false, checking = false, onResend, onChangeEmail, className = '' }) {
  return (
    <div className={`${styles['code-entry']} ${className}`}>
      <CodeInput value={value} onChange={onChange} />
      <p className={styles['code-entry__actions']}>
        <button type="button" className={styles['code-entry__action']} disabled={busy} onClick={onResend}>(Resend Code)</button>
        <span aria-hidden="true">•</span>
        <button type="button" className={styles['code-entry__action']} disabled={busy} onClick={onChangeEmail}>(Change Email)</button>
      </p>
      <p className={styles['code-entry__note']}>{checking ? 'Checking the code…' : 'Or click the link in the email'}</p>
    </div>
  )
}
