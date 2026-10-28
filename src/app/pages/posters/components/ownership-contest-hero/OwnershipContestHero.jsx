import React from 'react'
import styles from './OwnershipContestHero.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

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
const toMobileVw = (size) => `${(size / 375) * 100}vw`
const mobileScaleX = 188.5 / 602
const mobileScaleY = 240 / 766.609

function PosterTitleReveal({ children, className, label }) {
  return (
    <span className={className} aria-label={label}>
      {Array.from(children).map((character, index) => (
        <span className={styles.char} key={`${character}-${index}`} aria-hidden="true">
          <span className={styles.charInner} style={{ '--char-index': index }}>{character === ' ' ? '\u00a0' : character}</span>
        </span>
      ))}
    </span>
  )
}

export function OwnershipContestHero({ guidelinesHref, submitHref }) {
  return (
    <section className={styles.hero} data-name="contest-hero" aria-labelledby="ownership-contest-title">
      <div className={styles.art} aria-hidden="true">
        {bars.map(([left, top, width, height], index) => (
          <span
            className={styles.bar}
            key={index}
            style={{
              '--desktop-bar-left': toVw(left),
              '--desktop-bar-top': toVw(top),
              '--desktop-bar-width': toVw(width),
              '--desktop-bar-height': toVw(height),
              '--mobile-left': toMobileVw(left * mobileScaleX),
              '--mobile-top': toMobileVw(top * mobileScaleY),
              '--mobile-width': toMobileVw(width * mobileScaleX),
              '--mobile-height': toMobileVw(height * mobileScaleY),
            }}
          />
        ))}
      </div>

      <h1 className={styles.title} id="ownership-contest-title">
        <PosterTitleReveal className={styles.titleText} label="Ownership">Ownership</PosterTitleReveal>
      </h1>
      <p className={styles.subtitle}>
        <PosterTitleReveal className={styles.subtitleText} label="Poster Contest (↓)">Poster Contest (↓)</PosterTitleReveal>
      </p>
      <RevealText as="p" className={styles.dates}>21.02.26—23.09.26</RevealText>
      <RevealText as="a" className={styles.guidelines} href={guidelinesHref}>Submission Guidelines (→)</RevealText>
      <RevealText as="a" className={styles.submit} href={submitHref}>Submit Poster (→)</RevealText>
    </section>
  )
}
