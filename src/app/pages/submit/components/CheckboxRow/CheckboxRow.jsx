import React from 'react'
import styles from './CheckboxRow.module.scss'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'

// Ruled checkbox row used across the Submit flow (Join terms, submission
// confirmations). The box and its text reveal together (RevealRow, no
// drawn rule: the row keeps its own border). `invalid` (a required box left
// unticked after a failed check) turns the text and the box red.
export function CheckboxRow({ checked, onChange, children, className = '', required = false, invalid = false, disabled = false }) {
  return (
    <RevealRow as="label" line={false} className={`${styles.row} ${invalid ? styles['row--invalid'] : ''} ${className}`} contentClassName={styles.rowContent}>
      <input type="checkbox" checked={checked} required={required} aria-invalid={invalid || undefined} disabled={disabled} onChange={event => onChange?.(event.target.checked)} />
      <span>{children}</span>
    </RevealRow>
  )
}
