import { proxyFormApi, sendProxyResult } from '../server/lib/formApiProxy.js'

// Vercel Function for the /api/forms/* proxy (server/index.js serves it in
// local dev). vercel.json rewrites /api/forms/:path* here as ?__path=:path*.
// Largest accepted body: a 20 MB motion poster plus headroom (same limit as
// the local server's express.raw).
const MAX_BODY_BYTES = 25 * 1024 * 1024

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', chunk => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        req.destroy()
        reject(Object.assign(new Error('payload_too_large'), { status: 413 }))
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function getUpstreamPath(req) {
  const url = new URL(req.url, 'http://localhost')
  const rewrittenPath = url.searchParams.get('__path')
  url.searchParams.delete('__path')
  const pathname = rewrittenPath !== null
    ? `/${rewrittenPath}`
    : url.pathname.replace(/^\/api\/forms/, '')
  return `${pathname}${url.search}`
}

export default async function handler(req, res) {
  let body
  try {
    body = ['GET', 'HEAD'].includes(req.method) ? undefined : await readBody(req)
  } catch (error) {
    res.statusCode = error.status || 400
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ error: error.status === 413 ? 'payload_too_large' : 'bad_request' }))
    return
  }
  const result = await proxyFormApi({
    method: req.method,
    path: getUpstreamPath(req),
    getHeader: name => req.headers[name],
    body,
    hostname: (req.headers.host || '').split(':')[0],
  })
  sendProxyResult(res, result)
}
