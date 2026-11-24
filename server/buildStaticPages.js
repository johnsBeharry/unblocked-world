// After `vite build`: writes one HTML file per route with that page's SEO
// tags (plus 404.html), so static hosting (Vercel) serves the right title and
// Open Graph tags without server rendering. The Express server and the
// Cloudflare worker fill the same tags per request instead.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SEO_PATHS, injectSeo } from '../src/app/seo/seoHead.js'

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/client')
const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8')

const write = (file, url) => {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, injectSeo(template, url))
}

for (const route of SEO_PATHS) {
  write(path.join(outDir, route, 'index.html'), route)
}
// Any path without a page entry gets the 404 tags.
write(path.join(outDir, '404.html'), '/404')
console.log(`SEO pages: ${SEO_PATHS.length} routes + 404.html`)
