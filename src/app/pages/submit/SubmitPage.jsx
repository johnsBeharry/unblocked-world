import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './SubmitPage.module.scss'
import { ContactInformationPanel } from './components/ContactInformationPanel/ContactInformationPanel.jsx'
import { ProfilePanel } from './components/profile-panel/ProfilePanel.jsx'
import { AccountNav } from './components/account-nav/AccountNav.jsx'
import { ChangeEmailDialog } from './components/change-email-dialog/ChangeEmailDialog.jsx'
import { ManagePosterPanel } from './components/manage-poster-panel/ManagePosterPanel.jsx'
import { LeaveDialog } from './components/leave-dialog/LeaveDialog.jsx'
import { SubmitProgress } from './components/SubmitProgress/SubmitProgress.jsx'
import { SubmitFooterNav } from './components/SubmitFooterNav/SubmitFooterNav.jsx'
import { PosterEntriesPanel } from './components/PosterEntriesPanel/PosterEntriesPanel.jsx'
import { PosterDetailsPanel } from './components/PosterDetailsPanel/PosterDetailsPanel.jsx'
import { ConsentPanel } from './components/ConsentPanel/ConsentPanel.jsx'
import { SubmissionSuccessPanel } from './components/SubmissionSuccessPanel/SubmissionSuccessPanel.jsx'
import { useSubmitLenis } from './hooks/useSubmitLenis.js'
import { useSubmitIntro } from './hooks/useSubmitIntro.js'
import { RevealText } from '../../../components/RevealText/RevealText.jsx'
import { RollingText } from '../../../components/RollingText/RollingText.jsx'
import { RevealRow } from '../../../components/RevealRow/RevealRow.jsx'
import {
  createEntry,
  deleteEntry,
  getContest,
  getProfile,
  PROFILE_PHOTO_URL,
  deleteProfilePhoto,
  entryFileUrl,
  listEntries,
  restoreEntry,
  withdrawEntry,
  requestEmailCode,
  signOut,
  uploadProfilePhoto,
  submitEntries,
  updateEntry,
  updateProfile,
  uploadAsset,
  uploadPoster,
  verifyEmailCode,
} from './api/submitFormApi.js'
import { PHOTO_TYPES, blobToBase64, shrinkPhoto } from './api/profilePhoto.js'
import { CONSENTS } from './components/ConsentPanel/ConsentPanel.jsx'
import { MAX_SUPPORTING_FILES } from './components/PosterDetailsPanel/PosterDetailsPanel.jsx'

// Overview copy follows the reference form.
const steps = [
  'Review the Ownership theme.',
  'Create one or more original poster responses.',
  'Prepare your files.',
  'Join UNBLOCKED and confirm your email with a code we send you. No password needed.',
  'Add your posters. Everything saves as you go.',
  'Confirm the submission terms and submit.',
  'Your posters will then be reviewed by the international jury.',
]

const rules = [
  'Open to individual and collaborative entries.',
  'You can submit more than one poster, on the same day or later.',
  'Submitted work must be original.',
  'Accepted file types: JPG, PNG, PDF, GIF or MP4.',
  'Static posters (JPG, PNG, PDF) must be under 5 MB.',
  'Motion posters (GIF, MP4) must be under 20 MB.',
  'Up to 3 supporting files per poster.',
  'Use the file name format: YourName_PosterTitle.',
  'Selected work may require additional formats later.',
]

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

const demoPosterEntries = [
  {
    id: 'demo-greener-tomorrow',
    title: 'Voices for a Greener Tomorrow',
    meta: 'PNG · 759 KB',
    src: '/UNBLOCKED-poster_files/ff2033a1c38a4357386d641377703903abf0cb51.ff2033a1.png',
  },
  {
    id: 'demo-good-things',
    title: 'Good Things',
    meta: 'PNG · 759 KB',
    src: '/UNBLOCKED-poster_files/ace3413e5a82a9d017f82762129b9755a0ff0588.ace3413e.png',
  },
]

// Entry, once the black column is 80% of the way in: the box is revealed by
// a mask moving right → left, then every bar grows from flat (scale 0 on its
// thickness axis: top/bottom arms vertically, left/right arms horizontally) to
// full size while fading in. Never short → long.
// Ease-out so the box moves at once, carrying on the panel's momentum (it
// reads as pushed by the panel instead of waiting for it).
const ART_BOX = { duration: 0.9, ease: 'power3.out' }
const ART_BAR = { duration: 0.9, ease: 'power2.inOut' }
const ART_BARS_AT = 0.75 // bars start as the box mask settles
const BOX_HIDDEN = 'inset(0% 0% 0% 100%)'
const BOX_SHOWN = 'inset(0% 0% 0% 0%)'

