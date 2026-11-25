// First-line (browser) guards of the Submit forms. The form API checks
// everything again on the server; these keep obviously wrong input from being
// sent and give the artist the reason right away.

// Control characters (except tab / newline) and bidi override marks: invisible
// in the form, so they only ever confuse what the jury reads.
const HIDDEN_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F‪-‮⁦-⁩]/g
export const cleanText = (value) => (typeof value === 'string' ? value.replace(HIDDEN_CHARACTERS, '').trim() : '')

// Instagram: "@name", "name" or an instagram.com profile link.
const INSTAGRAM_HANDLE = /^@?[A-Za-z0-9._]{1,30}$/
const INSTAGRAM_LINK = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]{1,30}\/?$/i
export const isInstagram = (value) => !value || INSTAGRAM_HANDLE.test(value) || INSTAGRAM_LINK.test(value)

// Poster / supporting files (form API rules: JPG, PNG, PDF under 5 MB; GIF,
// MP4 under 20 MB). The extension, the browser's type and the file's first
// bytes must agree, so a renamed file is caught before it is uploaded.
const MB = 1024 * 1024
const FILE_RULES = {
  jpg: { kind: 'static', types: ['image/jpeg'], signature: bytes => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  jpeg: { kind: 'static', types: ['image/jpeg'], signature: bytes => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  png: { kind: 'static', types: ['image/png'], signature: bytes => bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 },
  pdf: { kind: 'static', types: ['application/pdf'], signature: bytes => bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 },
  gif: { kind: 'motion', types: ['image/gif'], signature: bytes => bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 },
  // ISO media: "ftyp" at byte 4.
  mp4: { kind: 'motion', types: ['video/mp4'], signature: bytes => bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70 },
}
const SIZE_LIMIT = { static: 5 * MB, motion: 20 * MB }

// Resolves to '' (fine), 'static' / 'motion' (too large or not that kind), or
// 'type' (not an accepted file).
export async function checkUploadFile(file) {
  const extension = file?.name?.split('.').pop()?.toLowerCase()
  const rule = FILE_RULES[extension]
  if (!rule) return 'type'
  // An empty type is allowed (some phones leave it out); a different one is not.
  if (file.type && !rule.types.includes(file.type)) return rule.kind
  if (!file.size || file.size > SIZE_LIMIT[rule.kind]) return rule.kind
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  return rule.signature(bytes) ? '' : rule.kind
}

// Join details kept on this device until the email is confirmed, so "Save &
// Leave" on the Join step really keeps them. Read back as untrusted input:
// strings only, capped, country only from the list.
const JOIN_DRAFT_KEY = 'unblocked-submit-join'
const JOIN_DRAFT_LIMITS = { email: 200, name: 200, country: 100, instagram: 100, bio: 1000 }

export function readJoinDraft(countries) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(JOIN_DRAFT_KEY) || 'null')
    if (!stored || typeof stored !== 'object') return null
    const draft = {}
    for (const [name, limit] of Object.entries(JOIN_DRAFT_LIMITS)) {
      if (typeof stored[name] === 'string' && stored[name]) draft[name] = stored[name].slice(0, limit)
    }
    if (draft.country && !countries.includes(draft.country)) delete draft.country
    return Object.keys(draft).length ? draft : null
  } catch {
    return null
  }
}

export function saveJoinDraft(contact) {
  try {
    const draft = Object.fromEntries(Object.keys(JOIN_DRAFT_LIMITS).filter(name => contact[name]).map(name => [name, contact[name]]))
    if (Object.keys(draft).length) window.localStorage.setItem(JOIN_DRAFT_KEY, JSON.stringify(draft))
    else window.localStorage.removeItem(JOIN_DRAFT_KEY)
  } catch { /* storage off (private mode): nothing kept */ }
}

export function clearJoinDraft() {
  try { window.localStorage.removeItem(JOIN_DRAFT_KEY) } catch { /* storage off */ }
}
