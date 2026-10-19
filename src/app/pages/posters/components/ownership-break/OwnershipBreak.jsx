import React from 'react'
import styles from './OwnershipBreak.module.scss'

export function OwnershipBreak() {
  return (
    <section className={styles.breakSection} data-name="break" aria-label="Ownership break">
      <div className={`${styles.layer} ${styles.layerOne}`}><p className={styles.letter}>O</p></div>
      <div className={`${styles.layer} ${styles.layerTwo}`}><p className={styles.letter}>O</p></div>
      <div className={`${styles.layer} ${styles.layerThree}`}><p className={styles.letter}>O</p></div>
      <div className={`${styles.layer} ${styles.layerFour}`}><p className={styles.letter}>O</p></div>
      <div className={`${styles.layer} ${styles.layerFive}`}><p className={styles.letter}>O</p></div>
      <div className={styles.mobileArt} aria-hidden="true">
        <div className={`${styles.mobileCrescent} ${styles.mobileCrescentFarLeft}`} />
        <div className={`${styles.mobileCrescent} ${styles.mobileCrescentLeft}`} />
        <div className={styles.mobileRing}>O</div>
        <div className={`${styles.mobileCrescent} ${styles.mobileCrescentRight}`} />
        <div className={`${styles.mobileCrescent} ${styles.mobileCrescentFarRight}`} />
      </div>
    </section>
  )
}
