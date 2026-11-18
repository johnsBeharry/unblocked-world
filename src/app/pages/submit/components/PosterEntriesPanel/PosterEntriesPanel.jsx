import React, { useState } from 'react'
import styles from './PosterEntriesPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { ConfirmDialog } from '../confirm-dialog/ConfirmDialog.jsx'
import { fillContent } from '../../../../../components/ContentLines/ContentLines.jsx'
import content from './poster-entries-content.json'

// Your Entries (copy follows the reference form; layout the user's 2026-11-17
// Poster Entries reference): add a poster by clicking or by dropping files on
// the add card; each entry shows its status tag, title, file info and actions.

// "PNG · 759 KB" from the poster file (demo entries carry `meta`).
export function fileMeta(entry) {
  if (entry.meta) return entry.meta
  const file = entry.file
  if (!file) return ''
  const type = (file.name?.split('.').pop() || file.type?.split('/').pop() || '').toUpperCase()
  const size = file.size >= 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`
  return [type, size].filter(Boolean).join(' · ')
}

function entryStatus(entry) {
  if (entry.submitted) return content.status.submitted
  return entry.file || entry.src ? content.status.ready : content.status.inProgress
}

function EntryList({ title, entries, onEdit, onRemove }) {
  if (!entries.length) return null
  return (
    <div className={styles['poster-entries__group']}>
      {/* Only the Submitted group shows its name; in-progress entries follow
          the add card directly (reference). */}
      {title && <h2 className={styles['poster-entries__group-title']}>{title}</h2>}
      <ul className={styles['poster-entries__list']}>
        {entries.map(entry => (
          <RevealRow className={styles['poster-entry']} contentClassName={styles['poster-entry__content']} lineClassName={styles['poster-entry__rule']} key={entry.id}>
            {entry.src ? <img className={styles['poster-entry__thumbnail']} src={entry.src} alt="" /> : <span className={styles['poster-entry__thumbnail']} aria-hidden="true" />}
            <span className={styles['poster-entry__info']}>
              <span className={styles['poster-entry__status']}>{entryStatus(entry)}</span>
              <span className={styles['poster-entry__title']}>{entry.title}</span>
              {fileMeta(entry) && <span className={styles['poster-entry__meta']}>{fileMeta(entry)}</span>}
              {!entry.submitted && (
                <span className={styles['poster-entry__actions']}>
                  <button type="button" onClick={() => onEdit?.(entry)}>{content.edit}</button>
                  <span aria-hidden="true">•</span>
                  <button type="button" onClick={() => onRemove?.(entry)}>{content.remove}</button>
                </span>
              )}
            </span>
          </RevealRow>
        ))}
      </ul>
    </div>
  )
}

export function PosterEntriesPanel({ entries = [], onAdd, onEdit, onRemove }) {
  const [dragging, setDragging] = useState(false)
  // (Remove) asks first; the dialog keeps the last entry while it fades out.
  // A failed removal keeps the dialog open with the reason.
  const [removing, setRemoving] = useState({ entry: null, open: false, busy: false, error: '' })
  const confirmRemove = async () => {
    setRemoving(current => ({ ...current, busy: true, error: '' }))
    try {
      await onRemove?.(removing.entry.id)
      setRemoving(current => ({ ...current, open: false, busy: false }))
    } catch (error) {
      setRemoving(current => ({ ...current, busy: false, error: error.message }))
    }
  }
  const inProgress = entries.filter(entry => !entry.submitted)
  const submitted = entries.filter(entry => entry.submitted)

  const onDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    const files = Array.from(event.dataTransfer?.files || [])
    if (files.length) onAdd?.(files)
  }

  return (
    <section className={`${styles['poster-entries']} ${entries.length ? styles['poster-entries--filled'] : ''}`} aria-labelledby="poster-entries-title">
      <div className={styles['poster-entries__inner']}>
        <RevealText as="h1" id="poster-entries-title" className={styles['poster-entries__title']}>{content.title}</RevealText>
        <RevealRow
          as="button"
          line={false}
          className={`${styles['poster-entries__add']} ${dragging ? styles['poster-entries__add--dragging'] : ''}`}
          contentClassName={styles['poster-entries__add-row']}
          type="button"
          onClick={() => onAdd?.()}
          onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span aria-hidden="true">{content.add.icon}</span>
          <span>{dragging ? content.add.dropping : content.add.label}</span>
        </RevealRow>
        {entries.length === 0 && (
          <p className={styles['poster-entries__empty']}>{content.empty}</p>
        )}
        <EntryList entries={inProgress} onEdit={onEdit} onRemove={entry => setRemoving({ entry, open: true, busy: false, error: '' })} />
        <EntryList title={content.submittedTitle} entries={submitted} />
      </div>
      <ConfirmDialog
        open={removing.open}
        title={content.removeDialog.title}
        confirmLabel={removing.busy ? content.removeDialog.busy : content.removeDialog.confirm}
        busy={removing.busy}
        error={removing.error}
        onConfirm={confirmRemove}
        onClose={() => { if (!removing.busy) setRemoving(current => ({ ...current, open: false })) }}
      >
        {fillContent(content.removeDialog.message, { title: removing.entry?.title })}
      </ConfirmDialog>
    </section>
  )
}
