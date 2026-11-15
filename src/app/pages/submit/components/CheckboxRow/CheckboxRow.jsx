import React from 'react'
import styles from './CheckboxRow.module.scss'

// Ruled checkbox row used across the Submit flow (Join terms, poster picks,
// submission confirmations).
export function CheckboxRow({ checked, onChange, children, className = '', required = false }) {
  return (
    <label className={`${styles.row} ${className}`}>
      <input type="checkbox" checked={checked} required={required} onChange={event => onChange?.(event.target.checked)} />
      <span>{children}</span>
    </label>
  )
}
