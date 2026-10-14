import React from 'react'
import styles from './OwnershipKeyDates.module.scss'
import PermanenceSection from '../../../home/components/permanence/PermanenceSection.jsx'
import { Footer } from '../../../../components/footer/Footer.jsx'

const DATES = [
  ['01', 'Theme Announced', '12.06.2026'],
  ['02', 'Submission Deadline', '12.09.2026'],
  ['03', 'Next Theme Announced', '12.12.2026'],
  ['04', 'Selected Works Announced', '12.10.2026'],
  ['05', 'Global Exhibition', '12.06.2027'],
  ['06', 'Final Publication', '12.06.2027'],
]

export function OwnershipKeyDates() {
  return (
    <>
      <section className={styles.section} data-name="key-dates" aria-label="Key Dates">
        <h2 className={styles.title}>
          <span>Sec.07</span>
          <span>(Key Dates)</span>
        </h2>

        <p className={styles.intro}>
          The programme unfolds across a series of milestones guiding participants from theme announcement and submission through selection, exhibition, and publication
        </p>

        <div className={styles.timeline}>
          {DATES.map(([number, milestone, date]) => (
            <div className={styles.row} key={number}>
              <span className={styles.number}>{number}</span>
              <span className={styles.milestone}>{milestone}</span>
              <time className={styles.date}>{date}</time>
            </div>
          ))}
        </div>
      </section>
      <PermanenceSection />
      <Footer color="#d9d9d9" ctaVariant="poster" />
    </>
  )
}
