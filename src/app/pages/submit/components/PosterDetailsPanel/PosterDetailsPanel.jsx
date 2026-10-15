import React from 'react'
import styles from './PosterDetailsPanel.module.scss'

const fields = [
  { label: 'Poster Title' },
  { label: 'Year Designed', select: true },
  { label: 'Designed For' },
  { label: 'Client Name' },
  { label: 'Creation Method' },
  { label: 'Materials Used' },
  { label: 'Digital Programs Used' },
  { label: 'Printing Method' },
  { label: 'Poster Concept' },
]

export function PosterDetailsPanel({ draft = {}, onDraftChange }) {
  return (
    <section className={styles.panel} aria-labelledby="add-poster-title">
      <div className={styles.inner}>
        <h1 id="add-poster-title">Add a Poster</h1>
        <form className={styles.form}>
          {fields.map(field => (
            <label className={styles.field} key={field.label}>
              {field.select
                ? <select aria-label={field.label} defaultValue={field.label}><option value={field.label}>{field.label}</option></select>
                : <input aria-label={field.label} placeholder={field.label} value={field.label === 'Poster Title' ? (draft.title || '') : (draft[field.label] || '')} onChange={event => onDraftChange?.(field.label === 'Poster Title' ? { title: event.target.value } : { [field.label]: event.target.value })} />}
              {field.select && <span className={styles.chevron} aria-hidden="true" />}
            </label>
          ))}
          <div className={styles.uploadDivider} aria-hidden="true" />
          <label className={styles.uploadCard}>
            <input className={styles.fileInput} type="file" accept="image/jpeg,image/png,image/gif,video/mp4" multiple onChange={event => onDraftChange?.({ posterFiles: Array.from(event.target.files || []) })} />
            <span className={styles.uploadTitle}>Poster Files</span>
            <span className={styles.uploadDescription}>Static: JPG, PNG, GIF up to 2000px wide under 4mb.<br />Motion: GIF or MP4 up to 2000px wide under 20mb.</span>
            <span className={styles.uploadAction}>Browse</span>
          </label>
          <label className={styles.uploadCard}>
            <input className={styles.fileInput} type="file" multiple />
            <span className={styles.uploadTitle}>Supporting Assets<br />(Optional)</span>
            <span className={styles.uploadAction}>Browse</span>
          </label>
        </form>
      </div>
    </section>
  )
}
