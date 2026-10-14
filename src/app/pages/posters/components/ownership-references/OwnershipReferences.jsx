import React from 'react'
import styles from './OwnershipReferences.module.scss'

const references = [
  {
    name: 'A4 - 1',
    imageName: 'image 54',
    src: '/UNBLOCKED-poster_files/ff2033a1c38a4357386d641377703903abf0cb51.ff2033a1.png',
  },
  {
    name: 'A4 - 3',
    imageName: 'image 56',
    src: '/UNBLOCKED-poster_files/e353c20b9b160ceed44fa9f8dfbd71844bc63f36.e353c20b.png',
  },
  {
    name: 'A4 - 2',
    imageName: 'image 55',
    src: '/UNBLOCKED-poster_files/ace3413e5a82a9d017f82762129b9755a0ff0588.ace3413e.png',
  },
  {
    name: 'A4 - 4',
    imageName: 'image 57',
    src: '/UNBLOCKED-poster_files/49a99c5012c102d9fd4cf34cc5a1f852cdfb92ed.49a99c50.png',
  },
]

export function OwnershipReferences() {
  return (
    <section className={styles.references} data-name="references" aria-label="Creative references">
      <div className={styles.heading}>
        <p>Sec.03</p>
        <p>(References)</p>
      </div>

      {references.map((reference, index) => (
        <div
          className={`${styles.poster} ${styles[`poster${index + 1}`]}`}
          data-name={reference.name}
          key={reference.name}
        >
          <div className={`${styles.imageFrame} ${styles[`imageFrame${index + 1}`]}`} data-name={reference.imageName}>
            <img src={reference.src} alt={`Creative reference poster ${index + 1}`} />
          </div>
        </div>
      ))}

      <p className={styles.description}>
        These references are provided as creative inspiration rather than stylistic direction.
      </p>
    </section>
  )
}
