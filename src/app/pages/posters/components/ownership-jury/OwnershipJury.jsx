import React from 'react'
import styles from './OwnershipJury.module.scss'

const DEFAULT_PHOTO = '/UNBLOCKED-poster_files/d356dbbf2d02f78c903bcc39b1a7ff95ac05d5a7.d356dbbf.png'

const JURY_MEMBERS = [
  'Kyle Fletcher',
  'Johns Beharry',
  'Lewis Webber',
  'Liam Hartwell',
  'Caleb Winters',
  'Ava Sinclair',
]

export function OwnershipJury({ photoSrc = DEFAULT_PHOTO }) {
  return (
    <section className={styles.section} data-name="jury" aria-label="Jury Members">
      <div className={styles.label}>
        <p>Sec. 05 (July Members)</p>
      </div>

      <div className={styles.imageFrame}>
        <div className={styles.imageLayer} data-name="image 40">
          <img src={photoSrc} alt="Jury member portrait" />
        </div>
      </div>

      <div className={styles.memberList}>
        {JURY_MEMBERS.map((member, index) => (
          <p className={index === 0 ? styles.memberActive : styles.member} key={member}>
            {member}
          </p>
        ))}
      </div>

      <p className={styles.description}>
        Head of Brand Creative at Cash App, with experience shaping cultural work across music, identity, and visual systems.
      </p>
    </section>
  )
}
