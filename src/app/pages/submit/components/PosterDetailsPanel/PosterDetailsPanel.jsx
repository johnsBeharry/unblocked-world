import React, { useState } from 'react'
import styles from './PosterDetailsPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { SelectPanel } from '../SelectPanel/SelectPanel.jsx'
import { FormField, formFieldStyles as field } from '../form-field/FormField.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { contentLines } from '../../../../../components/ContentLines/ContentLines.jsx'
import content from './poster-details-content.json'

// Add a Poster (fields and limits follow the reference form; layout and copy
// the user's 2026-11-17 Add a Poster column reference).
export const POSTER_ACCEPT = '.jpg,.jpeg,.png,.pdf,.gif,.mp4,image/jpeg,image/png,image/gif,application/pdf,video/mp4'
export const MAX_SUPPORTING_FILES = 3
const CONCEPT_MAX = 4000
const YEARS = [...Array.from({ length: 31 }, (_, index) => String(2026 - index)), content.beforeYears]

// Labels come from poster-details-content.json (`fields`, by name).
const fields = [
  { name: 'title', maxLength: 200 },
  { name: 'year_designed', select: true },
  { name: 'designed_for', maxLength: 500 },
  { name: 'client_name', maxLength: 500 },
  { name: 'creation_method', maxLength: 500 },
  { name: 'materials_used', maxLength: 500 },
  { name: 'digital_programs', maxLength: 500 },
  { name: 'printing_method', maxLength: 500 },
].map(item => ({ ...item, label: content.fields[item.name] }))

const fileSummary = (files = []) =>
  files.length === 1 ? files[0].name : content.fileCount.replace('{count}', files.length).replace('{names}', files.map(file => file.name).join(', '))

// File card (2026-11-17 reference): title, optional hint (replaced by the
// chosen file names) and "Browse"; click to browse or drop files on it.
function UploadCard({ title, description, files, multiple = false, onFiles }) {
  const [dragging, setDragging] = useState(false)
  const hint = files?.length ? fileSummary(files) : description
  return (
    <label
      className={`${styles['poster-upload']} ${dragging ? styles['poster-upload--dragging'] : ''}`}
      onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        onFiles(Array.from(event.dataTransfer?.files || []))
      }}
    >
      <input className={styles['poster-upload__file']} type="file" accept={POSTER_ACCEPT} multiple={multiple} onChange={event => onFiles(Array.from(event.target.files || []))} />
      <RevealRow as="span" line={false} className={styles['poster-upload__title']}>{title}</RevealRow>
      {hint && <RevealRow as="span" line={false} className={styles['poster-upload__hint']}>{hint}</RevealRow>}
      <RevealRow as="span" line={false} className={styles['poster-upload__action']}>{dragging ? content.dropping : content.browse}</RevealRow>
    </label>
  )
}

export function PosterDetailsPanel({ draft = {}, onDraftChange, error }) {
  const concept = draft.concept || ''
  return (
    <section className={styles['poster-panel']} aria-labelledby="add-poster-title">
      <div className={styles['poster-panel__inner']}>
        <RevealText as="h1" id="add-poster-title" className={styles['poster-panel__title']}>{content.title}</RevealText>
        <form className={styles['poster-panel__form']} onSubmit={(event) => event.preventDefault()}>
          {fields.map(item => {
            const value = draft[item.name] ? String(draft[item.name]) : ''
            return (
              <FormField label={item.label} filled={Boolean(value)} chevron={item.select} key={item.name}>
                {item.select
                  ? <SelectPanel label={item.label} value={value} options={YEARS} triggerClassName={`${field['form-field__control']} ${field['form-field__select']}`} emptyClassName={field['form-field__select--empty']} onChange={year => onDraftChange?.({ [item.name]: year })} />
                  : <input className={field['form-field__control']} aria-label={item.label} placeholder={item.label} maxLength={item.maxLength} value={value} onChange={event => onDraftChange?.({ [item.name]: event.target.value })} />}
              </FormField>
            )
          })}
          <FormField label={content.concept} filled={Boolean(concept)} className={styles['poster-panel__concept']}>
            <textarea className={`${field['form-field__control']} ${field['form-field__textarea']}`} aria-label={content.concept} placeholder={content.concept} maxLength={CONCEPT_MAX} value={concept} onChange={event => onDraftChange?.({ concept: event.target.value })} />
            {/* Counter only once typing (the reference shows the empty field). */}
            {concept && <span className={styles['poster-panel__counter']} aria-live="polite">{concept.length} / {CONCEPT_MAX}</span>}
          </FormField>
          <div className={styles['poster-panel__uploads']}>
            <UploadCard
              title={content.posterFiles.title}
              description={contentLines(content.posterFiles.description)}
              files={draft.posterFiles}
              onFiles={files => files.length && onDraftChange?.({ posterFiles: files.slice(0, 1) })}
            />
            {/* Already sent supporting files (editing a draft) are listed
                with the new ones; new picks fill the remaining slots. */}
            <UploadCard
              title={contentLines(content.supportingFiles.title)}
              files={[...(draft.existingAssets || []), ...(draft.supportingFiles || [])]}
              multiple
              onFiles={files => files.length && onDraftChange?.({ supportingFiles: files.slice(0, Math.max(0, MAX_SUPPORTING_FILES - (draft.existingAssets?.length || 0))) })}
            />
          </div>
          {error && <p className={styles['poster-panel__error']} role="alert">{error}</p>}
        </form>
      </div>
    </section>
  )
}
