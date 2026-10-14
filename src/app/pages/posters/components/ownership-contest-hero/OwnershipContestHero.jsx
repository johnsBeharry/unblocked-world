import React from 'react'
import styles from './OwnershipContestHero.module.scss'

const bars = [
  [223.39, 275.55, 155.503, 30.342],
  [223.39, 237.63, 155.503, 22.757],
  [223.39, 207.27, 155.503, 15.171],
  [223.39, 184.52, 155.503, 7.586],
  [223.39, 165.55, 155.503, 3.793],
  [223.39, 461.38, 155.503, 30.342],
  [223.39, 506.92, 155.503, 22.757],
  [223.39, 544.81, 155.503, 15.171],
  [223.39, 575.17, 155.503, 7.586],
  [223.39, 597.93, 155.503, 3.793],
  [193.05, 305.88, 30.342, 155.503],
  [155.12, 305.88, 22.757, 155.503],
  [124.77, 305.88, 15.171, 155.503],
  [102.01, 305.88, 7.586, 155.503],
  [83.05, 305.88, 3.793, 155.503],
  [378.88, 305.89, 30.342, 155.503],
  [424.41, 305.89, 22.757, 155.503],
  [462.33, 305.89, 15.171, 155.503],
  [492.67, 305.89, 7.586, 155.503],
  [515.43, 305.89, 3.793, 155.503],
]

const toVw = (size) => `${(size / 1440) * 100}vw`

export function OwnershipContestHero({ guidelinesHref, submitHref }) {
  return (
    <section className={styles.hero} aria-labelledby="ownership-contest-title">
      <div className={styles.art} aria-hidden="true">
        {bars.map(([left, top, width, height], index) => (
          <span
            className={styles.bar}
            key={index}
            style={{ left: toVw(left), top: toVw(top), width: toVw(width), height: toVw(height) }}
          />
        ))}
      </div>

      <h1 className={styles.title} id="ownership-contest-title">Ownership</h1>
      <p className={styles.subtitle}>Poster Contest (↓)</p>
      <p className={styles.dates}>21.02.26—23.09.26</p>
      <a className={styles.guidelines} href={guidelinesHref}>Submission Guidelines (→)</a>
      <a className={styles.submit} href={submitHref}>Submit Poster (→)</a>
    </section>
  )
}
