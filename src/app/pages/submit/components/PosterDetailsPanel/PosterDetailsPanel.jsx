import React from 'react'
import styles from './PosterDetailsPanel.module.scss'

const fields = [
  { name: 'title', label: 'Poster Title' },
  { name: 'year_designed', label: 'Year Designed', select: true },
  { name: 'designed_for', label: 'Designed For' },
  { name: 'client_name', label: 'Client Name' },
  { name: 'creation_method', label: 'Creation Method' },
  { name: 'materials_used', label: 'Materials Used' },
  { name: 'digital_programs', label: 'Digital Programs Used' },
  { name: 'printing_method', label: 'Printing Method' },
  { name: 'concept', label: 'Poster Concept' },
]

export function PosterDetailsPanel({ draft = {}, onDraftChange, error }) {
  return (
    <section className={styles.panel} aria-labelledby="add-poster-title">
      <div className={styles.inner}>
        <h1 id="add-poster-title">Add a Poster</h1>
        <form className={styles.form}>
          {fields.map(field => (
            <label className={styles.field} key={field.label}>
              {field.select
                ? <select aria-label={field.label} value={draft[field.name] || ''} onChange={event => onDraftChange?.({ [field.name]: event.target.value })}><option value="">{field.label}</option>{Array.from({ length: 77 }, (_, index) => 2026 - index).map(year => <option key={year} value={year}>{year}</option>)}</select>
                : <input aria-label={field.label} placeholder={field.label} value={draft[field.name] || ''} onChange={event => onDraftChange?.({ [field.name]: event.target.value })} />}
              {field.select && <span className={styles.chevron} aria-hidden="true" />}
            </label>
          ))}
          <div className={styles.uploadDivider} aria-hidden="true" />
          <label className={styles.uploadCard}>
            <input className={styles.fileInput} type="file" accept="image/jpeg,image/png,application/pdf,image/gif,video/mp4" onChange={event => onDraftChange?.({ posterFiles: Array.from(event.target.files || []) })} />
            <span className={styles.uploadTitle}>Poster Files</span>
            <span className={styles.uploadDescription}>Static: JPG, PNG, GIF up to 2000px wide under 4mb.<br />Motion: GIF or MP4 up to 2000px wide under 20mb.</span>
            <span className={styles.uploadAction}>Browse</span>
          </label>
          <label className={styles.uploadCard}>
            <input className={styles.fileInput} type="file" multiple onChange={event => onDraftChange?.({ supportingFiles: Array.from(event.target.files || []) })} />
            <span className={styles.uploadTitle}>Supporting Assets<br />(Optional)</span>
            <span className={styles.uploadAction}>Browse</span>
          </label>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </form>
      </div>
    </section>
  )
}
