import React from 'react'
import styles from './FormField.module.scss'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'

export { styles as formFieldStyles }

// One ruled field (label row). The control is the child, styled with
// `formFieldStyles['form-field__control']` (+ `__select` / `__textarea`).
// While empty the placeholder carries the name; once filled a small label
// shows above the value. `invalid` (a failed check) turns the label red and
// draws a red rule over the row's own; it eases back once the value is valid.
export function FormField({ label, filled = false, chevron = false, invalid = false, className = '', children }) {
  return (
    <RevealRow
      as="label"
      className={`${styles['form-field']} ${filled ? styles['form-field--filled'] : ''} ${invalid ? styles['form-field--invalid'] : ''} ${className}`}
      contentClassName={styles['form-field__content']}
      lineClassName={styles['form-field__rule']}
    >
      {filled && <span className={styles['form-field__label']}>{label}</span>}
      {children}
      {chevron && <span className={styles['form-field__chevron']} aria-hidden="true" />}
    </RevealRow>
  )
}
