const FORM_API = '/api/forms/test'

async function request(method, path, body, headers = {}) {
  const requestHeaders = { ...headers }
  const init = { method, headers: requestHeaders, credentials: 'same-origin' }
  if (body !== undefined) {
    requestHeaders['content-type'] = 'application/json'
    init.body = JSON.stringify(body)
  }
  const response = await fetch(`${FORM_API}${path}`, init)
  let payload = {}
  try { payload = await response.json() } catch { /* empty response */ }
  return { ok: response.ok, status: response.status, body: payload }
}

async function upload(method, path, file) {
  const response = await fetch(`${FORM_API}${path}`, {
    method,
    headers: {
      'content-type': file.type || 'application/octet-stream',
      'x-file-name': encodeURIComponent(file.name),
    },
    body: file,
    credentials: 'same-origin',
  })
  let payload = {}
  try { payload = await response.json() } catch { /* empty response */ }
  return { ok: response.ok, status: response.status, body: payload }
}

export function getContest() { return request('GET', '/contest') }
// Join sends the profile (and an optional base64 JPEG photo) with the code
// request; signing in sends only the email.
export function requestEmailCode(email, profile, termsVersion, photo) {
  const payload = { email }
  if (profile) {
    payload.profile = {
      name: profile.name,
      country: profile.country,
      instagram: profile.instagram,
      bio: profile.bio,
      acceptTerms: termsVersion,
    }
    if (photo) payload.photo = photo
  }
  return request('POST', '/codes', payload)
}
export function verifyEmailCode(email, code) { return request('POST', '/session', { email, code }) }
// Signed-in session: the profile (GET /me, 401 when signed out), sign out,
// and the profile photo (served at PROFILE_PHOTO_URL).
export function getProfile() { return request('GET', '/me') }
export function signOut() { return request('DELETE', '/session') }
export function uploadProfilePhoto(blob) { return upload('PUT', '/me/photo', new File([blob], 'photo.jpg', { type: blob.type || 'image/jpeg' })) }
export function deleteProfilePhoto() { return request('DELETE', '/me/photo') }
export const PROFILE_PHOTO_URL = `${FORM_API}/me/photo`
export function updateProfile(profile, termsVersion) {
  return request('PATCH', '/me', {
    name: profile.name,
    country: profile.country,
    instagram: profile.instagram,
    bio: profile.bio,
    acceptTerms: termsVersion,
  })
}
export function createEntry(id, fields) { return request('POST', '/entries', { id, fields }) }
export function updateEntry(id, fields, version) {
  return request('PATCH', `/entries/${encodeURIComponent(id)}`, { fields }, { 'if-match': String(version) })
}
export function uploadPoster(id, file) { return upload('PUT', `/entries/${encodeURIComponent(id)}/file`, file) }
export function uploadAsset(id, file) { return upload('POST', `/entries/${encodeURIComponent(id)}/assets`, file) }
// Entries of the signed-in artist ({ entries: [{ id, status, version, fields,
// file, submittedAt, withdrawnAt, … }] }), withdraw / restore, and the
// poster file (thumbnail) URL.
export function listEntries() { return request('GET', '/entries') }
export function withdrawEntry(id, reason = '') { return request('POST', `/entries/${encodeURIComponent(id)}/withdraw`, { reason }) }
export function restoreEntry(id) { return request('POST', `/entries/${encodeURIComponent(id)}/restore`) }
export const entryFileUrl = (id) => `${FORM_API}/entries/${encodeURIComponent(id)}/file`
export function deleteEntry(id) { return request('DELETE', `/entries/${encodeURIComponent(id)}`) }
export function submitEntries(entryIds, consentVersion) {
  return request('POST', '/submit', { entryIds, consentVersion })
}