// Thickness axis = shorter side of the bar's own (untransformed) box; this holds
// for the rotate(±90) rects of the side arms too.
const thicknessAxis = (bar) => {
  const box = bar.getBBox()
  return box.width > box.height ? 'scaleY' : 'scaleX'
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The entry timeline is built paused before paint and handed to the page via
// `introRef`; useSubmitIntro plays it at the right moment of the panel slide.
function SubmitArtwork({ introRef }) {
  const artworkRef = useRef(null)

  useLayoutEffect(() => {
    const artwork = artworkRef.current
    if (!artwork || reducedMotion()) return undefined
    const bars = Array.from(artwork.querySelectorAll('svg path, svg rect'))
    gsap.set(artwork, { clipPath: BOX_HIDDEN })
    bars.forEach((bar) => gsap.set(bar, { [thicknessAxis(bar)]: 0, opacity: 0, transformOrigin: '50% 50%' }))
    const timeline = gsap.timeline({ paused: true })
      // Drop the finished mask so the box edges render exactly as without it.
      .to(artwork, { clipPath: BOX_SHOWN, ...ART_BOX, onComplete: () => gsap.set(artwork, { clearProps: 'clipPath' }) })
      .to(bars, { scaleX: 1, scaleY: 1, opacity: 1, ...ART_BAR }, ART_BOX.duration * ART_BARS_AT)
    introRef.current = timeline

    return () => {
      timeline.kill()
      if (introRef.current === timeline) introRef.current = null
      // Restore values only: clearing props would also drop the bars' own
      // SVG rotate() transforms.
      gsap.set(artwork, { clearProps: 'clipPath' })
      gsap.set(bars, { scaleX: 1, scaleY: 1, opacity: 1 })
    }
  }, [introRef])

  return (
    <div ref={artworkRef} className={styles.artwork} aria-hidden="true">
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

// Readable text for the form API's error codes (see getErrorMessage).
const ERROR_MESSAGES = {
  submissions_closed: 'Submissions are closed right now, so posters can’t be saved or submitted. Please try again once the open call is open.',
  form_api_unavailable: 'The submission service can’t be reached right now. Please try again in a moment.',
}

// Dev-only QA states: /submit?dev=<name> opens that screen directly (no
// email code needed). Ignored in production builds. Saving or submitting
// still calls the form API.
const DEV_CONTACT = { email: 'dev@example.com', name: 'Dev Tester', country: 'Indonesia', terms: true }
const DEV_VERIFIED = { contact: DEV_CONTACT, verification: { status: 'verified', code: '', error: '' } }
const DEV_STATES = {
  join: { step: 1 },
  'join-code': { step: 1, contact: DEV_CONTACT, verification: { status: 'code_sent', code: '', error: '' } },
  signin: { step: 1, joinMode: 'signin' },
  'signin-code': { step: 1, joinMode: 'signin', contact: DEV_CONTACT, verification: { status: 'code_sent', code: '', error: '' } },
  posters: { step: 2, ...DEV_VERIFIED },
  'posters-uploaded': { step: 2, ...DEV_VERIFIED, entries: true },
  'add-poster': { step: 3, ...DEV_VERIFIED },
  submit: { step: 4, ...DEV_VERIFIED, entries: true },
  success: { step: 5, ...DEV_VERIFIED, entries: true },
  profile: { step: 1, ...DEV_VERIFIED },
  manage: { step: 1, ...DEV_VERIFIED, accountTab: 'posters', entries: 'sent' },
  'manage-drafts': { step: 1, ...DEV_VERIFIED, accountTab: 'posters', entries: 'sent+drafts' },
}
function readDevState() {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null
  return DEV_STATES[new URLSearchParams(window.location.search).get('dev')] || null
}

export function SubmitPage({ initialStep = 0 }) {
  const [dev] = useState(readDevState)
  const [step, setStep] = useState(dev?.step ?? initialStep)
  const [posterEntries, setPosterEntries] = useState(() => {
    // ?dev=manage: the demo posters as one withdrawn and one submitted entry.
    // ?dev=manage-drafts adds the two demo posters again as drafts.
    if (dev?.entries === 'sent' || dev?.entries === 'sent+drafts') {
      const sent = demoPosterEntries.map((entry, index) => ({ ...entry, id: `${entry.id}-sent`, submitted: true, status: index === 0 ? 'withdrawn' : 'submitted', submittedAt: '2026-02-27T10:00:00Z' }))
      return dev.entries === 'sent' ? sent : [...sent, ...demoPosterEntries]
    }
    return dev?.entries || (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === 'uploaded')
      ? demoPosterEntries
      : []
  })
  const [contactDraft, setContactDraft] = useState(dev?.contact ?? {})
  const [joinMode, setJoinMode] = useState(dev?.joinMode ?? 'join')
  const [verification, setVerification] = useState(dev?.verification ?? { status: 'idle', code: '', error: '' })
  const [contest, setContest] = useState(null)
  const [posterDraft, setPosterDraft] = useState({ title: '', posterFiles: [], supportingFiles: [] })
  const [editingEntryId, setEditingEntryId] = useState(null)
  const [saveState, setSaveState] = useState('idle')
  const [saveError, setSaveError] = useState('')
  const [consent, setConsent] = useState({})
  const [submissionState, setSubmissionState] = useState('idle')
  const [submissionError, setSubmissionError] = useState('')
  const [accountTab, setAccountTab] = useState(dev?.accountTab ?? 'profile')
  const contentScrollRef = useRef(null)
  useSubmitLenis(contentScrollRef, `${step}-${joinMode}-${accountTab}`)
  const contentRef = useRef(null)
  const artIntroRef = useRef(null)
  const introPending = useSubmitIntro(contentRef, artIntroRef)
  const showContact = step === 1
  // Signed in (verified, or a session found on load): step 1 is the Profile
  // screen with the account nav instead of the Join form.
  // Its "Poster" tab is Manage Poster (sent posters).
  const showAccount = showContact && verification.status === 'verified'
  const showProfile = showAccount && accountTab === 'profile'
  const showManage = showAccount && accountTab === 'posters'
  // Progress bar: one of five frames — Join / Sign In, email code, Your
  // Entries, Add a Poster, Submit.
  const codeFrame = verification.status === 'code_sent' || verification.status === 'verifying'
  const frameProgress = (showContact ? (codeFrame ? 2 : 1) : step === 2 ? 3 : step === 3 ? 4 : 5) / 5
  const contactBusy = verification.status === 'sending' || verification.status === 'verifying'
  const contactNextLabel = verification.status === 'sending' ? 'Sending…' : verification.status === 'verifying' ? 'Checking…' : 'Continue'
  const showPoster = step === 2
  const showPosterDetails = step === 3
  const showConsent = step === 4
  const showSuccess = step === 5

  // The form API answers with machine codes (e.g. 409 `submissions_closed`);
  // show a sentence instead. A readable `message` wins over a bare code.
  function getErrorMessage(result, fallback) {
    const { error, message } = result?.body || {}
    if (ERROR_MESSAGES[error]) return ERROR_MESSAGES[error]
    if (message) return message
    if (error && !/^[a-z0-9_]+$/.test(error)) return error
    return fallback
  }

  function profileFromContact() {
    return {
      name: contactDraft.name?.trim(),
      country: contactDraft.country?.trim(),
      instagram: contactDraft.instagram?.trim(),
      bio: contactDraft.bio?.trim(),
    }
  }

  // Join validation (reference copy); signing in only needs the email.
  function contactError(email) {
    if (!email) return 'Add your email'
    if (!EMAIL_PATTERN.test(email)) return 'Check this email address'
    if (joinMode !== 'join') return ''
    if (!contactDraft.name?.trim()) return 'Add your full name'
    if (!contactDraft.country) return 'Choose your country'
    if (!contactDraft.terms) return 'Agree to the Terms of Service and Privacy Policy to join.'
    return ''
  }

  // Contest details (terms/consent versions), loaded once and cached.
  async function loadContest() {
    if (contest) return contest
    const result = await getContest()
    if (!result.ok) throw new Error(getErrorMessage(result, 'Could not load the contest.'))
    setContest(result.body)
    return result.body
  }

  async function sendCode(email, termsVersion) {
    const joining = joinMode === 'join'
    const photo = joining && contactDraft.photo?.blob ? await blobToBase64(contactDraft.photo.blob) : undefined
    return requestEmailCode(email, joining ? profileFromContact() : null, termsVersion, photo)
  }

  async function handlePhotoChange(file) {
    const signedIn = verification.status === 'verified'
    if (!file) {
      if (contactDraft.photo?.url && !contactDraft.photo.remote) URL.revokeObjectURL(contactDraft.photo.url)
      setContactDraft(current => ({ ...current, photo: null }))
      if (signedIn) {
        const result = await deleteProfilePhoto()
        if (!result.ok) setVerification(current => ({ ...current, error: getErrorMessage(result, 'Could not remove the photo.') }))
      }
      return
    }
    if (!PHOTO_TYPES.includes(file.type)) {
      setVerification(current => ({ ...current, error: 'Profile photo must be JPG, PNG or WebP.' }))
      return
    }
    const blob = await shrinkPhoto(file)
    if (!blob) {
      setVerification(current => ({ ...current, error: 'That photo could not be read.' }))
      return
    }
    if (contactDraft.photo?.url && !contactDraft.photo.remote) URL.revokeObjectURL(contactDraft.photo.url)
    setContactDraft(current => ({ ...current, photo: { blob, url: URL.createObjectURL(blob) } }))
    // Signed in: the profile already exists, so the photo goes up directly
    // (when joining it travels with the code request).
    if (signedIn) {
      const result = await uploadProfilePhoto(blob)
      if (!result.ok) setVerification(current => ({ ...current, error: getErrorMessage(result, 'Could not save the photo.') }))
    }
  }

  // Profile screen: details save as they are typed (PATCH /me, 700ms after
  // the last change).
  const profileDirtyRef = useRef(false)
  useEffect(() => {
    if (!showProfile || !profileDirtyRef.current) return undefined
    const timer = setTimeout(async () => {
      profileDirtyRef.current = false
      const result = await updateProfile(profileFromContact())
      if (!result.ok) setVerification(current => ({ ...current, error: getErrorMessage(result, 'Could not save your profile.') }))
    }, 700)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showProfile, contactDraft.name, contactDraft.country, contactDraft.instagram, contactDraft.bio])

  // A session from an earlier visit (cookie) signs the artist straight in.
  useEffect(() => {
    if (dev) return undefined
    let cancelled = false
    getProfile().then(result => {
      if (cancelled || !result.ok || !result.body?.email) return
      const profile = result.body
      setContactDraft(current => ({
        ...current,
        email: profile.email,
        name: profile.name || '',
        country: profile.country || '',
        instagram: profile.instagram || '',
        bio: profile.bio || '',
        terms: Boolean(profile.termsAccepted),
        photo: profile.hasPhoto ? { remote: true, url: `${PROFILE_PHOTO_URL}?v=${encodeURIComponent(profile.photoId || '')}` } : null,
      }))
      setVerification({ status: 'verified', code: '', error: '' })
    }).catch(() => {})
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Change Email (user choice 2026-11-17; the portal can't change an
  // account's email): a code goes to the new address with the current
  // details (a separate profile there); the current session stays until the
  // code is confirmed, then the artist is signed in with the new address.
  // Posters stay with the old account, so the entries list is cleared.
  const [changeEmail, setChangeEmail] = useState({ open: false, stage: 'email', email: '', code: '', busy: false, error: '' })
  const updateChangeEmail = changes => setChangeEmail(current => ({ ...current, ...changes }))
  async function handleChangeEmailSend() {
    const email = changeEmail.email.trim().toLowerCase()
    if (!EMAIL_PATTERN.test(email)) return updateChangeEmail({ error: 'Check this email address.' })
    if (email === contactDraft.email?.toLowerCase()) return updateChangeEmail({ error: 'That is already your email.' })
    updateChangeEmail({ busy: true, error: '' })
    try {
      const { termsVersion } = await loadContest()
      const photo = contactDraft.photo?.blob ? await blobToBase64(contactDraft.photo.blob) : undefined
      const result = await requestEmailCode(email, profileFromContact(), termsVersion, photo)
      if (result.status !== 202) throw new Error(getErrorMessage(result, 'Could not send the code.'))
      updateChangeEmail({ email, stage: 'code', code: '', busy: false })
    } catch (error) {
      updateChangeEmail({ busy: false, error: error.message })
    }
  }
  async function handleChangeEmailResend() {
    updateChangeEmail({ busy: true, error: '' })
    try {
      const { termsVersion } = await loadContest()
      const result = await requestEmailCode(changeEmail.email, profileFromContact(), termsVersion)
      if (result.status !== 202) throw new Error(getErrorMessage(result, 'Could not send the code.'))
      updateChangeEmail({ busy: false, code: '', error: 'We sent you a new code.' })
    } catch (error) {
      updateChangeEmail({ busy: false, error: error.message })
    }
  }
  async function handleChangeEmailConfirm() {
    if (!/^\d{6}$/.test(changeEmail.code)) return updateChangeEmail({ error: 'Enter the 6-digit code.' })
    updateChangeEmail({ busy: true, error: '' })
    try {
      const result = await verifyEmailCode(changeEmail.email, changeEmail.code)
      if (!result.ok) throw new Error(getErrorMessage(result, 'That code is not valid.'))
      const { termsVersion } = await loadContest()
      const profileResult = await updateProfile(profileFromContact(), termsVersion)
      if (!profileResult.ok) throw new Error(getErrorMessage(profileResult, 'Could not save your profile.'))
      setContactDraft(current => ({ ...current, email: changeEmail.email, photo: current.photo?.blob ? current.photo : null }))
      setPosterEntries([])
      setChangeEmail(current => ({ ...current, open: false, busy: false }))
    } catch (error) {
      updateChangeEmail({ busy: false, error: error.message })
    }
  }
  // A complete code is checked right away (like the sign-in code screen).
  useEffect(() => {
    if (changeEmail.open && changeEmail.stage === 'code' && !changeEmail.busy && changeEmail.code.length === 6) handleChangeEmailConfirm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeEmail.code])

  // Entries from the server once signed in (GET /entries), so posters from
  // earlier visits show up; local thumbnails are kept for the same entry.
  const entryFromServer = (remote, local) => ({
    ...local,
    id: remote.id,
    remoteId: remote.id,
    version: remote.version,
    title: remote.fields?.title || local?.title || 'Untitled poster',
    status: remote.status,
    submitted: remote.status !== 'draft',
    submittedAt: remote.submittedAt,
    withdrawnAt: remote.withdrawnAt,
    file: local?.file || (remote.file ? { ...remote.file } : null),
    src: local?.src || (remote.file && /^image\//.test(remote.file.type || '') ? entryFileUrl(remote.id) : undefined),
  })
  useEffect(() => {
    if (dev || verification.status !== 'verified') return undefined
    let cancelled = false
    listEntries().then(result => {
      if (cancelled || !result.ok || !Array.isArray(result.body?.entries)) return
      setPosterEntries(current => result.body.entries.map(remote => entryFromServer(remote, current.find(entry => entry.remoteId === remote.id || entry.id === remote.id))))
    }).catch(() => {})
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verification.status])

  // "Submit Poster": with drafts it reads "Submit Poster (02)" (draft count)
  // and opens Your Entries; without drafts "Submit Poster (→)" opens a new
  // Add a Poster (user note 2026-11-17).
  const draftCount = posterEntries.filter(entry => !entry.submitted && (!entry.status || entry.status === 'draft')).length
  function openSubmitFromManage() {
    if (draftCount) return setStep(2)
    setPosterDraft({ title: '', posterFiles: [], supportingFiles: [] })
    setEditingEntryId(null)
    setSaveError('')
    setSaveState('idle')
    setStep(3)
  }

  // Manage Poster: sent posters, withdrawn or restored in place.
  const sentEntries = posterEntries.filter(entry => entry.status === 'submitted' || entry.status === 'withdrawn' || (entry.submitted && !entry.status))
  const [entryBusyId, setEntryBusyId] = useState(null)
  async function handleEntryStatus(entry, action) {
    setEntryBusyId(entry.id)
    try {
      const id = entry.remoteId || entry.id
      const result = action === 'withdraw' ? await withdrawEntry(id) : await restoreEntry(id)
      if (!result.ok) throw new Error(getErrorMessage(result, action === 'withdraw' ? 'Could not withdraw the poster.' : 'Could not restore the poster.'))
      const status = result.body?.status || (action === 'withdraw' ? 'withdrawn' : 'submitted')
      setPosterEntries(current => current.map(item => item.id === entry.id ? { ...item, status, submitted: true, version: result.body?.version ?? item.version } : item))
    } catch (error) {
      setVerification(current => ({ ...current, error: error.message }))
    } finally {
      setEntryBusyId(null)
    }
  }

  // "(←) Home" inside the flow asks first ("Leave for now?"). Save & Leave
  // saves an open Add a Poster / pending profile edits, then leaves through
  // a real link click so the page curtain plays.
  const [leave, setLeave] = useState({ open: false, busy: false, error: '' })
  function handleHomeClick(event) {
    if (step === 0 || showSuccess || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    setLeave({ open: true, busy: false, error: '' })
  }
  async function handleSaveAndLeave() {
    setLeave(current => ({ ...current, busy: true, error: '' }))
    try {
      if (showProfile && profileDirtyRef.current) {
        profileDirtyRef.current = false
        const result = await updateProfile(profileFromContact())
        if (!result.ok) throw new Error(getErrorMessage(result, 'Could not save your profile.'))
      }
      if (showPosterDetails && (posterDraft.title?.trim() || posterDraft.posterFiles?.length)) {
        // Not saved: close so the reason shows on the form (it stays open).
        if (!(await handlePosterSave())) return setLeave({ open: false, busy: false, error: '' })
      }
      setLeave({ open: false, busy: false, error: '' })
      const link = document.createElement('a')
      link.href = '/'
      document.body.appendChild(link)
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }))
      link.remove()
    } catch (error) {
      setLeave(current => ({ ...current, busy: false, error: error.message }))
    }
  }

  // Sign out (DELETE /session). "(Change Email)" also signs out but keeps the
  // details to join again with another address; plain sign out clears them
  // and lands on Sign In.
  const [accountBusy, setAccountBusy] = useState(false)
  async function handleSignOut(changeEmail) {
    setAccountBusy(true)
    try {
      const result = await signOut()
      if (!result.ok && result.status !== 401) throw new Error(getErrorMessage(result, 'Could not sign out.'))
      setContactDraft(current => (changeEmail
        ? { name: current.name, country: current.country, instagram: current.instagram, bio: current.bio }
        : {}))
      setPosterEntries([])
      setJoinMode(changeEmail ? 'join' : 'signin')
      setVerification({ status: 'idle', code: '', error: '' })
      setStep(1)
    } catch (error) {
      setVerification(current => ({ ...current, error: error.message }))
    } finally {
      setAccountBusy(false)
    }
  }

  async function handleResend() {
    const email = contactDraft.email?.trim().toLowerCase()
    try {
      const { termsVersion } = await loadContest()
      const result = await sendCode(email, termsVersion)
      if (result.status !== 202) throw new Error(getErrorMessage(result, 'Could not send the verification code.'))
      setVerification(current => ({ ...current, code: '', error: 'We sent you a new code.' }))
    } catch (error) {
      setVerification(current => ({ ...current, error: error.message }))
    }
  }

  // (←) on the Join step goes back one frame: code screen → email / details,
  // Sign In → Join, Join → the overview.
  function handleContactBack() {
    if (contactBusy) return
    if (verification.status === 'code_sent') setVerification({ status: 'idle', code: '', error: '' })
    else if (joinMode === 'signin') {
      setJoinMode('join')
      setVerification(current => (current.status === 'verified' ? current : { status: 'idle', code: '', error: '' }))
    } else setStep(0)
  }

  async function handleContactNext() {
    const email = contactDraft.email?.trim().toLowerCase()
    // Back from Posters after verifying: the session is valid, so Continue
    // skips the code (Join still saves profile edits).
    if (verification.status === 'verified') {
      setVerification(current => ({ ...current, status: 'sending', error: '' }))
      try {
        if (joinMode === 'join') {
          const invalid = contactError(email)
          if (invalid) throw new Error(invalid)
          const { termsVersion } = await loadContest()
          const profileResult = await updateProfile(profileFromContact(), termsVersion)
          if (!profileResult.ok) throw new Error(getErrorMessage(profileResult, 'Could not save your profile.'))
        }
        setVerification({ status: 'verified', code: '', error: '' })
        setStep(2)
      } catch (error) {
        setVerification({ status: 'verified', code: '', error: error.message })
      }
      return
    }
    const invalid = verification.status !== 'code_sent' && contactError(email)
    if (invalid) {
      setVerification({ status: 'idle', code: '', error: invalid })
      return
    }

    setVerification(current => ({ ...current, status: current.status === 'code_sent' ? 'verifying' : 'sending', error: '' }))
    try {
      const { termsVersion } = await loadContest()

      if (verification.status !== 'code_sent') {
        const result = await sendCode(email, termsVersion)
        if (result.status !== 202) throw new Error(getErrorMessage(result, 'Could not send the verification code.'))
        setVerification({ status: 'code_sent', code: '', error: '' })
        return
      }

      if (!/^\d{6}$/.test(verification.code)) throw new Error('Enter the 6-digit verification code.')
      const result = await verifyEmailCode(email, verification.code)
      if (!result.ok) throw new Error(getErrorMessage(result, 'That verification code is not valid.'))
      if (joinMode === 'join') {
        const profileResult = await updateProfile(profileFromContact(), termsVersion)
        if (!profileResult.ok) throw new Error(getErrorMessage(profileResult, 'Could not save your profile.'))
      }
      setVerification({ status: 'verified', code: '', error: '' })
      setStep(2)
    } catch (error) {
      setVerification(current => ({ ...current, status: current.status === 'verifying' ? 'code_sent' : 'idle', error: error.message }))
    }
  }

  const inProgressEntries = posterEntries.filter(entry => !entry.submitted)

  async function handleSubmission() {
    // Every in-progress poster is sent (the Consent step has no picker).
    const chosen = inProgressEntries
    if (!chosen.length) {
      setSubmissionError('Add at least one poster before submitting.')
      return
    }
    if (!CONSENTS.every(item => consent[item.name])) {
      setSubmissionError('Please confirm all three terms before submitting.')
      return
    }

    setSubmissionState('submitting')
    setSubmissionError('')
    try {
      // Loaded here if the session skipped the code step (e.g. came back).
      const { consentVersion } = await loadContest()
      const unsaved = chosen.find(entry => !entry.remoteId)
      if (unsaved) throw new Error(`“${unsaved.title}” hasn’t saved yet. Fix it in your entries, then try again.`)
      const result = await submitEntries(chosen.map(entry => entry.remoteId), consentVersion)
      if (!result.ok) throw new Error(getErrorMessage(result, 'Submission failed'))
      const sent = new Set(chosen.map(entry => entry.id))
      setPosterEntries(current => current.map(entry => sent.has(entry.id) ? { ...entry, submitted: true, status: 'submitted', submittedAt: new Date().toISOString() } : entry))
      setConsent({})
      setSubmissionState('submitted')
      setStep(5)
    } catch (error) {
      setSubmissionState('idle')
      setSubmissionError(error.message)
    }
  }

  async function handlePosterSave() {
    // Returns true when saved, false otherwise (the reason is shown inline).
    if (saveState === 'saving') return false
    const title = posterDraft.title?.trim()
    if (!title) {
      setSaveError('Poster title is required.')
      setSaveState('error')
      return false
    }
    if (title.length > 200) {
      setSaveError('Poster title must be 200 characters or fewer.')
      setSaveState('error')
      return false
    }
    if (!editingEntryId && !posterDraft.posterFiles?.[0]) {
      setSaveError('Please choose a poster file before saving.')
      setSaveState('error')
      return false
    }
    if ((posterDraft.supportingFiles || []).length > MAX_SUPPORTING_FILES) {
      setSaveError(`You can add up to ${MAX_SUPPORTING_FILES} supporting files.`)
      setSaveState('error')
      return false
    }

    const posterFile = posterDraft.posterFiles[0]
    if (posterFile) {
      const extension = posterFile.name.split('.').pop()?.toLowerCase()
      const staticFile = ['jpg', 'jpeg', 'png', 'pdf'].includes(extension)
      const allowed = [...['jpg', 'jpeg', 'png', 'pdf'], 'gif', 'mp4']
      if (!allowed.includes(extension) || posterFile.size > (staticFile ? 5 : 20) * 1024 * 1024) {
        setSaveError(staticFile ? 'Poster must be JPG, PNG, or PDF under 5MB.' : 'Motion poster must be GIF or MP4 under 20MB.')
        setSaveState('error')
        return false
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
      return true
    } catch (error) {
      setSaveState('error')
      setSaveError(error.message)
      return false
    }
  }

  return (
    <main className={`${styles.page} ${showPosterDetails ? styles.editing : ''} ${showSuccess ? styles.success : ''} ${showAccount ? styles.account : ''} ${introPending ? styles.introPending : ''}`} data-name="submit-index">
      <section className={styles.identity} aria-label="Ownership theme">
        <RevealRow as="a" line={false} pinned className={styles.homeLink} href="/" onClick={handleHomeClick}><RollingText text="(←) Home" /></RevealRow>
        <SubmitArtwork introRef={artIntroRef} />
        <RevealText as="h1">Ownership</RevealText>
      </section>

      <section ref={contentRef} className={styles.content} aria-labelledby="submit-title">
        {showAccount && <AccountNav active={accountTab} busy={accountBusy} onProfile={() => setAccountTab('profile')} onPosters={() => setAccountTab('posters')} onSignOut={() => handleSignOut(false)} />}
        {step > 0 && !showSuccess && !showAccount && <SubmitProgress activeStep={showConsent ? 3 : showPosterDetails ? 2 : step} progress={frameProgress} className={styles.mobileHidden} compact />}
        {showSuccess && <SubmitProgress activeStep={3} compact lineOnly hideBar />}
        <div ref={contentScrollRef} className={styles.contentScroll} data-lenis-prevent>
          {showManage
            ? <ManagePosterPanel
                entries={sentEntries}
                busyId={entryBusyId}
                onWithdraw={entry => handleEntryStatus(entry, 'withdraw')}
                onRestore={entry => handleEntryStatus(entry, 'restore')}
              />
          : showProfile
            ? <ProfilePanel
                value={contactDraft}
                busy={accountBusy}
                error={verification.error}
                onChange={changes => {
                  profileDirtyRef.current = true
                  setContactDraft(current => ({ ...current, ...changes }))
                  setVerification(current => (current.error ? { ...current, error: '' } : current))
                }}
                onPhotoChange={handlePhotoChange}
                onChangeEmail={() => setChangeEmail({ open: true, stage: 'email', email: '', code: '', busy: false, error: '' })}
              />
          : showContact
            ? <ContactInformationPanel
                value={contactDraft}
                mode={joinMode}
                onModeChange={mode => { setJoinMode(mode); setVerification(current => (current.status === 'verified' ? { ...current, error: '' } : { status: 'idle', code: '', error: '' })) }}
                verification={verification}
                onVerificationChange={changes => setVerification(current => ({ ...current, ...changes }))}
                onChange={changes => {
                  setContactDraft(current => ({ ...current, ...changes }))
                  // Editing clears a previous validation message; a new email
                  // needs a new code.
                  setVerification(current => ('email' in changes && current.status === 'verified'
                    ? { status: 'idle', code: '', error: '' }
                    : current.error ? { ...current, error: '' } : current))
                }}
                onPhotoChange={handlePhotoChange}
                onResend={handleResend}
                onEditDetails={() => setVerification({ status: 'idle', code: '', error: '' })}
                submitLabel={contactNextLabel}
                submitDisabled={contactBusy}
                onSubmit={handleContactNext}
              />
            : showPoster
              ? <PosterEntriesPanel entries={posterEntries} onEdit={entry => {
                  setEditingEntryId(entry.id)
                  setPosterDraft({ title: entry.title, remoteId: entry.remoteId, version: entry.version, posterFiles: entry.file ? [entry.file] : [], supportingFiles: [] })
                  setSaveError('')
                  setSaveState('idle')
                  setStep(3)
                }} onRemove={async id => {
                  const entry = posterEntries.find(item => item.id === id)
                  if (entry?.remoteId) {
                    const result = await deleteEntry(entry.remoteId)
                    if (!result.ok) throw new Error(getErrorMessage(result, 'Could not remove the poster.'))
                  }
                  setPosterEntries(current => current.filter(item => item.id !== id))
                }} onAdd={(files = []) => {
                  setPosterDraft({ title: '', posterFiles: files.slice(0, 1), supportingFiles: files.slice(1, 1 + MAX_SUPPORTING_FILES) })
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
                  ? <SubmissionSuccessPanel />
                : <div className={styles.contentInner}>
                    <h2 id="submit-title">
                      <RevealText as="span" className={styles.titleDesktop}>Submit to the Poster<br />Contest</RevealText>
                      <RevealText as="span" className={styles.titleMobile}>Submit to the<br />Poster Contest</RevealText>
                    </h2>
                    <RevealText as="p" className={styles.intro}>Use this page to submit poster work responding to the theme: Ownership. Before submitting, review the process and guidelines below.</RevealText>
                    <RevealText as="h3">Submission Process</RevealText>
                    <ol>
                      {steps.map(step => <RevealRow key={step} line={false}>{step}</RevealRow>)}
                    </ol>
                    <RevealText as="h3">Rules and Eligibility</RevealText>
                    <ul>
                      {rules.map(rule => <RevealRow key={rule} line={false}>{rule}</RevealRow>)}
                    </ul>
                    <RevealRow as="button" line={false} pinned className={styles.submitLink} type="button" onClick={() => setStep(1)}><RollingText text="Enter Submission (→)" /></RevealRow>
                </div>}
        </div>
        {showManage && <RevealRow as="button" line={false} pinned className={styles.submitLink} type="button" onClick={openSubmitFromManage}><RollingText text={draftCount ? `Submit Poster (${String(draftCount).padStart(2, '0')})` : 'Submit Poster (→)'} /></RevealRow>}
        {showContact && !showAccount && <SubmitFooterNav nextLabel={joinMode === 'join' ? contactNextLabel : null} nextLabelMobile={contactBusy ? undefined : 'Poster'} disabled={contactBusy} onBack={handleContactBack} onNext={handleContactNext} />}
        {/* Add a Poster: (←) back to the entries list, Continue saves. */}
        {/* Mobile Add a Poster header (mockup): Cancel → entries, Save. */}
        {showPosterDetails && (
          <div className={styles.editorBar}>
            <RevealRow as="button" line={false} pinned type="button" disabled={saveState === 'saving'} onClick={() => { setSaveError(''); setSaveState('idle'); setStep(2) }}>Cancel</RevealRow>
            <RevealRow as="button" line={false} pinned type="button" disabled={saveState === 'saving'} onClick={handlePosterSave}>{saveState === 'saving' ? 'Saving…' : 'Save'}</RevealRow>
          </div>
        )}
        {showPosterDetails && <SubmitFooterNav className={styles.mobileHidden} nextLabel={saveState === 'saving' ? 'Saving…' : 'Continue'} disabled={saveState === 'saving'} onBack={() => { if (saveState === 'saving') return; setSaveError(''); setSaveState('idle'); setStep(2) }} onNext={handlePosterSave} />}
        {showPoster && <SubmitFooterNav nextLabel="Submit" nextLabelMobile="Consent" onBack={() => setStep(1)} onNext={() => {
          setSubmissionError('')
          setStep(4)
        }} />}
        {showConsent && <SubmitFooterNav nextLabel={submissionState === 'submitting' ? 'Submitting' : 'Submit'} disabled={submissionState === 'submitting'} onBack={() => setStep(2)} onNext={handleSubmission} />}
      </section>
      <LeaveDialog
        open={leave.open}
        busy={leave.busy}
        error={leave.error}
        onLeave={handleSaveAndLeave}
        onClose={() => { if (!leave.busy) setLeave({ open: false, busy: false, error: '' }) }}
      />
      <ChangeEmailDialog
        open={changeEmail.open}
        state={changeEmail}
        onChange={changes => updateChangeEmail({ ...changes, error: '' })}
        onSend={handleChangeEmailSend}
        onConfirm={handleChangeEmailConfirm}
        onResend={handleChangeEmailResend}
        onBack={() => updateChangeEmail({ stage: 'email', code: '', error: '' })}
        onClose={() => { if (!changeEmail.busy) updateChangeEmail({ open: false }) }}
      />
    </main>
  )
}
