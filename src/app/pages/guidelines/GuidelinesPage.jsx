import React from 'react'
import styles from './GuidelinesPage.module.scss'
import { SubmissionsGuidelines } from './components/submissions-guidelines/SubmissionsGuidelines.jsx'
import { GuidelinesContent } from './components/guidelines-content/GuidelinesContent.jsx'
import { Footer } from '../../components/footer/Footer.jsx'

export function GuidelinesPage() {
  return (
    <main className={styles.page}>
      <SubmissionsGuidelines />
      <GuidelinesContent />
      <Footer ctaVariant="guidelines" />
    </main>
  )
}
