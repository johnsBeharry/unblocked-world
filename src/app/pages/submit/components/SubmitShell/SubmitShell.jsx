import React from 'react'
import styles from './SubmitShell.module.scss'
import { SubmitProgress } from '../SubmitProgress/SubmitProgress.jsx'
import { SubmitFooterNav } from '../SubmitFooterNav/SubmitFooterNav.jsx'

export function SubmitShell({ children, activeStep = 1, nextLabel = 'Next', nextHref = '#' }) {
  return (
    <main className={styles.shell} data-name="submit-form">
      <SubmitProgress activeStep={activeStep} />
      {children}
      <SubmitFooterNav nextLabel={nextLabel} nextHref={nextHref} />
    </main>
  )
}
