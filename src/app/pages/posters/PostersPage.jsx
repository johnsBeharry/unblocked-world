import React from 'react'
import styles from './PostersPage.module.scss'
import { OwnershipContestHero } from './components/ownership-contest-hero/OwnershipContestHero.jsx'
import { OwnershipAbout } from './components/ownership-about/OwnershipAbout.jsx'
import { OwnershipBreak } from './components/ownership-break/OwnershipBreak.jsx'
import { OwnershipExploration } from './components/ownership-exploration/OwnershipExploration.jsx'
import { OwnershipReferences } from './components/ownership-references/OwnershipReferences.jsx'
import { OwnershipProgramme } from './components/ownership-programme/OwnershipProgramme.jsx'
import { OwnershipJury } from './components/ownership-jury/OwnershipJury.jsx'
import { OwnershipHowItWorks } from './components/ownership-how-it-works/OwnershipHowItWorks.jsx'
import { OwnershipKeyDates } from './components/ownership-key-dates/OwnershipKeyDates.jsx'

export function PostersPage() {
  return (
    <main className={styles.page}>
      <div className={styles.viewport}>
        <div className={styles.canvas}>
          <OwnershipContestHero />
          <OwnershipAbout />
          <OwnershipBreak />
          <OwnershipExploration />
          <OwnershipReferences />
          <OwnershipProgramme />
          <OwnershipJury />
          <OwnershipHowItWorks />
          <OwnershipKeyDates />
        </div>
      </div>
    </main>
  )
}
