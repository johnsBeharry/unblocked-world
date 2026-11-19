import { proxyFormApi, sendProxyResult } from '../server/lib/formApiProxy.js'

// Vercel Function for the /api/forms/* proxy (server/index.js serves it in
// local dev). vercel.json rewrites /api/forms/:path* here as ?__path=:path*.
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
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
  const result = await proxyFormApi({
    method: req.method,
    path: getUpstreamPath(req),
    getHeader: name => req.headers[name],
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : await readBody(req),
    hostname: (req.headers.host || '').split(':')[0],
  })
  sendProxyResult(res, result)
}
