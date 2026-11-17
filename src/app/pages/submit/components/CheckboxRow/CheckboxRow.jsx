import React from 'react'
import styles from './CheckboxRow.module.scss'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'

// Ruled checkbox row used across the Submit flow (Join terms, submission
// confirmations). The box and its text reveal together (RevealRow, no
// drawn rule: the row keeps its own border).
export function CheckboxRow({ checked, onChange, children, className = '', required = false }) {
  return (
    <RevealRow as="label" line={false} className={`${styles.row} ${className}`} contentClassName={styles.rowContent}>
      <input type="checkbox" checked={checked} required={required} onChange={event => onChange?.(event.target.checked)} />
      <span>{children}</span>
    </RevealRow>
  )
}
