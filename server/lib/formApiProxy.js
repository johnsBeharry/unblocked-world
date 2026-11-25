// Same-origin proxy to the official submission form API (link.unblocked.world).
// Shared by the local Express server (server/index.js) and the Vercel Function
// (api/forms.js) so the Submit page can call /api/forms/* on its own origin.
const DEFAULT_FORM_API_ORIGIN = 'https://link.unblocked.world'
const FORWARDED_REQUEST_HEADERS = ['accept', 'content-type', 'cookie', 'if-match', 'user-agent', 'x-file-name']
const DROPPED_RESPONSE_HEADERS = new Set(['content-encoding', 'content-length', 'set-cookie', 'transfer-encoding', 'connection'])

// Upstream cookies are scoped to link.unblocked.world; the browser only keeps
// them on the proxying origin without that Domain. Plain-HTTP localhost also
// needs Secure / SameSite=None removed.
function rewriteCookie(cookie, isLocalHost) {
  const hostOnly = cookie.replace(/;\s*Domain=[^;]*/ig, '')
  return isLocalHost
    ? hostOnly.replace(/;\s*Secure/ig, '').replace(/SameSite=None/ig, 'SameSite=Lax')
    : hostOnly
}

// Only form API paths are proxied: "." / ".." segments (also percent-encoded)
// would let a request climb out of /api/forms on the upstream origin.
function isFormApiPath(path = '/') {
  try {
    return !decodeURIComponent(path.split('?')[0]).split(/[\\/]/).some(segment => segment === '.' || segment === '..')
  } catch {
    return false
  }
}

const jsonResult = (status, payload) => ({
  status,
  headers: [['content-type', 'application/json']],
  cookies: [],
  body: Buffer.from(JSON.stringify(payload)),
})

// path: the part after /api/forms including the query (e.g. "/test/contest").
// getHeader(name) reads one request header; body is a Buffer or undefined.
export async function proxyFormApi({ method, path, getHeader, body, hostname, env = process.env }) {
  if (!isFormApiPath(path)) return jsonResult(400, { error: 'invalid_path' })
  const upstreamOrigin = env.UNBLOCKED_FORM_API_ORIGIN || DEFAULT_FORM_API_ORIGIN
  const headers = {
    origin: upstreamOrigin,
    referer: `${upstreamOrigin}/form/test?v=posters`,
  }
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = getHeader(name)
    if (value) headers[name] = value
  }

  try {
    const upstream = await fetch(`${upstreamOrigin}/api/forms${path || '/'}`, {
      method,
      headers,
      body: ['GET', 'HEAD'].includes(method) || !body?.length ? undefined : body,
    })

    const responseHeaders = []
    upstream.headers.forEach((value, name) => {
      if (!DROPPED_RESPONSE_HEADERS.has(name)) responseHeaders.push([name, value])
    })
    const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1'
    const cookies = (upstream.headers.getSetCookie?.() || []).map(cookie => rewriteCookie(cookie, isLocalHost))

    return {
      status: upstream.status,
      headers: responseHeaders,
      cookies,
      body: Buffer.from(await upstream.arrayBuffer()),
    }
  } catch {
    // The upstream error text stays in the server log, not in the response.
    return jsonResult(502, { error: 'form_api_unavailable' })
  }
}

// Writes a proxyFormApi result to a Node / Express response.
export function sendProxyResult(res, result) {
  res.statusCode = result.status
  for (const [name, value] of result.headers) res.setHeader(name, value)
  if (result.cookies.length) res.setHeader('set-cookie', result.cookies)
  res.end(result.body)
}
