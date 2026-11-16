import React from 'react'
import styles from './LeaveDialog.module.scss'
import { ConfirmDialog } from '../confirm-dialog/ConfirmDialog.jsx'

// "Leave for now?" (user reference 2026-11-17, designer note: "Exit from site
// navigation (Home)"): shown when "(←) Home" is pressed inside the submit
// flow. "Save & Leave" saves what is open, then goes home.
export function LeaveDialog({ open, busy = false, error = '', onLeave, onClose }) {
  return (
    <ConfirmDialog
      open={open}
      className={styles['leave-dialog']}
      title="Leave for now?"
      confirmLabel={busy ? 'Saving…' : 'Save & Leave'}
      busy={busy}
      error={error}
      onConfirm={onLeave}
      onClose={onClose}
    >
      Your progress is saved. Come back anytime and continue where you left off.
    </ConfirmDialog>
  )
}
