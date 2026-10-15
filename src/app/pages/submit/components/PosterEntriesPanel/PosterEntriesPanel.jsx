import React from 'react'
import styles from './PosterEntriesPanel.module.scss'

export function PosterEntriesPanel({ entries = [], onAdd, onEdit, onRemove }) {
  return (
    <section className={`${styles.panel} ${entries.length ? styles.hasEntries : ''}`} aria-labelledby="poster-entries-title">
      <div className={styles.inner}>
        <h1 id="poster-entries-title">Poster Entries</h1>
        <p className={styles.intro}>Upload your poster submission and any<br />supporting information required for review.</p>
        <button className={`${styles.addCard} ${entries.length ? styles.compactAddCard : ''}`} type="button" onClick={onAdd}>
          <span className={styles.plus} aria-hidden="true">(+)</span>
          <span>Add a Poster</span>
        </button>
        {entries.length > 0 && <div className={styles.entries}>
          {entries.map(entry => (
            <article className={styles.entry} key={entry.id}>
              <img className={styles.thumbnail} src={entry.src} alt="" />
              <div className={styles.entryInfo}>
                <h2>{entry.title}</h2>
                <p><button type="button" onClick={() => onEdit?.(entry)}>(Edit)</button><span aria-hidden="true"> • </span><button type="button" onClick={() => onRemove?.(entry.id)}>(Remove)</button></p>
              </div>
            </article>
          ))}
        </div>}
      </div>
    </section>
  )
}
