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
import { RevealText } from '../../../components/RevealText/RevealText.jsx'
import {
  createEntry,
  deleteEntry,
  getContest,
  requestEmailCode,
  submitEntries,
  updateEntry,
  updateProfile,
  uploadAsset,
  uploadPoster,
  verifyEmailCode,
} from './api/submitFormApi.js'

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
  const [verification, setVerification] = useState({ status: 'idle', code: '', error: '' })
  const [contest, setContest] = useState(null)
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

  function getErrorMessage(result, fallback) {
    return result?.body?.error || result?.body?.message || fallback
  }

  function profileFromContact() {
    return {
      name: contactDraft.full_name?.trim(),
      country: contactDraft.country?.trim(),
      instagram: contactDraft.instagram?.trim(),
      bio: [contactDraft.city, contactDraft.website, contactDraft.telephone].filter(Boolean).join(' | '),
    }
  }

  async function handleContactNext() {
    const email = contactDraft.email?.trim().toLowerCase()
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setVerification({ status: 'idle', code: '', error: 'Please enter a valid email address.' })
      return
    }

    setVerification(current => ({ ...current, status: current.status === 'code_sent' ? 'verifying' : 'sending', error: '' }))
    try {
      const contestResult = contest || await getContest()
      if (!contestResult.ok) throw new Error(getErrorMessage(contestResult, 'Could not load the contest.'))
      setContest(contestResult.body)

      if (verification.status !== 'code_sent') {
        const result = await requestEmailCode(email, profileFromContact(), contestResult.body.termsVersion)
        if (result.status !== 202) throw new Error(getErrorMessage(result, 'Could not send the verification code.'))
        setVerification({ status: 'code_sent', code: '', error: '' })
        return
      }

      if (!/^\d{6}$/.test(verification.code)) throw new Error('Enter the 6-digit verification code.')
      const result = await verifyEmailCode(email, verification.code)
      if (!result.ok) throw new Error(getErrorMessage(result, 'That verification code is not valid.'))
      const profileResult = await updateProfile(profileFromContact(), contestResult.body.termsVersion)
      if (!profileResult.ok) throw new Error(getErrorMessage(profileResult, 'Could not save your profile.'))
      setVerification({ status: 'verified', code: '', error: '' })
      setStep(2)
    } catch (error) {
      setVerification(current => ({ ...current, status: current.status === 'verifying' ? 'code_sent' : 'idle', error: error.message }))
    }
  }

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
    try {
      if (!contest) throw new Error('Contest details are not available. Please return to contact information and try again.')
      if (!posterEntries.length || posterEntries.some(entry => !entry.remoteId)) throw new Error('Save at least one poster draft before submitting.')
      const result = await submitEntries(posterEntries.map(entry => entry.remoteId), contest.consentVersion)
      if (!result.ok) throw new Error(getErrorMessage(result, 'Submission failed'))
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

    const posterFile = posterDraft.posterFiles[0]
    if (posterFile) {
      const extension = posterFile.name.split('.').pop()?.toLowerCase()
      const staticFile = ['jpg', 'jpeg', 'png', 'pdf'].includes(extension)
      const allowed = [...['jpg', 'jpeg', 'png', 'pdf'], 'gif', 'mp4']
      if (!allowed.includes(extension) || posterFile.size > (staticFile ? 5 : 20) * 1024 * 1024) {
        setSaveError(staticFile ? 'Poster must be JPG, PNG, or PDF under 5MB.' : 'Motion poster must be GIF or MP4 under 20MB.')
        setSaveState('error')
        return
      }
    }

    setSaveError('')
    setSaveState('saving')
    try {
      const fields = Object.fromEntries(['title', 'year_designed', 'designed_for', 'client_name', 'creation_method', 'materials_used', 'digital_programs', 'printing_method', 'concept']
        .map(field => [field, field === 'title' ? title : posterDraft[field] || '']))
      const remoteId = posterDraft.remoteId || crypto.randomUUID()
      let result = posterDraft.remoteId
        ? await updateEntry(remoteId, fields, posterDraft.version)
        : await createEntry(remoteId, fields)
      if (!result.ok) throw new Error(getErrorMessage(result, 'Could not save the poster draft.'))

      const version = result.body.version || result.body.entry?.version
      if (posterFile) {
        result = await uploadPoster(remoteId, posterFile)
        if (!result.ok) throw new Error(getErrorMessage(result, 'Could not upload the poster file.'))
      }
      for (const asset of posterDraft.supportingFiles || []) {
        result = await uploadAsset(remoteId, asset)
        if (!result.ok) throw new Error(getErrorMessage(result, 'Could not upload a supporting asset.'))
      }

      const previousEntry = posterEntries.find(entry => entry.id === editingEntryId)
      const nextEntry = {
        id: editingEntryId || remoteId,
        remoteId,
        version: result.body.version || version,
        title,
        src: posterFile ? URL.createObjectURL(posterFile) : previousEntry?.src,
        file: posterFile || previousEntry?.file,
      }
      setPosterEntries(current => editingEntryId
        ? current.map(entry => entry.id === editingEntryId ? { ...entry, ...nextEntry } : entry)
        : [...current, nextEntry])
      setSaveState('saved')
      setEditingEntryId(null)
      setStep(2)
    } catch (error) {
      setSaveState('error')
      setSaveError(error.message)
    }
  }

  return (
    <main className={`${styles.page} ${showPosterDetails ? styles.editing : ''} ${showSuccess ? styles.success : ''}`} data-name="submit-index">
      <section className={styles.identity} aria-label="Ownership theme">
        <a className={styles.homeLink} href="/">(←) Home</a>
        <SubmitArtwork />
        <RevealText as="h1">Ownership</RevealText>
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
            ? <ContactInformationPanel value={contactDraft} verification={verification} onVerificationChange={changes => setVerification(current => ({ ...current, ...changes }))} onChange={changes => setContactDraft(current => ({ ...current, ...changes }))} />
            : showPoster
              ? <PosterEntriesPanel entries={posterEntries} onEdit={entry => {
                  setEditingEntryId(entry.id)
                  setPosterDraft({ title: entry.title, remoteId: entry.remoteId, version: entry.version, posterFiles: entry.file ? [entry.file] : [], supportingFiles: [] })
                  setSaveError('')
                  setSaveState('idle')
                  setStep(3)
                }} onRemove={async id => {
                  const entry = posterEntries.find(item => item.id === id)
                  if (entry?.remoteId) await deleteEntry(entry.remoteId)
                  setPosterEntries(current => current.filter(item => item.id !== id))
                }} onAdd={() => {
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
                      <RevealText as="span" className={styles.titleDesktop}>Submit to the Poster<br />Contest</RevealText>
                      <RevealText as="span" className={styles.titleMobile}>Submit to the<br />Poster Contest</RevealText>
                    </h2>
                    <RevealText as="p" className={`${styles.intro} ${styles.introDesktop}`}>Use this page to submit poster work<br />responding to the first theme:<br />Ownership. Before submitting, review the<br />contest overview, Ownership page, and<br />guidelines. Poster Contest Guidelines.</RevealText>
                    <RevealText as="p" className={`${styles.intro} ${styles.introMobile}`}>Use this page to submit poster work responding to the first theme: Ownership. Before submitting, review the contest overview, Ownership page, and guidelines. Poster Contest Guidelines.</RevealText>
                    <RevealText as="h3">Submission Process</RevealText>
                    <ol>
                      {steps.map(step => <li key={step}>{step}</li>)}
                    </ol>
                    <RevealText as="h3">Rules and Eligibility</RevealText>
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
        {showContact && <SubmitFooterNav nextLabel={verification.status === 'code_sent' ? 'Verify email' : 'Send code'} disabled={verification.status === 'sending' || verification.status === 'verifying'} onBack={() => setStep(0)} onNext={handleContactNext} />}
        {showPoster && <SubmitFooterNav nextLabel="Consent" nextLabelMobile="Poster" onBack={() => setStep(1)} onNext={() => setStep(4)} />}
        {showConsent && <SubmitFooterNav nextLabel={submissionState === 'submitting' ? 'Submitting' : 'Submit'} disabled={submissionState === 'submitting'} onBack={() => setStep(2)} onNext={handleSubmission} />}
      </section>
    </main>
  )
}
