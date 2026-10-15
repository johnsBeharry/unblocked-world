import React from 'react'
import { SubmitShell } from './components/SubmitShell/SubmitShell.jsx'
import { ContactInformationPanel } from './components/ContactInformationPanel/ContactInformationPanel.jsx'

export function SubmitFormPage() {
  return (
    <SubmitShell activeStep={1} nextLabel="Poster" nextHref="/submit/form/poster">
      <ContactInformationPanel />
    </SubmitShell>
  )
}
