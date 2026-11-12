import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import multer from 'multer'
import { createServer as createViteServer } from 'vite'
import { ExternalSubmissionApiError, submitSubmission } from './lib/externalSubmissionApi.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod')
const app = express()
const clientStaticRoot = path.resolve(root, 'client-static')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024, files: 4, fields: 20, fieldSize: 4000 },
})

let vite
app.get('/form/test', (req, res) => res.sendFile(path.join(clientStaticRoot, 'index.html')))
app.use('/form', express.static(clientStaticRoot, { index: false }))

app.use('/api/forms', express.raw({ type: '*/*', limit: '25mb' }), async (req, res) => {
  const upstreamOrigin = process.env.UNBLOCKED_FORM_API_ORIGIN || 'https://link.unblocked.world'
  const upstreamPath = req.originalUrl.replace(/^\/api\/forms/, '') || '/'
  const requestHeaders = {
    origin: upstreamOrigin,
    referer: `${upstreamOrigin}/form/test?v=posters`,
  }

  for (const name of ['accept', 'content-type', 'cookie', 'if-match', 'user-agent', 'x-file-name']) {
    const value = req.get(name)
    if (value) requestHeaders[name] = value
  }

  try {
    const upstream = await fetch(`${upstreamOrigin}/api/forms${upstreamPath}`, {
      method: req.method,
      headers: requestHeaders,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
    })

    res.status(upstream.status)
    upstream.headers.forEach((value, name) => {
      if (!['content-encoding', 'content-length', 'set-cookie'].includes(name)) res.setHeader(name, value)
    })

    const cookies = typeof upstream.headers.getSetCookie === 'function'
      ? upstream.headers.getSetCookie()
      : []
    if (cookies.length) {
      const localCookies = req.hostname === 'localhost' || req.hostname === '127.0.0.1'
      res.setHeader('set-cookie', cookies.map(cookie => localCookies
        ? cookie.replace(/;\s*Domain=[^;]*/ig, '').replace(/;\s*Secure/ig, '').replace(/SameSite=None/ig, 'SameSite=Lax')
        : cookie))
    }

    res.send(Buffer.from(await upstream.arrayBuffer()))
  } catch (error) {
    res.status(502).json({ error: 'form_api_unavailable', message: error.message })
  }
})

if (!isProd) {
  vite = await createViteServer({ root, server: { middlewareMode: true }, appType: 'custom' })
  app.use(vite.middlewares)
} else {
  app.use(express.static(path.resolve(root, 'dist/client'), { index: false }))
}

app.post('/api/submissions', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'assets', maxCount: 3 },
]), async (req, res) => {
  try {
    const posterFile = req.files?.file?.[0]
    const assets = (req.files?.assets || []).map(file => ({
      buffer: file.buffer,
      filename: file.originalname,
      contentType: file.mimetype,
    }))
    const result = await submitSubmission({
      title: req.body.title,
      file: posterFile && {
        buffer: posterFile.buffer,
        filename: posterFile.originalname,
        contentType: posterFile.mimetype,
      },
      image_url: req.body.image_url,
      artist_name: req.body.artist_name,
      artist_email: req.body.artist_email,
      country: req.body.country,
      concept: req.body.concept,
      year_designed: req.body.year_designed,
      designed_for: req.body.designed_for,
      client_name: req.body.client_name,
      creation_method: req.body.creation_method,
      materials_used: req.body.materials_used,
      digital_programs: req.body.digital_programs,
      printing_method: req.body.printing_method,
      age: req.body.age,
      assets,
    })
    res.status(201).json(result)
  } catch (error) {
    const status = error instanceof ExternalSubmissionApiError
      ? (error.status && error.status < 500 ? error.status : 502)
      : error instanceof TypeError || error instanceof multer.MulterError ? 400 : 500
    res.status(status).json({ error: error.body?.error || error.message || 'submission_failed' })
  }
})

app.use('/api/submissions', (error, req, res, next) => {
  if (!error) return next()
  const status = error instanceof multer.MulterError ? 400 : 500
  res.status(status).json({ error: error.message || 'submission_request_failed' })
})

app.use(async (req, res, next) => {
  try {
    const url = req.originalUrl
    let template = fs.readFileSync(path.resolve(root, isProd ? 'dist/client/index.html' : 'index.html'), 'utf-8')
    if (!isProd) {
      template = await vite.transformIndexHtml(url, template)
    }
    const html = template.replace('<!--ssr-outlet-->', '')
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (error) {
    vite?.ssrFixStacktrace(error)
    next(error)
  }
})

app.listen(5173, () => console.log('UNBLOCKED SSR running at http://localhost:5173'))
