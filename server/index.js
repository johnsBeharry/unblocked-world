import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod')
const app = express()

let vite
if (!isProd) {
  vite = await createViteServer({ root, server: { middlewareMode: true }, appType: 'custom' })
  app.use(vite.middlewares)
} else {
  app.use(express.static(path.resolve(root, 'dist/client'), { index: false }))
}

app.use(async (req, res, next) => {
  try {
    const url = req.originalUrl
    let template = fs.readFileSync(path.resolve(root, isProd ? 'dist/client/index.html' : 'index.html'), 'utf-8')
    let render
    if (!isProd) {
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      render = (await import('../dist/server/entry-server.js')).render
    }
    const appHtml = await render(url)
    const html = template.replace('<!--ssr-outlet-->', appHtml)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (error) {
    vite?.ssrFixStacktrace(error)
    next(error)
  }
})

app.listen(5173, () => console.log('UNBLOCKED SSR running at http://localhost:5173'))
