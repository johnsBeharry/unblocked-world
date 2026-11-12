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
export function requestEmailCode(email, profile, termsVersion) {
  return request('POST', '/codes', { email, profile: {
    name: profile.name,
    country: profile.country,
    instagram: profile.instagram,
    bio: profile.bio,
    acceptTerms: termsVersion,
  } })
}
export function verifyEmailCode(email, code) { return request('POST', '/session', { email, code }) }
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
export function deleteEntry(id) { return request('DELETE', `/entries/${encodeURIComponent(id)}`) }
export function submitEntries(entryIds, consentVersion) {
  return request('POST', '/submit', { entryIds, consentVersion })
}
