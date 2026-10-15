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
    src: '/UNBLOCKED-poster_files/e353c20b9b160ceed44fa9f8dfbd71844bc63f36.e353c20b.png',
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
  const [posterDraft, setPosterDraft] = useState({ title: '', posterFiles: [] })
  const [editingEntryId, setEditingEntryId] = useState(null)
  const contentScrollRef = useRef(null)
  useSubmitLenis(contentScrollRef, step)
  const showContact = step === 1
  const showPoster = step === 2
  const showPosterDetails = step === 3
  const showConsent = step === 4
  const showSuccess = step === 5

  return (
    <main className={styles.page} data-name="submit-index">
      <section className={styles.identity} aria-label="Ownership theme">
        <a className={styles.homeLink} href="/">(←) Home</a>
        <SubmitArtwork />
        <h1>Ownership</h1>
      </section>

      <section className={styles.content} aria-labelledby="submit-title">
        {step > 0 && !showSuccess && <SubmitProgress activeStep={showConsent ? 3 : step} compact />}
        {showSuccess && <SubmitProgress activeStep={3} compact lineOnly />}
        {showPosterDetails && <div className={styles.editorActions}>
          <button type="button" onClick={() => setStep(2)}>Cancel</button>
          <button type="button" onClick={() => {
            const nextEntries = posterDraft.posterFiles.map(file => ({
              id: `${file.name}-${file.lastModified}`,
              title: posterDraft.title || file.name.replace(/\.[^/.]+$/, ''),
              src: URL.createObjectURL(file),
            }))
            if (editingEntryId) {
              setPosterEntries(current => current.map(entry => entry.id === editingEntryId
                ? { ...entry, title: posterDraft.title || entry.title, src: nextEntries[0]?.src || entry.src }
                : entry))
            } else {
              setPosterEntries(current => [...current, ...nextEntries])
            }
            setEditingEntryId(null)
            setStep(2)
          }}>Save</button>
        </div>}
        <div ref={contentScrollRef} className={styles.contentScroll} data-lenis-prevent>
          {showContact
            ? <ContactInformationPanel embedded />
            : showPoster
              ? <PosterEntriesPanel entries={posterEntries} onEdit={entry => {
                  setEditingEntryId(entry.id)
                  setPosterDraft({ title: entry.title, posterFiles: [] })
                  setStep(3)
                }} onRemove={id => setPosterEntries(current => current.filter(entry => entry.id !== id))} onAdd={() => {
                  setPosterDraft({ title: '', posterFiles: [] })
                  setEditingEntryId(null)
                  setStep(3)
                }} />
              : showPosterDetails
                ? <PosterDetailsPanel draft={posterDraft} onDraftChange={changes => setPosterDraft(current => ({ ...current, ...changes }))} />
                : showConsent
                  ? <ConsentPanel />
                  : showSuccess
                  ? <SubmissionSuccessPanel onExplore={() => setStep(0)} />
                : <div className={styles.contentInner}>
                    <h2 id="submit-title">Submit to the Poster<br />Contest</h2>
                    <p className={styles.intro}>Use this page to submit poster work<br />responding to the first theme:<br />Ownership. Before submitting, review the<br />contest overview, Ownership page, and<br />guidelines. Poster Content Guidelines.</p>
                    <h3>Submission Process</h3>
                    <ol>
                      {steps.map(step => <li key={step}>{step}</li>)}
                    </ol>
                    <button className={styles.submitLink} type="button" onClick={() => setStep(1)}>Enter Submission (→)</button>
                </div>}
        </div>
        {showContact && <SubmitFooterNav nextLabel="Poster" onBack={() => setStep(0)} onNext={() => setStep(2)} />}
        {showPoster && <SubmitFooterNav nextLabel="Consent" onBack={() => setStep(1)} onNext={() => setStep(4)} />}
        {showConsent && <SubmitFooterNav nextLabel="Submit" onBack={() => setStep(2)} onNext={() => setStep(5)} />}
      </section>
    </main>
  )
}
