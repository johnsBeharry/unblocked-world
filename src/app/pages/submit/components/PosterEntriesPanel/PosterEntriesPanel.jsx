import React from 'react'
import styles from './PosterEntriesPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function PosterEntriesPanel({ entries = [], onAdd, onEdit, onRemove }) {
  return (
    <section className={`${styles.panel} ${entries.length ? styles.hasEntries : ''}`} aria-labelledby="poster-entries-title">
      <div className={styles.inner}>
        <RevealText as="h1" id="poster-entries-title">Poster Entries</RevealText>
        <RevealText as="p" className={styles.intro}>Upload your poster submission and any supporting information required for review.</RevealText>
        <button className={`${styles.addCard} ${entries.length ? styles.compactAddCard : ''}`} type="button" onClick={onAdd}>
          <span className={styles.plus} aria-hidden="true">(+)</span>
          <span>Add a Poster</span>
        </button>
        {entries.length > 0 && <div className={styles.entries}>
          {entries.map(entry => (
            <article className={styles.entry} key={entry.id}>
              <img className={styles.thumbnail} src={entry.src} alt="" />
              <div className={styles.entryInfo}>
                <RevealText as="h2">{entry.title}</RevealText>
                <p><button type="button" onClick={() => onEdit?.(entry)}>(Edit)</button><span aria-hidden="true"> • </span><button type="button" onClick={() => onRemove?.(entry.id)}>(Remove)</button></p>
              </div>
            </article>
          ))}
        </div>}
      </div>
    </section>
  )
}
