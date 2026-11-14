import React from 'react'
import styles from './OwnershipComingNext.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

const columns = [
  [175.75, [[294.875, 24], [331.3125, 24], [367.3125, 18], [397.3125, 12], [421.3125, 6], [439.3125, 3]]],
  [298.75, [[385.6875, 3], [400.6875, 6], [418.6875, 12], [442.6875, 18], [472.6875, 24], [508.6875, 24]]],
  [421.75, [[265.875, 3], [280.875, 6], [298.875, 12], [322.875, 18], [352.875, 24], [391.875, 24]]],
]

const toVw = (size) => `calc(${size}px / var(--base-size) * var(--viewport-scale, 1) * 100vw)`

export function OwnershipComingNext() {
  return (
    <section className={styles.next} data-name="coming-next" aria-labelledby="ownership-coming-next-title">
      <div className={styles.art} aria-hidden="true">
        {columns.flatMap(([left, bars]) => bars.map(([top, height]) => (
          <span
            className={styles.bar}
            key={`${left}-${top}`}
            style={{ '--bar-left': toVw(left), '--bar-top': toVw(top), '--bar-height': toVw(height) }}
          />
        )))}
      </div>

      <RevealText as="p" className={styles.label}>Coming Next</RevealText>
      <RevealText as="h2" className={styles.title} id="ownership-coming-next-title">Permanence</RevealText>
      <RevealText as="p" className={styles.description}>
        Products. Memories. Platforms.<br />
        Relationships. Why are so many<br />
        things designed to disappear?
      </RevealText>
    </section>
  )
}
