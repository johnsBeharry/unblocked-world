import React, { useRef, useState } from 'react'
import styles from './SubmitPage.module.scss'
import { ContactInformationPanel } from './components/ContactInformationPanel/ContactInformationPanel.jsx'
import { SubmitProgress } from './components/SubmitProgress/SubmitProgress.jsx'
import { SubmitFooterNav } from './components/SubmitFooterNav/SubmitFooterNav.jsx'
import { PosterEntriesPanel } from './components/PosterEntriesPanel/PosterEntriesPanel.jsx'
import { PosterDetailsPanel } from './components/PosterDetailsPanel/PosterDetailsPanel.jsx'
import { ConsentPanel } from './components/ConsentPanel/ConsentPanel.jsx'
import { SubmissionSuccessPanel } from './components/SubmissionSuccessPanel/SubmissionSuccessPanel.jsx'
import { useSubmitLenis } from './hooks/useSubmitLenis.js'

const steps = [
  'Review the Ownership theme.',
  'Create one or more original poster responses.',
  'Prepare your files.',
  'Complete the submission form.',
  'Your posters will then be reviewed by the international jury.',
  'Confirm the submission terms.',
  'Submit your entry.',
]

const demoPosterEntries = [
  {
    id: 'demo-greener-tomorrow',
    title: 'Voices for a Greener Tomorrow',
    src: '/UNBLOCKED-poster_files/ff2033a1c38a4357386d641377703903abf0cb51.ff2033a1.png',
  },
  {
    id: 'demo-good-things',
    title: 'Good Things',
    src: '/UNBLOCKED-poster_files/ace3413e5a82a9d017f82762129b9755a0ff0588.ace3413e.png',
  },
]

function SubmitArtwork() {
  return (
    <div className={styles.artwork} aria-hidden="true">
      <svg className={styles.pattern} width="237" height="237" viewBox="0 0 237 237" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M75.9941 59.5742H160.203V76.0053H75.9941V59.5742Z" fill="#DC91A8" />
        <rect x="75.9941" y="39.0312" width="84.2092" height="12.3233" fill="#DC91A8" />
        <rect x="75.9941" y="22.5938" width="84.2092" height="8.21553" fill="#DC91A8" />
        <rect x="75.9941" y="10.2773" width="84.2092" height="4.10776" fill="#DC91A8" />
        <rect x="75.9941" width="84.2092" height="2.05388" fill="#DC91A8" />
        <path d="M160.203 176.633L75.994 176.633L75.994 160.202L160.203 160.202L160.203 176.633Z" fill="#DC91A8" />
        <rect x="160.203" y="197.184" width="84.2092" height="12.3233" transform="rotate(180 160.203 197.184)" fill="#DC91A8" />
        <rect x="160.203" y="213.602" width="84.2092" height="8.21553" transform="rotate(180 160.203 213.602)" fill="#DC91A8" />
        <rect x="160.203" y="225.93" width="84.2092" height="4.10776" transform="rotate(180 160.203 225.93)" fill="#DC91A8" />
        <rect x="160.203" y="236.203" width="84.2092" height="2.05388" transform="rotate(180 160.203 236.203)" fill="#DC91A8" />
        <path d="M59.5625 160.203L59.5625 75.994L75.9936 75.994L75.9936 160.203L59.5625 160.203Z" fill="#DC91A8" />
        <rect x="39.0234" y="160.203" width="84.2092" height="12.3233" transform="rotate(-90 39.0234 160.203)" fill="#DC91A8" />
        <rect x="22.5918" y="160.203" width="84.2092" height="8.21553" transform="rotate(-90 22.5918 160.203)" fill="#DC91A8" />
        <rect x="10.2637" y="160.203" width="84.2092" height="4.10776" transform="rotate(-90 10.2637 160.203)" fill="#DC91A8" />
        <rect y="160.203" width="84.2092" height="2.05388" transform="rotate(-90 0 160.203)" fill="#DC91A8" />
        <path d="M176.631 76L176.631 160.209L160.2 160.209L160.2 76L176.631 76Z" fill="#DC91A8" />
        <rect x="197.176" y="76" width="84.2092" height="12.3233" transform="rotate(90 197.176 76)" fill="#DC91A8" />
        <rect x="213.604" y="76" width="84.2092" height="8.21553" transform="rotate(90 213.604 76)" fill="#DC91A8" />
        <rect x="225.928" y="76" width="84.2092" height="4.10776" transform="rotate(90 225.928 76)" fill="#DC91A8" />
        <rect x="236.199" y="76" width="84.2092" height="2.05388" transform="rotate(90 236.199 76)" fill="#DC91A8" />
      </svg>
    </div>
  )
}

