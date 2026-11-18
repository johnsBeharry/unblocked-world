import React from 'react'
import styles from './ManagePosterPanel.module.scss'
import content from './manage-poster-content.json'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { fileMeta } from '../PosterEntriesPanel/PosterEntriesPanel.jsx'

// Manage Poster (user reference 2026-11-17): the signed-in artist's sent
// posters — thumbnail, title, file info, the action ("(Withdraw)" while
// submitted, "(Restore)" once withdrawn), the submission date and a status
// tag. Drafts stay in the submission flow ("Submit Poster (→)").
const shortDate = (value) => {
  const date = value ? new Date(value) : null
  if (!date || Number.isNaN(date.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(date.getFullYear() % 100)}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`
}

export function ManagePosterPanel({ entries = [], busyId = null, onWithdraw, onRestore }) {
  return (
    <section className={styles['manage-poster']} aria-labelledby="manage-poster-title">
      <div className={styles['manage-poster__inner']}>
        <RevealText as="h1" id="manage-poster-title" className={styles['manage-poster__title']}>{content.title}</RevealText>
        {entries.length === 0 && <p className={styles['manage-poster__empty']}>{content.empty}</p>}
        <ul className={styles['manage-poster__list']}>
          {entries.map(entry => {
            const withdrawn = entry.status === 'withdrawn'
            return (
              <RevealRow className={styles['manage-entry']} contentClassName={styles['manage-entry__content']} lineClassName={styles['manage-entry__rule']} key={entry.id}>
                {entry.src ? <img className={styles['manage-entry__thumbnail']} src={entry.src} alt="" /> : <span className={styles['manage-entry__thumbnail']} aria-hidden="true" />}
                <span className={styles['manage-entry__info']}>
                  <span className={styles['manage-entry__title']}>{entry.title}</span>
                  {fileMeta(entry) && <span className={styles['manage-entry__meta']}>{fileMeta(entry)}</span>}
                  <button type="button" className={styles['manage-entry__action']} disabled={busyId === entry.id} onClick={() => (withdrawn ? onRestore : onWithdraw)?.(entry)}>
                    {busyId === entry.id ? (withdrawn ? content.restoring : content.withdrawing) : withdrawn ? content.restore : content.withdraw}
                  </button>
                </span>
                <span className={styles['manage-entry__side']}>
                  <span className={styles['manage-entry__date']}>{shortDate(entry.submittedAt)}</span>
                  <span className={styles['manage-entry__status']}>{withdrawn ? content.status.withdrawn : content.status.submitted}</span>
                </span>
              </RevealRow>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
