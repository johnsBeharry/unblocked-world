// Cloudflare Worker entry. Mirrors server/index.js (which stays for local dev):
// static files are served by the ASSETS binding before this runs, so this
// handles the submissions API and server-renders every other page.
import { render } from '../dist/server/entry-server.js'
import { ExternalSubmissionApiError, submitSubmission } from '../server/lib/externalSubmissionApi.js'

const MAX_FILE_BYTES = 20 * 1024 * 1024
const fieldNames = [
  'title', 'image_url', 'artist_name', 'artist_email', 'country', 'concept',
  'year_designed', 'designed_for', 'client_name', 'creation_method',
  'materials_used', 'digital_programs', 'printing_method', 'age',
]

const json = (body, status) => Response.json(body, { status })

async function toUpload(file) {
  if (file.size > MAX_FILE_BYTES) throw new TypeError('File too large')
  return {
    buffer: await file.arrayBuffer(),
    filename: file.name,
    contentType: file.type,
  }
}

async function handleSubmission(request, env) {
  let form
  try {
    form = await request.formData()
  } catch {
    return json({ error: 'submission_request_failed' }, 400)
  }

  try {
    const isFile = value => value && typeof value === 'object' && 'arrayBuffer' in value
    const poster = form.get('file')
    const assets = form.getAll('assets').filter(isFile)
    if (assets.length > 3) throw new TypeError('assets must contain at most 3 uploads')

    const fields = {}
    for (const name of fieldNames) {
      const value = form.get(name)
      if (typeof value === 'string') fields[name] = value
    }

    const result = await submitSubmission({
      ...fields,
      file: isFile(poster) ? await toUpload(poster) : undefined,
      assets: await Promise.all(assets.map(toUpload)),
      env,
    })
    return json(result, 201)
  } catch (error) {
    const status = error instanceof ExternalSubmissionApiError
      ? (error.status && error.status < 500 ? error.status : 502)
      : error instanceof TypeError ? 400 : 500
    return json({ error: error.body?.error || error.message || 'submission_failed' }, status)
  }
}

let template
async function getTemplate(request, env) {
  if (!template) {
    const res = await env.ASSETS.fetch(new URL('/index.html', request.url))
    template = await res.text()
  }
  return template
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/submissions') {
      if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)
      return handleSubmission(request, env)
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    const html = (await getTemplate(request, env))
      .replace('<!--ssr-outlet-->', render(url.pathname + url.search))
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  },
}