export function SubmitPage({ initialStep = 0 }) {
  const [step, setStep] = useState(initialStep)
  const [posterEntries, setPosterEntries] = useState(() => (
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === 'uploaded'
      ? demoPosterEntries
      : []
  ))
  const [contactDraft, setContactDraft] = useState({ full_name: 'Andre' })
  const [posterDraft, setPosterDraft] = useState({ title: '', posterFiles: [], supportingFiles: [] })
  const [editingEntryId, setEditingEntryId] = useState(null)
  const [saveState, setSaveState] = useState('idle')
  const [saveError, setSaveError] = useState('')
  const [consent, setConsent] = useState({ original: true, terms: false, privacy: false })
  const [submissionState, setSubmissionState] = useState('idle')
  const [submissionError, setSubmissionError] = useState('')
  const contentScrollRef = useRef(null)
  useSubmitLenis(contentScrollRef, step)
  const showContact = step === 1
  const showPoster = step === 2
  const showPosterDetails = step === 3
  const showConsent = step === 4
  const showSuccess = step === 5

  async function handleSubmission() {
    if (!consent.original || !consent.terms || !consent.privacy) {
      setSubmissionError('Please accept all submission terms before submitting.')
      return
    }
    if (!posterDraft.posterFiles?.[0]) {
      setSubmissionError('Please add a poster file before submitting.')
      return
    }

    setSubmissionState('submitting')
    setSubmissionError('')
    const formData = new FormData()
    formData.set('title', posterDraft.title || posterDraft.posterFiles[0].name.replace(/\.[^/.]+$/, ''))
    formData.set('artist_name', contactDraft.full_name || '')
    formData.set('artist_email', contactDraft.email || '')
    formData.set('country', contactDraft.country || '')
    for (const field of ['concept', 'year_designed', 'designed_for', 'client_name', 'creation_method', 'materials_used', 'digital_programs', 'printing_method']) {
      if (posterDraft[field]) formData.set(field, posterDraft[field])
    }
    formData.append('file', posterDraft.posterFiles[0])
    for (const asset of posterDraft.supportingFiles || []) formData.append('assets', asset)

    try {
      const response = await fetch('/api/submissions', { method: 'POST', body: formData })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || 'Submission failed')
      setSubmissionState('submitted')
      setStep(5)
    } catch (error) {
      setSubmissionState('idle')
      setSubmissionError(error.message)
    }
  }

  async function handlePosterSave() {
    if (saveState === 'saving') return
    const title = posterDraft.title?.trim()
    if (!title) {
      setSaveError('Poster title is required.')
      setSaveState('error')
      return
    }
    if (title.length > 200) {
      setSaveError('Poster title must be 200 characters or fewer.')
      setSaveState('error')
      return
    }
    if (!editingEntryId && !posterDraft.posterFiles?.[0]) {
      setSaveError('Please choose a poster file before saving.')
      setSaveState('error')
      return
    }
    if ((posterDraft.supportingFiles || []).length > 3) {
      setSaveError('You can add up to 3 supporting assets.')
      setSaveState('error')
      return
    }

    setSaveError('')
    setSaveState('saving')
    await new Promise(resolve => requestAnimationFrame(resolve))
    const nextEntries = posterDraft.posterFiles.map(file => ({
      id: `${file.name}-${file.lastModified}`,
      title,
      src: URL.createObjectURL(file),
      file,
    }))
    if (editingEntryId) {
      setPosterEntries(current => current.map(entry => entry.id === editingEntryId
        ? { ...entry, title, src: nextEntries[0]?.src || entry.src, file: nextEntries[0]?.file || entry.file }
        : entry))
    } else {
      setPosterEntries(current => [...current, ...nextEntries])
    }
    setSaveState('saved')
    setEditingEntryId(null)
    setStep(2)
  }

  return (
    <main className={`${styles.page} ${showPosterDetails ? styles.editing : ''} ${showSuccess ? styles.success : ''}`} data-name="submit-index">
      <section className={styles.identity} aria-label="Ownership theme">
        <a className={styles.homeLink} href="/">(←) Home</a>
        <SubmitArtwork />
        <h1>Ownership</h1>
      </section>

      <section className={styles.content} aria-labelledby="submit-title">
        {step > 0 && !showSuccess && !showPosterDetails && <SubmitProgress activeStep={showConsent ? 3 : step} compact />}
        {showPosterDetails && <SubmitProgress activeStep={2} compact lineOnly />}
        {showSuccess && <SubmitProgress activeStep={3} compact lineOnly hideBar />}
        {showPosterDetails && <div className={styles.editorActions}>
          <button type="button" disabled={saveState === 'saving'} onClick={() => { setSaveError(''); setSaveState('idle'); setStep(2) }}>Cancel</button>
          <button type="button" disabled={saveState === 'saving'} onClick={handlePosterSave}>{saveState === 'saving' ? 'Saving…' : 'Save'}</button>
          <span className={styles.editorStatus} role="status" aria-live="polite">{saveState === 'saving' ? 'Saving poster…' : ''}</span>
        </div>}
        <div ref={contentScrollRef} className={styles.contentScroll} data-lenis-prevent>
          {showContact
            ? <ContactInformationPanel value={contactDraft} onChange={changes => setContactDraft(current => ({ ...current, ...changes }))} />
            : showPoster
              ? <PosterEntriesPanel entries={posterEntries} onEdit={entry => {
                  setEditingEntryId(entry.id)
                  setPosterDraft({ title: entry.title, posterFiles: entry.file ? [entry.file] : [], supportingFiles: [] })
                  setSaveError('')
                  setSaveState('idle')
                  setStep(3)
                }} onRemove={id => setPosterEntries(current => current.filter(entry => entry.id !== id))} onAdd={() => {
                  setPosterDraft({ title: '', posterFiles: [], supportingFiles: [] })
                  setEditingEntryId(null)
                  setSaveError('')
                  setSaveState('idle')
                  setStep(3)
                }} />
              : showPosterDetails
                ? <PosterDetailsPanel draft={posterDraft} error={saveError} onDraftChange={changes => { setSaveError(''); setSaveState('idle'); setPosterDraft(current => ({ ...current, ...changes })) }} />
                : showConsent
                  ? <ConsentPanel value={consent} onChange={changes => setConsent(current => ({ ...current, ...changes }))} error={submissionError} />
                  : showSuccess
                  ? <SubmissionSuccessPanel onExplore={() => setStep(0)} />
                : <div className={styles.contentInner}>
                    <h2 id="submit-title">
                      <span className={styles.titleDesktop}>Submit to the Poster<br />Contest</span>
                      <span className={styles.titleMobile}>Submit to the<br />Poster Contest</span>
                    </h2>
                    <p className={`${styles.intro} ${styles.introDesktop}`}>Use this page to submit poster work<br />responding to the first theme:<br />Ownership. Before submitting, review the<br />contest overview, Ownership page, and<br />guidelines. Poster Contest Guidelines.</p>
                    <p className={`${styles.intro} ${styles.introMobile}`}>Use this page to submit poster work responding to the first theme: Ownership. Before submitting, review the contest overview, Ownership page, and guidelines. Poster Contest Guidelines.</p>
                    <h3>Submission Process</h3>
                    <ol>
                      {steps.map(step => <li key={step}>{step}</li>)}
                    </ol>
                    <h3>Rules and Eligibility</h3>
                    <ul>
                      <li>Open to individual and collaborative entries.</li>
                      <li>You can submit more than one poster.</li>
                      <li>Submitted work must be original.</li>
                      <li>Accepted file types: JPG, PNG, PDF, GIF, or MP4.</li>
                      <li>Static posters should be under 5MB.</li>
                      <li>Motion posters should be under 20MB.</li>
                      <li>Use the file name format: YourName_PosterTitle.</li>
                      <li>Selected work may require additional formats later.</li>
                    </ul>
                    <button className={styles.submitLink} type="button" onClick={() => setStep(1)}>Enter Submission (→)</button>
                </div>}
        </div>
        {showContact && <SubmitFooterNav nextLabel="Poster" onBack={() => setStep(0)} onNext={() => setStep(2)} />}
        {showPoster && <SubmitFooterNav nextLabel="Consent" nextLabelMobile="Poster" onBack={() => setStep(1)} onNext={() => setStep(4)} />}
        {showConsent && <SubmitFooterNav nextLabel={submissionState === 'submitting' ? 'Submitting' : 'Submit'} disabled={submissionState === 'submitting'} onBack={() => setStep(2)} onNext={handleSubmission} />}
      </section>
    </main>
  )
}
