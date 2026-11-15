import React, { useState } from 'react'
import styles from './PosterDetailsPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { SelectPanel } from '../SelectPanel/SelectPanel.jsx'

// Add a Poster (fields, limits and copy follow the reference form).
export const POSTER_ACCEPT = '.jpg,.jpeg,.png,.pdf,.gif,.mp4,image/jpeg,image/png,image/gif,application/pdf,video/mp4'
export const MAX_SUPPORTING_FILES = 3
const CONCEPT_MAX = 4000
const YEARS = [...Array.from({ length: 31 }, (_, index) => String(2026 - index)), 'Before 1996']

const fields = [
  { name: 'title', label: 'Poster Title', maxLength: 200 },
  { name: 'year_designed', label: 'Year Designed', select: true },
  { name: 'designed_for', label: 'Designed For', maxLength: 500 },
  { name: 'client_name', label: 'Client Name', maxLength: 500 },
  { name: 'creation_method', label: 'Creation Method', maxLength: 500 },
  { name: 'materials_used', label: 'Materials Used', maxLength: 500 },
  { name: 'digital_programs', label: 'Digital Programs Used', maxLength: 500 },
  { name: 'printing_method', label: 'Printing Method', maxLength: 500 },
]

const fileSummary = (files = []) =>
  files.length === 1 ? files[0].name : `${files.length} files: ${files.map(file => file.name).join(', ')}`

// File card: click to browse or drop files on it.
function UploadCard({ title, description, files, multiple = false, onFiles }) {
  const [dragging, setDragging] = useState(false)
  return (
    <label
      className={`${styles.uploadCard} ${dragging ? styles.dragging : ''}`}
      onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        onFiles(Array.from(event.dataTransfer?.files || []))
      }}
    >
      <input className={styles.fileInput} type="file" accept={POSTER_ACCEPT} multiple={multiple} onChange={event => onFiles(Array.from(event.target.files || []))} />
      <span className={styles.uploadTitle}>{title}</span>
      <span className={styles.uploadDescription}>{files?.length ? fileSummary(files) : description}</span>
      <span className={styles.uploadAction}>{dragging ? 'Drop to add' : 'Browse or drop'}</span>
    </label>
  )
}

export function PosterDetailsPanel({ draft = {}, onDraftChange, error }) {
  const concept = draft.concept || ''
  return (
    <section className={styles.panel} aria-labelledby="add-poster-title">
      <div className={styles.inner}>
        <RevealText as="h1" id="add-poster-title">Add a Poster</RevealText>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          {fields.map(field => (
            <RevealRow as="label" className={styles.field} lineClassName={styles.fieldRule} key={field.label}>
              {field.select
                ? <SelectPanel label={field.label} value={draft[field.name] ? String(draft[field.name]) : ''} options={YEARS} triggerClassName={styles.selectField} emptyClassName={styles.selectEmpty} onChange={year => onDraftChange?.({ [field.name]: year })} />
                : <input aria-label={field.label} placeholder={field.label} maxLength={field.maxLength} value={draft[field.name] || ''} onChange={event => onDraftChange?.({ [field.name]: event.target.value })} />}
              {field.select && <span className={styles.chevron} aria-hidden="true" />}
            </RevealRow>
          ))}
          <RevealRow as="label" className={`${styles.field} ${styles.fieldArea}`} lineClassName={styles.fieldRule}>
            <textarea aria-label="Poster Concept" placeholder="Poster Concept" rows={4} maxLength={CONCEPT_MAX} value={concept} onChange={event => onDraftChange?.({ concept: event.target.value })} />
            <span className={styles.counter} aria-live="polite">{concept.length} / {CONCEPT_MAX}</span>
          </RevealRow>
          <div className={styles.uploadDivider} aria-hidden="true" />
          <UploadCard
            title="Poster File"
            description={<>Static: JPG, PNG or PDF under 5 MB.<br />Motion: GIF or MP4 under 20 MB.</>}
            files={draft.posterFiles}
            onFiles={files => files.length && onDraftChange?.({ posterFiles: files.slice(0, 1) })}
          />
          <UploadCard
            title="Supporting Assets (Optional)"
            description={<>Up to 3 files — process shots, details, mockups.<br />Same file types and sizes as above.</>}
            files={draft.supportingFiles}
            multiple
            onFiles={files => files.length && onDraftChange?.({ supportingFiles: files.slice(0, MAX_SUPPORTING_FILES) })}
          />
          {error && <p className={styles.error} role="alert">{error}</p>}
        </form>
      </div>
    </section>
  )
}
