import React, { useState } from 'react'
import styles from './PosterEntriesPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

// Your Entries (copy follows the reference form): add a poster by clicking or
// by dropping files on the add card; entries are grouped into In Progress and
// Submitted.
function EntryList({ title, entries, onEdit, onRemove }) {
  if (!entries.length) return null
  return (
    <div className={styles.group}>
      <h2 className={styles.groupTitle}>{title}</h2>
      <div className={styles.entries}>
        {entries.map(entry => (
          <article className={styles.entry} key={entry.id}>
            {entry.src ? <img className={styles.thumbnail} src={entry.src} alt="" /> : <span className={styles.thumbnail} aria-hidden="true" />}
            <div className={styles.entryInfo}>
              <RevealText as="h3">{entry.title}</RevealText>
              {!entry.submitted && (
                <p><button type="button" onClick={() => onEdit?.(entry)}>(Edit)</button><span aria-hidden="true"> • </span><button type="button" onClick={() => onRemove?.(entry.id)}>(Remove)</button></p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function PosterEntriesPanel({ entries = [], onAdd, onEdit, onRemove }) {
  const [dragging, setDragging] = useState(false)
  const inProgress = entries.filter(entry => !entry.submitted)
  const submitted = entries.filter(entry => entry.submitted)

  const onDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    const files = Array.from(event.dataTransfer?.files || [])
    if (files.length) onAdd?.(files)
  }

  return (
    <section className={`${styles.panel} ${entries.length ? styles.hasEntries : ''}`} aria-labelledby="poster-entries-title">
      <div className={styles.inner}>
        <RevealText as="h1" id="poster-entries-title">Your Entries</RevealText>
        <button
          className={`${styles.addCard} ${entries.length ? styles.compactAddCard : ''} ${dragging ? styles.dragging : ''}`}
          type="button"
          onClick={() => onAdd?.()}
          onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className={styles.plus} aria-hidden="true">(+)</span>
          <span>{dragging ? 'Drop to add' : 'Add a Poster'}</span>
          {!dragging && <span className={styles.dropHint}>or drag files here</span>}
        </button>
        {entries.length === 0 && (
          <p className={styles.empty}>Nothing here yet. Add your first poster above. It saves as you go, so you can finish it later.</p>
        )}
        <EntryList title="In Progress" entries={inProgress} onEdit={onEdit} onRemove={onRemove} />
        <EntryList title="Submitted" entries={submitted} />
      </div>
    </section>
  )
}
