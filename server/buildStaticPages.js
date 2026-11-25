// After `vite build`: writes one HTML file per route with that page's SEO
// tags (plus 404.html), so static hosting (Vercel) serves the right title and
// Open Graph tags without server rendering. The Express server and the
// Cloudflare worker fill the same tags per request instead.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SEO_PATHS, injectSeo } from '../src/app/seo/seoHead.js'

// Static files cannot see the request host, so the domain comes from the
// build: SITE_URL if set, else the Vercel domain of this deployment
// (production domain on production builds, the branch URL on previews),
// else site.url from seo-content.json.
const vercelHost = process.env.VERCEL_ENV === 'production'
  ? process.env.VERCEL_PROJECT_PRODUCTION_URL
  : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
const origin = process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : undefined)

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/client')
const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8')

const write = (file, url) => {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, injectSeo(template, url, origin))
}

for (const route of SEO_PATHS) {
  write(path.join(outDir, route, 'index.html'), route)
}
// Any path without a page entry gets the 404 tags.
write(path.join(outDir, '404.html'), '/404')
console.log(`SEO pages: ${SEO_PATHS.length} routes + 404.html for ${origin ?? 'site.url'}`)
