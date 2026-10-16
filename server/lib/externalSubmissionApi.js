const DEFAULT_API_BASE_URL = 'https://unblocked-juding-portal.peakshift.workers.dev/api/v1'
const DEFAULT_CONTEST_SLUG = 'ownership-2026'
const REQUEST_TIMEOUT_MS = 20_000
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024
const SMALL_UPLOAD_BYTES = 5 * 1024 * 1024
const SMALL_UPLOAD_TYPES = new Set(['image/jpeg', 'image/png', 'application/pdf'])
const LARGE_UPLOAD_TYPES = new Set(['image/gif', 'video/mp4'])

export class ExternalSubmissionApiError extends Error {
  constructor(message, { status, body } = {}) {
    super(message)
    this.name = 'ExternalSubmissionApiError'
    this.status = status
    this.body = body
  }
}

export function getExternalSubmissionConfig(env = process.env, { requireKey = true } = {}) {
  const apiKey = env.UNBLOCKED_EXTERNAL_API_KEY?.trim()
  if (requireKey && !apiKey) {
    throw new Error('UNBLOCKED_EXTERNAL_API_KEY is not configured')
  }
  if (apiKey && !apiKey.startsWith('ubk_')) {
    throw new Error('UNBLOCKED_EXTERNAL_API_KEY has an invalid format')
  }

  const baseUrl = new URL(env.UNBLOCKED_EXTERNAL_API_BASE_URL || DEFAULT_API_BASE_URL)
  if (baseUrl.protocol !== 'https:' || baseUrl.username || baseUrl.password) {
    throw new Error('UNBLOCKED_EXTERNAL_API_BASE_URL must be an HTTPS URL without credentials')
  }

  return {
    apiKey,
    baseUrl: baseUrl.href.replace(/\/+$/, ''),
    contestSlug: env.UNBLOCKED_EXTERNAL_CONTEST_SLUG || DEFAULT_CONTEST_SLUG,
  }
}

function createHeaders(apiKey) {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }
}

function createRequestSignal(signal) {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  return signal ? AbortSignal.any([signal, timeout]) : timeout
}

async function parseResponse(response) {
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    throw new ExternalSubmissionApiError(
      body?.error || `External submission API request failed with ${response.status}`,
      { status: response.status, body },
    )
  }
  return body
}

export async function getContest({ slug, signal, env } = {}) {
  const config = getExternalSubmissionConfig(env, { requireKey: false })
  const contestSlug = slug || config.contestSlug
  const response = await fetch(`${config.baseUrl}/contests/${encodeURIComponent(contestSlug)}`, {
    headers: config.apiKey ? createHeaders(config.apiKey) : { Accept: 'application/json' },
    signal: createRequestSignal(signal),
  })
  return parseResponse(response)
}

function appendUpload(formData, field, upload) {
  const contentType = upload instanceof Blob
    ? upload.type
    : upload?.contentType
  const size = upload instanceof Blob ? upload.size : upload?.buffer?.byteLength
  const maxBytes = LARGE_UPLOAD_TYPES.has(contentType)
    ? MAX_UPLOAD_BYTES
    : SMALL_UPLOAD_TYPES.has(contentType) ? SMALL_UPLOAD_BYTES : MAX_UPLOAD_BYTES

  if (!Number.isInteger(size) || size < 1 || size > maxBytes) {
    throw new TypeError(`${field} exceeds the ${maxBytes / (1024 * 1024)} MB upload limit`)
  }

  if (upload instanceof Blob) {
    formData.append(field, upload, 'upload')
    return
  }

  if (upload && typeof upload === 'object' && 'buffer' in upload) {
    const blob = new Blob([upload.buffer], { type: upload.contentType || 'application/octet-stream' })
    formData.append(field, blob, upload.filename || 'upload')
    return
  }

  throw new TypeError(`${field} must be a Blob or an upload object with a buffer`)
}

const metadataFields = [
  'artist_name',
  'artist_email',
  'country',
  'concept',
  'year_designed',
  'designed_for',
  'client_name',
  'creation_method',
  'materials_used',
  'digital_programs',
  'printing_method',
  'age',
]

const metadataMaxLengths = {
  artist_name: 200,
  artist_email: 200,
  country: 100,
  concept: 4000,
}

function validateImageUrl(imageUrl) {
  if (typeof imageUrl !== 'string' || imageUrl.length > 2000) {
    throw new TypeError('image_url must be at most 2000 characters')
  }
  const parsed = new URL(imageUrl)
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
    throw new TypeError('image_url must be a public HTTP(S) URL without credentials')
  }
}

export async function submitSubmission({
  title,
  file,
  image_url: imageUrl,
  assets = [],
  slug,
  signal,
  env,
  ...metadata
} = {}) {
  const config = getExternalSubmissionConfig(env)
  const normalizedTitle = title?.trim()
  if (!normalizedTitle) throw new TypeError('title is required')
  if (normalizedTitle.length > 200) throw new TypeError('title must be at most 200 characters')
  if ((file ? 1 : 0) + (imageUrl ? 1 : 0) !== 1) {
    throw new TypeError('provide exactly one of file or image_url')
  }
  if (imageUrl) validateImageUrl(imageUrl)
  if (!Array.isArray(assets) || assets.length > 3) {
    throw new TypeError('assets must contain at most 3 uploads')
  }

  const formData = new FormData()
  formData.set('title', normalizedTitle)
  if (file) appendUpload(formData, 'file', file)
  if (imageUrl) formData.set('image_url', imageUrl.trim())
  for (const field of metadataFields) {
    if (metadata[field] !== undefined && metadata[field] !== null && metadata[field] !== '') {
      const value = String(metadata[field])
      if (metadataMaxLengths[field] && value.length > metadataMaxLengths[field]) {
        throw new TypeError(`${field} must be at most ${metadataMaxLengths[field]} characters`)
      }
      formData.set(field, value)
    }
  }
  for (const asset of assets) appendUpload(formData, 'assets', asset)

  const response = await fetch(`${config.baseUrl}/contests/${encodeURIComponent(slug || config.contestSlug)}/submissions`, {
    method: 'POST',
    headers: createHeaders(config.apiKey),
    body: formData,
    signal: createRequestSignal(signal),
  })
  return parseResponse(response)
}
